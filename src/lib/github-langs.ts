// Real per-language byte totals, summed from GitHub's own /languages
// breakdown per repo (not repo-count, which flattens a big repo's real code
// mix to the same weight as a five-file scratch repo).
//
// Uses /user/repos (authenticated) rather than /users/{user}/repos so
// private repos are included too — the public endpoint never returns them no
// matter what token is attached. Needs GITHUB_TOKEN to carry `repo` scope,
// not just public read access, or private repos silently drop out again.
//
// Forks are included only if actually contributed to. Two things ruled out
// simpler checks here: GitHub's own .language field is frequently null on
// forks, so that's not a shortcut either way; and pushed_at vs created_at
// looked promising but the real work can land on a branch other than
// default (fork, branch, push — default stays an untouched mirror), so
// commits?author=<user> against the default branch alone reports zero even
// when the fork has real commits sitting on another branch. What actually
// holds up: check every branch's tip commit for the user's authorship, since
// that's exactly where genuine work would surface.

export type LangShare = [name: string, share: number];

async function hasUserCommit(fullName: string, username: string, get: (u: string) => Promise<any>): Promise<boolean> {
  const branches = await get(`https://api.github.com/repos/${fullName}/branches?per_page=30`);
  if (!Array.isArray(branches)) return false;
  const tips = await Promise.all(
    branches.map((b: any) => get(`https://api.github.com/repos/${fullName}/commits/${b.commit.sha}`)),
  );
  return tips.some((c) => c?.author?.login === username);
}

export async function fetchLanguageShares(user: string, token?: string): Promise<LangShare[]> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": user + "-langs" };
  if (token) headers.Authorization = "Bearer " + token;
  const get = (u: string) => fetch(u, { headers, cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).catch(() => null);

  // Deliberately the broadest affiliation: owner (personal repos),
  // organization_member (khalsajijbd, a second account for the same person
  // that this one has access on), and collaborator (real work pushed to
  // other people's repos, e.g. VasuCoded's). None of these three require the
  // fork check below — they're all the result of a deliberate invite/grant,
  // unlike forking, which takes one click on any public repo.
  const repos = await get(`https://api.github.com/user/repos?affiliation=owner,collaborator,organization_member&per_page=100&sort=pushed`);
  const list: any[] = Array.isArray(repos) ? repos : [];

  // Only forks need the contribution check. A fork needs nothing more than a
  // click on someone else's public repo, so most of them were never actually
  // worked on. Collaborator/org-member access is different — GitHub only
  // grants that through a deliberate invite, and checking commit authorship
  // there would actually break things: khalsajijbd, for one, is a second
  // account for the same person, and its own commits are authored as
  // "Thakur", never as "arshnah", so a commit-authorship check would wrongly
  // exclude every repo there no matter how real the work is.
  const flags = await Promise.all(
    list.map((r) => (r.fork ? hasUserCommit(r.full_name, user, get) : Promise.resolve(true))),
  );
  const included = list.filter((_, i) => flags[i]);

  const byteCounts = await Promise.all(
    included.map((r) => get(`https://api.github.com/repos/${r.full_name}/languages`)),
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
