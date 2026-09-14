# EXEC-005 — Navigable visual prototype

Date: 2026-09-14. Author context: Codex, exact serving alias not independently exposed. Branch codex/005-visual-prototype; PR6. Integrated baseline main `1a90b8b2714149279e9e85abad7c0cfc9daeca96`. Documentation English; interface Portuguese per Douglas's correction.

## Authorization and preparation

Douglas approved fictional reset-on-reload demonstrations, continued visual work, cross-review in PRs and agent merges only after all checks. No production authentication/storage/import policy is implemented under this scope.

The prior branch was synchronized with integrated main. Three add/add conflicts were the two evidence PNGs and EXEC-004; resolution retained the exact already-reviewed main versions. No user-authored unrelated edit existed. Synchronization commit ba11863. PR6 now needs review of the clarified spec, plan, tasks, research, model, interaction contract and quickstart before implementation.

Skills: speckit-clarify integrated one answered scope question and reconciled affected requirements/stop conditions; speckit-plan produced design artifacts; speckit-tasks produced22 ordered tasks (US1:3, US2:3, US3:2, US4:2, US5:3; setup/foundation:5; integration:4). No extension hooks are registered. Technical execution details were deferred to planning; functional scope, data, UX, nonfunctional limits, integration exclusions, edge cases, constraints, terminology and completion signals are now specified. Checklist quality is15/15, not formal approval.

Independent runtime researcher inspected installed Node capabilities without edits or installation. Numeric coverage is explicitly limited to decision/rendering core; actual DOM adapter has a separate exhaustive native-browser gate, never claimed as measured whole-app coverage. Both reviewers must accept this policy before code begins.

## Planning validation

Pending final publication checks and two independent reviews. No prototype code, runnable tests, coverage result, visual inspection or final acceptance is claimed yet. Reviewer identity, exact planning HEAD and reviews will be recorded in the PR. This document will record implementation evidence as it actually occurs.

Planning HEAD3498112 received cross-review from independent contexts prototype_review_visual and prototype_review_behavior (requested Luna high, exact serving aliases not exposed in their reports). VP-V-1/VP-B-03 identified missing deterministic save/delete failures; VP-V-2 identified stale hub copy scope; VP-B-01 required all operation/idempotence/import guards in the measured core; VP-B-02 required Node view coverage for import/profile. The corrective planning update defines two named outcome selectors, operation-ID begin/cancel/complete transitions with stale-result guards, all route/state renderer tests and narrow factual hub-copy refresh. All five original threads receive the corrective hash; only each finding owner resolves it after recheck. No implementation began before acceptance.

## Exact-HEAD planning gate

Implementation started only after the published planning HEAD `b80c62434592bb99cda9fe27967593a6c4b271ee` matched the clean local checkout and PR6. Independent context `prototype_review_visual` rechecked visual fidelity and accessibility and accepted that SHA in review `5201327951`; it resolved VP-V-1 and VP-V-2. Independent context `prototype_review_behavior` rechecked behavior, specification and evidence and accepted the same SHA in review `5201331962`; it resolved VP-B-01 through VP-B-03 and coordinated the shared gate after confirming all five threads resolved. The live `review-ledger` was `SUCCESS`, the label was `spec-reviewed`, the base was main `1a90b8b2714149279e9e85abad7c0cfc9daeca96`, and the PR remained conflict-free.

The execution allowlist is the exact path set in plan.md. Before creating prototype files, the existing logo, font, license, token, board and hub sources were inventoried read-only and remain unchanged. No `.specify/extensions.yml` exists, so no pre-implementation hook was registered. The requirements-quality checklist was 15/15; this is distinct from the two review records above.

## Implementation

The implementation session was configured as Codex `gpt-5.6-sol / medium`. The bounded pure-state subtask was delegated to `/root/prototype_state_executor`, explicitly created as `gpt-5.6-terra / high`; that context implemented `branding/prototype/state.mjs` and its state tests only. No reviewer is credited in this implementation section. The `speckit-implement`, `frontend-design`, `tdd` and `clean-code` skills governed task order, visual direction, RED/GREEN evidence and the final maintainability pass.

Created under the planned allowlist:

- runtime: `index.html`, `styles.css`, `state.mjs`, `views.mjs`, `app.mjs`, `icons.svg`;
- public handoff: `README.md`, `VALIDATION.md`, `.gitignore`;
- tests: `tests/state.test.mjs`, `tests/views.test.mjs`, `tests/inventory.test.mjs`, `tests/runner.html`, `tests/browser.mjs`;
- evidence: eight PNGs named exactly as the plan requires.

The prototype uses no dependency, build system, framework, storage, service worker, upload control, network write or dynamic evaluation. The CSP is local-only and declares `connect-src 'none'`. `state.mjs` owns route guards, immutable fixture transitions, validation and operation IDs; `views.mjs` owns escaped rendering; `app.mjs` owns native events, hash synchronization, focus and the illustrative 400 ms scheduler. Interface copy is Portuguese; public code/tests/README are English. All people and addresses are fictional under `example.test`.

### RED/GREEN record

The observed increments were real failures followed by the smallest passing implementation:

1. missing state module → baseline/reset/selectors and immutable fixtures;
2. missing login/navigation exports → both role entries and route guards;
3. missing CRUD transitions → create/edit/count changes and no guessed duplicate policy;
4. missing import transitions → CSV/XLSX selected/queued/processing/terminal/retry states;
5. missing list/restart behavior → loading/empty/error recovery without fixture loss;
6. missing dialog state → exact trimmed, case-sensitive `EXCLUIR` guard;
7. missing-target save raised `TypeError` → explicit rejected guard outcome;
8. missing `canBeginDelete` and form-draft APIs → pure disabled-state and draft preservation;
9. missing signup operation → pending/failure/retry/success with regular role only;
10. browser edit returned an administrator to dashboard → operation context now returns administrative edits to users and own edits to profile;
11. browser auth feedback was absent → feedback rendering added to visitor views;
12. wrapped signup link had a non-clickable bounding-box center → 44 px inline-flex target;
13. skip link changed the hash to `#main-content` → regression test failed, then explicit focus handling preserved `#/login`;
14. mobile dialog Escape targeted the hidden table duplicate → visible-trigger selection restored focus to the matching card action.
15. final visual review measured 33 px horizontal overflow at 1280×720 with 200% text → the decorative story remained clipped, the scaled authentication layout was released from shared page padding, mobile controls were allowed to reflow and a native-browser regression was added.
16. corrective visual review found that the first regression stopped at the visitor screen and metric cards exceeded the authenticated 390 px viewport → the regression now enters the administrator dashboard, narrow grid tracks/cards can shrink, and scaled shell actions reflow within their containers.

The native runner does not assert synthetic hidden-iframe focus restoration because that environment returned the iframe body after programmatic clicks. The mandatory observation was instead repeated with real browser keyboard input: Escape restored the trigger in both desktop table and mobile card layouts. Initial dialog focus and containment remain asserted/observed.

## Validation results

Executed from repository root after the final behavior/style changes:

```text
node --test --test-concurrency=1 branding/prototype/tests/*.test.mjs
28 passed, 0 failed

node --test --test-concurrency=2 --experimental-test-coverage [90% thresholds and explicit state/views includes]
28 passed, 0 failed
state.mjs 100.00% lines / 92.89% branches / 100.00% functions
views.mjs 100.00% lines / 90.96% branches / 100.00% functions
combined 100.00% lines / 92.12% branches / 100.00% functions

node --check branding/prototype/app.mjs
passed
```

Runtime evidence: Node `v25.8.2`; Python `3.14.7`; loopback server `127.0.0.1:8765`. The complete native-browser runner passed 8/8 journeys at 1440×1024 and again at 390×844. Manual checks covered all routes/actions, 1440×640, 200% text through the documented deterministic validation parameter, reduced motion, real Tab/Shift+Tab/Enter/Escape, native select, back/forward/reload, zero horizontal overflow, vertical recovery, and 44 px narrow targets. The 200% corrective check additionally measured equal scroll/client widths at 1280×720, 1440×1024 and 390×844. Console warning/error count was zero; all declared resources were local.

WCAG calculations and pair purposes are in `branding/prototype/VALIDATION.md`. Normal text pairs meet 4.5:1; large/control/focus pairs meet 3:1. White with `#03A1E0` is 2.93:1 and therefore appears only in preserved marks/decor, never as ordinary text. No dark theme exists because the public identity evidence was insufficient to define one faithfully.

The browser capture API emitted JPEG bytes for a `.png` path. Each evidence file was mechanically converted with the system image utility and then rechecked as true RGB PNG. Exact-window capture preserved 1440×1024 for seven files. The browser reported a 390×844 viewport while the payload excluded browser/scrollbar chrome and encoded `mobile.png` as 375×812; both facts are recorded. Full-page capture was rejected as viewport evidence after it reflowed long pages at a narrower breakpoint. Every final PNG was opened through original-resolution inspection after the last CSS change; no clipping, overlap, unreadable text or inconsistent hierarchy was observed.

Final screenshot SHA-256 values:

- desktop `55444481e9e27f099e1112c51e09b50c80c48380d2891b2e6e5bcc7ebd97d412`;
- mobile `bbb9d5c1f7cf8be3696b563d98d36f38bf0e5583288482f0261445eeeaf16fd2`;
- signup `848b96a006e8a9c89b340ae6c76fcf372b44a0e5f31b69a1ca3019c663215b88`;
- users `8b71f01a46ad3f48f709fa5f8d7bbfb173505fe58bcf42d92bdaf5d4c6d02ef3`;
- form `aa975ec2f8e0f0d8b90c4ed38a6d1a947c363895ab551d2a3651ff06656868b9`;
- import `3639ae01c52fb967e5d3aa7725bebb9445592a6beee090fcf98eb99bb0583f08`;
- profile `d364d4a5402b1475fd3cb02176aca41904ea096f5dd706dd2bf05a20cbdb7dd2`;
- dialog `a7af36df9c477995f2c3693eb2ecc656a38c896ee9d82c9eb1b7fbdfb7af8daa`.

Original logo/font/license hashes were rechecked unchanged. The Umanni notice remains `1655b05f29129a876e07226c3dbc1371d3f2f2c2b7ceb6c92699f55380d1a761`; Heroicons MIT notice remains `60e0b68c0f35c078eef3a5d29419d0b03ff84ec1df9c3f9d6e39a519a5ae7985`; Montserrat/Roboto remain the preserved OFL files. `icons.svg` copies only path geometry already present in the reviewed static boards and has SHA-256 `4143b6ea0ce656eb5d78b6b075a552c8ce55188df842649da8a1689b975dd916`.

Clean-code score: 9.0/10 for this disposable static scope. The residual size of the complete renderer/style files is preferable to introducing a production component framework outside authorization.

## Integration status

The hub now keeps every static-preview caption truthful, labels the already-integrated archive “Acervo estático revisado” and adds the separately labeled “Abrir protótipo navegável” link. README, STATUS, project memory and the historical scope report now distinguish the integrated static delivery, the demonstration and the absent production application.

Publication and implementation-review record:

- implementation commit: `add620e3785a87bdb6e002a85f12d7cc04d3f536`;
- commit message: `feat: add navigable Umanni visual prototype`;
- first PR6 implementation publication: `add620e3785a87bdb6e002a85f12d7cc04d3f536`;
- publication-evidence commit: `8852490b6d4dc0bb650ecb31336e9cd6263a924c`;
- initial behavior review on that publication: accepted in review `5202000485`;
- initial visual review on that publication: changes requested in review `5201971989`, finding `VP-FV-01` / thread `4008794925` for 200% horizontal overflow;
- first corrective commit: `bba93adad98505b10bd404cea3dddaa2ba7b016e`;
- behavior recheck on that commit: accepted in review `5202107581`;
- visual recheck on that commit: `VP-FV-01` corrected, then changes requested in review `5202108636`, finding `VP-FV-02` / thread `4008913968` for authenticated 200% horizontal overflow;
- second corrective commit: `9de40954bf6b3cd2c3b8df3de7470fb81e3a5820`;
- final visual/accessibility acceptance of that implementation: review `5202286007`, with `VP-FV-01` and `VP-FV-02` resolved only by their owner;
- final behavior/specification/evidence acceptance of that implementation: review `5202211290`;
- implementation findings: all seven review threads resolved by their owners; no remaining blocking finding;
- exact-HEAD finalization review, successful `review-ledger`, `code-reviewed` label and authorized merge result are recorded in the closing PR6 comment because those events necessarily postdate this immutable repository record.

Proposed learning: hash-routed visual prototypes must test skip links as navigation boundaries, and responsive layouts with duplicate table/card controls must restore focus to the visible representation. Screenshot evidence must keep browser viewport and encoded payload dimensions separate instead of silently equating them.
