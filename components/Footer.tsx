import { profile, type Content } from "@/content/site";
import ExternalLink from "./ExternalLink";
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
        <ExternalLink href={profile.github}>GitHub</ExternalLink>
        <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
        <a href="#home">{text.top} ↑</a>
      </div>
    </footer>
  );
}
