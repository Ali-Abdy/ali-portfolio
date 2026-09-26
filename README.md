# Ali Abdi — Portfolio

A German-first personal portfolio for internships and vocational training as a **Fachinformatiker für Anwendungsentwicklung**. It presents my projects, current learning journey, technical skills, and contact details without implying professional experience.

## Stack

Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 3, custom CSS, next-themes, Three.js, and React Three Fiber. Content is rendered on the server; navigation enhancement, theme controls, email copying, print preparation, and the deferred interactive hero background use small client components. No database, analytics, contact backend, or API credentials are required.

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

Security regression tests also check response headers, browser policy enforcement, restricted image optimization, static social cards, and sensitive-path handling. `.github/workflows/checks.yml` runs these checks, dependency auditing, and a Git history secret scan on pushes and pull requests with read-only repository permissions; it does not deploy the site.

Privacy tests verify that initial browsing creates no cookies or storage entries, that choosing a theme only stores `theme`, and that the site remains usable when browser storage is blocked. The Antigravity canvas is a local dependency and does not request external services. These test the application locally; host-injected services and production logs need a separate deployment review.

The footer links to the font and third-party library notices. After dependency changes, run `npm run licenses:generate`, review the changes to `public/third-party-notices.txt`, and commit them. `npm run licenses:check` verifies freshness in CI. This preserves supplied notices; it does not automatically approve new dependency license terms.

## Structure

- `app/[lang]/` — statically generated localized pages, root layout
- `app/social/[lang]/` — localized social preview images generated at build time
- `components/` — semantic portfolio sections and navigation
- `content/site.ts` — typed German/English copy and personal contact links
- `content/projects.ts` — project data, status, features, and learning notes
- `lib/site-url.ts` — optional production origin
- `public/` — served portrait, personal icons, and third-party notices
- `assets/source/` — unused source images, excluded from the site's public routes
- `tests/` — browser and accessibility checks
- `docs/design-review.md` — design findings, decisions, and review references
- `docs/security-review.md` — security findings, limits, verification, and launch checks
- `docs/legal-review.md` — verified privacy facts, legal review, and missing release information
- `docs/launch-checklist.md` — required Vercel and legal decisions before public release

## Updating content

Set `profile.cv` in `content/site.ts` only after adding the real PDF under `public/cv/`. Until then, the working CV action opens an email request; no unavailable download is advertised. The original portrait is retained at `assets/source/profile.png`; the page delivers `public/profile.webp`. Source assets remain visible through the public repository and its history; moving them does not make them private.

Luxury Barbershop is explicitly in development. Project entries show actual implementation notes and source links instead of decorative imagery. Skycast is an early API learning project, not presented as a production-ready service. Codex was omitted because its unfinished weather features overlap with Skycast. No live demo URL has been invented. The separate project repositories were not modified.

Project headings have stable fragment links. Native disclosures reveal technical details and unfinished work. The mobile menu and disclosures work without JavaScript; script-dependent controls are hidden until hydration. Language switching preserves the active reading section. The print action opens the browser’s print dialog, includes project details and source URLs, and restores the original disclosure states afterward. It prints the portfolio, not a fabricated CV.

## Public deployment

Deploy as a standard Next.js application. Once the real production origin is known, set `SITE_URL` to that HTTPS origin in the hosting environment and rebuild. This enables absolute canonical URLs, language alternates, social-image URLs, and sitemap entries. Without it, no guessed canonical/domain is emitted and the sitemap remains empty. Vercel production builds are intentionally blocked until `SITE_URL` is set, the legal pages are enabled with approved server-side address details, and the privacy notice has been reviewed against the final host and mailbox configuration. See [the release checklist](docs/launch-checklist.md) before sharing the public URL in applications.

Complete the hosting/account and legal checks in [the security review](docs/security-review.md) before publishing. The CSP preserves static rendering and permits inline framework scripts; it is not a strict XSS policy. New untrusted content or backend features require a fresh security review. Only `/profile.webp` is allowed through the image optimizer; explicitly review the allowlist and limits when adding another optimized image.
