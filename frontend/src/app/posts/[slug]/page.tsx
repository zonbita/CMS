import { notFound } from "next/navigation";
import Link from "next/link";
import type { ImgHTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Post = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";

  const res = await fetch(`${apiBase}/api/posts/${params.slug}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) return notFound();

  const data = (await res.json()) as { post?: Post };
  const post = data.post;
  if (!post) return notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="font-semibold">
            Dh Foods CMS
          </Link>
          <Link href="/posts" className="text-sm text-zinc-600 hover:underline">
            Tin tức - Sự kiện
          </Link>
        </div>
      </header>

      <main className="max-w-5xl w-full mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        {post.excerpt ? (
          <p className="text-zinc-600 mt-2 whitespace-pre-line">
            {post.excerpt}
          </p>
        ) : null}

        {post.coverImageUrl ? (
          // If you want images, upload/store URL in `coverImageUrl`.
          <img
            alt={post.title}
            src={post.coverImageUrl}
            className="w-full max-h-[420px] object-cover mt-6 rounded-xl"
          />
        ) : null}

        <article className="prose max-w-none mt-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Prevent Next from trying to optimize external images in markdown.
              img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img {...props} alt={props.alt || post.title} />
              ),
            }}
            skipHtml
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}

