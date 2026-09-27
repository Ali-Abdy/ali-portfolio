import type { Content } from "@/content/site";
import SectionHeading from "./SectionHeading";
import ExternalLink from "./ExternalLink";
import { Icon } from "./Icons";

export default function Skills({ text }: { text: Content["skills"] }) {
  return (
    <section
      id="skills"
      className="skills-section"
      aria-labelledby="skills-title"
      tabIndex={-1}
    >
      <div className="section-shell section-space">
        <SectionHeading
          id="skills-title"
          label={text.label}
          title={text.title}
          intro={text.intro}
        />
        <div className="skills-list">
          {text.groups.map((group) => (
            <div className="skill-row" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skill-description">
                <p>{group.description}</p>
                {group.evidence.href.startsWith("#") ? (
                  <a href={group.evidence.href} className="text-link">
                    {group.evidence.label}
                    <Icon name="arrow" width="16" height="16" />
                  </a>
                ) : (
                  <ExternalLink
                    href={group.evidence.href}
                    className="text-link"
                  >
                    {group.evidence.label}
                    <Icon name="external" width="16" height="16" />
                  </ExternalLink>
                )}
              </div>
              <ul className="technology-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
