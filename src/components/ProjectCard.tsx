import type { Project } from "../types/Project";
import { getImageUrl } from "../services/supabaseClient";
import { useState } from "react";

// Placeholder shown when no image is available
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='375' viewBox='0 0 600 375'%3E%3Crect width='600' height='375' fill='%23ffe4e1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23a14b58'%3ENo Preview%3C/text%3E%3C/svg%3E";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  const imgSrc = getImageUrl(project.image) || PLACEHOLDER;

  return (
    <>
      {/* PROJECT CARD */}
      <article className="project-card">
        <div className="project-img-wrap">
          <img
            src={imgSrc}
            alt={project.title}
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
            }}
          />
        </div>

        <div className="project-body">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>

          {project.tech && project.tech.length > 0 && (
            <div className="project-tags">
              {project.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="project-actions">
          <a href={imgSrc} className="btn btn-primary btn-sm">
            View Project
          </a>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowDetails(true)}
          >
            Details
          </button>
        </div>
      </article>

      {/* FLOATING MODAL */}
      {showDetails && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="floating-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TITLE */}
            <h2>{project.title}</h2>

            {/* DESCRIPTION (MAIN CONTENT) */}
            <p className="project-desc">
              {project.description}
            </p>

            {/* TECH STACK */}
            {project.tech && project.tech.length > 0 && (
              <div className="project-tags">
                {project.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* CLOSE BUTTON */}
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowDetails(false)}
              style={{ marginTop: "1rem" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;