# Implementation Plan: Encrypted Rails Credentials for Application Secrets

**Branch**: `codex/023-credentials-config` | **Date**: 2026-09-17 | **Spec**: [spec.md](spec.md)

**Input**: Move the delivery application's signing secret from plaintext environment configuration to standard Rails encrypted credentials for release `1.1.0`.

## Summary

Create and commit the encrypted Rails credentials file, configure production Rails to resolve `secret_key_base` from it, and pass only the private `RAILS_MASTER_KEY` at delivery runtime. Preserve database URL environment semantics and test isolation. Keep the Docker asset-build path secretless by retaining Rails' documented `SECRET_KEY_BASE_DUMMY` build-only escape hatch; never pass a real master key into `docker build`. Replace the README/.env instructions that currently ask evaluators to generate `SECRET_KEY_BASE`, add focused RED/GREEN coverage, audit the final image and run the repository gates. Record exact evidence for a candidate `1.1.0` release.

## Technical Context

**Language/Version**: Ruby 4.0.6, Rails 8.1.3.1, Bash, Markdown, YAML

**Primary Dependencies**: Rails encrypted credentials, Docker Compose, RSpec, existing `bin/check` and `bin/check-delivery`

**Storage**: PostgreSQL URLs remain Compose/environment configuration; encrypted application secret is versioned in `config/credentials.yml.enc`

**Testing**: Focused Rails configuration specs, Compose config assertions, `bin/check`, `bin/check-delivery`, image inspection, `git diff --check`

**Target Platform**: Docker Desktop Linux arm64 on macOS; amd64 remains unvalidated

**Performance Goals**: No new runtime performance target; credentials lookup must not add a network dependency

**Constraints**: No external secret manager, deploy/CI work, database migration, authentication change, or prior-tag mutation; master key and `.env` remain private; build must not receive or persist a real key

**Scale/Scope**: `config`, `compose.yaml`, `.env.example`, README, focused specs, Docker image audit, changelog, vault execution/release records, and feature governance artifacts

## Constitution Check

| Principle | Pre-design result | Post-design result |
| --- | --- | --- |
| I. Specification before execution | PASS — target `1.1.0`, BDD scenarios, acceptance criteria, and stop conditions are in `spec.md` | PASS — tasks keep the implementation allowlist and explicit checkpoints |
| II. Behaviors and tests | PASS — missing-key and no-plaintext behaviors are specified before code | PASS — focused RED/GREEN tests precede configuration edits and repository gates |
| III. Minimum architecture | PASS — uses Rails built-in credentials, no new service or abstraction | PASS — only existing production configuration and Compose wiring change |
| IV. Auditable delivery | PASS — exact commands, image audit, PR and release records are planned | PASS — execution record will capture observed results and exact reviewed SHA |
| V. Human integration | PASS — prior `v1.0.0` authorization is not reused; final merge/release requires explicit authorization | PASS — no automatic merge, tag, or Release is planned before the final gate |
| VI. Privacy and local delivery | PASS — ciphertext is public, key and `.env` remain private | PASS — image and Git audits prove no key/plaintext secret leakage |
| VII. Independent review | PASS — planning review precedes implementation; fresh Luna/high review follows final code | PASS — any new HEAD invalidates the prior review evidence |
| VIII. Version management | PASS — milestone `1.1.0` is open; prior `v1.0.0` remains immutable | PASS — tag/Release can target only the exact integrated reviewed SHA |

## Project Structure

```text
config/credentials.yml.enc                         # Versioned ciphertext
config/environments/production.rb                  # Credentials-backed secret configuration
compose.yaml                                        # Runtime RAILS_MASTER_KEY contract
.env.example                                        # Private runtime key guidance
README.md                                           # Public setup and secret-handling guide
spec/config/credentials_spec.rb                     # RED/GREEN credential behavior tests
spec/support/compose.delivery-test.yaml             # Isolated delivery test key wiring
CHANGELOG.md                                        # 1.1.0 release summary
umanni-vault/
├── EXEC-022-CREDENTIALS-1-1-0.md                  # Actual commands/results and release audit
├── STATUS.md                                      # Current state after publication
├── MEMORIA-PROJETO.md                             # Scoped project learning, if warranted
├── releases/1.1.0.md                              # Versioned release notes
└── specs/023-credentials-config/                  # Governance artifacts
    ├── spec.md
    ├── plan.md
    ├── research.md
    ├── quickstart.md
    ├── contracts/credentials.md
    └── tasks.md
```

**Structure Decision**: Keep Rails' standard credentials boundary. Application signing secrets are encrypted and loaded by Rails; database connection coordinates remain environment/Compose inputs because they are operational and already guarded by the test harness. No new runtime component or data model is introduced.

## Delivery Checkpoints

1. Planning HEAD: spec, plan, tasks, contract, research and quickstart reviewed independently with `review-ledger=success`, `spec-reviewed`, and no open threads.
2. RED/GREEN: focused credential tests fail for the current `SECRET_KEY_BASE`-only behavior, then pass after the minimal configuration change.
3. Integration: README/.env/Compose contract, image audit, `bin/check`, `bin/check-delivery`, and privacy checks pass on one candidate HEAD.
4. Final review: fresh independent reviewer confirms code, docs, tests, evidence and exact HEAD; only then ask for/consume explicit integration and release authorization.

## Build and key-distribution decision

The released ciphertext is public, but its decryption key is not. The published quickstart therefore targets `v1.1.0` and explicitly requires the evaluator to obtain `RAILS_MASTER_KEY` through the private delivery channel (or create a replacement credentials file before first use). The key is never placed in GitHub, `.env.example`, Docker build args, image layers, logs, or release notes. Asset compilation remains reproducible without that key through the existing build-only `SECRET_KEY_BASE_DUMMY=1` environment; runtime production boot does not accept that dummy value as its credential source.

## Complexity Tracking

No constitutional complexity exception is required.
