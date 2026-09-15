# Data Model: Foundation 0.2.0 Release

## Planned Version

- **Identifier**: `0.2.0`.
- **Target milestone**: GitHub milestone 3, `0.2.0`.
- **Included work**: planning PR #11, implementation PR #12 and the release-preparation PR created by this delivery.
- **Deferred work**: issue #9 and functional/infrastructure backlog remain outside the milestone.
- **State**: `verified` → `prepared` → `reviewed` → `merged` → `tagged` → `released` → `closed`.
- **Constraint**: a transition is valid only when every preceding state has exact evidence and no stop condition is active.

## Included Work Item

- **Reference**: pull-request or issue number and URL.
- **Destination**: `0.2.0` or an explicit later milestone/Backlog.
- **State**: open, merged/closed or deferred.
- **Evidence**: reviewed head, merge revision, checks, labels, threads and milestone membership as applicable.
- **Constraint**: no open or undecided 0.2.0 item at publication.

## Release-Preparation Pull Request

- **Branch**: `codex/010-foundation-release`.
- **Base**: principal branch at `665da839ab2efdd08c94664f842d9d17fcf3023c` when planning began.
- **Metadata**: `documentation`, Douglas assigned, milestone 0.2.0.
- **Review states**: `review-pending` → `changes-requested` when findings exist → `spec-reviewed` for accepted planning → `code-reviewed` for accepted final documentation.
- **Constraint**: every new head loses inherited acceptance and must receive a fresh `review-ledger` result.

## Release Evidence Set

- **Implementation reviewed head**: `988282f8b9212e1f018cbbd327758d7d2aefce80`.
- **Implementation merge revision**: `665da839ab2efdd08c94664f842d9d17fcf3023c`.
- **Content equality**: tree identifiers for reviewed head and implementation merge must match.
- **Preparation evidence**: exact final reviewed head, review URL/ID, status contexts, resolved-thread count, merge revision and ancestry.
- **Publication evidence**: annotated tag object type, peeled commit, remote tag, final release properties/URL and closed milestone state.

## Annotated Tag

- **Name**: `v0.2.0`.
- **Object type**: annotated `tag`.
- **Target**: captured merge revision of the release-preparation PR.
- **Message**: `Release 0.2.0`.
- **Constraint**: immutable after creation; no force, move or replacement.

## Published Release

- **Title**: `Umanni 0.2.0`.
- **Tag**: `v0.2.0`.
- **State**: final, not draft, not prerelease.
- **Notes source**: `umanni-vault/releases/0.2.0.md` in the tagged tree.
- **Target**: same captured merge revision as the tag and principal branch.

## Milestone Closure

- **Milestone**: number 3, `0.2.0`.
- **Pre-publication state**: open, zero open included items after the preparation PR merges.
- **Final state**: closed only after tag and release verification.
- **Backlog invariant**: issue #9 remains assigned to `Backlog`.

## Invalid Transitions

- `prepared` → `merged` without exact-head independent acceptance.
- `reviewed` → `tagged` before Douglas merges the preparation PR.
- `merged` → `tagged` when local main, origin/main and the captured merge revision differ.
- `tagged` → `released` when the remote annotated tag is absent or points elsewhere.
- `released` → `closed` when release properties/target or milestone contents are inconsistent.
- Any state → forced tag mutation or fabricated evidence.
