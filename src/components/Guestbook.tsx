"use client";
import useSWR from "swr";
import { useState } from "react";
const fetcher = (u: string) => fetch(u).then(r => r.json());
const fmt = (d: string) => {
  try {
    const then = new Date(d), now = new Date();
    const startOf = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
    const days = Math.round((startOf(now) - startOf(then)) / 86400000);
    if (days <= 0) return then.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
    if (days < 7) return `${days}d ago`;
    const sameYear = then.getFullYear() === now.getFullYear();
    return then.toLocaleDateString("en-IN", { day: "numeric", month: "short", ...(sameYear ? {} : { year: "numeric" }) });
  } catch { return ""; }
};

const field: React.CSSProperties = { width: "100%", padding: "6px 8px", border: "1px solid var(--field-bd)", fontFamily: '"Courier New", monospace', fontSize: "15px", background: "var(--field)", color: "var(--ink)" };

export default function Guestbook() {
  const { data, mutate } = useSWR("/api/guestbook", fetcher);
  const entries = data?.entries || [];
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit() {
    if (!name.trim() || !msg.trim()) { setErr("name and message are both required"); return; }
    setBusy(true); setErr("");
    const res = await fetch("/api/guestbook", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, message: msg }) }).then(r => r.json()).catch(() => ({ ok: false }));
    setBusy(false);
    if (res.ok) { setName(""); setMsg(""); mutate(); } else { setErr("something went wrong, try again"); }
  }

  return (
    <div id="guestbook">
      <h2>Guestbook</h2>
      <p>Passing through? Leave a note. A name, one line, that&apos;s all.</p>

      <div style={{ maxWidth: 480, marginBottom: 24 }}>
        <div style={{ marginBottom: 6 }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="name" maxLength={40} style={field} />
        </div>
        <div style={{ marginBottom: 6 }}>
          <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="write something..." maxLength={280} rows={3} style={{ ...field, resize: "vertical" }} />
        </div>
        <button onClick={submit} disabled={busy} style={{ padding: "5px 18px", fontFamily: '"Courier New", monospace', fontSize: "14px" }}>
          {busy ? "..." : "sign"}
        </button>
        {err && <span style={{ marginLeft: 10, color: "#e0554c", fontSize: 14 }}>{err}</span>}
      </div>

      <div>
        {entries.length === 0 && <p style={{ color: "var(--muted)" }}>no one has signed yet. be the first.</p>}
        {entries.map((e: any) => (
          <div key={e.id} style={{ borderTop: "1px solid var(--line)", padding: "8px 0" }}>
            <div>
              <b>{e.name}</b>
              <span style={{ color: "var(--faint)", marginLeft: 10, fontFamily: '"Courier New", monospace', fontSize: 13 }} title={new Date(e.created_at).toLocaleString("en-IN")}>{fmt(e.created_at)}</span>
            </div>
            <div style={{ marginTop: 3, wordBreak: "break-word" }}>{e.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
