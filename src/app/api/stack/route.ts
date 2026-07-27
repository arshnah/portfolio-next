// The whole profile block as one image. Four separate cards meant four
// endpoints across three deploy targets, a seam between every pair, and two of
// them on a host that only ships from a laptop. This renders all of it here,
// where a push is a deploy — and being one <img> is what actually removes the
// gaps, since nothing markdown does can close them.
export const dynamic = "force-dynamic";

const USER = process.env.NEXT_PUBLIC_GITHUB_USER || "arshnah";
const TOKEN = process.env.GITHUB_TOKEN;
const API = "https://api.arshnah.in";
const NOW = "https://now.arshnah.in";

const THEMES = {
  dark: { bg: "#0d1117", rule: "#30363d", head: "#58a6ff", key: "#d29922", num: "#58a6ff", ink: "#c9d1d9", mut: "#8b949e", faint: "#6e7681", art: "#6e7681", artBg: "" },
  light: { bg: "#ffffff", rule: "#d8dee4", head: "#0969da", key: "#9a6700", num: "#0969da", ink: "#1f2328", mut: "#57606a", faint: "#8c959f", art: "#9aa4af", artBg: "#0d1117" },
};
type Theme = typeof THEMES.dark;

const DOT = { online: "#3fb950", idle: "#d29922", dnd: "#f85149", offline: "#6e7681" } as Record<string, string>;
const STATUS = { online: "online", idle: "idle", dnd: "do not disturb", offline: "offline" } as Record<string, string>;

const ART = [
  "                .j8@@@@@@@@@8@@8@@@@@@@x:....",
  "               j8@@@@@@OOOO8@@@@8OxO@@@@8j?:.",
  "             :8@@@@@@8xO88@888@@@8OxO@@@@@@8x.",
  "           .O@@@@@@@8O@@@@8@88@@@@@8xO@@@@@@@8j.",
  "          .8@@@@@@@88@@@@@@@8@@8@@@@8OO@@@@@@88x.",
  "         .@@@@@@@@88@@@@@@@@@@88@@@@@8OO@@@@@@@8x",
  "        .8@@@8@@@888@@8@@@@8@@88888@@@8OO8@8@@@@8?",
  "        O88@O8@@@8O@@88@8@@88@888O88@@@8OO@88@@8@8:",
  ":::::::j88@O8@@@8O8@88O@8@@88@888xO88@@@8O8O88@8@88",
  "xxxxxxxO8@8O@@@@xx888jO88@@O8@888jjOx888O8Ox88@@88O?",
  "OOOOOOO88@O8@@@Oj88OjjO88@@88@88Oxjjxx8OOOOj88@@88Oj",
  "xOOOOO88@8O8@@8jx8Oxx8O8O@@88888x8xjjjx8xjOx88@@@O8j",
  "xxjxx88O@888@@8jx8xO@@O8j8@88888O@@xjjjxxjxx88@@@O8?",
  "jjjxO8xO8888@@OjxxO@@@Oxjx888888@@@8xxxjxjjx888@@88:",
  "jjjxOjj88OO8@8xjxO8OxxjjjjOO8@8O@8Oxj:?j???O888@@OO",
  "jjjjx?jO88OO88xj?:.    :OxxxO88O8@x.     .jx888@@Ox",
  "???jjjjx8OOxO8OjxO8jxOO8@@xxx88O@8@8jxxx8jx8O88@8x:",
  "???jjjjjOOOjjOOjx@@@@@@@@@8OOOOx8@@@@@@@@@88OO8@8j.",
  "jjjjjjjjxOOx?jOO8@@@@@@@@@@8O@@@@@@@@@@@@@88OO888j:",
  "xxxxxxxOOO8O??jO88@@@@@@@@@OO@@@@@@@@@@@@@88x888xj:",
  "OOOOOO8OOO88j::jO@@@@@@@@@@OO@@@@@@@@@@@@88jx888j??",
  "88888888O888O:::x@@@@@@@@@@@@@@@@@@@@@@@8O?j888O?:?",
  "8888888888888j::?8@@@@@@@@@@@@@@@@@@@@@@8?:x888?:::.",
  "88888888@8O88O::?O8@@@@@@@@@@@@@@@@@@@@Ox.?888j..:::",
  "8OOOOOO88Oj88Oj:?OOOO@@@@@@@@8@@@@@@@x..?.O88x:  .::",
  "888888888x?x88O??O8O. j8@@@@@@@@@@8Oj  .:x88x:   ::?",
  "jjjjxO8x8???x88O?jj:   ?jx8888@8Oxj??  .?88x:.   :jO",
  "     8j.O?:: jOOx     .:????jjj?????:.  xOO:..   jO8",
  "    jx .O?..  jOO?   ??::::::::::::::??.OO?:.    x88",
  "    O   Ox:    ?8O: jj??:::::.:::::??j8xOx::.   :O88",
  "   :.   xOj     :8OO@xj??:::...:::??x8@OO?:?.   x888",
  "         O8?     x8O8@Oj??:::::::??x@@8OO::?.  jO8xj",
];

const W = 940;
const PAD = 30;
const RAIL = 12;
const FS = 14;
const CW = FS * 0.62;
const VALX = PAD + 150;
const RIGHT = W - PAD;
const ROW = 26;

const xml = (s: unknown) =>
  String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
const clip = (s: string, n: number) => (s && s.length > n ? s.slice(0, n - 1) + "…" : s || "");
const strip = (s: string) => s.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

const j = (u: string, ms = 6000) =>
  fetch(u, { cache: "no-store", signal: AbortSignal.timeout(ms) }).then((r) => (r.ok ? r.json() : null)).catch(() => null);

function age(iso: string) {
  const f = new Date(iso), n = new Date();
  let y = n.getFullYear() - f.getFullYear(), m = n.getMonth() - f.getMonth(), d = n.getDate() - f.getDate();
  if (d < 0) { m -= 1; d += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); }
  if (m < 0) { y -= 1; m += 12; }
  const b = [];
  if (y) b.push(y + (y === 1 ? " year" : " years"));
  if (m) b.push(m + (m === 1 ? " month" : " months"));
  b.push(d + (d === 1 ? " day" : " days"));
  return b.join(", ");
}

// last.fm hands back this same grey star for anything it has no cover for,
// which is most non-western releases. treat it as no art and go to itunes.
const LASTFM_PLACEHOLDER = "2a96cbd8b46e442fc41c2b86b821562f";

async function itunesArt(artist?: string, track?: string) {
  const term = `${artist || ""} ${track || ""}`.trim();
  if (!term) return null;
  const d = await j(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=1`);
  const art: string | undefined = d?.results?.[0]?.artworkUrl100;
  return art ? art.replace("100x100bb", "300x300bb") : null;
}

// the cover has to be inlined — github proxies the readme image, and a remote
// href inside an svg it serves will not be fetched
async function inlineArt(url?: string | null) {
  if (!url) return null;
  try {
    const r = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!r.ok) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > 400_000) return null;
    const type = r.headers.get("content-type") || "image/jpeg";
    return `data:${type};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

async function github() {
  const h: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": USER + "-stack" };
  if (TOKEN) h.Authorization = "Bearer " + TOKEN;
  const g = (u: string) => fetch(u, { headers: h, cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).catch(() => null);
  const [user, repos] = await Promise.all([
    g(`https://api.github.com/users/${USER}`),
    g(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner&sort=pushed`),
  ]);
  if (!user) return null;
  const list: any[] = Array.isArray(repos) ? repos : [];
  const counts: Record<string, number> = {};
  for (const r of list) if (r.language && !r.fork) counts[r.language] = (counts[r.language] || 0) + 1;
  let commits: number | null = null;
  if (TOKEN) {
    const r = await fetch("https://api.github.com/graphql", {
      method: "POST", headers: { ...h, "Content-Type": "application/json" }, cache: "no-store",
      body: JSON.stringify({ query: "query($login:String!){user(login:$login){contributionsCollection{totalCommitContributions}}}", variables: { login: USER } }),
    }).then((x) => x.json()).catch(() => null);
    const n = r?.data?.user?.contributionsCollection?.totalCommitContributions;
    if (typeof n === "number") commits = n;
  }
  return {
    login: user.login as string,
    uptime: age(user.created_at),
    location: (user.location as string) || "India",
    langs: Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([l]) => l).join(", "),
    site: ((user.blog as string) || "arshnah.in").replace(/^https?:\/\//, "").replace(/\/$/, ""),
    repos: user.public_repos as number,
    stars: list.reduce((s, r) => s + (r.stargazers_count || 0), 0),
    followers: user.followers as number,
    commits,
  };
}

// ── drawing ──────────────────────────────────────────────────────────────────

// one row style for every section: bullet, amber label, value at a fixed
// column. a right-aligned value with a dotted leader cannot share a line with
// art on the right, and mixing the two per-section is what made the blocks
// look unrelated in the first place.
function row(label: string, value: string, y: number, _t: Theme, cls = "v") {
  return `<text x="${PAD}" y="${y}" class="bul">.</text>` +
    `<text x="${PAD + CW * 1.6}" y="${y}" class="k">${xml(label + ":")}</text>` +
    `<text x="${VALX}" y="${y}" class="${cls}">${xml(value)}</text>`;
}

function head(title: string, right: string, y: number, t: Theme) {
  const w = title.length * (CW + 1.4) + 16;
  return `<text x="${PAD}" y="${y}" class="hd">${xml(title)}</text>` +
    `<text x="${RIGHT}" y="${y}" text-anchor="end" class="u">${xml(right)}</text>` +
    `<line x1="${PAD + w}" y1="${y - 5}" x2="${RIGHT - right.length * 6.6 - 14}" y2="${y - 5}" stroke="${t.rule}"/>`;
}

const divider = (y: number, t: Theme) =>
  `<line x1="${RAIL}" y1="${y}" x2="${RIGHT}" y2="${y}" stroke="${t.rule}" stroke-opacity="0.7"/>`;

export async function GET(req: Request) {
  const t = THEMES[new URL(req.url).searchParams.get("theme") === "light" ? "light" : "dark"];

  const [gh, np, dc, wk, cm, fx] = await Promise.all([
    github(),
    j(`${API}/api/now-playing`),
    j(`${API}/api/discord-status`),
    j(`${API}/api/coding`),
    j(`${API}/api/last-commit`),
    j(`${NOW}/api/focus-data`),
  ]);
  const lfmArt: string | undefined = np?.albumArt;
  const usable = lfmArt && !lfmArt.includes(LASTFM_PLACEHOLDER) ? lfmArt : null;
  const cover = await inlineArt(usable || (np?.title ? await itunesArt(np.artist, np.title) : null));

  const out: string[] = [];
  let y = 0;

  // ── github ────────────────────────────────────────────────────────────────
  const artTop = 62;
  const artW = Math.max(...ART.map((l) => l.length)) * 9.4 * 0.6;
  const artX = Math.round(RIGHT - artW);
  // same reason as the neofetch card: the ramp assumes a dark ground, so on
  // white the portrait would render as its own negative
  if (t.artBg) out.push(`<rect x="${artX - 12}" y="${artTop - 15}" width="${Math.round(artW) + 24}" height="${ART.length * 9.4 + 18}" rx="10" fill="${t.artBg}"/>`);
  out.push(`<text class="art" xml:space="preserve" y="${artTop}">${ART.map((l, i) => `<tspan x="${artX}" dy="${i === 0 ? 0 : 9.4}">${xml(l)}</tspan>`).join("")}</text>`);

  y = 46;
  out.push(head(`${gh?.login || USER}@github`, "github.com", y, t));
  y += 34;
  if (gh) {
    for (const [k, v] of [["uptime", gh.uptime], ["location", gh.location], ["languages", clip(gh.langs, 40)], ["website", gh.site]] as [string, string][]) {
      out.push(row(k, v, y, t)); y += ROW;
    }
    for (const [k, v] of [["repos", String(gh.repos)], ["stars", String(gh.stars)], ["followers", String(gh.followers)]] as [string, string][]) {
      out.push(row(k, v, y, t, "n")); y += ROW;
    }
    if (gh.commits !== null) { out.push(row("commits", `${gh.commits} this year`, y, t, "n")); y += ROW; }
  } else {
    out.push(row("github", "stats unavailable", y, t, "m")); y += ROW;
  }
  y = Math.max(y, artTop + ART.length * 9.4) + 18;

  // ── last.fm ───────────────────────────────────────────────────────────────
  out.push(divider(y, t)); y += 40;
  const live = Boolean(np?.isPlaying);
  out.push(head(`${USER}@lastfm`, live ? "now playing" : "last scrobble", y, t));
  const coverY = y + 12;
  y += 34;
  if (np?.title) {
    const dot = live ? `<circle cx="${VALX + 5}" cy="${y - 5}" r="4" fill="${t.key}"><animate attributeName="opacity" values="1;0.25;1" dur="1.4s" repeatCount="indefinite"/></circle>` : "";
    out.push(`<text x="${PAD}" y="${y}" class="bul">.</text><text x="${PAD + CW * 1.6}" y="${y}" class="k">track:</text>${dot}<text x="${live ? VALX + 18 : VALX}" y="${y}" class="hi">${xml(clip(np.title, 52))}</text>`);
    y += ROW;
    out.push(`<text x="${PAD}" y="${y}" class="bul">.</text><text x="${PAD + CW * 1.6}" y="${y}" class="k">artist:</text><text x="${VALX}" y="${y}" class="v">${xml(clip(np.artist || "", 52))}</text>`);
    y += ROW;
  } else {
    out.push(row("track", "nothing playing", y, t, "m")); y += ROW;
  }
  if (cover) {
    const sz = 78;
    out.push(`<clipPath id="cv"><rect x="${RIGHT - sz}" y="${coverY}" width="${sz}" height="${sz}" rx="8"/></clipPath>` +
      `<image href="${cover}" x="${RIGHT - sz}" y="${coverY}" width="${sz}" height="${sz}" clip-path="url(#cv)" preserveAspectRatio="xMidYMid slice"/>` +
      `<rect x="${RIGHT - sz}" y="${coverY}" width="${sz}" height="${sz}" rx="8" fill="none" stroke="${t.rule}"/>`);
    y = Math.max(y, coverY + sz + 22);
  } else y += 8;

  // ── focus ─────────────────────────────────────────────────────────────────
  out.push(divider(y, t)); y += 40;
  out.push(head(`${USER}@focus`, "now.arshnah.in", y, t));
  y += 34;
  const wrap = (s: string, n: number) => {
    const words = s.split(/\s+/); const lines: string[] = []; let cur = "";
    for (const w of words) { if ((cur + " " + w).trim().length > n) { lines.push(cur.trim()); cur = w; } else cur += " " + w; }
    if (cur.trim()) lines.push(cur.trim());
    return lines;
  };
  const cols = Math.floor((RIGHT - VALX) / CW);
  for (const [k, raw, cls] of [["now", fx?.p1, "v"], ["open", fx?.p2, "m"]] as [string, string, string][]) {
    if (!raw) continue;
    const ls = wrap(strip(raw), cols);
    out.push(`<text x="${PAD}" y="${y}" class="bul">.</text><text x="${PAD + CW * 1.6}" y="${y}" class="k">${k}:</text>`);
    ls.forEach((l, i) => out.push(`<text x="${VALX}" y="${y + i * 22}" class="${cls}">${xml(l)}</text>`));
    y += ls.length * 22 + 8;
  }
  y += 12;

  // ── now ───────────────────────────────────────────────────────────────────
  out.push(divider(y, t)); y += 40;
  out.push(head(`${USER}@now`, "now.arshnah.in", y, t));
  y += 34;
  const time = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase();
  const st = dc?.status || "offline";
  out.push(`<circle cx="${VALX + 5}" cy="${y - 5}" r="4.5" fill="${DOT[st] || DOT.offline}"/>` +
    `<text x="${PAD}" y="${y}" class="bul">.</text><text x="${PAD + CW * 1.6}" y="${y}" class="k">status:</text>` +
    `<text x="${VALX + 20}" y="${y}" class="v">${xml(`${STATUS[st] || st}  ·  ${time} ist`)}</text>`);
  y += ROW;
  if (wk?.ok && wk.text) {
    out.push(`<text x="${PAD}" y="${y}" class="bul">.</text><text x="${PAD + CW * 1.6}" y="${y}" class="k">coding:</text><text x="${VALX}" y="${y}" class="v">${xml(clip(`${wk.text}${wk.range === "week" ? " this week" : " today"}${wk.language ? `  ·  mostly ${wk.language}` : ""}`, 70))}</text>`);
    y += ROW;
  }
  if (cm?.ok) {
    out.push(`<text x="${PAD}" y="${y}" class="bul">.</text><text x="${PAD + CW * 1.6}" y="${y}" class="k">shipped:</text><text x="${VALX}" y="${y}" class="m">${xml(clip(`${cm.message}  ·  ${cm.repo?.split("/")[1] || ""}  ·  ${cm.ago}`, 70))}</text>`);
    y += ROW;
  }

  const H = Math.round(y + 20);

  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">
<style>
  .hd{font:700 ${FS + 3}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.head}}
  .u{font:400 11px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.faint}}
  .k{font:400 ${FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.key}}
  .bul{font:400 ${FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.key}}
  .v{font:400 ${FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.ink}}
  .hi{font:400 ${FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.head}}
  .n{font:700 ${FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.num}}
  .m{font:400 ${FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.mut}}
  .art{font:400 9.4px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.art}}
</style>
<rect width="${W}" height="${H}" fill="${t.bg}"/>
<line x1="${RAIL}" y1="0" x2="${RAIL}" y2="${H}" stroke="${t.rule}" stroke-width="1.5"/>
${out.join("\n")}
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
