// cnrad's signature generator swipe-types a name across a QWERTY layout --
// each letter maps to its key's row/column, and the "signature" is a
// straight-line trace through those points, top row bumped up, bottom row
// bumped down, home row staggered right by a quarter key like a real board.
// Reverse-engineered by matching this exactly against two real exports from
// signature.cnrad.dev ("Arsh" and "Arshdeep Singh") -- both reproduce byte
// for byte, so this isn't a guess, it's the real thing.
const ROW: Record<string, number> = {};
const COL: Record<string, number> = {};
"QWERTYUIOP".split("").forEach((c, i) => { ROW[c] = 0; COL[c] = i; });
"ASDFGHJKL".split("").forEach((c, i) => { ROW[c] = 1; COL[c] = i + 0.25; });
"ZXCVBNM".split("").forEach((c, i) => { ROW[c] = 2; COL[c] = i + 0.75; });
const ROW_Y = [40, 100, 160];

function nameToSignature(name: string): { path: string; length: number } {
  const points = name
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .map((letter) => [58 + COL[letter] * 60, ROW_Y[ROW[letter]]] as [number, number]);

  let length = 0;
  for (let i = 1; i < points.length; i++) {
    length += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  }

  const path = "M " + points.map(([x, y]) => `${x} ${y}`).join(" L ");
  return { path, length: Math.ceil(length) + 10 };
}

const SIGNATURE = nameToSignature("Arshdeep Singh");

export default function Signature() {
  return (
    <a
      href="https://signature.cnrad.dev"
      target="_blank"
      rel="noopener noreferrer"
      className="signature-link"
      aria-label="my name, swipe-typed across a keyboard -- made with cnrad's signature generator"
      style={{ display: "inline-block", marginTop: 4, lineHeight: 0 }}
    >
      <svg width="130" height="40" viewBox="0 0 650 200" aria-hidden="true" style={{ display: "block" }}>
        <path
          d={SIGNATURE.path}
          stroke="currentColor"
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="signature-stroke"
          style={{ strokeDasharray: SIGNATURE.length, strokeDashoffset: SIGNATURE.length }}
        />
      </svg>
    </a>
  );
}
