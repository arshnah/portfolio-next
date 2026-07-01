"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => { setTheme(document.documentElement.dataset.theme || "dark"); }, []);

  function toggle() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("arsh-theme", next); } catch (e) {}
    setTheme(next);
  }

  return (
    <button onClick={toggle} aria-label="toggle theme" title="toggle theme"
      style={{
        position: "fixed", top: 16, right: 16, zIndex: 20, width: 38, height: 38,
        borderRadius: 10, background: "var(--card)", border: "1px solid var(--line)",
        color: "var(--ink)", cursor: "pointer", fontSize: 16, lineHeight: 1,
      }}>
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
