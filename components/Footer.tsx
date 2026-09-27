import { profile, type Content, type Locale } from "@/content/site";
import { legalPagesEnabled } from "@/lib/legal";
import ExternalLink from "./ExternalLink";
import { Icon } from "./Icons";
export default function Footer({
  text,
  lang,
}: {
  text: Content["footer"];
  lang: Locale;
}) {
  const hasLegalPages = legalPagesEnabled();
  return (
    <footer className="footer section-shell">
      <div>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="footer-note">{text.note}</p>
      </div>
      <div className="footer-links">
        <a href="/third-party-notices.txt">{text.licenses}</a>
        {hasLegalPages && (
          <>
            <a href={`/${lang}/legal`}>{text.legal}</a>
            <a href={`/${lang}/privacy`}>{text.privacy}</a>
          </>
        )}
        <ExternalLink href={profile.repository}>
          {text.source}
          <Icon name="external" width="14" height="14" />
        </ExternalLink>
        <a href="#home">{text.top} ↑</a>
      </div>
    </footer>
  );
}
