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

  async function loadUsers() {
    const res = await fetch("/api/admin/users");
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(data?.error || "Failed to load users.");
      return;
    }
    setUsers(data.users || []);
  }

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d?.user) router.replace("/login");
      })
      .catch(() => router.replace("/login"));
    loadUsers().catch(() => {});
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data?.error || "Failed to create user.");
        return;
      }
      setMessage("User created.");
      setEmail("");
      setPassword("");
      setRole("editor");
      await loadUsers();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="font-semibold">
            Dh Foods
          </Link>
          <Link href="/dashboard" className="text-sm text-zinc-600 hover:underline">
            Dashboard
          </Link>
          <Link
            href="/dashboard/products"
            className="text-sm text-zinc-600 hover:underline"
          >
            Products (review)
          </Link>
        </div>
      </header>

      <main className="max-w-5xl w-full mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold">Manage accounts</h1>
        <p className="text-zinc-600 mt-2">
          Only admins can create users.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4 max-w-lg">
          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Email</label>
            <input
              className="border rounded-xl px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Password</label>
            <input
              className="border rounded-xl px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              minLength={6}
              required
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Role</label>
            <select
              className="border rounded-xl px-3 py-2 bg-white"
              value={role}
              onChange={(e) => setRole(e.target.value as "admin" | "editor")}
            >
              <option value="editor">editor</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-black text-white px-6 py-2 disabled:opacity-60 w-fit"
          >
            {loading ? "Creating..." : "Create user"}
          </button>

          {message ? (
            <div className={message.toLowerCase().includes("fail") ? "text-red-700" : "text-zinc-700"}>
              {message}
            </div>
          ) : null}
        </form>

        <section className="mt-12">
          <h2 className="text-xl font-semibold">Users</h2>
          <div className="mt-4 grid gap-3">
            {users.length === 0 ? (
              <div className="text-zinc-600">No users.</div>
            ) : (
              users.map((u) => (
                <div key={u.id} className="rounded-2xl border bg-white p-4">
                  <div className="font-medium">{u.email}</div>
                  <div className="text-sm text-zinc-600 mt-1">role: {u.role}</div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

