/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  // The activity bar and contribution graph read the shared status api, but we
  // proxy it same-origin so the browser never has to resolve a second domain
  // (a fresh subdomain can lag in some resolvers). Logic still lives only in
  // api.arshnah.in; these are pure pass-throughs. /api/guestbook stays local.
  async rewrites() {
    const api = 'https://api.arshnah.in/api';
    return [
      { source: '/api/discord-status', destination: `${api}/discord-status` },
      { source: '/api/now-playing', destination: `${api}/now-playing` },
      { source: '/api/last-commit', destination: `${api}/last-commit` },
      { source: '/api/contributions', destination: `${api}/contributions` },
    ];
  },
};
export default nextConfig;
