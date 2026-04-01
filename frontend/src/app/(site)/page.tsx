import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { dhfoodsImages } from "@/lib/dhfoods-images";

export const metadata = {
  title: "Giới thiệu • Dh Foods (demo)",
};

export default function Home() {
  const highlights = [
    { value: "1.0M+", label: "Trung bình số lượng sản phẩm bán ra hằng tháng (demo)" },
    { value: "62,000+", label: "Cửa hàng tạp hóa có mặt sản phẩm (demo)" },
    { value: "8,700+", label: "Siêu thị, cửa hàng tiện lợi có mặt (demo)" },
    { value: "15+", label: "Quốc gia có mặt sản phẩm (demo)" },
  ] as const;

  return (
    <div className="bg-zinc-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <PageHero
          title="DH FOODS LÀ AI?"
          subtitle={
            "Hành trình Dh Foods bắt đầu từ một ước mong đơn giản: Mang hương vị đặc sản khắp vùng miền Việt Nam - sạch sẽ, an toàn và đầy yêu thương - đến từng bữa cơm nhà.\n\nTừ 19/10/2012 đến nay, Dh Foods đã vươn mình trở thành một trong những thương hiệu gia vị Việt được tin chọn và gửi gắm hương vị Việt đến hơn 15 quốc gia và vùng lãnh thổ (demo template)."
          }
          imageUrl={dhfoodsImages.bgHome3}
        />

        <section className="mt-8 grid lg:grid-cols-3 gap-4">
          <div className="rounded-3xl border bg-white p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold">Lời hứa của Dh Foods</h2>
            <div className="mt-4 grid gap-3 text-zinc-700">
              <div className="rounded-2xl border bg-zinc-50 p-5">
                <div className="font-semibold">
                  Không màu tổng hợp, không chất bảo quản nhân tạo
                </div>
                <div className="text-sm text-zinc-600 mt-2">
                  Kiên định giữ vị ngon và màu sắc từ nguyên liệu tự nhiên nhất.
                </div>
              </div>
              <div className="rounded-2xl border bg-zinc-50 p-5">
                <div className="font-semibold">Tỷ lệ nguyên liệu tự nhiên, tươi cao</div>
                <div className="text-sm text-zinc-600 mt-2">
                  Ưu tiên nguyên liệu tươi, rõ ràng nguồn gốc — chọn kỹ từ đầu.
                </div>
              </div>
              <div className="rounded-2xl border bg-zinc-50 p-5">
                <div className="font-semibold">Chất lượng không phải là lời sáo rỗng</div>
                <div className="text-sm text-zinc-600 mt-2">
                  Nhiều chứng nhận/tiêu chuẩn quốc tế (demo template).
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6">
            <h2 className="text-xl font-semibold">Dấu ấn nổi bật</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {highlights.map((x) => (
                <div key={x.value} className="rounded-2xl border bg-zinc-50 p-4">
                  <div className="text-2xl font-semibold">{x.value}</div>
                  <div className="text-xs text-zinc-600 mt-1">{x.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 text-sm text-zinc-600">
              Khám phá thêm:{" "}
              <Link href="/products" className="underline">
                Sản phẩm
              </Link>{" "}
              •{" "}
              <Link href="/media/news" className="underline">
                Tin tức - Sự kiện
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border bg-white p-8">
          <h2 className="text-2xl font-semibold">Tính cách của Dh Foods</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              {
                t: "Sáng tạo",
                d: "Không ngại thử nghiệm, không ngừng cải tiến để phù hợp khẩu vị hiện đại.",
              },
              {
                t: "Trẻ trung",
                d: "Tinh thần tươi mới, gần gũi với mọi thế hệ từ bao bì đến câu chuyện sản phẩm.",
              },
              {
                t: "Đáng tin cậy",
                d: "Minh bạch thông tin, gắn phát triển với trách nhiệm xã hội và chất lượng đầu vào.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border bg-zinc-50 p-6">
                <div className="font-semibold">{x.t}</div>
                <div className="text-sm text-zinc-600 mt-2">{x.d}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

