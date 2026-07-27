// ART is a still you picked, converted to ascii offline: crop x .455-.865,
// y .015-.98, 54 cols, ramp "  .:?jxO8@". Swapping the picture means
// regenerating this block.
export const dynamic = "force-dynamic";

const USER = process.env.NEXT_PUBLIC_GITHUB_USER || "arshnah";
const TOKEN = process.env.GITHUB_TOKEN;

const THEMES = {
  dark: { bg: "#0d1117", stroke: "#21262d", rule: "#30363d", head: "#58a6ff", key: "#d29922", num: "#58a6ff", ink: "#c9d1d9", art: "#6e7681", dot: "#30363d" },
  light: { bg: "#ffffff", stroke: "#d0d7de", rule: "#d8dee4", head: "#0969da", key: "#9a6700", num: "#0969da", ink: "#1f2328", art: "#8c959f", dot: "#d8dee4" },
};

const ART = [
  "            ..............................",
  "          :????????::?:::???:::::::???????:.",
  "    ....:jxxxOxxxxjjjj???xxjj?:???j?xxxxxxjj?........",
  " ..::::?xOOO888OOxxjOjjjj8OOO?j?x?xxx8O888OOO?::::::::",
  "::::???x88O@@@@8xjxxxjxxj888OjxjjxjxxxO8@@8O8O????????",
  "::????j8888@@@8xxjjxjOOjxO88xjxOjx8xjjxO@8@888x???????",
  "jjjxxxO88@@@@@xjOjOjj8OxOxxxjjO@jx@8xjjj88@@888OOxxxxx",
  "jjxxxxO8@8@@88jO@j@xO8xx@xjxjj8Oxx@@8jjjO8@@O@@xxxxxxx",
  "      x@8O@@OOx8x?j:xOOj@OjxjxOOxjxjxjOjx8@@O@@?",
  "      x@OO@@xxjjOOx??x8O@xxjj@@xxx??x?xxx8@@x8@?",
  "      x@xx@@xjOx@OOxx@@@@x@8j8@@8xxx88jjx8@@xO@j",
  "      j8xj@8xjO@@@88@@@@@@@@@@@@@888@@@xj8@@jx@?",
  "::????x8xj88xjj@@@@@@@@@@@8@@@@@@@@@@@@j?O@8jx8j??::::",
  "jjjjxxxOxj88jjx8@@@@@@@@@@@@@@@@@@@@@@8xjO@OjxOjjjjjjj",
  "jjjxxxjxxjOOjjxO@@@@@@@@@@@@@@@@@@@@@@xxjO@xjxO?jjjjjj",
  "j??????xjjxOx?jj@@@@@@@@xjjjjx@@@@@@@OjjjO8xjxO?jjjjjj",
  "..    :jxjxxx?  .x@@@@@@888888@@@@@8?   jOxxjxxx?jjjjj",
  "::?????jxjxxxj? .  j8@@@@@@8@@8@8x:.:???jxxxjxjxjjjjjj",
  "jjjxxjjxOOjxxxO@@@8@@@8@888@8@@@@@@@@@@xxxxx@8Ojjxxxxx",
  ":::::::@@@xjxxx@@@@@@@@@@@@@@@@@@@@@@@@jxxjO@@@O::::::",
  "      :@@@Ojxxx8@@@@@@@@@@@@@@@@@@@@@@Oxxjj@@@@O.",
  "  .:jO88O88j8xxx@@@@@@@@@@@@@@@@@@@@@@xxjjO@@88@@O?:",
  ":x@@@@@@@88xxxjxO@@@@@@@@@@@@@@@@@@@@OxjxxO88@@@@@@O",
  ".@@@@@@@@@@@O@8OjxxxxOOOO8O88OOO8OOOxxxOx8@@@@@@@@@8:",
  "?x8@@@@@@@@@8@@@8x8@8888OOO888@8O8@OxO@8@@@@@@@@@@8j",
  " ?jx8@@@@@@@@@@@@@8@@@@@@@@@@@@@@8OO@@@@@@@@@@@8x?::",
  "...??jxO88@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8O?:.::::?",
  "......::?jxOO8@@@@@@@@@@@@@@@@@@@@@@@@888xj:...::::::?",
  "............::xxxxOOO8888888888888OOxj?:..........::::"
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
  const counts: Record<string, number> = {};
  for (const r of list) if (r.language && !r.fork) counts[r.language] = (counts[r.language] || 0) + 1;
  const langs = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([l]) => l);

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
    langs: langs.join(", "),
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

  let y = 62;
  const parts: string[] = [];

  parts.push(`<text x="${colX}" y="${y}" class="hd">${xml(s.user)}@github</text>`);
  parts.push(`<line x1="${colX + (s.user.length + 7) * CW + 14}" y1="${y - 5}" x2="${right}" y2="${y - 5}" stroke="${t.rule}"/>`);
  y += 34;

  parts.push(row("Uptime", s.uptime, colX, right, y, t)); y += 25;
  parts.push(row("Location", s.location, colX, right, y, t)); y += 25;
  if (s.company) { parts.push(row("Company", clip(s.company, 28), colX, right, y, t)); y += 25; }
  parts.push(row("Languages", clip(s.langs, 34), colX, right, y, t)); y += 42;

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
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="${t.bg}" stroke="${t.stroke}"/>
<text class="art" xml:space="preserve" y="62">${art}</text>
${parts.join("\n")}
</svg>`;
}

function fallback(t: typeof THEMES.dark) {
  return `<svg width="${W}" height="90" viewBox="0 0 ${W} 90" xmlns="http://www.w3.org/2000/svg" role="img">
<rect x="0.5" y="0.5" width="${W - 1}" height="89" rx="14" fill="${t.bg}" stroke="${t.stroke}"/>
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
