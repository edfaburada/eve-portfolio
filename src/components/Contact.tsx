import { useEffect, useRef, useState } from "react";

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    // In production, wire this to EmailJS, Resend, or a Supabase function
    setSubmitted(true);
  };

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">Get in Touch</p>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle">
            Let's connect! You can reach me using the form below.
          </p>
        </div>

        <div className="contact-layout">
          {/* FORM */}
          <div className="contact-form-card reveal reveal-delay-1">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "var(--space-7) 0" }}>
                <p style={{ fontSize: "2rem", marginBottom: "var(--space-3)" }}>✅</p>
                <p style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--burgundy)" }}>
                  Message sent!
                </p>
                <p style={{ color: "var(--text-muted)", marginTop: "var(--space-2)" }}>
                  Thanks for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input"
                    placeholder="Write your message..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  className="btn btn-primary form-submit"
                  onClick={handleSubmit}
                >
                  Send Message →
                </button>
              </>
            )}
          </div>

          {/* INFO */}
          <div className="contact-info-card reveal reveal-delay-2">
            <h3 className="contact-info-title" style={{ textAlign: "center" }}>
             My Details
            </h3>

            <div className="contact-info-row">
              <div className="contact-info-icon">📧</div>
              <div className="contact-info-text">
                <span className="contact-info-key">Email</span>
                <span className="contact-info-val">evedagle07@email.com</span>
              </div>
            </div>

            <div className="contact-info-row">
              <div className="contact-info-icon">📍</div>
              <div className="contact-info-text">
                <span className="contact-info-key">Location</span>
                <span className="contact-info-val">Dumaguete City, Philippines</span>
              </div>
            </div>

            <div className="contact-socials">
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
            </div>

            <div className="contact-map">
              <iframe
                title="Dumaguete City Map"
                src="https://maps.google.com/maps?q=Dumaguete+City,+Philippines&output=embed"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;