"use client";
import Globe from "./Globe";
import ActivityFeed from "./ActivityFeed";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <Globe />
      <div className="shell hero-content">
        <p className="eyebrow">developer · india · open for work</p>
        <h1>Arshdeep<br />Singh<span className="accent-dot">.</span></h1>
        <p className="role">Full-stack · Android · and the server it runs on</p>
        <p className="intro">
          I&apos;m a solo developer. I build the whole thing — the website, the Android app, the backend,
          the VPS it sits on — and then I&apos;m the one who keeps it alive. Most of what I&apos;ve made is in
          production right now, used by actual people, not sitting in a private repo as a demo. Taught myself
          all of it, and currently running five-ish products at once without dropping any of them. So far.
        </p>
        <div className="cta">
          <a className="btn p" href="#builds">See the work →</a>
          <a className="btn s" href="#contact">Email me</a>
        </div>
        <ActivityFeed />
      </div>
      <div className="drag-hint"><span className="dot" /> drag to spin</div>
    </header>
  );
}
