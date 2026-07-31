import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Everything arshnah has built, and the repos he's actually worked in - not just a GitHub tab dump.",
  openGraph: {
    title: "Projects · arshnah",
    description: "Everything arshnah has built, and the repos he's actually worked in - not just a GitHub tab dump.",
    url: "https://arshnah.in/projects",
    type: "website",
  },
  twitter: {
    title: "Projects · arshnah",
    description: "Everything arshnah has built, and the repos he's actually worked in - not just a GitHub tab dump.",
  },
};

type Item = {
  name: string;
  url: string;
  altUrl?: string;
  altLabel?: string;
  desc: ReactNode;
};

const built: Item[] = [
  { name: "arshnah.in", url: "https://arshnah.in", desc: "This site. Next.js, no template, near-monochrome, one accent." },
  {
    name: "After Hours", url: "https://afterhours.arshnah.in", altUrl: "https://github.com/arshnah/After-Hours-Website", altLabel: "website source",
    desc: "A Discord community bot with 98 slash commands - economy, gambling, levelling, moderation, family trees - built with Vasu. Bridges a Minecraft server both ways through a Paper plugin, relaying chat/deaths/advancements and tracking a public playtime leaderboard. Built the bot, the plugin, and the site documenting it.",
  },
  {
    name: "Project Collab Platform", url: "https://github.com/VasuCoded/Project-Collab-Platform",
    desc: "A small-team collaboration app - Vasu holds the infra, Yash designs it, I build features: a real-time whiteboard, task-board drag-and-drop, undo/redo history, and a few rounds of cutting round-trips off page navigation.",
  },
  { name: "CipherDrop", url: "https://drop.arshnah.in", desc: "Zero-knowledge file and text drops. Encrypted in the browser before it uploads, so the server only ever stores ciphertext it can't read. Ships veil, a page that hides encrypted messages inside ordinary images." },
  { name: "Wisp", url: "https://chat.arshnah.in", desc: "End-to-end encrypted messenger. The whole crypto layer is hand-written against the Web Crypto API - real accounts, a key directory, live realtime chat." },
  { name: "LarpRing", url: "https://larpring.github.io", desc: "A webring I started and run - a small ring of personal sites linking to each other the old-web way. Built the site, the theme-aware badges, and an automated health check that pings every member." },
  { name: "Content Helper Community", url: "https://chc-site.vercel.app", desc: "A creator community's site showing every member's live YouTube subscriber count, updated hourly." },
  { name: "microsites", url: "https://github.com/arshnah/microsites", desc: "Small, self-contained sites, one per subdomain of arshnah.in - the odds and ends that don't need their own repo." },
];

const worked: Item[] = [
  {
    name: "Marked Goats", url: "https://github.com/arshnah/marked-goats/tree/stonecutter-remake", altUrl: "https://modrinth.com/mod/marked-goats", altLabel: "Modrinth",
    desc: "An open-source Minecraft mod by Allan Taylor - a different texture per goat variant instead of leaving you to guess which horn it drops. I rewrote the build system onto Stonecutter so one codebase now targets Fabric, Forge, and NeoForge across 32 Minecraft versions instead of a branch per version, tracked down several real Minecraft API changes by reading decompiled source directly, and wired up an in-game WTHIT tooltip.",
  },
  {
    name: "WhatNow", url: "https://whatnowindia.vercel.app", altUrl: "https://github.com/arshnah/WhatNow_Website", altLabel: "source",
    desc: "A platform helping Indian students figure out what to do right after their board exams, built with Vasu. Built the site and led the redesign.",
  },
  { name: "typer", url: "https://github.com/arshnah/typer", desc: "Typing practice in your terminal - like Monkeytype, but CLI. Ships as a pip package." },
  {
    name: "Discord Quest Completer", url: "https://github.com/arshnah/Discord-Quest-Completer",
    desc: "By DyedHue - helped him build it out, even though the commits landed under his name, not mine.",
  },
  {
    name: "lastly", url: "https://lastly.arshnah.in", altUrl: "https://github.com/arshnah/lastly", altLabel: "source",
    desc: "Forked from ni5arga/lastly - Last.fm stats as embeddable SVG cards for a GitHub README. Added the live now-playing card, multi-account merging, two new GitHub-flavoured themes, a background-color override, and an actual homepage that builds the embed for you instead of just redirecting to GitHub.",
  },
  {
    name: "lanyard-profile-readme", url: "https://lanyard.arshnah.in", altUrl: "https://github.com/arshnah/lanyard-profile-readme", altLabel: "source",
    desc: "Forked from cnrad/lanyard-profile-readme - a Discord presence badge for GitHub READMEs. Added multi-account merging (shows whichever linked account isn't offline) and fixed a couple of real bugs in the process.",
  },
];

function Rail({ item }: { item: Item }) {
  return (
    <div style={{ borderLeft: "2px solid var(--link)", paddingLeft: 14, margin: "0 0 16px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
        <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, fontSize: 17 }}>
          {item.name}
        </a>
        {item.altUrl && (
          <a href={item.altUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--faint)", fontFamily: 'var(--font-mono),"Courier New",monospace', fontSize: 13 }}>
            · {item.altLabel} ↗
          </a>
        )}
      </div>
      <p style={{ margin: "3px 0 0" }}>{item.desc}</p>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <nav style={{ padding: "6px 0 14px" }}>
        <a href="/" style={{ fontFamily: 'var(--font-mono),"Courier New",monospace', fontWeight: 700 }}>
          <span style={{ color: "var(--muted)" }}>~/</span>arsh<span style={{ color: "var(--link)" }}>nah</span>
        </a>
      </nav>

      <h1>Projects</h1>
      <p style={{ color: "var(--muted)" }}>
        The home page shows the top three. This is everything - what I built from scratch, and what I&apos;ve
        actually worked in on other people&apos;s repos, not just forked and left alone. Most client work stays
        off this list under NDA.
      </p>

      <hr />

      <h2>Built</h2>
      <div>
        {built.map((item) => (
          <Rail key={item.name} item={item} />
        ))}
      </div>

      <hr />

      <h2>Worked on</h2>
      <div>
        {worked.map((item) => (
          <Rail key={item.name} item={item} />
        ))}
      </div>
    </>
  );
}
