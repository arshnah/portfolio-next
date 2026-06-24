"use client";
import { useState } from "react";
import Nav from "@/components/Nav";
import Activity from "@/components/Activity";
import Terminal from "@/components/Terminal";
import Guestbook from "@/components/Guestbook";
import Starfield from "@/components/Starfield";
import { projects, services } from "@/lib/data";

export default function Home() {
  const [term, setTerm] = useState(false);
  return (
    <>
      <Nav onTerminal={() => setTerm(true)} />

      {/* hero (full-bleed, falling stars) */}
      <header id="top" className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Starfield />
        <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(120% 110% at 50% 36%, transparent 52%, rgba(0,0,0,0.88))" }} />
        <div className="wrap relative z-10 py-[120px]">
          <div className="text-[13.5px] text-muted mb-6">
            <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#4caf6a] mr-2 align-middle" style={{ boxShadow:"0 0 8px #4caf6a" }} />
            Arshdeep Singh, developer in India. Currently open for work.
          </div>
          <h1 className="text-[clamp(34px,6vw,62px)] font-bold leading-[1.05] tracking-[-0.03em] max-w-[18ch]">
            I build websites, apps, and the <span className="underline decoration-ink decoration-2 underline-offset-[8px]">systems</span> that run them.
          </h1>
          <p className="mt-[26px] max-w-[56ch] text-[18px] text-muted leading-[1.65]">
            Solo developer for hire. I take a project from an empty folder to something live on the internet:
            the design, the code, the app, the server it runs on. Then I keep it alive. No agency, no team, just me.
            Most of what I&apos;ve built is in production right now, used by real people.
          </p>
          <div className="mt-9 flex gap-3.5 flex-wrap">
            <a href="#work" className="text-[14.5px] px-[22px] py-3 rounded-[9px] bg-ink text-bg font-medium transition hover:bg-white">See my work</a>
            <a href="#contact" className="text-[14.5px] px-[22px] py-3 rounded-[9px] border border-white/[0.16] transition hover:border-ink">Get in touch</a>
          </div>
          <Activity />
        </div>
      </header>

      <main className="wrap">
        {/* work */}
        <section className="py-[70px] border-t border-white/[0.08]" id="work">
          <div className="flex items-baseline gap-3.5 mb-[34px]"><h2 className="text-[14px] font-semibold tracking-[0.14em] uppercase text-muted">Work</h2><span className="flex-1 h-px bg-white/[0.08]" /></div>
          <div>
            {projects.map((p, i) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                className={`group grid grid-cols-[74px_1fr_auto] gap-[22px] items-start py-[22px] transition hover:bg-surf hover:px-4 hover:rounded-[10px] ${i ? "border-t border-white/[0.08]" : ""}`}>
                <span className="text-[13px] text-faint pt-[5px] font-mono">{p.year}</span>
                <div>
                  <h3 className="text-[21px] font-semibold tracking-[-0.01em] group-hover:text-accent transition-colors">{p.name}</h3>
                  <p className="mt-1.5 text-muted text-[14.5px] max-w-[60ch] leading-[1.6]">{p.desc}</p>
                </div>
                <span className="self-center text-faint text-[18px] group-hover:text-accent group-hover:translate-x-1 transition">→</span>
              </a>
            ))}
          </div>
        </section>

        {/* services */}
        <section className="py-[70px] border-t border-white/[0.08]" id="services">
          <div className="flex items-baseline gap-3.5 mb-[34px]"><h2 className="text-[14px] font-semibold tracking-[0.14em] uppercase text-muted">What I can build for you</h2><span className="flex-1 h-px bg-white/[0.08]" /></div>
          <div className="grid md:grid-cols-3 gap-[18px]">
            {services.map(s => (
              <div key={s.n} className="p-6 bg-surf border border-white/[0.08] rounded-[14px]">
                <span className="font-mono text-[12px] text-accent mb-3.5 block">{s.n}</span>
                <h4 className="text-[17px] font-semibold mb-2">{s.title}</h4>
                <p className="text-[14px] text-muted leading-[1.6]">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-[22px] text-faint text-[14px]">Not sure what you need? Just tell me the problem. I&apos;ll figure out the tech.</p>
        </section>

        <Guestbook />

        {/* contact */}
        <section className="py-[104px] text-center border-t border-white/[0.08]" id="contact">
          <div className="text-[14px] text-muted tracking-[0.04em] mb-[18px]">Got something to build?</div>
          <div className="text-[clamp(26px,5.5vw,52px)] font-bold tracking-[-0.02em]">
            <a href="mailto:arshjbdarsh@gmail.com" className="border-b-2 border-white/[0.16] hover:text-accent hover:border-accent transition">arshjbdarsh@gmail.com</a>
          </div>
          <div className="mt-[30px] flex gap-[22px] justify-center flex-wrap text-[14px] text-muted">
            <a href="https://github.com/arshnah" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition">GitHub ↗</a>
            <a href="https://discord.com/users/1352866897900732446" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition">Discord ↗</a>
            <button onClick={() => setTerm(true)} className="text-faint hover:text-accent transition">open the terminal &gt;_</button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.08] py-[26px] pb-11">
        <div className="wrap flex justify-between flex-wrap gap-2 text-[13px] text-faint">
          <span>© 2026 Arshdeep Singh. built it myself.</span>
          <button onClick={() => setTerm(true)} className="font-mono hover:text-accent transition">&gt;_ for devs</button>
        </div>
      </footer>

      <Terminal open={term} onClose={() => setTerm(false)} />
    </>
  );
}
