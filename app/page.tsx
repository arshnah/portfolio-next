import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Guestbook from "@/components/Guestbook";
import Contact from "@/components/Contact";
import Fx from "@/components/Fx";
import RepoSidebar from "@/components/RepoSidebar";

const builds = [
  { href: "https://nexlease.in", yr: "2024-26", title: "Nexlease",
    desc: "A rental marketplace I built for a client: website, Android app, an ops dashboard for their team, plus Nexscore, a custom locality-scoring engine. Full stack, start to finish.",
    tags: ["React", "Node", "MySQL", "Android"] },
  { href: "https://justcalltech.in", yr: "2023", title: "JustCallTech",
    desc: "An IT services brand. I built their Kotlin Android app (live on the Play Store) and their website. Bookings for laptops, WiFi, CCTV, AMC.",
    tags: ["Kotlin", "Firebase", "MVVM"] },
  { href: "https://chc-site.vercel.app", yr: "2025", title: "Content Helper Community",
    desc: "Site for a creator community. It pulls every member's live YouTube subscriber count through a serverless function I wrote for them.",
    tags: ["Vercel", "YouTube API", "SVG"] },
  { href: "https://whatnowindia.vercel.app", yr: "2025", title: "WhatNow",
    desc: "Built the platform for a startup helping Indian students figure out what comes next right after their board exams.",
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
          <div className="ch-head rv"><span className="ch-no">01</span><h2>What I&apos;ve built</h2><span className="line" /></div>
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
          <div className="ch-head rv"><span className="ch-no">02</span><h2>The stack</h2><span className="line" /></div>
          <p className="rv" style={{ color: "var(--muted)", maxWidth: "54ch", marginBottom: "30px" }}>
            I don&apos;t stick to one fixed stack, I use what the job needs. Everything here I&apos;ve actually shipped with, not just tried once over a weekend.
          </p>
          <div className="stack rv">{stack.map((s) => <span key={s}>{s}</span>)}</div>
        </div>
      </section>

      <Guestbook />
      <Contact />

      <footer>
        <div className="row">
          <span>© 2026 Arshdeep Singh</span>
          <span>Built with Next.js · pure-canvas globe</span>
        </div>
      </footer>

      <Fx />
    </>
  );
}
