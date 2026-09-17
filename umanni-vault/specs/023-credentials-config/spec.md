# Feature Specification: Encrypted Rails Credentials for Application Secrets

**Feature Branch**: `codex/023-credentials-config`

**Created**: 2026-09-17

**Status**: Draft

**Target release**: 1.1.0

**Input**: User request to correct environment configuration by using Rails credentials.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Configure a clean delivery checkout privately (Priority: P1)

An evaluator can clone the released application, provide the runtime master key privately, and start the delivery profile without putting an application secret in a tracked `.env` value or image layer.

**Why this priority**: Rails Credentials is an explicit expectation of the original assessment and is the security boundary for the delivered application secret.

**Independent Test**: From a clean checkout, follow the README setup, provide `RAILS_MASTER_KEY` only at runtime, start `web` and `worker`, and verify `/ready` and `/up` succeed without `SECRET_KEY_BASE` being supplied.

**Acceptance Scenarios**:

1. **Given** a clean checkout and a valid private `RAILS_MASTER_KEY`, **When** the evaluator starts the delivery profile, **Then** Rails resolves `secret_key_base` from encrypted credentials and both application processes boot.
2. **Given** a delivery environment without `RAILS_MASTER_KEY`, **When** Rails boots, **Then** startup fails closed with an actionable missing-credentials error and does not silently fall back to a plaintext secret.

### User Story 2 - Keep development and test isolation intact (Priority: P2)

An evaluator can continue using the existing development and test Compose profiles and database URL isolation while application secrets are managed through Rails Credentials.

**Why this priority**: Moving one configuration source must not weaken the existing database safety gates or parallel test setup.

**Independent Test**: Run the documented verification gate and development configuration checks; test continues to use `TEST_DATABASE_URL`, while development and delivery retain their existing database separation.

**Acceptance Scenarios**:

1. **Given** the test profile, **When** `bin/check` runs, **Then** it remains independent of delivery credentials and still rejects unsafe generic database configuration.
2. **Given** the development profile, **When** Compose renders its configuration, **Then** `DATABASE_URL` remains the operational connection coordinate and no production application secret is copied into the development image.

### User Story 3 - Follow auditable secret-handling documentation (Priority: P3)

An evaluator and maintainer can understand which values belong in encrypted credentials, which values remain operational environment variables, how to edit credentials, and how to verify that no key is tracked.

**Why this priority**: Correct implementation is incomplete if the published setup still instructs users to paste secrets into the wrong place.

**Independent Test**: Follow the README and quickstart from a clean checkout, inspect tracked files, and compare the rendered Compose environment with the documented contract.

**Acceptance Scenarios**:

1. **Given** a clean checkout, **When** the evaluator reads the setup guide, **Then** it explains encrypted `config/credentials.yml.enc`, private `RAILS_MASTER_KEY`, and the fact that `DATABASE_URL` remains an operational environment value.
2. **Given** Git inspection of the repository, **When** the evaluator checks ignored files and image inputs, **Then** `config/master.key`, `.env`, and plaintext application secrets are not tracked or copied into the production image.

### Edge Cases

- An empty or malformed master key must fail closed; no plaintext `SECRET_KEY_BASE` fallback is allowed in delivery.
- The encrypted credentials file must be present in the repository while its decryption key remains untracked and supplied at runtime.
- Test and development must remain usable without a production master key when their existing Rails defaults do not require production credentials.
- Database URLs may contain local example credentials; they are operational connection configuration, not application signing secrets, and remain in Compose/environment handling for this release.
- A test fixture may use a deterministic non-production credential only when it is clearly scoped to test and cannot be used by the delivery profile.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The repository MUST commit an encrypted `config/credentials.yml.enc` containing the application `secret_key_base` entry without committing `config/master.key`.
- **FR-002**: Production Rails configuration MUST obtain `secret_key_base` from `Rails.application.credentials` and MUST not require a plaintext `SECRET_KEY_BASE` environment variable for delivery startup.
- **FR-003**: The delivery Compose services MUST receive `RAILS_MASTER_KEY` only as a runtime secret and MUST stop injecting `SECRET_KEY_BASE` from `.env`.
- **FR-004**: `DATABASE_URL`, `DELIVERY_DATABASE_URL`, and `TEST_DATABASE_URL` MUST retain their existing operational and test-isolation semantics; moving application secrets MUST NOT move or weaken database safety checks.
- **FR-005**: Automated tests MUST cover credential resolution, missing-key failure behavior, absence of a tracked master key/plaintext secret, and the delivery Compose contract.
- **FR-006**: `.env.example`, README, and the feature quickstart MUST document private master-key handling, credential editing, delivery startup, and the deliberate boundary between credentials and operational environment variables.
- **FR-007**: The Dockerfile and production image audit MUST demonstrate that `config/master.key`, `.env`, and test/development-only tooling are absent from the final image while the encrypted credentials file is available.
- **FR-008**: The release documentation MUST record the exact verification commands, observed results, scope limits, and target version `1.1.0` without altering the prior `v1.0.0` tag or Release.

### Key Entities

- **Encrypted application credentials**: Versioned ciphertext in `config/credentials.yml.enc`, decrypted only with a private runtime master key.
- **Runtime master key**: Untracked `config/master.key` for local editing or `RAILS_MASTER_KEY` supplied by the delivery environment.
- **Operational environment configuration**: Database connection coordinates and test isolation values that remain environment/Compose concerns in this release.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A clean checkout starts delivery with `RAILS_MASTER_KEY` and no `SECRET_KEY_BASE` variable, and `/ready`, `/up`, and the worker process succeed.
- **SC-002**: A delivery boot without a valid master key exits nonzero with no silent plaintext fallback.
- **SC-003**: `bin/check`, `bin/check-delivery`, and the focused credential tests pass on the final reviewed HEAD.
- **SC-004**: `git ls-files` and a final-image audit show no tracked `config/master.key`, `.env`, or plaintext application secret.
- **SC-005**: README, quickstart, and release records contain copyable commands and actual observed results for the `1.1.0` candidate.

## Assumptions

- The target is the next minor release, `1.1.0`, after the published `v1.0.0`; prior tags, Releases, and milestones remain immutable.
- “Environment to credentials” means application signing/encryption secrets currently represented by `SECRET_KEY_BASE`; database URLs remain operational environment values because Rails Compose needs connection coordinates and existing test safeguards depend on them.
- Rails 8.1's standard encrypted credentials workflow is available; no new dependency, external secret manager, deployment platform, or CI runner is introduced.
- Douglas's authorization for the prior `v1.0.0` publication does not automatically authorize merging or publishing this new minor; the final integration/release gate must obtain explicit authorization if it is not separately provided.

## Stop Conditions

- Stop and ask one concrete question if moving database usernames/passwords into credentials is required rather than the bounded application-secret migration described above.
- Stop if Rails requires a new platform, external secret manager, authentication flow, or unrelated product change to satisfy this specification.
- Stop publication if the reviewed HEAD changes, any required gate fails, a key/plaintext secret is exposed, or the final integrated tree differs from the exact reviewed tree.
