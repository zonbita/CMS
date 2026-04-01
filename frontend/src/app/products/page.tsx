import Image from "next/image";
import Link from "next/link";
import { productCategoryImages } from "@/lib/dhfoods-images";

export const metadata = {
  title: "Sản phẩm • Dh Foods (demo)",
};

export const dynamic = "force-dynamic";

type DbProduct = {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: string;
};

const categories = [
  { label: "Muối chấm", href: "/products/muoi-cham", desc: "Muối chấm Tây Ninh và nhiều hương vị." },
  { label: "Xốt chấm", href: "/products/xot-cham", desc: "Đậm đà, cay nồng, chua ngọt." },
  { label: "Gia vị tự nhiên", href: "/products/gia-vi-tu-nhien", desc: "Hành, tỏi, tiêu, ớt… chọn lọc." },
  { label: "Gia vị hoàn chỉnh", href: "/products/gia-vi-hoan-chinh", desc: "Tỷ lệ vàng, nấu nhanh, tiện lợi." },
  { label: "Gia vị nấu ướp", href: "/products/gia-vi-nau-uop", desc: "Thảo mộc tự nhiên cho món Việt." },
  { label: "Sa tế", href: "/products/sa-te", desc: "Hương vị cay nồng hoàn hảo." },
  { label: "Hộp quà gia vị", href: "/products/hop-qua", desc: "Quà tặng doanh nghiệp / mùa lễ." },
  { label: "Sản phẩm trọng lượng lớn", href: "/products/trong-luong-lon", desc: "HORECA / bếp công nghiệp." },
  { label: "Sản phẩm từ gạo", href: "/products/tu-gao", desc: "Dòng sản phẩm từ gạo Việt Nam." },
] as const;

export default async function ProductsPage() {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";

  let dbProducts: DbProduct[] = [];
  try {
    const res = await fetch(`${apiBase}/api/products?limit=50`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      dbProducts = data.products || [];
    }
  } catch {
    dbProducts = [];
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-3xl border bg-white p-8">
        <h1 className="text-3xl font-semibold">Sản phẩm</h1>
        <p className="text-zinc-600 mt-3 max-w-3xl">
          Trang danh mục sản phẩm (template). Mỗi nhóm có một trang riêng để bạn
          thay nội dung và danh sách sản phẩm thật.
        </p>

        {dbProducts.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-xl font-semibold">Sản phẩm từ CMS (đã duyệt)</h2>
            <p className="text-sm text-zinc-600 mt-1">
              Dữ liệu MongoDB — tạo và duyệt tại{" "}
              <Link href="/dashboard/products" className="underline">
                Dashboard → Sản phẩm
              </Link>
              .
            </p>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dbProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/p/${p.slug}`}
                  className="rounded-3xl border bg-zinc-50 overflow-hidden hover:bg-zinc-100 transition group"
                >
                  {p.imageUrl ? (
                    <div className="aspect-[4/3] bg-white border-b flex items-center justify-center p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-zinc-100 border-b flex items-center justify-center text-zinc-400 text-sm">
                      Chưa có ảnh
                    </div>
                  )}
                  <div className="p-5">
                    <div className="font-semibold">{p.name}</div>
                    {p.description ? (
                      <div className="text-sm text-zinc-600 mt-2 line-clamp-2">
                        {p.description}
                      </div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <h2 className="text-xl font-semibold mt-10">Danh mục (template)</h2>
        <p className="text-sm text-zinc-600 mt-1">
          Các nhóm cố định — trang con demo theo từng dòng sản phẩm.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => {
            const thumb = productCategoryImages[c.href];
            return (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-3xl border bg-white overflow-hidden hover:bg-zinc-50 transition group"
            >
              {thumb ? (
                <div className="relative aspect-[4/3] bg-zinc-100 border-b">
                  <Image
                    src={thumb}
                    alt={c.label}
                    fill
                    className="object-contain p-4 group-hover:scale-[1.02] transition"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : null}
              <div className="p-6">
              <div className="font-semibold">{c.label}</div>
              <div className="text-sm text-zinc-600 mt-2">{c.desc}</div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

