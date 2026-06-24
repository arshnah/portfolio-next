"use client";
import { useEffect, useRef } from "react";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eggRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, cx = 0, cy = 0, R = 0;

    let ACCENT = "#5C72FF", POP = "#FF6B5C";
    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      ACCENT = cs.getPropertyValue("--accent").trim() || ACCENT;
      POP = cs.getPropertyValue("--pop").trim() || POP;
    }

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const big = W > 900;
      R = big ? Math.min(H * 0.34, 320) : Math.min(W * 0.42, 230);
      cx = big ? W * 0.72 : W * 0.5;
      cy = big ? H * 0.52 : H * 0.46;
    }

    // fibonacci sphere
    const N = window.innerWidth > 900 ? 460 : 280;
    const pts: { x: number; y: number; z: number }[] = [];
    const GA = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = GA * i;
      pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
    }
    const ramp = ["·", "·", ":", "+", "*", "o", "#"];
    // pre-allocated projection buffer (no per-frame allocation)
    const proj = Array.from({ length: N }, () => ({ sx: 0, sy: 0, d: 0 }));

    let drag = false, px = 0, py = 0, vry = 0, vrx = 0, ry = 0, rx = 0, mx = 0, my = 0, boomT = 0;
    let raf = 0, visible = true;

    const down = (e: any) => { drag = true; canvas.classList.add("drag"); const p = e.touches ? e.touches[0] : e; px = p.clientX; py = p.clientY; };
    const move = (e: any) => {
      const p = e.touches ? e.touches[0] : e;
      mx = (p.clientX / window.innerWidth - 0.5); my = (p.clientY / window.innerHeight - 0.5);
      if (!drag) return;
      vry += (p.clientX - px) * 0.006; vrx += (p.clientY - py) * 0.006; px = p.clientX; py = p.clientY;
    };
    const up = () => { drag = false; canvas.classList.remove("drag"); };

    function frame() {
      if (!reduce) vry += 0.0016;
      if (boomT > 0.001) { vry += 0.05 * boomT; boomT *= 0.94; } else boomT = 0;
      ry += vry; rx += vrx; vry *= 0.94; vrx *= 0.94; rx = Math.max(-1, Math.min(1, rx));
      const yaw = ry + mx * 0.5, pit = rx + my * 0.3;
      const sy = Math.sin(yaw), cyaw = Math.cos(yaw), sx = Math.sin(pit), cxx = Math.cos(pit);
      const spread = 1 + boomT * 0.9;

      for (let i = 0; i < N; i++) {
        const p = pts[i]; const x = p.x * spread, y = p.y * spread, z = p.z * spread;
        const x1 = x * cyaw - z * sy, z1 = x * sy + z * cyaw, y2 = y * cxx - z1 * sx, z2 = y * sx + z1 * cxx;
        const o = proj[i]; o.sx = cx + x1 * R; o.sy = cy + y2 * R; o.d = z2;
      }
      proj.sort((a, b) => a.d - b.d);

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = boomT > 0.05 ? POP : ACCENT;       // set once per frame
      let lastFont = -1, lastAlpha = -1;
      for (let i = 0; i < N; i++) {
        const q = proj[i], d = (q.d + 1) / 2;
        const fs = (6 + d * 9) | 0;                       // quantised size
        if (fs !== lastFont) { ctx.font = fs + "px ui-monospace, monospace"; lastFont = fs; }
        const a = ((0.12 + d * 0.78) * 40 | 0) / 40;      // quantised alpha
        if (a !== lastAlpha) { ctx.globalAlpha = a; lastAlpha = a; }
        ctx.fillText(ramp[Math.min(6, (d * 7) | 0)], q.sx, q.sy);
      }
      ctx.globalAlpha = 1;
      raf = visible ? requestAnimationFrame(frame) : 0;   // stop when off-screen
    }

    // konami
    const seq = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    let ki = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === seq[ki]) { ki++; if (ki === seq.length) { ki = 0; boom(); } }
      else { ki = k === seq[0] ? 1 : 0; }
    };
    function boom() {
      boomT = 1.8;
      const egg = eggRef.current;
      if (egg) { egg.classList.add("show"); setTimeout(() => egg.classList.remove("show"), 2600); }
    }

    // pause rendering when the hero canvas scrolls out of view
    const vis = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && raf === 0) raf = requestAnimationFrame(frame);
    }, { threshold: 0 });

    readColors();
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("themechange", readColors);
    canvas.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    canvas.addEventListener("touchstart", down, { passive: true });
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);
    window.addEventListener("keydown", onKey);
    vis.observe(canvas);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      vis.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("themechange", readColors);
      canvas.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      canvas.removeEventListener("touchstart", down);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="globe-canvas" />
      <div ref={eggRef} className="egg-msg">
        i use arch btw 🐧<small>// konami unlocked. you found the secret</small>
      </div>
    </>
  );
}
