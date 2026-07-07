import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Arshdeep Singh — solo developer from India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0b0e",
          color: "#f0f0f5",
        }}
      >
        <div style={{ display: "flex", fontSize: 90, fontWeight: 800, letterSpacing: -2 }}>
          Arshdeep Singh
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 34, color: "#9a9aa8", maxWidth: 920, lineHeight: 1.4 }}>
          Developer in India. I build websites, apps, and the systems that run them.
        </div>
        <div style={{ display: "flex", marginTop: 52, fontSize: 26, color: "#8fb6ff" }}>
          arshnah.is-a.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
