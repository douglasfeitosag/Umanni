# Prototype validation evidence

Validation date: 2026-09-14. Branch: `codex/005-visual-prototype`. Planning baseline: `1a90b8b2714149279e9e85abad7c0cfc9daeca96`. The final implementation commit and review records are added to `umanni-vault/EXEC-005-VISUAL-PROTOTYPE.md` and PR 6 after publication.

## Automated core and browser journeys

Node `v25.8.2` executed all 28 tests successfully with `--test-concurrency=1` and again with `--test-concurrency=2`. The threshold run measured the explicitly inventoried decision/rendering core:

| Module | Lines | Branches | Functions |
| --- | ---: | ---: | ---: |
| `state.mjs` | 100.00% | 92.89% | 100.00% |
| `views.mjs` | 100.00% | 90.96% | 100.00% |
| Combined | 100.00% | 92.12% | 100.00% |

`node --check branding/prototype/app.mjs` passed. This denominator excludes the DOM adapter by design and is not described as whole-application coverage.

The native-browser runner loaded the actual adapter in a same-origin iframe and passed 8/8 named journeys at both 1440×1024 and 390×844. It covered both personas, signup validation/failure/retry, administrator CRUD and counts, all list scenarios, both import formats and every terminal result, own-profile update/deletion, cancellation and duplicate-submit guards, back/forward, sign-out, restart, reload, forged routes and missing targets. Late RED/GREEN regressions also prove that the skip link preserves the current hash route and that 200% visitor and authenticated views with reduced motion cause no horizontal overflow.

## Real-browser observations

The same prototype was exercised outside the runner with native controls:

- 1440×1024: all routes, forms, table, dialog and feedback remained within the page width; every complete journey was reachable.
- 390×844: all 8 runner journeys passed; the mobile menu opened from the keyboard; table-equivalent cards, forms, import, profile and dialog remained usable with zero horizontal page overflow.
- 1440×640: content remained vertically scrollable, the heading stayed visible and no horizontal overflow appeared.
- 200% text: `?text-scale=200` produced a computed 32 px root size; visitor and signed-in routes had zero horizontal page overflow and preserved all content through vertical scrolling. The corrective reflow check measured scroll width equal to client width at 1280×720, 1440×1024 and 390×844.
- Reduced motion: the operating-system media rule and deterministic `?reduced-motion=true` path both reduce animation and transition durations to 0.01 ms with one iteration. Computed button transition duration was 0.01 ms.
- Keyboard: the skip link showed a solid visible focus ring, moved focus to `main-content` and kept `#/login`; the mobile menu opened with Enter; the native role select changed through its real control; the native dialog opened on Cancel, retained Tab/Shift+Tab focus, closed with Escape and restored focus to the correct visible delete trigger in both table and card layouts.
- Narrow targets: every visible `a`, `button`, `input`, `select` and `summary` measured at least 44 px high after responsive refinements. Footer links use 44 px targets rather than relying on tight spacing.
- Browser console: zero warning/error entries. Declared scripts, styles, logos and favicon resolved only from `http://127.0.0.1:8765`; CSP keeps `connect-src` at `none`.

The full-page browser capture mode was not used as viewport proof because it reflowed long documents at a different capture width. Exact-window screenshots and separate full-route scrolling were used instead. The browser reported a 390×844 inner viewport while its image payload excluded browser/scrollbar chrome and encoded the mobile screenshot as 375×812; both values are retained rather than conflated.

## Contrast

WCAG relative-luminance calculations produced:

| Pair | Ratio | Use / threshold |
| --- | ---: | --- |
| `#0D3C61` / `#FFFFFF` | 11.44:1 | Primary actions; normal text ≥4.5:1 |
| `#0A304E` / `#FFFFFF` | 13.59:1 | Hover action |
| `#08263E` / `#FFFFFF` | 15.47:1 | Active action |
| `#0B79D0` / `#FFFFFF` | 4.51:1 | Links on white |
| `#252B42` / `#F4FAFE` | 13.28:1 | Headings on canvas |
| `#111827` / `#FFFFFF` | 17.74:1 | Main text |
| `#475569` / `#F4FAFE` | 7.20:1 | Muted text on canvas |
| `#64748B` / `#FFFFFF` | 4.76:1 | Essential field borders |
| `#166534` / `#F0FDF4` | 6.81:1 | Success text |
| `#854D0E` / `#FEFCE8` | 6.62:1 | Warning text |
| `#991B1B` / `#FEF2F2` | 7.60:1 | Error text |
| `#991B1B` / `#FFFFFF` | 8.31:1 | Destructive text |
| `#03A1E0` / `#FFFFFF` | 2.93:1 | Original mark/decor only; never ordinary white text |

The link-blue focus outline measures above the 3:1 focus threshold on white and canvas. Notice links use the dark primary color on canvas because the general link blue would measure only 4.28:1 there. Color is accompanied by text, icons or border/underline state.

## Final PNG evidence

All files were opened and inspected at original resolution after final CSS changes. They are true RGB PNGs, not extension-mismatched browser payloads.

| File | Encoded dimensions | SHA-256 | Observation |
| --- | --- | --- | --- |
| `desktop.png` | 1440×1024 | `55444481e9e27f099e1112c51e09b50c80c48380d2891b2e6e5bcc7ebd97d412` | Entry hierarchy, original signature and reserved notice are clear. |
| `mobile.png` | 375×812 payload from 390×844 viewport | `bbb9d5c1f7cf8be3696b563d98d36f38bf0e5583288482f0261445eeeaf16fd2` | Single-column entry is readable and vertically scrollable. |
| `signup.png` | 1440×1024 | `848b96a006e8a9c89b340ae6c76fcf372b44a0e5f31b69a1ca3019c663215b88` | Fictional defaults, persistent labels and separate demo controls. |
| `users.png` | 1440×1024 | `8b71f01a46ad3f48f709fa5f8d7bbfb173505fe58bcf42d92bdaf5d4c6d02ef3` | Counts/list data and action hierarchy remain legible. |
| `form.png` | 1440×1024 | `aa975ec2f8e0f0d8b90c4ed38a6d1a947c363895ab551d2a3651ff06656868b9` | Labels, native select, scenario disclosure and actions align. |
| `import.png` | 1440×1024 | `3639ae01c52fb967e5d3aa7725bebb9445592a6beee090fcf98eb99bb0583f08` | Both fictional formats and no-upload explanation are visible. |
| `profile.png` | 1440×1024 | `d364d4a5402b1475fd3cb02176aca41904ea096f5dd706dd2bf05a20cbdb7dd2` | Own-data and destructive actions are distinct. |
| `dialog.png` | 1440×1024 | `a7af36df9c477995f2c3693eb2ecc656a38c896ee9d82c9eb1b7fbdfb7af8daa` | Context, exact `EXCLUIR` instruction, disabled action and demo selector are visible. |

## Preserved sources and licenses

The implementation reused, without modification, the existing original assets and license records. Representative SHA-256 values remain:

- horizontal PNG `e48c6c021b2380ea197a452975b7dae4e76539a844d3d1fd90f20ab95d6a9d07`;
- horizontal SVG `6570316b780107a92c5107dd271739a4f7e711db08d2f3c39fdd31bd6636eb19`;
- symbol PNG `499d74fec6b1b711e0d166c744fe20dd3fcb63c1125e2da14a78a70f07e2c186`;
- Montserrat `0f7b311b2f3279e4eef9b2f968bcdbab6e28f4daeb1f049f4f278a902bcd82f7`;
- Roboto `d7598e12c5dbef095ff8272cfc55da0250bd07fbdecbac8a530b9b277872a134`;
- Heroicons notice `60e0b68c0f35c078eef3a5d29419d0b03ff84ec1df9c3f9d6e39a519a5ae7985`;
- Umanni notice `1655b05f29129a876e07226c3dbc1371d3f2f2c2b7ceb6c92699f55380d1a761`.

There is no dark theme because no sufficient public identity evidence supports one. This is an evidence boundary, not a technical inability.

## Maintainability review

Clean-code score: **9.0/10** for this disposable static scope. State decisions, escaped rendering and DOM effects have explicit module boundaries; names express intent; operations are idempotent and tested; no dependency or storage layer was added. The residual cost is deliberate: `views.mjs` and `styles.css` keep the entire visual reference together rather than introducing a component framework that would exceed the approved prototype scope.
