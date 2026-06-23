"use client";
import { useEffect, useState, useRef } from "react";

const DISCORD_IDS = ["1352866897900732446", "300137175238836225"];
const GH_USER = "arshnah";

type Spotify = { song: string; artist: string; album_art_url: string; track_id: string; };
type Activity = { name: string; details?: string; state?: string; type: number;
  assets?: { large_image?: string; large_text?: string; small_image?: string }; application_id?: string; };
type Presence = {
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Activity[];
  spotify?: Spotify;
  discord_user: { username: string; avatar: string; id: string };
};

const STATUS_COLOR: Record<string, string> = { online:"#3DDC97", idle:"#F5A623", dnd:"#FF4A2E", offline:"#5F6450" };
const STATUS_LABEL: Record<string, string> = { online:"Online", idle:"Idle", dnd:"Do Not Disturb", offline:"Offline" };

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString("en-IN", { timeZone:"Asia/Kolkata", hour:"2-digit", minute:"2-digit", second:"2-digit" }));
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return <>{t}</>;
}

type Commit = { sha: string; commit: { message: string; author: { date: string } }; html_url: string; };

export default function ActivityFeed() {
  const [presence, setPresence] = useState<Presence | null>(null);
  const [commit, setCommit] = useState<Commit | null>(null);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // presences for both accounts
    const presences: Record<string, Presence> = {};
    const sources: EventSource[] = [];

    function pickBest() {
      // priority: spotify > online > idle > dnd > offline
      const rank = (p: Presence) => p.spotify ? 5 : p.discord_status === "online" ? 4 : p.discord_status === "idle" ? 3 : p.discord_status === "dnd" ? 2 : 1;
      const best = Object.values(presences).sort((a, b) => rank(b) - rank(a))[0];
      if (best) setPresence(best);
    }

    DISCORD_IDS.forEach((id) => {
      const connect = () => {
        const es = new EventSource(`https://api.lanyard.rest/v1/users/${id}/sse`);
        sources.push(es);
        es.onmessage = (e) => {
          const d = JSON.parse(e.data);
          if (d.t === "INIT_STATE" || d.t === "PRESENCE_UPDATE") { presences[id] = d.d; pickBest(); }
        };
        es.onerror = () => { es.close(); setTimeout(connect, 5000); };
      };
      connect();
    });

    // Latest commit
    fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=30`)
      .then(r => r.json())
      .then((events: any[]) => {
        const push = events.find(e => e.type === "PushEvent");
        if (push?.payload?.commits?.length) {
          const c = push.payload.commits[push.payload.commits.length - 1];
          const repo = push.repo.name.split("/")[1];
          setCommit({ sha: c.sha.slice(0,7), commit: { message: c.message.split("\n")[0], author: { date: push.created_at } }, html_url: `https://github.com/${push.repo.name}/commit/${c.sha}` });
        }
      }).catch(() => {});

    return () => { sources.forEach(es => es.close()); };
  }, []);

  const gaming = presence?.activities.find(a => a.type === 0);
  const status = presence?.discord_status ?? "offline";
  const since = commit ? new Date(commit.commit.author.date).toLocaleDateString("en-IN", { day:"numeric", month:"short" }) : null;

  return (
    <section className="chapter" id="activity">
      <div className="shell">
        <div className="ch-head rv"><span className="ch-no">00</span><h2>Activity</h2><span className="line" /></div>
        <div className="bento rv">

          {/* NOW PLAYING / GAMING */}
          {presence?.spotify ? (
            <a className="bento-card wide" href={`https://open.spotify.com/track/${presence.spotify.track_id}`} target="_blank" rel="noopener noreferrer">
              <div className="bc-tag">♫ NOW PLAYING</div>
              <div className="bc-main">&ldquo;{presence.spotify.song}&rdquo;</div>
              <div className="bc-sub">{presence.spotify.artist}</div>
              {presence.spotify.album_art_url && <img src={presence.spotify.album_art_url} alt="album" className="bc-art" />}
              <span className="bc-link">↗</span>
            </a>
          ) : gaming ? (
            <div className="bento-card wide">
              <div className="bc-tag">🎮 PLAYING</div>
              <div className="bc-main">{gaming.name}</div>
              {gaming.details && <div className="bc-sub">{gaming.details}</div>}
            </div>
          ) : (
            <div className="bento-card wide">
              <div className="bc-tag">♫ NOW PLAYING</div>
              <div className="bc-main" style={{ color:"var(--faint)" }}>Nothing playing right now.</div>
            </div>
          )}

          {/* DISCORD STATUS */}
          <a className="bento-card" href={`https://discord.com/users/${DISCORD_IDS[0]}`} target="_blank" rel="noopener noreferrer">
            <div className="bc-tag">💬 DISCORD STATUS</div>
            <div className="bc-main" style={{ color: STATUS_COLOR[status] }}>{STATUS_LABEL[status]}</div>
            <span className="bc-link">↗</span>
          </a>

          {/* LOCATION / TIME */}
          <div className="bento-card">
            <div className="bc-tag">📍 LOCATION</div>
            <div className="bc-main">India</div>
            <div className="bc-sub"><Clock /></div>
          </div>

          {/* LATEST COMMIT */}
          {commit && (
            <a className="bento-card wide" href={commit.html_url} target="_blank" rel="noopener noreferrer">
              <div className="bc-tag">⌥ LATEST COMMIT</div>
              <div className="bc-sha-row"><code className="bc-sha">#{commit.sha}</code><span className="bc-date">{since}</span></div>
              <div className="bc-main sm">{commit.commit.message}</div>
              <span className="bc-link">↗</span>
            </a>
          )}

          {/* GUESTBOOK */}
          <a className="bento-card" href="#guestbook">
            <div className="bc-tag">✍ GUESTBOOK</div>
            <div className="bc-main sm">Sign my guestbook ✨</div>
          </a>

          {/* CONTRIBUTIONS */}
          <div className="bento-card full">
            <div className="bc-tag">⌥ CONTRIBUTIONS</div>
            <img
              src={`https://ghchart.rshah.org/A3E635/${GH_USER}`}
              alt="GitHub contributions"
              className="bc-contrib"
              onError={e => (e.currentTarget.style.display = "none")}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
