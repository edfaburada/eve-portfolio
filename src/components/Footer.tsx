const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <span className="footer-logo">Eve.Portfolio</span>

          <p className="footer-copy">© {year} Evelyn Faburada. All Rights Reserved.</p>

          <nav className="footer-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;