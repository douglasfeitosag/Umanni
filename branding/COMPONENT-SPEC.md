# Umanni component specification

Static UI kit for future implementation. [Canonical brand notice](LICENSES/UMANNI-NOTICE.md). No keyboard, motion, authorization or persistence behavior is implemented by these SVG assets. Public documentation is English; all interface copy is Portuguese, as corrected by Douglas on 2026-09-14. This supersedes English UI examples in the approved planning documents without silently editing them.

## Shared contract

Use [tokens](tokens/tokens.json), [playbook](BRAND-PLAYBOOK.md) and only the icons listed in the [manifest](assets/icons/heroicons-manifest.md). Dimensions below are px. Main text is Montserrat; button text and technical utilities are Roboto. Body 16/24, compact copy 14/20, label 14/20 at 600. All interactive controls have a minimum 44×44 hit area; visible icon artwork is 20 or 24. Preserve a 4 px external focus allowance. Controls do not change size between states.

Every component entry supplies anatomy, visual states, responsive rules, accessible content and exclusions. The state matrix is normative even where the components board shows only representative states. Semantic colors always have text and an icon or other structural cue.

Outlined danger is the quiet destructive presentation for row/card actions; filled danger is reserved for final confirmation. It is a presentation of the approved danger variant, not another business action.

### Shared control recipes

| Variant | Default | Hover | Active | Text |
| --- | --- | --- | --- | --- |
| Primary | primary fill/border | primaryHover fill/border | primaryActive fill/border | white |
| Secondary | white fill, border edge | selected fill, border edge | selected fill, primary edge | primary |
| Danger | error fill/border | errorHover fill/border | errorActive fill/border | white |
| Danger, outlined presentation | white fill, border edge | errorBg fill, error edge | errorBg fill, error inset edge | error |
| Ghost / neutral icon | white, no essential boundary | selected fill | selected fill, primary inset edge | primary |
| Danger icon | white, error icon | errorBg fill | errorBg fill, error inset edge | error |

Focus-visible adds the token focus ring outside every recipe without replacing its existing state. Disabled uses disabledBg, disabledText and border edge plus a non-operable semantic state; never use reduced opacity to erase the label. Loading preserves width, adds arrow-path and a verb in progress; it does not imply a running backend in this static kit. Text links use link on white, underline, primary on tinted backgrounds; hover/active use primary, focus adds the same ring.

## 01 — Logo and symbol

Purpose: identify the evaluation project using preserved public assets. Anatomy: proportional image and accessible name “Umanni”. Variants: horizontal signature, compact symbol; default only. Use the horizontal signature in authentication and wide shell; compact symbol may appear in narrow header. Never use favicon or logo as a user avatar. Keep original bytes, color and internal margins; outer clear space follows the adapted recommendation in the playbook. Image failure must not substitute an invented logo. Brand notice is separate from the image.

## 02 — Navigation and shell

Wide: 232 px light sidebar, 72 px header, content gutter 40. Narrow: 64 px header, 16 px gutter; a 44×44 “Abrir menu” control exposes a collapsible navigation panel in the future implementation. Allowed labels: “Painel”, “Usuários”, “Importações”, “Minha conta”; availability follows role requirements defined by later functional specs. Do not invent extra modules.

Anatomy: logo, navigation label/icon, selected marker and account entry. Items 44 px high with 12 px horizontal padding. Default white/primary; hover selected/primary; focus-visible ring; selected selected/primary plus a 3 px primary leading marker and semibold label. Selection must not depend on a subtle color difference. Active navigation uses the selected recipe; this is not an additional module/state requirement. Semantics: landmark, named controls, current-page state and expanded state. No sidebar in the 390 px composition; do not scale the desktop shell.

## 03 — Text and links

Anatomy: heading, supporting copy, label or link. Use token scale and source hierarchy; a page has one primary heading. Avoid all-caps paragraphs and centered operational data. Link anatomy: underlined Portuguese label, optional trailing icon, visible focus. Default link/white; hover and active primary; disabled becomes plain non-operable disabledText with a contextual explanation if necessary. Links never masquerade as destructive buttons. Long names and e-mails wrap rather than silently losing information on mobile.

## 04 — Buttons

Anatomy: 44 px high control, 16 px horizontal padding without an icon; with an icon, 12 px leading padding, optional 20 px outline icon, 8 px label gap, 6 px radius. Primary/secondary/danger/ghost use shared recipes for default, hover, focus-visible, active, disabled and loading. Labels identify the action: “Entrar”, “Criar usuário”, “Editar”, “Excluir”, “Iniciar importação”, “Cancelar”. Loading labels: “Entrando…”, “Salvando…”, “Excluindo…”, “Iniciando…”. Narrow layouts use full width only where it improves fit, not for every row action. Do not communicate status solely through an animated spinner. Future implementation needs button semantics and duplicate-submission prevention; these are not proven by the static artwork.

## 05 — Icon buttons

Neutral and danger; 44×44 target, 20 or 24 artwork centered, 6 px radius. Default/hover/active/focus-visible/disabled follow shared recipes. Every interactive icon has a visible label elsewhere or explicit accessible name: “Abrir menu”, “Fechar mensagem”, “Editar usuário”, “Excluir usuário”. A tooltip is supplementary, not the accessible name. User row actions remain labeled Editar/Excluir; icon-only replacement would obscure the specified actions.

## 06 — Fields

Variants text, email, password and confirmation. Anatomy: persistent label, 8 px gap, minimum 44 px control, optional helper and inline error with 4 px gap. Padding 12 px; radius 6; white fill/border edge. Empty uses label and optional example, never placeholder-only labeling. Filled shows entered text. Hover changes edge to primary; focus-visible adds ring; disabled follows shared disabled recipe; error uses error border plus exclamation-triangle, explicit Portuguese message and persistent label. Error must remain near the field. Password artwork shows bullets; does not define storage, visibility toggle or authentication rules. Confirmation uses exact EXCLUIR after trimming outer spaces.

## 07 — Role select

Anatomy: persistent “Papel” label, 44 px white/border control, selected text and chevron-down. Values “Administrador” and “Usuário comum” represent approved roles, not a permission matrix. Empty: “Selecione um papel”; selected shows the choice. Hover/focus-visible/disabled/error match fields, including inline explanation. Role changes appear inside editing, never as a table quick action. Future keyboard behavior should follow native selection semantics; no executable select is delivered.

## 08 — File picker

Variants dropzone and visible button. Anatomy: 24 px document-arrow-up, “Selecione um arquivo CSV ou XLSX”, supporting instruction, “Escolher arquivo”, then chosen file name and “Substituir arquivo”. Minimum dropzone padding 24; button 44 high; dashed essential border in border color.

Idle white; hover selected; drag-active selected with primary solid border and “Solte o arquivo aqui”; focus-visible ring on the actual choice control; selected shows the file name and replacement action without inventing validation success; disabled uses shared disabled recipe; error uses errorBg/error with inline message. Narrow layout stacks content; visible choose button remains a fallback. No column schema, limits, duplicate handling, pre-validation or mapping is specified.

## 09 — Avatar

Variants image, initials, generic icon; default/loading/error. Circle 32 px in table and cards, 40 in account identity when needed. Initials: at most two, primary on selected, semibold. When no usable name exists, user-circle outline replaces initials. Image loading shows a neutral placeholder and accessible loading state; image error falls back to initials/generic icon, never a broken-image marker. Do not fetch real people or imply a storage strategy. Static sample cards use fictional initials only. Decorative avatar next to a fully visible name has an empty alternative; a standalone identity needs a name.

## 10 — Badges

Variants role and status; neutral/success/warning/error/info. Anatomy: readable label with optional 16 px icon, 10 px horizontal/4 px vertical padding, rounded 6 px shape. Neutral: primary/selected; success: success/successBg with check-circle; warning: warning/warningBg with exclamation-triangle; error: error/errorBg with exclamation-triangle; info: primary/selected with information-circle. The text carries the meaning even without hue. Non-interactive: no hover/focus/44 px target requirement. Status examples are fictional presentation data, not an approved account activation model.

## 11 — Metric cards

Exactly total people, administrators and regular users: “Total de pessoas”, “Administradores”, “Usuários comuns”. Anatomy: title, number, optional decorative users icon; 24 px padding and 8 px radius on white. Default uses heading/text; updating briefly uses selected background and retains final value. No button appearance, chart, trend, activity log or invented analytics. Live changes require a discreet accessible announcement in future implementation, never a toast per update. Reduced-motion removes the highlight transition. Numbers on boards are explicitly fictional, not real organizational statistics.

## 12 — Users table and mobile card

Table anatomy: page action “Criar usuário”, column headers, avatar/name/e-mail/papel/estado and labeled Editar/Excluir per row. Target row height 48 with 44 high action controls. On wide screens white rows, decorative divider, primary labels; no search, filters, pagination, bulk selection or inline role toggle.

Mobile card anatomy: same person data and actions; 358 px wide at viewport 390, 16 px horizontal and 12 px vertical internal padding, initial target height 152, 12 px gap. Name/e-mail must fit or wrap by increasing height; never overlap actions. The normative screenshot chooses short fictional values so every complete card fits. It does not imply an application limit of three people.

States for both: populated shows the records; loading shows arrow-path and “Carregando usuários…” with data region marked busy in a future implementation; empty shows users icon, “Nenhum usuário cadastrado” and existing Criar usuário action; error shows exclamation-triangle and “Não foi possível carregar os usuários” in persistent context. No invented retry API or fetch implementation. Color alone cannot distinguish states. Table semantics need headers; cards need clear reading order and names associated with each row action.

## 13 — Toast

Variants success/error/info; entering/visible/dismissing use the same anatomy: status icon, concise message, 44×44 close control. Minimum 64 px high; desktop top-right, mobile bottom with reserved space away from actions and notice. Success examples for create/edit/delete and info for import start use “Usuário criado”, “Alterações salvas”, “Usuário excluído”, “Importação iniciada”. Important errors remain until dismissed. Success may disappear, but the result remains recoverable in the relevant page. Future timing policy is not fixed here. Avoid focus theft; appropriate announcement semantics must be verified in application tests later. Transitions use motion.toast and disappear under reduced-motion preference. Static boards show visible only; entering/dismissing are documented, not animated.

## 14 — Destructive dialog

Variants user/account. Anatomy: destructive heading, exact target name, consequence sentence, label “Digite EXCLUIR para confirmar”, text field, inline error if needed, Cancelar and Excluir. Wide target width 520 with 24 px padding; narrow max width viewport minus 32, actions remain ≥44 high. Use white, heading text, error/danger action. Focus ring requires external room.

Open/invalid: confirmation empty or nonmatching, Excluir disabled and Cancelar available; invalid additionally shows “Digite EXCLUIR para continuar”. Valid: trimmed value exactly EXCLUIR; danger action enabled. Submitting: Excluindo… with arrow-path and unchanged geometry. Error: persistent “Não foi possível excluir. Tente novamente.” plus target context; do not pretend deletion succeeded. Cancel remains visible and available per approved contract; async cancellation semantics remain a functional-spec dependency.

Dialog label/description, initial focus, focus containment, Escape/cancel and focus restoration are requirements for future accessible implementation, not validated here. Do not invent last-admin rules or account deletion permissions. A board may present the dialog as a separately captioned state example rather than obscure the entire users table.

## 15 — Import progress

Persistent single-screen block. Anatomy: document context, status icon, status heading, plain explanation and recoverable result. No invented percentage or per-row mapping. Queued: “Na fila” + “Aguardando processamento”; processing: “Processando” + “Acompanhe o estado nesta tela”; completed: “Concluída” + completion icon; partial: “Concluída com avisos” + warning; failed: “Falha na importação” + error. These are visual vocabulary for the required states, not a decision on partial commit behavior or import semantics. Do not simultaneously imply that one file is queued and completed; supplementary states must be explicitly captioned examples.

Queued/processing use info colors and arrow-path; completed uses success; partial warning; failed error. State remains visible after toast dismissal. Live announcements must be rate-limited/contextual by future implementation; artwork cannot prove streaming behavior. File choice/replacement and start action fit the same page; no wizard steps.

## 16 — Feedback blocks

Empty/loading/success/warning/error/info and disabled context. Anatomy: outline icon, meaningful Portuguese heading, concise text and only an already-approved relevant action when applicable. Padding 16 or 24, 8 radius. Empty/loading use primary/selected; semantic states use the measured semantic pairs. Disabled is not an error and must identify what is unavailable. Feedback remains readable without color or animation. Do not add new navigation or business actions simply to fill an empty-state card.

## State coverage and delivery evidence

The sections above cover every row/state in `component-state-matrix.md`: logo, navigation, button, icon button, field, role select, file picker, avatar, badge, metrics, desktop table, mobile card, toast, destructive dialog, import progress and feedback. Actual visual examples, target measurements and PNG inspection results belong in VALIDATION after rendering. Tokens alone do not prove the contrast of every rendered combination. The broader navigable prototype will need its own planned interactions and browser validation before it can be called complete.
