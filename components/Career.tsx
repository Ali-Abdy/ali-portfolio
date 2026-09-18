import type { Content } from "@/content/site";
export default function Career({ text }: { text: Content["career"] }) {
  return (
    <section
      id="career"
      className="section-shell career-section"
      aria-labelledby="career-title"
    >
      <div className="career-card">
        <div>
          <p className="eyebrow">{text.label}</p>
          <h2 id="career-title">{text.title}</h2>
        </div>
        <div>
          <p>{text.description}</p>
          <ul className="tags">
            {text.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
