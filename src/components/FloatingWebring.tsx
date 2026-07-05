"use client";

const RING = "https://ring.stabbed.me";
const hop = (dir: string) =>
  `${RING}/${dir}/from/${typeof window !== "undefined" ? window.location.hostname : "arshnah.in"}`;

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

export default function FloatingWebring() {
  return (
    <div
      style={{
        position: "fixed",
        left: "1rem",
        bottom: "1rem",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button style={btn} aria-label="Previous site" onClick={() => (window.location.href = hop("prev"))}>
        &uarr;
      </button>
      <button style={btn} aria-label="About the webring" onClick={() => (window.location.href = RING)}>
        ?
      </button>
      <button style={btn} aria-label="Next site" onClick={() => (window.location.href = hop("next"))}>
        &darr;
      </button>
    </div>
  );
}
