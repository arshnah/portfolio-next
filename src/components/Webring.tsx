// stabring — member (routes by hostname)
const STAB = "https://ring.stabbed.me";
const STAB_ME = "arshnah.in";
const stabHop = (dir: string) => `${STAB}/${dir}/from/${STAB_ME}`;

// larpring — founder (routes by member name in webring.json)
const LARP = "https://larpring.github.io";
const LARP_ME = "arsh";
const larpHop = (dir: string) => `${LARP}/go.html?from=${LARP_ME}&dir=${dir}`;

export default function Webring() {
  return (
    <span style={{ display: "inline-flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
      <span>
        Member of the <a href={STAB} target="_blank" rel="noopener noreferrer">stabring</a>:{" "}
        <a href={stabHop("prev")}>&laquo; prev</a> |{" "}
        <a href={STAB}>?</a> |{" "}
        <a href={stabHop("next")}>next &raquo;</a>
      </span>
      <span>
        Member of the <a href={LARP} target="_blank" rel="noopener noreferrer">larpring</a>:{" "}
        <a href={larpHop("prev")}>&laquo; prev</a> |{" "}
        <a href={`${LARP}/random/`}>random</a> |{" "}
        <a href={larpHop("next")}>next &raquo;</a>
      </span>
    </span>
  );
}
