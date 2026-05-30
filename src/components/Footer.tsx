import { NavLink } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <span className="footer-logo">Eve.Portfolio</span>

          <p className="footer-copy">© {year} Evelyn Faburada. All Rights Reserved.</p>

          <nav className="footer-links">
            <NavLink to="/about">About</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

