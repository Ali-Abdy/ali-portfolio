import Image from "next/image";
import type { Content } from "@/content/site";
import { profile } from "@/content/site";
import { Icon } from "./Icons";
import ExternalLink from "./ExternalLink";

export default function Hero({ text }: { text: Content["hero"] }) {
  return (
    <section
      id="home"
      className="hero section-shell"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="small-line" />
          {text.eyebrow}
        </p>
        <p className="hero-greeting">{text.greeting}</p>
        <h1 id="hero-title">{text.title}</h1>
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
          <ExternalLink href={profile.github} aria-label="Ali Abdi – GitHub">
            <Icon name="github" />
            GitHub
          </ExternalLink>
          <ExternalLink
            href={profile.linkedin}
            aria-label="Ali Abdi – LinkedIn"
          >
            LinkedIn
            <Icon name="external" width="15" height="15" />
          </ExternalLink>
          {profile.cv ? (
            <a href={profile.cv} download className="cv-link">
              <Icon name="download" />
              {text.cv}
            </a>
          ) : (
            <span className="cv-pending">
              <button disabled aria-describedby="cv-status">
                <Icon name="download" />
                {text.cv}
              </button>
              <span id="cv-status">{text.cvPending}</span>
            </span>
          )}
        </div>
      </div>
      <figure className="hero-portrait">
        <div className="portrait-frame">
          <Image
            src="/profile.webp"
            alt={text.portraitAlt}
            width={800}
            height={800}
            preload
            sizes="(max-width: 767px) 85vw, (max-width: 1100px) 38vw, 420px"
            className="portrait-image"
          />
          <div className="portrait-caption">
            <span className="status-dot" />
            {text.availability}
          </div>
        </div>
        <figcaption>
          <span>
            <Icon name="pin" width="16" height="16" />
            {text.location}
          </span>
          <span className="portrait-coordinate" aria-hidden="true">
            DE / SL
          </span>
        </figcaption>
      </figure>
      <div className="hero-baseline">
        <span>Ali Abdi / Portfolio</span>
        <span>{text.caption}</span>
      </div>
    </section>
  );
}
