import type { Project } from "../types/Project";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <article className="project-card">
      <div className="project-img-wrap">
        {project.image && (
          <img src={project.image} alt={project.title} loading="lazy" />
        )}
        {/* Hover overlay */}
        <div className="project-img-overlay">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
            >
              Live ↗
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
            >
              Demo
            </a>
          )}
        </div>
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        {project.tech && project.tech.length > 0 && (
          <div className="project-tags">
            {project.tech.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}
      </div>

      <div className="project-actions">
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm"
          >
            View Project
          </a>
        )}
        <a href="#contact" className="btn btn-secondary btn-sm">
          Details
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;