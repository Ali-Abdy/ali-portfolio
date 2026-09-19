# Ali Abdi — Portfolio

A German-first personal portfolio for internships and vocational training as a **Fachinformatiker für Anwendungsentwicklung**. It presents my projects, current learning journey, technical skills, and contact details without implying professional experience.

## Stack

Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 3, custom CSS, and next-themes. Content is rendered on the server; navigation enhancement, theme controls, email copying, and print preparation use small client components. No database, analytics, contact backend, or API credentials are required.

## Development

Use Node.js 22 or newer and npm:

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. `/` redirects to `/de`; `/en` provides the English version. The URL determines the language on the server, including `<html lang>` and metadata. Theme preference is stored by next-themes.

## Checks and production

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

The build downloads Geist through next/font; visitors receive self-hosted fonts. For browser tests, build first, then run:

```sh
npx playwright install chromium
npm run test:e2e
```

The suite starts the production server on port 3107 and checks both languages, eight viewport widths, navigation, themes, accessibility, links, and metadata assets. It also checks clipboard success and refusal, context-preserving language changes, project disclosures, printing, and the JavaScript-disabled fallback.

## Structure

- `app/[lang]/` — statically generated localized pages, root layout
- `app/social/[lang]/` — localized social preview images
- `components/` — semantic portfolio sections and navigation
- `content/site.ts` — typed German/English copy and personal contact links
- `content/projects.ts` — project data, status, features, and learning notes
- `lib/site-url.ts` — optional production origin
- `public/` — portrait, project visual, and personal icons
- `tests/` — browser and accessibility checks
- `docs/design-review.md` — design findings, decisions, and review references

## Updating content

Set `profile.cv` in `content/site.ts` only after adding the real PDF under `public/cv/`. Until then, the working CV action opens an email request; no unavailable download is advertised. The original `public/profile.png` is retained as a source; the page delivers the optimized WebP.

Luxury Barbershop is explicitly in development. Project entries show actual implementation notes and source links instead of decorative imagery. Skycast is an early API learning project, not presented as a production-ready service. Codex was omitted because its unfinished weather features overlap with Skycast. No live demo URL has been invented. The separate project repositories were not modified.

Project headings have stable fragment links. Native disclosures reveal technical details and unfinished work. The mobile menu and disclosures work without JavaScript; script-dependent controls are hidden until hydration. Language switching preserves the active reading section. The print action opens the browser’s print dialog, includes project details and source URLs, and restores the original disclosure states afterward. It prints the portfolio, not a fabricated CV.

## Public deployment

Deploy as a standard Next.js application. Once the real production origin is known, set `SITE_URL` to that full origin in the hosting environment and rebuild. This enables absolute canonical URLs, language alternates, social-image URLs, and sitemap entries. Without it, no guessed canonical/domain is emitted and the sitemap remains empty. Review the final CV, copy, and project links before sharing the public URL in applications.
