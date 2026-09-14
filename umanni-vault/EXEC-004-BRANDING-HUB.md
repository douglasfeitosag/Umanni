# EXEC-004 — Brand reference hub

Date: 2026-09-14. Author: Codex executor for Douglas.

## Outcome and scope

A local, responsive Portuguese reference page concentrates the delivered brand identity, palette, typography, component board, five compositions and English documentation. Seven native anchor sections work without JavaScript. It is explicitly a static reference gallery, not an operational application prototype.

Entry branch: `codex/004-branding-hub`. Source base: `ab33e712b0e6d2687471fe9ac2c83cb10b1e5f36`. Independent planning assessment preceded HTML/CSS at `590b61080ee1bd19cad7107467b371bd1fb82d2d` (`docs(branding-hub): specify the visual reference page`). Implementation: `f9e32760a5bcf79962b389db6e94294c8041b845` (`feat(branding-hub): add responsive visual reference page`).

The parent PR4 advanced externally to `97c5012e193b57531f245e07d9169cde84468e31` through a merge from main. Read-only comparison confirmed its tree is identical to source base ab33e71. No original branding file was changed here and no merge was executed by this hub task.

## Files

- `branding/hub/index.html`: semantic Portuguese page; original assets and canonical documentation linked relatively.
- `branding/hub/styles.css`: supplied variable fonts, measured palette, responsive rail/native disclosure, keyboard focus and short-window fallback.
- `branding/hub/README.md`: English local run instructions and scope.
- `branding/hub/evidence/desktop.png`, `mobile.png`: browser captures normalized to actual PNG encoding by the HUB-IMG-001 correction below, with decoded pixels and dimensions preserved.
- `umanni-vault/specs/004-branding-hub/{spec,plan,tasks}.md`: topic-specific requirements, assessed plan and execution checklist.
- This report.

Only these nine allowed paths belong in the topic diff. No JavaScript, package installation, application components, external hosting, analytics, business rules or brand variants were added.

## Run and verification

The actual local command was:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory /Users/douglas/Projects/Umanni
```

URL: http://127.0.0.1:8765/branding/hub/ . Loopback only; the current server is temporary. The README explains restart and shutdown.

Tests used the real in-app browser and read-only DOM inspection, plus Python standard-library HTML parsing/HTTP byte comparison and shell checks. No application tests or simulated test-run claims were introduced.

| Check | Actual evidence |
| --- | --- |
| Wide viewport | DOM innerWidth/innerHeight1440×1024; scrollWidth = clientWidth =1425; no horizontal overflow; every rendered link/disclosure target at least44×44. |
| Narrow viewport | DOM390×844; scrollWidth = clientWidth =375; no overflowing main descendant; every rendered link/disclosure target at least44×44. |
| Short wide window | Additional1440×640 test: rail becomes static, height660; documentation link reaches visible heading at approximately122 px; no horizontal overflow. |
| Keyboard | Initial Tab reaches visible skip link with3 px focus outline; Enter transfers focus to main#conteudo. Narrow summary opens/closes with Enter, Tab reaches first section, Shift+Tab returns to summary. Desktop section Enter updates hash and exposes heading. |
| Native section navigation | All7 desktop sections inspected; narrow disclosure section navigation tested and headings remain uncovered. No fixed mobile overlay. |
| Links and assets |29 unique referenced files returned HTTP200 with exact local bytes;8 anchor targets exist. All10 image elements eventually complete at expected natural dimensions after normal lazy loading. |
| Original board opening | Browser link reached login PNG1878×1024 and SVG viewBox0 0 1878 1024. All six boards expose PNG/SVG; initial dashboard preview also has both links. |
| Documentation | Canonical files returned exact bytes over HTTP. MD/JSON links were exercised; the browser may download or delegate them rather than display their content in the tab. No rendered Markdown documentation reader is claimed. |
| Fonts | Server logs show HTTP200 for both supplied TTF files. Computed body uses Montserrat; action sample uses Roboto500,14/20, with width100%. Visual specimens inspected. |
| Tokens | All11 CSS colors belong to canonical tokens;4 visible palette values match their named tokens exactly; typography families, weights400–700 and action recipe checked. |
| Contrast |154 narrow and163 wide DOM text-bearing elements measured against resolved opaque backgrounds: minimum7.1995:1, zero below4.5:1. Primary/white11.4375:1; focus minimum against selected background10.3247:1; essential narrow disclosure edge/canvas4.5214:1. Nonessential dividers excluded from control-boundary claims. |
| Script/motion | Zero script elements; page CSP has script-src 'none', connect-src 'none', local image/font/style policies. Computed scroll behavior auto; no animation/transition declarations. Reduced-motion needs are met by absence of motion, not a claimed OS preference simulation. |
| Runtime errors | Hub-only inspection and a fresh final hub tab returned no warnings/errors. The reused test tab later logged a TypeError mentioning animation after standalone document/asset navigation; origin was not established. It is not hidden or counted as a hub-script failure: the hub contains no script. |
| Whitespace/scope | Intent-to-add followed by git diff --check, full staging followed by git diff --cached --check passed for implementation. Final report/publication checks are recorded below. |

The browser captures differ from the requested CSS viewport: desktop capture 1425×1013 and mobile 375×812. The initial files contained JPEG bytes despite their .png extension; HUB-IMG-001 identified and corrected that encoding mismatch. They are now actual PNG files. No resizing was performed, and they are not represented as 1440×1024/390×844 images. Viewport evidence comes from the live DOM. Captures show the initial viewport only.

Screenshot SHA-256:

- desktop: `ac08f8366309b2caf6791a2b8db105be5f98453cfa6d98f849f3ae057bccb740`
- mobile: `f2c745280ad0da7745ca10c47ccc890162ff907d2e648f9fbd4824602672be29`

## Visual and independent internal assessment

The executor visually inspected every section in both widths by navigating/scrolling: overview, brand, colors, both font specimens, component board, all five compositions, documentation and footer. Text and links were readable with no observed overlap. Narrow board text is deliberately a thumbnail, accompanied by explicit full-resolution links. Source board original-resolution validation remains in the unchanged branding/VALIDATION.md.

The fidelity/provenance persona independently read the hub and canonical sources. Four findings were corrected before implementation commit f9e3276: slogan restricted to login, action type recipe corrected to Roboto500, initial preview given PNG/SVG links, and component image alternative made accurate. Recheck found no remaining fidelity issue.

The usability/accessibility persona independently assessed the plan before code, then read implementation and inspected the two original captures. It found no blocker in the specified widths and identified the low-height rail risk. The executor fixed it, tested1440×640, and also added descriptive accessible names to board links. That persona's visual claim is limited to the initial captures; lower-section inspection was performed by the executor.

These initial assessments were internal working personas, not the formal project reviewer or an independent Luna session. Subsequent formal review and the HUB-IMG-001 correction are recorded below. The executor has not resolved any GitHub review conversation or claimed formal approval.

## Provenance, rights and limitations

All resources are existing preserved files from the source base; no external source was substituted or redownloaded for this page. Their original hashes, sources and license-normalization details remain in [PROVENANCE](../branding/PROVENANCE.md). Brand files/fonts/licenses are unchanged.

The visible notice links [UMANNI-NOTICE](../branding/LICENSES/UMANNI-NOTICE.md); public availability does not grant brand reuse rights. Separate Montserrat/Roboto OFL and Heroicons MIT licenses are linked. Original symbol#13A0DB remains distinct from signature#03A1E0. White on the latter measures2.9255:1 and is explicitly prohibited for normal text. No dark theme is invented because the public evidence is insufficient.

Runtime declaration available for the original closing execution segment: GPT-5-based Codex. An exact serving-model alias was not independently available; requested Terra/Luna identities are not asserted for the author. The earlier static-delivery report retains its own historical runtime declaration. The initial handoff preceded formal review; its subsequent independent session is identified below.

The full navigable application prototype remains separate, unimplemented work. The page is local, not deployed. No reader screen-reader session or OS-level reduced-motion setting test was performed. Formal implementation review is pending.

## Publication and proposed learning

Published as [PR5](https://github.com/douglasfeitosag/Umanni/pull/5), targeting `codex/003-branding-assets` while PR4 remains open. GitHub confirmed OPEN and MERGEABLE, with Douglas assigned and branding/review-pending labels. The published evidence commit is `7a9d341a0d430d1f80326e47a38756b7dfa2a0f2`; review-ledger was explicitly set pending. This final handoff record is a subsequent documentation-only commit, whose exact hash is reported to Douglas and receives its own pending status after push. No merge, closure or auto-merge occurred.

Final scope check: exactly the nine allowed paths in the parent-to-topic diff; worktree clean before this handoff record. Both new-file intent-to-add/working diff and full staging/cached whitespace checks passed. The final documentation-only update repeats these checks before commit and publication. Existing assets, license files, tokens and boards remain unchanged. The final commit message is `docs(branding-hub): record publication and review handoff`.

Proposed learning for the conductor: capture actual viewport and screenshot dimensions separately; inspect lower sections rather than relying on a first-screen image; recheck remote PR state immediately before every publication; retain a native local gallery as a reference without presenting it as the operational prototype.

## HUB-IMG-001 — Real PNG evidence correction

On 2026-09-14 the independent reviewer published [HUB-IMG-001](https://github.com/douglasfeitosag/Umanni/pull/5#discussion_r4007572357) in [review 5200558835](https://github.com/douglasfeitosag/Umanni/pull/5#pullrequestreview-5200558835), against HEAD `22240075f53a82653d9a87d268ea735d7da28ac3`. The reviewer context is `/root/review_pr5_luna`, requested as gpt-5.6-luna/high; its serving alias was not exposed in the review report. The finding is valid: both files were JPEG captures saved under .png names, and the earlier encoding description was incorrect.

The correction converts those same captures to real RGB PNG files. It does not recapture, resize, crop, enhance or change the screenshot content. Re-encoding preserves the already-decoded JPEG pixels losslessly; it cannot undo compression that occurred in the original browser output.

Original JPEG-byte SHA-256 values remain available through the reviewed commit for provenance:

- desktop: `38613aa827f74470f3938802550e68404c4ba3db123cc63ba1fb287846e481a9`
- mobile: `cfb5bb028e38f8a467b2d4a7216e7b481c9aed3f4eaabaf4dd1986de6c163ba9`

Conversion used the existing ImageMagick installation: `magick <original-capture.jpg> -define png:exclude-chunk=date,time PNG24:<target.png>`. Original inputs were copied to a temporary audit directory before replacement. No dependency was installed.

Validation: `file` identifies actual 8-bit RGB PNG for both corrected files; the eight-byte PNG signature, dimensions, HTTP MIME and served-content hashes are checked. ImageMagick `compare -metric AE <original.jpg> <corrected.png> null:` returns `0 (0)` for each pair, proving no decoded pixel differs. Both corrected images are reopened at original resolution. Current PNG hashes are listed above. Only the two evidence files and this report change; HTML, CSS, tokens, brand assets and application behavior are untouched. Working and staged difference checks precede commit/push.

The corrective commit is identified in the executor's reply in the original review thread. The reviewer alone must recheck the new HEAD, resolve HUB-IMG-001 and update the review gate. No merge, closure or author-side conversation resolution is performed. Proposed preventive check: validate magic bytes and MIME as well as filenames before recording screenshot evidence.
