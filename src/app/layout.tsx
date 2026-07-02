import type { Metadata } from "next";
import "./globals.css";
import Starfield from "@/components/Starfield";
import DaySky from "@/components/DaySky";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  metadataBase: new URL("https://arshnah.in"),
  title: "Arshdeep Singh",
  description: "Solo developer from India. I build websites, apps, and the systems that run them.",
  openGraph: {
    title: "Arshdeep Singh",
    description: "Solo developer from India. I build websites, apps, and the systems that run them.",
    url: "https://arshnah.in",
    siteName: "Arshdeep Singh",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arshdeep Singh",
    description: "Solo developer from India. I build websites, apps, and the systems that run them.",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('arsh-theme');document.documentElement.dataset.theme=t||'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <DaySky />
        <Starfield />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
