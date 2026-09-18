export default function SectionHeading({
  label,
  title,
  intro,
  id,
}: {
  label: string;
  title: string;
  intro?: string;
  id: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}
