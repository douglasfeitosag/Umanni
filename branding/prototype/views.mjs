import { canBeginDelete, selectCounts } from "./state.mjs";

const NOTICE_PATH = "../LICENSES/UMANNI-NOTICE.md";
const HUB_PATH = "../hub/";

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderApp(state) {
  const normalizedState = { ...state, route: normalizeRoute(state.route) };
  if (normalizedState.actorId) {
    return renderShell(normalizedState);
  }

  if (normalizedState.route === "/signup") {
    return renderSignup(normalizedState);
  }

  return renderLogin(normalizedState);
}

function normalizeRoute(route = "login") {
  return route.startsWith("/") ? route : `/${route}`;
}

function renderLogin(state = {}) {
  return `
    <main id="main-content" class="auth-layout" tabindex="-1">
      <section class="auth-story" aria-labelledby="brand-slogan">
        <img class="auth-logo" src="../assets/logo/umanni-horizontal.png" alt="Umanni">
        <h1 id="brand-slogan">Desenvolvendo o potencial das pessoas</h1>
        <p>Pessoas no centro. Um espaço para cuidar da sua equipe.</p>
      </section>
      <section class="auth-panel" aria-labelledby="login-title">
        <p class="eyebrow">Demonstração navegável</p>
        <h2 id="login-title">Bem-vindo</h2>
        <p>Escolha uma pessoa fictícia para conhecer a experiência.</p>
        <div class="auth-actions">
          <button class="button button--primary" type="button" data-action="login" data-user-id="u1">
            Entrar como administradora
          </button>
          <button class="button button--secondary" type="button" data-action="login" data-user-id="u2">
            Entrar como usuário comum
          </button>
        </div>
        <p class="auth-secondary">Ainda não faz parte? <a href="#/signup">Criar conta de exemplo</a></p>
        ${renderFeedback(state.feedback)}
      </section>
      ${renderNotice()}
    </main>`;
}

function renderSignup(state) {
  return `
    <main id="main-content" class="auth-layout" tabindex="-1">
      <section class="auth-story" aria-labelledby="brand-slogan">
        <img class="auth-logo" src="../assets/logo/umanni-horizontal.png" alt="Umanni">
        <h1 id="brand-slogan">Desenvolvendo o potencial das pessoas</h1>
        <p>Crie uma conta fictícia para conhecer a experiência.</p>
      </section>
      <section class="auth-panel" aria-labelledby="signup-title">
        <p class="eyebrow">Demonstração navegável</p>
        <h2 id="signup-title">Criar conta de exemplo</h2>
        ${renderUserForm({
          action: "signup",
          cancelHref: "#/login",
          draft: state.formDraft ?? { name: "Joana Demonstração", email: "joana@example.test" },
          errors: state.formErrors,
          includeRole: false,
          submitLabel: "Criar conta de exemplo",
          saveOutcome: state.saveOutcome,
          isPending: state.pending?.kind === "save",
        })}
        ${renderFeedback(state.feedback)}
      </section>
      ${renderNotice()}
    </main>`;
}

function renderShell(state) {
  const actor = state.users.find((user) => user.id === state.actorId);
  if (!actor) {
    return renderLogin(state);
  }

  const isAdmin = actor.role === "admin";
  const content = renderRoute(state, actor);

  return `
    <div class="app-shell">
      <header class="mobile-header">
        <img src="../assets/logo/umanni-symbol.png" alt="Umanni">
        <button class="icon-button" type="button" data-action="toggle-menu" aria-expanded="false" aria-controls="primary-navigation">
          ${icon("bars-3")}<span class="sr-only">Abrir navegação</span>
        </button>
      </header>
      <aside class="sidebar" aria-label="Navegação principal">
        <img class="sidebar-logo" src="../assets/logo/umanni-horizontal.png" alt="Umanni">
        <p class="sidebar-label">GESTÃO DE PESSOAS</p>
        <nav id="primary-navigation">${renderNavigation(state.route, isAdmin)}</nav>
        <div class="sidebar-account">${renderAvatar(actor)}<span>${escapeHtml(actor.name)}</span></div>
      </aside>
      <div class="workspace">
        <header class="workspace-header">
          <span>Espaço de trabalho</span>
          <span>Demonstração · dados fictícios</span>
        </header>
        <main id="main-content" tabindex="-1">${content}</main>
        ${renderFeedback(state.feedback)}
        ${renderNotice()}
      </div>
      ${renderDialog(state)}
    </div>`;
}

function renderNavigation(route, isAdmin) {
  const items = isAdmin
    ? [
        ["/dashboard", "home", "Painel"],
        ["/users", "users", "Usuários"],
        ["/import", "arrow-up-tray", "Importações"],
        ["/profile", "user-circle", "Minha conta"],
      ]
    : [["/profile", "user-circle", "Minha conta"]];

  return `${items
    .map(([href, iconName, label]) => {
      const current = route === href || route.startsWith(`${href}/`);
      return `<a class="nav-link${current ? " is-current" : ""}" href="#${href}"${current ? ' aria-current="page"' : ""}>${icon(iconName)}<span>${label}</span></a>`;
    })
    .join("")}
    <button class="nav-link" type="button" data-action="signout">${icon("x-mark")}<span>Sair</span></button>
    <button class="nav-link" type="button" data-action="restart">${icon("arrow-path")}<span>Reiniciar demonstração</span></button>`;
}

function renderRoute(state, actor) {
  if (state.route === "/dashboard") {
    return renderDashboard(state);
  }
  if (state.route === "/users") {
    return renderUsers(state);
  }
  if (state.route === "/users/new") {
    return renderCreateUser(state);
  }
  if (/^\/users\/[^/]+\/edit$/.test(state.route)) {
    return renderEditUser(state);
  }
  if (state.route === "/import") {
    return renderImport(state.importScenario ?? { phase: "idle", format: null, outcome: "completed" });
  }
  if (state.route === "/profile") {
    return renderProfile(actor);
  }
  if (state.route === "/profile/edit") {
    return renderProfileEdit(state, actor);
  }

  return `<section class="page-heading"><p class="eyebrow">Demonstração navegável</p><h1>Página de exemplo</h1></section>`;
}

function renderImport(importScenario) {
  return `
    <section class="page-heading"><p class="eyebrow">Importações</p><h1>Importar usuários</h1><p>Acompanhe uma sequência ilustrativa sem enviar ou ler arquivos reais.</p></section>
    <section class="import-card">
      <div class="import-intro">${icon("document-arrow-up")}<div><h2>Arquivo CSV ou XLSX</h2><p>Escolha um dos exemplos fornecidos para iniciar.</p></div></div>
      ${renderImportSelection(importScenario)}
      ${renderImportControls(importScenario)}
      ${renderImportPhase(importScenario)}
      <p class="import-disclaimer">Esta demonstração não lê arquivos, não define colunas ou duplicidades e não altera a lista de pessoas.</p>
    </section>`;
}

function renderImportSelection({ phase, format }) {
  if (phase === "idle") {
    return `<div class="import-choice"><h3>Escolha um exemplo</h3><button class="button button--secondary" type="button" data-action="choose-import" data-format="csv">pessoas-exemplo.csv</button><button class="button button--secondary" type="button" data-action="choose-import" data-format="xlsx">pessoas-exemplo.xlsx</button></div>`;
  }
  return `<div class="selected-file"><div>${icon("document-arrow-up")}<span><strong>pessoas-exemplo.${escapeHtml(format)}</strong><small>Arquivo fictício selecionado</small></span></div><div class="field"><label for="replace-import">Substituir exemplo</label><select id="replace-import" data-action="replace-import"><option value="csv"${format === "csv" ? " selected" : ""}>CSV fictício</option><option value="xlsx"${format === "xlsx" ? " selected" : ""}>XLSX fictício</option></select></div></div>`;
}

function renderImportControls({ phase, outcome = "completed" }) {
  if (phase === "idle") {
    return "";
  }
  const controls = {
    selected: '<button class="button button--primary" type="button" data-action="start-import">Iniciar demonstração</button>',
    queued: '<button class="button button--primary" type="button" data-action="advance-import">Mostrar processamento</button>',
    processing: '<button class="button button--primary" type="button" data-action="advance-import">Mostrar resultado</button>',
    completed: '<button class="button button--secondary" type="button" data-action="retry-import">Executar novamente</button>',
    partial: '<button class="button button--secondary" type="button" data-action="retry-import">Executar novamente</button>',
    failed: '<button class="button button--secondary" type="button" data-action="retry-import">Tentar novamente</button>',
  };
  return `<details class="demo-controls" open><summary>Controles da demonstração</summary><div class="field"><label for="import-outcome">Resultado da demonstração</label><select id="import-outcome" data-action="import-outcome"><option value="completed"${outcome === "completed" ? " selected" : ""}>Sucesso</option><option value="partial"${outcome === "partial" ? " selected" : ""}>Sucesso com avisos</option><option value="failed"${outcome === "failed" ? " selected" : ""}>Falha ilustrativa</option></select></div>${controls[phase] ?? ""}</details>`;
}

function renderImportPhase({ phase }) {
  const phases = {
    idle: ["information-circle", "Escolha um exemplo", "Os exemplos CSV e XLSX são apenas nomes demonstrativos.", "info"],
    selected: ["document-arrow-up", "Exemplo selecionado", "Inicie quando quiser acompanhar a sequência.", "info"],
    queued: ["information-circle", "Na fila", "A demonstração está pronta para mostrar o próximo estado.", "info"],
    processing: ["arrow-path", "Processando", "Avance para o resultado escolhido. Nenhum trabalho real está em execução.", "info"],
    completed: ["check-circle", "Importação concluída", "O resultado ilustrativo permanece disponível nesta tela.", "success"],
    partial: ["exclamation-triangle", "Concluída com avisos", "Algumas linhas teriam atenção em uma aplicação futura.", "warning"],
    failed: ["exclamation-triangle", "Falha na importação", "Tente novamente ou substitua o exemplo fictício.", "error"],
  };
  const [iconName, title, message, tone] = phases[phase] ?? phases.idle;
  return `<section class="import-progress import-progress--${tone}" aria-live="polite">${icon(iconName)}<div><h2>${title}</h2><p>${message}</p></div></section>`;
}

function renderCreateUser(state) {
  return `
    <section class="page-heading"><p class="eyebrow">Usuários</p><h1>Criar usuário</h1><p>Adicione uma pessoa fictícia à demonstração.</p></section>
    ${renderUserForm({
      action: "create-user",
      cancelHref: "#/users",
      draft: state.formDraft ?? { name: "", email: "", role: "regular" },
      errors: state.formErrors,
      includeRole: true,
      submitLabel: "Salvar usuário",
      saveOutcome: state.saveOutcome,
      isPending: state.pending?.kind === "save",
    })}`;
}

function renderEditUser(state) {
  const userId = state.route.split("/")[2];
  const user = state.users.find((candidate) => candidate.id === userId);
  if (!user) {
    return renderMissingUser();
  }
  return `
    <section class="page-heading"><p class="eyebrow">Usuários</p><h1>Editar usuário</h1><p>Altere os dados fictícios de ${escapeHtml(user.name)}.</p></section>
    ${renderUserForm({
      action: "edit-user",
      cancelHref: "#/users",
      draft: state.formDraft ?? state.pending?.draft ?? state.failure?.draft ?? user,
      errors: state.formErrors,
      includeRole: true,
      submitLabel: "Salvar alterações",
      saveOutcome: state.saveOutcome,
      isPending: state.pending?.kind === "save",
    })}`;
}

function renderProfileEdit(state, actor) {
  return `
    <section class="page-heading"><p class="eyebrow">Minha conta</p><h1>Editar perfil</h1><p>Atualize somente os dados da pessoa fictícia ativa.</p></section>
    <p class="read-only-role"><strong>Papel atual:</strong> ${roleLabel(actor.role)}</p>
    ${renderUserForm({
      action: "edit-profile",
      cancelHref: "#/profile",
      draft: state.formDraft ?? state.pending?.draft ?? state.failure?.draft ?? actor,
      errors: state.formErrors,
      includeRole: false,
      submitLabel: "Salvar meus dados",
      saveOutcome: state.saveOutcome,
      isPending: state.pending?.kind === "save",
    })}`;
}

function renderMissingUser() {
  return `<section class="state-panel state-panel--error"><div><p class="eyebrow">Destino indisponível</p><h1>Usuário não encontrado</h1><p>Esse exemplo não existe mais nesta demonstração.</p><a class="button button--secondary" href="#/users">Voltar aos usuários</a></div></section>`;
}

function renderDashboard(state) {
  const counts = selectCounts(state);
  return `
    <section class="page-heading">
      <p class="eyebrow">Visão geral</p>
      <h1>Painel</h1>
      <p>Uma visão das pessoas da sua equipe fictícia.</p>
    </section>
    <section class="metric-grid" aria-label="Resumo da equipe" aria-live="polite">
      ${renderMetric("Total de pessoas", counts.total)}
      ${renderMetric("Administradores", counts.admins)}
      ${renderMetric("Usuários comuns", counts.regulars)}
    </section>
    <section class="callout">
      <div><h2>Explore a gestão de pessoas</h2><p>Os totais acompanham somente as alterações feitas nesta demonstração.</p></div>
      <div class="callout-actions"><a class="button button--secondary" href="#/users">Ver usuários</a><a class="button button--primary" href="#/import">Importar exemplos</a></div>
    </section>`;
}

function renderMetric(label, value) {
  return `<article class="metric-card"><h2>${label}</h2><strong>${value}</strong></article>`;
}

function renderUsers(state) {
  return `
    <section class="page-heading page-heading--actions">
      <div><p class="eyebrow">Equipe fictícia</p><h1>Usuários</h1><p>Gerencie dados e papéis sem alterar informações reais.</p></div>
      <a class="button button--primary" href="#/users/new">${icon("plus")}Criar usuário</a>
    </section>
    ${renderListControls(state.listScenario)}
    ${renderUserListState(state)}`;
}

function renderListControls(scenario = "populated") {
  const labels = {
    populated: "Lista preenchida",
    loading: "Carregando",
    empty: "Lista vazia",
    error: "Falha ilustrativa",
  };
  return `<details class="demo-controls"><summary>Controles da demonstração</summary><div class="field"><label for="list-scenario">Estado da lista</label><select id="list-scenario" data-action="list-scenario">${Object.entries(labels).map(([value, label]) => `<option value="${value}"${scenario === value ? " selected" : ""}>${label}</option>`).join("")}</select></div></details>`;
}

function renderUserListState(state) {
  if (state.listScenario === "loading") {
    return renderListMessage("information-circle", "Carregando usuários…", "Este estado é apenas uma prévia visual.");
  }
  if (state.listScenario === "empty") {
    return renderListMessage("users", "Nenhum usuário cadastrado", "Os registros fictícios continuam preservados.", true);
  }
  if (state.listScenario === "error") {
    return renderListMessage("exclamation-triangle", "Não foi possível mostrar a lista", "Tente novamente para voltar aos exemplos.", true, "error");
  }

  return `${renderUserTable(state.users)}${renderUserCards(state.users)}`;
}

function renderListMessage(iconName, title, message, recover = false, tone = "info") {
  return `<section class="state-panel state-panel--${tone}" aria-live="polite">${icon(iconName)}<div><h2>${title}</h2><p>${message}</p>${recover ? '<button class="button button--secondary" type="button" data-action="recover-list">Mostrar exemplos</button>' : ""}</div></section>`;
}

function renderUserTable(users) {
  return `<div class="table-wrap"><table><caption class="sr-only">Pessoas fictícias da demonstração</caption><thead><tr><th scope="col">Nome</th><th scope="col">E-mail</th><th scope="col">Papel</th><th scope="col">Estado</th><th scope="col">Ações</th></tr></thead><tbody>${users.map(renderUserRow).join("")}</tbody></table></div>`;
}

function renderUserRow(user) {
  return `<tr><td><span class="identity">${renderAvatar(user)}<strong>${escapeHtml(user.name)}</strong></span></td><td>${escapeHtml(user.email)}</td><td>${roleLabel(user.role)}</td><td><span class="status-badge">Exemplo</span></td><td><span class="row-actions"><a class="text-action" href="#/users/${escapeHtml(user.id)}/edit">${icon("pencil-square")}Editar</a><button class="text-action text-action--danger" type="button" data-action="open-delete" data-user-id="${escapeHtml(user.id)}">${icon("trash")}Excluir</button></span></td></tr>`;
}

function renderUserCards(users) {
  return `<div class="user-cards">${users.map((user) => `<article class="user-card"><div class="identity">${renderAvatar(user)}<div><h2>${escapeHtml(user.name)}</h2><p>${escapeHtml(user.email)}</p></div></div><dl><div><dt>Papel</dt><dd>${roleLabel(user.role)}</dd></div><div><dt>Estado</dt><dd><span class="status-badge">Exemplo</span></dd></div></dl><div class="card-actions"><a class="button button--secondary" href="#/users/${escapeHtml(user.id)}/edit">${icon("pencil-square")}Editar</a><button class="button button--danger-quiet" type="button" data-action="open-delete" data-user-id="${escapeHtml(user.id)}">${icon("trash")}Excluir</button></div></article>`).join("")}</div>`;
}

function renderProfile(actor) {
  return `
    <section class="page-heading">
      <p class="eyebrow">Minha conta</p>
      <h1>Perfil</h1>
      <p>Consulte e cuide dos seus dados nesta demonstração.</p>
    </section>
    <section class="profile-card" aria-label="Dados do perfil">
      ${renderAvatar(actor, "avatar--large")}
      <div><h2>${escapeHtml(actor.name)}</h2><p>${escapeHtml(actor.email)}</p><span class="badge">${roleLabel(actor.role)}</span></div>
    </section>
    <div class="page-actions">
      <a class="button button--primary" href="#/profile/edit">Editar meus dados</a>
      <button class="button button--danger-quiet" type="button" data-action="open-delete" data-user-id="${escapeHtml(actor.id)}">Excluir minha conta</button>
    </div>`;
}

function renderUserForm({ action, cancelHref, draft, errors = {}, includeRole, submitLabel, saveOutcome = "success", isPending = false }) {
  const nameError = errors?.name;
  const emailError = errors?.email;
  return `
    <form class="form-card" data-form="${action}" novalidate${isPending ? ' aria-busy="true"' : ""}>
      <div class="field">
        <label for="name">Nome</label>
        <input id="name" name="name" value="${escapeHtml(draft?.name)}" autocomplete="off"${nameError ? ' aria-invalid="true" aria-describedby="name-error"' : ""}>
        ${nameError ? `<p class="field-error" id="name-error">${escapeHtml(nameError)}</p>` : ""}
      </div>
      <div class="field">
        <label for="email">E-mail</label>
        <input id="email" name="email" type="email" value="${escapeHtml(draft?.email)}" autocomplete="off"${emailError ? ' aria-invalid="true" aria-describedby="email-error"' : ""}>
        ${emailError ? `<p class="field-error" id="email-error">${escapeHtml(emailError)}</p>` : ""}
      </div>
      ${includeRole ? renderRoleField(draft?.role) : ""}
      ${renderSaveControls(saveOutcome, isPending)}
      <div class="form-actions">
        <a class="button button--secondary" href="${cancelHref}">Cancelar</a>
        <button class="button button--primary" type="submit"${isPending ? " disabled" : ""}>${isPending ? "Salvando…" : submitLabel}</button>
      </div>
    </form>`;
}

function renderRoleField(role = "regular") {
  return `<div class="field"><label for="role">Papel</label><select id="role" name="role"><option value="regular"${role === "regular" ? " selected" : ""}>Usuário comum</option><option value="admin"${role === "admin" ? " selected" : ""}>Administrador</option></select></div>`;
}

function renderSaveControls(outcome, isPending) {
  return `<details class="demo-controls"><summary>Controles da demonstração</summary><div class="field"><label for="save-outcome">Resultado de salvar</label><select id="save-outcome" name="saveOutcome" data-action="save-outcome"${isPending ? " disabled" : ""}><option value="success"${outcome === "success" ? " selected" : ""}>Sucesso</option><option value="error"${outcome === "error" ? " selected" : ""}>Falha ilustrativa</option></select></div></details>`;
}

function renderAvatar(user, extraClass = "") {
  const initials = user.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  return initials
    ? `<span class="avatar ${extraClass}" aria-hidden="true">${escapeHtml(initials)}</span>`
    : `<span class="avatar ${extraClass}" aria-hidden="true">${icon("user-circle")}</span>`;
}

function roleLabel(role) {
  return role === "admin" ? "Administrador" : "Usuário comum";
}

function renderFeedback(feedback) {
  if (!feedback) {
    return '<div class="toast-region" aria-live="polite" aria-atomic="true"></div>';
  }
  const kind = feedback.kind ?? feedback.tone ?? "info";
  const titles = { success: "Tudo certo", error: "Não foi possível concluir", info: "Informação" };
  return `<div class="toast-region" aria-live="polite" aria-atomic="true"><section class="toast toast--${escapeHtml(kind)}"><div><strong>${escapeHtml(feedback.title ?? titles[kind] ?? titles.info)}</strong><p>${escapeHtml(feedback.message)}</p></div><button class="icon-button" type="button" data-action="dismiss-feedback">${icon("x-mark")}<span class="sr-only">Fechar mensagem</span></button></section></div>`;
}

function renderDialog(state) {
  if (!state.deleteDialog) {
    return "";
  }
  const target = state.users.find((user) => user.id === state.deleteDialog.targetId);
  if (!target) {
    return "";
  }
  const isOwnAccount = target.id === state.actorId;
  const isPending = state.pending?.kind === "delete";
  const canDelete = canBeginDelete(state);
  return `
    <dialog id="delete-dialog" aria-labelledby="delete-title" aria-describedby="delete-description" data-show-modal="true">
      <form class="dialog-content" data-form="delete" method="dialog">
        <p class="eyebrow">Ação destrutiva · demonstração</p>
        <h2 id="delete-title">${isOwnAccount ? "Excluir minha conta?" : "Excluir usuário?"}</h2>
        <p id="delete-description"><strong>${escapeHtml(target.name)}</strong> será removido somente da lista fictícia desta página.</p>
        <div class="field">
          <label for="delete-confirmation">Digite EXCLUIR para confirmar</label>
          <input id="delete-confirmation" name="confirmation" value="${escapeHtml(state.deleteDialog.confirmation)}" autocomplete="off"${isPending ? " disabled" : ""}${state.deleteDialog.error ? ' aria-invalid="true" aria-describedby="delete-error"' : ""}>
          ${state.deleteDialog.error ? `<p class="field-error" id="delete-error">${escapeHtml(state.deleteDialog.error)}</p>` : '<p class="field-help">A confirmação diferencia maiúsculas e minúsculas.</p>'}
        </div>
        <fieldset class="demo-controls"${isPending ? " disabled" : ""}>
          <legend>Controles da demonstração</legend>
          <div class="field"><label for="delete-outcome">Resultado de excluir</label><select id="delete-outcome" data-action="delete-outcome"><option value="success"${state.deleteOutcome === "success" ? " selected" : ""}>Sucesso</option><option value="error"${state.deleteOutcome === "error" ? " selected" : ""}>Falha ilustrativa</option></select></div>
        </fieldset>
        <div class="dialog-actions">
          <button class="button button--secondary" type="button" data-action="close-delete">Cancelar</button>
          <button class="button button--danger" type="submit" data-action="confirm-delete"${canDelete ? "" : " disabled"}>${isPending ? "Excluindo…" : "Excluir"}</button>
        </div>
      </form>
    </dialog>`;
}

function icon(name) {
  return `<svg class="icon" aria-hidden="true"><use href="icons.svg#icon-${name}"></use></svg>`;
}

function renderNotice() {
  return `
    <aside class="demo-notice" aria-label="Aviso da demonstração">
      <strong>Demonstração com dados fictícios.</strong>
      <span>Nenhuma conta, senha ou arquivo real é utilizado.</span>
      <a href="${NOTICE_PATH}">Aviso de uso da marca</a>
      <a href="${HUB_PATH}">Voltar ao acervo visual</a>
    </aside>`;
}
