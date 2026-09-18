"use client";

import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import type { Content, Locale } from "@/content/site";
import { Icon } from "./Icons";

export default function TopBar({
  text,
  lang,
}: {
  text: Pick<Content, "nav" | "controls">;
  lang: Locale;
}) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const closeMenu = () => setOpen(false);
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          closeMenu();
          menuButton.current?.focus();
        }
      }}
    >
      <div className="navbar section-shell">
        <a
          href="#home"
          className="brand"
          aria-label={text.controls.home}
          onClick={closeMenu}
        >
          <span className="brand-mark" aria-hidden="true">
            a<span>.</span>
          </span>
          <span>Ali Abdi</span>
        </a>
        <nav className="desktop-nav" aria-label={text.controls.navigation}>
          {text.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-controls">
          <div className="language-switch" aria-label={text.controls.language}>
            {(["de", "en"] as const).map((locale) => (
              <a
                key={locale}
                href={`/${locale}`}
                hrefLang={locale}
                lang={locale}
                aria-current={locale === lang ? "page" : undefined}
                aria-label={locale === "de" ? "Deutsch" : "English"}
              >
                {locale.toUpperCase()}
              </a>
            ))}
          </div>
          <button
            className="icon-button theme-toggle"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <span className="when-dark">
              <Icon name="sun" />
              <span className="sr-only">{text.controls.light}</span>
            </span>
            <span className="when-light">
              <Icon name="moon" />
              <span className="sr-only">{text.controls.dark}</span>
            </span>
          </button>
          <button
            ref={menuButton}
            className="icon-button mobile-menu-button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? text.controls.closeMenu : text.controls.openMenu}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav section-shell"
        aria-label={text.controls.navigation}
        hidden={!open}
      >
        {text.nav.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={closeMenu}>
            {item.label}
            <Icon name="arrow" width="16" height="16" />
          </a>
        ))}
      </nav>
    </header>
  );
}
