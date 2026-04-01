export const metadata = {
  title: "Hợp tác • Dh Foods (demo)",
};

import { PageHero } from "@/components/PageHero";
import { pageHeroImages } from "@/lib/dhfoods-images";

export default function CooperatePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <PageHero
        title="Hợp tác kinh doanh"
        subtitle="Trang hợp tác (template) theo cấu trúc Dh Foods: HORECA, Nhà máy/OEM, Quà tặng doanh nghiệp, Xuất khẩu, Nhà phân phối, Chuỗi siêu thị…"
        imageUrl={pageHeroImages["/cooperate"]}
      />

      <div className="rounded-3xl border bg-white p-8 mt-6">
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {[
            { t: "HORECA", d: "Quán ăn • Nhà hàng • Khách sạn" },
            { t: "Nhà máy & OEM", d: "Đối tác sản xuất • gia công" },
            { t: "Quà tặng doanh nghiệp", d: "Set quà theo mùa / branding" },
            { t: "Hợp tác xuất khẩu", d: "Thị trường quốc tế" },
            { t: "Nhà phân phối", d: "Online / Offline" },
            { t: "Chuỗi siêu thị", d: "Kênh bán hiện đại" },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border bg-zinc-50 p-6">
              <div className="font-semibold">{x.t}</div>
              <div className="text-sm text-zinc-600 mt-2">{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

