"use client";
import { useEffect, useState } from "react";

export default function Contact() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-discord", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-discord", onOpen); };
  }, []);

  function copyUser() {
    (navigator.clipboard?.writeText("arshnah") || Promise.resolve()).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <>
      <section className="chapter contact" id="contact">
        <div className="shell">
          <p className="eyebrow">04 / let&apos;s build</p>
          <div className="big" style={{ marginTop: "20px" }}>
            <a href="mailto:arshjbdarsh@gmail.com">arshjbdarsh@gmail.com</a>
          </div>
          <div className="subs">
            <a href="https://github.com/arshnah" target="_blank" rel="noopener noreferrer">↗ GitHub</a>
            <a onClick={() => setOpen(true)}>↗ Discord</a>
          </div>
        </div>
      </section>

      <div className={`dcm-overlay${open ? " open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
        <div className="dcm-card" role="dialog" aria-label="Discord profile">
          <div className="dcm-banner"><button className="dcm-close" aria-label="Close" onClick={() => setOpen(false)}>✕</button></div>
          <div className="dcm-body">
            <div className="dcm-av">A<span className="st" /></div>
            <div className="dcm-inner">
              <div className="dcm-name">Arsh <span className="dcm-badge" title="i use arch btw">🐧 arch</span></div>
              <div className="dcm-user" title="Copy username" onClick={copyUser}>
                arshnah <span className="cpy">⧉ copy</span>
              </div>
              <div className="dcm-status">⌨ building something solo</div>

              <div className="dcm-divider" />

              <div className="dcm-label">About me</div>
              <div className="dcm-bio">dev, i use arch btw.</div>

              <div className="dcm-label" style={{ marginTop: 14 }}>Languages</div>
              <div className="dcm-tags">c, c++, c#, python, java, js</div>

              <div className="dcm-label" style={{ marginTop: 14 }}>Connections</div>
              <div className="dcm-conns">
                <a className="dcm-conn" href="https://github.com/arshnah" target="_blank" rel="noopener noreferrer">
                  <span className="ic">⌥</span> github.com/arshnah <span className="ext">↗</span>
                </a>
                <a className="dcm-conn" href="mailto:arshjbdarsh@gmail.com">
                  <span className="ic">✉</span> arshjbdarsh@gmail.com <span className="ext">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`dcm-toast${copied ? " show" : ""}`}>Username copied ✓</div>
    </>
  );
}
