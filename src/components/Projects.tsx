import { useEffect, useRef, useState } from "react";
import { useProjects } from "../hooks/useProjects";
import ProjectCard from "./ProjectCard";
import type { Project } from "../types/Project";

const FILTERS = ["All", "Web Development", "Systems", "UI/UX"];

const DEMO_PROJECTS: Project[] = [
  {
    id: 101,
    title: "Interactive Portfolio Prototype",
    description:
      "A prototype portfolio design built in Figma showcasing personal branding, project highlights, and responsive layout concepts.",
    image: "/images/project-portfolio.png",
    category: "UI/UX",
    tech: ["Figma", "UI/UX"],
    live_url: "#",
  },
  {
    id: 102,
    title: "SIL Monitoring System",
    description:
      "An online web-based system for monitoring supervised industry learning (SIL) activities and student progress records.",
    image: "/images/project-sil.png",
    category: "Systems",
    tech: ["PHP", "MySQL", "HTML", "CSS"],
    live_url: "#",
  },
  {
    id: 103,
    title: "Coffee Shop UI/UX Design",
    description:
      "A clean and modern UI/UX design for a coffee shop online platform, including menu browsing and order flow screens.",
    image: "/images/project-coffee.png",
    category: "UI/UX",
    tech: ["Figma", "UI/UX"],
    live_url: "#",
  },
  {
    id: 104,
    title: "Personal Portfolio Website",
    description:
      "A fully responsive personal portfolio website built with React and TypeScript, connected to Supabase for dynamic project data.",
    image: "/images/project-portfolio-web.png",
    category: "Web Development",
    tech: ["React", "TypeScript", "Supabase", "CSS"],
    live_url: "#",
  },
  {
    id: 105,
    title: "Enrollment Information System",
    description:
      "A school enrollment system for Asian College featuring student registration, subject management, and login authentication.",
    image: "/images/project-eis.png",
    category: "Systems",
    tech: ["PHP", "MySQL", "Bootstrap"],
    live_url: "#",
  },
  {
    id: 106,
    title: "Responsive Landing Page",
    description:
      "A pixel-perfect responsive landing page for a local business, optimised for mobile-first performance and clean visual hierarchy.",
    image: "/images/project-landing.png",
    category: "Web Development",
    tech: ["HTML", "CSS", "JavaScript"],
    live_url: "#",
  },
];

const Projects = () => {
  const { projects } = useProjects();
  const [active, setActive] = useState("All");
  const ref = useRef<HTMLElement>(null);

  const allProjects: Project[] =
    projects.length > 0 ? projects : DEMO_PROJECTS;

  const filteredProjects =
    active === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === active);

  const groupedProjects =
    active === "All"
      ? FILTERS.filter((f) => f !== "All").map((category) => ({
          category,
          items: filteredProjects.filter((p) => p.category === category),
        }))
      : [
          {
            category: active,
            items: filteredProjects,
          },
        ];

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
  }, [allProjects]);

  return (
    <section className="section alt" id="projects" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">Portfolio</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Some of my works and sample projects.
          </p>
        </div>

        <div className="filter-bar reveal">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${active === f ? " active" : ""}`}
              onClick={() =>
                setActive((prev) => (prev === f ? "All" : f))
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {groupedProjects.map((group) =>
            group.items.map((project, i) => (
              <div
                key={project.id}
                className={`reveal reveal-delay-${
                  ((i % 3) + 1) as 1 | 2 | 3
                }`}
              >
                <ProjectCard project={project} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;