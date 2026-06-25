"use client";
import useSWR from "swr";
import { useEffect, useState, useRef } from "react";
const fetcher = (u: string) => fetch(u).then(r => r.json());
const DOT: Record<string,string> = { online:"#4caf6a", idle:"#e0a83a", dnd:"#d65a4a", offline:"#5d5d59" };
const LBL: Record<string,string> = { online:"online", idle:"idle", dnd:"dnd", offline:"offline" };
const MUSIC_COLORS = ["#7fa8c9","#d98c5a","#9b8cff","#5fae9e","#e0667f","#e3b341","#6fcf97","#f0728a"];

export default function Activity() {
  const { data: dc } = useSWR("/api/discord-status", fetcher, { refreshInterval: 8000 });
  const { data: np } = useSWR("/api/now-playing", fetcher, { refreshInterval: 12000 });
  const { data: commit } = useSWR("/api/latest-commit", fetcher, { refreshInterval: 60000 });
  const [clock, setClock] = useState("");
  useEffect(() => {
    const t = () => setClock(new Date().toLocaleTimeString("en-IN", { timeZone:"Asia/Kolkata", hour:"2-digit", minute:"2-digit" }));
    t(); const i = setInterval(t, 30000); return () => clearInterval(i);
  }, []);
  const [ci, setCi] = useState(() => Math.floor(Math.random() * MUSIC_COLORS.length));
  const lastTitle = useRef<string | null>(null);
  useEffect(() => {
    const title = np?.isPlaying ? np?.title : null;
    if (title && title !== lastTitle.current) {
      if (lastTitle.current !== null) setCi(c => (c + 1) % MUSIC_COLORS.length);
      lastTitle.current = title;
    }
  }, [np?.isPlaying, np?.title]);
  const musicColor = MUSIC_COLORS[ci];

  const status = dc?.data?.discord_status ?? "offline";
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[13px] text-muted">
      <span className="inline-flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ background: DOT[status], boxShadow:`0 0 7px ${DOT[status]}` }} /><span style={{ color: DOT[status] }}>{LBL[status]}</span>
      </span>
      <span className="text-faint">/</span>
      {np?.isPlaying && np?.title ? (
        <a href={np.url} target="_blank" rel="noopener noreferrer" className="transition hover:brightness-125">♪ <span style={{ color: musicColor }} className="transition-colors duration-500">{np.title}</span> <span className="text-faint">— {np.artist}</span></a>
      ) : <span className="text-faint">♪ not playing</span>}
      <span className="text-faint">/</span>
      <span className="text-faint">{clock} IST</span>
      {commit?.ok && (<>
        <span className="text-faint">/</span>
        <a href={commit.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">last shipped: {commit.message.toLowerCase()}</a>
      </>)}
    </div>
  );
}
