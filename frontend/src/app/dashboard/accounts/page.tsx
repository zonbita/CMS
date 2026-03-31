"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserRow = {
  id: string;
  email: string;
  role: "admin" | "editor";
  createdAt?: string;
};

export default function AccountsPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/users", { cache: "no-store" as any });
    if (r.status === 401) {
      router.replace("/login");
      return;
    }
    const data = await r.json().catch(() => ({}));
    setUsers(data.users || []);
  }

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d?.user) router.replace("/login");
      })
      .catch(() => router.replace("/login"));
    load().catch(() => {});
  }, [router]);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const r = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        setMessage(data?.error || "Failed to create user.");
        return;
      }
      setMessage("User created.");
      setEmail("");
      setPassword("");
      setRole("editor");
      await load();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-3xl border bg-white p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Manage accounts</h1>
            <p className="text-zinc-600 mt-2">
              Only admins can list/create users.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full border bg-white px-5 py-2 text-sm font-medium hover:bg-zinc-50"
          >
            ← Back to dashboard
          </Link>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-semibold">Create user</h2>
            <form onSubmit={createUser} className="mt-4 grid gap-4">
              <div className="grid gap-1">
                <label className="text-sm text-zinc-700">Email</label>
                <input
                  className="border rounded-xl px-3 py-2"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-700">Password</label>
                <input
                  className="border rounded-xl px-3 py-2"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-700">Role</label>
                <select
                  className="border rounded-xl px-3 py-2"
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                >
                  <option value="editor">editor</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-zinc-950 text-white px-6 py-2 font-medium disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create"}
              </button>
              {message ? (
                <div
                  className={
                    message.toLowerCase().includes("created")
                      ? "text-green-700 text-sm"
                      : "text-red-700 text-sm"
                  }
                >
                  {message}
                </div>
              ) : null}
            </form>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Users</h2>
            <div className="mt-4 grid gap-3">
              {users.length === 0 ? (
                <div className="text-zinc-600 text-sm">
                  No users (or you are not admin).
                </div>
              ) : (
                users.map((u) => (
                  <div
                    key={u.id}
                    className="rounded-2xl border bg-zinc-50 p-4 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-medium">{u.email}</div>
                      <div className="text-sm text-zinc-600">{u.role}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

