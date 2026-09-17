# Tasks: Encrypted Rails Credentials for Application Secrets

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md), [contract](contracts/credentials.md), and [quickstart.md](quickstart.md)

**Target release**: `1.1.0` (GitHub milestone 9)

**Tests**: BDD scenarios are required. Configuration behavior follows TDD: focused tests must fail for the current plaintext environment contract before the minimal implementation, then pass before the full gates.

## Phase 1: Governance and planning

- [ ] T001 Validate `spec.md` against the original assessment expectation and record the bounded `SECRET_KEY_BASE`/database-URL scope.
- [ ] T002 Validate `plan.md`, `research.md`, `contracts/credentials.md`, and `quickstart.md` for exact paths, commands, acceptance criteria, and stop conditions.
- [ ] T003 Create milestone `1.1.0`, branch `codex/023-credentials-config`, and a planning PR with Douglas assigned and a coherent label.
- [ ] T004 Obtain independent exact-HEAD review of all planning artifacts; resolve reviewer-owned findings before touching application or public setup files.

**Checkpoint**: Planning HEAD has `review-ledger=success`, `spec-reviewed`, and zero open review threads.

## Phase 2: RED credential contract

- [ ] T005 [P] [US1] Add focused RSpec coverage in `spec/config/credentials_spec.rb` for credential resolution, missing-key/value failure, and absence of a plaintext `SECRET_KEY_BASE` production dependency.
- [ ] T006 [P] [US2] Add Compose contract assertions in the focused spec or support helper for `RAILS_MASTER_KEY` on `web`/`worker`, preserved database URLs, and no `SECRET_KEY_BASE` injection.
- [ ] T007 Run the focused tests against the current HEAD and record the expected RED failures in `umanni-vault/EXEC-022-CREDENTIALS-1-1-0.md`.

## Phase 3: User Story 1 - Private delivery credentials (Priority: P1) 🎯 MVP

- [ ] T008 [US1] Generate `config/credentials.yml.enc` with a non-production local value for `secret_key_base`; ensure `config/master.key` remains ignored and untracked.
- [ ] T009 [US1] Configure production Rails to resolve `secret_key_base` from `Rails.application.credentials` and fail closed when the credential is missing, while preserving the build-only `SECRET_KEY_BASE_DUMMY=1` asset-compilation path.
- [ ] T009a [US1] Add a build-stage regression assertion proving `docker build` succeeds without `RAILS_MASTER_KEY` and that the dummy value is never accepted as a runtime delivery credential.
- [ ] T010 [US1] Update `compose.yaml` and `spec/support/compose.delivery-test.yaml` so delivery passes `RAILS_MASTER_KEY` to both processes and no longer injects `SECRET_KEY_BASE`.
- [ ] T011 [US1] Run focused tests GREEN and verify a delivery boot with a valid out-of-band key and a controlled failure without one.

**Checkpoint**: `web` and `worker` boot with credentials only; no plaintext fallback exists.

## Phase 4: User Story 2 - Preserve environment and test isolation (Priority: P2)

- [ ] T012 [US2] Update `.env.example` and `README.md` to document private master-key handling, credential editing, delivery commands, and the deliberate database-URL boundary; remove `SECRET_KEY_BASE` generation instructions.
- [ ] T013 [US2] Run Compose config assertions and the existing database/test safety checks, confirming `DATABASE_URL`, `DELIVERY_DATABASE_URL`, and `TEST_DATABASE_URL` behavior is unchanged.
- [ ] T014 [US2] Build the production image with no `RAILS_MASTER_KEY` and audit it for ciphertext presence, build-history safety, and absence of `config/master.key`, `.env`, tests, and development tooling.

**Checkpoint**: Existing test/development isolation remains green and the public setup is coherent.

## Phase 5: User Story 3 - Auditable documentation and release evidence (Priority: P3)

- [ ] T015 [US3] Record actual RED/GREEN, Compose, image, privacy, `bin/check`, and `bin/check-delivery` results in `umanni-vault/EXEC-022-CREDENTIALS-1-1-0.md`.
- [ ] T016 [US3] Update `CHANGELOG.md`, `umanni-vault/releases/1.1.0.md`, `umanni-vault/STATUS.md`, and `umanni-vault/MEMORIA-PROJETO.md` with the scoped correction and limitations.
- [ ] T017 [US3] Run `git diff --check`, tracked-secret checks, and final documentation/link checks on the candidate HEAD.

## Phase 6: Final review and release preparation

- [ ] T018 Publish the candidate implementation HEAD and start a fresh independent `gpt-5.6-luna`/high reviewer for code, docs, tests, and evidence.
- [ ] T019 Resolve reviewer findings only in their original threads, rerun affected checks, and obtain exact-HEAD `review-ledger=success`, `code-reviewed`, and zero open threads.
- [ ] T020 Reconfirm PR metadata, milestone, checks, and exact reviewed tree; stop for Douglas's explicit merge/release authorization if not already provided for this `1.1.0` delivery.
- [ ] T021 After authorization, merge the PR, verify `HEAD == origin/main` and tree equality, create annotated immutable `v1.1.0`, publish the Release from `umanni-vault/releases/1.1.0.md`, close milestone `1.1.0` only when empty, and append the remote audit.

## Dependencies & Execution Order

- T001–T004 are sequential governance gates and block all implementation.
- T005–T007 are RED prerequisites for T008–T011.
- T012–T014 depend on the GREEN credential contract and must preserve the existing database safety behavior.
- T015–T017 require all user-story checkpoints; T018–T021 require the final candidate HEAD.

## Stop Conditions

- Stop if the requested migration expands to database credential rotation, an external secret manager, deployment, CI, or unrelated product behavior.
- Stop if any key/plaintext secret is tracked, copied into the image, printed in evidence, or required in a public document.
- Stop if a reviewed HEAD changes, a gate fails, or merge/release authorization for `1.1.0` is absent.
