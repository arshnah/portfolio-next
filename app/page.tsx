import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Guestbook from "@/components/Guestbook";
import Contact from "@/components/Contact";
import Fx from "@/components/Fx";
import RepoSidebar from "@/components/RepoSidebar";

const builds = [
  { href: "https://nexlease.in", yr: "2024–26", title: "Nexlease",
    desc: "A rental marketplace, built end to end by me — React site, Kotlin app on the Play Store, an ops dashboard for the team, and Nexscore, a locality-scoring engine I wrote from scratch. Runs on a VPS I manage, break, and fix myself.",
    tags: ["React", "Node", "MySQL", "Android"] },
  { href: "https://justcalltech.in", yr: "2023", title: "JustCallTech",
    desc: "An IT-services brand. I built the Kotlin Android app (live on the Play Store) and the website — bookings for laptop repair, wifi, CCTV, AMC. Got the site to 97/100 SEO and code-split the bundle down to a third of its size.",
    tags: ["Kotlin", "Firebase", "MVVM"] },
  { href: "https://chc-site.vercel.app", yr: "2025", title: "Content Helper Community",
    desc: "A creator community's site. The fun part: it pulls every member's live YouTube subscriber count through a serverless function I wrote — 17 channels, refreshed hourly, behind a gold-on-black look.",
    tags: ["Vercel", "YouTube API", "SVG"] },
  { href: "https://whatnowindia.vercel.app", yr: "2025", title: "WhatNow",
    desc: "A platform for a startup helping Indian students figure out what to do right after their board exams. I built the site and led the redesign.",
    tags: ["Next.js", "Vercel"] },
];

const stack = ["TypeScript", "React", "Next.js", "Node.js", "Kotlin / Android", "Python", "MySQL", "Firebase", "Supabase", "Three.js", "Tailwind", "PM2 / VPS", "Vercel", "Figma"];

export default function Home() {
  return (
    <>
      <Nav />
      <RepoSidebar />
      <Hero />

      <section className="chapter" id="builds">
        <div className="shell">
          <div className="ch-head rv"><span className="ch-no">01</span><h2>Work that&apos;s live</h2><span className="line" /></div>
          <p className="rv aside">Every link below goes to the real product. No case-study fluff, no &ldquo;coming soon.&rdquo;</p>
          <div className="builds">
            {builds.map((b) => (
              <a className="build rv" key={b.title} href={b.href} target="_blank" rel="noopener noreferrer">
                <span className="yr">{b.yr}</span>
                <div className="info"><h3>{b.title}</h3><p>{b.desc}</p></div>
                <div className="tags">{b.tags.map((t) => <span key={t}>{t}</span>)}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter" id="stack">
        <div className="shell">
          <div className="ch-head rv"><span className="ch-no">02</span><h2>Tools I actually use</h2><span className="line" /></div>
          <p className="rv aside">
            No fixed stack. I pick what the job needs and what I can ship fast with. Everything here I&apos;ve shipped to
            production, not tried once over a weekend.
          </p>
          <div className="stack rv">{stack.map((s) => <span key={s}>{s}</span>)}</div>
        </div>
      </section>

      <Guestbook />
      <Contact />

      <footer>
        <div className="row">
          <span>© 2026 Arshdeep Singh — built this one myself too</span>
          <span>Next.js · hand-coded canvas globe</span>
        </div>
      </footer>

      <Fx />
    </>
  );
}
