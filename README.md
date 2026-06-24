# arshnah-site

Clean minimal dark portfolio + hidden Arch terminal (`>_`).
Next.js 14 · TypeScript · Tailwind · live activity (Spotify + Discord + GitHub).

## Run
```bash
npm install
cp .env.example .env.local   # fill in keys (all optional except discord id)
npm run dev
```

## Features
- Clean minimal dark site (hero, work, services, contact)
- `>_` terminal easter egg — real shell (help, neofetch, ls, cd, cat, projects, easter eggs)
- Live activity row: Discord status, Spotify now-playing, IST time, latest commit
- Fully responsive, no vibecoded tropes

## Env keys (.env.local) — all OPTIONAL, site works without them
| key | what | how |
|---|---|---|
| NEXT_PUBLIC_DISCORD_ID | discord status | join discord.gg/lanyard with that account |
| SPOTIFY_CLIENT_ID/SECRET/REFRESH_TOKEN | now-playing | developer.spotify.com → create app |
| LASTFM_API_KEY/USERNAME | music fallback | last.fm/api |
| NEXT_PUBLIC_GITHUB_USER | latest commit | your github username |

Without keys: discord shows offline, music shows "not playing" — gracefully.

## Deploy (Vercel)
1. push to GitHub
2. import on vercel.com
3. add the env vars in Settings → Environment Variables
4. deploy

## Spotify setup (for now-playing)
1. developer.spotify.com/dashboard → Create app → get Client ID + Secret
2. Add redirect URI, authorize with scope `user-read-currently-playing`
3. Exchange code → refresh_token (one-time). Plenty of guides online.
