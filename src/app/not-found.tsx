import Link from "next/link";

const mono = '"JetBrains Mono","Courier New",monospace';
const you = { color: "var(--link)" };
const faint = { color: "var(--faint)" };

function Row({ href, name, note, external }: { href: string; name: string; note: string; external?: boolean }) {
  const inner = <span style={{ color: "var(--link)" }}>{name}</span>;
  return (
    <li style={{ margin: "3px 0", display: "flex", gap: 10 }}>
      <span style={{ minWidth: 132, flex: "none" }}>
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
        ) : (
          <Link href={href}>{inner}</Link>
        )}
      </span>
      <span style={faint}>{note}</span>
    </li>
  );
}

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 18px" }}>
      <div style={{ width: "100%", maxWidth: 580, fontFamily: mono, fontSize: 13.5, lineHeight: 1.75 }}>
        <div style={{ border: "1px solid var(--line)", borderRadius: 12, background: "var(--card)", padding: "18px 20px" }}>
          <p style={{ margin: 0 }}><span style={you}>arsh@arch</span>:~$ cd {"{the-page-you-wanted}"}</p>
          <p style={{ margin: "2px 0 0", color: "#e0554c" }}>bash: cd: no such file or directory</p>

          <p style={{ margin: "16px 0 0" }}><span style={you}>arsh@arch</span>:~$ ls ~/actually-here</p>
          <ul style={{ margin: "4px 0 0", padding: 0, listStyle: "none" }}>
            <Row href="/" name="home/" note="the whole thing" />
            <Row href="/blog" name="blog/" note="things i wrote" />
            <Row href="https://now.arshnah.in" name="now" note="what i'm doing right now" external />
            <Row href="https://larp.arshnah.in" name="larp" note="if you came here to larp" external />
          </ul>

          <p style={{ margin: "16px 0 0" }}>
            <span style={you}>arsh@arch</span>:~$ <span style={{ color: "var(--link)" }}>▋</span>
          </p>
        </div>
        <p style={{ textAlign: "center", margin: "18px 0 0", ...faint, fontSize: 12 }}>
          404. you larped your way to a page that doesn&apos;t exist. probably my fault.
        </p>
      </div>
    </main>
  );
}
