"use client";
import { useEffect, useState } from "react";
import { DEFAULT_THEME } from "@/lib/themes";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch {}
    window.dispatchEvent(new Event("themechange"));
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle light or dark mode" title="Light / dark">
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
