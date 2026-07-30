// Own card for language stats, split out of neofetch. A shared bar with every
// language's name crammed into its own segment breaks the moment a
// near-tied, longer name lands in a narrow slice — this instead gives every
// language its own full-width row (name and percentage never compete with
// segment width) and a thin per-row bar underneath, the same shape
// github-readme-stats' top-langs card and lowlighter/metrics' languages
// plugin both settled on for exactly this reason. Row style matches the rest
// of the profile's cards (neofetch, lastly, now) rather than borrowing their
// look wholesale — bullet, amber label, dotted leader, value on the right.
import { fetchLanguageShares } from "@/lib/github-langs";

export const dynamic = "force-dynamic";

const USER = process.env.NEXT_PUBLIC_GITHUB_USER || "arshnah";
const TOKEN = process.env.GITHUB_TOKEN;

const THEMES = {
  dark: { bg: "#0d1117", rule: "#30363d", head: "#58a6ff", key: "#d29922", ink: "#c9d1d9", mut: "#8b949e", dot: "#30363d" },
  light: { bg: "#ffffff", rule: "#d8dee4", head: "#0969da", key: "#9a6700", ink: "#1f2328", mut: "#57606a", dot: "#d8dee4" },
};
type Theme = typeof THEMES.dark;

const xml = (s: unknown) =>
  String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

const W = 820;
const PAD = 30;
const FS = 14;
const CW = FS * 0.62;
const ROW_H = 26;
const BAR_H = 4;
const LEVEL_OPACITY = [1, 0.8, 0.6, 0.42, 0.28, 0.16];

function leader(x1: number, x2: number, y: number, t: Theme) {
  if (x2 - x1 < 12) return "";
  return `<line x1="${x1.toFixed(1)}" y1="${y - 4}" x2="${x2.toFixed(1)}" y2="${y - 4}" stroke="${t.dot}" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="1 5"/>`;
}

function row(name: string, share: number, i: number, x: number, right: number, y: number, t: Theme) {
  const value = (share * 100).toFixed(1) + "%";
  const lx = x + CW * 1.6;
  const labelEnd = lx + (name.length + 1) * CW + 6;
  const valStart = right - value.length * CW - 6;
  const barW = right - x - CW * 1.6;
  const fillW = Math.max(3, Math.round(share * barW));
  const op = LEVEL_OPACITY[i] ?? LEVEL_OPACITY[LEVEL_OPACITY.length - 1];

  return `<text x="${x}" y="${y}" class="bul">.</text>` +
    `<text x="${lx}" y="${y}" class="k">${xml(name)}:</text>` +
    leader(labelEnd, valStart, y, t) +
    `<text x="${right}" y="${y}" text-anchor="end" class="v">${value}</text>` +
    `<rect x="${lx}" y="${y + 5}" width="${barW}" height="${BAR_H}" rx="${BAR_H / 2}" fill="${t.rule}"/>` +
    `<rect x="${lx}" y="${y + 5}" width="${fillW}" height="${BAR_H}" rx="${BAR_H / 2}" fill="${t.head}" fill-opacity="${op}"/>`;
}

function fallback(t: Theme) {
  return `<svg width="${W}" height="90" viewBox="0 0 ${W} 90" xmlns="http://www.w3.org/2000/svg" role="img">
<rect width="${W}" height="90" fill="${t.bg}"/>
<line x1="12" y1="0" x2="12" y2="90" stroke="${t.rule}" stroke-width="1.5"/>
<text x="30" y="52" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="14" fill="${t.mut}">language stats unavailable right now</text>
</svg>`;
}

function svg(langs: [string, number][], t: Theme) {
  const top = langs.slice(0, 6);
  const x = PAD;
  const right = W - PAD;

  let y = 46;
  const parts: string[] = [];
  parts.push(`<text x="${x}" y="${y}" class="hd">${xml(USER)}@languages</text>`);
  parts.push(`<line x1="${x + (USER.length + 10) * CW + 14}" y1="${y - 5}" x2="${right}" y2="${y - 5}" stroke="${t.rule}"/>`);
  y += 34;

  top.forEach((l, i) => {
    parts.push(row(l[0], l[1], i, x, right, y, t));
    y += ROW_H;
  });

  const H = Math.round(y - ROW_H + BAR_H + 20);

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">
<style>
  .hd{font:700 ${FS + 3}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.head}}
  .k{font:400 ${FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.key}}
  .v{font:400 ${FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.ink}}
  .bul{font:400 ${FS}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:${t.key}}
</style>
<rect width="${W}" height="${H}" fill="${t.bg}"/>
<line x1="12" y1="0" x2="12" y2="${H}" stroke="${t.rule}" stroke-width="1.5"/>
${parts.join("\n")}
</svg>`;
}

export async function GET(req: Request) {
  const theme = new URL(req.url).searchParams.get("theme") === "light" ? "light" : "dark";
  const t = THEMES[theme];
  let out: string;
  try {
    const langs = await fetchLanguageShares(USER, TOKEN);
    out = langs.length ? svg(langs, t) : fallback(t);
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
