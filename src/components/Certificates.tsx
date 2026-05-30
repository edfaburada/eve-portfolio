import { useEffect, useRef } from "react";

const CERTS = [
  {
    img: "CERTIFICATION of Front End Development Libraries_FABURADA.png",
    name: "Front End Development Libraries",
    date: "June 9, 2025",
    issuer: "freeCodeCamp",
  },
  {
    img: "CERTIFICATION of JavaScript Algorithms and Data Structures_FABURADA.png",
    name: "JavaScript Algorithms and Data Structures",
    date: "June 14, 2025",
    issuer: "freeCodeCamp",
  },
  {
    img: "CERTIFICATION of Responsive Web Design_FABURADA.png",
    name: "Responsive Web Design",
    date: "April 12, 2025",
    issuer: "freeCodeCamp",
  },
];

const Certificates = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section alt" id="certificates" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">Achievements</p>
          <h2 className="section-title">Certificates</h2>
          <p className="section-subtitle">Certifications and achievements I've earned.</p>
        </div>

        <div className="cert-grid">
          {CERTS.map((cert, i) => (
            <article
              key={cert.name}
              className={`cert-card reveal reveal-delay-${(i + 1) as 1 | 2 | 3}`}
            >
              <div className="cert-img-wrap">
                <img src={cert.img} alt={`Certificate: ${cert.name}`} loading="lazy" />
              </div>
              <div className="cert-body">
                <p className="cert-name">CERTIFICATION of {cert.name}</p>
                <p className="cert-date">📅 {cert.date} · {cert.issuer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;