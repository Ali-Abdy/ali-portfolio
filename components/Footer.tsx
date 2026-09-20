import { profile, type Content } from "@/content/site";
import ExternalLink from "./ExternalLink";
import { Icon } from "./Icons";
export default function Footer({ text }: { text: Content["footer"] }) {
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
        <ExternalLink href={profile.repository}>
          {text.source}
          <Icon name="external" width="14" height="14" />
        </ExternalLink>
        <a href="#home">{text.top} ↑</a>
      </div>
    </footer>
  );
}
