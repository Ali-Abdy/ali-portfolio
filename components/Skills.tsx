import type { Content } from "@/content/site";
import SectionHeading from "./SectionHeading";
import { Icon } from "./Icons";
const icons = ["code", "database", "tools"] as const;
export default function Skills({ text }: { text: Content["skills"] }) {
  return (
    <section
      id="skills"
      className="section-shell section-space ruled-section"
      aria-labelledby="skills-title"
    >
      <SectionHeading
        id="skills-title"
        label={text.label}
        title={text.title}
        intro={text.intro}
      />
      <div className="skills-grid">
        {text.groups.map((group, index) => (
          <div className="skill-group" key={group.title}>
            <div className="skill-heading">
              <Icon name={icons[index]} />
              <h3>{group.title}</h3>
            </div>
            <p>{group.description}</p>
            <ul className="tags">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
