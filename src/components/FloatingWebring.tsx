"use client";

// Two webrings, side by side, fixed bottom-left.
// stabring — routes by hostname: /prev/from/HOST, /next/from/HOST
// larpring — routes by member name: /go.html?from=NAME&dir=prev|next

const STAB = "https://ring.stabbed.me";
const stabHop = (dir: "prev" | "next") =>
  `${STAB}/${dir}/from/${typeof window !== "undefined" ? window.location.hostname : "arshnah.in"}`;

const LARP = "https://larpring.github.io";
const ME = "arsh"; // must match "name" in larpring's webring.json
const larpHop = (dir: "prev" | "next") => `${LARP}/go.html?from=${ME}&dir=${dir}`;

const btn: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  background: "#000",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  font: "16px/1 sans-serif",
};

const label: React.CSSProperties = {
  font: "10px/1 sans-serif",
  color: "#fff",
  background: "#000",
  textAlign: "center",
  padding: "3px 0",
  letterSpacing: "0.05em",
};

const col: React.CSSProperties = { display: "flex", flexDirection: "column" };

const go = (url: string) => () => (window.location.href = url);

export default function FloatingWebring() {
  return (
    <div style={{ position: "fixed", left: "1rem", bottom: "1rem", zIndex: 999, display: "flex", gap: 6 }}>
      {/* stabring */}
      <div style={col}>
        <span style={label}>stab</span>
        <button style={btn} aria-label="Previous site in stabring" onClick={go(stabHop("prev"))}>&uarr;</button>
        <button style={btn} aria-label="stabring home" onClick={go(STAB)}>?</button>
        <button style={btn} aria-label="Next site in stabring" onClick={go(stabHop("next"))}>&darr;</button>
      </div>

      {/* larpring */}
      <div style={col}>
        <span style={label}>larp</span>
        <button style={btn} aria-label="Previous site in larpring" onClick={go(larpHop("prev"))}>&uarr;</button>
        <button style={btn} aria-label="larpring directory" onClick={go(LARP)}>?</button>
        <button style={btn} aria-label="Next site in larpring" onClick={go(larpHop("next"))}>&darr;</button>
      </div>
    </div>
  );
}
