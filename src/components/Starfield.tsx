"use client";
import { useEffect, useRef } from "react";

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!; const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(devicePixelRatio || 1, 2);
    let W = 0, H = 0, stars: any[] = [], shoot: any[] = [], raf = 0, next = 0;

    function size() {
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * DPR; cv.height = H * DPR; ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      const mobile = W < 640;
      const n = Math.round((W * H) / (mobile ? 13000 : 9000));
      stars = [];
      for (let i = 0; i < n; i++) stars.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()<0.15?1.4:0.8, b: Math.random()*0.5+0.15, tw: Math.random()*6.28, sp: 0.6+Math.random()*1.2 });
    }
    const ro = new ResizeObserver(size); ro.observe(cv); size();

    function drawStars(t: number) {
      for (const s of stars) { const tw = Math.sin(t*0.001*s.sp+s.tw)*0.5+0.5; ctx!.globalAlpha = s.b*(0.4+tw*0.6); ctx!.fillStyle = "#fff"; ctx!.beginPath(); ctx!.arc(s.x, s.y, s.r, 0, 6.28); ctx!.fill(); }
      ctx!.globalAlpha = 1;
    }
    function spawn() {
      const startX = Math.random()*W*1.1, startY = -20-Math.random()*60;
      const a = Math.random()<0.5 ? Math.PI*0.78 : Math.PI*0.62;
      const speed = 7+Math.random()*5, len = 120+Math.random()*120;
      shoot.push({ x:startX, y:startY, vx:Math.cos(a)*speed, vy:Math.sin(a)*speed, len, life:0, max:90+Math.random()*40, warm:Math.random()<0.3 });
    }

    if (reduce) { ctx.clearRect(0,0,W,H); drawStars(0); return () => ro.disconnect(); }

    const mobile = W < 640;
    function frame(t: number) {
      ctx!.clearRect(0, 0, W, H);
      drawStars(t);
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
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
