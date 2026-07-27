export const dynamic = "force-dynamic";

const USER = process.env.NEXT_PUBLIC_GITHUB_USER || "arshnah";
const TOKEN = process.env.GITHUB_TOKEN;

const THEMES = {
  dark: { bg: "#14171c", stroke: "#232830", line: "#232830", accent: "#8fb6ff", ink: "#e8ebf0", mv: "#c9cfda", faint: "#5a626e", art: "#8fb6ff" },
  light: { bg: "#ffffff", stroke: "#d0d7de", line: "#d8dee4", accent: "#4f7fd1", ink: "#1f2328", mv: "#57606a", faint: "#8c959f", art: "#4f7fd1" },
};

const LOGO = [
  " ###         #### #    ",
  "    # # ##  #     #    ",
  " #### ##     ###  # ## ",
  "#   # #         # ##  #",
  " #### #     ####  #   #",
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
  if (!y) bits.push(d + (d === 1 ? " day" : " days"));
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
  const langs = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([l]) => l);

  // commits need the graphql api, which is token-only. omit the row entirely
  // rather than reporting a zero that isn't true.
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

  return {
    user: user.login as string,
    uptime: age(user.created_at),
    location: (user.location as string) || "India",
    langs: langs.join(", ") || "—",
    repos: user.public_repos as number,
    stars,
    followers: user.followers as number,
    commits,
  };
}

type Stats = NonNullable<Awaited<ReturnType<typeof getStats>>>;

function svg(s: Stats, t: typeof THEMES.dark) {
  const W = 480, P = 22;
  // art measures 139px wide at 11px mono, so the stat column clears it at 178
  const artX = P, statX = 178, valX = statX + 88;

  const rows: [string, string][] = [
    ["uptime", s.uptime],
    ["location", s.location],
    ["langs", clip(s.langs, 26)],
    ["repos", String(s.repos)],
    ["stars", String(s.stars)],
    ["followers", String(s.followers)],
  ];
  if (s.commits !== null) rows.push(["commits", s.commits + " this year"]);

  const head = 46;
  const rowY = (i: number) => head + 30 + i * 21;
  const H = Math.max(rowY(rows.length - 1) + 26, head + 5 * 13 + 40);

  const art = LOGO.map((l, i) => `<tspan x="${artX}" dy="${i === 0 ? 0 : 13}">${xml(l)}</tspan>`).join("");
  const body = rows
    .map(([k, v], i) => `<text x="${statX}" y="${rowY(i)}" class="k">${k}</text><text x="${valX}" y="${rowY(i)}" class="v">${xml(v)}</text>`)
    .join("");

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">
<style>
  .t{font:700 15px ui-monospace,SFMono-Regular,Menlo,monospace;fill:${t.accent}}
  .u{font:400 10.5px ui-monospace,SFMono-Regular,Menlo,monospace;fill:${t.faint}}
  .a{font:700 11px ui-monospace,SFMono-Regular,Menlo,monospace;fill:${t.art}}
  .k{font:600 11.5px ui-monospace,SFMono-Regular,Menlo,monospace;fill:${t.faint};letter-spacing:.06em}
  .v{font:400 12.5px ui-monospace,SFMono-Regular,Menlo,monospace;fill:${t.mv}}
</style>
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="16" fill="${t.bg}" stroke="${t.stroke}"/>
<rect x="1" y="1" width="${W - 2}" height="5" rx="2.5" fill="${t.accent}" opacity="0.9"/>
<text x="${P}" y="34" class="t">${xml(s.user)}@github</text>
<text x="${W - P}" y="34" text-anchor="end" class="u">neofetch</text>
<line x1="${P}" y1="${head}" x2="${W - P}" y2="${head}" stroke="${t.line}"/>
<text class="a" xml:space="preserve" y="${head + 30}">${art}</text>
${body}
</svg>`;
}

function fallback(t: typeof THEMES.dark) {
  return `<svg width="480" height="70" viewBox="0 0 480 70" xmlns="http://www.w3.org/2000/svg" role="img">
<rect x="1" y="1" width="478" height="68" rx="16" fill="${t.bg}" stroke="${t.stroke}"/>
<text x="22" y="41" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="12.5" fill="${t.faint}">github stats unavailable right now</text>
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
