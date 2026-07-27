"use client";
import { useEffect, useRef } from "react";

const LAYERS = [
  { depth: 0.18, clouds: ["c2", "c6"] },
  { depth: 0.36, clouds: ["c4", "c5"] },
  { depth: 0.58, clouds: ["c1", "c3"] },
];

const SWEEP = 620;

export default function DaySky() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = ref.current;
    if (!root) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>(".cloud-layer"));
    let raf = 0;

    const apply = () => {
      raf = 0;
      const doc = document.documentElement;
      const span = doc.scrollHeight - window.innerHeight;
      const progress = span > 0 ? Math.min(window.scrollY / span, 1) : 0;
      for (const layer of layers) {
        const depth = Number(layer.dataset.depth);
        const x = progress * SWEEP * depth;
        const y = progress * -70 * depth;
        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="skygrad" aria-hidden="true" />
      <div className="skybodies" aria-hidden="true">
        <span className="sun" />
        <span className="moon" />
        <span className="dawn" />
      </div>
      <div className="daysky" aria-hidden="true" ref={ref}>
        {LAYERS.map((layer) => (
          <div className="cloud-layer" data-depth={layer.depth} key={layer.depth}>
            {layer.clouds.map((c) => <span className={`cloud ${c}`} key={c} />)}
          </div>
        ))}
      </div>
    </>
  );
}
