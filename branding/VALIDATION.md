# Static validation evidence

Date: 2026-09-14. Executor: Codex, GPT-6-based runtime after an explicit model switch. [Canonical Umanni notice](LICENSES/UMANNI-NOTICE.md). These results cover static artifacts only; they do not prove application behavior or formal reviewer acceptance.

## V01 — Entry gate

PASS. Local branch `codex/003-branding-assets` and PR #3 both pointed to `f1e145d606595f0913bae3ee417ba048e2c915c9`. Working tree was clean. `gh pr view 3` reported OPEN, `review-ledger=SUCCESS`, `spec-reviewed`, `branding`, assignee `douglasfeitosag`. GraphQL returned one resolved review thread, confirmed by the reviewer at that same SHA, with no next page. The required-status-check API reported `review-ledger` with `strict=true`. This was the specification gate; new implementation commits require a new review.

## V02 — Original files and licenses

PASS. Executed from the repository root:

```sh
shasum -a 256 branding/assets/logo/* branding/assets/fonts/* branding/LICENSES/*.txt
file branding/assets/logo/* branding/assets/fonts/*
magick identify branding/assets/logo/*.png branding/assets/logo/favicon.ico
```

All nine original-file/license hashes match their local records in PROVENANCE. The four brand files, two TTFs and Heroicons license match the downloaded originals byte for byte. The two OFL licenses received documented whitespace-only normalization: one trailing space removed from line 21 in each, plus final LF added to Montserrat. Exact comparison with those transformations and full word-sequence equality passed. All four brand hashes also match research.md. Horizontal PNG: 1782×459, RGBA, sRGB; symbol: 1095×1004, RGBA, sRGB. ICO: 48×48, 32×32, 16×16. SVG: viewBox 1300×335 containing a 1081×275 PNG, not vector logo geometry. All HTTP responses for the delivered originals were 200.

`magick identify -verbose` found opaque signature pixels #03A1E0 (285807 pixels) and symbol pixels #13A0DB (580672 pixels). Both were preserved. The executor opened both original PNGs at original resolution; the fidelity persona also inspected both and the official SVG rendered to 1300×335. No new variant, distortion, recoloring or favicon-as-logo was found.

Binary inspection of TrueType `name` and `fvar` tables using Python's standard `struct` module confirmed SIL OFL 1.1 in nameID 13 and `https://openfontlicense.org` in nameID 14 for both TTFs. Montserrat wght range/default: 100–900/default 100; Roboto wght 100–900/default 400 and wdth75–100/default 100. All artwork explicitly uses weights 400/500/600/700 and Roboto normal width. No historical Apache license was assumed for Roboto.

Heroicons: the 15 actual outline drawings are pinned to commit `0435d4ca364a608cc75e2f8683d374e55abbae26`, v2.2.0. The initial attempt used the annotated tag object SHA and returned 404; resolving that object to its commit fixed the download. All 15 successful source responses were 200. Embedded paths/attributes match their downloads. Only actually used symbols appear in each board; the union matches the manifest.

## V03 — Rendered dimensions and reproducibility

PASS. Tools: librsvg 2.60.0 and ImageMagick 7.1.1-47. The first render used macOS's default Pango backend and did not honor the local font configuration. It was rejected and replaced. Final renders use `PANGOCAIRO_BACKEND=fc`; `FC_DEBUG=1` confirms both font files resolve to the TTFs under `branding/assets/fonts/`. No font was installed globally.

A temporary fontconfig XML file was created with this content, adjusting only the absolute repository path when reproducing elsewhere:

```xml
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd">
<fontconfig>
  <include ignore_missing="yes">/opt/homebrew/etc/fonts/fonts.conf</include>
  <dir>/Users/douglas/Projects/Umanni/branding/assets/fonts</dir>
  <cachedir>/tmp/umanni-branding-sources.qQUkCB/font-cache</cachedir>
</fontconfig>
```

Actual final render command, repeated for all six SVG files:

```sh
PANGOCAIRO_BACKEND=fc \
FONTCONFIG_FILE=/tmp/umanni-branding-sources.qQUkCB/fontconfig.xml \
rsvg-convert -o branding/boards/components.png branding/boards/components.svg
magick identify branding/boards/*.png
```

Each SVG was rendered again to a separate temporary PNG and compared to the delivered PNG with `magick compare -metric AE <delivered> <temporary> null:`. All six comparisons returned **0 changed pixels**. Editable SVGs retain text; a consumer must load the supplied fonts using the documented renderer configuration. A renderer that falls back to system fonts is not equivalent to the validated PNG.

| Board | SVG / PNG dimensions | Inspection |
| --- | --- | --- |
| components | 1440×1024 | Original-resolution inspection passed |
| login-responsive | 1878×1024 | Original-resolution inspection passed |
| dashboard-desktop | 1440×1024 | Original-resolution inspection passed |
| users-desktop | 1440×1024 | Original-resolution inspection passed |
| import-desktop | 1440×1024 | Original-resolution inspection passed |
| users-mobile | 390×844 | Original-resolution inspection passed |

Login artboards: x=0–1440/y=0–1024 and x=1488–1878/y=0–844. Gap: exactly 48 px. The remaining area below the narrow artboard is canvas, not extra mobile viewport.

## V04 — Contrast

PASS. All **38 declared allowed pairs** were recalculated independently from tokens using sRGB linearization (threshold 0.04045), relative luminance coefficients 0.2126/0.7152/0.0722, and `(Llighter+0.05)/(Ldarker+0.05)`. All text pairs meet4.5:1; all essential control/focus pairs meet3:1. No exception was taken for large text.

The actual SVG text/background combinations were also measured, using the topmost enclosing solid surface at each text position and checking it against visual inspection:

| Foreground | Background | Ratio |
| --- | --- | --- |
| #0B79D0 | #FFFFFF | 4.50645:1 |
| #0D3C61 | #E9F5FE | 10.32468:1 |
| #0D3C61 | #FFFFFF | 11.43747:1 |
| #111827 | #FFFFFF | 17.73972:1 |
| #166534 | #F0FDF4 | 6.81165:1 |
| #252B42 | #E9F5FE | 12.61365:1 |
| #252B42 | #F4FAFE | 13.27582:1 |
| #252B42 | #FFFFFF | 13.97314:1 |
| #475569 | #E2E8F0 | 6.14680:1 |
| #475569 | #F4FAFE | 7.19951:1 |
| #475569 | #FFFFFF | 7.57766:1 |
| #854D0E | #FEFCE8 | 6.62389:1 |
| #991B1B | #FEF2F2 | 7.59664:1 |
| #991B1B | #FFFFFF | 8.31005:1 |
| #FFFFFF | #08263E | 15.47383:1 |
| #FFFFFF | #0A304E | 13.58609:1 |
| #FFFFFF | #0D3C61 | 11.43747:1 |
| #FFFFFF | #991B1B | 8.31005:1 |
| #0D3C61 | #F4FAFE | 10.86670:1 |

The lowest rendered text ratio is link blue on white, **4.50645:1**. White on brand #03A1E0 is **2.92553:1**, recorded as prohibited, not rounded up to a passing value. Logos alone retain their original colors. Essential border #64748B exceeds 3:1 on white, canvas, selected and disabled surfaces; the focus ring also exceeds 3:1 on white/canvas/selected. Decorative dividers and the auth accent do not convey an essential state.

## V05 — Geometry, font recipes and inspection

PASS. An independent read-only Python/Pillow/XML check parsed the actual SVGs, loaded supplied variable fonts with explicit weight/width, measured text bounding boxes at 4× size, and verified **208 text elements** inside the declared canvas/artboard boundaries, without intersecting text boxes. Every rendered family/size/weight tuple has a token recipe. This geometric check is supplementary: it does not infer all visual relationships from the XML.

The executor opened **every final PNG at original resolution**, including both login artboards. Fidelity and usability personas independently inspected all six originals. The final symbol change in users-mobile was rerendered and inspected again. Findings corrected before final delivery:

- Default font fallback replaced with explicit Pango/fontconfig backend.
- Invalid confirmation example changed from valid EXCLUIR to EXCLU.
- Display, dialog, lead, badge, initials, name, navigation and utility/button recipes added to tokens.
- Dialog documentation aligned with 520 px; mobile card padding aligned with 16 horizontal/12 vertical.
- Outlined destructive row action documented as a presentation of the approved danger variant.
- Badge horizontal padding aligned with 10 px.
- Mobile header now uses the official symbol at 44 px; its proportional height is40.34338 px.
- Manifest completed from9 to15 actually used icons.
- Additional login copy is identified as adapted demonstration copy, not another official brand statement.

The personas found the final composition legible, coherent and appropriate to a static reference kit. Their reports are internal assessments, not the independent Luna review or a GitHub approval.

## V06 — Touch targets and composition contents

PASS. Mobile header/menu/account controls and toast dismissal are44×44. Create action 150×44; per-person Editar150×44 and Excluir164×44. All 10 explicit targets in users-mobile meet44×44 with no target overlap. Login narrow fields and Entrar are342×44; the artboard has24 px side margins.

Mobile cards: x16, width358, y152/316/480, height152. Last card ends632; toast y680–752 leaves48 px clear; notice text ends near818, inside844. No control is covered. The narrow header symbol has approximately12 px vertical clear space; larger signature examples have at least16 px outer clear space. These are measured adapted recommendations, not public brand rules.

Users desktop and mobile show the same three fictional records: Lia Exemplo, Teo Exemplo and Rui Exemplo, at reserved example.test addresses, with role/status and visible Criar usuário, Editar, Excluir. No real person, filter, search, pagination, bulk selection or quick role change. Desktop row pitch48, actions44 high. The dialog identifies Rui, explains deletion, shows the EXCLUIR field, keeps Cancelar available and Excluir disabled until valid confirmation as specified. Alternative dialog states are documented in COMPONENT-SPEC.

Dashboard has exactly three noninteractive metrics, values3/1/2 corresponding to the sample list. No charts or activity feed. Import includes selection/replacement/start and persistent processing/result vocabulary on one page, with no invented percentage, mapping or pre-validation. Alternative results are captioned as examples, not simultaneous outcomes. The institutional phrase appears only on authentication and is separate from the official logo.

COMPONENT-SPEC covers every state in the approved matrix across16 component sections. The components board is representative; state coverage is not inferred solely from the number of visual examples. Real keyboard behavior, announcements, reduced motion, async processing and permissions require later implementation and tests.

## V07 — Notices, language and links

All seven material documents reference the canonical notice; all six boards display the Portuguese summary and exact reference path, with two notices in the login canvas. The originals themselves were not edited to include notices. Montserrat/Roboto OFL and Heroicons MIT notices are complete. Brand reuse is not licensed.

Douglas explicitly corrected the language on 2026-09-14: public delivery documentation in English; site/system in Portuguese. The test source at commit 7b5af5859afbb049221254bdacfa138aac25679b requires a detailed English README but does not prescribe the interface language. This supersedes the project's internal D-012 choice. Planning documents outside the executor's allowed paths require conductor reconciliation; no hidden source instructions were followed.

## V08 — Quickstart and Git completion

Steps1–6 of the approved quickstart are evidenced above: scope, hashes/types, repeat rendering, contrast, original-resolution inspection, licenses/notice. Git checks and final local-link/scope validation are recorded in EXEC after the actual final checks. No application test command is invented. No application, dark theme, new logo variant, merge or PR closure is part of this delivery.

## Reproduction limits

SHA-256, dimensions, intended color contrast and supplied fonts are independently inspectable from delivered files. Pixel equality was demonstrated on the specified local renderer; another renderer/version may rasterize edges differently. A rendered SVG remains a static asset, not an accessible interactive application. Navigable prototype and formal implementation review remain requirements beyond this static PR.
