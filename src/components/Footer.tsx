import { NavLink } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
        <NavLink to="/" className="logo" onClick={close}>
          Eve<span></span>Portfolio
        </NavLink>

          <p className="footer-copy">© {year} Evelyn Faburada. All Rights Reserved.</p>

          <nav className="footer-links">
            <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                📘 Facebook
              </a>
              <a
                href="mailto:evedagle07@email.com"
                className="social-link"
              > 
                ✉️ Gmail
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                🐙 GitHub
              </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;