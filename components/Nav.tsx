import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav>
      <div className="row">
        <a className="logo" href="#top">arsh<span>nah</span></a>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#builds">01 / work</a>
            <a href="#stack">02 / tools</a>
            <a href="#guestbook">03 / guestbook</a>
            <a href="#contact">04 / contact</a>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
