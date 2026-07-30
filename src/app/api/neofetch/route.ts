export const dynamic = "force-dynamic";

const USER = process.env.NEXT_PUBLIC_GITHUB_USER || "arshnah";
const TOKEN = process.env.GITHUB_TOKEN;

const THEMES = {
  dark: { bg: "#0d1117", stroke: "#21262d", rule: "#30363d", head: "#58a6ff", key: "#d29922", num: "#58a6ff", ink: "#c9d1d9", art: "#6e7681", dot: "#30363d", artBg: "" },
  light: { bg: "#ffffff", stroke: "#d0d7de", rule: "#d8dee4", head: "#0969da", key: "#9a6700", num: "#0969da", ink: "#1f2328", art: "#9aa4af", dot: "#d8dee4", artBg: "#0d1117" },
};

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
  "         O8?     x8O8@Oj??:::::::??x@@8OO::?.  jO8xj"
];

const xml = (s: unknown) =>
  String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
const clip = (s: string, n: number) => (s && s.length > n ? s.slice(0, n - 1) + "…" : s || "");

function age(iso: string) {
  const from = new Date(iso), now = new Date();
  let y = now.getFullYear() - from.getFullYear();
  let m = now.getMonth() - from.getMonth();
  let d = now.getDate() - from.getDate();
  if (d < 0) { m -= 1; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (m < 0) { y -= 1; m += 12; }
  const bits = [];
  if (y) bits.push(y + (y === 1 ? " year" : " years"));
  if (m) bits.push(m + (m === 1 ? " month" : " months"));
  bits.push(d + (d === 1 ? " day" : " days"));
  return bits.join(", ");
}

async function getStats() {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": USER + "-neofetch" };
  if (TOKEN) headers.Authorization = "Bearer " + TOKEN;
  const get = (u: string) => fetch(u, { headers, cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).catch(() => null);

  const [user, repos] = await Promise.all([
    get(`https://api.github.com/users/${USER}`),
    get(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner&sort=pushed`),
  ]);
  if (!user) return null;

  const list: any[] = Array.isArray(repos) ? repos : [];
  const stars = list.reduce((s, r) => s + (r.stargazers_count || 0), 0);

  // commits need graphql, which is token-only. omit the row rather than
  // reporting a zero that isn't true.
  let commits: number | null = null;
  if (TOKEN) {
    const r = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        query: "query($login:String!){user(login:$login){contributionsCollection{totalCommitContributions}}}",
        variables: { login: USER },
      }),
    }).then((x) => x.json()).catch(() => null);
    const n = r?.data?.user?.contributionsCollection?.totalCommitContributions;
    if (typeof n === "number") commits = n;
  }

  let site = (user.blog as string) || "arshnah.in";
  site = site.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return {
    user: user.login as string,
    uptime: age(user.created_at),
    location: (user.location as string) || "India",
    company: (user.company as string) || null,
    email: "me@arshnah.in",
    site,
    repos: user.public_repos as number,
    stars,
    followers: user.followers as number,
    commits,
  };
}

type Stats = NonNullable<Awaited<ReturnType<typeof getStats>>>;

const W = 940;
const ART_FS = 9.4;      // art glyph size
const ART_LH = 9.4;      // one row per line, no leading
const FS = 14;           // stat text size
const CW = FS * 0.62;    // generous mono advance, so leaders never run under text
const PAD = 30;

function leader(x1: number, x2: number, y: number, t: typeof THEMES.dark) {
  if (x2 - x1 < 12) return "";
  return `<line x1="${x1.toFixed(1)}" y1="${y - 4}" x2="${x2.toFixed(1)}" y2="${y - 4}" stroke="${t.dot}" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="1 5"/>`;
}

function section(title: string, x: number, right: number, y: number, t: typeof THEMES.dark) {
  const w = title.length * CW + 10;
  return `<text x="${x}" y="${y}" class="sec">${xml(title)}</text>` +
    `<line x1="${x + w}" y1="${y - 5}" x2="${right}" y2="${y - 5}" stroke="${t.rule}"/>`;
}

function row(label: string, value: string, x: number, right: number, y: number, t: typeof THEMES.dark, num = false) {
  const labelText = label + ":";
  const lx = x + CW * 1.6;
  const labelEnd = lx + labelText.length * CW + 6;
  const valStart = right - String(value).length * CW - 6;
  return `<text x="${x}" y="${y}" class="bul">.</text>` +
    `<text x="${lx}" y="${y}" class="k">${xml(labelText)}</text>` +
    leader(labelEnd, valStart, y, t) +
    `<text x="${right}" y="${y}" text-anchor="end" class="${num ? "n" : "v"}">${xml(value)}</text>`;
}

function svg(s: Stats, t: typeof THEMES.dark) {
  const artX = PAD;
  const artW = Math.max(...ART.map((l) => l.length)) * (ART_FS * 0.6);
  const colX = Math.round(artX + artW + 46);
  const right = W - PAD;
  const half = Math.floor((right - colX) / 2);

  const art = ART.map((l, i) => `<tspan x="${artX}" dy="${i === 0 ? 0 : ART_LH}">${xml(l)}</tspan>`).join("");
  // the ramp maps bright pixels to dense glyphs, which only reads correctly on a
  // dark ground — on white the same density looks like shadow and the portrait
  // comes out a negative. so the art keeps its own dark panel in light mode.
  const artPanel = t.artBg
    ? `<rect x="${artX - 12}" y="${62 - ART_FS - 6}" width="${artW + 24}" height="${ART.length * ART_LH + 18}" rx="10" fill="${t.artBg}"/>`
    : "";

  let y = 62;
  const parts: string[] = [];

  parts.push(`<text x="${colX}" y="${y}" class="hd">${xml(s.user)}@github</text>`);
  parts.push(`<line x1="${colX + (s.user.length + 7) * CW + 14}" y1="${y - 5}" x2="${right}" y2="${y - 5}" stroke="${t.rule}"/>`);
  y += 34;

  parts.push(row("Uptime", s.uptime, colX, right, y, t)); y += 25;
  parts.push(row("Location", s.location, colX, right, y, t)); y += 25;
  if (s.company) { parts.push(row("Company", clip(s.company, 28), colX, right, y, t)); y += 25; }
  parts.push(row("Email", s.email, colX, right, y, t)); y += 42;

  parts.push(section("Contact", colX, right, y, t)); y += 30;
  parts.push(row("Website", s.site, colX, right, y, t)); y += 25;
  parts.push(row("GitHub", "github.com/" + s.user, colX, right, y, t)); y += 42;

  parts.push(section("GitHub Stats", colX, right, y, t)); y += 30;

  // two columns, like the reference
  const c2 = colX + half + 16;
  parts.push(row("Repos", String(s.repos), colX, colX + half - 16, y, t, true));
  parts.push(row("Stars", String(s.stars), c2, right, y, t, true));
  y += 25;
  if (s.commits !== null) parts.push(row("Commits", String(s.commits), colX, colX + half - 16, y, t, true));
  parts.push(row("Followers", String(s.followers), c2, right, y, t, true));

  const artBottom = 62 + ART.length * ART_LH;
  const H = Math.round(Math.max(artBottom, y) + PAD);

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">
<style>
  .hd{font:700 ${FS + 3}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.head}}
  .sec{font:700 ${FS + 1}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.key}}
  .k{font:400 ${FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.key}}
  .v{font:400 ${FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.ink}}
  .n{font:700 ${FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.num}}
  .bul{font:400 ${FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.key}}
  .art{font:400 ${ART_FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.art}}
</style>
<rect width="${W}" height="${H}" fill="${t.bg}"/>
<line x1="12" y1="0" x2="12" y2="${H}" stroke="${t.rule}" stroke-width="1.5"/>
${artPanel}
<text class="art" xml:space="preserve" y="62">${art}</text>
${parts.join("\n")}
</svg>`;
}

function fallback(t: typeof THEMES.dark) {
  return `<svg width="${W}" height="90" viewBox="0 0 ${W} 90" xmlns="http://www.w3.org/2000/svg" role="img">
<rect width="${W}" height="90" fill="${t.bg}"/>
<line x1="12" y1="0" x2="12" y2="90" stroke="${t.rule}" stroke-width="1.5"/>
<text x="30" y="52" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="14" fill="${t.art}">github stats unavailable right now</text>
</svg>`;
}

export async function GET(req: Request) {
  const theme = new URL(req.url).searchParams.get("theme") === "light" ? "light" : "dark";
  const t = THEMES[theme];
  let out: string;
  try {
    const s = await getStats();
    out = s ? svg(s, t) : fallback(t);
  } catch {
    out = fallback(t);
  }
  return new Response(out, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
