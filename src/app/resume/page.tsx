"use client";
import { projects, services, stack } from "@/lib/data";

const groups: [string, string[]][] = [
  ["Languages", ["TypeScript", "JavaScript", "Python", "Kotlin", "SQL"]],
  ["Frontend", ["React", "Next.js", "Three.js", "Tailwind"]],
  ["Backend & data", ["Node.js", "Express", "MySQL", "Supabase", "Firebase", "Web Crypto API"]],
  ["Infra", ["Linux / VPS", "Vercel", "PM2", "Cloudflare"]],
];

export default function Resume() {
  return (
    <div className="resume">
      <style>{`
        .resume{max-width:760px;margin:0 auto;}
        .resume h1{margin:0;font-size:26px;letter-spacing:-.02em;}
        .resume .role{color:var(--muted);margin:2px 0 0;}
        .resume .contact{font-family:"JetBrains Mono","Courier New",monospace;font-size:13px;color:var(--muted);margin:8px 0 0;display:flex;gap:6px 14px;flex-wrap:wrap;}
        .resume h2{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);margin:26px 0 10px;border-bottom:1px solid var(--line);padding-bottom:5px;}
        .resume .row{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline;}
        .resume .row b{font-size:15px;} .resume .yr{font-family:"JetBrains Mono",monospace;font-size:12px;color:var(--faint);}
        .resume .desc{margin:2px 0 12px;color:var(--ink);font-size:14px;}
        .resume .skills{display:flex;flex-direction:column;gap:7px;font-size:14px;}
        .resume .skrow{display:flex;gap:14px;align-items:baseline;}
        .resume .skrow .k{min-width:104px;flex-shrink:0;color:var(--muted);font-family:"JetBrains Mono",monospace;font-size:12.5px;}
        .resume .bar{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:18px;}
        .print{border:1px solid var(--line);background:none;color:var(--ink);border-radius:8px;padding:7px 14px;font:inherit;font-size:14px;cursor:pointer;}
        @media print{
          .noprint{display:none!important;}
          body{background:#fff!important;color:#111!important;}
          .resume, .resume *{color:#111!important;border-color:#ccc!important;}
          .resume a{color:#111!important;text-decoration:none;}
          .resume .role,.resume .contact,.resume .k,.resume .yr,.resume h2{color:#555!important;}
        }
      `}</style>

      <div className="bar noprint">
        <a href="/">&larr; back</a>
        <button className="print" onClick={() => window.print()}>Print / Save as PDF</button>
      </div>

      <h1>Arshdeep Singh</h1>
      <div className="role">Full-stack Developer &middot; India</div>
      <div className="contact">
        <a href="mailto:arshjbdarsh@gmail.com">arshjbdarsh@gmail.com</a>
        <a href="https://arshnah.in">arshnah.in</a>
        <a href="https://github.com/arshnah">github.com/arshnah</a>
      </div>

      <h2>Summary</h2>
      <p style={{ margin: 0, fontSize: 14.5 }}>
        Solo full-stack developer. I take a project from an empty folder to live on the internet &mdash;
        the design, the code, the app, and the server it runs on &mdash; then keep it alive. No agency, no team.
        Most of what I&apos;ve built is in production right now, used by real people. I write my own crypto layers,
        run my own VPS, and ship end to end.
      </p>

      <h2>Skills</h2>
      <div className="skills">
        {groups.map(([k, v]) => (
          <div className="skrow" key={k}><span className="k">{k}</span><span>{v.join(", ")}</span></div>
        ))}
      </div>

      <h2>Selected work</h2>
      {projects.map((p) => (
        <div key={p.name}>
          <div className="row">
            <b><a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a></b>
            <span className="yr">{p.year}</span>
          </div>
          <div className="desc">{p.desc}</div>
        </div>
      ))}

      <h2>What I build</h2>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>
        {services.map((s) => (
          <li key={s.n} style={{ marginBottom: 4 }}><b>{s.title}.</b> {s.desc}</li>
        ))}
      </ul>

      <h2>Availability</h2>
      <p style={{ margin: 0, fontSize: 14 }}>Open for freelance, contract, or full-time work. Usually replies within a day.</p>

      <div style={{ margin: "30px 0", fontFamily: '"JetBrains Mono",monospace', fontSize: 12, color: "var(--faint)" }} className="noprint">
        stack, verbatim: {stack.join(" · ")}
      </div>
    </div>
  );
}
