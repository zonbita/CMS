import { notFound } from "next/navigation";
import Image from "next/image";
import { productCategoryImages } from "@/lib/dhfoods-images";

const categoryMap: Record<
  string,
  { title: string; description: string; highlights: string[] }
> = {
  "muoi-cham": {
    title: "Muối chấm",
    description:
      "Template cho nhóm Muối chấm (ví dụ: Muối Tôm Tây Ninh và các hương vị khác).",
    highlights: ["Trái cây nhiệt đới", "Rau luộc", "Trứng luộc", "Món ăn vặt"],
  },
  "xot-cham": {
    title: "Xốt chấm",
    description: "Template cho nhóm Xốt chấm (đậm đà, cay nồng, chua ngọt…).",
    highlights: ["Hải sản", "Thịt nướng", "Viên chiên", "Topping lẩu"],
  },
  "gia-vi-tu-nhien": {
    title: "Gia vị tự nhiên",
    description: "Template cho nhóm Gia vị tự nhiên (hành, tỏi, tiêu, ớt…).",
    highlights: ["Tươi vị", "Không pha trộn tạp chất", "Mùi thơm tự nhiên"],
  },
  "gia-vi-hoan-chinh": {
    title: "Gia vị hoàn chỉnh",
    description:
      "Template cho nhóm Gia vị hoàn chỉnh (pha trộn theo tỷ lệ vàng, tiện lợi).",
    highlights: ["Nhanh", "Chuẩn vị", "Không cần nêm thêm"],
  },
  "gia-vi-nau-uop": {
    title: "Gia vị nấu ướp",
    description:
      "Template cho nhóm Gia vị nấu & ướp (thảo mộc tự nhiên cho món Việt).",
    highlights: ["Phở", "Bún bò", "Thịt nướng", "Bò kho"],
  },
  "sa-te": {
    title: "Sa tế",
    description: "Template cho nhóm Sa tế (cay nồng, đậm đà).",
    highlights: ["Phở/Bún", "Mì Quảng", "Ướp nướng", "Xào/chiên"],
  },
  "hop-qua": {
    title: "Hộp quà gia vị",
    description: "Template cho nhóm hộp quà (quà tặng doanh nghiệp, dịp lễ).",
    highlights: ["Quà tặng", "Thiết kế sang", "Tuỳ biến theo nhu cầu"],
  },
  "trong-luong-lon": {
    title: "Sản phẩm trọng lượng lớn",
    description:
      "Template cho nhóm trọng lượng lớn (nhà hàng, bếp công nghiệp, OEM).",
    highlights: ["Tiết kiệm", "Ổn định", "HORECA", "OEM"],
  },
  "tu-gao": {
    title: "Sản phẩm từ gạo",
    description:
      "Template cho nhóm sản phẩm từ gạo (nguyên liệu tự nhiên tuyển chọn).",
    highlights: ["Gạo Việt", "An toàn", "Hương vị mới lạ"],
  },
};

export default function ProductCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const cat = categoryMap[params.category];
  if (!cat) return notFound();

  const href = `/products/${params.category}`;
  const thumb = productCategoryImages[href];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-3xl border bg-white overflow-hidden">
        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-[260px] flex-1">
              <div className="text-xs font-semibold tracking-wide text-emerald-700">
                SẢN PHẨM
              </div>
              <h1 className="text-3xl font-semibold mt-2">{cat.title}</h1>
              <p className="text-zinc-600 mt-3 max-w-3xl">{cat.description}</p>
            </div>
            {thumb ? (
              <div className="relative h-28 w-36 sm:h-32 sm:w-40 rounded-2xl border bg-zinc-50 overflow-hidden">
                <Image
                  src={thumb}
                  alt={cat.title}
                  fill
                  className="object-contain p-4"
                  sizes="160px"
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="px-8 pb-8 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border bg-zinc-50 p-6">
            <div className="font-semibold">Điểm nổi bật</div>
            <ul className="mt-3 grid gap-2 text-sm text-zinc-700">
              {cat.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-zinc-50 p-6">
            <div className="font-semibold">Danh sách sản phẩm</div>
            <div className="text-sm text-zinc-600 mt-2">
              (Template) Bạn có thể kết nối MongoDB để quản trị sản phẩm tương tự
              như Posts, hoặc tích hợp dữ liệu từ ERP/PIM.
            </div>
            <div className="mt-4 grid gap-3">
              {["Sản phẩm A", "Sản phẩm B", "Sản phẩm C"].map((x) => (
                <div key={x} className="rounded-xl border bg-white p-4">
                  <div className="font-medium">{x}</div>
                  <div className="text-sm text-zinc-600 mt-1">Mô tả ngắn (demo).</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

