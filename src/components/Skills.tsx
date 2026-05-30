import { useEffect, useRef } from "react";

const TECH_SKILLS = [
  { name: "HTML / CSS", pct: 90 },
  { name: "JavaScript", pct: 75 },
  { name: "React / TypeScript", pct: 65 },
  { name: "PHP / MySQL", pct: 60 },
  { name: "WordPress", pct: 70 },
  { name: "Figma / UI Design", pct: 80 },
];

const SOFT_SKILLS = [
  "Communication",
  "Teamwork",
  "Problem-solving",
  "Time Management",
  "Adaptability",
  "Customer Service",
  "Detail-oriented",
  "Fast learner",
];

const Skills = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const bars = ref.current?.querySelectorAll<HTMLElement>(".skill-bar-fill");
    const reveals = ref.current?.querySelectorAll<HTMLElement>(".reveal");

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
            // Also animate bars once section is visible
            bars?.forEach((b) => b.classList.add("animated"));
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );

    reveals?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section" id="skills" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">Expertise</p>
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">
            Technical and soft skills that I use in my work.
          </p>
        </div>

        <div className="skills-layout">
          {/* Technical Skills */}
          <div className="skills-card reveal reveal-delay-1">
            <h3 className="skills-card-title">⚙️ Technical Skills</h3>
            {TECH_SKILLS.map((skill) => (
              <div className="skill-item" key={skill.name}>
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-pct">{skill.pct}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${skill.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <div className="skills-card reveal reveal-delay-2">
            <h3 className="skills-card-title">🤝 Soft Skills</h3>
            <div className="soft-skills-wrap">
              {SOFT_SKILLS.map((s) => (
                <span key={s} className="soft-skill-pill">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;