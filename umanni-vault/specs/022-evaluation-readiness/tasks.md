# Tasks: Local Evaluation Readiness

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md), [data-model.md](data-model.md), [local-evaluation contract](contracts/local-evaluation.md), and [quickstart.md](quickstart.md)

**Target release**: `0.4.1` (GitHub milestone 8)

**Tests**: BDD command scenarios are required. If command execution exposes an application defect, first add a failing focused test for that defect, then make the minimum scoped correction and rerun the focused test plus both gates.

## Phase 1: Governance and planning

- [ ] T001 Create and validate the feature specification in `umanni-vault/specs/022-evaluation-readiness/spec.md` with acceptance criteria, scope limits, and stop conditions.
- [ ] T002 Create and validate the implementation plan, research, data model, contract, and quickstart in `umanni-vault/specs/022-evaluation-readiness/`.
- [ ] T003 Create GitHub milestone `0.4.1`, branch `codex/022-evaluation-readiness`, and a documentation PR with Douglas assigned, a coherent label, and the milestone.
- [ ] T004 Obtain an independent exact-HEAD review of the planning artifacts on the PR; record and resolve all reviewer-owned threads before changing README or application files.

**Checkpoint**: No implementation begins until the planning HEAD has `review-ledger=success`, `spec-reviewed`, and zero open review threads.

## Phase 2: Foundational reproducibility audit

- [ ] T005 Read and compare `README.md`, `compose.yaml`, `.env.example`, `Dockerfile`, `bin/check`, and `bin/check-delivery` against FR-001 through FR-007; record any mismatch in `umanni-vault/EXEC-021-EVALUATION-READINESS.md`.
- [ ] T006 Confirm `ENTREVISTA-UMANNI-PRIVADO.md` is ignored only by `/Users/douglas/Projects/Umanni/.git/info/exclude` using `git check-ignore -v`, and confirm no tracked `.gitignore` change is planned.

**Checkpoint**: If the audit exposes a need outside the documentation allowlist, stop and request a concrete Douglas decision before implementation.

## Phase 3: User Story 1 - Start the published evaluation locally (Priority: P1) MVP

**Goal**: An evaluator can reproduce delivery startup, health checks, and local validation from the public README.

**Independent Test**: In a clean Git worktree or equivalent, execute each published setup and delivery command; verify both `web` and `worker` run and `/up` plus `/ready` succeed.

- [ ] T007 [US1] Update the evaluator instructions in `README.md` with explicit Docker Engine/Compose prerequisites, clone/version-selection commands, `.env` creation, private-secret warning, and local `SECRET_KEY_BASE` generation.
- [ ] T008 [US1] Update `README.md` delivery instructions to build and start `web` and `worker` together under `umanni-evaluation`, add `ps`, `/up`, and `/ready` checks, and distinguish liveness from database/migration readiness.
- [ ] T009 [US1] Update `README.md` verification instructions for `bin/check` and `bin/check-delivery`; state that CI/runner are manual Backlog work and arm64 validation does not prove amd64.
- [ ] T010 [US1] Execute the published setup, delivery, health, and verification commands from a clean Git worktree or equivalent; record command, environment isolation, SHA, and actual result in `umanni-vault/EXEC-021-EVALUATION-READINESS.md`.

**Checkpoint**: A first-time evaluator can start the complete delivery profile and distinguish `/up` from `/ready` without undocumented steps.

## Phase 4: User Story 2 - Bootstrap a safe local administrator (Priority: P2)

**Goal**: An evaluator can provision the first local administrator for the running delivery environment without publishing a secret.

**Independent Test**: On the isolated delivery database, run the documented bootstrap command twice with private local values; the first run creates an administrator and the second preserves it without exposing the password.

- [ ] T011 [US2] Update the local-administrator section of `README.md` to target the delivery database, use placeholders and local-only values, state idempotence/no-password output, and avoid placing a secret in the repository.
- [ ] T012 [US2] Execute the published bootstrap command twice in the isolated delivery environment and record its redacted real outcomes in `umanni-vault/EXEC-021-EVALUATION-READINESS.md`.

**Checkpoint**: The administrator path is executable against delivery and remains local/private.

## Phase 5: User Story 3 - Stop only this project's resources (Priority: P3)

**Goal**: An evaluator can move to development and safely stop the named evaluation project.

**Independent Test**: Run the documented transition and shutdown commands; their target is `umanni-evaluation`, never an unscoped Docker cleanup.

- [ ] T013 [US3] Update development-transition and shutdown instructions in `README.md` to stop conflicting delivery services first and use only the named project resources.
- [ ] T014 [US3] Execute the documented transition/shutdown path or the safe equivalent when the full verification matrix already owns the isolated project; record the exact result in `umanni-vault/EXEC-021-EVALUATION-READINESS.md`.

**Checkpoint**: The guide has no global cleanup command and no port-conflict ambiguity.

## Phase 6: Release evidence and final review

- [ ] T015 Create the root-local, ignored `ENTREVISTA-UMANNI-PRIVADO.md` with non-secret decisions, stack, functionality, evidence, limitations, and interview script; do not add it to Git.
- [ ] T016 Update `CHANGELOG.md`, `umanni-vault/releases/0.4.1.md`, `umanni-vault/STATUS.md`, `umanni-vault/MEMORIA-PROJETO.md`, and `umanni-vault/EXEC-021-EVALUATION-READINESS.md` with exact scope, commands, results, limitations, and release steps.
- [ ] T017 Run `git diff --check`, `bin/check`, and `bin/check-delivery` on the candidate HEAD; record only actual results and stop on failure.
- [ ] T018 Publish the final candidate HEAD and automatically start a fresh independent `gpt-5.6-luna`/high reviewer for PR/code/doc/evidence review; provide spec, plan, tasks, scope, and gate evidence.
- [ ] T019 Respond to any reviewer findings only in their original threads, make only scoped corrections, rerun affected checks, and request exact-HEAD re-review until the reviewer alone leaves `review-ledger=success`, applies `code-reviewed`, and resolves every thread.
- [ ] T020 Reconfirm PR metadata, checks, review threads, and merge authorization; merge the authorized PR, fetch `origin/main`, and verify the integrated SHA equals the reviewed target.
- [ ] T021 Create annotated immutable `v0.4.1` on that exact integrated SHA, publish the non-draft non-prerelease GitHub Release from `umanni-vault/releases/0.4.1.md`, close milestone 0.4.1 only when empty, and audit all remote state in `umanni-vault/EXEC-021-EVALUATION-READINESS.md`.

## Dependencies & Execution Order

- T001–T004 are sequential governance gates and block all implementation.
- T005–T006 establish the allowable documentation-only scope.
- US1 (T007–T010) is the MVP and must finish before bootstrap or shutdown evidence.
- US2 (T011–T012) and US3 (T013–T014) depend on the delivery contract from US1 but otherwise touch separate README sections.
- T015–T021 require all user-story checkpoints.

## Parallel Opportunities

- T005 and T006 can be inspected in parallel before any public documentation edit.
- After US1 draft commands are coherent, US2 and US3 README sections can be prepared independently but must be executed against the same final delivery contract.

## Stop Conditions

- Stop if an unplanned application/platform change, secret handling issue, mismatched reviewed/integrated SHA, immutable-tag conflict, failed check, open thread, or non-empty milestone would be required to proceed.
- Never merge, create a release, alter a prior tag/release, or close a milestone outside the explicit 0.4.1 authorization.
