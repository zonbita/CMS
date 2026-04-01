import Image from "next/image";
import Link from "next/link";
import { dhfoodsImages, productCategoryImages } from "@/lib/dhfoods-images";

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
    <div className="bg-zinc-50">
      <section className="bg-gradient-to-b from-emerald-50 to-zinc-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs text-zinc-600">
              Không ngừng nỗ lực • mang gia vị đặc sản sạch
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold mt-4 leading-tight">
              Gia vị Việt cho bữa ăn thêm tròn vị.
            </h1>
            <p className="text-zinc-700 mt-4 max-w-xl">
              Template website theo cấu trúc{" "}
              <a className="underline" href="https://www.dhfoods.com.vn/" target="_blank" rel="noreferrer">
                dhfoods.com.vn
              </a>{" "}
              và tích hợp CMS (Next.js dashboard → Node.js API → MongoDB).
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link
                href="/products"
                className="rounded-full bg-emerald-600 text-white px-6 py-2 inline-flex items-center hover:bg-emerald-700 transition font-medium"
              >
                Khám phá sản phẩm
              </Link>
              <Link
                href="/recipes"
                className="rounded-full border bg-white px-6 py-2 inline-flex items-center hover:bg-zinc-50 transition font-medium"
              >
                Món ngon dễ làm
              </Link>
              <Link
                href="/media/news"
                className="rounded-full border bg-white px-6 py-2 inline-flex items-center hover:bg-zinc-50 transition font-medium"
              >
                Tin tức - Sự kiện
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">
            <div className="relative aspect-[16/10] w-full bg-zinc-100">
              <Image
                src={dhfoodsImages.heroBanner}
                alt="Dh Foods — gia vị Việt"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border bg-zinc-50 p-5">
                <div className="text-3xl font-semibold">1.0M+</div>
                <div className="text-sm text-zinc-600 mt-1">
                  Sản phẩm bán ra mỗi tháng (demo)
                </div>
              </div>
              <div className="rounded-2xl border bg-zinc-50 p-5">
                <div className="text-3xl font-semibold">62,000+</div>
                <div className="text-sm text-zinc-600 mt-1">
                  Cửa hàng tạp hóa có mặt (demo)
                </div>
              </div>
              <div className="rounded-2xl border bg-zinc-50 p-5">
                <div className="text-3xl font-semibold">8,700+</div>
                <div className="text-sm text-zinc-600 mt-1">
                  Siêu thị & cửa hàng tiện lợi (demo)
                </div>
              </div>
              <div className="rounded-2xl border bg-zinc-50 p-5">
                <div className="text-3xl font-semibold">15+</div>
                <div className="text-sm text-zinc-600 mt-1">
                  Quốc gia phân phối (demo)
                </div>
              </div>
            </div>
            <div className="mt-5 text-sm text-zinc-600">
              Muốn thêm bài viết? Vào{" "}
              <Link href="/dashboard" className="underline">
                dashboard
              </Link>
              .
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Danh mục sản phẩm nổi bật
            </h2>
            <p className="text-zinc-600 mt-2">
              Các nhóm sản phẩm theo menu của Dh Foods (template).
            </p>
          </div>
          <Link href="/products" className="text-sm text-zinc-600 hover:underline">
            Xem tất cả →
          </Link>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: "MUỐI CHẤM TÂY NINH", d: "Từ niềm tự hào Muối Tôm Tây Ninh trứ danh.", href: "/products/muoi-cham" },
            { t: "XỐT CHẤM", d: "Đậm đà, cay nồng, chua ngọt… đủ vị.", href: "/products/xot-cham" },
            { t: "GIA VỊ TỰ NHIÊN", d: "Tươi vị đất Việt, đậm đà từng món quen.", href: "/products/gia-vi-tu-nhien" },
            { t: "GIA VỊ NẤU ƯỚP", d: "Thảo mộc tự nhiên cho món Việt.", href: "/products/gia-vi-nau-uop" },
            { t: "GIA VỊ HOÀN CHỈNH", d: "Pha trộn theo tỷ lệ vàng, tiện lợi.", href: "/products/gia-vi-hoan-chinh" },
            { t: "SA TẾ", d: "Tinh hoa nguyên liệu, cay nồng hoàn hảo.", href: "/products/sa-te" },
          ].map((c) => {
            const thumb = productCategoryImages[c.href];
            return (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-3xl border bg-white overflow-hidden hover:bg-zinc-50 transition group"
            >
              {thumb ? (
                <div className="relative aspect-[4/3] bg-zinc-100">
                  <Image
                    src={thumb}
                    alt={c.t}
                    fill
                    className="object-contain p-4 transition group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : null}
              <div className="p-6 pt-4">
              <div className="text-xs font-semibold tracking-wide text-emerald-700">
                KHÁM PHÁ
              </div>
              <div className="mt-2 text-lg font-semibold">{c.t}</div>
              <div className="mt-2 text-sm text-zinc-600">{c.d}</div>
              </div>
            </Link>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Tin tức - Sự kiện mới nhất
            </h2>
            <p className="text-zinc-600 mt-2">
              Lấy từ MongoDB thông qua Node.js API (bài viết tạo từ dashboard).
            </p>
          </div>
          <Link href="/posts" className="text-sm text-zinc-600 hover:underline">
            Xem tất cả →
          </Link>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {posts.length === 0 ? (
            <div className="md:col-span-3 text-zinc-600">Chưa có bài viết.</div>
          ) : (
            posts.map((p) => (
              <Link
                key={p.slug}
                href={`/posts/${p.slug}`}
                className="rounded-3xl border bg-white p-6 hover:bg-zinc-50 transition block"
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
    </div>
  );
}
