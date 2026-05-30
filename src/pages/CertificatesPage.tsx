import { useEffect, useRef, useState } from "react";
import { fetchCertificates, getImageUrl } from "../services/supabaseClient";

interface Cert { id: number; name: string; date: string; issuer: string; image: string; }

const STATIC_CERTS: Cert[] = [
  { id: 1, image: "/images/cert1.png", name: "Front End Development Libraries",          date: "June 9, 2025",   issuer: "freeCodeCamp" },
  { id: 2, image: "/images/cert2.png", name: "JavaScript Algorithms and Data Structures",date: "June 14, 2025",  issuer: "freeCodeCamp" },
  { id: 3, image: "/images/cert3.png", name: "Responsive Web Design",                    date: "April 12, 2025", issuer: "freeCodeCamp" },
];

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'%3E%3Crect width='600' height='450' fill='%23ffe4e1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23a14b58'%3ENo Image%3C/text%3E%3C/svg%3E";

const CertificatesPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [certs, setCerts] = useState<Cert[]>(STATIC_CERTS);

  useEffect(() => {
    fetchCertificates()
      .then((data) => { if (data.length > 0) setCerts(data); })
      .catch(() => {/* use static */});
  }, []);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { (e.target as HTMLElement).classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [certs]);

  return (
    <div className="page-wrapper" ref={ref}>
      <div className="page-hero">
        <div className="container">
          <p className="section-eyebrow reveal">Achievements</p>
          <h1 className="page-title reveal reveal-delay-1">Certificates</h1>
          <p className="page-subtitle reveal reveal-delay-2">Certifications and achievements I've earned.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="cert-grid">
            {certs.map((cert, i) => (
              <article key={cert.id} className={`cert-card reveal reveal-delay-${((i % 3) + 1) as 1|2|3}`}>
                <div className="cert-img-wrap">
                  <img
                    src={getImageUrl(cert.image) || PLACEHOLDER}
                    alt={cert.name}
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER; }}
                  />
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
    </div>
  );
};

export default CertificatesPage;