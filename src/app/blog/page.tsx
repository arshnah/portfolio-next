import Link from "next/link";
import { posts } from "@/lib/data";
export const metadata = { title: "Writing · Arshdeep Singh" };
const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function Blog() {
  return (
    <main className="wrap py-[120px] min-h-screen">
      <Link href="/" className="font-mono text-[13px] text-muted hover:text-ink transition">&larr; back</Link>
      <h1 className="mt-8 text-[clamp(30px,5vw,46px)] font-bold tracking-[-0.02em]">Writing</h1>
      <p className="mt-3 text-muted text-[16px]">Notes on building things, mostly alone.</p>
      <div className="mt-12 grid gap-2">
        {posts.length === 0 && <p className="text-faint font-mono text-[14px]">// nothing yet. soon.</p>}
        {posts.map(p => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group grid sm:grid-cols-[110px_1fr] gap-2 sm:gap-5 py-5 border-t border-white/[0.08] hover:bg-surf hover:px-4 hover:rounded-[10px] transition">
            <span className="font-mono text-[13px] text-faint pt-1">{fmt(p.date)}</span>
            <div>
              <h2 className="text-[19px] font-semibold tracking-[-0.01em] group-hover:underline underline-offset-4">{p.title}</h2>
              <p className="mt-1.5 text-muted text-[14.5px] leading-[1.6] max-w-[62ch]">{p.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
