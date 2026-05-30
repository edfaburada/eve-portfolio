import { useEffect, useRef } from "react";
import evePic from "../assets/eve-pic.png";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="hero-section" id="home" ref={ref}>
      <div className="hero-bg" />
      <div className="container">
        <div className="hero-grid">
          {/* TEXT */}
          <div className="hero-text-col">
            <p className="hero-eyebrow reveal">
              <span>👋</span> Hello, I'm
            </p>

            <h1 className="hero-name reveal reveal-delay-1">Evelyn</h1>

            <p className="hero-role reveal reveal-delay-2">
              <strong>Web Developer</strong> · IT Support · Creative Professional
            </p>

            <p className="hero-desc reveal reveal-delay-3">
              I create clean, user-friendly websites and digital systems.
              Passionate about building projects that solve real problems and look
              professional on every screen.
            </p>

            <div className="hero-actions reveal reveal-delay-4">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="/resume.pdf" download className="btn btn-secondary">
                Download Resume
              </a>
              <a href="#contact" className="btn btn-ghost">Contact Me</a>
            </div>

            <div className="hero-stats reveal reveal-delay-4">
              <div>
                <span className="hero-stat-num">3+</span>
                <span className="hero-stat-label">Projects</span>
              </div>
              <div>
                <span className="hero-stat-num">3</span>
                <span className="hero-stat-label">Certificates</span>
              </div>
              <div>
                <span className="hero-stat-num">2026</span>
                <span className="hero-stat-label">Graduate</span>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="hero-image-wrap reveal reveal-delay-2">
            <div className="hero-image-ring">
              <img src={evePic} alt="Evelyn Faburada" className="profile-photo" />
            </div>

            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Open to work
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;