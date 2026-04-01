import Image from "next/image";
import Link from "next/link";
import { dhfoodsImages } from "@/lib/dhfoods-images";

const productCategories = [
  { label: "Muối chấm", href: "/products/muoi-cham" },
  { label: "Xốt chấm", href: "/products/xot-cham" },
  { label: "Gia vị tự nhiên", href: "/products/gia-vi-tu-nhien" },
  { label: "Gia vị hoàn chỉnh", href: "/products/gia-vi-hoan-chinh" },
  { label: "Gia vị nấu ướp", href: "/products/gia-vi-nau-uop" },
  { label: "Sa tế", href: "/products/sa-te" },
  { label: "Hộp quà gia vị", href: "/products/hop-qua" },
  { label: "Sản phẩm trọng lượng lớn", href: "/products/trong-luong-lon" },
  { label: "Sản phẩm từ gạo", href: "/products/tu-gao" },
] as const;

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-zinc-800 hover:text-zinc-950"
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src={dhfoodsImages.logo}
              alt="Dh Foods"
              width={120}
              height={36}
              className="h-9 w-auto object-contain object-left"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <details className="group relative">
              <summary className="list-none cursor-pointer text-sm font-medium text-zinc-800 hover:text-zinc-950">
                Sản phẩm
              </summary>
              <div className="absolute left-0 top-9 w-[520px] rounded-2xl border bg-white shadow-lg p-3">
                <div className="grid grid-cols-2 gap-1">
                  {productCategories.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </details>

            <NavLink href="/recipes">Món ngon dễ làm</NavLink>
            <details className="group relative">
              <summary className="list-none cursor-pointer text-sm font-medium text-zinc-800 hover:text-zinc-950">
                Truyền thông
              </summary>
              <div className="absolute left-0 top-9 w-56 rounded-2xl border bg-white shadow-lg p-2">
                <Link
                  href="/media/news"
                  className="block rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                >
                  Tin tức - Sự kiện
                </Link>
                <Link
                  href="/posts"
                  className="block rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                >
                  Bài viết (CMS)
                </Link>
              </div>
            </details>
            <NavLink href="/cooperate">Hợp tác</NavLink>
            <NavLink href="/stores">Điểm bán</NavLink>
            <NavLink href="/about">Về DH FOODS</NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <details className="md:hidden relative">
              <summary className="list-none cursor-pointer rounded-full border px-3 py-2 text-sm">
                Menu
              </summary>
              <div className="absolute right-0 top-11 w-64 rounded-2xl border bg-white shadow-lg p-2">
                <Link className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-50" href="/about">
                  Về DH FOODS
                </Link>
                <Link className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-50" href="/products">
                  Sản phẩm
                </Link>
                <Link className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-50" href="/recipes">
                  Món ngon dễ làm
                </Link>
                <Link className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-50" href="/media/news">
                  Truyền thông
                </Link>
                <Link className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-50" href="/cooperate">
                  Hợp tác
                </Link>
                <Link className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-50" href="/stores">
                  Điểm bán
                </Link>
                <Link className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-50" href="/posts">
                  Bài viết (CMS)
                </Link>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}

