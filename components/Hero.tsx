import Image from "next/image";
import { profile, type Content } from "@/content/site";
import { Icon } from "./Icons";
import ExternalLink from "./ExternalLink";
import HeroAntigravity from "./HeroAntigravity";

export default function Hero({ text }: { text: Content["hero"] }) {
  return (
    <section
      id="home"
      className="hero section-shell"
      aria-labelledby="hero-title"
      tabIndex={-1}
    >
      <HeroAntigravity />
      <div className="hero-copy">
        <p className="eyebrow">{text.eyebrow}</p>
        <h1 id="hero-title">
          Ali Abdi<span aria-hidden="true">.</span>
        </h1>
        <p className="hero-role">{text.title}</p>
        <p className="hero-description">{text.description}</p>
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
      <figure className="hero-portrait">
        <Image
          src="/profile.webp"
          alt={text.portraitAlt}
          width={800}
          height={800}
          preload
          sizes="(max-width: 599px) 112px, (max-width: 900px) 240px, 300px"
          className="portrait-image"
        />
        <figcaption>{text.availability}</figcaption>
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
