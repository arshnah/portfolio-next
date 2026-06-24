"use client";
import useSWR from "swr";
import { useState } from "react";
const fetcher = (u: string) => fetch(u).then(r => r.json());
const fmt = (d: string) => { try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }); } catch { return ""; } };

export default function Guestbook() {
  const { data, mutate } = useSWR("/api/guestbook", fetcher);
  const entries = data?.entries || [];
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit() {
    if (!name.trim() || !msg.trim()) { setErr("naam aur message dono chahiye"); return; }
    setBusy(true); setErr("");
    const res = await fetch("/api/guestbook", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, message: msg }) }).then(r => r.json()).catch(() => ({ ok: false }));
    setBusy(false);
    if (res.ok) { setName(""); setMsg(""); mutate(); } else { setErr("kuch galat hua, dobara try kar"); }
  }

  return (
    <section className="py-[70px] border-t border-white/[0.08]" id="guestbook">
      <div className="flex items-baseline gap-3.5 mb-[34px]"><h2 className="text-[14px] font-semibold tracking-[0.14em] uppercase text-muted">Guestbook</h2><span className="flex-1 h-px bg-white/[0.08]" /></div>
      <p className="text-muted text-[15px] mb-6 max-w-[56ch]">Aaye ho, to ek note chhod jao. Naam, ek line, bas.</p>

      <div className="max-w-[540px] grid gap-2.5 mb-9">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="naam" maxLength={40}
          className="bg-surf border border-white/[0.1] rounded-[10px] px-3.5 py-3 text-[15px] outline-none focus:border-accent transition" />
        <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="kuch likh do..." maxLength={280} rows={3}
          className="bg-surf border border-white/[0.1] rounded-[10px] px-3.5 py-3 text-[15px] outline-none focus:border-accent transition resize-y" />
        <div className="flex items-center gap-3">
          <button onClick={submit} disabled={busy}
            className="justify-self-start bg-accent text-[#1a1206] font-semibold rounded-[10px] px-[22px] py-2.5 text-[14px] transition hover:brightness-110 disabled:opacity-50">
            {busy ? "..." : "sign"}
          </button>
          {err && <span className="text-[13px] text-[#d65a4a]">{err}</span>}
        </div>
      </div>

      <div className="grid gap-3">
        {entries.length === 0 && <p className="text-faint text-[14px] font-mono">// abhi tak koi nahi aaya. pehle tu hi sahi.</p>}
        {entries.map((e: any) => (
          <div key={e.id} className="bg-surf border border-white/[0.08] rounded-[12px] px-[18px] py-4">
            <div className="flex justify-between items-baseline gap-2.5">
              <span className="font-semibold text-[15px] text-accent">{e.name}</span>
              <span className="font-mono text-[11px] text-faint">{fmt(e.created_at)}</span>
            </div>
            <p className="text-ink text-[15px] mt-1.5 break-words">{e.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
