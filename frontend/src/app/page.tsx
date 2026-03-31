import Link from "next/link";

type PostSummary = {
  title: string;
  slug: string;
  excerpt?: string;
};

// This page depends on the Express API (Mongo-backed). Avoid build-time prerender.
export const dynamic = "force-dynamic";

export default async function Home() {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";

  let posts: PostSummary[] = [];
  try {
    const res = await fetch(`${apiBase}/api/posts?limit=6`, {
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
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="font-semibold">Dh Foods CMS</div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/posts" className="text-zinc-600 hover:underline">
              Tin tức
            </Link>
            <Link
              href="/dashboard"
              className="text-zinc-600 hover:underline"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs text-zinc-600">
                NextJS + NodeJS + MongoDB
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold mt-4 leading-tight">
                Tạo nội dung nhanh, quản trị từ dashboard.
              </h1>
              <p className="text-zinc-600 mt-3 max-w-xl">
                Bạn có thể thêm bài viết (Tin tức / Sự kiện) từ trang quản trị,
                bài viết sẽ tự động hiển thị tại trang public.
              </p>
              <div className="flex gap-3 mt-6">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-black text-white px-6 py-2 inline-flex items-center hover:bg-zinc-800 transition"
                >
                  Thêm bài viết
                </Link>
                <Link
                  href="/posts"
                  className="rounded-full border bg-white px-6 py-2 inline-flex items-center hover:bg-zinc-50 transition"
                >
                  Xem danh sách
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="font-semibold">Các danh mục (demo)</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  "Muối chấm",
                  "Xốt chấm",
                  "Gia vị tự nhiên",
                  "Gia vị nấu ướp",
                  "Gia vị hoàn chỉnh",
                  "Sa tế",
                ].map((t) => (
                  <div
                    key={t}
                    className="rounded-xl border bg-zinc-50 px-3 py-3 text-sm font-medium text-zinc-700"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 pb-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Tin tức - Sự kiện mới nhất</h2>
              <p className="text-zinc-600 mt-2">
                Nội dung được lấy từ MongoDB thông qua API của NodeJS.
              </p>
            </div>
            <Link href="/posts" className="text-sm text-zinc-600 hover:underline">
              Xem tất cả →
            </Link>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {posts.length === 0 ? (
              <div className="md:col-span-3 text-zinc-600">
                Chưa có bài viết.
              </div>
            ) : (
              posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/posts/${p.slug}`}
                  className="rounded-2xl border bg-white p-5 hover:bg-zinc-50 transition block"
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
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-zinc-600">
          © {new Date().getFullYear()} Dh Foods CMS. Demo dashboard + posts.
        </div>
      </footer>
    </div>
  );
}
