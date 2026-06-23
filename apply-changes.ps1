# apply-changes.ps1 - Arshdeep portfolio (dark=charcoal+lime, light=white+sea-blue, sidebar, perf)
# RUN IN PROJECT ROOT: C:\Users\arsh\Documents\projex\portfolio-next
$ErrorActionPreference = 'Stop'
if (-not (Test-Path 'app/globals.css')) { Write-Host 'Galat folder.' -ForegroundColor Red; exit 1 }

# ---- lib/themes.ts ----
$dir = Split-Path 'lib/themes.ts' -Parent
if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
$content = @'
export const DEFAULT_THEME = "dark";
'@
Set-Content -Path 'lib/themes.ts' -Value $content -Encoding UTF8
Write-Host '  updated lib/themes.ts' -ForegroundColor Green

# ---- app/layout.tsx ----
$dir = Split-Path 'app/layout.tsx' -Parent
if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
$content = @'
import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif, Space_Mono } from "next/font/google";
import { DEFAULT_THEME } from "@/lib/themes";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Arshdeep Singh · Full-Stack, App & Game Developer",
  description: "One-person dev team for hire. Web, mobile, games — built and shipped solo.",
};

const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='${DEFAULT_THEME}';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','${DEFAULT_THEME}');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={DEFAULT_THEME} className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
'@
Set-Content -Path 'app/layout.tsx' -Value $content -Encoding UTF8
Write-Host '  updated app/layout.tsx' -ForegroundColor Green

# ---- app/globals.css ----
$dir = Split-Path 'app/globals.css' -Parent
if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
$content = @'
/* ============================================================
   THEMES — each [data-theme] sets the full palette via CSS vars.
   Globe + grain + glow all read these, so adding a theme = add a block.
   ============================================================ */
:root{
  --display: var(--font-display), sans-serif;
  --serif:   var(--font-serif), Georgia, serif;
  --mono:    var(--font-mono), monospace;
  --maxw: 1120px;
}

[data-theme="dark"]{
  --bg:#121309;
  --bg-grad:radial-gradient(120% 80% at 88% 110%, rgba(52,211,153,.16), transparent 55%), linear-gradient(160deg,#181A12 0%,#121309 60%,#14160F 100%);
  --panel:#1B1D14; --panel-2:#23261A;
  --text:#ECEEE4; --muted:#9A9E8C; --faint:#5F6450;
  --accent:#A3E635; --pop:#34D399;
  --line:rgba(236,238,228,.13); --line-2:rgba(236,238,228,.26);
  --grain-blend:overlay; --glow-blend:screen;
}
[data-theme="light"]{
  --bg:#EAF4F9;
  --bg-grad:radial-gradient(120% 90% at 85% 0%, rgba(20,136,194,.22), transparent 55%), linear-gradient(160deg,#FFFFFF 0%,#EAF4F9 50%,#CFE8F2 100%);
  --panel:#FFFFFF; --panel-2:#DDEEF5;
  --text:#0C2A38; --muted:#4E6B77; --faint:#9BB6C0;
  --accent:#1488C2; --pop:#0BA8B8;
  --line:rgba(12,42,56,.14); --line-2:rgba(12,42,56,.28);
  --grain-blend:multiply; --glow-blend:multiply;
}

/* ============================================================ BASE */
*{ box-sizing:border-box; margin:0; padding:0; }
html{ scroll-behavior:smooth; }
body{ background:var(--bg); color:var(--text); font-family:var(--display); font-size:16px; line-height:1.6;
  -webkit-font-smoothing:antialiased; overflow-x:hidden; transition:background .4s ease, color .4s ease; }
a{ color:inherit; text-decoration:none; }
::selection{ background:var(--accent); color:var(--bg); }

body::after{ content:""; position:fixed; inset:0; pointer-events:none; z-index:-2; background:var(--bg-grad, var(--bg)); }
body::before{ content:""; position:fixed; inset:0; pointer-events:none; z-index:-1; opacity:.05;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

.shell{ max-width:var(--maxw); margin:0 auto; padding:0 26px; }
.eyebrow{ font-family:var(--mono); font-size:12px; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); }

/* NAV */
nav{ position:fixed; inset:0 0 auto 0; z-index:60; backdrop-filter:blur(8px);
  background:color-mix(in srgb,var(--bg) 78%, transparent); border-bottom:1px solid var(--line); }
nav .row{ display:flex; justify-content:space-between; align-items:center; padding:14px 26px; max-width:var(--maxw); margin:0 auto; gap:16px; }
.logo{ font-family:var(--display); font-weight:700; font-size:18px; letter-spacing:-.02em; }
.logo span{ color:var(--pop); }
.nav-right{ display:flex; align-items:center; gap:22px; }
.nav-links{ display:flex; gap:24px; }
.nav-links a{ font-family:var(--mono); font-size:12.5px; color:var(--muted); transition:color .2s; }
.nav-links a:hover{ color:var(--accent); }

/* THEME SWITCHER */
.theme-toggle{ width:38px; height:38px; display:grid; place-items:center; border:1px solid var(--line-2); border-radius:10px;
  background:var(--panel); color:var(--text); cursor:pointer; font-size:15px; line-height:1; transition:border-color .2s, transform .2s; }
.theme-toggle:hover{ border-color:var(--accent); transform:translateY(-1px); }

/* HERO + globe */
.hero{ position:relative; min-height:100vh; display:flex; align-items:center; overflow:hidden; }
.globe-canvas{ position:absolute; inset:0; z-index:0; cursor:grab; }
.globe-canvas.drag{ cursor:grabbing; }
.hero::after{ content:""; position:absolute; inset:0; z-index:1; pointer-events:none;
  background:linear-gradient(100deg, var(--bg) 15%, color-mix(in srgb,var(--bg) 72%, transparent) 42%, color-mix(in srgb,var(--bg) 22%, transparent) 64%, transparent 80%); }
.hero-content{ position:relative; z-index:2; pointer-events:none; max-width:600px; }
.hero-content a,.hero-content button{ pointer-events:auto; }
.typed{ font-family:var(--mono); font-size:13.5px; color:var(--accent); min-height:20px; letter-spacing:.02em; }
.typed .cur{ display:inline-block; width:8px; height:15px; background:var(--accent); margin-left:2px; vertical-align:-2px; animation:cur 1s step-end infinite; }
@keyframes cur{ 50%{opacity:0} }
.hero h1{ font-family:var(--display); font-weight:700; font-size:clamp(48px,9vw,116px); line-height:.92; letter-spacing:-.035em; margin:16px 0 0; max-width:11ch; background:linear-gradient(100deg,var(--accent) 30%,var(--pop)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.hero h1 .o{ color:inherit; }
.hero .role{ margin-top:18px; font-family:var(--display); font-weight:600; font-size:clamp(16px,2.1vw,22px); letter-spacing:-.01em; color:var(--text); }
.hero .intro{ margin-top:16px; max-width:48ch; color:var(--muted); line-height:1.7; }
.hero .cta{ margin-top:32px; display:flex; gap:13px; flex-wrap:wrap; }
.btn{ font-family:var(--mono); font-size:13px; letter-spacing:.03em; padding:13px 22px; border-radius:8px;
  transition:transform .35s cubic-bezier(.16,1,.3,1), background .25s, border-color .25s, color .25s; will-change:transform; }
.btn.p{ background:var(--pop); color:var(--bg); font-weight:500; }
.btn.p:hover{ transform:translateY(-3px) scale(1.03); }
.btn.s{ border:1px solid var(--line-2); color:var(--text); }
.btn.s:hover{ border-color:var(--accent); color:var(--accent); transform:translateY(-3px) scale(1.03); }
.drag-hint{ position:absolute; bottom:28px; left:50%; transform:translateX(-50%); z-index:2;
  font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--faint); display:flex; align-items:center; gap:9px; }
.drag-hint .dot{ width:6px; height:6px; border-radius:50%; background:var(--pop); animation:pp 1.8s infinite; }
@keyframes pp{ 0%,100%{opacity:.3} 50%{opacity:1} }

/* SECTIONS */
.chapter{ position:relative; background:transparent; border-top:1px solid var(--line); padding:92px 0; z-index:3; }
.ch-head{ display:flex; align-items:baseline; gap:18px; margin-bottom:46px; position:relative; }
.ch-no{ font-family:var(--display); font-weight:700; font-size:clamp(54px,8vw,96px); line-height:1;
  color:transparent; -webkit-text-stroke:1px var(--line-2); position:absolute; left:-6px; top:-56px; z-index:0; pointer-events:none; }
.ch-head h2{ position:relative; z-index:1; font-family:var(--serif); font-weight:400; font-size:clamp(34px,5vw,58px); letter-spacing:-.01em; color:var(--accent); }
.ch-head .line{ flex:1; height:1px; background:var(--line); align-self:center; }

.builds{ display:grid; gap:14px; }
.build{ display:grid; grid-template-columns:64px 1fr auto; align-items:center; gap:20px; padding:24px 22px;
  background:var(--panel); border:1px solid var(--line); border-radius:14px; cursor:pointer;
  transition:transform .4s cubic-bezier(.16,1,.3,1), border-color .3s, background .3s; }
.build:hover{ transform:translateX(8px) scale(1.006); border-color:var(--pop); background:var(--panel-2); }
.build:hover .info h3{ color:var(--pop); }
.build .yr{ font-family:var(--mono); font-size:12.5px; color:var(--faint); }
.build .info h3{ font-family:var(--display); font-weight:700; font-size:clamp(20px,2.6vw,28px); letter-spacing:-.02em; }
.build .info p{ color:var(--muted); font-size:14.5px; margin-top:5px; line-height:1.6; }
.build .tags{ display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-end; }
.build .tags span{ font-family:var(--mono); font-size:11px; color:var(--muted); border:1px solid var(--line); border-radius:999px; padding:5px 11px; }

.stack{ display:flex; flex-wrap:wrap; gap:10px; }
.stack span{ font-family:var(--mono); font-size:13px; color:var(--text); background:var(--panel); border:1px solid var(--line); border-radius:9px; padding:10px 16px;
  transition:border-color .25s, color .25s, transform .3s cubic-bezier(.16,1,.3,1); will-change:transform; }
.stack span:hover{ border-color:var(--accent); color:var(--accent); transform:translateY(-3px) scale(1.05); }

/* guestbook */
.gb-note{ font-family:var(--mono); font-size:11px; color:var(--accent); }
.gb-form{ display:grid; gap:10px; max-width:520px; margin-bottom:28px; }
.gb-form input,.gb-form textarea{ background:var(--panel); border:1px solid var(--line); border-radius:10px; padding:12px 14px;
  color:var(--text); font-family:var(--display); font-size:15px; resize:vertical; transition:border-color .2s; }
.gb-form input:focus,.gb-form textarea:focus{ outline:none; border-color:var(--accent); }
.gb-form button{ justify-self:start; background:var(--pop); color:var(--bg); font-weight:600; border:none; border-radius:10px;
  padding:11px 22px; cursor:pointer; font-family:var(--mono); font-size:13px; transition:transform .2s; }
.gb-form button:hover{ transform:translateY(-2px) scale(1.02); }
.gb-form button:disabled{ opacity:.5; cursor:default; }
.gb-list{ display:grid; gap:12px; }
.gb-entry{ background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:16px 18px; animation:gbIn .4s ease; }
@keyframes gbIn{ from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:none} }
.gb-top{ display:flex; justify-content:space-between; align-items:baseline; gap:10px; }
.gb-name{ font-family:var(--display); font-weight:700; font-size:15px; color:var(--accent); }
.gb-time{ font-family:var(--mono); font-size:11px; color:var(--faint); }
.gb-text{ color:var(--text); font-size:15px; margin-top:6px; word-wrap:break-word; }
.gb-empty{ color:var(--faint); font-family:var(--mono); font-size:13px; padding:10px 0; }

/* contact */
.contact{ text-align:center; padding:118px 0; }
.contact .big{ font-family:var(--serif); font-weight:400; font-size:clamp(28px,7.5vw,92px); letter-spacing:-.01em; line-height:1.05; overflow-wrap:anywhere; }
.contact .big a{ transition:color .25s; border-bottom:2px solid var(--line); }
.contact .big a:hover{ color:var(--pop); border-color:var(--pop); }
.contact .subs{ margin-top:38px; display:flex; gap:24px; justify-content:center; flex-wrap:wrap; }
.contact .subs a{ font-family:var(--mono); font-size:13px; color:var(--muted); transition:color .2s; cursor:pointer; }
.contact .subs a:hover{ color:var(--accent); }

footer{ border-top:1px solid var(--line); padding:22px 0 44px; }
footer .row{ display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px; max-width:var(--maxw); margin:0 auto; padding:0 26px; }
footer span{ font-family:var(--mono); font-size:11.5px; color:var(--faint); }

/* reveal */
.rv{ opacity:0; transform:translateY(26px); transition:opacity .8s ease, transform .9s cubic-bezier(.16,1,.3,1); }
.rv.in{ opacity:1; transform:none; }

/* DISCORD MODAL (stays dark — it's a Discord card) */
.dcm-overlay{ position:fixed; inset:0; z-index:100; display:none; align-items:center; justify-content:center;
  background:rgba(8,7,13,.6); backdrop-filter:blur(6px); padding:20px; }
.dcm-overlay.open{ display:flex; animation:dcmFade .25s ease; }
@keyframes dcmFade{ from{opacity:0} to{opacity:1} }
.dcm-card{ width:340px; max-width:100%; background:#0d0a22; border:1px solid rgba(255,255,255,.14); border-radius:18px;
  overflow:hidden; box-shadow:0 30px 70px rgba(0,0,0,.45); animation:dcmPop .3s cubic-bezier(.16,1,.3,1); color:#ECEDEF; }
@keyframes dcmPop{ from{ transform:translateY(14px) scale(.96); opacity:0 } to{ transform:none; opacity:1 } }
.dcm-banner{ height:90px; background:linear-gradient(120deg,var(--accent),var(--pop)); position:relative; }
.dcm-close{ position:absolute; top:10px; right:10px; width:30px; height:30px; border:none; border-radius:50%;
  background:rgba(0,0,0,.35); color:#fff; cursor:pointer; font-size:14px; }
.dcm-body{ padding:0 18px 20px; margin-top:-34px; }
.dcm-av{ width:74px; height:74px; border-radius:50%; border:5px solid #0d0a22; background:#1a1340;
  position:relative; display:grid; place-items:center; font-family:var(--display); font-weight:700; font-size:28px; color:var(--pop); }
.dcm-av .st{ position:absolute; right:1px; bottom:1px; width:18px; height:18px; border-radius:50%; background:#3DDC97; border:4px solid #0d0a22; }
.dcm-inner{ background:#0a0818; border:1px solid rgba(255,255,255,.08); border-radius:12px; padding:14px; margin-top:12px; }
.dcm-name{ font-family:var(--display); font-weight:700; font-size:21px; }
.dcm-user{ display:inline-flex; align-items:center; gap:9px; margin-top:3px; cursor:pointer; color:#9A95B8;
  font-size:13.5px; font-family:var(--mono); padding:5px 9px; border-radius:7px; transition:background .2s,color .2s; }
.dcm-user:hover{ background:rgba(255,255,255,.06); color:#fff; }
.dcm-user .cpy{ font-size:11px; color:#8aa0ff; }
.dcm-divider{ height:1px; background:rgba(255,255,255,.08); margin:14px 0; }
.dcm-label{ font-family:var(--mono); font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:#5E5980; }
.dcm-bio{ margin-top:6px; font-size:14px; }
.dcm-tags{ font-family:var(--mono); font-size:12px; color:#9A95B8; margin-top:9px; background:rgba(255,255,255,.04); padding:7px 10px; border-radius:7px; display:inline-block; }
.dcm-gh{ display:block; margin-top:13px; color:#8aa0ff; font-size:13px; font-family:var(--mono); }
.dcm-toast{ position:fixed; bottom:30px; left:50%; transform:translateX(-50%); background:var(--accent); color:var(--bg);
  font-family:var(--mono); font-size:13px; padding:9px 16px; border-radius:8px; z-index:120; opacity:0; transition:opacity .25s, transform .25s; pointer-events:none; }
.dcm-toast.show{ opacity:1; transform:translateX(-50%) translateY(-4px); }

/* discord connections / status / badge */
.dcm-badge{ font-family:var(--mono); font-size:10px; background:rgba(255,255,255,.08); color:#cbd0ff; border:1px solid rgba(255,255,255,.12); padding:2px 7px; border-radius:6px; vertical-align:middle; margin-left:6px; }
.dcm-status{ font-family:var(--mono); font-size:12px; color:#9A95B8; margin-top:8px; }
.dcm-conns{ display:grid; gap:8px; margin-top:8px; }
.dcm-conn{ display:flex; align-items:center; gap:9px; font-family:var(--mono); font-size:12.5px; color:#cdd2ff;
  background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); border-radius:8px; padding:9px 11px;
  transition:background .2s, border-color .2s, transform .2s; }
.dcm-conn:hover{ background:rgba(255,255,255,.08); border-color:#6C7CFF; transform:translateX(3px); }
.dcm-conn .ic{ opacity:.85; }
.dcm-conn .ext{ margin-left:auto; opacity:.55; }

/* cursor glow + easter egg */
.cursor-glow{ position:fixed; top:0; left:0; width:300px; height:300px; border-radius:50%; pointer-events:none; z-index:90;
  background:radial-gradient(circle, color-mix(in srgb,var(--accent) 14%, transparent), transparent 60%); transform:translate3d(-50%,-50%,0); will-change:transform; mix-blend-mode:var(--glow-blend); opacity:0; }
@media (hover:hover) and (min-width:781px){ .cursor-glow{ opacity:1; } }
.egg-msg{ position:fixed; left:50%; bottom:13%; transform:translate(-50%,12px); z-index:130; text-align:center;
  font-family:var(--display); font-weight:700; font-size:clamp(22px,4vw,34px); color:var(--pop); opacity:0;
  transition:opacity .4s, transform .4s; pointer-events:none; }
.egg-msg.show{ opacity:1; transform:translate(-50%,0); }
.egg-msg small{ display:block; font-family:var(--mono); font-weight:400; font-size:13px; color:var(--muted); margin-top:8px; }

@media (max-width:780px){
  .build{ grid-template-columns:1fr; gap:10px; }
  .build .tags{ justify-content:flex-start; }
  .nav-links{ display:none; }
  .hero::after{ background:radial-gradient(135% 95% at 36% 46%, var(--bg) 30%, color-mix(in srgb,var(--bg) 60%, transparent) 58%, transparent 84%); }
  .cursor-glow{ display:none; }
}
@media (prefers-reduced-motion:reduce){ *{ animation:none!important; transition:none!important; } .rv{ opacity:1; transform:none; } }


/* ---------- LEFT REPO SIDEBAR (desktop) ---------- */
.sidebar{ position:fixed; left:18px; top:50%; transform:translateY(-50%); z-index:55; display:none; flex-direction:column; gap:12px; }
@media (min-width:1200px){ .sidebar{ display:flex; } }
.sb-item{ position:relative; }
.sb-btn{ width:50px; height:50px; display:grid; place-items:center; border:1px solid var(--line); border-radius:14px;
  background:color-mix(in srgb,var(--panel) 86%, transparent); color:var(--text); cursor:pointer; backdrop-filter:blur(6px);
  transition:border-color .2s, transform .2s, color .2s; }
.sb-btn:hover{ border-color:var(--accent); color:var(--accent); transform:translateX(2px); }
.sb-btn svg{ width:22px; height:22px; }
.sb-badge{ position:absolute; top:-6px; right:-6px; min-width:18px; height:18px; padding:0 4px; border-radius:9px;
  background:var(--pop); color:#fff; font-family:var(--mono); font-size:10px; display:grid; place-items:center; }
.sb-flyout{ position:absolute; left:60px; top:50%; transform:translateY(-50%) translateX(-8px); width:300px; max-height:72vh; overflow:auto;
  background:var(--panel); border:1px solid var(--line); border-radius:16px; padding:10px; opacity:0; pointer-events:none;
  transition:opacity .25s, transform .3s cubic-bezier(.16,1,.3,1); box-shadow:0 24px 60px rgba(0,0,0,.28); }
.sb-item:hover .sb-flyout, .sb-flyout:hover{ opacity:1; pointer-events:auto; transform:translateY(-50%) translateX(0); }
.sb-flyout .ttl{ font-family:var(--mono); font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); padding:6px 8px 10px; }
.repo{ display:block; border-radius:10px; padding:10px; cursor:pointer; transition:background .2s; }
.repo:hover{ background:var(--panel-2); }
.repo .rhead{ display:flex; align-items:center; gap:8px; }
.repo .rname{ font-family:var(--display); font-weight:600; font-size:14px; color:var(--text); }
.repo .rlang{ margin-left:auto; font-family:var(--mono); font-size:10px; color:var(--muted); display:flex; align-items:center; gap:5px; }
.repo .dot{ width:8px; height:8px; border-radius:50%; }
.repo .rbody{ max-height:0; overflow:hidden; transition:max-height .35s cubic-bezier(.16,1,.3,1); }
.repo:hover .rbody{ max-height:130px; }
.repo .rdesc{ color:var(--muted); font-size:12.5px; margin:8px 0 6px; line-height:1.5; }
.repo .rmeta{ display:flex; align-items:center; gap:14px; font-family:var(--mono); font-size:11px; color:var(--faint); }
.sb-empty{ padding:12px; font-family:var(--mono); font-size:12px; color:var(--muted); line-height:1.5; }
'@
Set-Content -Path 'app/globals.css' -Value $content -Encoding UTF8
Write-Host '  updated app/globals.css' -ForegroundColor Green

# ---- app/page.tsx ----
$dir = Split-Path 'app/page.tsx' -Parent
if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
$content = @'
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Guestbook from "@/components/Guestbook";
import Contact from "@/components/Contact";
import Fx from "@/components/Fx";
import RepoSidebar from "@/components/RepoSidebar";

const builds = [
  { href: "https://nexlease.in", yr: "2024-26", title: "Nexlease",
    desc: "A rental marketplace I built for a client: website, Android app, an ops dashboard for their team, plus Nexscore, a custom locality-scoring engine. Full stack, start to finish.",
    tags: ["React", "Node", "MySQL", "Android"] },
  { href: "https://justcalltech.in", yr: "2023", title: "JustCallTech",
    desc: "An IT services brand. I built their Kotlin Android app (live on the Play Store) and their website. Bookings for laptops, WiFi, CCTV, AMC.",
    tags: ["Kotlin", "Firebase", "MVVM"] },
  { href: "https://chc-site.vercel.app", yr: "2025", title: "Content Helper Community",
    desc: "Site for a creator community. It pulls every member's live YouTube subscriber count through a serverless function I wrote for them.",
    tags: ["Vercel", "YouTube API", "SVG"] },
  { href: "https://whatnowindia.vercel.app", yr: "2025", title: "WhatNow",
    desc: "Built the platform for a startup helping Indian students figure out what comes next right after their board exams.",
    tags: ["Next.js", "Vercel"] },
];

const stack = ["TypeScript", "React", "Next.js", "Node.js", "Kotlin / Android", "Python", "MySQL", "Firebase", "Supabase", "Three.js", "Tailwind", "PM2 / VPS", "Vercel", "Figma"];

export default function Home() {
  return (
    <>
      <Nav />
      <RepoSidebar />
      <Hero />

      <section className="chapter" id="builds">
        <div className="shell">
          <div className="ch-head rv"><span className="ch-no">01</span><h2>What I&apos;ve built</h2><span className="line" /></div>
          <div className="builds">
            {builds.map((b) => (
              <a className="build rv" key={b.title} href={b.href} target="_blank" rel="noopener noreferrer">
                <span className="yr">{b.yr}</span>
                <div className="info"><h3>{b.title}</h3><p>{b.desc}</p></div>
                <div className="tags">{b.tags.map((t) => <span key={t}>{t}</span>)}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter" id="stack">
        <div className="shell">
          <div className="ch-head rv"><span className="ch-no">02</span><h2>The stack</h2><span className="line" /></div>
          <p className="rv" style={{ color: "var(--muted)", maxWidth: "54ch", marginBottom: "30px" }}>
            I don&apos;t stick to one fixed stack, I use what the job needs. Everything here I&apos;ve actually shipped with, not just tried once over a weekend.
          </p>
          <div className="stack rv">{stack.map((s) => <span key={s}>{s}</span>)}</div>
        </div>
      </section>

      <Guestbook />
      <Contact />

      <footer>
        <div className="row">
          <span>© 2026 Arshdeep Singh</span>
          <span>Built with Next.js · pure-canvas globe</span>
        </div>
      </footer>

      <Fx />
    </>
  );
}
'@
Set-Content -Path 'app/page.tsx' -Value $content -Encoding UTF8
Write-Host '  updated app/page.tsx' -ForegroundColor Green

# ---- components/ThemeToggle.tsx ----
$dir = Split-Path 'components/ThemeToggle.tsx' -Parent
if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
$content = @'
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
'@
Set-Content -Path 'components/ThemeToggle.tsx' -Value $content -Encoding UTF8
Write-Host '  updated components/ThemeToggle.tsx' -ForegroundColor Green

# ---- components/Contact.tsx ----
$dir = Split-Path 'components/Contact.tsx' -Parent
if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
$content = @'
"use client";
import { useEffect, useState } from "react";

export default function Contact() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-discord", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-discord", onOpen); };
  }, []);

  function copyUser() {
    (navigator.clipboard?.writeText("arshnah") || Promise.resolve()).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <>
      <section className="chapter contact" id="contact">
        <div className="shell">
          <p className="eyebrow">04 / let&apos;s build</p>
          <div className="big" style={{ marginTop: "20px" }}>
            <a href="mailto:arshjbdarsh@gmail.com">arshjbdarsh@gmail.com</a>
          </div>
          <div className="subs">
            <a href="https://github.com/arshnah" target="_blank" rel="noopener noreferrer">↗ GitHub</a>
            <a onClick={() => setOpen(true)}>↗ Discord</a>
          </div>
        </div>
      </section>

      <div className={`dcm-overlay${open ? " open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
        <div className="dcm-card" role="dialog" aria-label="Discord profile">
          <div className="dcm-banner"><button className="dcm-close" aria-label="Close" onClick={() => setOpen(false)}>✕</button></div>
          <div className="dcm-body">
            <div className="dcm-av">A<span className="st" /></div>
            <div className="dcm-inner">
              <div className="dcm-name">Arsh <span className="dcm-badge" title="i use arch btw">🐧 arch</span></div>
              <div className="dcm-user" title="Copy username" onClick={copyUser}>
                arshnah <span className="cpy">⧉ copy</span>
              </div>
              <div className="dcm-status">⌨ building something solo</div>

              <div className="dcm-divider" />

              <div className="dcm-label">About me</div>
              <div className="dcm-bio">dev, i use arch btw.</div>

              <div className="dcm-label" style={{ marginTop: 14 }}>Languages</div>
              <div className="dcm-tags">c, c++, c#, python, java, js</div>

              <div className="dcm-label" style={{ marginTop: 14 }}>Connections</div>
              <div className="dcm-conns">
                <a className="dcm-conn" href="https://github.com/arshnah" target="_blank" rel="noopener noreferrer">
                  <span className="ic">⌥</span> github.com/arshnah <span className="ext">↗</span>
                </a>
                <a className="dcm-conn" href="mailto:arshjbdarsh@gmail.com">
                  <span className="ic">✉</span> arshjbdarsh@gmail.com <span className="ext">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`dcm-toast${copied ? " show" : ""}`}>Username copied ✓</div>
    </>
  );
}
'@
Set-Content -Path 'components/Contact.tsx' -Value $content -Encoding UTF8
Write-Host '  updated components/Contact.tsx' -ForegroundColor Green

# ---- components/Globe.tsx ----
$dir = Split-Path 'components/Globe.tsx' -Parent
if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
$content = @'
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
'@
Set-Content -Path 'components/Globe.tsx' -Value $content -Encoding UTF8
Write-Host '  updated components/Globe.tsx' -ForegroundColor Green

# ---- components/Fx.tsx ----
$dir = Split-Path 'components/Fx.tsx' -Parent
if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
$content = @'
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
'@
Set-Content -Path 'components/Fx.tsx' -Value $content -Encoding UTF8
Write-Host '  updated components/Fx.tsx' -ForegroundColor Green

# ---- components/RepoSidebar.tsx ----
$dir = Split-Path 'components/RepoSidebar.tsx' -Parent
if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
$content = @'
"use client";
import { useEffect, useState } from "react";

type Repo = { name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number };

const LANG: Record<string, string> = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", "C++": "#f34b7d",
  C: "#888", "C#": "#178600", Kotlin: "#A97BFF", HTML: "#e34c26", CSS: "#563d7c",
  Java: "#b07219", Shell: "#89e051", Vue: "#41b883", Dart: "#00B4AB",
};

const GH = (
  <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 014 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
);
const DC = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.4A19.8 19.8 0 0015.4 3l-.2.4a18 18 0 014.4 2.2 13 13 0 00-11.2 0A18 18 0 018.8 3.4L8.6 3a19.8 19.8 0 00-4.9 1.4C.9 8.5.2 12.5.5 16.4a19.9 19.9 0 006 3l.8-1.3a13 13 0 01-2-1l.5-.4a14 14 0 0012.3 0l.5.4c-.6.4-1.3.7-2 1l.8 1.3a19.9 19.9 0 006-3c.4-4.5-.6-8.4-2.4-12zM8.9 14c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.2 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/></svg>
);

export default function RepoSidebar() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "err">("loading");

  useEffect(() => {
    fetch("https://api.github.com/users/arshnah/repos?sort=updated&per_page=20")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: any[]) => { setRepos(d.filter((x) => !x.fork).slice(0, 8)); setState("ok"); })
      .catch(() => setState("err"));
  }, []);

  return (
    <aside className="sidebar" aria-label="Profiles">
      <div className="sb-item">
        <a className="sb-btn" href="https://github.com/arshnah" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          {GH}
          {state === "ok" && <span className="sb-badge">{repos.length}</span>}
        </a>
        <div className="sb-flyout">
          <div className="ttl">github.com/arshnah</div>
          {state === "loading" && <div className="sb-empty">loading repos…</div>}
          {state === "err" && <div className="sb-empty">Couldn&apos;t load (rate limit). <a href="https://github.com/arshnah" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>Open GitHub ↗</a></div>}
          {state === "ok" && repos.map((r) => (
            <a className="repo" key={r.name} href={r.html_url} target="_blank" rel="noopener noreferrer">
              <div className="rhead">
                <span className="rname">{r.name}</span>
                {r.language && (
                  <span className="rlang"><span className="dot" style={{ background: LANG[r.language] || "var(--accent)" }} />{r.language}</span>
                )}
              </div>
              <div className="rbody">
                <div className="rdesc">{r.description || "No description."}</div>
                <div className="rmeta"><span>★ {r.stargazers_count}</span><span style={{ color: "var(--accent)" }}>open ↗</span></div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="sb-item">
        <button className="sb-btn" aria-label="Discord" onClick={() => window.dispatchEvent(new Event("open-discord"))}>
          {DC}
        </button>
        <div className="sb-flyout" style={{ width: 200 }}>
          <div className="ttl">discord</div>
          <div className="sb-empty">@arshnah · <span style={{ color: "var(--accent)", cursor: "pointer" }} onClick={() => window.dispatchEvent(new Event("open-discord"))}>view card</span></div>
        </div>
      </div>
    </aside>
  );
}
'@
Set-Content -Path 'components/RepoSidebar.tsx' -Value $content -Encoding UTF8
Write-Host '  updated components/RepoSidebar.tsx' -ForegroundColor Green

Write-Host 'Done. npm run dev' -ForegroundColor Cyan