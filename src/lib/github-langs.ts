// Each owned, non-fork repo counts as one vote for its GitHub-detected
// primary language — share = (repos in that language) / (total repos), not
// bytes of code. A repo is the unit here, not its file sizes.

export type LangShare = [name: string, share: number];

export async function fetchLanguageShares(user: string, token?: string): Promise<LangShare[]> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": user + "-langs" };
  if (token) headers.Authorization = "Bearer " + token;
  const get = (u: string) => fetch(u, { headers, cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).catch(() => null);

  const repos = await get(`https://api.github.com/users/${user}/repos?per_page=100&type=owner&sort=pushed`);
  const list: any[] = Array.isArray(repos) ? repos : [];
  const owned = list.filter((r) => !r.fork && r.language);

  const counts: Record<string, number> = {};
  for (const r of owned) counts[r.language] = (counts[r.language] || 0) + 1;

  const total = owned.length || 1;
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, n]) => [name, n / total] as LangShare);
}
