# Feature Specification: Navigable visual prototype

**Feature Branch**: `codex/005-visual-prototype`

**Created**: 2026-09-14

**Status**: Completed, independently reviewed and integrated by PR #6; reviewed HEAD `da029a051264fe0e41bece6a6bdc57a133b4cc8b`, merge `0cd4c4142be8833401a5721c5e7cc637ea40b161`.

**Input**: Douglas requested the complete visual identity, playbook, design and navigable prototype, assessed critically by different personas, with UI kit/tokens ready for programming and atomic, conflict-free topic PRs.

The existing identity assets and reference hub do not satisfy the navigable-prototype requirement. This proposal covers the user-management journeys identified in [the test analysis](../../05-LEITURA-DO-TESTE.md), while keeping a visual demonstration distinct from production behavior. The detailed proposal below is not an approved business specification.

## Clarifications

### Session 2026-09-14

- Q: May sign-up, editing, deletion and import use fictional demonstration data, reset on page reload, without real authentication, files or database? → A: Douglas answered “Pode” (approved).
- Douglas also authorized continued visual work and agent-performed merges after all checks, and requested cross-review in the PRs. Two reviewer contexts independent of authorship must accept the same final HEAD before integration. This exception is scoped to the visual delivery, not the future production application.

## User Scenarios & Testing

### User Story 1 — Enter and navigate as either role (Priority: P1)

A reviewer explores the administrator and regular-user experiences without entering real credentials.

**Why this priority**: The prototype must demonstrate actual navigation and role-specific journeys, not only screenshots.

**Independent Test**: Start a clean demonstration, choose each fictional role, navigate its available destinations, sign out and restart.

**Acceptance Scenarios**:

1. **Given** the entry screen with a persistent demonstration notice, **when** the reviewer selects the administrator example, **then** the dashboard appears and users, import and own-profile destinations are reachable.
2. **Given** the same entry, **when** the regular-user example is selected, **then** the own-profile screen appears without administrator navigation.
3. **Given** a visitor, **when** the sign-up example is completed, **then** the prototype shows a clearly simulated regular-user account outcome and a reachable next step; no invitation, activation or email delivery is claimed.
4. **Given** any destination, **when** the reviewer uses navigation, back, sign-out or restart, **then** the expected destination appears, focus is meaningful and no dead end remains.

### User Story 2 — Manage fictional users and inspect feedback (Priority: P1)

A reviewer evaluates the administrator's list, creation, edit, role-change and deletion experiences using disposable examples.

**Why this priority**: These are central product journeys not proven by the static users board.

**Independent Test**: Create a fictional regular user, edit its name/email/role, inspect the changed list and totals, cancel a deletion, then confirm deletion of that same example.

**Acceptance Scenarios**:

1. **Given** the baseline fictional list, **when** the reviewer opens create/edit, **then** persistent labels, actions and inline error examples are available; cancel returns without changing the example.
2. **Given** a valid demonstration edit, **when** it is accepted, **then** the visible list/cards and dashboard counts agree with the disposable example state, with appropriate feedback.
3. **Given** the deletion dialog, **when** confirmation differs from trimmed `EXCLUIR`, **then** the destructive action is unavailable; the exact confirmation enables it and cancel remains available.
4. **Given** a displayed error/loading/empty scenario, **when** the reviewer selects its recovery action, **then** a meaningful next visual state appears. Selecting an error scenario does not claim an approved production validation rule.
5. **Given** an undecided case such as deleting the last administrator or altering the active administrator's own role, **when** it is encountered, **then** the prototype explicitly identifies the unresolved decision instead of implying an approved business rule.

### User Story 3 — Follow an import demonstration (Priority: P1)

A reviewer inspects a single-screen import journey and its persistent result states without supplying or processing real files.

**Why this priority**: Queue/progress/result feedback is central to the requested experience and cannot remain a static captioned group of alternatives.

**Independent Test**: Select a supplied fictional CSV or XLSX example, advance through queued/processing, then separately inspect completed, partial and failed outcomes and their recovery actions.

**Acceptance Scenarios**:

1. **Given** the import screen, **when** a supplied example is selected, **then** the selected filename is visible and its next action is clear.
2. **Given** the example, **when** the reviewer starts the demonstration, **then** queued and processing states are reachable; no fabricated percentage, elapsed time or actual background-job execution is claimed.
3. **Given** a selected result scenario, **when** it is shown, **then** completed, partial or failed feedback remains readable on the same screen, with an appropriate restart/retry demonstration action.
4. **Given** an import demonstration, **when** it finishes, **then** any example list/count change is identified as scenario data, not a real file-import result. The same baseline can always be restored.
5. **Given** a request to use a real local file, **then** the prototype explains that file reading, uploads, parsing, headers, duplicate rules and row errors belong to the later application specification.

### User Story 4 — Manage the fictional own profile (Priority: P1)

A reviewer explores the regular-user profile, edit and account-deletion experience.

**Why this priority**: The existing five compositions omit this required product journey.

**Independent Test**: Enter as the regular-user example, view and edit own details, cancel deletion, then confirm a disposable account-deletion example.

**Acceptance Scenarios**:

1. **Given** the regular-user example, **when** its profile is opened, **then** name, email, avatar fallback and role are visible without an administrative role editor.
2. **Given** an edit, **when** the reviewer saves or cancels, **then** the corresponding demonstration outcome is clear and recoverable.
3. **Given** account deletion, **when** the reviewer confirms `EXCLUIR`, **then** the demonstration ends at an explanatory signed-out state with restart available.
4. **Given** avatar presentation, **then** the existing initials/icon fallback rule is used; no storage/upload strategy is silently selected.
5. **Given** regular-user navigation, **then** other users are not offered as destinations; this visual restriction is never presented as proof of server authorization.

### User Story 5 — Evaluate responsive states and hand off the design (Priority: P2)

A reviewer can exercise every journey at wide/narrow sizes and trace visual decisions back to the existing design sources.

**Why this priority**: A prototype that only navigates on desktop or diverges from the kit does not make the design ready for implementation.

**Independent Test**: Repeat each journey at 1440×1024 and 390×844 with keyboard and pointer; compare components and screenshots against canonical assets/tokens and record independent persona findings.

**Acceptance Scenarios**:

1. **Given** a narrow viewport, **when** the menu opens, **then** navigation is reachable without covering essential content or losing keyboard focus.
2. **Given** users, **then** wide tables and narrow cards expose the same information/actions; no horizontal page overflow or clipped dialog is accepted.
3. **Given** a modal or transient message, **then** focus, escape/cancel, dismissal, error persistence and reduced-motion behavior have explicit tested outcomes.
4. **Given** the completed prototype, **when** a developer consults its handoff, **then** every route/state/control maps to the canonical component specification or an explicitly reviewed extension.
5. **Given** an independent fidelity or usability finding, **then** its disposition and corrective evidence are recorded; no nonexistent formal reviewer or approval is claimed.

### Edge Cases

- Reload/restart restores a documented fictional baseline; no real account or imported file survives.
- Back/deep-link behavior must not create an invisible role/session assumption; the plan must define a deterministic demonstration fallback.
- Invalid/empty input states are visible examples, not implicit password/email/duplicate policy.
- A dialog retains a visible cancel action, never loses focus off-screen and restores focus to its trigger after cancellation.
- Repeated actions cannot accidentally duplicate a demonstration operation.
- Import outcomes are separate reachable states, not simultaneously active cards masquerading as one running job.
- Missing avatar uses initials, then a generic icon only when no usable name exists.
- Unknown-role or last-administrator examples explain the unresolved policy rather than implement it.
- Short windows, long fictional labels and 200% text enlargement remain readable; reduced motion removes nonessential movement.
- No real password, personal data, selected file content or external request is necessary.

## Requirements

### Functional Requirements

- **VP-001**: Provide a genuinely navigable local visual prototype, not a gallery or a set of inert screenshots.
- **VP-002**: Cover all five user stories, including visitor sign-up, role-specific entry, dashboard, users CRUD/role, import and own profile/account deletion.
- **VP-003**: Simulate sign-up, edits, deletion and import outcomes using fictional disposable data. Reload or explicit restart restores the baseline. No real authentication, uploads, persistence or undecided production rules are implemented; Douglas approved this boundary.
- **VP-004**: Clearly separate demonstration controls/scenario selection from product-facing UI; maintain a visible fictional/non-production notice.
- **VP-005**: All visible primary actions have a meaningful tested demonstration outcome, or an explicit unresolved-policy explanation; no dead links or silent placeholder buttons.
- **VP-006**: Use Portuguese UI and English public documentation, following Douglas's correction; preserve existing branding sources, fonts, licenses and canonical notice.
- **VP-007**: Reuse the two original logo variants and measured light palette. No new logo, illustration, chart or dark theme.
- **VP-008**: Follow the current component/state contract; any required extension for sign-up/profile/create/edit is specified and reviewed before being built.
- **VP-009**: Preserve the authentication-only slogan restriction and Roboto action typography; table/card data remain equivalent.
- **VP-010**: Support keyboard navigation, visible focus, labeled controls, dialog focus restoration, deliberate error recovery and at least44×44 narrow targets.
- **VP-011**: Meet normal text contrast4.5:1 and large text/essential boundary/focus contrast3:1; color is never the only status signal.
- **VP-012**: At1440×1024 and390×844, every route/state remains usable without page overflow or clipped essential controls; validate short-window and enlarged-text behavior.
- **VP-013**: Preserve source records and provide a route/state-to-component handoff with reproducible checks and original-resolution screenshots.
- **VP-014**: Record actual model identification, internal persona findings, limitations and exact reviewed/published commits. Formal review must use a distinct session and current-HEAD ledger.
- **VP-015**: Keep atomic commits and a separate prototype topic PR without conflicts; preserve Douglas as assignee. Douglas authorizes agent-performed visual-delivery merges only after all validations, both independent reviews on the final HEAD, resolved findings and successful mandatory checks. Never bypass protections, enable auto-merge or expand into production behavior.
- **VP-016**: Do not claim the overall objective complete until identity, playbook, design, UI kit/tokens, navigable journeys, validation and required review evidence all exist.

### Key Entities

- **Demo persona**: fictional administrator or regular user; determines the experience being inspected, not authenticated identity.
- **Demo user**: disposable name, example-domain email, role and avatar fallback, never a real person.
- **Demo scenario**: named initial, loading, empty, invalid, success or failure presentation with an explicit reachable next step.
- **Import example**: supplied fictional filename/format and scenario outcome; no file content or import rules inferred.
- **Route/state reference**: destination, triggering action, current state, next state, focus behavior and canonical visual source.
- **Review evidence**: actual source/commit, scenario tested, viewport, observed result, screenshots and finding disposition.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A reviewer completes all five user stories and their acceptance scenarios using real controls, in both specified viewports, with zero unexplained dead ends.
- **SC-002**: Every primary control and every declared route/state has recorded transition and recovery evidence; all expected observations pass.
- **SC-003**: Every measured text/control pair meets its declared contrast threshold; zero clipped essential elements or horizontal page overflow in the tested viewports.
- **SC-004**: Demonstration state can be restored to the same documented baseline after each journey; no personal data, real credentials or real file content are required.
- **SC-005**: Every displayed logo/font and referenced license remains traceable to its preserved original; every visual extension is identified and reviewed.
- **SC-006**: Two reviewers independent of authorship deliver evidence-backed verdicts covering fidelity/accessibility and behavior/specification/evidence, with no unresolved actionable finding on the same current HEAD. The shared ledger becomes successful only after both acceptances.
- **SC-007**: The final prototype topic PR contains only authorized files, is conflict-free, and is integrated only after the complete SC-006 and validation gates under Douglas's scoped merge authorization.

## Assumptions

- This feature extends the completed static scope; neither the original asset-only prompt nor the gallery's approval authorizes new production rules.
- Douglas approved VP-003; the executable plan/tasks may now be prepared, followed by independent review before implementation.
- Public identity and component decisions remain authoritative: [briefing](../001-branding/briefing.md), [state matrix](../001-branding/contracts/component-state-matrix.md), [playbook](../../../branding/BRAND-PLAYBOOK.md), [tokens](../../../branding/tokens/tokens.json).
- Required application behavior is sourced from RF-01 through RF-09 in the test analysis. The prototype demonstrates the intended experience but does not prove authentication, persistence, queue processing, live transport or authorization.
- Credential activation, import policy, avatar storage and last-administrator protections remain application-specification decisions, not research guesses.
- The existing local reference hub remains a separate deliverable and will not be silently replaced.
- No dependency installation, hosting or runner/protection configuration is included. Automatic independent reviewer dispatch is required by Douglas's later instruction.
- Independent spec/plan/task approval on the exact HEAD must precede implementation; later implementation requires its own formal review. Internal personas are supplementary.

## Source Coverage and Stop Condition

| Source requirement | Proposed prototype coverage | Explicit production exclusion |
| --- | --- | --- |
| RF-01 | Visitor sign-up demonstration | Real account/activation/password provisioning |
| RF-02 | Admin dashboard vs own-profile entry | Real authentication/session authorization |
| RF-03 | Visible totals consistent with demo edits | Database/live transport correctness |
| RF-04 | Create, read, edit and delete fictional users | Persistence, concurrency and server validation |
| RF-05 | Demonstrate role-edit effects | Actual privilege enforcement/self/last-admin policy |
| RF-06 | CSV/XLSX sample selection and states | Upload, parsing and background worker |
| RF-07 | Sequential progress/result demonstration | Actual live job delivery/performance |
| RF-08 | Own-profile edit/deletion journey | Server-side access-control proof |
| RF-09 | Name/email/role and avatar fallback | Real avatar upload/storage/field policy |

Complete plan/tasks/contracts/validation policy, publish for independent specification review, and do not implement before both reviewers accept the exact planning HEAD. Then execute and validate all five journeys, correct and re-review findings, and merge only under the complete final gate. Stop dependent work on genuine scope conflict; do not silently introduce production rules. Completion means the visual prototype, handoff and validation are integrated and viewable locally, not a production application.
