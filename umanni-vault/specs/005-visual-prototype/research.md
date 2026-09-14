# Prototype research decisions

Date: 2026-09-14. Planning, not implementation evidence.

## Runtime

Decision: static HTML/CSS/ES modules and hash routes; no install, framework, storage or backend. Rationale: approved disposable visual scope and existing loopback server. Alternatives: inert gallery fails navigation; Rails/React bootstrap expands into production infrastructure. Native dialog/select preserve standard browser interaction.

Research context `/root/prototype_runtime_research` confirmed PATH Node25.8.2 and bundled Node24.19.0 with test coverage threshold flags. Top-level jsdom/happy-dom/Vitest are absent. No dependency installed. Native browser test page plus Browser skill verification avoids an unverified external browser driver.

Decision: ≥90% lines/functions/branches for explicitly inventoried state/render core, plus mandatory exhaustive native DOM/action matrix. Do not call this whole-application coverage. Node24 only sees imported modules. Sources: [Node test runner](https://nodejs.org/download/release/v24.0.2/docs/api/test.html#collecting-code-coverage), [Node threshold flags](https://nodejs.org/download/release/v24.7.0/docs/api/cli.html#--test-coverage-linesthreshold). Actual execution outputs belong in VALIDATION.

## Visual and interaction choices

Reuse delivered playbook/component spec/tokens/assets. Extend only sign-up/forms/profile composition. Import uses explicit scenario progression and retains one result; no actual file or user insertion implied. Form save/delete shows cancellable400ms pending; no auto-dismiss toast. Deep-link reload resets to login, whereas same-session back/forward retains state. Unresolved production policies return explicit explanations rather than fabricated rules.

## Review / integration

Douglas approved fictional simulation, two independent cross-reviews and agent visual merges after all gates. Each reviewer owns findings; shared ledger remains pending/failure until both accept the same HEAD. Spec acceptance precedes code. No inherited old-SHA acceptance.
