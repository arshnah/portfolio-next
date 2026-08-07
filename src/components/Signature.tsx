"use client";

import { useEffect, useState } from "react";

// Same shape as the two hand-drawn examples I was given: a handful of
// straight segments zig-zagging left to right through a fixed y-band.
// Regenerated once per page load, not on a timer -- that's what cnrad's own
// version actually does too (checked: its canvas is static within a load,
// different only across reloads).
function randomSignature(): { path: string; length: number } {
  const points: [number, number][] = [];
  const count = 6 + Math.floor(Math.random() * 5);
  let x = 55 + Math.random() * 40;
  for (let i = 0; i < count; i++) {
    const y = 35 + Math.random() * 130;
    points.push([x, y]);
    x += 35 + Math.random() * 85;
  }

  let length = 0;
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i - 1];
    const [x2, y2] = points[i];
    length += Math.hypot(x2 - x1, y2 - y1);
  }

  const path = "M " + points.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join(" L ");
  return { path, length: Math.ceil(length) + 10 };
}

export default function Signature() {
  const [sig, setSig] = useState<{ path: string; length: number } | null>(null);

  // Generated client-side, after mount, on purpose -- Math.random() during
  // server render would draw one path on the server and a different one on
  // the client, and React would flag that as a hydration mismatch.
  useEffect(() => {
    setSig(randomSignature());
  }, []);

  return (
    <a
      href="https://signature.cnrad.dev"
      target="_blank"
      rel="noopener noreferrer"
      className="signature-link"
      aria-label="a new squiggle every visit -- made with cnrad's signature generator"
      style={{ display: "inline-block", width: 130, height: 40, marginTop: 4, lineHeight: 0 }}
    >
      {sig ? (
        <svg width="130" height="40" viewBox="0 0 650 200" aria-hidden="true" style={{ display: "block" }}>
          <path
            key={sig.path}
            d={sig.path}
            stroke="currentColor"
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="signature-stroke"
            style={{ strokeDasharray: sig.length, strokeDashoffset: sig.length }}
          />
        </svg>
      ) : null}
    </a>
  );
}
