import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "Arshdeep Singh — Full-Stack, App & Game Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "80px",
        background: "linear-gradient(160deg, #181A12 0%, #121309 60%, #14160F 100%)",
        fontFamily: "sans-serif", position: "relative", overflow: "hidden",
      }}>
        {/* green glow blob */}
        <div style={{ position: "absolute", right: -100, bottom: -100, width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52,211,153,.22), transparent 65%)" }} />
        {/* lime glow */}
        <div style={{ position: "absolute", right: 120, bottom: 80, width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163,230,53,.15), transparent 65%)" }} />
        {/* tag */}
        <div style={{ fontFamily: "monospace", fontSize: 20, color: "#A3E635", letterSpacing: "0.18em", marginBottom: 24, textTransform: "uppercase" }}>
          // arshnah
        </div>
        {/* name */}
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: 28,
          background: "linear-gradient(100deg, #A3E635 30%, #34D399)", backgroundClip: "text", color: "transparent",
          display: "flex" }}>
          Arshdeep Singh.
        </div>
        {/* role */}
        <div style={{ fontSize: 28, fontWeight: 600, color: "#ECEEE4", marginBottom: 16 }}>
          Full-Stack · Software · App · Game Dev
        </div>
        {/* tagline */}
        <div style={{ fontSize: 22, color: "#9A9E8C", maxWidth: 700, lineHeight: 1.5 }}>
          One-person dev team for hire. Web, mobile, games.
        </div>
        {/* url */}
        <div style={{ position: "absolute", bottom: 60, right: 80, fontFamily: "monospace", fontSize: 20, color: "#5F6450" }}>
          arshnah.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
