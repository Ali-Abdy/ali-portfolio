import type { Content } from "@/content/site";
import SectionHeading from "./SectionHeading";
export default function About({ text }: { text: Content["about"] }) {
  return (
    <section
      id="about"
      className="section-shell section-space about-grid"
      aria-labelledby="about-title"
    >
      <SectionHeading
        id="about-title"
        label={text.label}
        title={text.title}
        intro={text.intro}
      />
      <div className="about-copy">
        {text.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="about-note">{text.note}</p>
        <div className="languages">
          <h3>{text.languagesTitle}</h3>
          <dl>
            {text.languages.map((language) => (
              <div key={language.name}>
                <dt>{language.name}</dt>
                {language.level && <dd>{language.level}</dd>}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
