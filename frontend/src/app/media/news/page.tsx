import Link from "next/link";

export const dynamic = "force-dynamic";

type PostSummary = {
  title: string;
  slug: string;
  excerpt?: string;
  createdAt?: string;
};

export const metadata = {
  title: "Tin tức - Sự kiện • Dh Foods (demo)",
};

export default async function MediaNewsPage() {
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
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-3xl border bg-white p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Tin tức - Sự kiện</h1>
            <p className="text-zinc-600 mt-3 max-w-3xl">
              Trang truyền thông (template) hiển thị bài viết lấy từ CMS.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full bg-zinc-950 text-white px-5 py-2 text-sm font-medium hover:bg-zinc-800"
          >
            Thêm bài viết
          </Link>
        </div>

        <div className="mt-8 grid gap-4">
          {posts.length === 0 ? (
            <div className="text-zinc-600">Chưa có bài viết.</div>
          ) : (
            posts.map((p) => (
              <Link
                key={p.slug}
                href={`/posts/${p.slug}`}
                className="rounded-2xl border bg-zinc-50 p-5 hover:bg-zinc-100 transition"
              >
                <div className="font-semibold">{p.title}</div>
                {p.excerpt ? (
                  <div className="text-sm text-zinc-600 mt-2 line-clamp-3">
                    {p.excerpt}
                  </div>
                ) : null}
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

