"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Cmd = { label: string; hint?: string; href: string; ext?: boolean };

const COMMANDS: Cmd[] = [
  { label: "Work", hint: "featured projects", href: "/#work" },
  { label: "Blog", hint: "posts", href: "/blog" },
  { label: "Résumé", hint: "print / pdf", href: "/resume" },
  { label: "Guestbook", hint: "leave a note", href: "/#guestbook" },
  { label: "Contact", href: "/#contact" },
  { label: "pings", hint: "contact preferences & availability", href: "/pings" },
  { label: "now", hint: "what I'm doing, live", href: "https://now.arshnah.in", ext: true },
  { label: "wrapped", hint: "a last.fm year in sound", href: "https://wrapped.arshnah.in", ext: true },
  { label: "playlist", hint: "on repeat", href: "https://playlist.arshnah.in", ext: true },
  { label: "uses", hint: "my stack", href: "https://uses.arshnah.in", ext: true },
  { label: "scratch", hint: "markdown pad", href: "https://scratch.arshnah.in", ext: true },
  { label: "buttons", hint: "88x31 maker", href: "https://buttons.arshnah.in", ext: true },
  { label: "slop", hint: "AI-text detector", href: "https://slop.arshnah.in", ext: true },
  { label: "chud", hint: "chudGPT", href: "https://chud.arshnah.in", ext: true },
  { label: "larp", hint: "fake terminal", href: "https://larp.arshnah.in", ext: true },
  { label: "card", hint: "larper ID card", href: "https://card.arshnah.in", ext: true },
  { label: "shame", href: "https://shame.arshnah.in", ext: true },
  { label: "status", href: "https://status.arshnah.in", ext: true },
  { label: "larpring", hint: "the webring", href: "https://larpring.github.io", ext: true },
  { label: "GitHub", href: "https://github.com/arshnah", ext: true },
  { label: "Email", href: "mailto:arshjbdarsh@gmail.com", ext: true },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? COMMANDS.filter((c) => (c.label + " " + (c.hint || "")).toLowerCase().includes(s)) : COMMANDS;
  }, [q]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); setQ(""); setI(0); }
      else if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 10); }, [open]);
  useEffect(() => { setI(0); }, [q]);
  useEffect(() => { listRef.current?.querySelector('[data-on="1"]')?.scrollIntoView({ block: "nearest" }); }, [i]);

  function go(c: Cmd) { setOpen(false); if (c.ext) window.open(c.href, "_blank", "noopener"); else window.location.href = c.href; }
  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setI((x) => Math.min(x + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setI((x) => Math.max(x - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (results[i]) go(results[i]); }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .cmdk-hint{position:fixed;left:14px;bottom:14px;z-index:40;font-family:var(--font-mono),monospace;font-size:12px;color:var(--muted);background:var(--card);border:1px solid var(--line);border-radius:8px;padding:5px 9px;cursor:pointer;opacity:.85;}
        .cmdk-hint:hover{opacity:1;border-color:var(--link);}
        .cmdk-hint kbd{background:var(--field,#0000);border:1px solid var(--line);border-radius:4px;padding:0 4px;}
        .cmdk-back{position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;padding-top:12vh;}
        .cmdk{width:min(520px,92vw);background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.5);}
        .cmdk input{width:100%;border:0;border-bottom:1px solid var(--line);background:none;color:var(--ink);font:inherit;font-size:16px;padding:14px 16px;outline:none;}
        .cmdk .list{max-height:min(52vh,420px);overflow-y:auto;padding:6px;}
        .cmdk .row{display:flex;align-items:baseline;gap:10px;padding:9px 11px;border-radius:8px;cursor:pointer;}
        .cmdk .row[data-on='1']{background:var(--link);color:var(--bg);}
        .cmdk .row[data-on='1'] .hint{color:var(--bg);opacity:.8;}
        .cmdk .lbl{font-weight:600;font-size:14px;}
        .cmdk .hint{color:var(--faint);font-size:12.5px;font-family:var(--font-mono),monospace;}
        .cmdk .ext{margin-left:auto;color:var(--faint);font-size:11px;}
        .cmdk .row[data-on='1'] .ext{color:var(--bg);opacity:.7;}
        .cmdk .none{padding:14px;color:var(--muted);font-size:14px;}
      ` }} />

      {!open && (
        <button className="cmdk-hint" onClick={() => { setOpen(true); setQ(""); setI(0); }} aria-label="open command menu">
          <kbd>⌘</kbd> <kbd>K</kbd> menu
        </button>
      )}

      {open && (
        <div className="cmdk-back" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="cmdk">
            <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onInputKey} placeholder="jump to… (work, playlist, resume, chud)" />
            <div className="list" ref={listRef}>
              {results.length === 0 && <div className="none">nothing here.</div>}
              {results.map((c, n) => (
                <div key={c.href} className="row" data-on={n === i ? "1" : "0"} onMouseEnter={() => setI(n)} onClick={() => go(c)}>
                  <span className="lbl">{c.label}</span>
                  {c.hint && <span className="hint">{c.hint}</span>}
                  {c.ext && <span className="ext">↗</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
