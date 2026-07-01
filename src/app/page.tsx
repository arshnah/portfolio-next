import Link from "next/link";
import Activity from "@/components/Activity";
import Guestbook from "@/components/Guestbook";
import Webring from "@/components/Webring";
import { projects, services, stack, posts, testimonials } from "@/lib/data";

const dateFmt = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function Home() {
  return (
    <>
      <h1>Arshdeep Singh</h1>
      <p>Developer in India. Currently open for work.</p>
      <Activity />

      <p>
        I build websites, apps, and the systems that run them. I take a project from an
        empty folder to something live on the internet: the design, the code, the app, the
        server it runs on. Then I keep it alive. No agency, no team, just me. Most of what
        I&apos;ve built is in production right now, used by real people.
      </p>

      <p>
        Heads up: I suck at frontend. This page is the evidence, and I&apos;ve made my peace
        with it. I make things work. Making them pretty is somebody else&apos;s job.
      </p>

      <p>[ <a href="#work">Work</a> | <a href="#writing">Blog</a> | <a href="#guestbook">Guestbook</a> | <a href="#contact">Contact</a> ]</p>

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

      <Webring />

      <hr />

      <p><small>&copy; 2026 Arshdeep Singh. Built it myself.</small></p>
    </>
  );
}
