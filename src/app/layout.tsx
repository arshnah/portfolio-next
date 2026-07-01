import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arshdeep Singh",
  description: "Solo developer from India. I build websites, apps, and the systems that run them.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
