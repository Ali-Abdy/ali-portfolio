import type { Project } from "@/content/projects";
import type { Content, Locale } from "@/content/site";
import ExternalLink from "./ExternalLink";
import { Icon } from "./Icons";

export default function ProjectCard({
  project,
  lang,
  labels,
  index,
}: {
  project: Project;
  lang: Locale;
  labels: Content["projects"];
  index: number;
}) {
  const text = project.text[lang];
  return (
    <article
      id={project.slug}
      className="project"
      aria-labelledby={`${project.slug}-title`}
      tabIndex={-1}
    >
      <header className="project-header">
        <div className="project-identity">
          <span className="project-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="project-category">{text.category}</p>
            <h3 id={`${project.slug}-title`}>
              <a
                href={`#${project.slug}`}
                aria-label={`${project.title} – ${labels.permalink}`}
              >
                {project.title}
                <Icon name="link" width="18" height="18" />
              </a>
            </h3>
          </div>
        </div>
        <span className="project-status">{text.status}</span>
      </header>
      <div className="project-body">
        <div className="project-overview">
          <p className="project-summary">{text.summary}</p>
          <ul className="technology-list" aria-label={labels.stack}>
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <div className="project-links">
            <ExternalLink
              href={project.github}
              className="text-link"
              aria-label={`${project.title} – ${labels.source}`}
            >
              {labels.source}
              <Icon name="external" width="16" height="16" />
            </ExternalLink>
            {project.live && (
              <ExternalLink href={project.live} className="text-link">
                {labels.demo}
                <Icon name="external" width="16" height="16" />
              </ExternalLink>
            )}
          </div>
        </div>
        <div className="project-scope">
          <h4>{labels.features}</h4>
          <ul className="project-features">
            {text.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
      <details className="project-details" data-print-expand>
        <summary>
          {labels.details}
          <span className="sr-only">: {project.title}</span>
          <Icon name="plus" width="18" height="18" />
        </summary>
        <div className="project-detail-grid">
          <div>
            <h4>{labels.learning}</h4>
            <p>{text.learning}</p>
          </div>
          <div>
            <h4>{labels.next}</h4>
            <p>{text.note}</p>
          </div>
        </div>
      </details>
      <p className="print-source">{project.github}</p>
    </article>
  );
}
