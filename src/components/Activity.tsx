"use client";
import useSWR from "swr";
import { useEffect, useState } from "react";
const fetcher = (u: string) => fetch(u).then(r => r.json());
const DOT: Record<string,string> = { online:"#4caf6a", idle:"#e0a83a", dnd:"#d65a4a", offline:"#5d5d59" };
const LBL: Record<string,string> = { online:"online", idle:"idle", dnd:"dnd", offline:"offline" };

export default function Activity() {
  const { data: dc } = useSWR("/api/discord-status", fetcher, { refreshInterval: 8000 });
  const { data: np } = useSWR("/api/now-playing", fetcher, { refreshInterval: 12000 });
  const { data: commit } = useSWR("/api/latest-commit", fetcher, { refreshInterval: 60000 });
  const [clock, setClock] = useState("");
  useEffect(() => {
    const t = () => setClock(new Date().toLocaleTimeString("en-IN", { timeZone:"Asia/Kolkata", hour:"2-digit", minute:"2-digit" }));
    t(); const i = setInterval(t, 30000); return () => clearInterval(i);
  }, []);
  const status = dc?.data?.discord_status ?? "offline";
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[13px] text-muted">
      <span className="inline-flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ background: DOT[status], boxShadow:`0 0 7px ${DOT[status]}` }} />{LBL[status]}
      </span>
      <span className="text-faint">/</span>
      {np?.isPlaying && np?.title ? (
        <a href={np.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">♪ {np.title} — {np.artist}</a>
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
