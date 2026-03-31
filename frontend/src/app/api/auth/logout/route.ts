import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/authCookie";

export async function POST() {
  const jar = await cookies();
  jar.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 0,
  });
  return NextResponse.json({ ok: true });
}

