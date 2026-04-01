import Image from "next/image";
import Link from "next/link";
import { dhfoodsImages } from "@/lib/dhfoods-images";

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src={dhfoodsImages.logo}
              alt="Dh Foods"
              width={140}
              height={42}
              className="h-10 w-auto object-contain object-left"
            />
          </div>
          <div className="font-semibold text-zinc-950 mt-4">CÔNG TY CỔ PHẦN DH FOODS</div>
          <div className="text-sm text-zinc-600 mt-2">
            Demo template inspired by{" "}
            <a className="underline" href="https://www.dhfoods.com.vn/" target="_blank" rel="noreferrer">
              dhfoods.com.vn
            </a>
            .
          </div>
          <div className="text-sm text-zinc-600 mt-4 space-y-1">
            <div>Địa chỉ: (demo) TP.HCM</div>
            <div>Điện thoại: (demo)</div>
            <div>Email: (demo)</div>
          </div>
        </div>

        <div>
          <div className="font-semibold text-zinc-950">Danh mục</div>
          <div className="mt-3 grid gap-2 text-sm">
            <Link className="text-zinc-600 hover:underline" href="/products">
              Sản phẩm
            </Link>
            <Link className="text-zinc-600 hover:underline" href="/recipes">
              Món ngon dễ làm
            </Link>
            <Link className="text-zinc-600 hover:underline" href="/media/news">
              Tin tức - Sự kiện
            </Link>
            <Link className="text-zinc-600 hover:underline" href="/stores">
              Điểm bán
            </Link>
          </div>
        </div>

        <div>
          <div className="font-semibold text-zinc-950">CMS</div>
          <div className="mt-3 grid gap-2 text-sm">
            <Link className="text-zinc-600 hover:underline" href="/dashboard">
              Dashboard
            </Link>
            <Link className="text-zinc-600 hover:underline" href="/posts">
              Bài viết
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-zinc-600">
          © {new Date().getFullYear()} Dh Foods (demo). All rights reserved.
        </div>
      </div>
    </footer>
  );
}

