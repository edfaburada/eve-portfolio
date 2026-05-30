import { useEffect, useRef, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { fetchProjects } from "../services/supabaseClient";
import type { Project } from "../types/Project";

const FILTERS = ["All", "Web Development", "Systems", "UI/UX"];

const DEMO_PROJECTS: Project[] = [
  { id: 101, title: "Interactive Portfolio Prototype", description: "A prototype portfolio design built in Figma showcasing personal branding, project highlights, and responsive layout concepts.", image: "/images/project-portfolio.png", category: "UI/UX", tech: ["Figma", "UI/UX"], live_url: "#" },
  { id: 102, title: "SIL Monitoring System", description: "An online web-based system for monitoring supervised industry learning (SIL) activities and student progress records.", image: "/images/project-sil.png", category: "Systems", tech: ["PHP", "MySQL", "HTML", "CSS"], live_url: "#" },
  { id: 103, title: "Coffee Shop UI/UX Design", description: "A clean and modern UI/UX design for a coffee shop online platform, including menu browsing and order flow screens.", image: "/images/project-coffee.png", category: "UI/UX", tech: ["Figma", "UI/UX"], live_url: "#" },
  { id: 104, title: "Personal Portfolio Website", description: "A fully responsive personal portfolio website built with React and TypeScript, connected to Supabase for dynamic project data.", image: "/images/project-portfolio-web.png", category: "Web Development", tech: ["React", "TypeScript", "Supabase", "CSS"], live_url: "#" },
  { id: 105, title: "Enrollment Information System", description: "A school enrollment system for Asian College featuring student registration, subject management, and login authentication.", image: "/images/project-eis.png", category: "Systems", tech: ["PHP", "MySQL", "Bootstrap"], live_url: "#" },
  { id: 106, title: "Responsive Landing Page", description: "A pixel-perfect responsive landing page for a local business, optimised for mobile-first performance and clean visual hierarchy.", image: "/images/project-landing.png", category: "Web Development", tech: ["HTML", "CSS", "JavaScript"], live_url: "#" },
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive]     = useState("All");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data.length > 0 ? data : DEMO_PROJECTS))
      .catch(() => setProjects(DEMO_PROJECTS));
  }, []);

  const allProjects = projects.length > 0 ? projects : DEMO_PROJECTS;
  const filtered    = active === "All" ? allProjects : allProjects.filter((p) => p.category === active);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filtered]);

  return (
    <div className="page-wrapper" ref={ref}>
      <div className="page-hero">
        <div className="container">
          <p className="section-eyebrow reveal">Portfolio</p>
          <h1 className="page-title reveal reveal-delay-1">Projects</h1>
          <p className="page-subtitle reveal reveal-delay-2">Some of my works and sample projects.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="filter-bar reveal">
            {FILTERS.map((f) => (
              <button key={f} className={`filter-btn${active === f ? " active" : ""}`} onClick={() => setActive(f)}>{f}</button>
            ))}
          </div>
          <div className="projects-grid">
            {filtered.map((project, i) => (
              <div key={project.id} className={`reveal reveal-delay-${((i % 3) + 1) as 1|2|3}`}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;