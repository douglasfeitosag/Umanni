# Implementation Plan: Navigable visual prototype

**Branch**: `codex/005-visual-prototype` | **Date**: 2026-09-14 | **Spec**: [spec.md](spec.md)

## Summary

Local, disposable demonstration in `branding/prototype/`. Five journeys cover entry/sign-up, administrator CRUD, import, own profile and responsive handoff. Preserve the hub and brand assets. Douglas approved reset-on-reload fictional data and visual merges after all checks and cross-review. No production Rails/React application.

## Technical Context

- Standards-based HTML/CSS/JavaScript ES modules; no build, framework or installation.
- Node 24.19+ built-in test runner; local PATH also provides Node 25.8.2. Python 3 loopback static server.
- Existing Montserrat/Roboto, original logos and Heroicons geometry only. No remote resource at runtime.
- In-memory state; no auth, storage APIs, file reading, network writes, jobs or real data.
- Target: installed browser at 1440×1024, 390×844, 1440×640, 200% text and reduced motion.
- Three initial fictional people, no record limit or added search/filter/pagination/analytics modules.
- Synchronous demo decisions; 400 ms illustrative saving/deleting state, cancellable and duplicate-safe. Import advances explicitly, no fake percent or timings.

## Constitution Check

Pre-design: scope answered; BDD/TDD required; implementation waits for two independent planning acceptances on the exact HEAD. Post-design: all stories map to concrete routes/tests; no production rule is guessed. UI Portuguese, public docs English per Douglas's correction. Preserve licenses and all canonical assets. The production Rails/Inertia stack and coverage policy remain separate.

Two reviewer contexts independent of authorship must accept the same final HEAD. Each owns its findings; a designated reviewer sets shared success only after both verdicts exist. Douglas's later explicit authorization permits normal visual PR merges after all gates; no protection bypass, force-push or auto-merge.

## Design direction

Existing calm enterprise kit: Montserrat headings/body, Roboto actions, white/light-blue surfaces, dark-blue primary controls, 6/8 px radii. Sidebar 232 px, wide header72/gutter40; below768 use64 header/16gutter and native collapsible menu. Cards replace the table with identical information. Every control at least44×44. Slogan only on authentication. No new illustration, chart, dark theme or brand variant.

## Project Structure / exact allowed paths

```text
branding/prototype/
  index.html, styles.css, state.mjs, views.mjs, app.mjs, icons.svg
  README.md, VALIDATION.md, .gitignore
  tests/state.test.mjs, tests/views.test.mjs, tests/inventory.test.mjs
  tests/runner.html, tests/browser.mjs
  evidence/desktop.png, evidence/mobile.png, evidence/signup.png
  evidence/users.png, evidence/form.png, evidence/import.png
  evidence/profile.png, evidence/dialog.png
branding/hub/index.html                         # prototype link only
README.md                                      # actual delivery / run link
umanni-vault/specs/005-visual-prototype/
  spec.md, plan.md, research.md, data-model.md, quickstart.md, tasks.md
  checklists/requirements.md, contracts/interaction.md
umanni-vault/EXEC-005-PROTOTYPE-SCOPE.md          # append; retain history
umanni-vault/EXEC-005-VISUAL-PROTOTYPE.md
umanni-vault/STATUS.md                          # actual visual status only
umanni-vault/MEMORIA-PROJETO.md                  # project learnings only
```

No historical spec001/004, token, original font/logo/license, constitution or application edit. Icons reuse exact path geometry from existing boards; preserve provenance. PR6 targets main after baseline synchronization, retaining the reviewed PNG correction from main.

## Responsibilities / coverage policy

`state.mjs`: fixtures, immutable demo transitions, validation, route guards, counts and import phases; no DOM. `views.mjs`: escaped HTML for all routes/feedback/dialog; no mutations. `app.mjs`: small native DOM/event/hash/focus adapter, no business rules. Unit tests explicitly import and inventory both core modules (Node24 only covers imported files). Enforce ≥90% lines/functions/branches of **state.mjs and views.mjs**; no ignore pragmas or evasion by moving logic to adapter.

DOM adapter is outside the numeric Node denominator and instead must pass the complete native-browser action matrix in contracts/interaction.md, including actual events/forms/dialog and manual keyboard/visual checks. No claim of90% whole-app/production coverage. A native browser test page exercises the actual adapter in an isolated same-origin iframe, not a fake DOM. Failure or inability to execute that browser layer blocks acceptance. Node tests run with concurrency1 and2. This explicit visual-only policy avoids installing DOM test dependencies or claiming production qualification.

## Sequence / stop

Clarify → contracts/plan/tasks → two planning reviews → tests RED → each journey GREEN → real browser and eight original-resolution PNG inspections → scoped diff checks → publish → two final reviews/corrections → current-HEAD successful gates → normal merge and local viewing. Stop on real scope conflict, missing mandatory verification or failed review. Never label partial journey coverage complete.

## Complexity Tracking

Bounded adaptation: visual-only numeric core coverage plus exhaustive real-browser adapter acceptance, not the future application's test setup. A full application scaffold and dependency installation are unnecessary for this disposable demonstration.
