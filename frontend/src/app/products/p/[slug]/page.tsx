import Link from "next/link";

export const dynamic = "force-dynamic";

type Product = {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: string;
};

export default async function CatalogProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";

  let product: Product | null = null;
  try {
    const res = await fetch(`${apiBase}/api/products/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      product = data.product || null;
    }
  } catch {
    product = null;
  }

  if (!product) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-zinc-600">Không tìm thấy sản phẩm (hoặc chưa được duyệt).</p>
        <Link href="/products" className="text-emerald-700 underline mt-4 inline-block">
          ← Danh mục sản phẩm
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-3xl border bg-white overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {product.imageUrl ? (
            <div className="aspect-square bg-zinc-100 flex items-center justify-center p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
            <div className="aspect-square bg-zinc-100 flex items-center justify-center text-zinc-400 text-sm">
              Chưa có ảnh
            </div>
          )}
          <div className="p-8 flex flex-col justify-center">
            {product.category ? (
              <div className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">
                {product.category}
              </div>
            ) : null}
            <h1 className="text-3xl font-semibold mt-1">{product.name}</h1>
            {product.description ? (
              <p className="text-zinc-700 mt-4 whitespace-pre-line">{product.description}</p>
            ) : null}
            <Link
              href="/products"
              className="text-sm text-emerald-700 underline mt-8 inline-block"
            >
              ← Tất cả sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
