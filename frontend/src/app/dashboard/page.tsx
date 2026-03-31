"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type PostSummary = {
  title: string;
  slug: string;
  excerpt?: string;
  createdAt?: string;
};

export default function DashboardPage() {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [tags, setTags] = useState("");

  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const tagsArray = useMemo(() => {
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 20);
  }, [tags]);

  async function loadPosts() {
    const res = await fetch(`${apiBase}/api/posts?limit=20`);
    const data = await res.json().catch(() => ({}));
    setPosts(data.posts || []);
  }

  useEffect(() => {
    loadPosts().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          coverImageUrl,
          tags: tagsArray,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data?.error || "Failed to create post.");
        return;
      }

      setMessage("Post created successfully.");
      setTitle("");
      setExcerpt("");
      setContent("");
      setCoverImageUrl("");
      setTags("");
      await loadPosts();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="font-semibold">
            Dh Foods CMS
          </Link>
          <Link
            href="/posts"
            className="text-sm text-zinc-600 hover:underline"
          >
            Posts
          </Link>
        </div>
      </header>

      <main className="max-w-5xl w-full mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-zinc-600 mt-2">
          Add a new post. Markdown is supported in the content field.
        </p>

        <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Title</label>
            <input
              className="border rounded-xl px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={200}
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Excerpt (optional)</label>
            <input
              className="border rounded-xl px-3 py-2"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              maxLength={500}
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Cover Image URL (optional)</label>
            <input
              className="border rounded-xl px-3 py-2"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">
              Tags (comma separated)
            </label>
            <input
              className="border rounded-xl px-3 py-2"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="horca, spices, marketing"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Content (Markdown)</label>
            <textarea
              className="border rounded-xl px-3 py-2 min-h-[220px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder={"# Heading\nWrite your post here...\n"}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-black text-white px-6 py-2 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>

          {message ? (
            <div
              className={
                message.toLowerCase().includes("success")
                  ? "text-green-700"
                  : "text-red-700"
              }
            >
              {message}
            </div>
          ) : null}
        </form>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Recent posts</h2>
          <div className="mt-4 grid gap-4">
            {posts.length === 0 ? (
              <div className="text-zinc-600">No posts yet.</div>
            ) : (
              posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/posts/${p.slug}`}
                  className="block rounded-xl border p-4 hover:bg-zinc-50"
                >
                  <div className="font-semibold">{p.title}</div>
                  {p.excerpt ? (
                    <div className="text-zinc-600 mt-2 line-clamp-3">
                      {p.excerpt}
                    </div>
                  ) : null}
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

