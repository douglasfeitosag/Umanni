# Visual interaction contract

Sources: [component spec](../../../../branding/COMPONENT-SPEC.md) and [tokens](../../../../branding/tokens/tokens.json). Demonstration-only extension, not production behavior.

| Route | Actor | Actions / next state |
| --- | --- | --- |
| #/login | visitor | Enter admin→dashboard; enter regular→profile; sign-up→signup. No real credentials. |
| #/signup | visitor | Name/email fictional prefill; Create regular account→profile; invalid/selected failure→inline errors; Cancel→login. |
| #/dashboard | admin | Exactly three derived metrics; Ver usuários→users; Importar exemplos→import. |
| #/users | admin | Create→users/new; Edit→users/id/edit; Delete→dialog; separate demo controls for populated/loading/empty/error and recovery. |
| #/users/new | admin | Name/email/role, save→users/counts; invalid→field error; cancel leaves records unchanged. |
| #/users/:id/edit | admin | Same fields; role only here; policy-pending explanation instead of undefined self/last-admin change. |
| #/import | admin | Choose supplied CSV/XLSX, start, advance demo, choose terminal outcome, retry/replace. One persistent phase; no file input/upload. |
| #/profile | actor | Name/email/initials/role, Edit→profile/edit, Delete→account dialog. |
| #/profile/edit | actor | Name/email, read-only role; save→profile; cancel no mutation. |

Global controls: role-specific navigation, sign-out, Reiniciar demonstração, hub and notice links, feedback close. Separate labeled “Controles da demonstração” disclosure owns scenario selectors, not product navigation. Route changes close menu/dialog, update title/current-page and focus h1(tabindex=-1). Back/forward works without history loops; reload replaces route with login. Unknown/missing routes recover per data-model.

## Composition extensions

Auth only: original horizontal logo and separate slogan, no invented password/activation process. Signup/forms use persistent labels, helpers/errors, max640px content and primary/secondary actions. Profile presents initials and read-only role, with a separate account-deletion section. No avatar upload/URL. Existing component palette/states remain canonical.

## Dialog / feedback

Deterministic failure recipe: each save form has a separate “Controles da demonstração” disclosure with “Resultado de salvar” native selector, values Sucesso(success, default)/Falha ilustrativa(error). The dialog has its own distinct demonstration fieldset and “Resultado de excluir” selector with the same values, reachable while modal. These are not product controls. They preserve draft/target/confirmation and are disabled while pending. Select error, submit valid values, observe400ms pending then persistent error/no mutation; choose success and retry the same action, observing exactly one mutation. Reset restores both defaults. Tests verify this sequence for save and delete, including cancel/repeated submit/late completion.

All guards and operation transitions are pure state.mjs behavior: exact confirmation, actor/target/draft checks, operation ID, begin/cancel/complete/retry and import phase progression. app.mjs only dispatches events, schedules/cancels400ms callbacks with operation IDs, renders and handles native focus/hash. Stale completion after cancel/navigation/reset or completion twice is a model no-op; the timer itself is not trusted as a correctness guard.

Native dialog: heading/description/target, confirmation field, Cancel and Excluir. Initial focus Cancel; focus containment; Escape cancels; outside click never deletes. Trimmed exact EXCLUIR enables action; lowercase remains invalid. Pending400ms disallows repeats but cancellation remains operable and cancels work. Failure retains target/confirmation and inline error; same action retries. Cancel returns to initiating control or h1 if absent. Navigation/reset cancel pending timers. Form errors set aria-invalid/describedby and focus first invalid control.

Toast persists until explicit dismissal, no focus theft; important errors remain inline. Reserved layout region right-aligned wide/bottom narrow, not over controls or notice. Metrics announce once per completed data change. Reduced motion removes nonessential transitions (hover120ms/toast180ms/metric300ms maxima). No fake progress counters.

## Accessibility / safety

One h1, landmarks, skip link, current/expanded navigation, native controls; all interactive targets≥44×44 narrow. Desktop headers and mobile cards contain identical data/actions; inactive view display:none. Long names/emails wrap. Dialog internally scrolls in short windows without clipping focus. Text≥4.5:1; large text/essential borders/focus≥3:1. No white common text on #03A1E0. Original assets untouched.

Escape all user values in HTML/attributes. No eval/inline handlers. CSP self scripts/styles/fonts/images, connect-src none, object-src none, base-uri none, form-action none. Forms prevent default; no cookies/storage/service worker/analytics or network writes. Visible instruction to use fictional data only.

## Mandatory browser action matrix

Core Node tests also cover every route/state renderer, including selected/queued/processing/all import outcomes and profile/view/edit/delete-dialog/guard-feedback. Browser cases complement, not replace, this numeric coverage.

At1440×1024 and390×844 exercise every route/action: both roles, signup, CRUD/role/counts, own profile/update/delete, both formats/all import outcomes, every list scenario/recovery, invalid form, failed save/delete/retry, cancel pending, duplicate submit, sign-out/restart/reload, back/forward, forged admin route and missing user. Keyboard: skip/menu/native select/visible focus, dialog containment/Escape/restoration. Also1440×640,200% text,reduced-motion. Test runner passes do not substitute actual browser/visual/keyboard evidence. Any unavailable mandatory observation blocks acceptance.

Hub integration copy: preserve the static gallery and its truthful captions that previews are not interactive. Replace only obsolete global review-pending statements with “Acervo estático revisado” and a separate link labeled “Abrir protótipo navegável”. Do not announce prototype acceptance in the page before the final gate; use the neutral “Demonstração com dados fictícios”. After acceptance, status and evidence are linked from the prototype report. Validate no global pending claim remains for the already-integrated static delivery.
