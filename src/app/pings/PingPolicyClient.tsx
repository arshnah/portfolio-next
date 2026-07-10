"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

const fmtHour = (h: number) => {
  if (h === 0) return "12 AM";
  if (h === 12) return "12 PM";
  return h > 12 ? `${h - 12} PM` : `${h} AM`;
};

export default function PingPolicyClient() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const timeZone = "Asia/Kolkata";

  if (!mounted || !now) {
    return (
      <>
        <nav className="topnav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "6px 0 14px" }}>
          <Link href="/" style={{ fontFamily: 'var(--font-mono),"Courier New",monospace', fontWeight: 700 }}>
            <span style={{ color: "var(--muted)" }}>~/</span>arsh<span style={{ color: "var(--link)" }}>nah</span>
          </Link>
        </nav>
        <hr />
        <div style={{ padding: "40px 0", textAlign: "center", color: "var(--muted)" }}>Loading preferences...</div>
      </>
    );
  }

  // Format times
  const myTimeStr = now.toLocaleString("en-US", { timeZone, hour: "numeric", minute: "numeric", hour12: true });
  const viewerTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const yourTimeStr = now.toLocaleString("en-US", { timeZone: viewerTimeZone, hour: "numeric", minute: "numeric", hour12: true });

  // Calculate difference
  const myDate = new Date(now.toLocaleString("en-US", { timeZone }));
  const yourDate = new Date(now.toLocaleString("en-US", { timeZone: viewerTimeZone }));
  const timeDifference = Math.round((yourDate.getTime() - myDate.getTime()) / (1000 * 60 * 60));

  // Determine current day & hour in my timezone
  const myDayStr = now.toLocaleString("en-US", { timeZone, weekday: "short" });
  const currentDayIdx = DAYS.indexOf(myDayStr);
  const currentHour = parseInt(now.toLocaleString("en-US", { timeZone, hour: "numeric", hour12: false }), 10);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .ping-day {
          flex: 1;
          min-width: 40px;
          text-align: center;
          padding: 10px 0;
          border-radius: 8px;
          background: var(--field);
          color: var(--ink);
          border: 1px solid var(--line);
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s;
          cursor: default;
        }
        .ping-day.available {
          background: color-mix(in srgb, var(--link) 15%, transparent);
          border-color: color-mix(in srgb, var(--link) 40%, transparent);
        }
        .ping-day.current {
          background: var(--link);
          color: var(--bg);
          border-color: var(--ink);
          font-weight: 700;
        }

        .ping-hour {
          height: 36px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          cursor: default;
          transition: all 0.2s;
        }
        .ping-hour.available {
          background: color-mix(in srgb, var(--link) 15%, transparent);
          border: 1px solid color-mix(in srgb, var(--link) 30%, transparent);
          color: var(--ink);
        }
        .ping-hour.current {
          background: var(--link);
          color: var(--bg);
          border: 1px solid var(--ink);
          transform: scale(1.08);
          z-index: 2;
        }
      ` }} />

      <nav className="topnav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "6px 0 14px" }}>
        <Link href="/" style={{ fontFamily: 'var(--font-mono),"Courier New",monospace', fontWeight: 700 }}>
          <span style={{ color: "var(--muted)" }}>~/</span>arsh<span style={{ color: "var(--link)" }}>nah</span>
        </Link>
        <span style={{ fontSize: 14, color: "var(--muted)" }}>Ping Policy</span>
      </nav>

      <hr />

      <div style={{ maxWidth: "600px", margin: "20px auto 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ marginBottom: 6 }}>Ping Policy</h1>
          <p style={{ color: "var(--muted)", fontSize: 16, margin: 0 }}>My contact preferences and availability rules.</p>
          
          <div style={{ 
            display: "inline-block", 
            background: "var(--card)", 
            border: "1px solid var(--line)", 
            borderRadius: 20, 
            padding: "8px 16px", 
            marginTop: 18, 
            fontSize: 14,
            fontFamily: 'var(--font-mono), monospace'
          }}>
            <span style={{ color: "var(--link)" }}>●</span> It&apos;s currently <b style={{ color: "var(--ink)" }}>{myTimeStr}</b> for me (IST).
            <div style={{ fontSize: 12, color: "var(--faint)", marginTop: 2 }}>
              It&apos;s {yourTimeStr} for you. 
              {timeDifference === 0 ? " We share the same time." : ` You are ${Math.abs(timeDifference)} ${Math.abs(timeDifference) === 1 ? "hour" : "hours"} ${timeDifference > 0 ? "ahead" : "behind"}.`}
            </div>
          </div>
        </div>

        {/* Response Rule */}
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", fontWeight: 700 }}>Response Time</h3>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: "var(--link)" }}>No guarantee</span>
            <span style={{ fontSize: 14, color: "var(--faint)" }}>&middot; usually answers within a day</span>
          </div>
          <p style={{ margin: "10px 0 0 0", fontSize: 14, color: "var(--muted)" }}>
            I am open to being pinged or contacted at any time of day, but response latency depends on whether I am asleep, working, or AFK.
          </p>
        </div>

        {/* Days Available */}
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", fontWeight: 700 }}>Available Days</h3>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
            {DAYS.map((day, idx) => {
              const isCurrent = idx === currentDayIdx;
              return (
                <div 
                  key={day} 
                  title={DAY_LABELS[idx]} 
                  className={`ping-day available ${isCurrent ? "current" : ""}`}
                >
                  {day[0]}
                </div>
              );
            })}
          </div>
        </div>

        {/* Hours Available */}
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", fontWeight: 700 }}>Available Hours</h3>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(12, 1fr)", 
            gap: 6,
            marginBottom: 12
          }}>
            {HOURS.map((h) => {
              const isCurrent = h === currentHour;
              return (
                <div
                  key={h}
                  title={fmtHour(h)}
                  className={`ping-hour available ${isCurrent ? "current" : ""}`}
                >
                  <span style={{ fontSize: 9 }}>{h}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--faint)", fontSize: 11, fontFamily: 'var(--font-mono), monospace' }}>
            <span>12 AM (0)</span>
            <span>Current: {fmtHour(currentHour)}</span>
            <span>11 PM (23)</span>
          </div>
        </div>

        {/* Collapsible Info Block */}
        <details style={{
          border: "1px solid var(--line)",
          borderRadius: 8,
          background: "var(--card)",
          padding: "12px 16px"
        }}>
          <summary style={{
            fontWeight: 600,
            cursor: "pointer",
            outline: "none",
            color: "var(--ink)",
            userSelect: "none"
          }}>
            Why am I seeing this?
          </summary>
          <p style={{ margin: "10px 0 0 0", color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6 }}>
            You&apos;re seeing this page because I share my availability and contact rules directly on my site to maintain clear, respectful boundaries. It saves both of us time and helps set realistic expectations for responses!
          </p>
        </details>
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
          <script src="https://yocrrz.is-a.dev/ring/widgetv3.js" type="text/javascript" charSet="utf-8"></script>
        </div>
      </div>
    </>
  );
}
