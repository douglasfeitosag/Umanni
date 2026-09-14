# EXEC-001 — Umanni visual identity

Request author: Douglas. Role: executor. Preparation: COND-001-BRANDING.md. Scope: static identity delivery on PR [#3](https://github.com/douglasfeitosag/Umanni/pull/3). Date: 2026-09-14.

## Outcome

The static deliverable contains preserved official assets, licenses, source records, framework-independent tokens, a playbook, a 16-section component specification, a component board, five compositions and validation evidence. Interface text is Portuguese; public delivery documentation is English, following Douglas's explicit correction during this execution.

This does **not** complete the broader thread objective: the navigable prototype remains to be planned, independently reviewed, implemented and browser-tested in a separate topic PR. Formal implementation review of the static kit is also pending; internal personas are not a substitute.

Canonical notice: [UMANNI-NOTICE](../branding/LICENSES/UMANNI-NOTICE.md). The brand is used for an unofficial evaluation without an express brand license; reuse is not authorized.

## Base, branch and entry gate

- Integrated base: `b374118f8793a2c86e9142400bfe5dc76f66f420`.
- Approved entry HEAD: `f1e145d606595f0913bae3ee417ba048e2c915c9`.
- Branch: `codex/003-branding-assets`; PR #3 remains open, assigned to `douglasfeitosag`, topic label `branding`.
- Initial branch/status checks showed a clean tree matching origin.
- PR HEAD matched the local SHA; `review-ledger=SUCCESS`, `spec-reviewed`.
- GraphQL returned one resolved review thread. Its final reviewer message explicitly reconfirmed f1e145d; no additional page or unresolved thread.
- Required-status-check API confirmed strict `review-ledger`. This is a manual status, not an automated workflow.
- PR #2 was not updated. No merge, auto-merge, closure or protection/runner change was performed.

## Model and internal personas

The runtime explicitly switched to a Codex agent based on GPT-6 before the produced deliverable. The exact preceding model identifier was not available as verified evidence. The requested recipient label `gpt-5.6-terra / high` is not treated as proof of actual execution by Terra. No exact alias or reasoning effort is invented.

Douglas explicitly requested agents with different personas to reach a verdict. Two subagents inherited the active runtime and performed bounded work:

- Fidelity/provenance persona: verified source colors, hashes, embedded logos, icons and notices; translated/consolidated PROVENANCE, the brand notice and icon manifest.
- Usability/accessibility persona: inspected every original PNG, reviewed geometry and recipes, and translated/consolidated the playbook.

Both provided internal findings and inspected delivered artwork. Neither published a formal GitHub review or acted as the separately requested Luna reviewer. Their verdict was that the images were legible and coherent, with documentation mismatches requiring correction before handoff. Corrections are listed below.

The frontend-design skill influenced spacing, hierarchy, restrained presentation and visual inspection. Its generic implementation suggestions were constrained to the static SVG/PNG scope.

## Language correction and planning reconciliation

Douglas clarified: only documentation needs English; the site/system should be Portuguese. The original test README at commit `7b5af5859afbb049221254bdacfa138aac25679b` was inspected through GitHub: its Documentation rule requires an English README and does not set UI language. The prior English-interface choice was internal D-012, not a test requirement.

Applied now: Portuguese labels, messages, slogan and EXCLUIR; English deliverable documents. Historical spec/briefing/contracts/STATUS/README/constitution and D-012 were outside this executor's editable scope and were not silently modified. Conductor follow-up: reconcile those records with Douglas's explicit instruction before handing off application or prototype implementation. The existing Portuguese checklist was only marked with verified results.

## Delivered files and formats

All paths below are relative to the repository root, except this report which lives under umanni-vault.

- `branding/README.md`, `BRAND-PLAYBOOK.md`, `COMPONENT-SPEC.md`, `PROVENANCE.md`, `VALIDATION.md`.
- `branding/LICENSES/`: Montserrat OFL, Roboto OFL, Heroicons MIT and canonical Umanni notice.
- `branding/assets/logo/`: official horizontal SVG/PNG, symbol PNG, technical ICO.
- `branding/assets/fonts/`: original variable roman Montserrat/Roboto TTFs.
- `branding/assets/icons/heroicons-manifest.md`: 15 actually used outline icons.
- `branding/tokens/tokens.json`: colors, complete rendered typography recipes, dimensions, spacing, radii, borders, shadow, focus, elevation, motion and breakpoints, with source classification and 38 allowed measured contrast pairs.
- `branding/boards/`: components, login-responsive, dashboard-desktop, users-desktop, import-desktop, users-mobile; each in editable SVG and rendered PNG.
- `umanni-vault/specs/001-branding/checklists/visual-acceptance.md`: verified checkbox results only.
- `umanni-vault/EXEC-001-BRANDING.md`: this report.

The final change scope is 29 branding files plus this report and the existing checklist. No application source, HTML, React, Rails, new functional rule, chart, illustration, dark theme or new brand variant.

## Sources, preservation and licenses

Full URL/date/HTTP/type/size/dimension/hash records: [PROVENANCE](../branding/PROVENANCE.md). Four brand assets match the research hashes:

| Original | SHA-256 |
| --- | --- |
| Horizontal SVG | `6570316b780107a92c5107dd271739a4f7e711db08d2f3c39fdd31bd6636eb19` |
| Horizontal PNG | `e48c6c021b2380ea197a452975b7dae4e76539a844d3d1fd90f20ab95d6a9d07` |
| Symbol PNG | `499d74fec6b1b711e0d166c744fe20dd3fcb63c1125e2da14a78a70f07e2c186` |
| Favicon | `4b58ef4177a142dcd6e9f6838b5281664a8c65d6d4026c2f29c7246ef5e7ca2a` |

The signature PNG is #03A1E0; the original symbol is #13A0DB. Both colors and all original bytes are preserved. The official SVG contains raster artwork and was not vectorized. ICO frames are 48/32/16 and never serve as another logo.

Montserrat source/local SHA: `0f7b311b2f3279e4eef9b2f968bcdbab6e28f4daeb1f049f4f278a902bcd82f7`. Roboto: `d7598e12c5dbef095ff8272cfc55da0250bd07fbdecbac8a530b9b277872a134`. Both internal nameID13/14 records confirm SIL OFL 1.1. Weights are explicit, Roboto width100. No font conversion/subsetting.

Heroicons are pinned to v2.2.0 commit `0435d4ca364a608cc75e2f8683d374e55abbae26`. The MIT license downloaded from master was additionally compared to the pinned release license; hashes match.

Two OFL copies needed whitespace-only normalization for the required Git check: remove one trailing space at line 21 in each, and append final LF to Montserrat. Exact comparison against only those transformations and equality of the full word sequence passed. Complete copyrights/license terms remain intact. Original/local hashes and sizes are explicitly separate in PROVENANCE; no byte-identity claim is made for these two normalized text files.

## Validation performed

The complete static quickstart was followed. Its short EXEC path was resolved to `umanni-vault/EXEC-001-BRANDING.md` from the repository root, consistently with AGENTS.md.

| Method / command | Actual result |
| --- | --- |
| `shasum -a 256`, `file`, `magick identify` on originals | Source/local metadata verified; only documented license whitespace differences |
| Binary TTF name/fvar inspection | OFL and axes confirmed from actual downloaded files |
| `rsvg-convert` with `PANGOCAIRO_BACKEND=fc` and temporary Fontconfig file | Six final PNGs at required dimensions using delivered TTFs |
| `FC_DEBUG=1` render inspection | Font file paths resolve to both delivered TTFs |
| Rerender to temporary files; `magick compare -metric AE` | Six comparisons: zero changed pixels |
| Independent JSON/sRGB contrast recalculation | All 38 allowed pairs pass; excluded white/brand pair 2.92553:1 fails as intended |
| XML/Pillow read-only geometry and type recipe analysis | 208 text elements, no out-of-canvas/artboard text, no text overlap, no missing rendered type recipe |
| Original-resolution image inspection | All 6 final PNGs inspected by executor; both personas inspected all 6 and final mobile adjustment |
| Mobile hit areas | Ten explicit targets≥44×44; login fields/action342×44; no covered controls |
| Source embedding/icon union | Brand image byte hashes match originals; icon geometry preserved; 15 used names match manifest |
| Local Markdown link/notice check | Eight Markdown documents checked; all local links exist; all 7 required notice references present |
| Board hash check | All 12 SVG/PNG hashes appear correctly in PROVENANCE |
| `git add --intent-to-add branding/ umanni-vault/EXEC-001-BRANDING.md` then `git diff --check` | First run found upstream OFL trailing spaces; documented normalization applied; rerun passed |
| Full intended staging then `git diff --cached --check` | Passed before each delivery commit |
| Final changed-path scope | Only branding/, this EXEC and checkbox-only visual-acceptance changes |

Renderer: librsvg 2.60.0, ImageMagick 7.1.1-47. Validation details and per-pair ratios: [VALIDATION](../branding/VALIDATION.md). Temporary read-only verifier used bundled Python/Pillow; no application tests or package installation.

## Findings corrected and limits

Corrected: default macOS font fallback; invalid-field example containing already-valid EXCLUIR; missing typography recipes; dialog width448 vs actual 520; card padding16 vs actual 16/12; missing outlined-danger recipe; badge padding8 vs actual 10; small horizontal mobile signature replaced with the original 44 px symbol; incomplete 9-icon manifest expanded to actual 15; supporting login copy labeled adapted.

Mobile cards end at y632; toast spans 680–752, preserving 48 px clear; notice ends near818 inside 844. Both login artboards are inside 1878×1024 with a 48 px gap. No clipping/overlap observed. All normal text passes4.5:1; all essential controls/focus pass3:1. White on #03A1E0 is explicitly disallowed; dark theme is absent due to insufficient public evidence, not a technical limitation.

User/dialog/import alternatives are captioned reference states. Static art does not prove actual navigation, focus containment, live announcements, role authorization, asynchronous import or reduced-motion behavior. Sources do not establish official logo minimum size/clear space; all such values are adapted, measured recommendations.

## Task status

T001–T012: entry gate, authorized structure, source collection, notices/licenses, preservation and original validation completed. T013–T019: tokens, manifest, playbook, full component/state specification, board and contrast validation completed. T020–T026: five compositions rendered at normative dimensions and inspected. T027–T030: inventory, quickstart evidence, this report and proposed learnings completed. T031: intent-to-add and staged checks passed; atomic commits and PR publication are recorded below and in the final PR handoff comment.

## Commits and PR handoff

1. `6567275b39a3963a4c4f3f88b4cebfa91b5c0d35` — `feat(branding): preserve official assets and license provenance`.
2. `95cc565fe27629d2cdb6f203a63817488a4da199` — `feat(branding): add Portuguese static UI kit and visual boards`.
3. Report/checklist commit message: `docs(branding): record static validation and review handoff`. Its final SHA is reported in the PR #3 handoff comment after publication; the report does not attempt to embed its own commit hash.

The push and final-head verification are performed after committing this report. PR #3 keeps topic label branding and Douglas as assignee; spec-reviewed is replaced with review-pending and review-ledger is set pending on the exact published HEAD. No technical acceptance or merge is asserted. A separate reviewer session must inspect that HEAD and publish each finding individually; the executor never resolves those conversations.

## Next-stage boundary and proposed learnings

The broader requested prototype requires a separate specification and topic PR. The approved001 plan prohibits executable behavior; completion of these images must not be misrepresented as completion of the navigable prototype. Conductor handoff: reconcile the language correction, define the local fictional-data prototype's exact routes/interactions/state transitions and acceptance, and obtain the required independent spec review before implementation.

Proposed learnings for the conductor, not edits to MEMORIA-PROJETO:

- Source hash equality establishes preservation, not color uniformity between separate public assets.
- Inspect effective font metadata; Montserrat defaults to weight 100, and current Roboto is OFL.
- On macOS, explicitly select the Pango Fontconfig backend; a configured font path alone does not prove the rasterizer used it.
- Keep icon manifest and rendered typography recipes aligned with actual artwork.
- Upstream license whitespace may fail diff checks; preserve complete terms and disclose any formatting-only normalization with separate hashes.
- Keep internal persona assessment separate from formal independent review and human merge authority.
- Distinguish English README requirements in the test from internal interface-language decisions.
