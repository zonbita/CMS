import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { AUTH_COOKIE_NAME } from "@/lib/authCookie";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(200),
  role: z.enum(["admin", "editor"]).default("editor"),
});

export async function GET() {
  const jar = await cookies();
  const token = jar.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";
  const r = await fetch(`${apiBase}/api/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}

export async function POST(req: NextRequest) {
  const jar = await cookies();
  const token = jar.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await req.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";
  const r = await fetch(`${apiBase}/api/admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(parsed.data),
  });
  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}

