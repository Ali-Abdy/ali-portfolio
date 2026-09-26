"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import type { Content, Locale, SectionId } from "@/content/site";
import { useHydrated } from "@/lib/use-hydrated";
import { Icon } from "./Icons";

export default function TopBar({
  text,
  lang,
}: {
  text: Pick<Content, "nav" | "controls">;
  lang: Locale;
}) {
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const pendingAnchor = useRef<SectionId | null>(null);
  const pendingAnchorTimeout = useRef<number | undefined>(undefined);
  const [active, setActive] = useState<SectionId | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const closeMenu = () => {
    if (menu.current) menu.current.open = false;
  };

  useEffect(() => {
    const sections = text.nav
      .map(({ id }) => document.getElementById(id))
      .filter((section) => section !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (pendingAnchor.current) {
        setActive(pendingAnchor.current);
        return;
      }
      const readingLine = Math.min(window.innerHeight * 0.3, 180);
      let current: SectionId | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine)
          current = section.id as SectionId;
      }
      // The last section may be too short to reach the reading line.
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2
      )
        current = "contact";
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = () => {
      if (window.innerWidth > 850 && menu.current) menu.current.open = false;
      schedule();
    };
    const completeAnchorNavigation = () => {
      pendingAnchor.current = null;
      window.clearTimeout(pendingAnchorTimeout.current);
      update();
    };
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        closeMenu();
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("scrollend", completeAnchorNavigation);
    window.addEventListener("resize", resize);
    document.addEventListener("pointerdown", outside);
    // Opening a project disclosure can move the following sections without scrolling.
    const observer = new ResizeObserver(schedule);
    sections.forEach((section) => observer.observe(section));
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(pendingAnchorTimeout.current);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("scrollend", completeAnchorNavigation);
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointerdown", outside);
    };
  }, [text.nav]);

  const selectSection = (id: SectionId) => {
    pendingAnchor.current = id;
    window.clearTimeout(pendingAnchorTimeout.current);
    // `scrollend` clears the lock after smooth anchor navigation. This fallback
    // keeps language links accurate in browsers that do not fire that event.
    pendingAnchorTimeout.current = window.setTimeout(() => {
      pendingAnchor.current = null;
    }, 1000);
    setActive(id);
    closeMenu();
  };

  const links = text.nav.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      aria-current={active === item.id ? "location" : undefined}
      onClick={() => selectSection(item.id)}
    >
      {item.label}
    </a>
  ));

  return (
    <header
      ref={header}
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menu.current?.open) {
          closeMenu();
          menu.current.querySelector("summary")?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
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
            aa
          </span>
          <span>Ali Abdi</span>
        </a>
        <nav className="desktop-nav" aria-label={text.controls.navigation}>
          {links}
        </nav>
        <div className="nav-controls">
          <div
            className="language-switch"
            role="group"
            aria-label={text.controls.language}
          >
            {(["de", "en"] as const).map((locale) => (
              <a
                key={locale}
                href={`/${locale}${active ? `#${active}` : ""}`}
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
            type="button"
            className="icon-button theme-toggle"
            hidden={!hydrated}
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
          <details ref={menu} className="mobile-menu">
            <summary className="menu-toggle">
              <span>{text.controls.menu}</span>
              <Icon name="menu" />
            </summary>
            <nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label={text.controls.navigation}
            >
              {links}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
