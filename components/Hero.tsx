import Image from "next/image";
import { profile, type Content } from "@/content/site";
import { Icon } from "./Icons";
import ExternalLink from "./ExternalLink";
import RotatingTypewriter from "./RotatingTypewriter";

export default function Hero({ text }: { text: Content["hero"] }) {
  return (
    <section
      id="home"
      className="hero section-shell"
      aria-labelledby="hero-title"
      tabIndex={-1}
    >
      <div className="hero-copy">
        <p className="eyebrow">{text.eyebrow}</p>
        <h1 id="hero-title">
          Ali Abdi<span aria-hidden="true">.</span>
        </h1>
        <p className="hero-identity">{text.identity}</p>
        <RotatingTypewriter
          key={text.typewriterPhrases.join("|")}
          label={text.typewriterLabel}
          phrases={text.typewriterPhrases}
        />
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            {text.projects}
            <Icon name="arrow" />
          </a>
          <a className="button button-secondary" href="#contact">
            {text.contact}
          </a>
        </div>
        <div className="hero-links">
          <ExternalLink href={profile.github}>
            <Icon name="github" />
            GitHub
            <Icon name="external" width="14" height="14" />
          </ExternalLink>
          <a
            href={
              profile.cv ??
              `mailto:${profile.email}?subject=${encodeURIComponent(text.cvSubject)}`
            }
            download={profile.cv ? true : undefined}
          >
            <Icon name={profile.cv ? "download" : "mail"} />
            {profile.cv ? text.cv : text.cvRequest}
          </a>
        </div>
      </div>
      <figure className="hero-avatar">
        <Image
          src="/ali-avatar.png"
          alt={text.portraitAlt}
          width={1024}
          height={1536}
          preload
          sizes="(max-width: 599px) min(76vw, 320px), (max-width: 900px) 38vw, 460px"
          className="avatar-image"
        />
      </figure>
      <dl className="profile-facts">
        {text.facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
