# EXEC-005 — Prototype scope preparation

Date: 2026-09-14. Role: executor reporting the remaining scope to Douglas and the conductor. Runtime declaration available in this session: GPT-5-based Codex; exact serving alias unverified. No Terra/Luna identity or formal reviewer is claimed.

## Goal audit and current evidence

The preceding goal turn made concrete progress: the central visual page was implemented, validated and published in PR5. The complete objective is not achieved because a navigable prototype and formal implementation review evidence are still missing.

Read-only verification at this turn:

| Objective part | Current evidence | Completion classification |
| --- | --- | --- |
| Identity/playbook/UI kit/tokens | Existing branding delivery and EXEC-001/VALIDATION; PR4 OPEN at97c5012e193b57531f245e07d9169cde84468e31 | Produced; formal current-HEAD review not proven |
| Central visual page | PR5 OPEN at22240075f53a82653d9a87d268ea735d7da28ac3; clean local checkout | Produced/validated previously; formal review pending |
| Formal gate | PR4 current HEAD has no status entries; PR5 review-ledger is pending | Not complete; never infer approval from an older SHA |
| Navigable prototype | Existing hub explicitly says it is a static gallery; no prototype plan or implementation in current scope | Missing |
| Complete journey design | Static compositions omit visitor sign-up and own-profile/form journeys | Requires specified extensions and review |
| Critical personas | Internal fidelity/usability evaluations exist for prior deliverables | Useful internal evidence, not the separate formal review |
| Atomic topic commits/PRs | PR4 and PR5 are separate; branch clean; new prototype drafting uses its own branch | Preserved; new topic remains draft |

The project STATUS file is historically behind the delivered artifacts. It was read for governance, not used as proof that no assets exist. No unrelated STATUS, constitution, source spec, hub or branding original was changed.

## This turn's deliverable

Branch: codex/005-visual-prototype, created from22240075f53a82653d9a87d268ea735d7da28ac3 after a clean-state check. Three public draft files only:

- specs/005-visual-prototype/spec.md
- specs/005-visual-prototype/checklists/requirements.md
- EXEC-005-PROTOTYPE-SCOPE.md (this report)

The draft covers five end-to-end visual journeys and maps all RF-01 through RF-09 without pretending the prototype proves production behavior. No executable plan, tasks or code are claimed complete.

## Scope decision for the conductor

Concrete question to Douglas: may the prototype simulate sign-up, editing, deletion and import with fictional disposable data reset on reload, without implementing real credentials, uploads, persistence or the still-undecided business rules?

Recommendation: approve that simulation boundary for the navigable design prototype, with persistent demonstration labeling and separate application-policy decisions. This permits meaningful interactive review without silently selecting activation, import or last-administrator behavior. A gallery alone is not offered as a replacement.

After the answer: record it in VP-003; complete the plan, route/state/fixture contracts, component extensions, tasks, BDD/TDD and coverage policy appropriate to the chosen implementation; obtain formal independent spec review on the exact HEAD. Only then produce the prototype and its real-browser/independent-review evidence. Existing protections and manual session-opening rules remain unchanged.

## Skill and validation evidence

The speckit-specify skill supplied the feature-template structure and quality-check lifecycle. The local preset resolver selected spec-template successfully. Sequential feature numbering and the vault-specific location were preserved. There is no .specify/extensions.yml, so no before/after hooks were registered.

The ignored local .specify/feature.json pointer is updated to this draft for later Spec Kit work; it is not a published deliverable. No generated scripts/templates were edited.

The quality checklist deliberately leaves unresolved scope/readiness/review items unchecked. The plan skill was inspected, but its workflow is not executed because it requires resolved clarifications. No application tests are invented for this documentation-only turn.

Final publication must repeat intent-to-add/working diff, full staging/cached diff checks and exact path validation, then preserve Douglas as assignee and review-pending. This is a draft for decision, not a reviewer-approved execution specification. No merge, closure, runner/protection change or automatic user-owned session creation is authorized.

## Internal scope assessment

The usability persona read the source product requirements, closed branding brief and state matrix independently. It recommended the disposable simulation boundary and identified the missing sign-up/create/edit/own-profile designs. It also required explicit identity selection and post-action destinations, deterministic fixtures/reset, separation of scenario controls from product controls, no administrative role in public sign-up, no real avatar upload/remote URL, and preservation of single-screen import states. These concerns are reflected in the draft and are mandatory inputs to the later plan. Undecided policies must be explained as undecided, not implemented as apparent definitive restrictions. This was internal planning assistance, not a formal Luna review or permission to execute.

## Proposed learning

Distinguish static boards, a reference gallery and a navigable demonstration in completion audits. Trace every required product journey, especially those absent from existing boards. A request to keep working does not settle unresolved product behavior or waive formal review.
