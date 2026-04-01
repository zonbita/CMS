"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason: string;
  createdAt?: string;
  createdByEmail: string | null;
  reviewedByEmail: string | null;
};

export default function DashboardProductsPage() {
  const router = useRouter();

  const [userRole, setUserRole] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");

  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await fetch("/api/admin/products?status=all");
      const data = await res.json().catch(() => ({}));
      setProducts(data.products || []);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d?.user) router.replace("/login");
        else setUserRole(d.user.role || null);
      })
      .catch(() => router.replace("/login"));
    loadProducts();
  }, [router, loadProducts]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug: slug.trim() || undefined,
          description,
          imageUrl,
          category,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data?.error || "Không tạo được sản phẩm.");
        return;
      }

      setMessage("Đã gửi sản phẩm — chờ duyệt (pending).");
      setName("");
      setSlug("");
      setDescription("");
      setImageUrl("");
      setCategory("");
      await loadProducts();
    } finally {
      setLoading(false);
    }
  }

  async function review(id: string, status: "approved" | "rejected") {
    const rejectionReason =
      status === "rejected"
        ? window.prompt("Lý do từ chối (tuỳ chọn):", "") || ""
        : undefined;

    setMessage(null);
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        rejectionReason: rejectionReason ?? "",
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(data?.error || "Cập nhật thất bại.");
      return;
    }
    setMessage(status === "approved" ? "Đã duyệt sản phẩm." : "Đã từ chối sản phẩm.");
    await loadProducts();
  }

  const isAdmin = userRole === "admin";
  const pendingForReview = isAdmin ? products.filter((p) => p.status === "pending") : [];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4">
          <Link href="/" className="font-semibold">
            Dh Foods
          </Link>
          <Link href="/dashboard" className="text-sm text-zinc-600 hover:underline">
            Dashboard
          </Link>
          <Link
            href="/dashboard/products"
            className="text-sm font-medium text-zinc-950"
          >
            Sản phẩm &amp; duyệt
          </Link>
          <Link href="/posts" className="text-sm text-zinc-600 hover:underline">
            Posts
          </Link>
        </div>
      </header>

      <main className="max-w-5xl w-full mx-auto px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Sản phẩm (database)</h1>
            <p className="text-zinc-600 mt-2 max-w-2xl">
              Tạo sản phẩm mới — lưu MongoDB với trạng thái{" "}
              <span className="font-medium">pending</span>. Admin duyệt hoặc từ
              chối trước khi hiển thị công khai trên trang{" "}
              <Link href="/products" className="underline">
                /products
              </Link>
              .
            </p>
          </div>
          <Link
            href="/dashboard/accounts"
            className="rounded-full border bg-white px-5 py-2 text-sm font-medium hover:bg-zinc-50"
          >
            Tài khoản
          </Link>
        </div>

        <form className="mt-8 rounded-2xl border bg-white p-6 grid gap-4" onSubmit={onSubmit}>
          <h2 className="text-lg font-semibold">Thêm sản phẩm</h2>
          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Tên sản phẩm</label>
            <input
              className="border rounded-xl px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={200}
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Slug (tuỳ chọn)</label>
            <input
              className="border rounded-xl px-3 py-2"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Để trống để tự tạo từ tên"
              maxLength={200}
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Mô tả</label>
            <textarea
              className="border rounded-xl px-3 py-2 min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={10000}
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Ảnh (URL)</label>
            <input
              className="border rounded-xl px-3 py-2"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-zinc-700">Nhóm / category (slug, tuỳ chọn)</label>
            <input
              className="border rounded-xl px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="vd: muoi-cham"
              maxLength={100}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-black text-white px-6 py-2 disabled:opacity-60 w-fit"
          >
            {loading ? "Đang lưu..." : "Gửi duyệt"}
          </button>
          {message ? (
            <div className={message.includes("thất bại") || message.includes("Không") ? "text-red-700" : "text-green-700"}>
              {message}
            </div>
          ) : null}
        </form>

        {isAdmin && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold">Hàng chờ duyệt (admin)</h2>
            <p className="text-sm text-zinc-600 mt-1">
              Sản phẩm đang <span className="font-medium">pending</span> — duyệt để xuất hiện public.
            </p>
            {listLoading ? (
              <div className="text-zinc-600 mt-4">Đang tải...</div>
            ) : pendingForReview.length === 0 ? (
              <div className="text-zinc-600 mt-4">Không có sản phẩm chờ duyệt.</div>
            ) : (
              <ul className="mt-4 grid gap-3">
                {pendingForReview.map((p) => (
                  <li key={p.id} className="rounded-xl border bg-white p-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-zinc-600 mt-1">
                        slug: {p.slug}
                        {p.createdByEmail ? ` • gửi bởi ${p.createdByEmail}` : null}
                      </div>
                      {p.description ? (
                        <div className="text-sm text-zinc-700 mt-2 line-clamp-3">
                          {p.description}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => review(p.id, "approved")}
                        className="rounded-full bg-emerald-600 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-700"
                      >
                        Duyệt
                      </button>
                      <button
                        type="button"
                        onClick={() => review(p.id, "rejected")}
                        className="rounded-full border border-red-200 text-red-800 px-4 py-2 text-sm font-medium hover:bg-red-50"
                      >
                        Từ chối
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section className="mt-10">
          <h2 className="text-xl font-semibold">{isAdmin ? "Tất cả sản phẩm (theo quyền)" : "Sản phẩm của bạn"}</h2>
          {listLoading ? (
            <div className="text-zinc-600 mt-4">Đang tải...</div>
          ) : products.length === 0 ? (
            <div className="text-zinc-600 mt-4">Chưa có bản ghi.</div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b text-left text-zinc-600">
                    <th className="py-2 pr-4">Tên</th>
                    <th className="py-2 pr-4">Trạng thái</th>
                    {isAdmin ? <th className="py-2 pr-4">Người gửi</th> : null}
                    <th className="py-2">Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-zinc-100">
                      <td className="py-3 pr-4 align-top">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-zinc-500 text-xs mt-0.5">{p.slug}</div>
                      </td>
                      <td className="py-3 pr-4 align-top">
                        <span className={p.status === "approved" ? "text-emerald-700" : p.status === "rejected" ? "text-red-700" : "text-amber-700"}>
                          {p.status}
                        </span>
                      </td>
                      {isAdmin ? (
                        <td className="py-3 pr-4 align-top text-zinc-600">
                          {p.createdByEmail || "—"}
                        </td>
                      ) : null}
                      <td className="py-3 align-top text-zinc-600">
                        {p.status === "rejected" && p.rejectionReason ? p.rejectionReason : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

