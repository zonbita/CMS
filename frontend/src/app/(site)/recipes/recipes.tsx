import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { dhfoodsImages, pageHeroImages } from "@/lib/dhfoods-images";

export const metadata = {
  title: "Món ngon dễ làm • Dh Foods (demo)",
};

const recipes = [
  {
    t: "Cá Lóc Kho Tiêu đậm đà hao cơm",
    time: "20 phút",
    people: "3-4 người",
    href: "/recipes/ca-loc-kho-tieu",
  },
  {
    t: "Lẩu Chua Cay siêu đơn giản",
    time: "15 phút",
    people: "3-4 người",
    href: "/recipes/lau-chua-cay",
  },
  {
    t: "Gà nướng tiêu đen cay the",
    time: "25 phút",
    people: "2-3 người",
    href: "/recipes/ga-nuong-tieu-den",
  },
  {
    t: "Canh chua sườn non “huyền thoại”",
    time: "30 phút",
    people: "2-3 người",
    href: "/recipes/canh-chua-suon-non",
  },
];

export default function RecipesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <PageHero
        title="Món ngon dễ làm"
        subtitle="Trang công thức (template). Bạn có thể chuyển phần này thành CMS riêng tương tự Posts nếu cần quản trị công thức nấu ăn."
        imageUrl={pageHeroImages["/recipes"]}
      />

      <div className="rounded-3xl border bg-white p-8 mt-6">
        <div className="grid md:grid-cols-2 gap-4">
          {recipes.map((r, idx) => {
            const thumb =
              idx % 2 === 0
                ? dhfoodsImages.recipeCanhChua
                : dhfoodsImages.recipeKhoThitCa;
            return (
              <Link
                key={r.href}
                href={r.href}
                className="rounded-3xl border bg-white overflow-hidden hover:bg-zinc-50 transition group"
              >
                <div className="relative aspect-[16/9] bg-zinc-100">
                  <Image
                    src={thumb}
                    alt={r.t}
                    fill
                    className="object-cover transition group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="font-semibold">{r.t}</div>
                  <div className="text-sm text-zinc-600 mt-2">
                    {r.time} • {r.people} • Món Việt Nam (demo)
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

