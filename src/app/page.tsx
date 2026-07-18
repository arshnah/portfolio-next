import Link from "next/link";
import Activity from "@/components/Activity";
import GithubGraph from "@/components/GithubGraph";
import Guestbook from "@/components/Guestbook";
import Webring from "@/components/Webring";
import { projects, services, stack, posts, testimonials } from "@/lib/data";
import DevringLoader from "@/components/DevringLoader";

const dateFmt = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function Home() {
  return (
    <>
      <nav className="topnav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "6px 0 14px" }}>
        <a href="#top" style={{ fontFamily: 'var(--font-mono),"Courier New",monospace', fontWeight: 700 }}>
          <span style={{ color: "var(--muted)" }}>~/</span>arsh<span style={{ color: "var(--link)" }}>nah</span>
        </a>
        <span style={{ display: "flex", gap: 16, fontSize: 14, flexWrap: "wrap" }}>
          <a href="#work">Work</a>
          <a href="#writing">Blog</a>
          <a href="/resume">Résumé</a>
          <a href="#contact">Contact</a>
        </span>
      </nav>

      <div style={{ textAlign: "center", margin: "0 0 6px" }}>
        <Webring />
      </div>

      <hr />

      <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "8px 0" }}>
        <img src="/arsh.svg" width={76} height={76} alt="arsh" style={{ borderRadius: 12, flex: "none" }} />
        <div>
          <h1 style={{ margin: 0 }}>Arshdeep Singh</h1>
          <p style={{ margin: "2px 0 0" }}>Developer in India. Currently open for work.</p>
        </div>
      </div>
      <Activity />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px", margin: "12px 0 2px", fontSize: 14, color: "var(--muted)", fontFamily: 'var(--font-mono),"Courier New",monospace' }}>
        <span><b style={{ color: "var(--ink)" }}>6+</b> projects shipped</span>
        <span><b style={{ color: "var(--ink)" }}>live</b> in production</span>
        <span><b style={{ color: "var(--ink)" }}>solo</b> · design to deploy</span>
      </div>

      <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: "13px 16px", margin: "14px 0 6px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700 }}>Open for work.</div>
          <div style={{ color: "var(--muted)", fontSize: 14 }}>
            Freelance, contract, or full-time. Usually replies within a day (see my <Link href="/pings" style={{ textDecoration: "underline" }}>ping policy</Link>).
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="mailto:arshjbdarsh@gmail.com?subject=Let%27s%20build%20something" style={{ background: "var(--link)", color: "var(--bg)", padding: "8px 15px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" }}>Start a project →</a>
          <a href="/resume" style={{ border: "1px solid var(--line)", padding: "8px 15px", borderRadius: 8, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" }}>Résumé</a>
        </div>
      </div>

      <p>
        I build websites, apps, and the systems that run them. I take a project from an
        empty folder to something live on the internet: the design, the code, the app, the
        server it runs on. Then I keep it alive. No agency, no team, just me. Most of what
        I&apos;ve built is in production right now, used by real people.
      </p>

      <p>
        Heads up: I suck at frontend. This page is the evidence, and I&apos;ve made my peace
        with it. I make things work. Making them pretty is{" "}
        <a href="https://yashiscool.vercel.app/home" target="_blank" rel="noopener noreferrer">Yashvardhan&apos;s job</a>.
      </p>

      <GithubGraph />

      <hr />

      <h2 id="work">Work</h2>
      <div>
        {projects.slice(0, 3).map((p) => (
          <div key={p.name} style={{ borderLeft: "2px solid var(--link)", paddingLeft: 14, margin: "0 0 16px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</a>
              <span style={{ color: "var(--faint)", fontFamily: 'var(--font-mono),"Courier New",monospace', fontSize: 13 }}>{p.year} · live ↗</span>
            </div>
            <p style={{ margin: "3px 0 0" }}>{p.desc}</p>
          </div>
        ))}
      </div>
      <p style={{ color: "var(--muted)", fontSize: 14, margin: "12px 0 4px" }}>Also:</p>
      <ul>
        {projects.slice(3).map((p) => (
          <li key={p.name}>
            <a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a> ({p.year}) &middot; {p.desc}
          </li>
        ))}
      </ul>

      <hr />

      <h2 id="stack">Stack</h2>
      <p>{stack.join(", ")}.</p>

      <hr />

      <h2 id="services">What I can build for you</h2>
      <ul>
        {services.map((s) => (
          <li key={s.n}>
            <b>{s.title}.</b> {s.desc}
          </li>
        ))}
      </ul>
      <p>Not sure what you need? Just tell me the problem. I&apos;ll figure out the tech.</p>

      <hr />

      <h2 id="writing">Blog</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link> &middot; {dateFmt(p.date)}
          </li>
        ))}
      </ul>
      <p><Link href="/blog">All posts &raquo;</Link></p>

      <hr />

      <h2 id="words">Kind words</h2>
      {testimonials.map((t) => (
        <blockquote key={t.name}>
          &ldquo;{t.quote}&rdquo;
          <br />
          &middot; {t.name}, {t.role}
        </blockquote>
      ))}

      <hr />

      <Guestbook />

      <hr />

      <h2 id="contact">Contact</h2>
      <p>
        Email: <a href="mailto:arshjbdarsh@gmail.com">arshjbdarsh@gmail.com</a>
        <br />
        GitHub: <a href="https://github.com/arshnah" target="_blank" rel="noopener noreferrer">github.com/arshnah</a>
        <br />
        Discord: <a href="https://discord.com/users/1352866897900732446" target="_blank" rel="noopener noreferrer">@arshnah</a>
      </p>

      <hr />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", lineHeight: 0, margin: "1em 0" }}>
        <a href="https://larpring.github.io" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", lineHeight: 0 }} aria-label="i larp therefore i am">
          <svg width="88" height="31" viewBox="0 0 88 31" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="0.5" y="0.5" width="87" height="30" fill="#0b0d10" stroke="#232830" />
            <text x="44" y="12.5" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9" fontWeight={700} fill="#e8ebf0">i larp</text>
            <text x="44" y="23" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="7.5" fill="#8b93a1">therefore i am</text>
          </svg>
        </a>
        <img src="/badges/repair.jpg" width={88} height={31} alt="I support right to repair" />
        <img src="/badges/speech.gif" width={88} height={31} alt="Free speech now" />
        <img src="/badges/noweb32.gif" width={88} height={31} alt="No web3" />
        <Link href="/pings" style={{ display: "inline-block", lineHeight: 0 }} aria-label="My contact preferences">
          <svg width="88" height="31" viewBox="0 0 88 31" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="0.5" y="0.5" width="87" height="30" fill="#0b0d10" stroke="#54c8a2" />
            <text x="44" y="12.5" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9" fontWeight={700} fill="#54c8a2">no pings</text>
            <text x="44" y="23" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="7.5" fill="#8b93a1">anytime</text>
          </svg>
        </Link>
      </div>
      <DevringLoader />
      <p><small>&copy; 2026 Arshdeep Singh. The badges above were made by <a href="https://furina.is-a.dev" target="_blank" rel="noopener noreferrer">furina</a>.</small></p>
    </>
  );
}
