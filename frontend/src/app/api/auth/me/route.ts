import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/authCookie";

export async function GET() {
  const jar = await cookies();
  const token = jar.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 200 });

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";
  const r = await fetch(`${apiBase}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) return NextResponse.json({ user: null }, { status: 200 });
  return NextResponse.json({ user: data.user }, { status: 200 });
}

