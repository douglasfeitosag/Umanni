# Tasks: Foundation 0.2.0 Release

**Input**: Design documents from `umanni-vault/specs/010-foundation-release/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/release-lifecycle.md](contracts/release-lifecycle.md), [quickstart.md](quickstart.md)

**Tests**: Release transitions use executable Git/GitHub probes and documentation checks. No application test is added or rerun solely to manufacture release evidence; the accepted Foundation results remain attributed to their observed SHA.

**Organization**: Tasks follow the three release stories. The stories are intentionally sequential because immutable publication depends on reviewed preparation and Douglas's merge.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it changes a different file and does not depend on an incomplete output
- **[Story]**: Maps the task to US1, US2 or US3
- Every task targets version `0.2.0`

## Phase 1: Setup and Planning Gate

**Purpose**: Establish the exact release baseline and obtain approval of the closure design before changing release records.

- [x] T001 Verify clean `codex/010-foundation-release`, local/remote Foundation merge `665da839ab2efdd08c94664f842d9d17fcf3023c`, reviewed head/tree equality and absence of `v0.2.0`; record observed facts in `umanni-vault/EXEC-010-FOUNDATION-RELEASE.md`.
- [x] T002 Validate `umanni-vault/specs/010-foundation-release/spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/release-lifecycle.md`, `quickstart.md`, `checklists/requirements.md` and this `tasks.md` with Spec Kit prerequisites, cross-artifact analysis and `git diff --check`.
- [x] T003 Commit only `umanni-vault/specs/010-foundation-release/` and the initial `umanni-vault/EXEC-010-FOUNDATION-RELEASE.md`, then push `codex/010-foundation-release` and open a documentation PR targeting main with milestone `0.2.0`, label `documentation` and Douglas assigned.
- [x] T004 Dispatch an independent Luna high reviewer in a fresh context for the exact planning HEAD; require reviewer-owned threads, `review-ledger` and `spec-reviewed`, recording dispatch and result in `umanni-vault/EXEC-010-FOUNDATION-RELEASE.md`.
- [x] T005 Resolve any planning findings through author replies and scoped commits in the original threads, returning every new HEAD to the reviewer; do not begin Phase 2 until exact-head acceptance is verified in `umanni-vault/EXEC-010-FOUNDATION-RELEASE.md`.

**Checkpoint**: Planning is independently accepted. No release notes, tag, release or milestone closure has been created.

---

## Phase 2: User Story 1 — Verify a releasable foundation (Priority: P1) 🎯 MVP

**Goal**: Produce a durable, independently reproducible readiness record for the merged Foundation.

**Independent Test**: PR #11 and #12 state, exact heads/merges/trees, required checks, labels, threads, milestone items, issue #9 destination and tag/release absence all reproduce the recorded result.

- [x] T006 [US1] Query and map PR #11, PR #12, required statuses, labels, assignees, milestone 3 items, review threads, issue #9, local/remote refs and 0.2.0 publication absence in `umanni-vault/EXEC-010-FOUNDATION-RELEASE.md`; cite exact identifiers and observed timestamps.
- [x] T007 [US1] Execute the pre-publication and failure-safe probes from `umanni-vault/specs/010-foundation-release/quickstart.md`; record pass/fail evidence without mutating tag, release or milestone in `umanni-vault/EXEC-010-FOUNDATION-RELEASE.md`.

**Checkpoint**: The Foundation is release-ready on evidence, while publication remains blocked on reviewed preparation and human merge.

---

## Phase 3: User Story 2 — Review the public release record (Priority: P2)

**Goal**: Add concise, versioned public records that agree on 0.2.0 scope, validation and limitations.

**Independent Test**: A reader can compare the release notes, changelog, status and closure evidence and find one version/scope with no stale pre-merge claim or unimplemented workflow.

- [x] T008 [P] [US2] Create Portuguese final-release notes in `umanni-vault/releases/0.2.0.md` covering PRs #11, #12 and the actual preparation PR, observed validation and explicit exclusions.
- [x] T009 [P] [US2] Add the dated English `0.2.0` entry and release link to `CHANGELOG.md` without modifying the historical `0.1.0` entry.
- [x] T010 [US2] Create `umanni-vault/PROMPT-COND-007-FOUNDATION-CLOSURE.md` with the actual preparation PR, reviewed-head field, minimum readings, exact post-merge gates, publication commands, success evidence and stop conditions.
- [x] T011 [US2] Update `umanni-vault/STATUS.md` and mark Foundation T019 complete in `umanni-vault/specs/008-foundation-plan/tasks.md` after the self-contained closure prompt exists; preserve tag/release/milestone as pending before merge.
- [x] T012 [US2] Complete the pre-merge state, task matrix, actual author/reviewer models, commands/results, limitations and post-merge placeholders in `umanni-vault/EXEC-010-FOUNDATION-RELEASE.md` without predicting future identifiers.

**Checkpoint**: All versioned public records exist and agree; tag, release and milestone closure still do not exist.

---

## Phase 4: User Story 3 — Publish and close safely (Priority: P3)

**Goal**: Obtain exact-head final review, hand control to Douglas for merge, then publish one immutable version from the captured integrated revision.

**Independent Test**: Before merge, the PR is accepted and publication objects are absent. After merge, annotated tag, final release, local/remote main and closed milestone all resolve to the captured preparation merge, with issue #9 still in Backlog.

- [x] T013 [US3] Run the complete documentation-scope, link, stale-claim and state validation in `umanni-vault/specs/010-foundation-release/quickstart.md`; require zero non-release files and update evidence in `umanni-vault/EXEC-010-FOUNDATION-RELEASE.md`.
- [x] T014 [US3] Commit/push the scoped release records, verify PR metadata and exact remote HEAD, invalidate inherited planning acceptance and dispatch the independent final Luna high review; record it in `umanni-vault/EXEC-010-FOUNDATION-RELEASE.md` and the PR.
- [x] T015 [US3] Respond to each final finding in its original thread, make only scoped corrections, re-run validation and return each new HEAD to the reviewer until `review-ledger=success`, final review label and zero unresolved threads are verified.
- [x] T016 [US3] Deliver Douglas an exact merge handoff from `umanni-vault/PROMPT-COND-007-FOUNDATION-CLOSURE.md`; stop before merge, tag, release or milestone closure unless Douglas explicitly authorizes the exact next transition.
- [x] T017 [US3] After Douglas merges, fetch/prune, fast-forward local main, capture the preparation merge SHA and execute every Integration Gate check in `umanni-vault/specs/010-foundation-release/contracts/release-lifecycle.md`; stop on any divergence.
- [x] T018 [US3] Create and push annotated `v0.2.0` on the captured merge, publish final `Umanni 0.2.0` from `umanni-vault/releases/0.2.0.md`, verify all targets and close milestone 3 only after successful verification.
- [x] T019 [US3] Publish the final `[CONDUTORA]` evidence comment on the preparation PR with merge SHA, tag object/peeled target, release URL/state, milestone state, issue #9 destination and complete T001–T019 outcome.

**Checkpoint**: Version 0.2.0 is complete only after T019. Until Douglas merges, the valid stopping point is T016.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup and Planning Gate**: starts from merged Foundation; blocks all release-record preparation.
- **US1**: starts only after exact-head planning acceptance.
- **US2**: depends on US1 evidence so public records cite observed facts.
- **US3**: final review depends on US2; T017–T019 depend on Douglas merging the accepted preparation PR.

### User Story Dependencies

- **US1 (P1)**: independently proves whether the already merged Foundation may enter release preparation.
- **US2 (P2)**: uses US1 evidence but is independently testable as a consistency/readability record.
- **US3 (P3)**: is the governed publication state transition and necessarily depends on reviewed US2 plus human merge.

### Parallel Opportunities

- T008 and T009 can be drafted in parallel from the same accepted evidence because they modify different files; they must be reconciled before T010–T013.
- Read-only Git/GitHub checks inside T006 can be queried concurrently, but the evidence is consolidated once.
- No publication mutation is parallel: tag verification, release creation and milestone closure remain serial.

## Parallel Example: User Story 2

```text
Task: "Draft umanni-vault/releases/0.2.0.md from the accepted evidence."
Task: "Draft the 0.2.0 section in CHANGELOG.md from the accepted evidence."
```

## Implementation Strategy

### MVP First: Readiness Only

1. Complete the planning gate.
2. Complete US1 and stop if any evidence diverges.
3. US1 alone provides the valuable decision: proceed with or block release preparation.

### Incremental Delivery

1. Planning review establishes authorized closure design.
2. US1 proves the integrated Foundation state.
3. US2 produces the versioned public record.
4. US3 reviews, hands off, publishes after merge and records closure.

## Notes

- All tasks target milestone 0.2.0; no work is silently assigned to a later version.
- Only T008/T009 are marked parallel, and their texts must agree before validation.
- A new commit invalidates prior review status.
- Do not claim application tests were rerun unless a command was actually executed; reuse earlier results only with their exact provenance.
- Never merge, force, move a tag, enable auto-merge or close the milestone early.

## Later ledger evidence

T014–T019 were reconciled on 2026-09-15 without changing their descriptions. The final PR #13 comment records reviewed head `f56971eca6b5e280e2f20cf0ccaae2dce3254a37`, merge `b5fc0ed5d9014e9841a82e0c19f634684db71182`, annotated `v0.2.0`, the final release, the closed 0.2.0 milestone, issue #9 in Backlog and T001–T019 completed.
