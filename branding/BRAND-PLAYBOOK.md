# Umanni Visual Playbook

Unofficial evaluation use without an express license: [canonical notice](LICENSES/UMANNI-NOTICE.md). Sources: [PROVENANCE](PROVENANCE.md). This playbook prepares future implementation; it is not an official Umanni manual.

## Visual direction

Use the public identity of the main website, with Montserrat as the dominant typeface and a clear hierarchy for managing people. The decisions in briefing 001 apply, subject to Douglas's subsequent explicit instructions. `observed` identifies public evidence; `decided` identifies a decision by Douglas; `adapted` identifies a recommendation for this delivery, never an official brand standard. Keep the blog's editorial language separate from the interface.

## Preserved brand assets

The blue horizontal signature is available as SVG (a raster container) and PNG; the blue symbol is a PNG. These are two variants. The favicon is a technical byte-for-byte copy, not a third variant, and is not used as a logo on the boards. The signature PNG uses `#03A1E0`; the preserved symbol uses `#13A0DB`. This observed difference does not authorize recoloring either file or creating an alternative palette.

No public clear-space or minimum-size standards were found in the consulted sources. The recommendations below are `adapted`, checked against the delivered board geometry and original-resolution PNGs, and must not be presented as official standards. Their validation is limited to these static examples and viewports.

- Signature: width of 176 px in wide navigation and 240 px in wide-screen authentication; 176 px in narrow-screen authentication. Preserve intrinsic proportions and all internal file margins. The SVG and PNG have different bounding boxes; do not crop the SVG to make them match.
- Symbol: 44 px wide with proportional `meet` fitting in the compact header. The preserved 1095×1004 source yields a height of approximately 40.34 px. Accessible name: “Umanni”; never use it as a person's avatar.
- Recommended external clear space: generally at least 16 px around the asset box, excluding its transparent margins. The compact 44 px symbol in the 64 px header has an `adapted` exception of approximately 12 px vertically. The inspected mobile SVG places it at x=80, y=12, with a 40.34 px height: 12 px above and approximately 11.66 px below, plus 20 px between the symbol and the menu target. Keep content and controls outside the asset box and its recommended clear space.
- Validation method: render at 1440×1024 and 390×844, open each PNG at its original resolution, inspect legibility, and measure distances to adjacent elements. Values are considered validated only once the evidence is recorded in VALIDATION.
- Use a white or light background with verified legibility. Do not recolor, stretch, redraw, vectorize, rotate, add shadows, embed the slogan, or create white, black, vertical, or monochrome variants.

## Typography

Variable upright Montserrat is dominant in headings, body text, names, metrics, and forms. Variable upright Roboto is reserved for actions and utility text: button labels, technical file metadata, times, and the unobtrusive notice. Do not use Roboto to replace the main body typeface. Allowed weights are 400, 500, 600, and 700; always set them explicitly. Use Roboto `wdth=100`; upstream Montserrat defaults to `wght=100`, which must not unintentionally appear in the interface.

Montserrat fallback: Arial, sans-serif. Roboto fallback: Arial, sans-serif. Fallbacks support downstream consumption but do not constitute equivalent visual evidence; approved renders must use the preserved TTF files. Do not synthesize italics. Do not convert or modify the distributed font files.

The complete `adapted` type scale follows `typography.scale` in the tokens. Sizes and line heights are in px. The rendered instances were inspected for legibility at original resolution; this does not validate browser text reflow or line-box behavior.

| Token | Typeface | Size / line height | Weight | Role |
| --- | --- | --- | --- | --- |
| `page` | Montserrat | 32 / 40 | 700 | Wide page heading |
| `pageNarrow` | Montserrat | 26 / 34 | 700 | Narrow page heading |
| `section` | Montserrat | 20 / 28 | 600 | Section heading and narrow authentication statement |
| `body` | Montserrat | 16 / 24 | 400 | Main body text |
| `compact` | Montserrat | 14 / 20 | 400 | Compact body text |
| `label` | Montserrat | 14 / 20 | 600 | Field labels and emphasized compact text |
| `utility` | Roboto | 12 / 18 | 400 | Technical metadata and notice |
| `metric` | Montserrat | 40 / 48 | 700 | Component-board metric |
| `metricDisplay` | Montserrat | 64 / 72 | 700 | Dashboard metric |
| `authStatement` | Montserrat | 40 / 52 | 700 | Wide authentication statement |
| `lead` | Montserrat | 18 / 30 | 400 | Authentication supporting copy |
| `dialogTitle` | Montserrat | 24 / 32 | 700 | Destructive-dialog heading |
| `badge` | Montserrat | 12 / 18 | 500 | Role and status labels |
| `avatar` | Montserrat | 12 / 18 | 600 | Avatar initials |
| `action` | Roboto | 14 / 20 | 500 | Button labels |
| `name` | Montserrat | 16 / 24 | 600 | Prominent person names |
| `navigation` | Montserrat | 14 / 20 | 500 | Navigation and medium-weight compact text |
| `caption` | Montserrat | 12 / 18 | 400 | Supporting interface captions |
| `bodyMedium` | Montserrat | 16 / 24 | 500 | Medium-weight body text |
| `eyebrow` | Roboto | 12 / 18 | 500 | Utility section marker |
| `utilityLabel` | Roboto | 12 / 18 | 600 | Emphasized utility label |

Use the 3:1 threshold for large headings only when their actual size and weight meet the WCAG definition; default to dark text.

## Color and accessibility

`#03A1E0` remains in the signature asset and in non-textual highlights. White against this blue produces approximately 2.93:1, below 4.5:1 for normal text and below 3:1 for essential control indicators. Consequently, do not pair it with white button text or use it alone as a focus indicator or informative border. The logo contrast exception does not exempt every use of the brand blue.

`#0D3C61` supports primary actions with white text. `#0B79D0` supports links on white, with underlines so recognition does not depend on color alone. Its contrast is close to the threshold: do not place it on tinted blue backgrounds without recalculating; use `#0D3C61` on light selection backgrounds. `#1083B4` is an observed supporting color, with no normal-text or control role in this system.

Surfaces: white, `#F4FAFE` for the canvas, and `#E9F5FE` for selection. Primary text is `#111827`, headings `#252B42`, and secondary text `#475569`. Essential control borders use `#64748B`; the decorative divider `#DCE4EB` must not convey meaning alone. Semantic states combine an icon and text: success `#166534`/`#F0FDF4`, warning `#854D0E`/`#FEFCE8`, error `#991B1B`/`#FEF2F2`, and information `#0D3C61`/`#E9F5FE`. Complete pairs and measurements will be delivered in the tokens and VALIDATION.

There is no dark theme in this delivery because public information is insufficient to specify one faithfully; this is not a technical limitation. A dark blue action surface within the light interface does not constitute a dark theme.

## Spacing, shape, and layout

The `adapted` spacing scale is 4, 8, 10, 12, 16, 24, 32, 40, 48, and 64 px; 10 px is the badge horizontal-padding token. The inspected desktop compositions use a 232 px sidebar, 72 px header, and 40 px content margins. The inspected narrow user composition uses a 64 px header, 16 px content margins, and 12 px gaps. These geometries are confirmed at 1440×1024 and 390×844 respectively. The recommended shell breakpoint remains 768 px: below it, use the collapsible menu and user cards. Do not scale down the table or require horizontal scrolling on narrow screens. The breakpoint and intermediate-width behavior still require future implementation validation.

Recommended radii: 6 px for controls, 8 px for cards, and 12 px for dialogs; circles are reserved for avatars and icon buttons. Essential borders are 1 px; external focus rings are 2 px, with a 2 px white gap. Use subtle shadows only for toasts and dialogs, never as substitutes for necessary borders. Elevation: surface 0, header/menu 10, toast 30, dialog 40. These `adapted` recommendations remain subject to visual validation. The relationships are tokens, independent of CSS or a framework.

Mobile controls and targets must reach at least 44×44 px. The inspected narrow composition meets this minimum for its menu, account, create, edit, delete, and toast-dismissal targets. The `adapted` desktop recommendation uses 44 px button heights and 48 px table rows, leaving 2 px above and below each button. User cards are 358×152 px in the 390 px composition, with 16 px horizontal and 12 px vertical internal padding and 12 px between cards. Badges have 10 px horizontal and 4 px vertical padding; non-interactive badges do not require a touch target. The wide destructive-dialog example is 520 px wide with 24 px internal padding. These measurements match the inspected SVG geometry and the component specification.

Long text must wrap within the available area; metadata must not push `Editar` or `Excluir` outside the viewport. The chosen fictional records fit without truncation, but this does not prove arbitrary-length content behavior in a future application. Labeled row and card deletion actions use the documented outlined presentation of the danger variant: white fill, essential control border, and error-colored icon and text. The enabled confirmation action uses the filled danger presentation.

## Focus, feedback, and motion

The `adapted` focus recommendation uses `#0B79D0` in a 2 px ring with 2 px white separation. The ring must contrast with its adjacent surface; on colored backgrounds, introduce white separation and validate both boundaries. Hover and active visual states change contrast or fill without changing dimensions. Disabled states retain legible contrast and an appropriate text or accessible-name indication, rather than relying only on opacity. These are visual specifications for future implementation, subject to board validation.

Recommended `adapted` motion timings are 120 ms for hover, 180 ms for toast entrance and exit, and 300 ms for metric highlighting, using an ease-out curve. They describe visual motion only and do not set notification lifetimes. Reduced-motion preferences remove non-essential transitions; values and states remain available without animation. Updated metrics do not trigger toasts; their future implementation requires a discreet accessible announcement and a brief visual change. These recommendations and requirements are not behaviors implemented or tested in SVG.

A success toast may disappear, while its result remains recoverable in context; this delivery specifies no automatic-dismissal duration or pause behavior. Important errors remain until dismissed. Place toasts at the top right on desktop and at the bottom on narrow screens, with reserved space that covers neither controls nor the notice. The inspected mobile example places its last card at y=480–632 and its toast at y=680–752; the notice text ends at y=818 within the 844 px viewport. The toast therefore leaves 48 px after the last card and does not cover either actions or the notice. An invalid field retains its message beside the field; import progress and failures remain in the context of the single import screen. Desktop toast placement and notification behavior remain future implementation requirements, not functionality proven by the mobile artwork.

## Delivery boundaries and language

Represent exactly three metrics: people, administrators, and regular users. User tables and cards expose `Criar usuário`, `Editar`, and `Excluir`; role changes appear only inside editing. Import stays on one screen without invented mapping, percentages, pre-validation, or functional rules. Avatars use up to two initials, or a generic icon when no usable name exists. Do not use real people.

Douglas's subsequent explicit instruction resolves the earlier language conflict: documentation is in English, while all website and system interface text is in Portuguese. This supersedes the earlier general instruction to use English in the interface. Keep the institutional phrase `Desenvolvendo o potencial das pessoas` only in authentication and separate from the logo; preserve the destructive-confirmation literal `EXCLUIR` exactly. Portuguese interface examples in this English document follow that decision and are not unresolved exceptions.

The navigable prototype belongs to the expanded objective and requires its own planning and review; these static files do not implement it.
