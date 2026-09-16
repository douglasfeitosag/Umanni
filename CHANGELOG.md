# Changelog

All notable project milestones are documented in this file. This project follows [Semantic Versioning](https://semver.org/).

## [0.3.0] - 2026-09-16

### Added

- Regular-user registration, role-aware sessions, self-service profiles and guarded avatar uploads.
- Administrator user and role management, last-administrator protection and local first-administrator bootstrap.
- Live administrator dashboard totals through authenticated Solid Cable invalidation and Inertia partial reloads.
- Accessible Portuguese interface validation, destructive-confirmation safeguards and responsive browser coverage.

### Validation

- The reviewed PR #17 head passed the manual `foundation-checks` and `review-ledger` statuses.
- Compose verification recorded 52 RSpec examples, 14 Vitest tests and 60 Playwright scenarios across Chromium, Firefox and WebKit at desktop and mobile viewports.

### Known limitations

- CSV/XLSX imports, password recovery, email, hosted deployment, automated CI and runner installation remain outside this version.

## [0.2.1] - 2026-09-15

### Changed

- Reconciled every completed specification with its verified pull-request, review, merge and release evidence.
- Updated current project entrypoints to reflect the integrated and published 0.2.0 foundation.
- Completed historical task ledgers where GitHub or execution records prove completion, while preserving original task descriptions.
- Added separate closure sections to pre-publication plans and execution reports instead of rewriting their historical snapshots.

### Validation

- The documentation diff is restricted to the versioned reconciliation allowlist and contains no application, runtime, lock, test or branding changes.
- Current-state stale-claim checks, local Markdown links and completed-spec task ledgers are verified on the reviewed pull-request head.
- Foundation backlog items B001–B007 and issue #9 remain explicitly open and outside this patch.

### Known limitations

- This patch adds no product behavior and does not implement authentication, user management, imports, jobs, automated CI or runner installation.
- Historical prompts, quickstarts, explicitly historical checklists and original execution-report bodies remain snapshots of their creation time.

## [0.2.0] - 2026-09-15

### Added

- A minimal Rails 8.1 application foundation with an Inertia/React landing page in Portuguese.
- PostgreSQL-backed local environments with isolated databases for two parallel test processes.
- Pinned Ruby, Rails, Node.js, npm, Bundler and PostgreSQL versions with frozen dependency locks.
- Docker Compose profiles for development, verification and local delivery, plus a non-root production image.
- Ruby and TypeScript quality gates covering tests, coverage, types, linting, security, assets and six browser projects.

### Validation

- The clean Foundation run passed 9 RSpec examples, 2 Vitest tests and 12 Playwright scenarios across Chromium, Firefox and WebKit at desktop and mobile sizes.
- Observed coverage was 7/7 Ruby lines and 1/1 TypeScript line; these small denominators apply only to this minimal foundation.
- The reviewed implementation head and its merge commit have the same Git tree, with exact-SHA checks and review evidence retained in PR #12.

### Known limitations

- Authentication, user management, roles, avatar handling and CSV/XLSX imports are not implemented.
- Jobs, Redis, email, SSR, deployment, profiling, automated CI and runner installation remain out of scope.
- The complete clean-room run covered Linux arm64 only; amd64 was declared in image manifests but not executed.
- The visual prototype remains a separate reference, and issue #9 remains in the Backlog milestone.

## [0.1.0] - 2026-09-14

### Added

- A governed, public documentation vault with specifications, architecture decisions, execution reports and independent-review evidence.
- Verified public Umanni identity assets, preserved provenance and licenses, design tokens, component guidance and five static compositions.
- A visual reference hub for browsing the identity package and UI kit.
- A disposable, browser-only navigable prototype with fictional data and responsive desktop/mobile states.
- Exact-HEAD review governance using resolvable threads, labels and the `review-ledger` status.

### Validation

- 28 core prototype tests passed with 100% line/function coverage and 92.12% branch coverage.
- Eight final browser scenarios passed at 390×844 and 1440×1024; a separate 200% text reflow check ran at 1280×720.
- Static assets, licenses, keyboard behavior and final screenshots were inspected as recorded in the corresponding execution reports.

### Known limitations

- No Rails application, production authentication, persistence, import pipeline, Docker Compose delivery, application CI or production runner exists yet.
- The prototype is a visual simulation and must not be treated as production behavior.
- The identity package is an unofficial evaluation candidate based on public sources; it does not claim authorization from Umanni.
- Only the evidence-backed light theme is included. The 200% slogan word-wrap polish remains in the explicit backlog.

[0.1.0]: https://github.com/douglasfeitosag/Umanni/releases/tag/v0.1.0
[0.2.0]: https://github.com/douglasfeitosag/Umanni/releases/tag/v0.2.0
[0.2.1]: https://github.com/douglasfeitosag/Umanni/releases/tag/v0.2.1
[0.3.0]: https://github.com/douglasfeitosag/Umanni/releases/tag/v0.3.0
