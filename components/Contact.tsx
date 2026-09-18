import { profile, type Content } from "@/content/site";
import ExternalLink from "./ExternalLink";
import { Icon } from "./Icons";
export default function Contact({ text }: { text: Content["contact"] }) {
  return (
    <section
      id="contact"
      className="section-shell section-space contact-section"
      aria-labelledby="contact-title"
    >
      <div>
        <p className="eyebrow">{text.label}</p>
        <h2 id="contact-title" className="section-title">
          {text.title}
        </h2>
        <p className="section-intro">{text.description}</p>
        <a
          className="contact-email"
          href={`mailto:${profile.email}`}
          aria-label={`${text.email}: ${profile.email}`}
        >
          {profile.email}
          <Icon name="arrow" />
        </a>
      </div>
      <div className="contact-details">
        <p>
          <Icon name="pin" />
          {text.location}
        </p>
        <ExternalLink href={profile.github} aria-label="Ali Abdi – GitHub">
          GitHub
          <Icon name="external" width="16" height="16" />
        </ExternalLink>
        <ExternalLink href={profile.linkedin} aria-label="Ali Abdi – LinkedIn">
          LinkedIn
          <Icon name="external" width="16" height="16" />
        </ExternalLink>
      </div>
    </section>
  );
}
