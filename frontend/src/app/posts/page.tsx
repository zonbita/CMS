import Link from "next/link";

type PostSummary = {
  title: string;
  slug: string;
  excerpt?: string;
  coverImageUrl?: string;
  createdAt?: string;
};

// Avoid build-time prerender since data comes from external API.
export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";

  let posts: PostSummary[] = [];
  try {
    const res = await fetch(`${apiBase}/api/posts?limit=50`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      posts = data.posts || [];
    }
  } catch {
    posts = [];
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="font-semibold">
            Dh Foods CMS
          </Link>
          <Link href="/dashboard" className="text-sm text-zinc-600 hover:underline">
            Dashboard
          </Link>
        </div>
      </div>

      <main className="max-w-5xl w-full mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold">Tin tức - Sự kiện</h1>
        <p className="text-zinc-600 mt-2">
          Danh sách bài viết được tạo từ dashboard.
        </p>

        <div className="mt-8 grid gap-4">
          {posts.length === 0 ? (
            <div className="text-zinc-600">Chưa có bài viết.</div>
          ) : (
            posts.map((p) => (
              <Link
                key={p.slug}
                href={`/posts/${p.slug}`}
                className="block rounded-xl border hover:bg-zinc-50 p-4 transition"
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
      </main>
    </div>
  );
}

