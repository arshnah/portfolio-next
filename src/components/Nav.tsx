"use client";
import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "#services", label: "Services" },
  { href: "#guestbook", label: "Guestbook" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ onTerminal }: { onTerminal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    h(); window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") { e.preventDefault(); onTerminal(); }
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [onTerminal]);

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-bg/85 backdrop-blur-xl border-b border-white/[0.08]" : "bg-transparent border-b border-transparent"}`}>
      <div className="wrap flex items-center justify-between py-4">
        {/* brand */}
        <a href="#top" className="group inline-flex items-center gap-2 font-bold tracking-tight text-[17px]">
          <span className="font-mono text-accent text-[15px] opacity-70 group-hover:opacity-100 transition">~/</span>
          <span>arsh<span className="text-accent">nah</span></span>
        </a>

        {/* right */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden sm:flex items-center">
            {links.map((l) => (
              <a key={l.href} href={l.href}
                className="relative px-3.5 py-2 text-[13.5px] text-muted hover:text-ink transition-colors
                  after:content-[''] after:absolute after:left-3.5 after:right-3.5 after:-bottom-px after:h-px after:scale-x-0 after:bg-accent after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                {l.label}
              </a>
            ))}
          </div>

          {/* terminal button */}
          <div className="group relative ml-1">
            <button onClick={onTerminal} aria-label="Open terminal"
              className="flex items-center gap-1.5 h-[34px] px-3 rounded-lg border border-white/[0.14] bg-surf/60 text-accent font-mono text-[13px]
                transition-all hover:border-accent/60 hover:bg-surf hover:shadow-[0_0_0_3px_rgba(217,140,90,0.10)] active:scale-95">
              <span className="opacity-90">&gt;_</span>
            </button>
            <span className="pointer-events-none absolute top-[calc(100%+8px)] right-0 whitespace-nowrap rounded-md border border-white/[0.1] bg-surf2 px-2.5 py-1.5 text-[11px] font-mono text-muted opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
              psst, a terminal · <span className="text-faint">⌘/</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
