# 004 — Brand reference hub

Request: Douglas asked for a page concentrating the visual identity information and providing a way to view it. This extends the original static-asset scope explicitly; it does not authorize application business behavior.

## Purpose and scope

A local, responsive Portuguese-language page brings together the delivered identity, palette, typography, tokens, UI kit, six static boards, source records and validation. Public documentation remains English. It consumes the existing branding delivery at commit ab33e712b0e6d2687471fe9ac2c83cb10b1e5f36; it does not modify originals or claim official brand authority.

## Requirements

- HUB-01: a single HTML page with ordinary section navigation, usable without JavaScript.
- HUB-02: overview, official brand variants, palette, typography, component board, five compositions and documentation links.
- HUB-03: distinguish observed brand assets, adapted interface decisions and pending formal review.
- HUB-04: every preview links to the corresponding full-resolution PNG and editable SVG; both login artboards remain inspectable.
- HUB-05: direct links to canonical tokens, playbook, component specification, provenance, validation, icon manifest and licenses; no duplicate replacement for these sources.
- HUB-06: Portuguese UI, supplied Montserrat/Roboto, light theme and measured functional colors; no invented brand variant, illustration or business screen.
- HUB-07: keyboard-accessible links/native disclosure, skip link, visible focus, meaningful image alternatives and controls at least 44×44 px. Measure actual text contrast at 4.5:1 and essential control/focus contrast at 3:1.
- HUB-08: no horizontal page overflow at 1440×1024 or 390×844; tall content scrolls normally. Use immediate scrolling without animation, satisfying reduced-motion requirements by default.
- HUB-09: run locally on loopback using an existing static server; no dependency installation, remote hosting, analytics or external asset request.
- HUB-10: native navigation/documentation gallery is not represented as the operational prototype. Full application flow simulation remains separate work.

## Acceptance scenarios

Given the local page, when a reader chooses a section link, then the named section is reachable by pointer or keyboard and is not hidden by navigation.

Given any board preview, when its PNG/SVG link is selected, then the correct existing full asset opens and no unavailable route is invented.

Given wide or narrow viewport, when the page is scrolled, then information and links remain readable, without horizontal overflow or fixed elements covering content.

Given disabled JavaScript, when the page loads, then all content and navigation still work. This is a native HTML/CSS reference hub, not an application component implementation.

Given Tab/Shift+Tab/Enter, when the reader operates the skip link, section links and native disclosure, then focus remains visible and section headings are not covered. JavaScript is disabled for the page through a script-src 'none' content policy. No smooth scrolling or other animation is introduced.

Given a narrow board thumbnail, the page explicitly identifies it as a static preview and exposes original-resolution PNG and editable SVG links. Linked English documents are identified as such.

## Completion and stop

Complete after independent plan assessment, implementation, real-browser wide/narrow/keyboard/link inspection, documented evidence, atomic commits and a topic PR with Douglas assigned and review-pending. Stop before hosting, merge, production components or business rules. Formal project review remains separate from internal persona assessment.
