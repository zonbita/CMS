const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const { z } = require("zod");
const slugify = require("slugify");
const path = require("path");

const Post = require("./models/Post");

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

function requireAdminApiKey(req, res, next) {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    return res.status(503).json({
      error:
        "Server is not configured for admin writes. Set ADMIN_API_KEY in environment.",
    });
  }

  const provided = req.header("x-api-key");
  if (!provided || provided !== expected) {
    return res.status(401).json({ error: "Invalid or missing admin API key." });
  }

  return next();
}

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

app.post("/api/posts", requireAdminApiKey, async (req, res) => {
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

async function main() {
  const mongoUri = process.env.MONGODB_URI;
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4001;

  if (!mongoUri) {
    console.error("Missing MONGODB_URI. Add it to environment to connect MongoDB.");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB.");

  app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

