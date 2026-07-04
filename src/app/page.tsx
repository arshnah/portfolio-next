import Link from "next/link";
import Activity from "@/components/Activity";
import GithubGraph from "@/components/GithubGraph";
import Guestbook from "@/components/Guestbook";
import Webring from "@/components/Webring";
import { projects, services, stack, posts, testimonials } from "@/lib/data";

const dateFmt = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function Home() {
  return (
    <>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "6px 0 14px" }}>
        <a href="#top" style={{ fontFamily: '"JetBrains Mono","Courier New",monospace', fontWeight: 700 }}>
          <span style={{ color: "var(--muted)" }}>~/</span>arsh<span style={{ color: "var(--link)" }}>nah</span>
        </a>
        <span style={{ display: "flex", gap: 16, fontSize: 14 }}>
          <a href="#work">Work</a>
          <a href="#writing">Blog</a>
          <a href="#playground">Playground</a>
          <a href="#guestbook">Guestbook</a>
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
      <ul>
        {projects.map((p) => (
          <li key={p.name}>
            <a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a>{" "}
            ({p.year}) &middot; {p.desc}
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

      <h2 id="playground">Playground</h2>
      <p>Small dumb sites I made for fun, mostly hiding on subdomains.</p>
      <ul>
        <li><a href="https://larp.arshnah.in" target="_blank" rel="noopener noreferrer">larp.arshnah.in</a> &middot; a fake hacker terminal you boot into. type &ldquo;help&rdquo;, nothing real happens</li>
        <li><a href="https://now.arshnah.in" target="_blank" rel="noopener noreferrer">now.arshnah.in</a> &middot; what I&apos;m doing right now, pulled live</li>
        <li><a href="https://card.arshnah.in" target="_blank" rel="noopener noreferrer">card.arshnah.in</a> &middot; mint yourself a Certified LARPer ID card</li>
        <li><a href="https://shame.arshnah.in" target="_blank" rel="noopener noreferrer">shame.arshnah.in</a> &middot; a museum of every hack attempt on my guestbook that did nothing</li>
        <li><a href="https://status.arshnah.in" target="_blank" rel="noopener noreferrer">status.arshnah.in</a> &middot; is everything still up</li>
        <li><a href="https://slop.arshnah.in" target="_blank" rel="noopener noreferrer">slop.arshnah.in</a> &middot; paste text, see how much of it reads like a machine wrote it</li>
        <li><a href="https://buttons.arshnah.in" target="_blank" rel="noopener noreferrer">buttons.arshnah.in</a> &middot; make your own 88&times;31 button and download it, old-web style</li>
        <li><a href="https://uses.arshnah.in" target="_blank" rel="noopener noreferrer">uses.arshnah.in</a> &middot; the tools and stack I actually build with</li>
      </ul>

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

      <p>
        <a href="https://larpring.github.io" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", lineHeight: 0 }} aria-label="i larp therefore i am">
          <svg width="88" height="31" viewBox="0 0 88 31" xmlns="http://www.w3.org/2000/svg" role="img">
            <rect x="0.5" y="0.5" width="87" height="30" fill="#0b0d10" stroke="#232830" />
            <text x="44" y="12.5" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight={700} fill="#e8ebf0">i larp</text>
            <text x="44" y="23" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#8b93a1">therefore i am</text>
          </svg>
        </a>
      </p>

      <p><small>&copy; 2026 Arshdeep Singh. Built it myself.</small></p>
    </>
  );
}
