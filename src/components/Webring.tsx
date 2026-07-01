// Webring nav — links this site into the loopback webring.
const RING = "https://arshnah.github.io/loopback";
const ME = "arsh"; // must match your "name" in the ring's webring.json

const hop = (dir: string) => `${RING}/go.html?from=${ME}&dir=${dir}`;

export default function Webring() {
  return (
    <div className="flex flex-col items-center gap-3.5">
      <div className="flex items-center gap-5 font-mono text-[13px] text-muted">
        <a href={hop("prev")} className="hover:text-ink transition" aria-label="previous site in the webring">&larr; prev</a>
        <a href={`${RING}/random/`} className="hover:text-ink transition">random</a>
        <a href={hop("next")} className="hover:text-ink transition" aria-label="next site in the webring">next &rarr;</a>
      </div>

      <a href={RING} target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition" aria-label="loopback webring">
        <svg xmlns="http://www.w3.org/2000/svg" width="88" height="31" viewBox="0 0 88 31" shapeRendering="crispEdges" role="img" aria-label="loopback web ring badge">
          <rect width="88" height="31" fill="#0d1430" />
          <rect x="1" y="1" width="86" height="29" fill="#1b2a5b" />
          <rect x="1" y="1" width="86" height="1" fill="#33478a" />
          <rect x="1" y="29" width="86" height="1" fill="#0a1024" />
          <rect x="1" y="1" width="26" height="29" fill="#0d1430" />
          <rect x="27" y="1" width="1" height="29" fill="#33478a" />
          <g transform="translate(14,15.5)">
            <circle r="8" fill="none" stroke="#f6c177" strokeWidth="2" />
            <circle cx="0" cy="-8" r="2.3" fill="#eb6f92" />
            <circle r="2.1" fill="#efe7d0" />
          </g>
          <text x="31" y="14" textLength="53" lengthAdjust="spacingAndGlyphs" fontFamily="Verdana,Geneva,sans-serif" fontSize="9" fontWeight="bold" fill="#f7f1df">LOOPBACK</text>
          <text x="31" y="24" textLength="53" lengthAdjust="spacingAndGlyphs" fontFamily="Verdana,Geneva,sans-serif" fontSize="7" fill="#f6c177">WEB RING</text>
        </svg>
      </a>

      <span className="text-[12px] text-faint">
        member of the{" "}
        <a href={RING} target="_blank" rel="noopener noreferrer" className="hover:text-ink underline underline-offset-2 decoration-white/20">loopback webring</a>
      </span>
    </div>
  );
}
