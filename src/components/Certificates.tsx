import { useEffect, useRef } from "react";

const CARDS = [
  {
    icon: "👩‍💻",
    title: "Who I Am",
    content: (
      <p>
        I'm an aspiring IT professional and web developer with experience in
        building websites, designing systems, and providing technical support. I
        enjoy creating clean and functional designs that are easy to use.
      </p>
    ),
    delay: "reveal-delay-1",
  },
  {
    icon: "🎓",
    title: "Education",
    content: (
      <>
        <p><strong>Diploma in Information Technology</strong></p>
        <p>Asian College, Dumaguete City</p>
        <p>3rd Year Diploma Student (2022–2025)</p>
      </>
    ),
    delay: "reveal-delay-2",
  },
  {
    icon: "🎯",
    title: "Career Goal",
    content: (
      <p>
        My goal is to grow in web development and IT support while building
        real-world projects that help businesses and communities thrive.
      </p>
    ),
    delay: "reveal-delay-3",
  },
  {
    icon: "⚡",
    title: "Quick Facts",
    content: (
      <ul>
        {["Detail-oriented", "Fast learner", "Strong communication", "Team player", "Creative problem-solver"].map(
          (f) => <li key={f}>{f}</li>
        )}
      </ul>
    ),
    delay: "reveal-delay-4",
  },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">About</p>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">A quick introduction about who I am and what I do.</p>
        </div>

        <div className="about-grid about-grid-2col">
          {CARDS.map((card) => (
            <div key={card.title} className={`about-card reveal ${card.delay}`}>
              <div className="about-card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              {card.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;