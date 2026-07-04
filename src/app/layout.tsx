import type { Metadata } from "next";
import "./globals.css";
import Starfield from "@/components/Starfield";
import DaySky from "@/components/DaySky";
import ThemeToggle from "@/components/ThemeToggle";
import CommandPalette from "@/components/CommandPalette";

const DESCRIPTION =
  "arshnah — Arshdeep Singh, a solo full-stack developer from India. I build websites, apps, and the systems that run them, including the LarpRing webring, CipherDrop, and Wisp.";

export const metadata: Metadata = {
  metadataBase: new URL("https://arshnah.in"),
  title: { default: "Arshdeep Singh (arshnah)", template: "%s · arshnah" },
  description: DESCRIPTION,
  keywords: ["arshnah", "Arshdeep Singh", "Arseoholic", "developer", "full-stack developer", "web developer India", "LarpRing", "portfolio"],
  authors: [{ name: "Arshdeep Singh", url: "https://arshnah.in" }],
  creator: "Arshdeep Singh",
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: "Arshdeep Singh (arshnah)",
    description: DESCRIPTION,
    url: "https://arshnah.in",
    siteName: "arshnah",
    type: "profile",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arshdeep Singh (arshnah)",
    description: DESCRIPTION,
  },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arshdeep Singh",
  alternateName: ["arshnah", "Arseoholic"],
  url: "https://arshnah.in",
  jobTitle: "Software Developer",
  description: DESCRIPTION,
  nationality: "Indian",
  knowsAbout: ["Web development", "TypeScript", "React", "Next.js", "Node.js", "Android development", "Cryptography", "Linux", "Self-hosting"],
  sameAs: [
    "https://github.com/arshnah",
    "https://now.arshnah.in",
    "https://larp.arshnah.in",
    "https://larpring.github.io",
  ],
};

const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Arshdeep Singh",
  alternateName: "arshnah",
  url: "https://arshnah.in",
};

const themeScript = `(function(){try{var t=localStorage.getItem('arsh-theme');document.documentElement.dataset.theme=t||'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
      </head>
      <body>
        <DaySky />
        <Starfield />
        <ThemeToggle />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
