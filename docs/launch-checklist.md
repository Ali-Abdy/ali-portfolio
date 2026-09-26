# Public-release checklist

This is a deployment checklist for this specific portfolio, not legal advice. It intentionally keeps the public site privacy-minimal: no analytics, marketing cookies, tracking pixels, contact-form backend, accounts, or third-party embeds are part of the design.

## Required before a public Vercel production deployment

1. Decide whether the portfolio needs an Impressum and obtain advice if the private home address must remain private. A city-only entry is deliberately insufficient to enable the legal pages. If an approved serviceable address is available, set these **server-side production variables** in Vercel, never in Git:

   ```text
   LEGAL_PAGES_ENABLED=true
   LEGAL_ADDRESS_STREET=...
   LEGAL_ADDRESS_POSTAL_CODE=...
   LEGAL_ADDRESS_CITY=...
   LEGAL_ADDRESS_COUNTRY=...
   ```

   The production build intentionally refuses to run on Vercel unless legal pages are enabled. These values become public when rendered in the Impressum and privacy notice.

2. Choose and verify the final public origin. Set `SITE_URL` to its HTTPS origin, for example `https://portfolio.example`. The production build refuses a Vercel production deployment without it so canonicals, the sitemap, and share-card URLs are not guessed.

3. Confirm the actual Vercel account and deployment settings: host/controller roles, request-log behavior and retention criteria, sub-processors/international transfers, security settings, and whether the applicable agreement meets your requirements. Confirm the actual mailbox arrangement and retention practice too. Update the privacy copy in `content/site.ts` with only those verified facts, then set `PRIVACY_NOTICE_REVIEWED=true` in Vercel. This is an explicit release gate, not a claim of legal compliance. No Vercel Pro upgrade or purchase is assumed by this repository.

4. The portfolio has no contact endpoint; `mailto:` sends a visitor through their own email client. Do not claim end-to-end encryption, fixed retention, an EU-only service, a signed DPA, or any other hosting/mail fact that has not been verified.

5. Recheck the live deployed origin: HTTPS and redirects, response headers, CSP behavior, final network requests, browser storage, legal pages, `robots.txt`, sitemap, canonical URLs, social card, external links, and the current security advisory state.

6. Enable MFA/passkeys on GitHub, Vercel, the email account, and any later domain registrar. Review collaborators, integrations, deploy tokens, recovery methods, GitHub secret scanning/push protection, branch protection, spending/usage alerts, and traffic controls.

## What is already configured

- `LEGAL_PAGES_ENABLED` is unset by default, so the legal routes return 404 and the footer does not link to incomplete notices.
- The application has no analytics, tracking cookies, marketing tags, third-party embeds, visitor database, or server-side contact form.
- The theme preference is stored in browser local storage only after a visitor selects it.
- Fonts are downloaded at build time by `next/font` and served from the site origin.
- The portrait shown by the site is `public/profile.webp`; the source portrait is not a public route.

Review [security-review.md](security-review.md) and [legal-review.md](legal-review.md) again immediately before launch.
