"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        setError(data?.error || "Login failed.");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="max-w-md mx-auto rounded-3xl border bg-white p-8">
        <h1 className="text-2xl font-semibold">Đăng nhập</h1>
        <p className="text-zinc-600 mt-2 text-sm">
          Đăng nhập để vào dashboard (viết bài, quản lý tài khoản).
        </p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Email</label>
            <input
              className="border rounded-xl px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              autoComplete="email"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Password</label>
            <input
              className="border rounded-xl px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-zinc-950 text-white px-6 py-2 font-medium disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          {error ? <div className="text-red-700 text-sm">{error}</div> : null}
        </form>

        <div className="mt-6 text-sm text-zinc-600">
          <Link href="/" className="underline">
            ← Về trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}

