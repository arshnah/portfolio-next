"use client";
import { useEffect, useRef, useState } from "react";

function usePersistedAttr(storageKey: string, attr: string) {
  const [on, setOn] = useState(false);
  const skipSync = useRef(true);
  useEffect(() => {
    try { setOn(localStorage.getItem(storageKey) === "1"); } catch (e) {}
  }, [storageKey]);
  useEffect(() => {
    if (skipSync.current) { skipSync.current = false; return; }
    const root = document.documentElement;
    if (on) root.setAttribute(attr, "hidden"); else root.removeAttribute(attr);
    try { localStorage.setItem(storageKey, on ? "1" : "0"); } catch (e) {}
  }, [on, attr, storageKey]);
  return [on, setOn] as const;
}

const btnStyle: React.CSSProperties = {
  width: 38, height: 38, borderRadius: 10, background: "var(--card)",
  border: "1px solid var(--line)", color: "var(--ink)", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};

export default function ViewToggles() {
  const [bgHidden, setBgHidden] = usePersistedAttr("arsh-bg-hidden", "data-bg");
  const [contentHidden, setContentHidden] = usePersistedAttr("arsh-content-hidden", "data-content");
  const skipContentEvent = useRef(true);
  useEffect(() => {
    if (skipContentEvent.current) { skipContentEvent.current = false; return; }
    window.dispatchEvent(new CustomEvent("arsh:content-toggle", { detail: { hidden: contentHidden } }));
  }, [contentHidden]);

  return (
    <div style={{ position: "fixed", top: 64, right: 16, zIndex: 20, display: "flex", flexDirection: "column", gap: 8 }}>
      <button onClick={() => setBgHidden((v) => !v)} style={btnStyle}
        aria-label={bgHidden ? "show background" : "hide background, keep text"}
        title={bgHidden ? "show background" : "hide background, keep text"}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="17" cy="7" r="2" />
          <path d="M3 17l5-6 4 5 3-4 6 7" />
          {bgHidden && <line x1="3" y1="3" x2="21" y2="21" />}
        </svg>
      </button>
      <button onClick={() => setContentHidden((v) => !v)} style={btnStyle}
        aria-label={contentHidden ? "show content" : "hide content, keep background"}
        title={contentHidden ? "show content" : "hide content, keep background"}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="14" y2="17" />
          {contentHidden && <line x1="3" y1="3" x2="21" y2="21" />}
        </svg>
      </button>
    </div>
  );
}
