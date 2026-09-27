import { projects } from "@/content/projects";
import { profile, type Content, type Locale } from "@/content/site";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import ExternalLink from "./ExternalLink";
import { Icon } from "./Icons";

export default function Projects({
  text,
  lang,
}: {
  text: Content["projects"];
  lang: Locale;
}) {
  return (
    <section
      id="projects"
      className="section-shell section-space projects-section"
      aria-labelledby="projects-title"
      tabIndex={-1}
    >
      <SectionHeading
        id="projects-title"
        label={text.label}
        title={text.title}
        intro={text.intro}
      />
      <div className="projects-list">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            lang={lang}
            labels={text}
            index={index}
          />
        ))}
      </div>
      <ExternalLink className="text-link more-projects" href={profile.github}>
        {text.more}
        <Icon name="external" width="16" height="16" />
      </ExternalLink>
    </section>
  );
}
