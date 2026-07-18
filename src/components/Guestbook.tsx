"use client";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
const fetcher = (u: string) => fetch(u).then(r => r.json());
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
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
  const [token, setToken] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY) return;
    function render() {
      const ts = (window as unknown as { turnstile?: { render: (el: HTMLElement, o: object) => string; reset: (id: string) => void } }).turnstile;
      if (ts && boxRef.current && widgetId.current === null) {
        widgetId.current = ts.render(boxRef.current, {
          sitekey: SITE_KEY,
          theme: "dark",
          callback: (t: string) => setToken(t),
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
        });
      }
    }
    const id = "cf-turnstile-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true; s.defer = true;
      s.onload = render;
      document.head.appendChild(s);
    } else { render(); }
  }, []);

  async function submit() {
    if (!name.trim() || !msg.trim()) { setErr("name and message are both required"); return; }
    if (SITE_KEY && !token) { setErr("please complete the check below"); return; }
    setBusy(true); setErr("");
    const res = await fetch("/api/guestbook", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, message: msg, turnstileToken: token }) }).then(r => r.json()).catch(() => ({ ok: false }));
    setBusy(false);
    if (res.ok) {
      setName(""); setMsg(""); setToken(""); mutate();
      const ts = (window as unknown as { turnstile?: { reset: (id: string) => void } }).turnstile;
      if (ts && widgetId.current !== null) ts.reset(widgetId.current);
    } else { setErr(res.error || "something went wrong, try again"); }
  }

  return (
    <div id="guestbook">
      <h2>Guestbook{entries.length > 0 && <span style={{ color: "var(--faint)", fontWeight: 400, fontSize: 14, fontFamily: 'var(--font-mono),"Courier New",monospace' }}> · {entries.length} {entries.length === 1 ? "signature" : "signatures"}</span>}</h2>
      <p>Passing through? Leave a note. A name, one line, that&apos;s all.</p>
      <p style={{ color: "var(--faint)", fontSize: 14, marginTop: -8 }}>
        Yes, I saw the <code>{"'; DROP TABLE"}</code> and the <code>{"<script>"}</code> tags, all logged,
        escaped, and quietly ignored. (Still a larper, though.) hi nisarga &amp; the threadlocked webring 👋
      </p>
      <p style={{ color: "var(--muted)", borderLeft: "2px solid #e0554c", paddingLeft: 8, fontSize: 13.5, margin: "8px 0 16px" }}>
        Note: Guestbook signatures are temporarily disabled due to a Supabase database permissions issue (missing <code>GRANT INSERT ON public.guestbook TO anon</code>).
      </p>

      <div style={{ maxWidth: 480, marginBottom: 24, opacity: 0.6 }}>
        <div style={{ marginBottom: 6 }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="name" maxLength={40} style={field} disabled />
        </div>
        <div style={{ marginBottom: 6 }}>
          <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="write something..." maxLength={280} rows={3} style={{ ...field, resize: "vertical" }} disabled />
        </div>
        {SITE_KEY && <div ref={boxRef} style={{ marginBottom: 8 }} />}
        <button onClick={submit} disabled={busy || true} style={{ padding: "5px 18px", fontFamily: '"Courier New", monospace', fontSize: "14px", cursor: "not-allowed" }}>
          {busy ? "..." : "disabled"}
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
