"use client";
import { useEffect, useRef, useState } from "react";

type Line = { html: string };
const files: Record<string,string> = {
"about.md":`<span class="text-accent"># whoami</span>
I'm Arshdeep, a solo developer from India. I build the whole product
myself: the website, the Android app, the backend, and the server it
runs on. Then I keep it alive. Self-taught. Most of what I've shipped
is live in production right now.

Off the keyboard: guitar, gym, and a home server named Jarvis.`,
"stack.txt":`languages   c · c++ · c# · python · java · js/ts · kotlin
frontend    react · next.js · tailwind · three.js
backend     node · express · mysql · firebase · supabase
mobile      android (kotlin, mvvm)
ops         linux · vps · pm2 · nginx · cloudflare · vercel
daily       arch linux, btw 🐧`,
"contact.txt":`email     <a href="mailto:arshjbdarsh@gmail.com" class="text-[#39d3c4] underline">arshjbdarsh@gmail.com</a>
github    <a href="https://github.com/arshnah" target="_blank" class="text-[#39d3c4] underline">github.com/arshnah</a>
discord   arshnah
status    open for work / freelance`,
"projects/nexlease.md":`Nexlease (2024–26) · <a href="https://nexlease.in" target="_blank" class="text-[#39d3c4] underline">nexlease.in</a>
Rental marketplace: React site, Kotlin app, ops dashboard, and Nexscore
locality-scoring engine. Runs on a VPS I manage myself.`,
"projects/justcalltech.md":`JustCallTech (2023) · <a href="https://justcalltech.in" target="_blank" class="text-[#39d3c4] underline">justcalltech.in</a>
IT-services brand. Kotlin app (Play Store) + website. 97/100 SEO.`,
"projects/chc.md":`Content Helper Community (2025) · <a href="https://chc-site.vercel.app" target="_blank" class="text-[#39d3c4] underline">chc-site.vercel.app</a>
Live YouTube subscriber counts via a serverless function. 17 channels, hourly.`,
"projects/whatnow.md":`WhatNow (2025) · <a href="https://whatnowindia.vercel.app" target="_blank" class="text-[#39d3c4] underline">whatnowindia.vercel.app</a>
Platform for students choosing what's next after board exams.`,
"projects/afterhours.md":`After Hours (2026) · <a href="https://afterhours.arshnah.in" target="_blank" class="text-[#39d3c4] underline">afterhours.arshnah.in</a>
Discord community bot: 86 slash commands, fake economy, gambling, levelling,
moderation. Currency moves only through atomic Postgres functions, so racing
commands cannot duplicate it. Bridges a Minecraft server both ways through a
Paper plugin I wrote. discord.js + Supabase, on a VPS under PM2.`,
};
const tree: Record<string,string[]> = { "~":["about.md","stack.txt","contact.txt","projects/"], "~/projects":["nexlease.md","justcalltech.md","chc.md","whatnow.md","afterhours.md"] };
const ARCH = `<span class="text-[#39d3c4] font-bold">       /\\
      /  \\
     /\\   \\
    /      \\
   /   ,,   \\
  /   |  |  -\\
 /_-''    ''-_\\</span>`;

export default function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [val, setVal] = useState("");
  const [cwd, setCwd] = useState("~");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(0);
  const booted = useRef(false);
  const inRef = useRef<HTMLInputElement>(null);
  const outRef = useRef<HTMLDivElement>(null);
  const cwdRef = useRef(cwd); cwdRef.current = cwd;

  const pr = (html: string) => setLines(l => [...l, { html }]);
  useEffect(() => { if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight; }, [lines]);

  const neofetch = () => `<div class="flex gap-5">${ARCH}<div>
<b class="text-[#39d3c4]">arsh</b>@<b class="text-[#39d3c4]">arch</b>
─────────────
<b class="text-[#39d3c4]">OS</b>: Arch Linux x86_64
<b class="text-[#39d3c4]">shell</b>: zsh   <b class="text-[#39d3c4]">wm</b>: hyprland
<b class="text-[#39d3c4]">editor</b>: nvim
<b class="text-[#39d3c4]">uptime</b>: self-taught, shipping since 2023
<b class="text-[#39d3c4]">stack</b>: react · next · node · kotlin · python
<b class="text-[#39d3c4]">live</b>: 5-ish products in production
<b class="text-[#39d3c4]">contact</b>: type <span class="text-[#56d364]">contact</span>
</div></div>`;

  function boot() {
    const L = [`<span class="text-[#5b6675]">Arch Linux 6.x · tty1</span>`,`<span class="text-[#5b6675]">login: arsh ... ✓</span>`,"",neofetch(),"",`<span class="text-[#7e8a99]">type <span class="text-[#56d364]">help</span> to explore. <span class="text-[#56d364]">exit</span> to go back.</span>`,""];
    let i = 0; (function t(){ if(i<L.length){ pr(L[i]); i++; setTimeout(t, i<3?200:110); } })();
  }
  useEffect(() => { if (open) { inRef.current?.focus(); if(!booted.current){ booted.current=true; boot(); } } }, [open]);

  function run(raw0: string) {
    const raw = raw0.trim(); if(!raw) return;
    setHist(h => [...h, raw]); setHi(hist.length + 1);
    pr(`<div class="flex gap-2"><span class="text-[#39d3c4] font-bold flex-none"><span class="text-[#7aa2ff]">arsh</span>@arch:<span class="text-[#ffb24a]">${cwdRef.current}</span>$</span><span class="text-white">${raw.replace(/</g,"&lt;")}</span></div>`);
    if (raw==="sudo rm -rf /"||raw==="rm -rf /"){ pr(`<span class="text-[#ff6b5c]">deleting everything...</span>`); setTimeout(()=>pr(`<span class="text-[#56d364]">...jk. your files are safe. mine aren't.</span>`),500); return; }
    const p = raw.split(/\s+/), c = p[0], a = p[1];
    const cur = cwdRef.current;
    const map: Record<string,() => string|null> = {
      help: () => `<span class="text-[#39d3c4]">commands</span>
  <span class="text-[#56d364]">help neofetch whoami about stack contact</span>
  <span class="text-[#56d364]">ls  cd &lt;dir&gt;  cat &lt;file&gt;  projects  clear  exit</span>
  <span class="text-[#5b6675]">(a few easter eggs hidden around. poke.)</span>`,
      whoami: () => "arshnah · Arshdeep Singh. solo developer across full-stack, android, and ops.",
      about: () => files["about.md"], stack: () => files["stack.txt"], contact: () => files["contact.txt"],
      neofetch, ls: () => (tree[cur]||[]).map(f=>f.endsWith("/")?`<span class="text-[#39d3c4]">${f}</span>`:f).join("   "),
      // Derived from the tree rather than a second hardcoded list. The old one
      // omitted the Discord bot entirely, so `projects` showed four entries
      // while `ls ~/projects` showed five.
      projects: () => (tree["~/projects"]||[]).map(f=>files["projects/"+f]).filter(Boolean).join("\n\n"),
      clear: () => { setLines([]); return null; }, exit: () => { onClose(); return null; },
      pwd: () => cur==="~"?"/home/arsh":"/home/arsh/projects",
      arch: () => "i use arch btw 🐧", guitar: () => "🎸 yeah, I play. mostly at 2am instead of sleeping.",
      gym: () => "🏋️ push day > leg day.", jarvis: () => `<span class="text-[#39d3c4]">Jarvis</span> · my home server. runs local AI with Ollama plus a few automations. still a work in progress.`,
      sudo: () => `<span class="text-[#ffb24a]">arsh is not in the sudoers file. This incident will be reported.</span> <span class="text-[#5b6675]">(jk)</span>`,
      vim: () => `you opened vim. you live here now. <span class="text-[#5b6675]">(type 'exit')</span>`,
      date: () => new Date().toString(),
    };
    if (c==="cd") { const d=a; if(!d||d==="~"||d===".."){setCwd("~");} else if(d==="projects"||d==="projects/"){setCwd("~/projects");} else if([".config","secret",".secret"].includes(d)){pr(`<span class="text-[#ff6b5c]">cd: ${d}: Permission denied</span> <span class="text-[#5b6675]">(nice try 👀)</span>`);} else {pr(`<span class="text-[#ff6b5c]">cd: ${d}: No such directory</span>`);} return; }
    if (c==="cat") { if(!a){pr(`<span class="text-[#ff6b5c]">cat: missing file</span>`);return;} const k=cur==="~/projects"?"projects/"+a:a; const f=files[k]||files[a]; pr(f||`<span class="text-[#ff6b5c]">cat: ${a}: No such file</span>`); return; }
    if (map[c]) { const r = map[c](); if(r!==null&&r!==undefined) pr(r); return; }
    pr(`<span class="text-[#ff6b5c]">command not found: ${c}</span> · type <span class="text-[#56d364]">help</span>`);
  }

  const COMP = ["help","neofetch","whoami","about","stack","contact","ls","cd","cat","projects","clear","exit","arch","jarvis","guitar","gym"];
  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key==="Enter"){ run(val); setVal(""); }
    else if (e.key==="ArrowUp"){ e.preventDefault(); const ni=Math.max(0,hi-1); setHi(ni); setVal(hist[ni]||""); }
    else if (e.key==="ArrowDown"){ e.preventDefault(); const ni=Math.min(hist.length,hi+1); setHi(ni); setVal(hist[ni]||""); }
    else if (e.key==="Tab"){ e.preventDefault(); const m=COMP.filter(x=>x.startsWith(val)); if(m.length===1)setVal(m[0]); else if(m.length>1){pr(m.join("   "));} }
  }
  useEffect(() => { const h=(e:KeyboardEvent)=>{ if(e.key==="Escape"&&open) onClose(); }; window.addEventListener("keydown",h); return ()=>window.removeEventListener("keydown",h); }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0c11] flex flex-col p-6 font-mono" style={{ animation:"fade .25s ease" }} onClick={()=>inRef.current?.focus()}>
      <div className="flex items-center gap-2 text-[#6b7686] text-xs mb-3.5">
        <span className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" /><span className="w-[11px] h-[11px] rounded-full bg-[#febc2e]" /><span className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
        <span className="ml-2">arsh@arch: ~ · zsh</span><span className="ml-auto text-[#5b6675]">esc / exit → close</span>
      </div>
      <div ref={outRef} className="flex-1 overflow-y-auto term-scroll text-[14px] leading-[1.55] text-[#e8ece9] whitespace-pre-wrap break-words">
        {lines.map((l,i)=><div key={i} dangerouslySetInnerHTML={{ __html: l.html }} />)}
      </div>
      <div className="flex gap-2 items-center mt-1">
        <span className="text-[#39d3c4] font-bold flex-none"><span className="text-[#7aa2ff]">arsh</span>@arch:<span className="text-[#ffb24a]">{cwd}</span>$</span>
        <input ref={inRef} value={val} onChange={e=>setVal(e.target.value)} onKeyDown={onKey} autoFocus spellCheck={false}
          className="flex-1 bg-transparent border-none outline-none text-white text-[14px] font-mono caret-[#39d3c4]" />
      </div>
    </div>
  );
}