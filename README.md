# Arshdeep Singh — Portfolio (Next.js)

Next.js 14 (App Router) + TypeScript. Pure-canvas ASCII globe, 5 colour themes
with a live switcher, guestbook (Supabase realtime, falls back to a local demo),
Discord profile modal, and a Konami easter egg.

## Run locally

```bash
# yahan run kar: project root (D:\projects\portfolio-next)
npm install
npm run dev          # http://localhost:3000
```

## Guestbook (optional — bina iske bhi chalega, demo mode me)

1. `.env.local.example` ko `.env.local` bana le, keys daal:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
2. Supabase SQL editor me table bana:
   ```sql
   create table guestbook (
     id bigint generated always as identity primary key,
     name text not null,
     message text not null,
     created_at timestamptz default now()
   );
   alter table guestbook enable row level security;
   create policy "read"   on guestbook for select using (true);
   create policy "insert" on guestbook for insert with check (true);
   ```
3. Database → Replication me `guestbook` ka Realtime ON kar.

## Colours

- Themes `app/globals.css` me `[data-theme="..."]` blocks hain.
- Switcher list `lib/themes.ts` me hai (id + swatch). Naya theme add karna ho
  to dono jagah ek entry daal de. Globe automatically nayi `--accent`/`--pop` read kar leta hai.
- Default theme `lib/themes.ts` ke `DEFAULT_THEME` se set hota hai.

## Deploy (Vercel)

```bash
# project root me
vercel            # ya GitHub pe push karke Vercel import
```
Env vars (Supabase) Vercel dashboard → Settings → Environment Variables me daal.

## Edit content

- Projects + stack: `app/page.tsx` (arrays top pe).
- Hero copy: `components/Hero.tsx`.
- Discord card: `components/Contact.tsx`.
