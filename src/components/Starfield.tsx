"use client";
import { useEffect, useRef } from "react";

const CONSTELLATIONS = [
  { name: "after hours", fx: 0.09, fy: 0.74, size: 72,
    pts: [[30,15],[70,15],[50,50],[30,85],[70,85]],
    lines: [[0,1],[0,2],[1,2],[2,3],[2,4],[3,4]] },
  { name: "cipherdrop", fx: 0.91, fy: 0.20, size: 78,
    pts: [[50,8],[34,20],[66,20],[28,42],[72,42],[72,78],[28,78]],
    lines: [[0,1],[0,2],[1,3],[2,4],[3,4],[4,5],[5,6],[6,3]] },
  { name: "wisp", fx: 0.87, fy: 0.70, size: 60,
    pts: [[50,92],[42,74],[56,56],[44,38],[53,20],[48,6]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5]] },
  { name: "larpring", fx: 0.11, fy: 0.16, size: 66,
    pts: [[50,20],[73,32],[73,60],[50,74],[27,60],[27,32]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]] },
];

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!; const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(devicePixelRatio || 1, 2);
    let W = 0, H = 0, stars: any[] = [], shoot: any[] = [], cons: any[] = [], raf = 0, next = 0;

    function size() {
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * DPR; cv.height = H * DPR; ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      const mobile = W < 640;
      const n = Math.round((W * H) / (mobile ? 13000 : 9000));
      stars = [];
      for (let i = 0; i < n; i++) stars.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()<0.15?1.4:0.8, b: Math.random()*0.5+0.15, tw: Math.random()*6.28, sp: 0.6+Math.random()*1.2 });
      const scale = mobile ? 0.72 : 1;
      cons = CONSTELLATIONS.map(c => ({
        name: c.name, lines: c.lines,
        pts: c.pts.map(([px, py]) => ({
          x: c.fx*W + (px-50)/100*c.size*scale,
          y: c.fy*H + (py-50)/100*c.size*scale,
          tw: Math.random()*6.28, sp: 0.4+Math.random()*0.7,
        })),
      }));
    }
    const ro = new ResizeObserver(size); ro.observe(cv); size();

    function drawStars(t: number) {
      for (const s of stars) { const tw = Math.sin(t*0.001*s.sp+s.tw)*0.5+0.5; ctx!.globalAlpha = s.b*(0.4+tw*0.6); ctx!.fillStyle = "#fff"; ctx!.beginPath(); ctx!.arc(s.x, s.y, s.r, 0, 6.28); ctx!.fill(); }
      ctx!.globalAlpha = 1;
    }
    function drawConstellations(t: number) {
      for (const c of cons) {
        ctx!.strokeStyle = "rgba(255,255,255,0.14)"; ctx!.lineWidth = 1;
        ctx!.beginPath();
        for (const [a, b] of c.lines) { ctx!.moveTo(c.pts[a].x, c.pts[a].y); ctx!.lineTo(c.pts[b].x, c.pts[b].y); }
        ctx!.stroke();
        for (const p of c.pts) {
          const tw = Math.sin(t*0.001*p.sp+p.tw)*0.5+0.5;
          ctx!.globalAlpha = 0.55 + tw*0.35; ctx!.fillStyle = "#fff";
          ctx!.beginPath(); ctx!.arc(p.x, p.y, 1.3, 0, 6.28); ctx!.fill();
        }
        ctx!.globalAlpha = 1;
        const cx = c.pts.reduce((s: number, p: any) => s+p.x, 0) / c.pts.length;
        const maxY = Math.max(...c.pts.map((p: any) => p.y));
        ctx!.font = "10px ui-monospace, 'JetBrains Mono', Menlo, monospace";
        ctx!.fillStyle = "rgba(255,255,255,0.26)"; ctx!.textAlign = "center";
        ctx!.fillText(c.name, cx, Math.min(maxY+16, H-6));
      }
    }
    function spawn() {
      const startX = Math.random()*W*1.1, startY = -20-Math.random()*60;
      const a = Math.random()<0.5 ? Math.PI*0.78 : Math.PI*0.62;
      const speed = 7+Math.random()*5, len = 120+Math.random()*120;
      shoot.push({ x:startX, y:startY, vx:Math.cos(a)*speed, vy:Math.sin(a)*speed, len, life:0, max:90+Math.random()*40, warm:Math.random()<0.3 });
    }

    if (reduce) { ctx.clearRect(0,0,W,H); drawStars(0); drawConstellations(0); return () => ro.disconnect(); }

    const mobile = W < 640;
    let last = 0;
    const onVis = () => { if (document.hidden) shoot.length = 0; };
    document.addEventListener("visibilitychange", onVis);

    function frame(t: number) {
      const dt = last ? t - last : 16;
      last = t;
      ctx!.clearRect(0, 0, W, H);
      drawStars(t);
      drawConstellations(t);
      // spawns are clock-based but lifetimes are counted in frames, so a
      // throttled background tab piles them up. drop the backlog instead of
      // streaming it all across at once on the way back.
      if (dt > 200) { shoot.length = 0; next = t + 700; raf = requestAnimationFrame(frame); return; }
      if (t > next) { spawn(); if (!mobile && Math.random()<0.3) spawn(); next = t + (mobile?1100:700) + Math.random()*1600; }
      for (let i = shoot.length-1; i>=0; i--) {
        const o = shoot[i]; o.x += o.vx; o.y += o.vy; o.life++;
        if (o.life>o.max || o.y>H+40 || o.x<-40 || o.x>W+40) { shoot.splice(i,1); continue; }
        const fade = o.life<8 ? o.life/8 : (o.life>o.max-25 ? (o.max-o.life)/25 : 1);
        const hyp = Math.hypot(o.vx, o.vy);
        const tx = o.x - o.vx*(o.len/hyp), ty = o.y - o.vy*(o.len/hyp);
        const g = ctx!.createLinearGradient(o.x, o.y, tx, ty);
        const head = o.warm ? "rgba(255,225,190," : "rgba(255,255,255,";
        g.addColorStop(0, head+(0.9*fade)+")"); g.addColorStop(0.4, head+(0.25*fade)+")"); g.addColorStop(1, "rgba(255,255,255,0)");
        ctx!.strokeStyle = g; ctx!.lineWidth = 1.6; ctx!.lineCap = "round";
        ctx!.beginPath(); ctx!.moveTo(o.x, o.y); ctx!.lineTo(tx, ty); ctx!.stroke();
        ctx!.globalAlpha = fade; ctx!.fillStyle = o.warm?"#ffe1be":"#fff"; ctx!.beginPath(); ctx!.arc(o.x, o.y, 1.5, 0, 6.28); ctx!.fill(); ctx!.globalAlpha = 1;
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
