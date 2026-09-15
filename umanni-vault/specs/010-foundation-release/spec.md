# Feature Specification: Foundation 0.2.0 Release

**Feature Branch**: `codex/010-foundation-release`

**Created**: 2026-09-15

**Status**: Planning accepted; release preparation in progress

**Input**: User description: "The Foundation merge is complete. Update local branches and publish the release before the next task, if every release gate is satisfied."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Verify a releasable foundation (Priority: P1)

As the project owner, Douglas can determine from durable evidence whether the merged Foundation is the complete and reviewed content intended for version 0.2.0, without relying on an earlier session's claim.

**Why this priority**: A release marker is immutable under project governance. Publishing against the wrong revision or with an incomplete milestone would make later reconstruction unreliable.

**Independent Test**: Compare the merged pull requests, reviewed head, integrated revision, milestone contents, local checkout and remote principal branch. The story passes only when every included item is closed, the reviewed and merged trees agree, required gates succeeded on the reviewed head, and no conflicting version marker exists.

**Acceptance Scenarios**:

1. **Given** the Foundation planning and implementation pull requests are merged, **When** release readiness is checked, **Then** the exact reviewed head, merge revision, equivalent content tree, successful gates, resolved review threads and milestone membership are recorded.
2. **Given** a milestone item is open, a required gate is invalid, the principal branch differs from the local checkout, or a 0.2.0 marker already exists, **When** readiness is checked, **Then** publication stops without creating or moving a marker.

---

### User Story 2 - Review the public release record (Priority: P2)

As a reader of the public repository, I can understand what 0.2.0 adds, how it was validated, and what remains unavailable from concise versioned notes and an aligned changelog.

**Why this priority**: The release must describe the delivered application foundation accurately and must not imply that user-management workflows, automated CI or deployment exist.

**Independent Test**: Read the versioned release notes, changelog, status and closure record together. The story passes when they identify the same version and scope, cite the merged planning and implementation deliveries, preserve known limitations and contain no stale pre-merge or pre-application claims.

**Acceptance Scenarios**:

1. **Given** the merged Foundation evidence, **When** the release record is prepared, **Then** it names the application foundation, pinned runtime, local packaging and observed validation without expanding the implemented scope.
2. **Given** excluded workflows and infrastructure, **When** the public notes are read, **Then** authentication, user management, imports, jobs, automated CI, runner installation and deployment remain explicitly outside 0.2.0.
3. **Given** the prior 0.1.0 record, **When** the changelog is updated, **Then** 0.2.0 is added without rewriting the historical 0.1.0 entry.

---

### User Story 3 - Publish and close the version safely (Priority: P3)

As the project owner, Douglas can merge an independently reviewed release-preparation pull request and then have version 0.2.0 published exactly once from the resulting integrated revision before another feature begins.

**Why this priority**: Publication depends on the preparation and its independent review. It must remain a separate, human-controlled transition.

**Independent Test**: After Douglas merges the reviewed preparation pull request, verify equality between the captured merge revision, local principal branch and remote principal branch; then verify that the immutable annotated version marker, final public release and closed milestone all resolve to that revision.

**Acceptance Scenarios**:

1. **Given** the release-preparation pull request is independently accepted on its exact head, **When** it awaits integration, **Then** no tag, release or milestone closure has occurred and Douglas receives an explicit merge handoff.
2. **Given** Douglas merges that pull request and the principal branch remains equal locally and remotely, **When** publication runs, **Then** an annotated immutable `v0.2.0` marker and final `Umanni 0.2.0` release are created from the integrated revision and the 0.2.0 milestone is closed.
3. **Given** the principal branch advances, a marker appears, or any release gate changes after review, **When** publication is attempted, **Then** the flow stops and reports the exact divergence without force, overwrite or milestone closure.

### Edge Cases

- The implementation pull request may have a merge revision different from its reviewed head while preserving an identical tree; both identifiers must be retained.
- The release-preparation pull request becomes another item in milestone 0.2.0 and must be closed before the milestone itself closes.
- Generated local artifacts that are ignored do not make the tracked tree dirty, but tracked or untracked conflicting files stop branch integration.
- A tag without a public release is a recoverable partial publication: retain the immutable tag and retry only the public release against the same target.
- A public release without the expected annotated tag, a lightweight tag, a moved tag, or a release targeting another revision is a blocking inconsistency.
- A new commit on the preparation branch invalidates its earlier review status and requires a new independent review.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The closure MUST record the exact implementation pull-request head, merge revision, content-tree comparison, local principal revision and remote principal revision.
- **FR-002**: The closure MUST independently verify required Foundation checks, the accepted review label and zero unresolved review threads on the implementation head.
- **FR-003**: The closure MUST verify that every item assigned to milestone 0.2.0 is closed or explicitly deferred with a reason and new destination before publication.
- **FR-004**: Versioned release notes MUST describe only the merged 0.2.0 scope, validation evidence and known limitations, with direct references to the planning and implementation pull requests.
- **FR-005**: The public changelog MUST add a dated 0.2.0 entry while preserving the existing 0.1.0 history unchanged.
- **FR-006**: Project status, the Foundation task ledger and a self-contained continuation prompt MUST identify the remaining human merge and post-merge publication steps without claiming they already occurred.
- **FR-007**: The release-preparation pull request MUST target milestone 0.2.0, carry a documentation label, assign Douglas and receive independent review on its exact head before integration.
- **FR-008**: No actor other than Douglas MAY merge or close the release-preparation pull request unless Douglas later authorizes that exact operation.
- **FR-009**: Publication MUST occur only after the reviewed preparation is merged and the captured integrated revision equals both the local and remote principal branch.
- **FR-010**: Publication MUST create one annotated immutable `v0.2.0` marker and one final, non-draft, non-prerelease `Umanni 0.2.0` release from the versioned notes, both targeting the captured integrated revision.
- **FR-011**: The milestone MUST close only after the marker and public release are verified against the integrated revision; issue 9 MUST remain in Backlog.
- **FR-012**: Any pre-existing 0.2.0 marker or release, branch divergence, newly open milestone item, invalid review/check, unresolved thread or unreviewed commit MUST stop the dependent transition without force or overwrite.
- **FR-013**: The closure record MUST preserve actual agent roles/models, commands run, observed results, identifiers, public URL, milestone state and any limitation without inventing automation.
- **FR-014**: Application source, runtime locks, branding assets and behavior MUST remain unchanged by this documentation-and-release delivery.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: One reproducible readiness record maps 100% of milestone 0.2.0 items to a closed or explicitly deferred state and contains zero undecided included items.
- **SC-002**: Four public version records—release notes, changelog, project status and closure evidence—agree on the delivered scope, version and known limitations with zero stale pre-merge claims.
- **SC-003**: The preparation pull request has one exact reviewed head, all required review conversations resolved by the reviewer, all required checks successful, `code-reviewed` and Douglas assigned before the merge handoff.
- **SC-004**: After authorized integration, the annotated marker, final public release, local principal branch and remote principal branch resolve to one captured revision, and milestone 0.2.0 reports zero open items and a closed state.
- **SC-005**: The repository diff for preparation contains zero application, dependency-lock, branding or runtime-behavior changes.
- **SC-006**: Any simulated or observed gate failure prevents all dependent publication mutations in 100% of the documented failure scenarios.

## Assumptions

- Douglas's message authorizes preparation of the closure branch and pull request, but does not authorize this agent to merge that future pull request.
- The Foundation implementation remains the content accepted in pull request 12, with head `988282f8b9212e1f018cbbd327758d7d2aefce80` and merge revision `665da839ab2efdd08c94664f842d9d17fcf3023c`.
- Milestone 0.2.0 remains milestone 3 and initially contains merged pull requests 11 and 12 with zero open items.
- Version 0.2.0 is a final SemVer minor release, not a draft or prerelease.
- Issue 9 and all user-facing workflows remain outside this release.
