import type { Project } from "../types/Project";
// services/supabaseClient doesn't export getImageUrl —
// provide a small local resolver that returns the provided image string
// or undefined so the component can fall back to the placeholder.
const getImageUrl = (image?: string | null) => {
  if (!image) return undefined;
  return image;
};

// Placeholder shown when no image is available
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='375' viewBox='0 0 600 375'%3E%3Crect width='600' height='375' fill='%23ffe4e1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23a14b58'%3ENo Preview%3C/text%3E%3C/svg%3E";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  // Resolve whatever is stored in `image` → a displayable URL
  const imgSrc = getImageUrl(project.image) || PLACEHOLDER;

  return (
    <article className="project-card">
      <div className="project-img-wrap">
        <img
          src={imgSrc}
          alt={project.title}
          loading="lazy"
          onError={(e) => {
            // If the URL 404s, fall back to the placeholder silently
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
          }}
        />

        {/* Hover overlay with action buttons */}
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