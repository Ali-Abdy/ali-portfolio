import Image from "next/image";
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
      className={`project-card ${project.featured ? "project-featured" : "project-compact"}`}
      aria-labelledby={`${project.slug}-title`}
    >
      {project.image && (
        <figure className="project-visual">
          <div className="project-image-wrap">
            <Image
              src={project.image}
              alt={text.imageAlt}
              fill
              sizes="(max-width: 767px) 100vw, 55vw"
            />
            <div className="project-image-brand" aria-hidden="true">
              <span>L / B</span>
              <span>
                Luxury
                <br />
                Barbershop
              </span>
            </div>
          </div>
          <figcaption>{text.imageCaption}</figcaption>
        </figure>
      )}
      <div className="project-content">
        <div className="project-topline">
          <span className="project-number">
            0{index + 1} {project.featured && ` / ${labels.featured}`}
          </span>
          <span className="project-status">{text.status}</span>
        </div>
        <p className="project-category">{text.category}</p>
        <h3 id={`${project.slug}-title`}>
          {project.title}
          <span aria-hidden="true">.</span>
        </h3>
        <p className="project-summary">{text.summary}</p>
        <ul className="tags project-tags">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <ul className="project-features" aria-label={labels.features}>
          {text.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="project-learning">
          <h4>{labels.learning}</h4>
          <p>{text.learning}</p>
        </div>
        <p className="project-note">{text.note}</p>
        <div className="project-links">
          <ExternalLink
            href={project.github}
            className="text-link"
            aria-label={`${project.title} – ${labels.source} (GitHub)`}
          >
            {labels.source}
            <Icon name="external" width="16" height="16" />
          </ExternalLink>
          {project.live && (
            <ExternalLink
              href={project.live}
              className="text-link"
              aria-label={`${project.title} – ${labels.demo}`}
            >
              {labels.demo}
              <Icon name="arrow" />
            </ExternalLink>
          )}
        </div>
      </div>
    </article>
  );
}
