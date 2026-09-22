### AI Usage Disclosure

The 0.3.1 local-delivery hardening was implemented with Codex, identified as GPT-5 without an exposed exact runtime variant. Its independent final review was configured as `gpt-5.6-luna`/high in a separate context; that reviewer also reported a GPT-5 runtime identity without an exposed exact variant. Exact-HEAD evidence is recorded on PR #23.

The identity and access implementation for the 0.3.0 candidate used Codex, identified as GPT-5 without an exposed exact runtime variant. Independent implementation reviews were performed in fresh `gpt-5.6-luna`/high contexts and recorded on PR #17; their acceptance remains SHA-specific and must be checked on the current pull request head.

The foundation implementation used Codex, identified as GPT-6 without an exposed exact runtime variant. Independent implementation review was dispatched in a fresh context with `gpt-5.6-luna`/high configured. The reviewer reported a GPT-5 runtime identity without an exposed exact variant; the corrected implementation was independently accepted; exact review and validation SHAs are recorded on PR #12.

Foundation planning used Codex, identified by its environment as GPT-6 without an exposed exact runtime variant, including a separate read-only research agent. Review identities are recorded on the planning PR. The documentation baseline used Codex, identified in that session as based on GPT-6; its precise runtime variant was not exposed. Branding planning and prototype coordination used `gpt-5.6-sol` with medium reasoning, as configured for those sessions. A delegated `gpt-5.6-terra` high-reasoning executor implemented the prototype state core and tests. Exact final-review identities and contributions are recorded in the corresponding execution reports and pull requests; no unperformed reviewer is credited.

# Umanni

A user-management application being prepared for the [Umanni Fullstack Developer test](https://github.com/umanni/Fullstack-Developer/blob/7b5af5859afbb049221254bdacfa138aac25679b/README.md). This repository includes a minimal Rails–Inertia application foundation, a static identity package and a disposable visual prototype. It is a candidate demonstration, not an official Umanni product.

## Delivery status

The initial documentation and static branding archive are available, together with a browser-only visual prototype using fictional data. Open [the visual archive](branding/hub/index.html) or follow [the prototype run instructions](branding/prototype/README.md). The **0.2.0 foundation** was implemented in [PR #12](https://github.com/douglasfeitosag/Umanni/pull/12), integrated through the reviewed closure in [PR #13](https://github.com/douglasfeitosag/Umanni/pull/13), and published as [Umanni 0.2.0](https://github.com/douglasfeitosag/Umanni/releases/tag/v0.2.0). **0.3.0** adds registration, role-aware sessions, self-service profiles, administrator user management, guarded avatar uploads, first-administrator bootstrap and live dashboard totals; it was integrated by [PR #17](https://github.com/douglasfeitosag/Umanni/pull/17) and published as [Umanni 0.3.0](https://github.com/douglasfeitosag/Umanni/releases/tag/v0.3.0). **0.3.1** hardens local startup, readiness and safe 5xx recovery; its implementation was integrated by [PR #23](https://github.com/douglasfeitosag/Umanni/pull/23) and published as [Umanni 0.3.1](https://github.com/douglasfeitosag/Umanni/releases/tag/v0.3.1) from the reviewed closure in [PR #24](https://github.com/douglasfeitosag/Umanni/pull/24). **0.4.0** adds bounded administrative CSV/XLSX import, persisted asynchronous tracking and one-time initial-password setup for imported accounts. It was integrated by [PR #27](https://github.com/douglasfeitosag/Umanni/pull/27) and published as [Umanni 0.4.0](https://github.com/douglasfeitosag/Umanni/releases/tag/v0.4.0) after the reviewed release closure in [PR #28](https://github.com/douglasfeitosag/Umanni/pull/28). See [EXEC-019](umanni-vault/EXEC-019-USER-IMPORT.md) and [EXEC-020](umanni-vault/EXEC-020-RELEASE-0-4-0.md) for the validation and publication records. No application CI workflow or production runner has been implemented.

The first documented project milestone is version **0.1.0**. See the [changelog](CHANGELOG.md) and the [0.1.0 release notes](umanni-vault/releases/0.1.0.md) for its exact contents and exclusions. This is a pre-application release: it packages the governed documentation, verified static identity, visual reference hub and disposable prototype, not a production-ready system.

The original target date was September 11, 2026, end of day in America/Sao_Paulo; the full business scope is still pending. No paid cloud hosting is planned. The intended evaluator experience is a reproducible local Docker Compose environment, including background imports and live progress. In the delivery profile, start both `web` and `worker`; they share the persisted Active Storage volume so the worker can read previously uploaded import files after a restart.

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

The exact versions and coverage policy used by 0.2.0 are recorded in the [foundation plan](umanni-vault/specs/008-foundation-plan/plan.md), with [research](umanni-vault/specs/008-foundation-plan/research.md), [contracts](umanni-vault/specs/008-foundation-plan/contracts/quality.md) and [tasks](umanni-vault/specs/008-foundation-plan/tasks.md). Planning was independently accepted at PR #11 HEAD `d1f3a3a349ed4a7610c4da7b170d4d2976c56691`; implementation and review are recorded in PR #12, and the integrated release closure is recorded in PR #13. The architecture is a Rails MVC monolith organized by feature, with application services for multi-step operations; see [ADR-001](umanni-vault/08-ARQUITETURA-PROPOSTA.md).

## Run the application locally

### Prerequisites

- Docker Engine
- Docker Compose (the Docker Compose plugin is sufficient)
- Git

The verified target is Docker Desktop Linux arm64 on macOS. The image manifests declare amd64, but this project has **not** validated amd64; arm64 evidence is not proof of amd64 compatibility. Host Ruby and Node are not required.

### Get a released version and configure it privately

Clone the repository and use the current checkout before building. After a release is published, select the tag shown on its GitHub Release page if you need that immutable revision:

```sh
git clone https://github.com/douglasfeitosag/Umanni.git
cd Umanni
cp .env.example .env
```

`config/credentials.yml.enc` is versioned encrypted application configuration. Its matching `RAILS_MASTER_KEY` is private runtime input: obtain it through the delivery channel and never commit, share, print, or add it to a tracked file. Set it only for the commands that start delivery:

```sh
export RAILS_MASTER_KEY="<private key supplied out-of-band>"
```

The delivery profile reads `secret_key_base` from Rails credentials. It does not accept `SECRET_KEY_BASE` as a plaintext fallback; without a valid master key it stops with `delivery.startup.credentials_missing: supply RAILS_MASTER_KEY`. Maintainers changing application credentials can use Rails' standard editor with the private key available, for example `RAILS_MASTER_KEY="$RAILS_MASTER_KEY" bin/rails credentials:edit`; do not commit `config/master.key`.

`.env` remains private operational configuration. Keep the dedicated `DELIVERY_DATABASE_URL` ending in `umanni_production`; `DATABASE_URL`, `DELIVERY_DATABASE_URL`, and `TEST_DATABASE_URL` remain Compose/environment connection coordinates in this release. The included database credentials are local examples only, not application signing secrets.

### Run the verification gate

From that clean checkout, set the revision before building the verification image:

```sh
export VERIFICATION_SHA="$(git rev-parse HEAD)"
docker compose --project-name umanni-evaluation --profile test config --quiet
docker compose --project-name umanni-evaluation --profile test build verify
docker compose --project-name umanni-evaluation up -d --wait db
docker compose --project-name umanni-evaluation --profile test run --rm verify bin/check
```

`bin/check` prepares only `umanni_test`, `umanni_test2`, and `umanni_e2e`. It refuses a general `DATABASE_URL`, a non-test Rails environment, or unsafe test database names/URL overrides. RSpec uses two isolated processes, and Playwright uses its own server/database and six browser/viewport projects. Each language must meet 90% line coverage separately. The prototype and browser tests do not contribute to application coverage. Any failed command stops the wrapper with a nonzero status.

### Run the packaged delivery

Start both delivery processes. `web` serves the application and `worker` processes imports; they must run together for the delivered application to be evaluated completely.

```sh
docker compose --project-name umanni-evaluation --profile delivery build web worker
docker compose --project-name umanni-evaluation --profile delivery up -d --wait web worker
docker compose --project-name umanni-evaluation --profile delivery ps
curl --fail http://127.0.0.1:3030/ready
curl --fail http://127.0.0.1:3030/up
curl --fail http://127.0.0.1:3030/
```

The delivery profile runs `db:prepare` before starting the server and fails closed if preparation cannot complete. `/up` is a boot/liveness check: it says the application process is alive. `/ready` is stricter: it checks the application database connection and that migrations are current. Use `/ready` to decide whether the local delivery is ready to evaluate. Open <http://localhost:3030>. The interface is in Portuguese. Visitors can register as regular users and then manage their own profile. Administrators can manage users and roles, see live totals, and import a single bounded CSV/XLSX file in the background. The `worker` service consumes only the `imports` queue and shares `/rails/storage` with `web`; it must stay running for imports to advance. Unexpected production 5xx responses use a generic Portuguese fallback for both HTML and Inertia visits. Production assets are compiled into the non-root image; no Vite development server is needed.

Run the isolated delivery gate after `bin/check` when changing startup, health, production error handling, or the delivery image:

```sh
bin/check-delivery
```

It uses temporary Compose project names and volumes, tests a fresh database, a pending migration, restart idempotence, an unreachable database, safe HTML/Inertia failures, and 18 production-like browser scenarios. Its trap removes only the resources it creates. `bin/check` and `bin/check-delivery` are manual local gates: no CI workflow or hosted runner has been implemented. CI/runner work remains in the Backlog.

### Create the first local administrator

Run this only after `/ready` succeeds. Replace the placeholders with local values; never commit the password. `UMANNI_BOOTSTRAP_LOCAL_DELIVERY=1` is an explicit opt-in for this local Compose delivery only; without it, the task remains unavailable in production. The task also accepts only the exact local delivery database and confirmation phrase, does not print the password, and is idempotent: a second run leaves the existing administrator unchanged.

```sh
docker compose --project-name umanni-evaluation --profile delivery exec -T \
  -e UMANNI_BOOTSTRAP_LOCAL_DELIVERY=1 \
  -e UMANNI_BOOTSTRAP_CONFIRM=CREATE_FIRST_ADMIN \
  -e UMANNI_BOOTSTRAP_DATABASE=umanni_production \
  -e UMANNI_BOOTSTRAP_FULL_NAME="Local Administrator" \
  -e UMANNI_BOOTSTRAP_EMAIL="admin@example.test" \
  -e UMANNI_BOOTSTRAP_PASSWORD="choose-a-local-password-of-at-least-12-characters" \
  web bin/rails umanni:bootstrap_admin
```

### Develop locally

Stop delivery first because both profiles publish port 3030:

```sh
docker compose --project-name umanni-evaluation --profile delivery stop web worker
docker compose --project-name umanni-evaluation --profile dev build dev vite jobs
docker compose --project-name umanni-evaluation --profile dev run --rm dev bin/rails db:prepare
docker compose --project-name umanni-evaluation --profile dev up dev vite jobs
```

Use <http://localhost:3030> for the development profile; its Vite/HMR origin is `localhost:3036`. Only the checkout is bind-mounted. Dependencies and database storage stay in Docker.

### Stop only this project's resources

Normal shutdown stops and removes only the Compose resources named `umanni-evaluation`; it retains named volumes so local data survives. Do not use a global Docker cleanup.

```sh
docker compose --project-name umanni-evaluation --profile dev --profile test --profile delivery down --remove-orphans
```

Validation records and limitations for the published [1.1.0 release](https://github.com/douglasfeitosag/Umanni/releases/tag/v1.1.0) are in [EXEC-022](umanni-vault/EXEC-022-CREDENTIALS-1-1-0.md) and [EXEC-024](umanni-vault/EXEC-024-IMPORT-ERROR-STABILIZATION.md). [EXEC-021](umanni-vault/EXEC-021-EVALUATION-READINESS.md) is the historical 1.0.0 readiness record. `foundation-checks` and `review-ledger` are manual statuses for an exact commit, not automatic CI. Integration remains Douglas's decision.

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
