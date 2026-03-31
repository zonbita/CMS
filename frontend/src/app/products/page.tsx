import Link from "next/link";

export const metadata = {
  title: "Sản phẩm • Dh Foods (demo)",
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

export default function ProductsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-3xl border bg-white p-8">
        <h1 className="text-3xl font-semibold">Sản phẩm</h1>
        <p className="text-zinc-600 mt-3 max-w-3xl">
          Trang danh mục sản phẩm (template). Mỗi nhóm có một trang riêng để bạn
          thay nội dung và danh sách sản phẩm thật.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-3xl border bg-zinc-50 p-6 hover:bg-zinc-100 transition"
            >
              <div className="font-semibold">{c.label}</div>
              <div className="text-sm text-zinc-600 mt-2">{c.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

