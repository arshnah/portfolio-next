"use client";
import { useEffect, useRef, useState } from "react";

const SWAP_MS = 1600;
// the public toggle only ever flips between these two, same as before sunset/
// sunrise existed.
const BASE_CYCLE = ["dark", "light"] as const;
// the full day, dark night -> sunrise -> light day -> sunset -> back to dark.
// not reachable by a normal click - only by mashing the button (see
// RAPID_COUNT below). an undocumented reward for fidgeting with the UI.
const FULL_CYCLE = ["dark", "sunrise", "light", "sunset"] as const;
type Theme = (typeof FULL_CYCLE)[number];

const RAPID_WINDOW_MS = 1500; // all RAPID_COUNT clicks must land inside this window
const RAPID_COUNT = 5;

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const swapTimer = useRef(0);
  const clickTimes = useRef<number[]>([]);
  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    setTheme((FULL_CYCLE as readonly string[]).includes(t || "") ? (t as Theme) : "dark");
  }, []);
  useEffect(() => () => window.clearTimeout(swapTimer.current), []);

  function toggle() {
    const now = Date.now();
    clickTimes.current = [...clickTimes.current, now].filter((t) => now - t < RAPID_WINDOW_MS);
    // 5 clicks in quick succession temporarily unlocks the full cycle for
    // this one step; a single, unhurried click always stays on dark/light.
    const unlocked = clickTimes.current.length >= RAPID_COUNT;
    const cycle: readonly string[] = unlocked ? FULL_CYCLE : BASE_CYCLE;

    const root = document.documentElement;
    const current = cycle.includes(root.dataset.theme || "") ? (root.dataset.theme as Theme) : "dark";
    const next = cycle[(cycle.indexOf(current) + 1) % cycle.length] as Theme;
    root.dataset.theme = next;
    try { localStorage.setItem("arsh-theme", next); } catch (e) {}
    setTheme(next);

    window.clearTimeout(swapTimer.current);
    delete root.dataset.swap;
    void root.offsetWidth;
    root.dataset.swap = "1";
    swapTimer.current = window.setTimeout(() => { delete root.dataset.swap; }, SWAP_MS);
  }

  // preview always assumes the next click is a normal one, so the icon/label
  // never hints that sunset/sunrise exist
  const next: Theme = ((BASE_CYCLE as readonly string[]).includes(theme)
    ? BASE_CYCLE[(BASE_CYCLE.indexOf(theme as "dark" | "light") + 1) % BASE_CYCLE.length]
    : BASE_CYCLE[0]) as Theme;

  return (
    <button onClick={toggle} aria-label={`switch to ${next} theme`} title={`switch to ${next} theme`}
      style={{
        position: "fixed", top: 16, right: 16, zIndex: 20, width: 38, height: 38,
        borderRadius: 10, background: "var(--card)", border: "1px solid var(--line)",
        color: "var(--ink)", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
      {/* the icon shows the theme you're switching TO, not the current one */}
      {next === "light" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : next === "sunset" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 18a5 5 0 0 0-10 0" />
          <line x1="12" y1="9" x2="12" y2="2" />
          <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
          <line x1="1" y1="18" x2="3" y2="18" />
          <line x1="21" y1="18" x2="23" y2="18" />
          <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
          <polyline points="16 5 12 9 8 5" />
          <line x1="23" y1="22" x2="1" y2="22" />
        </svg>
      ) : next === "sunrise" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 18a5 5 0 0 0-10 0" />
          <line x1="12" y1="2" x2="12" y2="9" />
          <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
          <line x1="1" y1="18" x2="3" y2="18" />
          <line x1="21" y1="18" x2="23" y2="18" />
          <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
          <polyline points="8 6 12 2 16 6" />
          <line x1="23" y1="22" x2="1" y2="22" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
