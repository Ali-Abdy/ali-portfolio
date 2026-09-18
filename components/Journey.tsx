import type { Content } from "@/content/site";
import SectionHeading from "./SectionHeading";
export default function Journey({ text }: { text: Content["journey"] }) {
  return (
    <section
      id="journey"
      className="section-shell section-space journey-grid"
      aria-labelledby="journey-title"
    >
      <SectionHeading
        id="journey-title"
        label={text.label}
        title={text.title}
        intro={text.intro}
      />
      <ol className="timeline">
        {text.items.map((item) => (
          <li key={item.title}>
            <span className="timeline-dot" />
            <p className="eyebrow">{item.label}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
