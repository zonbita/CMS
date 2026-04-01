export const metadata = {
  title: "Điểm bán • Dh Foods (demo)",
};

import { PageHero } from "@/components/PageHero";
import { pageHeroImages } from "@/lib/dhfoods-images";

export default function StoresPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <PageHero
        title="Điểm bán"
        subtitle="Trang “Điểm bán” (template). Bạn có thể tích hợp bản đồ, bộ lọc theo tỉnh/thành, hoặc nhập dữ liệu cửa hàng từ file/DB."
        imageUrl={pageHeroImages["/stores"]}
      />

      <div className="rounded-3xl border bg-white p-8 mt-6">
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {["TP.HCM", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "Nha Trang"].map(
            (city) => (
              <div key={city} className="rounded-2xl border bg-zinc-50 p-6">
                <div className="font-semibold">{city}</div>
                <div className="text-sm text-zinc-600 mt-2">
                  (Demo) Danh sách điểm bán sẽ hiển thị ở đây.
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}

