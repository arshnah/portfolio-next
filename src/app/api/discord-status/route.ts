import { NextResponse } from "next/server";
export const revalidate = 0;

const IDS = (process.env.NEXT_PUBLIC_DISCORD_IDS || "1352866897900732446,300137175238836225")
  .split(",").map(s => s.trim()).filter(Boolean);

const rank = (p: any) =>
  p?.spotify ? 5 : p?.discord_status === "online" ? 4 : p?.discord_status === "idle" ? 3 : p?.discord_status === "dnd" ? 2 : 1;

export async function GET() {
  try {
    const results = await Promise.all(
      IDS.map(id =>
        fetch(`https://api.lanyard.rest/v1/users/${id}`, { cache: "no-store" })
          .then(r => r.json()).catch(() => null)
      )
    );
    const presences = results.filter(r => r?.success && r?.data).map(r => r.data);
    if (!presences.length) return NextResponse.json({ success: false, data: { discord_status: "offline" } });
    const best = presences.sort((a, b) => rank(b) - rank(a))[0];
    return NextResponse.json({ success: true, data: best });
  } catch {
    return NextResponse.json({ success: false, data: { discord_status: "offline" } });
  }
}
