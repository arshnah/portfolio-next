import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "grain, the design language behind arshnah.in",
  description:
    "The design system every arshnah surface is held to. Spine vs skin, one accent per project, the tells never to ship, and the real components with their code.",
};

// Each project's own tokens. Rendered in its own skin rather than translated
// into the portfolio's, because a material shown in someone else's colours is
// not the material, and spine vs skin is the entire idea being demonstrated.
const materials = [
  {
    name: "cipherdrop",
    material: "terminal",
    where: "drop.arshnah.in/cipherdrop",
    signature: "blinking cursor, prompt, film grain",
    v: { bg: "#0a0c0b", ink: "#eef2f0", muted: "#8a948e", line: "#232b28", accent: "#34d399", radius: "3px", face: "JetBrains Mono" },
  },
  {
    name: "veil",
    material: "darkroom",
    where: "drop.arshnah.in/veil",
    signature: "the message vanishing into pixels",
    v: { bg: "#0b0a0f", ink: "#ece9f2", muted: "#8f8a9e", line: "#2a2634", accent: "#a78bfa", radius: "3px", face: "JetBrains Mono" },
  },
  {
    name: "wisp",
    material: "paper, quiet",
    where: "chat.arshnah.in",
    signature: "the peek reveal",
    v: { bg: "#0e0e14", ink: "#e9e9f0", muted: "#9a9aa8", line: "#26262f", accent: "#8b9cff", radius: "10px", face: "inherit" },
  },
  {
    name: "larpring",
    material: "xerox flyer",
    where: "larpring.github.io",
    signature: "grain, stamp, vibe",
    v: { bg: "#0c0c0f", ink: "#f0f0f5", muted: "#9fa0b2", line: "#242430", accent: "#9FA1FF", radius: "2px", face: "inherit" },
  },
  {
    name: "portfolio",
    material: "refined document",
    where: "arshnah.in",
    signature: "the theme-following sky",
    v: { bg: "#0a0a12", ink: "#e8e8ec", muted: "#9a9aa8", line: "#25252f", accent: "#8fb6ff", radius: "0px", face: "inherit" },
  },
  {
    name: "now",
    material: "instrument panel",
    where: "now.arshnah.in",
    signature: "the clock's colon blinks on a real 1s css cycle",
    v: { bg: "#0a0b0d", ink: "#e8ebf0", muted: "#8b93a1", line: "#242830", accent: "#3ecf6e", radius: "6px", face: "JetBrains Mono" },
  },
  {
    name: "card",
    material: "credential kiosk",
    where: "card.arshnah.in",
    signature: "camera-flash pulse over the card on mint/reroll",
    v: { bg: "#0a0c10", ink: "#e8ebf0", muted: "#8b93a1", line: "#232830", accent: "#3ddc84", radius: "4px", face: "inherit" },
  },
  {
    name: "shame",
    material: "museum placard",
    where: "shame.arshnah.in",
    signature: "glass-case light sweep on exhibit hover",
    v: { bg: "#0c0a0b", ink: "#ece7e7", muted: "#9a8e8f", line: "#2b2224", accent: "#e0483d", radius: "2px", face: "inherit" },
  },
  {
    name: "status",
    material: "switchboard",
    where: "status.arshnah.in",
    signature: "numbered ports boot in a staggered cascade on load",
    v: { bg: "#0b0d10", ink: "#e8ebf0", muted: "#8b93a1", line: "#232830", accent: "#3ba55d", radius: "3px", face: "JetBrains Mono" },
  },
  {
    name: "uses",
    material: "equipment manifest",
    where: "uses.arshnah.in",
    signature: "a verified stamp fades in on card hover",
    v: { bg: "#0b0d10", ink: "#e8ebf0", muted: "#8b93a1", line: "#232830", accent: "#8fb6ff", radius: "5px", face: "inherit" },
  },
  {
    name: "buttons",
    material: "badge press",
    where: "buttons.arshnah.in",
    signature: "the stage punches down like a press on download",
    v: { bg: "#0b0d10", ink: "#e8ebf0", muted: "#8b93a1", line: "#232830", accent: "#8fb6ff", radius: "9px", face: "inherit" },
  },
  {
    name: "playlist",
    material: "the crate",
    where: "playlist.arshnah.in",
    signature: "whatever's actually playing spins like it's on a turntable",
    v: { bg: "#0b0d10", ink: "#e8ebf0", muted: "#8b93a1", line: "#232830", accent: "#8fb6ff", radius: "8px", face: "inherit" },
  },
  {
    name: "scratch",
    material: "the split desk",
    where: "scratch.arshnah.in",
    signature: "a perforated dashed seam between write and preview",
    v: { bg: "#0b0d10", ink: "#e8ebf0", muted: "#8b93a1", line: "#232830", accent: "#8fb6ff", radius: "6px", face: "inherit" },
  },
  {
    name: "slop",
    material: "the gauge",
    where: "slop.arshnah.in",
    signature: "the needle overshoots before settling, like a real analog meter",
    v: { bg: "#0b0d10", ink: "#e8ebf0", muted: "#8b93a1", line: "#232830", accent: "#8fb6ff", radius: "7px", face: "inherit" },
  },
  {
    name: "wrapped",
    material: "terminal",
    where: "wrapped.arshnah.in",
    signature: "a blinking cursor after every huge/big readout",
    v: { bg: "#0a0c0a", ink: "#dcf2e2", muted: "#7fa088", line: "#1a2a1e", accent: "#3ecf6e", radius: "3px", face: "JetBrains Mono" },
  },
];

const components = [
  {
    name: "the rail",
    use: "a list of things. replaces the card, everywhere.",
    code: `<div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 14 }}>
  <a href={url}>{name}</a>
  <span className="meta">{tag}</span>
  <p>{desc}</p>
</div>`,
  },
  {
    name: "the leader row",
    use: "a label and a value, with dots carrying one to the other.",
    code: `<div className="lrow">
  <span className="k">uptime</span>
  <span className="dots" />          {/* border-bottom: 1px dotted */}
  <span className="v">8 months</span>
</div>`,
  },
  {
    name: "the prompt",
    use: "a heading, on anything with a terminal material.",
    code: `<h1 className="mono lower">
  <span className="faint">~/</span>drop<span className="cursor" />
</h1>

/* the cursor is the one flourish. exactly one per project. */
@keyframes blink { 0%,55%{opacity:1} 56%,100%{opacity:0} }
.cursor { width:.55em; height:1.02em; background:var(--accent);
          animation: blink 1.15s step-end infinite; }`,
  },
  {
    name: "film grain",
    use: "kills the generated look on contact. one fixed overlay, ~0.045.",
    code: `body::after {
  content:""; position:fixed; inset:0; z-index:9999;
  pointer-events:none; opacity:.045;
  background-image:url("data:image/svg+xml,\\
    <svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>\\
      <filter id='g'><feTurbulence type='fractalNoise'\\
        baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter>\\
      <rect width='100%' height='100%' filter='url(%23g)'/></svg>");
}`,
  },
  {
    name: "the punch",
    use: "feedback for a physical action, on any kiosk or press material. card's mint/reroll, buttons' download.",
    code: `function punch(el) {
  el.classList.remove("punch");
  void el.offsetWidth;   // replay on repeat clicks
  el.classList.add("punch");
}

@keyframes punch {
  0%   { transform: scale(1); }
  40%  { transform: scale(.96); }
  100% { transform: scale(1); }
}
.punch { animation: punch .32s ease; }`,
  },
  {
    name: "the boot cascade",
    use: "a list powering on in sequence before its real state lands. status's numbered ports.",
    code: `items.forEach((el, i) => {
  el.classList.add("boot");
  el.style.animationDelay = i * 70 + "ms";
  // real data can still land mid-cascade
});

@keyframes boot-flash {
  0%   { opacity: 1; }
  100% { opacity: .4; }
}
.boot { animation: boot-flash .5s ease-out both; }`,
  },
  {
    name: "the overshoot",
    use: "any value that moves (a needle, a fill, a bar) settles past its mark first, like a real analog gauge. slop's meter.",
    code: `.needle {
  transition: left .32s cubic-bezier(.34, 1.56, .64, 1);
}
/* same curve works on width, transform, top —
   anything with a target */`,
  },
];

export default function Grain() {
  return (
    <div className="grain">
      <style>{`
        .grain{max-width:760px;margin:0 auto}
        .grain h1{margin:0;font-size:34px;letter-spacing:-.03em}
        .grain .lede{color:var(--muted);margin:6px 0 0;max-width:56ch}
        .grain h2{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);
          margin:38px 0 12px;border-bottom:1px solid var(--line);padding-bottom:5px}
        .grain .idea{border-left:2px solid var(--link);padding-left:14px;margin:0 0 4px}
        .grain .idea p{margin:0 0 6px}

        /* every specimen is its own skin. the tokens come from the block, not the page */
        .spec{background:var(--s-bg);border:1px solid var(--s-line);padding:16px 18px;margin:0 0 12px;
          border-radius:var(--s-radius);color:var(--s-ink);font-family:var(--s-face)}
        .spec .top{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
        .spec .nm{font-weight:700;font-size:16px}
        .spec .mat{color:var(--s-accent);font-size:12.5px}
        .spec .where{margin-left:auto;color:var(--s-muted);font-size:11.5px}
        .spec .sig{color:var(--s-muted);font-size:13px;margin:8px 0 12px}
        .spec .chips{display:flex;gap:6px;flex-wrap:wrap;font-size:11px;
          font-family:var(--font-mono),monospace;color:var(--s-muted)}
        .spec .chip{border:1px solid var(--s-line);padding:2px 7px;border-radius:var(--s-radius)}
        .spec .sw{display:inline-block;width:9px;height:9px;background:var(--s-accent);
          margin-right:5px;vertical-align:-1px;border-radius:var(--s-radius)}

        .cmp{margin:0 0 22px}
        .cmp .nm{font-weight:700;font-size:15px}
        .cmp .use{color:var(--muted);font-size:14px;margin:2px 0 8px}
        .grain pre{background:var(--card);border:1px solid var(--line);padding:12px 14px;
          overflow-x:auto;font-size:12.5px;line-height:1.55;margin:0;
          scrollbar-width:thin;scrollbar-color:var(--line) transparent}
        .grain pre::-webkit-scrollbar{height:6px}
        .grain pre::-webkit-scrollbar-track{background:transparent}
        .grain pre::-webkit-scrollbar-thumb{background:var(--line);border-radius:3px}
        .grain pre::-webkit-scrollbar-thumb:hover{background:var(--muted)}

        .readme-showcase{border:1px solid var(--line);padding:16px 18px;margin:0 0 4px;
          display:flex;flex-direction:column;gap:10px;background:var(--card)}
        .readme-showcase img{max-width:100%;display:block;border-radius:6px}
        .readme-showcase .rs-label{font-family:var(--font-mono),monospace;font-size:11.5px;
          color:var(--faint);margin:0 0 2px}

        .tell{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:0 0 20px}
        @media(max-width:620px){.tell{grid-template-columns:1fr}}
        .tell .side{border:1px solid var(--line);padding:14px}
        .tell .tag{font-family:var(--font-mono),monospace;font-size:11px;letter-spacing:.08em;
          text-transform:uppercase;margin:0 0 10px}
        .tell .no .tag{color:#d6336c} .tell .yes .tag{color:#2fbf87}
        .tell .why{color:var(--muted);font-size:13px;margin:10px 0 0}

        /* the wrong versions, built on purpose so the difference is visible */
        .bad-card{border:1px solid var(--line);border-radius:16px;padding:14px;text-align:center}
        .bad-icon{width:38px;height:38px;border-radius:10px;background:#8fb6ff22;color:var(--link);
          display:grid;place-items:center;margin:0 auto 8px;font-size:17px}
        .good-rail{border-left:2px solid var(--link);padding-left:12px}
        .lrow{display:flex;align-items:baseline;gap:8px;font-size:14px}
        .lrow .dots{flex:1;border-bottom:1px dotted var(--line);transform:translateY(-3px)}
        .lrow .v{font-family:var(--font-mono),monospace;font-size:13px}
      `}</style>

      <h1>grain</h1>
      <p className="lede">
        the design language every arshnah surface is held to. it exists because the sites kept coming out
        looking generated, and no amount of picking better colours fixed that.
      </p>

      <h2>the one idea</h2>
      <div className="idea">
        <p>
          generated design is smooth, centered, and safe. hand made design has grain: asymmetry, a signature,
          one rough edge that is obviously a choice. every screen needs some.
        </p>
        <p style={{ color: "var(--muted)" }}>
          be a system without becoming twins. a shared <b>spine</b> (the anti template rules, Space
          Grotesk + JetBrains Mono as the fixed type pair, near monochrome color, real texture) and a per
          project <b>skin</b> (layout, palette, material, the signature move). the spine is what makes
          them mine. the skin is what keeps them apart.
        </p>
      </div>

      <h2>materials</h2>
      <p className="lede" style={{ margin: "0 0 14px" }}>
        each one below is drawn in its own tokens, not the page&apos;s. showing a material in someone
        else&apos;s colours is not the material.
      </p>
      {materials.map((m) => (
        <div
          key={m.name}
          className="spec"
          style={
            {
              "--s-bg": m.v.bg, "--s-ink": m.v.ink, "--s-muted": m.v.muted, "--s-line": m.v.line,
              "--s-accent": m.v.accent, "--s-radius": m.v.radius,
              "--s-face": m.v.face === "inherit" ? "var(--font-inter), sans-serif" : "var(--font-mono), monospace",
            } as React.CSSProperties
          }
        >
          <div className="top">
            <span className="nm">{m.name}</span>
            <span className="mat">{m.material}</span>
            <span className="where">{m.where}</span>
          </div>
          <p className="sig">signature: {m.signature}</p>
          <div className="chips">
            <span className="chip"><span className="sw" />{m.v.accent}</span>
            <span className="chip">bg {m.v.bg}</span>
            <span className="chip">radius {m.v.radius}</span>
            <span className="chip">{m.v.face}</span>
          </div>
        </div>
      ))}

      <div className="readme-showcase">
        <p className="rs-label">
          github profile readme ·{" "}
          <a href="https://github.com/arshnah" target="_blank" rel="noopener" style={{ color: "var(--link)" }}>
            github.com/arshnah ↗
          </a>
        </p>
        <img src="https://arshnah.in/api/neofetch" alt="arshnah's github stats neofetch card" loading="lazy" />
        <img src="https://arshnah.in/api/languages" alt="most used languages by real code volume" loading="lazy" />
        <img
          src="https://lastly.arshnah.in/api/now-playing?username=arshnahbtw%2Carshnah&theme=arsh"
          alt="now playing, last.fm"
          loading="lazy"
        />
        <img src="https://now.arshnah.in/api/focus" alt="what i'm focused on" loading="lazy" />
        <img src="https://now.arshnah.in/api/card" alt="what arsh is doing right now" loading="lazy" />
      </div>

      <h2>components</h2>
      {components.map((c) => (
        <div className="cmp" key={c.name}>
          <div className="nm">{c.name}</div>
          <p className="use">{c.use}</p>
          <pre>{c.code}</pre>
        </div>
      ))}

      <h2>the tells</h2>
      <p className="lede" style={{ margin: "0 0 14px" }}>
        the left column is built wrong on purpose. reading the rule never worked as well as seeing the pair.
      </p>

      <div className="tell">
        <div className="side no">
          <p className="tag">never</p>
          <div className="bad-card">
            <div className="bad-icon">◆</div>
            <b style={{ fontSize: 14 }}>cipherdrop</b>
            <p style={{ color: "var(--muted)", fontSize: 12.5, margin: "4px 0 0" }}>encrypted drops</p>
          </div>
        </div>
        <div className="side yes">
          <p className="tag">instead</p>
          <div className="good-rail">
            <b style={{ fontSize: 14 }}>cipherdrop</b>{" "}
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: "var(--faint)" }}>
              encrypted drops →
            </span>
            <p style={{ color: "var(--muted)", fontSize: 12.5, margin: "3px 0 0" }}>
              share a file the server cannot read.
            </p>
          </div>
          <p className="why">
            a rounded card with a centred icon in a tinted square came with the template. nobody chose it.
            the rail carries the same information and somebody had to decide on it.
          </p>
        </div>
      </div>

      <div className="tell">
        <div className="side no">
          <p className="tag">never</p>
          <div style={{ fontSize: 14 }}>
            <div>languages: TypeScript, HTML, CSS…</div>
            <div style={{ marginTop: 6 }}>repos: 17</div>
            <div style={{ marginTop: 6 }}>stars: 6</div>
          </div>
        </div>
        <div className="side yes">
          <p className="tag">instead</p>
          <div className="lrow"><span>repos</span><span className="dots" /><span className="v">17</span></div>
          <div className="lrow"><span>stars</span><span className="dots" /><span className="v">6</span></div>
          <p className="why">
            a value parked at a fixed column leaves the rest of the row as nothing. the dots give the
            whole width a job. and a list where a proportion would do says less than a bar.
          </p>
        </div>
      </div>

      <div className="tell">
        <div className="side no">
          <p className="tag">never</p>
          <div style={{ border: "1px dashed var(--line)", padding: 20, textAlign: "center", color: "var(--faint)", fontSize: 13 }}>
            + more tools soon
          </div>
        </div>
        <div className="side yes">
          <p className="tag">instead</p>
          <p style={{ color: "var(--faint)", fontSize: 13, margin: 0 }}>
            more when there is something worth putting here.
          </p>
          <p className="why">
            an empty promise holding a grid cell open is still empty. every space earns its keep, and a
            gap closes with fewer, bigger things. more small ones just make it look busy.
          </p>
        </div>
      </div>

      <div className="tell">
        <div className="side no">
          <p className="tag">never</p>
          <p style={{ fontSize: 13.5, lineHeight: 1.6 }}>
            &ldquo;Leverage our comprehensive platform to seamlessly unlock your creative potential — in
            today&apos;s fast-paced world, it&apos;s not just a tool, it&apos;s a game-changer.&rdquo;
          </p>
        </div>
        <div className="side yes">
          <p className="tag">instead</p>
          <p style={{ fontSize: 13.5, lineHeight: 1.6 }}>
            &ldquo;built this because the guestbook kept getting sprayed with SQL injections. none of them
            worked. here&apos;s the receipts.&rdquo;
          </p>
          <p className="why">
            buzzwords, hollow intensifiers, and the &ldquo;it&apos;s not X, it&apos;s Y&rdquo; contrast
            structure are the copy equivalent of the icon in a tinted square. nobody chose them, the
            template did. say the specific true thing instead. (this is exactly what{" "}
            <a href="https://slop.arshnah.in" target="_blank" rel="noopener" style={{ color: "var(--link)" }}>
              slop.arshnah.in
            </a>{" "}
            scores.)
          </p>
        </div>
      </div>

      <h2>the gut check</h2>
      <ol style={{ color: "var(--muted)", paddingLeft: 20 }}>
        <li>could a generator produce this in one shot? if yes, it is not done.</li>
        <li>what is the one thing a person obviously tuned here?</li>
        <li>is the working thing the hero, or is it buried under a pitch?</li>
        <li>does it look like my other work in spirit, but not in skin?</li>
        <li>
          would slop.arshnah.in flag the copy? read it out loud. if it sounds like it&apos;s pitching
          instead of telling you a specific true thing, rewrite it.
        </li>
        <li>
          is there a gap next to a tall element? that&apos;s data already being fetched and thrown away,
          not a spot for more padding or a bigger heading.
        </li>
      </ol>

      <p style={{ color: "var(--faint)", fontSize: 13, marginTop: 28 }}>
        the full rules live in <code>project-notes/grain.md</code>. it is a living file. when something
        turns out to look generated, the fix goes in there before it goes anywhere else.
      </p>
    </div>
  );
}
