"use client";
import useSWR from "swr";
import { useEffect, useState, useRef } from "react";
const fetcher = (u: string) => fetch(u).then(r => r.json());
// brightened dnd + offline so the status label text clears WCAG 4.5:1 on the
// dark bg (online/idle already passed)
const DOT: Record<string, string> = { online: "#2f8f4e", idle: "#b98514", dnd: "#f85149", offline: "#8b8f98" };
const LBL: Record<string, string> = { online: "online", idle: "idle", dnd: "dnd", offline: "offline" };
// Theme-aware so the now-playing title clears WCAG 4.5:1 in both themes:
// bright colors on the dark bg, saturated-dark on the light bg.
const MUSIC_DARK = ["#6aa6f0", "#eb9a54", "#a99bf5", "#45cdb0", "#f27a9a", "#e0c25e", "#57ce72", "#f27a9a"];
const MUSIC_LIGHT = ["#1f5aa0", "#9c4e18", "#5540b5", "#1c7d68", "#a3284c", "#77590c", "#1c7d3c", "#a3284c"];

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
  useEffect(() => { setCi(Math.floor(Math.random() * MUSIC_DARK.length)); }, []);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    const read = () => setTheme((document.documentElement.getAttribute("data-theme") || "dark") as "light" | "dark");
    read();
    const o = new MutationObserver(read);
    o.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => o.disconnect();
  }, []);
  const lastTitle = useRef<string | null>(null);
  useEffect(() => {
    const title = np?.isPlaying ? np?.title : null;
    if (title && title !== lastTitle.current) {
      if (lastTitle.current !== null) setCi(c => (c + 1) % MUSIC_DARK.length);
      lastTitle.current = title;
    }
  }, [np?.isPlaying, np?.title]);
  const musicColor = (theme === "light" ? MUSIC_LIGHT : MUSIC_DARK)[ci];
  const status = dc?.status ?? "offline";
  const sep = <span style={{ color: "var(--muted)" }}>/</span>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px", fontFamily: 'var(--font-mono), "Courier New", monospace', fontSize: "14px", color: "var(--muted)", margin: "10px 0" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: DOT[status], display: "inline-block" }} />
        <span style={{ color: DOT[status] }}>{LBL[status]}</span>
      </span>
      {sep}
      {np?.isPlaying && np?.title
        ? <a href={np.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>{np.albumArt ? <img src={np.albumArt} alt="" width={16} height={16} style={{ borderRadius: 3, display: "block" }} /> : <span>&#9834;</span>}<span style={{ color: musicColor }}>{np.title}</span> <span style={{ color: "var(--muted)" }}>&middot; {np.artist}</span></a>
        : <span style={{ color: "var(--muted)" }}>&#9834; not playing</span>}
      {sep}
      <span style={{ color: "var(--muted)" }}>{clock} IST</span>
      {commit?.ok && (
        <>
          {sep}
          <a href={commit.url} target="_blank" rel="noopener noreferrer">last shipped: {commit.message.toLowerCase()}</a>
        </>
      )}
    </div>
  );
}
