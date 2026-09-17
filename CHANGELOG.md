# Changelog

All notable project milestones are documented in this file. This project follows [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-09-17

### Fixed

- Made the public local-evaluation guide reproducible from clone and version selection through private environment setup, delivery startup, health checks, first-administrator bootstrap, verification, development, and named-project shutdown.
- Made the delivery guide start `web` and `worker` together, and documented the distinction between `/up` liveness and `/ready` database-and-migration readiness.
- Allowed first-administrator bootstrap in the local delivery profile only with an explicit opt-in, while retaining production-by-default rejection and the existing local-host, database, confirmation, validation, locking, no-password-output, and idempotence safeguards.

### Validation

- The candidate passed `bin/check`: 93 RSpec examples, 95.29% Ruby line coverage, 23 Vitest tests, 66 Playwright scenarios, RuboCop, and Brakeman with no warnings.
- `bin/check-delivery` passed its 18 production-like scenarios, including web/worker startup, shared storage, restart, readiness, safe errors, and unavailable-database failure.
- A clean worktree-equivalent exercised private configuration, both delivery processes, `/ready`, `/up`, first-administrator creation/no-op, and named-project shutdown without exposing a secret.

### Known limitations

- CI, runner installation, deployment, email, invitations, password recovery, a parallel API, Redis, platform extras, and issue #9 remain outside this release and in the Backlog where applicable.
- Validation ran on Docker Desktop Linux arm64 on macOS; it does not prove amd64 compatibility.

## [0.4.0] - 2026-09-16

### Added

- Administrative CSV/XLSX imports processed asynchronously by a dedicated Solid Queue worker.
- Persisted import progress, safe line-level reports and private Solid Cable invalidation.
- One-time, accessible initial-password activation for imported accounts without credentials.

### Validation

- PR #27 merged after exact-HEAD independent review, manual foundation-checks and review-ledger success.
- The technical head passed 92 RSpec examples, 23 Vitest tests, 66 Playwright scenarios, RuboCop, Brakeman and 18 production-like delivery checks.

### Known limitations

- Email, invitations, password recovery, manual retry, cancellation, export, Redis, automated CI, runner and deployment remain out of scope.

## [0.3.1] - 2026-09-16

### Fixed

- Made local delivery prepare the application database and schema before the server starts, failing closed when preparation cannot complete.
- Added database-aware `/ready` readiness while retaining `/up` as the separate boot/liveness endpoint.
- Added safe, accessible production 5xx fallbacks for HTML and Inertia visits without exposing exception details.

### Validation

- The reviewed PR #23 head passed the manual `foundation-checks` and `review-ledger` statuses with no open review threads.
- `bin/check` recorded 64 RSpec examples, 15 Vitest tests and 60 Playwright scenarios; `bin/check-delivery` added 18 production-like browser scenarios plus startup, readiness, failure and image-isolation checks.
- Observed line coverage was 93.22% for Ruby and 94.53% for TypeScript; RuboCop and Brakeman passed.

### Known limitations

- CSV/XLSX imports, password recovery, email, hosted deployment, automated CI and runner installation remain outside this patch.
- `/ready` documents the local Compose delivery contract, not a universal external-orchestrator policy.

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
[0.3.1]: https://github.com/douglasfeitosag/Umanni/releases/tag/v0.3.1
[0.4.0]: https://github.com/douglasfeitosag/Umanni/releases/tag/v0.4.0
[1.0.0]: https://github.com/douglasfeitosag/Umanni/releases/tag/v1.0.0
