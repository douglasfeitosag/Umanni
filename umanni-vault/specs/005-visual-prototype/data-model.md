# Disposable demonstration model

Baseline: u1 Lia Exemplo / lia@example.test / admin; u2 Caio Modelo / caio@example.test / regular; u3 Nina Teste / nina@example.test / regular. Fictional IDs/names, no real people. Avatars: up to two initials, generic icon for blank name. Status label “Exemplo” is not account activation.

State: users, actorId|null, nextId, route, feedback, listScenario, importScenario and pending. No storage. Restart/reload recreates identical baseline and login. Sign-out clears identity but retains changes in that page lifetime. Counts derive from records/roles.

User drafts: trimmed name/email and role admin|regular; blank name/email or syntactically invalid email produces illustrative inline errors, not production validation policy. Signup always regular. Own-profile edit has no role control. Administrator can edit others; own role and last-admin deletion/demotion return “Decisão de produto pendente” without mutation. Regular actor may only edit/delete self, including forged action/hash attempts. Deleted own account leads to login with recoverable explanatory feedback.

List scenarios populated/loading/empty/error change presentation, never erase fixtures. Recovery or create restores populated. Pending save/delete lasts400ms in the adapter, blocks duplicate-submit, and cancel/restart/navigation cancels timers without mutation. Errors persist with retry via the same action. State transforms return a new state.

Import: supplied CSV or XLSX, filename pessoas-exemplo.csv|xlsx, phase idle/selected/queued/processing/completed/partial/failed and chosen outcome. Select → start → queued → explicit advance → processing → explicit advance → result. Retry→selected; replace chooses another sample. No file object, parsing, percentage, user insertion or counter change. Results are scenario text, not records processed.

Routes: visitor admin/deep routes fall back to login; regular admin routes fall back to own profile. Unknown route/missing record gives a clear message and role-appropriate destination. These are demo guards, not server authorization. Back/forward restores route, not unsaved form drafts; role identity persists within page lifetime only.
