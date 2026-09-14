# Tasks: Navigable visual prototype

Input: [plan](plan.md), [spec](spec.md), research, data-model and interaction contract. Tests are mandatory. Every behavior increment follows relevant RED → GREEN → refactor, with real evidence in EXEC. No implementation before two exact-HEAD planning acceptances.

## Phase 1 — Setup

- [ ] T001 Verify approved planning HEAD and both reviews in umanni-vault/EXEC-005-VISUAL-PROTOTYPE.md; preserve original assets and allowed-path inventory.
- [ ] T002 Create branding/prototype/index.html and branding/prototype/.gitignore with local CSP, external module/style references and no dependencies.

## Phase 2 — Foundation

- [ ] T003 Write baseline/reset, route fallback and immutable-state RED tests in branding/prototype/tests/state.test.mjs; add module inventory check in branding/prototype/tests/inventory.test.mjs.
- [ ] T004 Implement baseline and selectors in branding/prototype/state.mjs: roles admin|regular, three fictional records, no storage.
- [ ] T005 Write escaping/layout RED tests in branding/prototype/tests/views.test.mjs; implement shared escaped markup in branding/prototype/views.mjs, exact preserved paths in branding/prototype/icons.svg and token-derived branding/prototype/styles.css.

## Phase 3 — US1: entry and navigation (P1 / MVP)

Independent test: both demo identities reach their correct home, signup creates regular example, sign-out/back/restart/reload remain coherent.

- [ ] T006 [US1] Add entry/signup/regular-route-guard RED cases in branding/prototype/tests/state.test.mjs and branding/prototype/tests/views.test.mjs.
- [ ] T007 [US1] Implement login/signup/shell/routes in branding/prototype/state.mjs and branding/prototype/views.mjs; signup is always regular, invalid fields illustrative only.
- [ ] T008 [US1] Wire hash navigation, forms, menu, reset and focus in branding/prototype/app.mjs; add native adapter tests in branding/prototype/tests/runner.html and branding/prototype/tests/browser.mjs.

## Phase 4 — US2: users and feedback (P1)

Independent test: create/edit/change role/cancel/delete an example; compare counts and table/card data; list error/empty/loading recover without losing fixtures.

- [ ] T009 [US2] Add CRUD/count/policy/escaping/confirmation RED cases in branding/prototype/tests/state.test.mjs and branding/prototype/tests/views.test.mjs.
- [ ] T010 [US2] Implement users/forms/counts/list scenarios in branding/prototype/state.mjs and branding/prototype/views.mjs; trim values, illustrative required/email errors, no product duplicate policy.
- [ ] T011 [US2] Implement native dialog, exact trimmed EXCLUIR, cancel/retry, 400ms pending and duplicate prevention in branding/prototype/app.mjs; extend branding/prototype/tests/browser.mjs for focus and cancellation.

## Phase 5 — US3: import (P1)

Independent test: both supplied formats traverse selected/queued/processing and each terminal result, with retry/replace; no real file or added-user claims.

- [ ] T012 [US3] Add import transition/idempotence RED tests in branding/prototype/tests/state.test.mjs.
- [ ] T013 [US3] Implement one-screen import/scenario controls in branding/prototype/state.mjs, branding/prototype/views.mjs and branding/prototype/app.mjs; cover all outcomes in branding/prototype/tests/browser.mjs.

## Phase 6 — US4: own profile (P1)

Independent test: regular account views/edits itself, cannot reach another record, and cancellation/deletion end coherently.

- [ ] T014 [US4] Add self-only edit/delete/role and missing-user RED cases in branding/prototype/tests/state.test.mjs.
- [ ] T015 [US4] Implement profile/edit/account deletion in branding/prototype/state.mjs, branding/prototype/views.mjs and branding/prototype/app.mjs; add account lifecycle to branding/prototype/tests/browser.mjs.

## Phase 7 — US5: responsive handoff (P2)

Independent test: all journeys at both target viewports, keyboard, short window, enlarged text and reduced motion; original-resolution evidence and provenance verified.

- [ ] T016 [US5] Validate/refine responsive styles, visible state/focus/44px targets and long content in branding/prototype/styles.css; run every browser action in contracts/interaction.md and record branding/prototype/VALIDATION.md.
- [ ] T017 [P] [US5] Write branding/prototype/README.md with run, route/state map, limitations, original asset/license links and actual runtime declaration.
- [ ] T018 [US5] Save and inspect all eight PNGs in branding/prototype/evidence/ as listed in plan.md; verify encoding/dimensions/hashes and contrast in branding/prototype/VALIDATION.md.

## Phase 8 — Integration and review

- [ ] T019 Run full quickstart, core coverage at concurrency1/2 and browser runner; finish evidence and limitations in umanni-vault/EXEC-005-VISUAL-PROTOTYPE.md and branding/prototype/VALIDATION.md.
- [ ] T020 Add prototype link only to branding/hub/index.html; update README.md, umanni-vault/STATUS.md and umanni-vault/MEMORIA-PROJETO.md with actual visual delivery and scoped authority, preserving production decisions.
- [ ] T021 Check exact plan allowlist, intent-to-add/working diff and staged whitespace; commit/publish PR6 and record hashes in umanni-vault/EXEC-005-VISUAL-PROTOTYPE.md.
- [ ] T022 Obtain two independent final PR reviews, correct/recheck all findings on the same HEAD, then verify successful gate and perform authorized normal merge; record final integration result in PR and open branding/prototype/index.html locally.

## Dependencies and parallel opportunities

Setup→foundation→US1→US2→US3→US4→US5→integration. Shared state/view/adapter files are edited sequentially; tests precede their implementation. US3 tests can be reasoned about while US2 browser verification runs, but shared edits remain serialized. US4 cases may be reviewed alongside US3 outputs. T017 documentation can run separately from T016 styles. Two independent reviewers run concurrently only after the same immutable HEAD is published. MVP is US1 as a checkpoint, not final delivery; all five stories are required before merge.
