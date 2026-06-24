import { NextResponse } from "next/server";
export const revalidate = 0;
const id = process.env.SPOTIFY_CLIENT_ID, secret = process.env.SPOTIFY_CLIENT_SECRET, refresh = process.env.SPOTIFY_REFRESH_TOKEN;
const IDS = (process.env.NEXT_PUBLIC_DISCORD_IDS || "1352866897900732446,300137175238836225").split(",").map(s => s.trim()).filter(Boolean);

async function spotify() {
  if (!id || !secret || !refresh) return null;
  const basic = Buffer.from(`${id}:${secret}`).toString("base64");
  const tok = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST", headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }), cache: "no-store",
  }).then(r => r.json());
  if (!tok.access_token) return null;
  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers: { Authorization: `Bearer ${tok.access_token}` }, cache: "no-store" });
  if (res.status === 204 || res.status > 400) return null;
  const d = await res.json(); if (!d?.item) return null;
  return { isPlaying: d.is_playing, title: d.item.name, artist: d.item.artists.map((a: any) => a.name).join(", "), url: d.item.external_urls.spotify, albumArt: d.item.album?.images?.[0]?.url || null };
}
async function lastfm() {
  const key = process.env.LASTFM_API_KEY, user = process.env.LASTFM_USERNAME;
  if (!key || !user) return null;
  const r = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${key}&format=json&limit=1`, { cache: "no-store" }).then(r => r.json()).catch(() => null);
  const t = r?.recenttracks?.track?.[0]; if (!t) return null;
  return { isPlaying: t["@attr"]?.nowplaying === "true", title: t.name, artist: t.artist?.["#text"] || "", url: t.url, albumArt: t.image?.[t.image.length - 1]?.["#text"] || null };
}
async function lanyardSpotify() {
  const res = await Promise.all(IDS.map(i => fetch(`https://api.lanyard.rest/v1/users/${i}`, { cache: "no-store" }).then(r => r.json()).catch(() => null)));
  const sp = res.map(r => r?.data?.spotify).find(Boolean);
  if (!sp) return null;
  return { isPlaying: true, title: sp.song, artist: sp.artist, url: `https://open.spotify.com/track/${sp.track_id}`, albumArt: sp.album_art_url || null };
}
export async function GET() {
  try {
    const sp = await spotify(); if (sp) return NextResponse.json(sp);
    const lf = await lastfm(); if (lf) return NextResponse.json(lf);
    const ly = await lanyardSpotify(); if (ly) return NextResponse.json(ly);
  } catch {}
  return NextResponse.json({ isPlaying: false });
}
