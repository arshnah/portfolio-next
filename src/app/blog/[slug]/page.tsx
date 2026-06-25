import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/data";

export function generateStaticParams() { return posts.map(p => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find(p => p.slug === params.slug);
  return { title: post ? `${post.title} · Arshdeep Singh` : "Writing" };
}
const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function Post({ params }: { params: { slug: string } }) {
  const post = posts.find(p => p.slug === params.slug);
  if (!post) notFound();
  return (
    <main className="wrap py-[120px] min-h-screen max-w-[720px]">
      <Link href="/blog" className="font-mono text-[13px] text-muted hover:text-ink transition">&larr; all posts</Link>
      <p className="mt-8 font-mono text-[13px] text-faint">{fmt(post.date)}</p>
      <h1 className="mt-2 text-[clamp(28px,5vw,44px)] font-bold tracking-[-0.02em] leading-[1.1]">{post.title}</h1>
      <div className="mt-8 grid gap-5">
        {post.body.map((para, i) => <p key={i} className="text-[17px] text-ink/90 leading-[1.75]">{para}</p>)}
      </div>
    </main>
  );
}
