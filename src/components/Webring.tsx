const RING = "https://arshnah.github.io/loopback";
const ME = "arsh";
const hop = (dir: string) => `${RING}/go.html?from=${ME}&dir=${dir}`;

export default function Webring() {
  return (
    <p>
      <a href={RING} target="_blank" rel="noopener noreferrer" aria-label="loopback webring">
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
      <br />
      Member of the <a href={RING} target="_blank" rel="noopener noreferrer">loopback webring</a>:{" "}
      <a href={hop("prev")}>&laquo; prev</a> |{" "}
      <a href={`${RING}/random/`}>random</a> |{" "}
      <a href={hop("next")}>next &raquo;</a>
    </p>
  );
}
