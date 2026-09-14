# Tasks: Navigable visual prototype

Input: [plan](plan.md), [spec](spec.md), research, data-model and interaction contract. Tests are mandatory. Every behavior increment follows relevant RED → GREEN → refactor, with real evidence in EXEC. No implementation before two exact-HEAD planning acceptances.

## Phase 1 — Setup

- [x] T001 Verify approved planning HEAD and both reviews in umanni-vault/EXEC-005-VISUAL-PROTOTYPE.md; preserve original assets and allowed-path inventory.
- [x] T002 Create branding/prototype/index.html and branding/prototype/.gitignore with local CSP, external module/style references and no dependencies.

## Phase 2 — Foundation

- [x] T003 Write baseline/reset, route fallback and immutable-state RED tests in branding/prototype/tests/state.test.mjs; add module inventory check in branding/prototype/tests/inventory.test.mjs.
- [x] T004 Implement baseline and selectors in branding/prototype/state.mjs: roles admin|regular, three fictional records, no storage.
- [x] T005 Write escaping/layout RED tests in branding/prototype/tests/views.test.mjs; implement shared escaped markup in branding/prototype/views.mjs, exact preserved paths in branding/prototype/icons.svg and token-derived branding/prototype/styles.css.

## Phase 3 — US1: entry and navigation (P1 / MVP)

Independent test: both demo identities reach their correct home, signup creates regular example, sign-out/back/restart/reload remain coherent.

- [x] T006 [US1] Add entry/signup/regular-route-guard RED cases in branding/prototype/tests/state.test.mjs and branding/prototype/tests/views.test.mjs.
- [x] T007 [US1] Implement login/signup/shell/routes in branding/prototype/state.mjs and branding/prototype/views.mjs; signup is always regular, invalid fields illustrative only.
- [x] T008 [US1] Wire hash navigation, forms, menu, reset and focus in branding/prototype/app.mjs; add native adapter tests in branding/prototype/tests/runner.html and branding/prototype/tests/browser.mjs.

## Phase 4 — US2: users and feedback (P1)

Independent test: create/edit/change role/cancel/delete an example; compare counts and table/card data; list error/empty/loading recover without losing fixtures.

- [x] T009 [US2] Add CRUD/count/policy/escaping/confirmation and deterministic save/delete success/error/retry/pending/cancel/duplicate/late-completion RED cases in branding/prototype/tests/state.test.mjs and branding/prototype/tests/views.test.mjs; include preserved target/draft/confirmation and reset defaults.
- [x] T010 [US2] Implement users/forms/counts/list scenarios in branding/prototype/state.mjs and branding/prototype/views.mjs; trim values, illustrative required/email errors, no product duplicate policy.
- [x] T011 [US2] Implement pure exact trimmed EXCLUIR, operation-ID begin/cancel/complete/retry and duplicate/stale-completion guards in branding/prototype/state.mjs with RED/GREEN; wire native dialog, selectors and400ms scheduling only in branding/prototype/app.mjs. Extend branding/prototype/tests/browser.mjs for deterministic failure/retry, draft preservation, focus and cancellation.

## Phase 5 — US3: import (P1)

Independent test: both supplied formats traverse selected/queued/processing and each terminal result, with retry/replace; no real file or added-user claims.

- [x] T012 [US3] Add import transition/idempotence RED tests in branding/prototype/tests/state.test.mjs and Node renderer tests for both formats, idle/selected/queued/processing/completed/partial/failed/retry feedback in branding/prototype/tests/views.test.mjs.
- [x] T013 [US3] Implement one-screen import/scenario transitions only in branding/prototype/state.mjs and render in branding/prototype/views.mjs; branding/prototype/app.mjs dispatches actions without deciding phases. Cover all outcomes in branding/prototype/tests/browser.mjs in addition to Node state/views tests.

## Phase 6 — US4: own profile (P1)

Independent test: regular account views/edits itself, cannot reach another record, and cancellation/deletion end coherently.

- [x] T014 [US4] Add self-only edit/delete/role and missing-user RED cases in branding/prototype/tests/state.test.mjs; add Node rendering tests in branding/prototype/tests/views.test.mjs for profile/view/edit, validation/guard feedback and every account-dialog state (open/invalid/valid/pending/error/retry).
- [x] T015 [US4] Implement profile/edit/account deletion in branding/prototype/state.mjs, branding/prototype/views.mjs and branding/prototype/app.mjs; add account lifecycle to branding/prototype/tests/browser.mjs.

## Phase 7 — US5: responsive handoff (P2)

Independent test: all journeys at both target viewports, keyboard, short window, enlarged text and reduced motion; original-resolution evidence and provenance verified.

- [x] T016 [US5] Validate/refine responsive styles, visible state/focus/44px targets and long content in branding/prototype/styles.css; run every browser action in contracts/interaction.md and record branding/prototype/VALIDATION.md.
- [x] T017 [P] [US5] Write branding/prototype/README.md with run, route/state map, limitations, original asset/license links and actual runtime declaration.
- [x] T018 [US5] Save and inspect all eight PNGs in branding/prototype/evidence/ as listed in plan.md; verify encoding/dimensions/hashes and contrast in branding/prototype/VALIDATION.md.

## Phase 8 — Integration and review

- [x] T019 Run full quickstart, core coverage at concurrency1/2 and browser runner; finish evidence and limitations in umanni-vault/EXEC-005-VISUAL-PROTOTYPE.md and branding/prototype/VALIDATION.md.
- [x] T020 Add prototype link and factual review/status copy only to branding/hub/index.html per contracts/interaction.md, preserving the gallery and truthful static-preview captions. Update README.md, umanni-vault/STATUS.md and umanni-vault/MEMORIA-PROJETO.md with actual visual delivery and scoped authority, preserving production decisions; verify no obsolete global pending claims remain for the integrated static delivery.
- [ ] T021 Check exact plan allowlist, intent-to-add/working diff and staged whitespace; commit/publish PR6 and record hashes in umanni-vault/EXEC-005-VISUAL-PROTOTYPE.md.
- [ ] T022 Obtain two independent final PR reviews, correct/recheck all findings on the same HEAD, then verify successful gate and perform authorized normal merge; record final integration result in PR and open branding/prototype/index.html locally.

## Dependencies and parallel opportunities

Setup→foundation→US1→US2→US3→US4→US5→integration. Shared state/view/adapter files are edited sequentially; tests precede their implementation. US3 tests can be reasoned about while US2 browser verification runs, but shared edits remain serialized. US4 cases may be reviewed alongside US3 outputs. T017 documentation can run separately from T016 styles. Two independent reviewers run concurrently only after the same immutable HEAD is published. MVP is US1 as a checkpoint, not final delivery; all five stories are required before merge.
