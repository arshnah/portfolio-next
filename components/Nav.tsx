import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav>
      <div className="row">
        <a className="logo" href="#top">arsh<span>nah</span></a>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#activity">00 / activity</a>
            <a href="#builds">01 / builds</a>
            <a href="#stack">02 / stack</a>
            <a href="#guestbook">03 / guestbook</a>
            <a href="#contact">04 / contact</a>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
