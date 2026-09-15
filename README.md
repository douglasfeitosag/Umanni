### AI Usage Disclosure

The foundation implementation used Codex, identified as GPT-6 without an exposed exact runtime variant. Final implementation review is pending the complete validation.

Foundation planning used Codex, identified by its environment as GPT-6 without an exposed exact runtime variant, including a separate read-only research agent. Review identities are recorded on the planning PR. The documentation baseline used Codex, identified in that session as based on GPT-6; its precise runtime variant was not exposed. Branding planning and prototype coordination used `gpt-5.6-sol` with medium reasoning, as configured for those sessions. A delegated `gpt-5.6-terra` high-reasoning executor implemented the prototype state core and tests. Exact final-review identities and contributions are recorded in the corresponding execution reports and pull requests; no unperformed reviewer is credited.

# Umanni

A user-management application being prepared for the [Umanni Fullstack Developer test](https://github.com/umanni/Fullstack-Developer/blob/7b5af5859afbb049221254bdacfa138aac25679b/README.md). This repository includes a static identity package and a disposable navigable visual prototype, but no validated production application. It is a candidate demonstration, not an official Umanni product.

## Delivery status

The initial documentation and static branding archive are available, together with a browser-only visual prototype using fictional data. Open [the visual archive](branding/hub/index.html) or follow [the prototype run instructions](branding/prototype/README.md). The local foundation implementation is undergoing validation. An explicitly approved json 2.21.2 pin resolves the Rails 8.1.3.1 session compatibility issue. The technical page, isolated tests and production image have passed local validation; the development hostname fix and final independent review are pending. User-management features remain unavailable. See the [execution report](umanni-vault/EXEC-009-FOUNDATION-APP.md) for observed results and pending validation. No application CI workflow or production runner has been implemented.

The first documented project milestone is version **0.1.0**. See the [changelog](CHANGELOG.md) and the [0.1.0 release notes](umanni-vault/releases/0.1.0.md) for its exact contents and exclusions. This is a pre-application release: it packages the governed documentation, verified static identity, visual reference hub and disposable prototype, not a production-ready system.

Target delivery: September 11, 2026, end of day in America/Sao_Paulo. No paid cloud hosting is planned. The intended evaluator experience is a reproducible local Docker Compose environment, including background imports and live progress.

## Planned scope

- Visitors register as regular users.
- Regular users manage only their own profile.
- Administrators manage users and roles and see live user totals.
- Administrators import CSV/XLSX asynchronously and follow progress.
- User records include full name, email, avatar and role.

## Agreed stack

| Responsibility | Choice |
| --- | --- |
| Backend | Ruby 4.0+ / Rails 8.0+, built-in Rails authentication |
| UI | React + Inertia, TypeScript, Tailwind CSS |
| Database | PostgreSQL |
| Jobs and real-time updates | Solid Queue / Solid Cable; no Redis requirement |
| Tests | RSpec; Vitest + React Testing Library; Playwright |
| Delivery | Multi-stage Dockerfile and local Docker Compose |
| Quality | TDD/BDD, parallel tests, at least 90% coverage; lint, Brakeman, ESLint |

The proposed exact versions and coverage policy for 0.2.0 are recorded in the [foundation plan](umanni-vault/specs/008-foundation-plan/plan.md), with [research](umanni-vault/specs/008-foundation-plan/research.md), [contracts](umanni-vault/specs/008-foundation-plan/contracts/quality.md) and [tasks](umanni-vault/specs/008-foundation-plan/tasks.md). Planning was independently accepted at PR #11 HEAD `d1f3a3a349ed4a7610c4da7b170d4d2976c56691`; implementation validation and final independent acceptance are still pending. The architecture is a Rails MVC monolith organized by feature, with application services for multi-step operations; see [ADR-001](umanni-vault/08-ARQUITETURA-PROPOSTA.md).

## Run the foundation locally

Requirements: a local Docker Engine with Compose. The verified target is Linux arm64 on macOS; amd64 is declared by the image manifests but has not been tested. Host Ruby and Node are not used. Edit files on the Mac; run the pinned tooling in containers.

Copy `.env.example` to the ignored `.env`. Set `SECRET_KEY_BASE` to a locally generated random value of at least 64 bytes, and retain the dedicated `DELIVERY_DATABASE_URL` ending in `umanni_production`. Keep this file private. The included database credentials are local examples.

For an exact revision, start from a clean checkout and set the revision before building the test image:

```sh
export VERIFICATION_SHA="$(git rev-parse HEAD)"
docker compose -p umanni-foundation --profile test config --quiet
docker compose -p umanni-foundation --profile test build verify
docker compose -p umanni-foundation up -d --wait db
docker compose -p umanni-foundation --profile test run --rm verify bin/check
```

`bin/check` prepares only `umanni_test`, `umanni_test2`, and `umanni_e2e`. It refuses a general `DATABASE_URL`, a non-test Rails environment, or unsafe test database names/URL overrides. RSpec uses two isolated processes, and Playwright uses its own server/database and six browser/viewport projects. Each language must meet 90% line coverage separately. The prototype and browser tests do not contribute to application coverage. Any failed command stops the wrapper with a nonzero status.

Run the packaged application:

```sh
docker compose -p umanni-foundation --profile delivery build web
docker compose -p umanni-foundation --profile delivery run --rm web bin/rails db:prepare
docker compose -p umanni-foundation --profile delivery up -d --wait web
curl --fail http://127.0.0.1:3030/up
curl --fail http://127.0.0.1:3030/
```

Open <http://localhost:3030>. The page is in Portuguese and states that signup, login, and user management are unavailable. `/up` checks application boot; it does not check database connectivity. The schema has no business tables and `db:seed` is intentionally a no-op. Production assets are compiled into the non-root image; no Vite development server is needed.

For local development, stop delivery first because both profiles publish port 3030:

```sh
docker compose -p umanni-foundation --profile delivery stop web
docker compose -p umanni-foundation --profile dev build dev vite
docker compose -p umanni-foundation --profile dev run --rm dev bin/rails db:prepare
docker compose -p umanni-foundation --profile dev up dev vite
```

Use <http://localhost:3030> for the development profile; its Vite/HMR origin is `localhost:3036`. Only the checkout is bind-mounted. Dependencies and database storage stay in Docker. Stop this project's resources with `docker compose -p umanni-foundation --profile dev --profile test --profile delivery down`; the database volume is retained. Do not use a global Docker cleanup.

Validation records and limitations are in [EXEC-009](umanni-vault/EXEC-009-FOUNDATION-APP.md). `foundation-checks` and `review-ledger` are manual statuses for an exact commit, not automatic CI. Integration remains Douglas's decision.

## Documentation and workflow

Open the `umanni-vault` subfolder as an Obsidian vault and start at [HOME](umanni-vault/HOME.md). Markdown is also readable directly on GitHub. Internal planning is in Portuguese. The demonstrated interface is in Portuguese; public README/code/test identifiers and commit messages are in English.

- [Current state and blockers](umanni-vault/STATUS.md)
- [Project constitution](umanni-vault/CONSTITUICAO.md)
- [Agent instructions](AGENTS.md) and [execution protocol](umanni-vault/PROTOCOL.md)
- [Requirements analysis](umanni-vault/05-LEITURA-DO-TESTE.md) and [technology decisions](umanni-vault/07-DECISOES-TECNOLOGICAS.md)
- [Glossary](umanni-vault/GLOSSARIO.md) and [system map](umanni-vault/MAPA.md)
- [Spec Kit installation and version](umanni-vault/TOOLING.md)
- [Initial documentation specification](umanni-vault/specs/000-documentation/spec.md)

Every implementation needs a specification, plan, tasks, acceptance criteria, stop conditions and a release target or explicit backlog destination first. Executors return an `EXEC-*` report. Douglas retains merge control unless he explicitly delegates it; a reviewed merge is not tagged or released until the integrated commit is verified.
