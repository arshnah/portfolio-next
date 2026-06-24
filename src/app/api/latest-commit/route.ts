import { NextResponse } from "next/server";
export const revalidate = 0;
export async function GET() {
  const user = process.env.NEXT_PUBLIC_GITHUB_USER || "arshnah";
  try {
    const ev = await fetch(`https://api.github.com/users/${user}/events/public?per_page=30`, { headers: { Accept: "application/vnd.github+json" }, cache: "no-store" }).then(r => r.json());
    const push = Array.isArray(ev) ? ev.find((e: any) => e.type === "PushEvent") : null;
    if (!push?.payload?.commits?.length) return NextResponse.json({ ok: false });
    const c = push.payload.commits[push.payload.commits.length - 1];
    return NextResponse.json({ ok: true, sha: c.sha.slice(0, 7), message: c.message.split("\n")[0], repo: push.repo.name, date: push.created_at, url: `https://github.com/${push.repo.name}/commit/${c.sha}` });
  } catch { return NextResponse.json({ ok: false }); }
}
