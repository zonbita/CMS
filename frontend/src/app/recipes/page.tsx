import Link from "next/link";

export const metadata = {
  title: "Món ngon dễ làm • Dh Foods (demo)",
};

const recipes = [
  { t: "Cá Lóc Kho Tiêu đậm đà hao cơm", time: "20 phút", people: "3-4 người", href: "/recipes/ca-loc-kho-tieu" },
  { t: "Lẩu Chua Cay siêu đơn giản", time: "15 phút", people: "3-4 người", href: "/recipes/lau-chua-cay" },
  { t: "Gà nướng tiêu đen cay the", time: "25 phút", people: "2-3 người", href: "/recipes/ga-nuong-tieu-den" },
  { t: "Canh chua sườn non “huyền thoại”", time: "30 phút", people: "2-3 người", href: "/recipes/canh-chua-suon-non" },
];

export default function RecipesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-3xl border bg-white p-8">
        <h1 className="text-3xl font-semibold">Món ngon dễ làm</h1>
        <p className="text-zinc-600 mt-3 max-w-3xl">
          Trang công thức (template). Bạn có thể chuyển phần này thành CMS riêng
          tương tự Posts nếu cần quản trị công thức nấu ăn.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {recipes.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="rounded-3xl border bg-zinc-50 p-6 hover:bg-zinc-100 transition"
            >
              <div className="font-semibold">{r.t}</div>
              <div className="text-sm text-zinc-600 mt-2">
                {r.time} • {r.people} • Món Việt Nam (demo)
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

