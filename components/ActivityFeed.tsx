"use client";
import { useEffect, useState } from "react";

const DISCORD_IDS = ["1352866897900732446", "300137175238836225"];
const GH_USER = "arshnah";

type Spotify = { song: string; artist: string; track_id: string; };
type Activity = { name: string; type: number; };
type Presence = { discord_status: "online"|"idle"|"dnd"|"offline"; activities: Activity[]; spotify?: Spotify; };

const DOT: Record<string,string> = { online:"#3DDC97", idle:"#F5A623", dnd:"#FF4A2E", offline:"#7c8071" };
const LBL: Record<string,string> = { online:"online", idle:"idle", dnd:"dnd", offline:"offline" };

export default function ActivityFeed() {
  const [presence, setPresence] = useState<Presence | null>(null);
  const [commit, setCommit] = useState<{ sha:string; msg:string; url:string } | null>(null);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const presences: Record<string, Presence> = {};
    const sources: EventSource[] = [];
    const pick = () => {
      const rank = (p: Presence) => p.spotify ? 5 : p.discord_status==="online" ? 4 : p.discord_status==="idle" ? 3 : p.discord_status==="dnd" ? 2 : 1;
      const best = Object.values(presences).sort((a,b)=>rank(b)-rank(a))[0];
      if (best) setPresence(best);
    };
    DISCORD_IDS.forEach((id) => {
      const connect = () => {
        const es = new EventSource(`https://api.lanyard.rest/v1/users/${id}/sse`);
        sources.push(es);
        es.onmessage = (e) => { const d = JSON.parse(e.data); if (d.t==="INIT_STATE"||d.t==="PRESENCE_UPDATE"){ presences[id]=d.d; pick(); } };
        es.onerror = () => { es.close(); setTimeout(connect, 5000); };
      };
      connect();
    });

    fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=30`)
      .then(r => r.json())
      .then((ev: any[]) => {
        const push = Array.isArray(ev) ? ev.find(e => e.type === "PushEvent") : null;
        if (push?.payload?.commits?.length) {
          const c = push.payload.commits[push.payload.commits.length - 1];
          setCommit({ sha: c.sha.slice(0,7), msg: c.message.split("\n")[0], url: `https://github.com/${push.repo.name}/commit/${c.sha}` });
        }
      }).catch(()=>{});

    const tick = () => setClock(new Date().toLocaleTimeString("en-IN", { timeZone:"Asia/Kolkata", hour:"2-digit", minute:"2-digit" }));
    tick(); const id = setInterval(tick, 30000);
    return () => { sources.forEach(es=>es.close()); clearInterval(id); };
  }, []);

  const status = presence?.discord_status ?? "offline";
  const sp = presence?.spotify;
  const game = presence?.activities?.find(a => a.type === 0);

  return (
    <div className="statusbar">
      <span className="st"><span className="st-dot" style={{ background: DOT[status] }} />{LBL[status]}</span>
      <span className="sep">/</span>
      {sp ? (
        <a className="st link" href={`https://open.spotify.com/track/${sp.track_id}`} target="_blank" rel="noopener noreferrer">
          ♪ {sp.song} — {sp.artist}
        </a>
      ) : game ? (
        <span className="st">▶ {game.name}</span>
      ) : (
        <span className="st dim">♪ not playing</span>
      )}
      <span className="sep">/</span>
      <span className="st dim">{clock} IST</span>
      {commit && (<>
        <span className="sep">/</span>
        <a className="st link" href={commit.url} target="_blank" rel="noopener noreferrer">last shipped: {commit.msg.toLowerCase()}</a>
      </>)}
    </div>
  );
}
