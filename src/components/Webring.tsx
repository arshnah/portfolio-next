const RING = "https://arshnah.github.io/vibering";
const ME = "arsh";
const hop = (dir: string) => `${RING}/go.html?from=${ME}&dir=${dir}`;

export default function Webring() {
  return (
    <p>
      <a href={RING} target="_blank" rel="noopener noreferrer" aria-label="vibering webring">
        <svg xmlns="http://www.w3.org/2000/svg" width="88" height="31" viewBox="0 0 88 31" role="img" aria-label="vibering web ring badge">
          <defs>
            <linearGradient id="vg-arsh" x1="0" y1="0" x2="88" y2="31" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#7c5cff" />
              <stop offset="0.5" stopColor="#ff5db1" />
              <stop offset="1" stopColor="#ff7a5c" />
            </linearGradient>
          </defs>
          <rect width="88" height="31" fill="#0c0812" />
          <rect x="1" y="1" width="86" height="29" fill="#181026" />
          <rect x="1" y="1" width="86" height="1" fill="#3a2c52" />
          <rect x="1" y="1" width="27" height="29" fill="#0f0a18" />
          <g transform="translate(14.5,15.5)">
            <circle r="8" fill="none" stroke="url(#vg-arsh)" strokeWidth="2.5" />
            <circle cx="0" cy="-8" r="2.4" fill="#ff5db1" />
          </g>
          <text x="31" y="14" textLength="53" lengthAdjust="spacingAndGlyphs" fontFamily="Verdana,Geneva,sans-serif" fontSize="9" fontWeight="bold" fill="#ffe0ef">VIBERING</text>
          <text x="31" y="24" textLength="53" lengthAdjust="spacingAndGlyphs" fontFamily="Verdana,Geneva,sans-serif" fontSize="7" fill="#b98ff0">web ring</text>
        </svg>
      </a>
      <br />
      Member of the <a href={RING} target="_blank" rel="noopener noreferrer">vibering webring</a>:{" "}
      <a href={hop("prev")}>&laquo; prev</a> |{" "}
      <a href={`${RING}/random/`}>random</a> |{" "}
      <a href={hop("next")}>next &raquo;</a>
    </p>
  );
}
