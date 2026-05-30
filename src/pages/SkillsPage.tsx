import { useEffect, useRef, useState } from "react";
import { fetchSkills } from "../services/supabaseClient";

interface Skill { id: number; name: string; percentage: number; type: "technical" | "soft"; }

const STATIC_TECH: Skill[] = [
  { id: 1, name: "HTML / CSS",           percentage: 90, type: "technical" },
  { id: 2, name: "JavaScript",           percentage: 75, type: "technical" },
  { id: 3, name: "React / TypeScript",   percentage: 65, type: "technical" },
  { id: 4, name: "PHP / MySQL",          percentage: 60, type: "technical" },
  { id: 5, name: "WordPress",            percentage: 70, type: "technical" },
  { id: 6, name: "Figma / UI Design",    percentage: 80, type: "technical" },
];

const STATIC_SOFT: Skill[] = [
  { id: 7,  name: "Communication",   percentage: 0, type: "soft" },
  { id: 8,  name: "Teamwork",        percentage: 0, type: "soft" },
  { id: 9,  name: "Problem-solving", percentage: 0, type: "soft" },
  { id: 10, name: "Time Management", percentage: 0, type: "soft" },
  { id: 11, name: "Adaptability",    percentage: 0, type: "soft" },
  { id: 12, name: "Customer Service",percentage: 0, type: "soft" },
  { id: 13, name: "Detail-oriented", percentage: 0, type: "soft" },
  { id: 14, name: "Fast learner",    percentage: 0, type: "soft" },
];

const SkillsPage = () => {
  const ref  = useRef<HTMLDivElement>(null);
  const [tech, setTech] = useState<Skill[]>(STATIC_TECH);
  const [soft, setSoft] = useState<Skill[]>(STATIC_SOFT);

  useEffect(() => {
    fetchSkills()
      .then((data: Skill[]) => {
        const t = data.filter((s) => s.type === "technical");
        const s = data.filter((s) => s.type === "soft");
        if (t.length) setTech(t);
        if (s.length) setSoft(s);
      })
      .catch(() => {/* use static fallback */});
  }, []);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".reveal");
    const bars = ref.current?.querySelectorAll<HTMLElement>(".skill-bar-fill");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("visible");
          bars?.forEach((b) => b.classList.add("animated"));
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [tech]);

  return (
    <div className="page-wrapper" ref={ref}>
      <div className="page-hero">
        <div className="container">
          <p className="section-eyebrow reveal">Expertise</p>
          <h1 className="page-title reveal reveal-delay-1">Skills</h1>
          <p className="page-subtitle reveal reveal-delay-2">Technical and soft skills I use in my work.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="skills-layout">
            {/* Technical */}
            <div className="skills-card reveal reveal-delay-1">
              <h3 className="skills-card-title">⚙️ Technical Skills</h3>
              {tech.map((skill) => (
                <div className="skill-item" key={skill.id}>
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-pct">{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: `${skill.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Soft */}
            <div className="skills-card reveal reveal-delay-2">
              <h3 className="skills-card-title">🤝 Soft Skills</h3>
              <div className="soft-skills-wrap">
                {soft.map((s) => (
                  <span key={s.id} className="soft-skill-pill">{s.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsPage;