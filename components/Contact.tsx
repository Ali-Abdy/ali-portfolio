import { profile, type Content } from "@/content/site";
import ExternalLink from "./ExternalLink";
import CopyEmail from "./CopyEmail";
import PrintProfile from "./PrintProfile";
import { Icon } from "./Icons";

export default function Contact({ text }: { text: Content["contact"] }) {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
      tabIndex={-1}
    >
      <div className="section-shell section-space contact-grid">
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
          </a>
          <div className="contact-actions">
            <a
              className="button button-primary"
              href={`mailto:${profile.email}?subject=${encodeURIComponent(text.subject)}`}
            >
              <Icon name="mail" />
              {text.email}
            </a>
            <CopyEmail
              email={profile.email}
              text={{
                copy: text.copy,
                copied: text.copied,
                success: text.copySuccess,
                failure: text.copyFailure,
              }}
            />
          </div>
        </div>
        <div className="contact-details">
          <p className="contact-location">
            <Icon name="pin" width="18" height="18" />
            {text.location}
          </p>
          <h3>{text.profiles}</h3>
          <ExternalLink href={profile.github}>
            GitHub
            <Icon name="external" width="16" height="16" />
          </ExternalLink>
          <ExternalLink href={profile.linkedin}>
            LinkedIn
            <Icon name="external" width="16" height="16" />
          </ExternalLink>
          <PrintProfile label={text.print} hint={text.printHint} />
        </div>
      </div>
    </section>
  );
}
