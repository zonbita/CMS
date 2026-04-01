import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ImgHTMLAttributes } from "react";

export const dynamic = "force-dynamic";

type Post = {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
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

  let post: Post | null = null;
  try {
    const res = await fetch(`${apiBase}/api/posts/${params.slug}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      post = data.post || null;
    }
  } catch {
    post = null;
  }

  if (!post) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-zinc-600">Post not found.</div>
        <div className="mt-4">
          <Link href="/posts" className="underline">
            ← Back to posts
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="font-semibold">
            Dh Foods
          </Link>
          <Link href="/posts" className="text-sm text-zinc-600 hover:underline">
            Posts
          </Link>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        {post.excerpt ? (
          <p className="text-zinc-600 mt-2 whitespace-pre-line">
            {post.excerpt}
          </p>
        ) : null}

        {post.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
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
              img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img {...props} alt={props.alt || post.title} />
              ),
            }}
            skipHtml
          >
            {post.content || ""}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}

