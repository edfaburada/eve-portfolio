import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      // Active section detection
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize ≥ 720px
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 720) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <nav className="navbar container">
        <a href="#home" className="logo" onClick={close}>
          Eve<span>.</span>Portfolio
        </a>

        {/* Desktop links */}
        <ul className={`nav-links${open ? " open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={active === link.href.slice(1) ? "active" : ""}
                onClick={close}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="/resume.pdf" download className="btn btn-primary btn-sm nav-cta">
          Download CV
        </a>

        {/* Hamburger */}
        <button
          className={`hamburger${open ? " open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;