# Plan — Brand reference hub

Branch: codex/004-branding-hub. Source base: ab33e712b0e6d2687471fe9ac2c83cb10b1e5f36 (static identity PR4). New PR targets codex/003-branding-assets while that parent remains unmerged, keeping its diff restricted to the hub topic. Recheck remote state immediately before creating/updating the PR; do not update a merged PR by assuming earlier state still holds.

## Layout

Wide: a light248 px sticky navigation rail, restrained content column, brand signature, clear chapter headings and generous visual previews. Narrow: compact header and native expandable section navigation above the content; no overlay drawer or script-managed focus trap. Sections: Visão geral, Marca, Cores, Tipografia, Componentes, Telas, Documentação. Existing board images are large enough to recognize their role, with explicit full-resolution links.

Palette and type values come from the delivered token file. Snapshot values rendered as HTML are checked against that file; the hub does not create a second token authority. English document links open their actual source files. The Portuguese hub labels are explanatory UI text.

## Allowed files

- branding/hub/index.html
- branding/hub/styles.css
- branding/hub/README.md
- branding/hub/evidence/desktop.png
- branding/hub/evidence/mobile.png
- umanni-vault/specs/004-branding-hub/spec.md
- umanni-vault/specs/004-branding-hub/plan.md
- umanni-vault/specs/004-branding-hub/tasks.md
- umanni-vault/EXEC-004-BRANDING-HUB.md

Existing branding files, root README, STATUS, constitution and planning001 remain read-only. No package.json, JavaScript application, build system, authentication or external hosting is needed.

## Execution and checks

1. Obtain independent persona assessment of spec/plan/tasks before writing HTML/CSS. Record actual findings and corrections; never invent a formal reviewer approval.
2. Create semantic HTML and CSS using relative references to preserved assets, supplied fonts and existing documentation. Include canonical unofficial-use notice.
3. Start a loopback-only static server rooted at this repository. Inspect the real page using the available browser skill.
4. Verify wide/narrow layout, all section and asset/document links, Tab/Shift+Tab/Enter, skip-link focus, native disclosure, visible anchor headings, supplied font loading, actual contrast, color/token consistency and loaded resources/errors. Page CSP disables JavaScript. Immediate scrolling and no animations satisfy reduced motion by default. Save original screenshots under branding/hub/evidence/.
5. Record actual results, final scope and model/persona limitations. Use intent-to-add and staged whitespace checks before atomic commits.
6. Publish the themed PR with assignee/labels, verify current HEAD and conflict state, and leave review-ledger pending. No merge or closure.

## Stop conditions

Stop dependent work for an unavailable source, an actual conflict with the requested scope or failed validation that cannot be fixed locally. Do not substitute a gallery for the separately requested full navigable application prototype.

## Independent plan assessment

The usability/accessibility persona read all three planning files before HTML/CSS existed. It found no unresolved product dependency, and requested explicit 44×44 targets, measured hub contrast, keyboard/disclosure/skip tests, reduced-motion evidence, real font/resource checks and an allowed screenshot destination. Those six changes are incorporated above. This is an internal independent assessment, not a claimed Luna/GitHub approval; formal review remains pending.
