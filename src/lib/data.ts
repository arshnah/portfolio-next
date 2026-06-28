export const projects = [
  { year: "2026", name: "Wisp", url: "https://wisp-phi.vercel.app",
    desc: "An open-source, end-to-end encrypted messenger. Messages get locked in your browser before they ever reach the server, so a database leak would only spill gibberish. I wrote the whole crypto layer myself with the Web Crypto API: real accounts, a key directory, and live realtime chat. The code is public." },
  { year: "2026", name: "KOHAKU", url: "https://kohaku-agency.vercel.app",
    desc: "A creative agency I run with a friend, aimed at anime and manga brands. I built the whole site: a 3D hero in Three.js, a live chat widget, and a Supabase backend that runs our lead inbox. We pitch studios manga-first." },
  { year: "2025", name: "Content Helper Community", url: "https://chc-site.vercel.app",
    desc: "A creator community's site that shows every member's live YouTube subscriber count. 17 channels, updated automatically every hour." },
  { year: "2025", name: "WhatNow", url: "https://whatnowindia.vercel.app",
    desc: "A platform for a startup that helps Indian students figure out what to do right after their board exams. I built the site and led the redesign." },
];
export const services = [
  { n: "01", title: "Websites", desc: "Fast, modern sites that look good and actually show up on Google. Business sites, landing pages, web apps." },
  { n: "02", title: "Mobile apps", desc: "Android apps, built and published to the Play Store. Bookings, payments, notifications, all of it." },
  { n: "03", title: "Backend & servers", desc: "The part nobody sees: databases, APIs, and the server that keeps everything online. I set it up and I keep it alive." },
];
export const stack = ["TypeScript","React","Next.js","Node.js","Kotlin / Android","Python","MySQL","Firebase","Supabase","Linux / VPS","PM2","Vercel"];

export const posts = [
  { slug: "why-i-run-my-own-servers", title: "Why I run my own servers", date: "2026-05-12",
    summary: "Managed hosting is easy. I picked the harder road on purpose, and here is what it taught me.",
    body: [
      "There's a moment in every side project where the free tier runs out and you have to decide who you are. I hit mine about a year into building Nexlease.",
      "For the longest time I did what everyone tells you to do. Push to a platform, let it build, let it deploy, never think about the machine underneath. It felt like magic and it cost me nothing, so I never asked questions.",
      "Then the project got real. More traffic, a background job that actually needed to stay running, a database that didn't fit in a hobby plan. The easy path was to open my wallet. The other path was to go learn how the thing I'd been ignoring actually worked. I went with the second one, mostly out of stubbornness.",
      "So I rented a bare server. Nothing on it. Just Ubuntu, a root password, and a blinking cursor that did not care about me at all. I set up nginx. I set up PM2 so my node process would come back after a crash. I figured out SSL certificates and why they always expire at the worst possible time. I wrote a deploy flow that was basically pull, build, restart, and pray.",
      "My ISP, for reasons I still don't fully understand, blocks every SSH port there is. So before I could even log in properly, I had to tunnel my way in through Cloudflare. That's the kind of problem no tutorial prepares you for. You just sit there at night, googling error messages, slowly realizing the wall is on your side of the connection.",
      "It broke constantly. A config typo would take the whole site down. One credential stored in the wrong format made every single login fail silently, with no error at all, which is so much worse than a loud crash. I learned that one the hard way, staring at logs at 2am wondering why something that worked an hour ago was suddenly returning nothing.",
      "And here's the part nobody warns you about: I liked it. Every time it broke, I understood one more layer. After enough of those nights, the stack stopped being a black box. There's no piece of it now that I have to take on faith.",
      "That's the real payoff. Not the few hundred rupees a month I save. It's that when something goes down, I'm not filing a support ticket and waiting on someone else's timeline. I'm opening a terminal, because I built every layer between the request and the response, and I know exactly where to look.",
      "Managed hosting is the right call for a lot of people, and I won't pretend otherwise. But if you ever get the itch to know what's actually happening under your app, rent the cheap box and break it for a weekend. You'll come out the other side a different developer.",
    ] },
  { slug: "shipping-solo", title: "On shipping things alone", date: "2026-03-02",
    summary: "Design, code, app, server. One person doing all of it is slower in theory and faster in practice.",
    body: [
      "People hear solo developer and quietly file it under compromise. No designer, so the design must be rough. No backend team, so the backend must be fragile. No QA, so the bugs must be everywhere. I get the assumption. I just think it's mostly wrong.",
      "On paper, a team is faster. More hands, more hours, work happening in parallel. Line up a good team against me on a spec sheet and they win every time.",
      "But specs aren't what kill projects. Handoffs are. The design that looks nothing like the thing that got built. The API that returns a shape the app never expected. The server everyone assumed someone else was watching. Every seam between two people is a place for the work to fall through, and big projects have a lot of seams.",
      "When it's one person, there are no seams. The design lives in the same head as the code that implements it. The API gets shaped by the same person who has to consume it. Nobody waits on anybody. The whole product fits in one mind at once, and that turns out to be worth a surprising amount.",
      "I'm not romanticizing it. Doing everything alone has a real cost. You're the bottleneck by definition. There's nobody to catch the blind spot you can't see, nobody to tell you the idea is bad before you've built it. When you're stuck, you're just stuck, and the only person who can unstick you is the tired one already at the keyboard.",
      "It doesn't scale forever either. At some point a project gets big enough that one person becomes the constraint, and then you need other people, and you're back to managing seams on purpose because the alternative is worse. I know that. I'm not trying to do fifty engineers' worth of work by myself.",
      "But for the part I actually care about, taking something from nothing to live, used by real people, with no committee deciding what gets built, doing it alone is underrated. Not despite being one person. Because of it.",
      "Most of what's on this site was made this way. One person, start to finish. It's slower than it sounds and faster than you'd think.",
    ] },
];
export const testimonials = [
  { quote: "Arsh built our entire agency site solo, 3D hero and all, and still found time to argue with me about fonts. Ships fast, breaks little, fixes everything.", name: "Gunar", role: "Partner, KOHAKU" },
  { quote: "Best developer I have ever hired. Also the only one. Pays himself in chai and never misses a deadline he set five minutes ago.", name: "Thakur Singh", role: "Extremely satisfied client" },
];