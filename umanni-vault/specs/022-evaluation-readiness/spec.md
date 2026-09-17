# Feature Specification: Local Evaluation Readiness

**Feature Branch**: `codex/022-evaluation-readiness`
**Created**: 2026-09-17
**Status**: Draft
**Target release**: 0.4.1
**Input**: Reproducible local-evaluation correction authorized by Douglas.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Start the published evaluation locally (Priority: P1)

An evaluator can obtain the published version, create their private local configuration, start the packaged application and its background worker together, and confirm that the application is live and ready.

**Why this priority**: This is the minimum path that makes the delivered application independently evaluable.

**Independent Test**: From a clean checkout or isolated equivalent, follow the documented clone, version-selection, environment, build, startup, and health-check commands; both delivery processes stay running and both endpoints succeed.

**Acceptance Scenarios**:

1. **Given** a machine with the stated prerequisites, **When** an evaluator follows the documented clone, version-selection, configuration, build, and delivery-start commands, **Then** the web process and the import worker are running together.
2. **Given** the delivery processes are running, **When** the evaluator requests `/up` and `/ready`, **Then** both requests succeed and the guide explains their distinct meanings.
3. **Given** the evaluator needs to validate the checkout, **When** they run the two documented verification gates, **Then** the guide identifies the expected successful completion and does not claim an automatic CI service exists.

---

### User Story 2 - Bootstrap a safe local administrator (Priority: P2)

An evaluator can create the first administrator in the local delivery database using a documented, bounded command without committing a secret.

**Why this priority**: An administrator is required to exercise the existing protected local flows after startup.

**Independent Test**: On an isolated delivery database, use the documented bootstrap command with local-only example values; it creates the first administrator and a second invocation leaves it unchanged.

**Acceptance Scenarios**:

1. **Given** a ready local delivery environment without an administrator, **When** the evaluator supplies their local bootstrap values and confirmation phrase, **Then** the first administrator is created without the command printing the password.
2. **Given** the administrator already exists, **When** the evaluator repeats the bootstrap command, **Then** the existing administrator remains unchanged.

---

### User Story 3 - Leave only this project's resources stopped (Priority: P3)

An evaluator can switch between local development and delivery and stop the resources identified by this project's Compose name without a global container cleanup.

**Why this priority**: Local evaluation must not disturb unrelated Docker work on the host.

**Independent Test**: Start the documented delivery environment, run the documented shutdown command, and confirm that only the named project's containers and network are removed while no global cleanup command is used.

**Acceptance Scenarios**:

1. **Given** the delivery profile uses the documented project name, **When** the evaluator runs the documented shutdown command, **Then** only that named project's resources are stopped and removed.
2. **Given** delivery is using port 3030, **When** the evaluator follows the documented development transition, **Then** delivery is stopped before development starts.

### Edge Cases

- A missing or empty `SECRET_KEY_BASE` prevents a usable delivery start; the guide must make local generation and private storage explicit.
- Starting only `web` leaves background imports unable to advance; the guide must start `web` and `worker` together.
- A healthy boot endpoint is not proof that the database and migrations are ready; the guide must distinguish `/up` from `/ready`.
- An arm64 validation result must not be represented as proof of amd64 validation.
- The private interview guide must never appear in Git status as a tracked change or be added to the repository ignore rules.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The public README MUST state Docker Engine and Docker Compose as explicit prerequisites.
- **FR-002**: The public README MUST provide copyable commands to clone the repository, select the published version, create `.env` from `.env.example`, and generate a local `SECRET_KEY_BASE`.
- **FR-003**: The public README MUST state that `.env` is private and must never be committed.
- **FR-004**: The public README MUST start the delivery web process and worker together, provide copyable `/ready` and `/up` checks, and accurately describe each endpoint.
- **FR-005**: The public README MUST provide copyable commands for the existing verification gates, the first local-administrator bootstrap, local development, and named-project shutdown.
- **FR-006**: The public README MUST distinguish verified facts from limitations: CI/runner remain manual Backlog work, and arm64 validation does not prove amd64 validation.
- **FR-007**: The change MUST be validated from a clean checkout or an equivalent isolated environment using the published commands.
- **FR-008**: A root-level `ENTREVISTA-UMANNI-PRIVADO.md` MUST record non-secret decisions, stack, implemented capabilities, evidence, limitations, and an interview script; it MUST be ignored only through `.git/info/exclude` and never tracked.
- **FR-009**: The release record MUST preserve the exact commands and observed results, scope limits, review evidence, immutable tag target, Release URL, and milestone result.

### Key Entities

- **Local evaluator**: Person independently setting up and assessing the released application on their own machine.
- **Private local configuration**: Untracked `.env` values and private interview notes that remain outside the public repository history.
- **Delivery project**: The named local collection of database, web, worker, storage, and network resources created for the evaluation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A clean or isolated checkout can complete every published setup, health, bootstrap, verification, and shutdown command without undocumented product steps.
- **SC-002**: The delivery startup command leaves exactly the documented web and worker application processes running before health checks are performed.
- **SC-003**: Both documented health checks return success after local delivery startup, while the guide clearly distinguishes boot liveness from database-and-migration readiness.
- **SC-004**: The two repository verification gates complete successfully on the final reviewed commit, with their real results recorded.
- **SC-005**: The final patch has no whitespace errors, no tracked `.env` or private guide, no open review threads, a successful exact-HEAD review ledger, and an empty 0.4.1 milestone after publication.

## Assumptions

- Docker Engine and Docker Compose are installed and available to the evaluator; no host Ruby or Node runtime is required.
- The existing delivery database and bootstrap task remain the supported local administrator path; this release adds no account, email, invitation, recovery, API, or deployment behavior.
- The repository's existing local validation is Linux arm64 on macOS; amd64 remains explicitly unvalidated.
- Douglas's written objective for this delivery expressly authorizes this PR's integration, annotated `v0.4.1` tag, public Release, and 0.4.1 milestone closure only after all stated gates; it does not authorize another PR, existing tag, or existing Release.

## Stop Conditions

- Stop and request a concrete decision if the published commands require an application or platform change beyond README, documentation, a private local guide, or a defect strictly necessary to make those commands meet this specification.
- Stop publication if the reviewed PR HEAD changes after final review, if the locally checked-out integrated commit differs from `origin/main`, if the integrated tree differs from the reviewed candidate tree, or if the immutable tag target, public Release target, or milestone state diverges.
- Stop if independent review, exact-HEAD ledger success, or zero resolved-thread evidence cannot be obtained.
