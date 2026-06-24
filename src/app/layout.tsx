import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
export const metadata: Metadata = {
  title: "Arshdeep Singh · developer",
  description: "Solo developer from India. I build websites, apps, and the systems that run them.",
  openGraph: { title: "Arshdeep Singh · developer", description: "Solo developer from India. Websites, apps, and the systems behind them.", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
