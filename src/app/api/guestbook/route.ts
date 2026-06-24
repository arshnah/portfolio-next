import { NextResponse } from "next/server";
export const revalidate = 0;
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const H = { apikey: KEY || "", Authorization: `Bearer ${KEY || ""}`, "Content-Type": "application/json" };

export async function GET() {
  if (!URL || !KEY) return NextResponse.json({ entries: [] });
  try {
    const r = await fetch(`${URL}/rest/v1/guestbook?select=id,name,message,created_at&order=created_at.desc&limit=100`, { headers: H, cache: "no-store" });
    const data = await r.json();
    return NextResponse.json({ entries: Array.isArray(data) ? data : [] });
  } catch { return NextResponse.json({ entries: [] }); }
}

export async function POST(req: Request) {
  if (!URL || !KEY) return NextResponse.json({ ok: false, error: "guestbook not configured" }, { status: 500 });
  try {
    const body = await req.json();
    const name = String(body.name || "").trim().slice(0, 40);
    const message = String(body.message || "").trim().slice(0, 280);
    if (!name || !message) return NextResponse.json({ ok: false, error: "name and message required" }, { status: 400 });
    const r = await fetch(`${URL}/rest/v1/guestbook`, { method: "POST", headers: { ...H, Prefer: "return=representation" }, body: JSON.stringify({ name, message }) });
    if (!r.ok) return NextResponse.json({ ok: false, error: await r.text() }, { status: 500 });
    const d = await r.json();
    return NextResponse.json({ ok: true, entry: Array.isArray(d) ? d[0] : d });
  } catch (e: any) { return NextResponse.json({ ok: false, error: String(e) }, { status: 500 }); }
}
