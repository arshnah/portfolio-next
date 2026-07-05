"use client";
import useSWR from "swr";
import { useEffect, useState, useRef } from "react";
const fetcher = (u: string) => fetch(u).then(r => r.json());
// brightened dnd + offline so the status label text clears WCAG 4.5:1 on the
// dark bg (online/idle already passed)
const DOT: Record<string, string> = { online: "#2f8f4e", idle: "#b98514", dnd: "#f85149", offline: "#8b8f98" };
const LBL: Record<string, string> = { online: "online", idle: "idle", dnd: "dnd", offline: "offline" };
const MUSIC_COLORS = ["#3a6ea5", "#a85a24", "#6a4fd0", "#2f8f7a", "#b5305a", "#9a7410", "#2f8f4e", "#b5305a"];

export default function Activity() {
  const { data: dc } = useSWR("/api/discord-status", fetcher, { refreshInterval: 8000 });
  const { data: np } = useSWR("/api/now-playing", fetcher, { refreshInterval: 12000 });
  const { data: commit } = useSWR("/api/last-commit", fetcher, { refreshInterval: 60000 });
  const [clock, setClock] = useState("");
  useEffect(() => {
    const t = () => setClock(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }));
    t(); const i = setInterval(t, 30000); return () => clearInterval(i);
  }, []);
  // start deterministic (matches SSR), pick a random start color after mount so
  // server and client render identically during hydration
  const [ci, setCi] = useState(0);
  useEffect(() => { setCi(Math.floor(Math.random() * MUSIC_COLORS.length)); }, []);
  const lastTitle = useRef<string | null>(null);
  useEffect(() => {
    const title = np?.isPlaying ? np?.title : null;
    if (title && title !== lastTitle.current) {
      if (lastTitle.current !== null) setCi(c => (c + 1) % MUSIC_COLORS.length);
      lastTitle.current = title;
    }
  }, [np?.isPlaying, np?.title]);
  const musicColor = MUSIC_COLORS[ci];
  const status = dc?.status ?? "offline";
  const sep = <span style={{ color: "var(--faint)" }}>/</span>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px", fontFamily: 'var(--font-mono), "Courier New", monospace', fontSize: "14px", color: "var(--muted)", margin: "10px 0" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: DOT[status], display: "inline-block" }} />
        <span style={{ color: DOT[status] }}>{LBL[status]}</span>
      </span>
      {sep}
      {np?.isPlaying && np?.title
        ? <a href={np.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>{np.albumArt ? <img src={np.albumArt} alt="" width={16} height={16} style={{ borderRadius: 3, display: "block" }} /> : <span>&#9834;</span>}<span style={{ color: musicColor }}>{np.title}</span> <span style={{ color: "var(--faint)" }}>&middot; {np.artist}</span></a>
        : <span style={{ color: "var(--faint)" }}>&#9834; not playing</span>}
      {sep}
      <span style={{ color: "var(--faint)" }}>{clock} IST</span>
      {commit?.ok && (
        <>
          {sep}
          <a href={commit.url} target="_blank" rel="noopener noreferrer">last shipped: {commit.message.toLowerCase()}</a>
        </>
      )}
    </div>
  );
}
