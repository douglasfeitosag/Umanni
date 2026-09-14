### AI Usage Disclosure

The documentation baseline used Codex, identified in that session as based on GPT-6; its precise runtime variant was not exposed. Branding planning used `gpt-5.6-sol` with medium reasoning, as configured for the conductor session. Future `gpt-5.6-terra` (high) executor and `gpt-5.6-luna` (high) reviewer roles remain plans until their reports identify actual work. Each execution report must name its actual model and contribution.

# Umanni

A user-management application being prepared for the [Umanni Fullstack Developer test](https://github.com/umanni/Fullstack-Developer/blob/7b5af5859afbb049221254bdacfa138aac25679b/README.md). This repository currently contains planning and documentation only. It is a candidate demonstration, not an official Umanni product.

## Delivery status

The initial documentation is available. Branding, application code, Docker images, CI workflows and the local runner have not been implemented. There are no working application build, seed, run or test commands yet. Those instructions will be added and verified with the corresponding delivery; do not treat the planned stack as a working application.

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

Exact versions and the coverage policy will be pinned in the implementation plan. The architecture is a Rails MVC monolith organized by feature, with application services for multi-step operations; see [ADR-001](umanni-vault/08-ARQUITETURA-PROPOSTA.md).

## Documentation and workflow

Open the `umanni-vault` subfolder as an Obsidian vault and start at [HOME](umanni-vault/HOME.md). Markdown is also readable directly on GitHub. Internal planning is in Portuguese; the interface, code identifiers, test names and commit messages will be in English.

- [Current state and blockers](umanni-vault/STATUS.md)
- [Project constitution](umanni-vault/CONSTITUICAO.md)
- [Agent instructions](AGENTS.md) and [execution protocol](umanni-vault/PROTOCOL.md)
- [Requirements analysis](umanni-vault/05-LEITURA-DO-TESTE.md) and [technology decisions](umanni-vault/07-DECISOES-TECNOLOGICAS.md)
- [Glossary](umanni-vault/GLOSSARIO.md) and [system map](umanni-vault/MAPA.md)
- [Spec Kit installation and version](umanni-vault/TOOLING.md)
- [Initial documentation specification](umanni-vault/specs/000-documentation/spec.md)

Every implementation needs a specification, plan, tasks, acceptance criteria and stop conditions first. Executors return an `EXEC-*` report. Douglas opens sessions manually and retains exclusive control over PR merging and closure unless he explicitly delegates that action.
