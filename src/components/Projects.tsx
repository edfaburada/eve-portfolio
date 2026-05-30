import { useEffect, useRef, useState } from "react";
import { useProjects } from "../hooks/useProjects";
import ProjectCard from "./ProjectCard";

const FILTERS = ["All", "Web Development", "Systems", "UI/UX"];

const Projects = () => {
  const { projects, loading } = useProjects();
  const [active, setActive] = useState("All");
  const ref = useRef<HTMLElement>(null);

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

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
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [projects]);

  return (
    <section className="section alt" id="projects" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">Portfolio</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Some of my works and sample projects.</p>
        </div>

        <div className="filter-bar reveal">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${active === f ? " active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: "var(--text-muted)", padding: "var(--space-5) 0" }}>
            Loading projects…
          </p>
        ) : filtered.length === 0 ? (
          <p style={{ color: "var(--text-muted)", padding: "var(--space-5) 0" }}>
            No projects in this category yet.
          </p>
        ) : (
          <div className="projects-grid">
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className={`reveal reveal-delay-${Math.min(i + 1, 4) as 1 | 2 | 3 | 4}`}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;  