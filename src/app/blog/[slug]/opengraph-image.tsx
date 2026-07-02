import { ImageResponse } from "next/og";
import { posts } from "@/lib/data";

export const runtime = "edge";
export const alt = "Arshdeep Singh — blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function Image({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  const title = post?.title ?? "Writing";
  const summary = post?.summary ?? "";
  const date = post ? fmt(post.date) : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0b0b0e",
          color: "#f0f0f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, fontWeight: 600 }}>
          <span style={{ color: "#8fb6ff" }}>~/arsh</span>
          <span style={{ color: "#565668", margin: "0 14px" }}>·</span>
          <span style={{ color: "#9a9aa8" }}>blog</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: title.length > 42 ? 62 : 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 1050 }}>
            {title}
          </div>
          {summary ? (
            <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#9a9aa8", lineHeight: 1.4, maxWidth: 1000 }}>
              {summary}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#565668" }}>
          <span>Arshdeep Singh</span>
          <span>{date}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
