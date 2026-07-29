"use client";

export default function Signature() {
  return (
    <div className="sig-page">
      <style>{`
        .sig-page{max-width:520px;margin:0 auto;}
        .sig-page .bar{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:24px;}
        .sig-page h1{margin:0 0 6px;font-size:22px;letter-spacing:-.02em;}
        .sig-page .sub{color:var(--muted);font-size:13.5px;margin:0 0 26px;}
        .sig-page .sub b{color:var(--ink);}
        .sig-frame{border:1px solid var(--line);border-radius:8px;padding:26px 28px;background:var(--card);cursor:pointer;transition:border-color .15s ease;}
        .sig-frame:hover, .sig-frame:focus-visible{border-color:var(--faint);outline:none;}
        .hint{margin-top:12px;font-family:var(--font-mono),monospace;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--faint);}
      `}</style>

      <div className="bar noprint">
        <a href="/">&larr; back</a>
      </div>

      <h1>Email signature</h1>
      <p className="sub">Click the box, then <b>Ctrl+A</b> / <b>Ctrl+C</b> to copy — paste into your email client&apos;s signature settings.</p>

      <div
        className="sig-frame"
        tabIndex={0}
        onClick={(e) => {
          const range = document.createRange();
          range.selectNodeContents(e.currentTarget);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        }}
      >
        <table cellPadding={0} cellSpacing={0} border={0} style={{ fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Consolas, monospace", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ borderLeft: "3px solid #8fb6ff", padding: "2px 0 2px 14px" }}>
                <table cellPadding={0} cellSpacing={0} border={0} style={{ borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td style={{ paddingBottom: 4 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "#0a0a12", letterSpacing: "0.02em" }}>arsh</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: 10 }}>
                        <span style={{ fontSize: 12, color: "#6b7280" }}>building things at arshnah.in</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "1px 0" }}>
                        <table cellPadding={0} cellSpacing={0} border={0}>
                          <tbody>
                            <tr>
                              <td style={{ fontSize: 11, color: "#9ca3af", paddingRight: 8 }}>site</td>
                              <td><a href="https://arshnah.in" style={{ fontSize: 12, color: "#8fb6ff", textDecoration: "none" }}>arshnah.in</a></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "1px 0" }}>
                        <table cellPadding={0} cellSpacing={0} border={0}>
                          <tbody>
                            <tr>
                              <td style={{ fontSize: 11, color: "#9ca3af", paddingRight: 8 }}>discord</td>
                              <td><span style={{ fontSize: 12, color: "#374151" }}>arshnah</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "1px 0" }}>
                        <table cellPadding={0} cellSpacing={0} border={0}>
                          <tbody>
                            <tr>
                              <td style={{ fontSize: 11, color: "#9ca3af", paddingRight: 8 }}>mail</td>
                              <td><a href="mailto:arshjbdarsh@gmail.com" style={{ fontSize: 12, color: "#374151", textDecoration: "none" }}>arshjbdarsh@gmail.com</a></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="hint">tap the box &middot; select all &middot; copy</div>
    </div>
  );
}
