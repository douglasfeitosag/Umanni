# Implementation Plan: Local Evaluation Readiness

**Branch**: `codex/022-evaluation-readiness` | **Date**: 2026-09-17 | **Spec**: [spec.md](spec.md)

**Input**: Reproducible local-evaluation correction for release 0.4.1.

## Summary

Make the released local-evaluation path executable from the public README: clone and select the version, create private configuration, generate a secret, build and start delivery `web` and `worker` together, check `/ready` and `/up`, bootstrap the first local administrator, execute existing gates, develop locally, and stop only the named project. The isolated command audit proved that the existing bootstrap rejects the delivery profile; correct that bounded defect by requiring an explicit local-delivery opt-in while preserving every existing safeguard. Record evidence and release lifecycle.

## Technical Context

**Language/Version**: Markdown and Bash command examples; existing Ruby 4.0/Rails 8.1 application is not changed by the planned path

**Primary Dependencies**: Docker Engine, Docker Compose, existing Compose profiles and repository gates

**Storage**: Existing PostgreSQL and Compose volumes; local untracked `.env`; local-only untracked interview guide

**Testing**: Published Compose commands, `bin/check`, `bin/check-delivery`, endpoint curls, bootstrap-task behavior, `git diff --check`, and GitHub exact-HEAD release audit

**Target Platform**: Docker Desktop Linux arm64 on macOS, with amd64 explicitly not validated

**Project Type**: Rails–Inertia web application with a local Docker Compose delivery guide

**Performance Goals**: Reproducible evaluator setup; no new runtime performance target

**Constraints**: Documentation/reproducibility scope only; no CI/runner, deploy, email, invitation, recovery, parallel API, Redis, platform extras, or issue #9; never commit secrets or the private guide; never modify existing tags/releases

**Scale/Scope**: README, versioned vault records, release notes, one root-local ignored interview guide, and the minimal `FirstAdminBootstrap` environment guard plus focused RSpec coverage required by observed delivery-bootstrap failure

## Constitution Check

| Principle | Pre-design result | Post-design result |
| --- | --- | --- |
| I. Specification before execution | PASS — spec, acceptance criteria, target 0.4.1, and stop conditions exist | PASS — tasks retain explicit BDD and gates |
| II. Behaviors and tests | PASS — commands are executable behaviors; any production defect follows RED/GREEN before a fix | PASS — isolated execution and actual results are required |
| III. Minimum architecture | PASS — no new component, abstraction, service, or platform is planned | PASS — existing Compose contract is documented rather than expanded |
| IV. Auditable delivery | PASS — PR, EXEC, versioned release notes, and exact commands are planned | PASS — evidence includes SHAs, outputs, and limitations |
| V. Human integration | PASS — Douglas's written objective expressly authorizes only this delivery's integration after gates | PASS — no auto-merge or unrelated integration is planned |
| VI. Privacy and local delivery | PASS — `.env` and interview guide stay private; only local Compose is documented | PASS — `.git/info/exclude` is the sole private-guide exclusion |
| VII. Independent review | PASS — planning review precedes implementation and a fresh Luna/high final review is mandatory | PASS — changed HEAD requires a new review ledger result |
| VIII. Version management | PASS — milestone 0.4.1 exists; tag/Release follow integrated exact SHA | PASS — release notes precede tag; milestone closes only when empty |

## Project Structure

```text
README.md                                      # Public evaluator guide
app/services/first_admin_bootstrap.rb           # Explicit local-delivery bootstrap guard
spec/services/first_admin_bootstrap_spec.rb     # RED/GREEN coverage for the guard
CHANGELOG.md                                   # Versioned release summary
ENTREVISTA-UMANNI-PRIVADO.md                   # Root-local, ignored interview guide
umanni-vault/
├── EXEC-021-EVALUATION-READINESS.md           # Actual execution and publication record
├── STATUS.md                                  # Current state after publication
├── MEMORIA-PROJETO.md                         # Short project learning, if warranted
├── releases/0.4.1.md                          # Versioned public release notes
└── specs/022-evaluation-readiness/            # Feature governance artifacts
    ├── spec.md
    ├── plan.md
    ├── research.md
    ├── data-model.md
    ├── quickstart.md
    ├── contracts/local-evaluation.md
    └── tasks.md
```

**Structure Decision**: This is an evaluator-facing documentation correction with one observed product defect. The only application write allowlist is `FirstAdminBootstrap` and its focused spec, to make the already-promised local first-administrator path work under the local delivery profile only after an explicit opt-in. The private guide is deliberately excluded from version control only through local Git metadata.

## Complexity Tracking

No constitutional complexity exception is required.
