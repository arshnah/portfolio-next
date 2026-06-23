"use client";
import { useEffect, useRef } from "react";

export default function Fx() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scroll reveal
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));

    // cursor glow + magnetic buttons (desktop only)
    let cleanup: (() => void) | undefined;
    if (matchMedia("(hover:hover) and (min-width:781px)").matches) {
      const glow = glowRef.current!;
      let gx = 0, gy = 0, raf = 0;
      const apply = () => { glow.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`; raf = 0; };
      const onMove = (e: MouseEvent) => { gx = e.clientX; gy = e.clientY; if (!raf) raf = requestAnimationFrame(apply); };
      window.addEventListener("mousemove", onMove, { passive: true });

      const btns = Array.from(document.querySelectorAll<HTMLElement>(".btn"));
      const handlers: Array<[HTMLElement, (e: MouseEvent) => void, () => void]> = [];
      btns.forEach((b) => {
        const mm = (e: MouseEvent) => {
          const r = b.getBoundingClientRect();
          b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.4 - 3}px) scale(1.03)`;
        };
        const ml = () => { b.style.transform = ""; };
        b.addEventListener("mousemove", mm);
        b.addEventListener("mouseleave", ml);
        handlers.push([b, mm, ml]);
      });

      cleanup = () => {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMove);
        handlers.forEach(([b, mm, ml]) => { b.removeEventListener("mousemove", mm); b.removeEventListener("mouseleave", ml); });
      };
    }

    return () => { io.disconnect(); cleanup?.(); };
  }, []);

  return <div className="cursor-glow" ref={glowRef} />;
}
