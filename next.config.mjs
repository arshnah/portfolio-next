/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  // The activity bar and contribution graph read the shared status api, but we
  // proxy it same-origin so the browser never has to resolve a second domain
  // (a fresh subdomain can lag in some resolvers). Logic still lives only in
  // api.arshnah.in; these are pure pass-throughs. /api/guestbook stays local.
  // Security headers Lighthouse Best-Practices checks for. CSP + Trusted Types
  // are intentionally omitted — the site uses inline styles/JSON-LD/theme script,
  // so a strict policy would break it. These are the safe, high-value ones.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
        ],
      },
    ];
  },
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
