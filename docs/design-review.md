# Portfolio design and usability review

## Purpose

Help German recruiters understand Ali’s current work, training goal, location, and contact options. The quality of the implementation should demonstrate care without implying that Ali already has senior professional experience.

An interface’s appearance cannot establish whether it was made with AI. This review targets generic presentation and incomplete interaction design, not a supposed AI detector.

## Evidence and decisions

| Observed in the previous version                                              | Decision                                                                                                                                     |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Several motivational headlines repeat the same learning message.              | Introduce Ali by name, name the actual technologies, and use direct German and English copy.                                                 |
| Projects appear after two large introductory sections.                        | Put projects immediately after the introduction and a compact summary of location and career goal.                                           |
| A large barbershop atmosphere image is not a product screenshot.              | Remove it from the project presentation. Use actual implementation information and source links as evidence.                                 |
| CV download is disabled and marked as coming soon.                            | Offer a real mailto request until a verified PDF is supplied. Do not fabricate a CV.                                                         |
| Skills are an unqualified collection of badges.                               | Explain how each group is used and link to the relevant project or repositories. No proficiency scores.                                      |
| Project details compete with scanning.                                        | Keep purpose, status, stack, and implemented features visible; disclose technical focus and remaining work on demand.                        |
| Language switching loses the current section.                                 | Preserve the active reading section in the destination URL.                                                                                  |
| Mobile navigation relies on JavaScript and has incomplete dismissal behavior. | Use a native disclosure, with Escape, outside interaction, focus departure, and viewport changes handled progressively.                      |
| Contact assumes an installed email application.                               | Keep the selectable address and add clipboard support with success and failure feedback.                                                     |
| The page has no print treatment.                                              | Add an ink-friendly profile view, project source URLs, expanded project details, and restoration of the reader’s disclosure state afterward. |

## Visual direction

Navy backgrounds, royal-blue actions, restrained borders, readable secondary text, consistent spacing, and a compact personal portrait. The hero uses one local Antigravity canvas as a quiet interactive layer: it stays behind the content, respects reduced motion, and reduces particle density on touch or constrained devices. No decorative mock terminals, fabricated metrics, invented testimonials, animated cursors, or unrelated animation libraries. Preserve the existing light theme and reduced-motion support.

## Engineering choices

- Keep content in the two typed locale files. The hero's local Three.js dependency is deferred until after first render and is omitted for reduced motion.
- Keep page sections server-rendered. Use client code only for navigation enhancement, theme selection, clipboard feedback, and printing.
- Use native links and disclosures so the core content, project details, mobile navigation, and contact address work without JavaScript.
- Keep project status explicit. Luxury Barbershop is in development and Skycast is a learning prototype.
- Keep the separate project repositories untouched.
- Legal disclosures and security hardening remain a separate pre-deployment task, as requested.

## References used

- [Nielsen Norman Group: Aesthetic and Minimalist Design](https://www.nngroup.com/articles/aesthetic-minimalist-design/) — prioritize information that supports the visitor’s task.
- [Nielsen Norman Group: Ten Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) — clear feedback, consistency, control, and recovery from failures.
- [W3C: Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) — navigation disclosure behavior and keyboard handling.
- Version-matched Next.js documentation under `node_modules/next/dist/docs/` — server rendering, image sizing, and routing conventions.

## Verification scope

Run lint, TypeScript, a production build, and the Playwright suite. The suite covers both languages, both themes with axe checks, eight viewport widths, working anchors, disclosures, native mobile navigation, context-preserving language changes, clipboard success/refusal, print preparation/restoration, JavaScript-disabled use, and runtime errors. Automated accessibility checks complement visual and keyboard review; they do not prove full accessibility or replace testing with users.
