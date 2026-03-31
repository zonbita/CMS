const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const { z } = require("zod");
const slugify = require("slugify");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Post = require("./models/Post");
const User = require("./models/User");

// Load env from project root regardless of nodemon working directory.
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
app.use(helmet());
app.use(express.json({ limit: "2mb" }));

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow non-browser calls (no Origin header)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS origin not allowed"));
    },
    credentials: false,
  })
);

function getJwtSecret() {
  return process.env.JWT_SECRET;
}

function requireAuth(req, res, next) {
  const secret = getJwtSecret();
  if (!secret) {
    return res.status(503).json({
      error: "Server is not configured for auth. Set JWT_SECRET in environment.",
    });
  }

  const authHeader = req.header("authorization") || "";
  const m = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!m) return res.status(401).json({ error: "Missing Authorization token." });

  try {
    const payload = jwt.verify(m[1], secret);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token." });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access required." });
  }
  return next();
}

const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(200),
});

const createPostBodySchema = z.object({
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).optional().default(""),
  content: z.string().min(1).max(200000),
  slug: z.string().min(1).optional(),
  coverImageUrl: z.string().url().optional().or(z.literal("")).default(""),
  tags: z.array(z.string().max(50)).optional().default([]),
});

function generateSlug(title) {
  return slugify(title, { lower: true, strict: true });
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/auth/login", async (req, res) => {
  const parsed = loginBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request body.",
      details: parsed.error.flatten(),
    });
  }

  const secret = getJwtSecret();
  if (!secret) {
    return res.status(503).json({ error: "JWT_SECRET not configured." });
  }

  const { email, password } = parsed.data;
  const user = await User.findOne({ email: email.toLowerCase() }).select({
    email: 1,
    passwordHash: 1,
    role: 1,
  });
  if (!user) return res.status(401).json({ error: "Invalid email or password." });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid email or password." });

  const token = jwt.sign(
    { sub: String(user._id), email: user.email, role: user.role },
    secret,
    { expiresIn: "7d" }
  );

  return res.json({
    token,
    user: { id: String(user._id), email: user.email, role: user.role },
  });
});

app.get("/api/auth/me", requireAuth, async (req, res) => {
  return res.json({ user: req.user });
});

app.get("/api/posts", async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || "10", 10), 50);
  const skip = parseInt(req.query.skip || "0", 10);

  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select({ title: 1, slug: 1, excerpt: 1, coverImageUrl: 1, createdAt: 1 });

  res.json({ posts });
});

app.get("/api/posts/:slug", async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).select({
    title: 1,
    slug: 1,
    excerpt: 1,
    content: 1,
    coverImageUrl: 1,
    tags: 1,
    createdAt: 1,
    updatedAt: 1,
  });

  if (!post) return res.status(404).json({ error: "Post not found." });
  return res.json({ post });
});

app.post("/api/posts", requireAuth, requireAdmin, async (req, res) => {
  const parsed = createPostBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request body.",
      details: parsed.error.flatten(),
    });
  }

  const payload = parsed.data;
  const slug = payload.slug ? generateSlug(payload.slug) : generateSlug(payload.title);

  try {
    const existing = await Post.findOne({ slug });
    if (existing) {
      return res.status(409).json({ error: "Slug already exists. Choose a different title/slug." });
    }

    const post = await Post.create({
      title: payload.title,
      slug,
      excerpt: payload.excerpt,
      content: payload.content,
      coverImageUrl: payload.coverImageUrl || "",
      tags: payload.tags || [],
    });

    return res.status(201).json({ post });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create post." });
  }
});

const createUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(200),
  role: z.enum(["admin", "editor"]).default("editor"),
});

app.get("/api/admin/users", requireAuth, requireAdmin, async (req, res) => {
  const users = await User.find({})
    .sort({ createdAt: -1 })
    .select({ email: 1, role: 1, createdAt: 1 });
  res.json({
    users: users.map((u) => ({
      id: String(u._id),
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
    })),
  });
});

app.post("/api/admin/users", requireAuth, requireAdmin, async (req, res) => {
  const parsed = createUserBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request body.",
      details: parsed.error.flatten(),
    });
  }

  const { email, password, role } = parsed.data;
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ error: "Email already exists." });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    email: email.toLowerCase(),
    passwordHash,
    role,
  });

  return res.status(201).json({
    user: { id: String(user._id), email: user.email, role: user.role },
  });
});

async function bootstrapAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const count = await User.countDocuments({});
  if (count > 0) return;

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email: email.toLowerCase(), passwordHash, role: "admin" });
  console.log(`Bootstrapped initial admin: ${email}`);
}

async function main() {
  const mongoUri = process.env.MONGODB_URI;
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4001;

  if (!mongoUri) {
    console.error("Missing MONGODB_URI. Add it to environment to connect MongoDB.");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB.");
  await bootstrapAdmin();

  app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

