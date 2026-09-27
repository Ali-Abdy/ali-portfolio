import type { Content, Locale } from "@/content/site";
import { profile } from "@/content/site";
import type { LegalContact } from "@/lib/legal";
import ExternalLink from "./ExternalLink";

type LegalKind = "legal" | "privacy";

export default function LegalDocument({
  lang,
  kind,
  text,
  contact,
}: {
  lang: Locale;
  kind: LegalKind;
  text: Content;
  contact: LegalContact;
}) {
  const page = text.legal[kind];
  const otherKind = kind === "legal" ? "privacy" : "legal";
  const otherLabel =
    kind === "legal"
      ? text.legal.legal.privacyLink
      : text.legal.privacy.legalLink;

  return (
    <>
      <a className="skip-link" href="#main-content">
        {text.controls.skip}
      </a>
      <header className="site-header legal-header">
        <div className="navbar section-shell">
          <a
            className="brand"
            href={`/${lang}`}
            aria-label={text.controls.home}
          >
            <span className="brand-mark" aria-hidden="true">
              aa
            </span>
            <span>Ali Abdi</span>
          </a>
          <div className="legal-navigation">
            <div
              className="language-switch"
              role="group"
              aria-label={text.controls.language}
            >
              {(["de", "en"] as const).map((locale) => (
                <a
                  key={locale}
                  href={`/${locale}/${kind}`}
                  hrefLang={locale}
                  lang={locale}
                  aria-current={locale === lang ? "page" : undefined}
                  aria-label={locale === "de" ? "Deutsch" : "English"}
                >
                  {locale.toUpperCase()}
                </a>
              ))}
            </div>
            <a className="text-link" href={`/${lang}`}>
              {text.legal.back}
            </a>
          </div>
        </div>
      </header>
      <main
        id="main-content"
        className="legal-main section-shell"
        tabIndex={-1}
      >
        <article className="legal-document">
          <h1>{page.heading}</h1>
          {kind === "legal" ? (
            <>
              <section aria-labelledby="provider-information">
                <h2 id="provider-information">{text.legal.legal.operator}</h2>
                <address>
                  {profile.name}
                  <br />
                  {contact.street}
                  <br />
                  {contact.postalCode} {contact.city}
                  <br />
                  {contact.country}
                </address>
              </section>
              <section aria-labelledby="legal-contact">
                <h2 id="legal-contact">{text.legal.legal.contact}</h2>
                <a className="text-link" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </section>
              <p>{text.legal.legal.purpose}</p>
            </>
          ) : (
            <>
              <p>{text.legal.privacy.intro}</p>
              <section aria-labelledby="privacy-controller">
                <h2 id="privacy-controller">
                  {text.legal.privacy.controllerHeading}
                </h2>
                <p>{text.legal.privacy.controller}</p>
                <address>
                  {profile.name}
                  <br />
                  {contact.street}
                  <br />
                  {contact.postalCode} {contact.city}
                  <br />
                  {contact.country}
                </address>
                <a className="text-link" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </section>
              <section aria-labelledby="privacy-hosting">
                <h2 id="privacy-hosting">
                  {text.legal.privacy.hostingHeading}
                </h2>
                <p>{text.legal.privacy.hosting}</p>
              </section>
              <section aria-labelledby="privacy-storage">
                <h2 id="privacy-storage">
                  {text.legal.privacy.storageHeading}
                </h2>
                <p>{text.legal.privacy.storage}</p>
              </section>
              <section aria-labelledby="privacy-email">
                <h2 id="privacy-email">{text.legal.privacy.emailHeading}</h2>
                <p>{text.legal.privacy.email}</p>
              </section>
              <section aria-labelledby="privacy-links">
                <h2 id="privacy-links">{text.legal.privacy.linksHeading}</h2>
                <p>{text.legal.privacy.links}</p>
              </section>
              <section aria-labelledby="privacy-rights">
                <h2 id="privacy-rights">{text.legal.privacy.rightsHeading}</h2>
                <p>{text.legal.privacy.rights}</p>
                <p>
                  {text.legal.privacy.complaint}{" "}
                  <ExternalLink href="https://www.datenschutz.saarland.de/">
                    {lang === "de"
                      ? "Datenschutz Saarland"
                      : "Data protection Saarland"}
                  </ExternalLink>
                  .
                </p>
              </section>
            </>
          )}
          <p className="legal-cross-link">
            <a className="text-link" href={`/${lang}/${otherKind}`}>
              {otherLabel}
            </a>
          </p>
        </article>
      </main>
    </>
  );
}
