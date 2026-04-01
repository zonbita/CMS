import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { AUTH_COOKIE_NAME } from "@/lib/authCookie";

const createProductBodySchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).optional(),
  description: z.string().max(10000).optional().default(""),
  imageUrl: z.string().url().optional().or(z.literal("")).default(""),
  category: z.string().max(100).optional().default(""),
});

export async function GET(req: NextRequest) {
  try {
    const jar = await cookies();
    const token = jar.get(AUTH_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const status = req.nextUrl.searchParams.get("status") || "all";
    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";
    const r = await fetch(
      `${apiBase}/api/admin/products?status=${encodeURIComponent(status)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    const data = await r.json().catch(() => ({}));
    return NextResponse.json(data, { status: r.status });
  } catch {
    return NextResponse.json(
      { error: "Failed to list products." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const jar = await cookies();
    const token = jar.get(AUTH_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createProductBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";
    const r = await fetch(`${apiBase}/api/products`, {
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
      { error: "Failed to create product." },
      { status: 500 }
    );
  }
}
