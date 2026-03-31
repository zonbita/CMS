import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { AUTH_COOKIE_NAME } from "@/lib/authCookie";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(200),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";
    const r = await fetch(`${apiBase}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return NextResponse.json(data, { status: r.status });
    }

    const token = data?.token;
    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Invalid login response." },
        { status: 502 }
      );
    }

    const jar = await cookies();
    jar.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}

