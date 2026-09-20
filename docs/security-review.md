# Portfolio security review

Reviewed on 20 September 2026. Scope: this portfolio repository, its locally available Git history, locked dependencies, public assets, production build, and local HTTP/browser behavior. The starting commit was `791e3df` on `portfolio-redesign-review`.

This is a bounded source and application review, not a guarantee that no vulnerabilities exist. No public deployment, hosting account, domain, or other project repository was tested or changed.

## Application surface

The application publishes two fixed portfolio pages and two social preview images. It has no login, database, uploads, payment flow, contact form endpoint, Server Actions, visitor-supplied HTML, or application API credentials. Contact links open the visitor's mail application; copying the address uses the clipboard after a button press. The theme preference is stored locally. Fonts are downloaded during the build and served from the same origin to visitors.

This deliberately small surface avoids many vulnerabilities common in unfinished generated applications. It does not eliminate dependency, infrastructure, account, or denial-of-service risks.

## Findings and changes

| Priority                 | Evidence before changes                                                                                                                                                                                        | Resolution                                                                                                                                                                                                                                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Medium hardening         | Responses had no CSP, framing restriction, MIME-sniffing protection, referrer policy, or device-permission restrictions. This was missing defense in depth; no application XSS exploit was found.              | Added response headers for all routes, including 404s and public files. Browser tests exercise framing, inline event handlers, foreign scripts, and outbound connection blocking.                                                                                                                                    |
| Medium resource exposure | `/_next/image` returned 200 for an unused original portrait at width 3840 and for `/social/de`. Unrelated local image paths could trigger work. No traffic flood or resource-exhaustion exploit was attempted. | Allow only `/profile.webp` without a query string, seven widths up to 800 pixels, quality 75, and WebP output. Disallow remote sources, redirects, SVG processing, and local-IP remote sources. Bound source bodies to 1 MB and the built-in disk cache to 25 MB.                                                    |
| Medium resource exposure | `/social/[lang]` generated an image at request time, although its content never depended on the request.                                                                                                       | Generate the DE/EN images during the production build, without revalidation. Unsupported locale segments return 404. The build manifest and HTTP cache behavior verify this.                                                                                                                                         |
| Low maintenance gap      | No repository workflow checked dependencies, secret leaks, or the security behavior of production responses.                                                                                                   | Added a read-only GitHub Actions workflow for full-history Gitleaks scanning, dependency auditing, lint, types, build, and browser tests. Actions are pinned to verified commit hashes; Gitleaks is pinned to a version and SHA-256 checksum. Checkout does not retain Git credentials. There is no deployment step. |

The baseline already rejected portrait URLs with extra query strings and arbitrary remote image hosts. Those are preserved protections, not newly discovered SSRF or cache-busting vulnerabilities. A 25 MB cache limit applies to Next.js's built-in disk cache; managed hosting may use a different cache and billing system.

The installed Next.js version serves a prerendered social card for POST, PUT, and DELETE as well as GET. There are no mutation handlers: request bodies do not affect the response or stored content. Tests verify identical image bytes before, during, and after these requests. This is static delivery behavior, not an exposed write API. Locale pages retain explicit `isLocale` validation; setting `dynamicParams = false` on their root layout produced unnecessary framework error logs on ordinary 404 requests, so that option is used only on the social-image route.

## CSP design and remaining limitation

The policy allows resources and connections from the portfolio's own origin, disallows framing, objects, workers, forms, media, and base-URL overrides, and disables inline event handlers. Production does not allow JavaScript `eval`; development allows it and WebSockets for Next.js tooling. Inline styles remain allowed for the theme and framework components.

`script-src` still contains `'unsafe-inline'` for Next.js's static hydration scripts and the theme bootstrap. **This is not a strict XSS-prevention policy.** An injected inline script element could still execute if a future change introduced an HTML-injection vulnerability. Current content comes from typed, trusted source files and is rendered through React; no raw HTML sinks were found.

Next.js documents per-request nonces as requiring dynamic rendering. This review preserves static pages instead of introducing request-time rendering solely for nonces. Do not use a fixed nonce as a shortcut. Before adding a CMS, rich text, user content, embeds, or other untrusted markup, revisit rendering and sanitization and adopt a strict CSP appropriate to that design. The tests intentionally verify only the policy's actual guarantees.

HSTS is sent in production with a one-year lifetime, without `includeSubDomains` or `preload`. Browsers only apply it over HTTPS. It does not create a certificate or replace a host-level HTTP-to-HTTPS redirect. HTTPS, redirects, and final edge headers still need verification on the chosen host.

## Checks and evidence

- Final local checks passed: lint, TypeScript, production build, and all 24 Playwright tests (17 existing UX/accessibility tests and 7 security regression tests). No ordinary-404 framework errors appeared in the final test run.
- `npm audit --json`: zero known advisories for the locked dependency tree at review time, including development dependencies. This result depends on the registry advisory database and is not a complete code audit.
- Installed Next.js 16.3.5 is newer than the patched 16.3.3 release named in the official August 2026 advisory. No blind dependency upgrades were necessary.
- Gitleaks 8.30.1: no detections in all 11 locally available commits or the final 46-file project snapshot, including the new security files. The scanner archive was checksum-verified and findings were configured to be fully redacted. Pattern scans can miss unknown or unusual credentials.
- The generated browser assets under `.next/static` were also scanned with Gitleaks, with no detections.
- Source review: no application SQL, raw HTML rendering, command execution, dynamic outbound fetches, uploads, credential-bearing environment variables, or Server Actions. The generated Server Action manifest contains zero actions.
- Public PNG/WebP metadata: no EXIF, XMP, or IPTC metadata found. The email address, portrait, location, and source links are intentional public portfolio content. No CV PDF is currently published.
- Production manifest: `/de`, `/en`, `/social/de`, and `/social/en` are prerendered, with no timed revalidation. Social-image routes disable fallback generation; locale pages reject unknown languages before rendering their content.
- Local regression checks cover security headers, restricted image processing, social-image caching and method/locale handling, sensitive-path 404s, query-string handling, real browser CSP enforcement, and iframe rejection. Existing tests also cover accessibility, responsive layouts, navigation, themes, clipboard success/failure, printing, and use without JavaScript.

Run the checks again after changes:

```sh
npm ci
npm audit --audit-level=low
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

For a local secret scan, install the official Gitleaks release, verify its checksum, and run `gitleaks git . --log-opts='--all' --redact=100`. Do not paste a discovered secret into an issue or report. Revoke/rotate it at its issuer first; deleting a file does not invalidate a leaked credential.

## Broader weakness checklist

| Risk family                                                                            | Status for this portfolio                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Broken authentication, password reset, sessions, authorization, IDOR, tenant isolation | No accounts or private records. Review before adding any authenticated feature; hiding UI is not authorization.                                                                                                               |
| SQL/NoSQL injection, permissive database rules, exposed storage                        | No database or storage backend. Separate linked projects are outside this review.                                                                                                                                             |
| XSS, unsafe HTML/Markdown, URL-scheme injection                                        | No untrusted markup or dynamic link input found. React escaping and fixed content are the primary protection; CSP has the limitation above.                                                                                   |
| CSRF and state-changing GET requests                                                   | No state-changing server endpoints or authentication cookies. Reassess when adding mutations; CORS is not a CSRF defense.                                                                                                     |
| SSRF, open redirects, path traversal, file uploads, archive extraction                 | No application fetch/upload/file-operation endpoints. Image processing is allowlisted; the only app redirect has a fixed `/de` destination.                                                                                   |
| Secrets in code, browser bundles, history, logs, public files                          | No scanner detections; no app secrets are required. Keep `.env` files out of Git and never put credentials in `NEXT_PUBLIC_*`. Review every future public CV or asset.                                                        |
| Outdated or malicious dependencies and CI supply-chain changes                         | Lockfile, advisory audit, pinned CI actions/scanner, and read-only CI permissions. Future advisories and maintainer compromises remain possible. Review dependency changes rather than automatically applying force upgrades. |
| Cache poisoning or private-data caching                                                | Pages contain public, fixed content; metadata origin comes from server configuration, not visitor headers. Reassess caching if personalization is introduced.                                                                 |
| Clickjacking, MIME confusion, unnecessary browser capabilities, referrer leakage       | Response headers added and locally tested. Validate that the eventual CDN preserves them.                                                                                                                                     |
| Bot traffic, scraping, spam, DDoS, cost amplification                                  | Smaller compute surface and bounded image processing. Public content and email remain scrapeable. Host-level rate controls, budgets, and monitoring are still required; code does not provide unlimited-traffic protection.   |
| Debug endpoints, exposed source maps, verbose errors, filesystem publication           | No debug routes or production browser-source-map opt-in. Common project/secret-file URLs return 404. Never publish the repository directory as a static web root.                                                             |
| Domain/account takeover, excessive collaborators, stolen deploy tokens                 | Not verifiable from this repository; complete the account and hosting checks below.                                                                                                                                           |
| AI prompt injection, tool abuse, leaked model keys                                     | No AI runtime or model integration in the site. Using AI during development does not itself create these runtime endpoints.                                                                                                   |
| Privacy, copyright, Impressum and other legal obligations                              | Separate legal review remains pending. Security headers and scanner results do not establish legal compliance.                                                                                                                |

## Required before public deployment

1. Choose the host and final domain. Confirm supported Node.js, HTTPS, forced HTTPS redirects, the response headers above, caching, and image limits at the actual edge. Set `SITE_URL` and rebuild. Do not expose a development server.
2. Enable MFA/passkeys for GitHub, hosting, domain registrar, and the contact mailbox. Review collaborators, integrations, deploy tokens, recovery methods, and registrar transfer protection. Enable repository secret scanning/push protection and dependency alerts where available.
3. Protect the default branch with review/check requirements. Confirm the `Portfolio checks` workflow succeeds on GitHub; a local pass does not prove the hosted runner or branch rules are configured. Keep previews private until content and legal review are complete.
4. Configure hosting traffic/abuse controls, request limits appropriate to a public portfolio, usage alerts, and spending limits where supported. Confirm an excessive-traffic response and rollback process; rate-limiting every visitor in application memory is not a distributed defense.
5. Review the public CV and image rights, privacy notice, necessary legal disclosures, hosting/logging arrangements, and linked project claims. The external repositories and any exposed keys in them need their own review and key rotation where applicable.
6. Re-run the advisory scan and production browser checks immediately before release, then verify the deployed origin and its redirects. Maintain a supported dependency/runtime update process afterward.

## References

- [Next.js August 2026 security release](https://nextjs.org/blog/august-2026-security-release)
- [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy), also read from the installed version's documentation
- [Next.js image allowlists and limits](https://nextjs.org/docs/app/api-reference/components/image#localpatterns), also read from the installed version's documentation
- [OWASP HTTP security headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
- [Gitleaks 8.30.1](https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1)
