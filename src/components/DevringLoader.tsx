"use client";
import { useEffect } from "react";

export default function DevringLoader() {
  useEffect(() => {
    // Intercept fetch to mock our domain in the webring
    const originalFetch = window.fetch;
    window.fetch = async function (input, init) {
      const url = typeof input === "string" ? input : (input as Request).url;
      if (url && url.includes("yocrrz.is-a.dev/ring/members/arshnah.json")) {
        try {
          const res = await originalFetch(input, init);
          const data = await res.json();
          // Modify the URL to match the current origin (e.g. arshnah.in, localhost)
          data.url = window.location.origin;
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          // Fallback if network request fails
          return new Response(JSON.stringify({
            name: "arshnah",
            url: window.location.origin,
            github: "arshnah",
            description: "building shit.",
            avatar: "https://avatars.githubusercontent.com/u/244542448?v=4",
          }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
      }
      return originalFetch(input, init);
    };

    // Load the script
    const script = document.createElement("script");
    script.src = "https://yocrrz.is-a.dev/ring/widgetv3.js";
    script.type = "text/javascript";
    script.setAttribute("charset", "utf-8");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up fetch override and script on unmount
      window.fetch = originalFetch;
      try {
        document.body.removeChild(script);
      } catch (e) {}
    };
  }, []);

  return null;
}
