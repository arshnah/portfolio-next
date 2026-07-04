import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://arshnah.in/sitemap.xml",
    host: "https://arshnah.in",
  };
}
