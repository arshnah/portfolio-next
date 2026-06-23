"use client";
import { useEffect, useRef } from "react";
import Globe from "./Globe";

export default function Hero() {
  const typedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = typedRef.current!;
    const txt = "// booting build.log : full-stack · software · app · game dev";
    let i = 0, stop = false;
    (function type() {
      if (stop) return;
      if (i <= txt.length) { el.innerHTML = txt.slice(0, i) + '<span class="cur"></span>'; i++; setTimeout(type, 34); }
    })();
    return () => { stop = true; };
  }, []);

  return (
    <header className="hero" id="top">
      <Globe />
      <div className="shell hero-content">
        <div className="typed" ref={typedRef} />
        <h1>Arsh<span className="o">deep</span><br />Singh.</h1>
        <p className="role">Full-Stack Developer · Software · App · Game Dev</p>
        <p className="intro">
          I&apos;m a one-person dev team for hire. Which means I&apos;m the frontend guy, the backend guy, the Android guy,
          and the idiot who gets pinged when a client&apos;s server falls over at 3am. Web, mobile, games. I take a project
          from empty folder to live, then babysit it. Most of what I&apos;ve shipped is in production right now, not rotting
          in some private repo.
        </p>
        <div className="cta">
          <a className="btn p" href="#builds">View the builds →</a>
          <a className="btn s" href="#contact">Get in touch</a>
        </div>
      </div>
      <div className="drag-hint"><span className="dot" /> drag to spin</div>
    </header>
  );
}
