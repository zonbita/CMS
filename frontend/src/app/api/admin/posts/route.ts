import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { AUTH_COOKIE_NAME } from "@/lib/authCookie";

const createPostBodySchema = z.object({
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).optional().default(""),
  content: z.string().min(1).max(200000),
  slug: z.string().min(1).optional(),
  coverImageUrl: z.string().url().optional().or(z.literal("")).default(""),
  tags: z.array(z.string().max(50)).optional().default([]),
});

export async function POST(req: NextRequest) {
  try {
    const jar = await cookies();
    const token = jar.get(AUTH_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createPostBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";
    const r = await fetch(`${apiBase}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(parsed.data),
    });

    const data = await r.json().catch(() => ({}));
    return NextResponse.json(data, { status: r.status });
  } catch {
    return NextResponse.json(
      { error: "Failed to create post." },
      { status: 500 }
    );
  }
}

