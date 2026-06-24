import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: {
      bg:"#000000", surf:"#0a0a0a", surf2:"#141416",
      ink:"#f2f2f0", muted:"#8a8a86", faint:"#555558", accent:"#f2f2f0",
    },
    fontFamily: { sans:["var(--font-sans)","system-ui","sans-serif"], mono:["var(--font-mono)","monospace"] },
  }},
  plugins: [],
} satisfies Config;
