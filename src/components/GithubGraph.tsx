"use client";
import useSWR from "swr";
import { useState } from "react";

type Day = { date: string; count: number; level: number };
const fetcher = (u: string) => fetch(u).then((r) => r.json());

const GAP = 3;
const SWATCH = 11;
const LEVELS = ["var(--gh-0)", "var(--gh-1)", "var(--gh-2)", "var(--gh-3)", "var(--gh-4)"];

const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

function label(d: Day) {
  const c = d.count === 0 ? "No contributions" : `${d.count} contribution${d.count === 1 ? "" : "s"}`;
  return `${c} · ${fmtDate(d.date)}`;
}

// group the flat day list into week-columns, padding the first week to its weekday
function toWeeks(days: Day[]): (Day | null)[][] {
  const weeks: (Day | null)[][] = [];
  let week: (Day | null)[] = [];
  days.forEach((d, i) => {
    if (i === 0) {
      const dow = new Date(d.date + "T00:00:00").getDay();
      for (let k = 0; k < dow; k++) week.push(null);
    }
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  });
  if (week.length) { while (week.length < 7) week.push(null); weeks.push(week); }
  return weeks;
}

export default function GithubGraph() {
  const { data } = useSWR("/api/contributions", fetcher, { revalidateOnFocus: false });
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);

  if (!data?.ok) return null;
  const weeks = toWeeks(data.days as Day[]);

  const card: React.CSSProperties = {
    position: "relative",
    border: "1px solid var(--line)",
    borderRadius: 14,
    background: "var(--card)",
    padding: "18px 22px 20px",
    margin: "10px 0",
  };

  return (
    <div style={card} data-gh-card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        <span style={{ fontFamily: '"JetBrains Mono","Courier New",monospace', fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
          GitHub Activity
        </span>
        <span style={{ fontFamily: '"JetBrains Mono","Courier New",monospace', fontSize: 13, color: "var(--gh-count)" }}>
          {data.total} contributions this year
        </span>
      </div>

      <div onMouseLeave={() => setTip(null)}>
        <div style={{ display: "flex", gap: GAP }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: GAP }}>
              {week.map((d, di) =>
                d ? (
                  <div
                    key={di}
                    onMouseEnter={(e) => {
                      const cell = e.currentTarget.getBoundingClientRect();
                      const box = e.currentTarget.closest("[data-gh-card]")!.getBoundingClientRect();
                      setTip({ x: cell.left - box.left + cell.width / 2, y: cell.top - box.top, text: label(d) });
                    }}
                    style={{ width: "100%", aspectRatio: "1", borderRadius: "22%", background: LEVELS[d.level] ?? LEVELS[0] }}
                  />
                ) : (
                  <div key={di} style={{ width: "100%", aspectRatio: "1" }} />
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 6, marginTop: 12, fontFamily: '"JetBrains Mono","Courier New",monospace', fontSize: 12, color: "var(--muted)" }}>
        <span>Less</span>
        {LEVELS.map((c, i) => (
          <span key={i} style={{ width: SWATCH, height: SWATCH, borderRadius: 3, background: c, display: "inline-block" }} />
        ))}
        <span>More</span>
      </div>

      {tip && (
        <div
          style={{
            position: "absolute",
            left: tip.x,
            top: tip.y - 8,
            transform: "translate(-50%, -100%)",
            background: "var(--bg)",
            border: "1px solid var(--line)",
            borderRadius: 8,
            padding: "5px 9px",
            fontFamily: '"JetBrains Mono","Courier New",monospace',
            fontSize: 12,
            color: "var(--ink)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          {tip.text}
        </div>
      )}
    </div>
  );
}
