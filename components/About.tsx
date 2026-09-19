import type { Content } from "@/content/site";
import SectionHeading from "./SectionHeading";

export default function About({ text }: { text: Content["about"] }) {
  return (
    <section
      id="about"
      className="section-shell section-space about-section"
      aria-labelledby="about-title"
      tabIndex={-1}
    >
      <SectionHeading id="about-title" label={text.label} title={text.title} />
      <div className="about-grid">
        <div className="about-copy">
          <p className="about-lead">{text.intro}</p>
          {text.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="about-context">
          <div className="current-work">
            <h3>{text.currentTitle}</h3>
            {text.current.map((item) => (
              <div key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <div className="languages">
            <h3>{text.languagesTitle}</h3>
            <dl>
              {text.languages.map((language) => (
                <div key={language.name}>
                  <dt>{language.name}</dt>
                  <dd>{language.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
