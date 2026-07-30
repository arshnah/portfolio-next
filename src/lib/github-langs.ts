// Real per-language byte totals across a user's owned, non-fork repos, summed
// from GitHub's own /languages breakdown per repo — not a count of how many
// repos pick each language as their single "primary" one, which is both less
// accurate and produces name lists too long to fit anywhere without clipping.

export type LangShare = [name: string, share: number];

export async function fetchLanguageShares(user: string, token?: string): Promise<LangShare[]> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": user + "-langs" };
  if (token) headers.Authorization = "Bearer " + token;
  const get = (u: string) => fetch(u, { headers, cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).catch(() => null);

  const repos = await get(`https://api.github.com/users/${user}/repos?per_page=100&type=owner&sort=pushed`);
  const list: any[] = Array.isArray(repos) ? repos : [];
  const owned = list.filter((r) => !r.fork);

  const byteCounts = await Promise.all(
    owned.map((r) => get(`https://api.github.com/repos/${user}/${r.name}/languages`)),
  );

  const totals: Record<string, number> = {};
  byteCounts.forEach((langBytes) => {
    if (!langBytes) return;
    for (const [lang, n] of Object.entries(langBytes as Record<string, number>)) {
      totals[lang] = (totals[lang] || 0) + n;
    }
  });

  const totalBytes = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .map(([name, n]) => [name, n / totalBytes] as LangShare);
}
