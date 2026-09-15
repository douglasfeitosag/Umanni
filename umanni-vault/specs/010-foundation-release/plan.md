# Implementation Plan: Foundation 0.2.0 Release

**Branch**: `codex/010-foundation-release` | **Date**: 2026-09-15 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `umanni-vault/specs/010-foundation-release/spec.md`

## Summary

Prepare an auditable closure package for the already merged Foundation, review that package on its exact pull-request head, stop for Douglas to merge it, and only then publish the annotated `v0.2.0` tag, final GitHub Release and milestone closure. The preparation adds versioned notes, changelog/status/task-ledger updates, a closure report and a self-contained continuation prompt. It does not change application behavior or publish the release before the preparation merge.

## Technical Context

**Language/Version**: Markdown; POSIX shell snippets; Git and GitHub release metadata

**Primary Dependencies**: Git, GitHub pull requests, checks, review threads, labels, milestones, annotated tags and Releases

**Storage**: Versioned repository documents plus Git/GitHub metadata; no application database changes

**Testing**: `git diff --check`, exact-SHA/tree comparisons, link/text probes, Git object inspection and read-only GitHub API/CLI queries

**Target Platform**: Public repository `douglasfeitosag/Umanni`

**Project Type**: Documentation and release-lifecycle delivery

**Performance Goals**: Not applicable; correctness and reconstructibility are the release goals

**Constraints**: No force, tag movement, auto-merge, direct integration, premature milestone closure or application/runtime changes; every new pull-request head requires fresh review

**Scale/Scope**: Version 0.2.0; milestone 3; planning PR #11, implementation PR #12 and one release-preparation PR; issue #9 remains Backlog

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Gate result |
| --- | --- |
| I. Specification before execution | Pass: spec, plan, tasks, acceptance and stop conditions precede release-record changes. |
| II. Behaviors and tests | Pass: release transitions have Given/When/Then scenarios and executable state/SHA probes; no artificial application tests. |
| III. Architecture and minimum scope | Pass: no application, dependency, branding or runtime change. |
| IV. Auditable delivery | Pass: small commits, exact identifiers, versioned evidence and a self-contained handoff are required. |
| V. Human integration control | Pass: Douglas alone merges the preparation PR; the agent stops at the reviewed handoff. |
| VI. Memory, transparency and local delivery | Pass: public-safe documents use the required languages and actual models/results; no secret or unrelated memory is published. |
| VII. Independent tracked review | Pass: planning and final preparation receive separate exact-head reviews; reviewer owns findings, resolutions, ledger and labels. |
| VIII. Explicit version management | Pass: all work targets 0.2.0; tag/release follow reviewed merge and exact local/remote equality; the marker is immutable. |

No justified violations. Any failed gate stops dependent work.

## Phase 0: Research Decisions

Research is consolidated in [research.md](research.md). It fixes the version identity, included scope, release-preparation transition, public record language, partial-failure recovery and post-merge evidence strategy. No unresolved clarification remains.

## Phase 1: Design and Contracts

- [data-model.md](data-model.md) defines the version, included work, preparation PR, evidence set, tag, release and milestone state transitions.
- [contracts/release-lifecycle.md](contracts/release-lifecycle.md) defines pre-review, preparation, integration, publication, verification and recovery rules.
- [quickstart.md](quickstart.md) provides executable validation for preparation and post-merge publication.

Post-design constitution re-check: all eight gates continue to pass. The design intentionally makes the three user stories sequential because immutable release publication depends on reviewed preparation and a human merge; this state-machine dependency is a governance constraint, not hidden coupling.

## Project Structure

### Documentation (this feature)

```text
umanni-vault/specs/010-foundation-release/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── release-lifecycle.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Release records and handoff

```text
CHANGELOG.md
umanni-vault/
├── EXEC-010-FOUNDATION-RELEASE.md
├── PROMPT-COND-007-FOUNDATION-CLOSURE.md
├── STATUS.md
├── releases/
│   └── 0.2.0.md
└── specs/008-foundation-plan/tasks.md
```

**Structure Decision**: Keep planning and validation beside the existing vault specs; keep concise public history in the root changelog and the reusable Portuguese GitHub Release body under `umanni-vault/releases/`. Record post-publication facts in the PR comment because they occur after the immutable preparation commit.

## Execution Phases

1. Validate the integrated Foundation and the absence of conflicting 0.2.0 publication state.
2. Commit and publish planning artifacts on the release branch; open the preparation PR with milestone, label and assignee.
3. Obtain independent planning review on the exact head. Correct findings in their threads and re-review every new head.
4. After planning acceptance, create the public release records, status/task updates, closure evidence and continuation prompt.
5. Validate the documentation-only diff and failure-safe probes; commit/push and obtain independent final review on the exact head.
6. Stop with the reviewed PR awaiting Douglas's merge.
7. After Douglas merges, update local references, prove exact equality, create/push the annotated tag, publish the final release, verify targets, close the milestone and record post-publication evidence in the PR.

## Acceptance Criteria

- Planning and final preparation are independently accepted on their exact heads with no unresolved reviewer-owned threads; the final head has `code-reviewed`.
- The preparation PR is documentation-only, assigned to Douglas, labeled `documentation` and included in milestone 0.2.0.
- Release notes, changelog, status, task ledger, closure record and continuation prompt agree on scope and state.
- Before integration, tag/release remain absent and milestone remains open.
- After Douglas's merge, tag/release/local main/origin main resolve to the captured merge revision and milestone 0.2.0 is closed with zero open items.
- Issue 9 remains in Backlog and no application or runtime file changes.

## Stop Conditions

Stop before the dependent transition if the principal branch advances unexpectedly, the local/remote revisions differ, an included milestone item is open without an explicit destination, any required status/review/thread is invalid, the preparation PR receives a new unreviewed commit, `v0.2.0` or its release appears unexpectedly, a tag is not annotated, a public target differs, or any application/runtime/branding file enters the diff. Never force, move or replace a tag.

## Complexity Tracking

No Constitution violations require justification.
