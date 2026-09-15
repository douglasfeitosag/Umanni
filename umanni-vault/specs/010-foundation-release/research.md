# Research: Foundation 0.2.0 Release

## Decision 1 — Version identity and target

**Decision**: Publish product version `0.2.0`, annotated tag `v0.2.0` and final release title `Umanni 0.2.0`. The tag will target the merge commit of the reviewed release-preparation PR, not the earlier implementation merge.

**Rationale**: The preparation commit contains the notes and closure state that the release must expose. Tagging its integrated merge produces a self-consistent versioned tree while retaining the implementation merge and reviewed head as evidence.

**Alternatives considered**: Tag the implementation merge directly, rejected because the required 0.2.0 notes and changelog are absent there; create a lightweight tag, rejected by the Constitution; publish generated notes without a versioned source, rejected as non-reconstructible.

## Decision 2 — Included and excluded scope

**Decision**: Include the reviewed planning in PR #11, the Foundation application in PR #12 and this release-preparation PR. Describe the Rails–Inertia page, PostgreSQL isolation, pinned runtime, Compose profiles and observed quality evidence. Preserve authentication, user management, imports, jobs, automated CI, runner installation, deployment, SSR and issue #9 as excluded.

**Rationale**: This matches milestone 3 and the integrated tree without turning architectural intentions or backlog into delivered behavior.

**Alternatives considered**: Include future workflows based on the visual prototype, rejected because simulations are not implementation evidence; omit planning from the milestone record, rejected because it is part of the governed 0.2.0 delivery.

## Decision 3 — Two-stage review and human merge

**Decision**: Open one documentation PR containing the planning artifacts first, obtain independent specification review, then add the release records and obtain a final independent review on the new head. Stop for Douglas to merge.

**Rationale**: The Constitution requires reviewed spec/plan/tasks before execution, a new review after execution, and human control of integration.

**Alternatives considered**: Prepare all records before specification review, rejected by Principle I/VII; merge the PR automatically, rejected by Principle V; use one inherited review status after the execution commit, rejected because statuses are per SHA.

## Decision 4 — Versioned public records

**Decision**: Add English `CHANGELOG.md` history and Portuguese `umanni-vault/releases/0.2.0.md`; update Portuguese status, task ledger, execution evidence and the self-contained `PROMPT-COND-007-FOUNDATION-CLOSURE.md`.

**Rationale**: This follows the project language policy and gives GitHub Release a concise reviewed notes source. The continuation prompt separates pre-merge facts from post-merge actions.

**Alternatives considered**: Reuse the long implementation EXEC as the release body, rejected as unsuitable public summary; keep release facts only in chat, rejected as non-durable.

## Decision 5 — Failure and partial-publication recovery

**Decision**: Treat any unexpected existing marker/release or state divergence as blocking. If tag push succeeds but release creation fails, retain the immutable tag and retry only the release against the same target. Close the milestone only after target verification.

**Rationale**: This prevents force updates and keeps the recoverable partial state explicit.

**Alternatives considered**: Delete/recreate or move a tag, rejected by the Constitution; close the milestone before release verification, rejected because it would claim completion prematurely.

## Decision 6 — Post-publication evidence

**Decision**: Put facts known before merge in the versioned EXEC and record the actual preparation merge SHA, tag object/target, release URL and milestone closure in a final tagged-role PR comment after publication.

**Rationale**: Post-merge facts cannot be committed into the already tagged preparation revision without advancing the principal branch and invalidating exact-target equality.

**Alternatives considered**: Add a post-release commit immediately, rejected because the release target would no longer equal the principal branch; predict identifiers in the versioned file, rejected as fabricated evidence.
