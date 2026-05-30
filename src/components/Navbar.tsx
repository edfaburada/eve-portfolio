import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/about",        label: "About" },
  { to: "/projects",     label: "Projects" },
  { to: "/skills",       label: "Skills" },
  { to: "/certificates", label: "Certificates" },
  { to: "/contact",      label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 720) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <nav className="navbar container">
        <NavLink to="/" className="logo" onClick={close}>
          Eve<span>.</span>Portfolio
        </NavLink>

        {/* Desktop + mobile nav links */}
        <ul className={`nav-links${open ? " open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={close}
              >
                {link.label}
              </NavLink>
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
          <span /><span /><span />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;