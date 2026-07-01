const RING = "https://larpring.github.io";
const ME = "arsh";
const hop = (dir: string) => `${RING}/go.html?from=${ME}&dir=${dir}`;

export default function Webring() {
  return (
    <p>
      <a href={RING} target="_blank" rel="noopener noreferrer" aria-label="larpring webring">
        <img className="larpring-badge larpring-badge-dark" src={`${RING}/badge.svg`} width={88} height={31} alt="larpring webring badge" />
        <img className="larpring-badge larpring-badge-light" src={`${RING}/badge-light.svg`} width={88} height={31} alt="larpring webring badge" />
      </a>
      <br />
      Member of the <a href={RING} target="_blank" rel="noopener noreferrer">larpring webring</a>:{" "}
      <a href={hop("prev")}>&laquo; prev</a> |{" "}
      <a href={`${RING}/random/`}>random</a> |{" "}
      <a href={hop("next")}>next &raquo;</a>
    </p>
  );
}
