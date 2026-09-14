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
