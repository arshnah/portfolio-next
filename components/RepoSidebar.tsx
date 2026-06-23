"use client";
import { useEffect, useState } from "react";

type Repo = { name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number };

const LANG: Record<string, string> = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", "C++": "#f34b7d",
  C: "#888", "C#": "#178600", Kotlin: "#A97BFF", HTML: "#e34c26", CSS: "#563d7c",
  Java: "#b07219", Shell: "#89e051", Vue: "#41b883", Dart: "#00B4AB",
};

const GH = (
  <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 014 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
);
const DC = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.4A19.8 19.8 0 0015.4 3l-.2.4a18 18 0 014.4 2.2 13 13 0 00-11.2 0A18 18 0 018.8 3.4L8.6 3a19.8 19.8 0 00-4.9 1.4C.9 8.5.2 12.5.5 16.4a19.9 19.9 0 006 3l.8-1.3a13 13 0 01-2-1l.5-.4a14 14 0 0012.3 0l.5.4c-.6.4-1.3.7-2 1l.8 1.3a19.9 19.9 0 006-3c.4-4.5-.6-8.4-2.4-12zM8.9 14c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.2 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/></svg>
);

export default function RepoSidebar() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "err">("loading");

  useEffect(() => {
    fetch("https://api.github.com/users/arshnah/repos?sort=updated&per_page=20")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: any[]) => { setRepos(d.filter((x) => !x.fork).slice(0, 8)); setState("ok"); })
      .catch(() => setState("err"));
  }, []);

  return (
    <aside className="sidebar" aria-label="Profiles">
      <div className="sb-item">
        <a className="sb-btn" href="https://github.com/arshnah" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          {GH}
          {state === "ok" && <span className="sb-badge">{repos.length}</span>}
        </a>
        <div className="sb-flyout">
          <div className="ttl">github.com/arshnah</div>
          {state === "loading" && <div className="sb-empty">loading repos…</div>}
          {state === "err" && <div className="sb-empty">Couldn&apos;t load (rate limit). <a href="https://github.com/arshnah" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>Open GitHub ↗</a></div>}
          {state === "ok" && repos.map((r) => (
            <a className="repo" key={r.name} href={r.html_url} target="_blank" rel="noopener noreferrer">
              <div className="rhead">
                <span className="rname">{r.name}</span>
                {r.language && (
                  <span className="rlang"><span className="dot" style={{ background: LANG[r.language] || "var(--accent)" }} />{r.language}</span>
                )}
              </div>
              <div className="rbody">
                <div className="rdesc">{r.description || "No description."}</div>
                <div className="rmeta"><span>★ {r.stargazers_count}</span><span style={{ color: "var(--accent)" }}>open ↗</span></div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="sb-item">
        <button className="sb-btn" aria-label="Discord" onClick={() => window.dispatchEvent(new Event("open-discord"))}>
          {DC}
        </button>
        <div className="sb-flyout" style={{ width: 200 }}>
          <div className="ttl">discord</div>
          <div className="sb-empty">@arshnah · <span style={{ color: "var(--accent)", cursor: "pointer" }} onClick={() => window.dispatchEvent(new Event("open-discord"))}>view card</span></div>
        </div>
      </div>
    </aside>
  );
}
