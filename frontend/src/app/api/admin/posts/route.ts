import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
    const apiKey = process.env.ADMIN_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Server is not configured for admin writes. Set ADMIN_API_KEY in environment.",
        },
        { status: 503 }
      );
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
        "x-api-key": apiKey,
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

