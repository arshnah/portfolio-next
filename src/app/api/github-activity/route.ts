import { NextResponse } from "next/server";

// cache the third-party fetch for an hour so every visitor doesn't hit it
export const revalidate = 3600;

export async function GET() {
  const user = process.env.NEXT_PUBLIC_GITHUB_USER || "arshnah";
  try {
    const data = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    }).then((r) => r.json());
    if (!Array.isArray(data?.contributions)) return NextResponse.json({ ok: false });
    const total =
      data.total?.lastYear ??
      data.contributions.reduce((s: number, d: { count: number }) => s + d.count, 0);
    return NextResponse.json({ ok: true, total, days: data.contributions });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
