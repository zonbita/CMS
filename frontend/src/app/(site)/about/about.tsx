export const metadata = {
  title: "Về DH FOODS • Dh Foods (demo)",
};

import { PageHero } from "@/components/PageHero";
import { pageHeroImages } from "@/lib/dhfoods-images";

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <PageHero
        title="Về DH FOODS"
        subtitle="Đây là trang template theo cấu trúc của dhfoods.com.vn. Bạn có thể thay nội dung thật (câu chuyện thương hiệu, nhà máy, chất lượng, tuyển dụng, phát triển bền vững…)."
        imageUrl={pageHeroImages["/about"]}
      />

      <div className="rounded-3xl border bg-white p-8 mt-6">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { t: "Câu chuyện thương hiệu", d: "Giới thiệu hành trình và định vị thương hiệu." },
            { t: "Góc nhìn CEO", d: "Bài viết chuyên mục góc nhìn." },
            { t: "Phát triển bền vững", d: "Cam kết chất lượng và trách nhiệm." },
            { t: "Nhà máy - Chất lượng", d: "Tiêu chuẩn sản xuất (template)." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border bg-zinc-50 p-5">
              <div className="font-semibold">{x.t}</div>
              <div className="text-sm text-zinc-600 mt-2">{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

