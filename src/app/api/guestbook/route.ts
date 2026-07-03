import { NextResponse } from "next/server";
export const revalidate = 0;
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const H = { apikey: KEY || "", Authorization: `Bearer ${KEY || ""}`, "Content-Type": "application/json" };

function spammy(name: string, message: string) {
  const s = `${name} ${message}`;
  if (/https?:\/\/|www\.|\b[a-z0-9-]+\.(xyz|top|ru|tk|club|online|site|shop|live|link|click)\b/i.test(s)) return true;
  if (/pg_terminate|pg_sleep|;\s*(select|insert|update|delete|create|drop|alter)/i.test(s)) return true;
  if ((message.match(/\|/g) || []).length > 3) return true;
  const letters = message.replace(/[^a-zA-Z]/g, "");
  if (letters.length > 24 && letters === letters.toUpperCase()) return true;
  return false;
}

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
    if (spammy(name, message)) return NextResponse.json({ ok: false, error: "that looks like spam" }, { status: 400 });
    const r = await fetch(`${URL}/rest/v1/guestbook`, { method: "POST", headers: { ...H, Prefer: "return=representation" }, body: JSON.stringify({ name, message }) });
    if (!r.ok) return NextResponse.json({ ok: false, error: await r.text() }, { status: 500 });
    const d = await r.json();
    return NextResponse.json({ ok: true, entry: Array.isArray(d) ? d[0] : d });
  } catch (e: any) { return NextResponse.json({ ok: false, error: String(e) }, { status: 500 }); }
}
