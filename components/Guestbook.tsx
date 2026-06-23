"use client";
import { useEffect, useRef, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

type Entry = { name: string; message: string; created_at: string };

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const configured = URL.startsWith("http") && KEY.length > 20;

function fmt(t: string) {
  try { return new Date(t).toLocaleDateString("en-IN", { day: "numeric", month: "short" }); } catch { return "now"; }
}

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [note, setNote] = useState("loading…");
  const [sending, setSending] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const sb = useRef<SupabaseClient | null>(null);

  function getLocal(): Entry[] { try { return JSON.parse(localStorage.getItem("gb") || "[]"); } catch { return []; } }
  function setLocal(a: Entry[]) { try { localStorage.setItem("gb", JSON.stringify(a)); } catch {} }

  async function load() {
    if (configured && sb.current) {
      const { data } = await sb.current.from("guestbook").select("*").order("created_at", { ascending: false }).limit(50);
      setEntries((data as Entry[]) || []);
    } else setEntries(getLocal());
  }

  useEffect(() => {
    if (configured) {
      sb.current = createClient(URL, KEY);
      setNote("live · realtime");
      const ch = sb.current
        .channel("gb")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "guestbook" }, () => load())
        .subscribe();
      load();
      return () => { sb.current?.removeChannel(ch); };
    } else {
      setNote("demo mode · add Supabase keys for realtime");
      setEntries(getLocal());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit() {
    const name = (nameRef.current?.value || "").trim();
    const message = (msgRef.current?.value || "").trim();
    if (!name || !message) { alert("Naam aur message dono bhar de."); return; }
    setSending(true);
    try {
      if (configured && sb.current) { await sb.current.from("guestbook").insert({ name, message }); await load(); }
      else { const a = [{ name, message, created_at: new Date().toISOString() }, ...getLocal()]; setLocal(a); setEntries(a); }
      if (nameRef.current) nameRef.current.value = "";
      if (msgRef.current) msgRef.current.value = "";
    } catch (e) { alert("Kuch gadbad hui, console dekh."); console.error(e); }
    setSending(false);
  }

  return (
    <section className="chapter" id="guestbook">
      <div className="shell">
        <div className="ch-head rv in"><span className="ch-no">03</span><h2>Guestbook</h2><span className="line" /></div>
        <p style={{ color: "var(--muted)", maxWidth: "54ch", marginBottom: "24px" }}>
          Say hi, leave feedback, ya bas apna naam chhod ja. <span className="gb-note">{note}</span>
        </p>
        <div className="gb-form">
          <input ref={nameRef} maxLength={40} placeholder="Your name" />
          <textarea ref={msgRef} rows={2} maxLength={200} placeholder="Your message" />
          <button onClick={submit} disabled={sending}>Sign the log →</button>
        </div>
        <div className="gb-list">
          {entries.length === 0 ? (
            <div className="gb-empty">Be the first to sign ✶</div>
          ) : (
            entries.map((e, i) => (
              <div className="gb-entry" key={i}>
                <div className="gb-top"><span className="gb-name">{e.name}</span><span className="gb-time">{fmt(e.created_at)}</span></div>
                <div className="gb-text">{e.message}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
