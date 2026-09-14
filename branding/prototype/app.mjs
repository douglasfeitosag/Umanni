import {
  advanceImport,
  beginDelete,
  beginSave,
  beginSignUp,
  canBeginDelete,
  chooseImport,
  closeDeleteDialog,
  completeOperation,
  createState,
  dismissFeedback,
  login,
  navigate,
  openDeleteDialog,
  recoverList,
  replaceImport,
  restart,
  retryImport,
  setDeleteConfirmation,
  setDeleteOutcome,
  setFormDraft,
  setImportOutcome,
  setListScenario,
  setSaveOutcome,
  signOut,
  startImport,
} from "./state.mjs";
import { renderApp } from "./views.mjs";

const OPERATION_DELAY_MS = 400;
const appElement = document.querySelector("#app");
const validationParameters = new URLSearchParams(location.search);

if (validationParameters.get("text-scale") === "200") {
  document.documentElement.dataset.textScale = "200";
}
if (validationParameters.get("reduced-motion") === "true") {
  document.documentElement.dataset.reducedMotion = "true";
}

let state = createState();
let operationTimer = null;
let deleteTrigger = null;

initialize();

function initialize() {
  const loginUrl = `${location.pathname}${location.search}#/login`;
  history.replaceState(null, "", loginUrl);
  bindEvents();
  render({ focusHeading: true });
}

function bindEvents() {
  window.addEventListener("hashchange", handleHashChange);
  document.querySelector(".skip-link")?.addEventListener("click", handleSkipClick);
  appElement.addEventListener("click", handleClick);
  appElement.addEventListener("change", handleChange);
  appElement.addEventListener("input", handleInput);
  appElement.addEventListener("submit", handleSubmit);
  document.addEventListener("cancel", handleDialogCancel, true);
}

function handleSkipClick(event) {
  event.preventDefault();
  appElement.querySelector("#main-content")?.focus();
}

function handleHashChange() {
  clearOperationTimer();
  const requestedRoute = routeFromHash();
  if (requestedRoute !== state.route) {
    state = navigate(state, requestedRoute);
  }
  render({ focusHeading: true });
}

function handleClick(event) {
  const control = event.target.closest("[data-action]");
  if (!control) {
    return;
  }

  const actions = {
    login: () => transitionTo(login(state, control.dataset.userId)),
    signout: () => transitionTo(signOut(state)),
    restart: () => transitionTo(restart(state), { replace: true }),
    "toggle-menu": () => toggleMenu(control),
    "open-delete": () => showDeleteDialog(control),
    "close-delete": () => closeDeleteDialogAndRestoreFocus(),
    "dismiss-feedback": () => updateView(dismissFeedback(state)),
    "recover-list": () => updateView(recoverList(state)),
    "choose-import": () => updateView(chooseImport(state, control.dataset.format)),
    "start-import": () => updateView(startImport(state)),
    "advance-import": () => updateView(advanceImport(state)),
    "retry-import": () => updateView(retryImport(state)),
  };

  actions[control.dataset.action]?.();
}

function handleChange(event) {
  const control = event.target.closest("[data-action]");
  if (!control) {
    return;
  }

  if (control.dataset.action === "list-scenario") {
    updateView(setListScenario(state, control.value), { focusSelector: "#list-scenario" });
  } else if (control.dataset.action === "save-outcome") {
    const withDraft = setFormDraft(state, captureDraft(control.closest("form")));
    updateView(setSaveOutcome(withDraft, control.value), { focusSelector: "#save-outcome" });
  } else if (control.dataset.action === "delete-outcome") {
    state = setDeleteOutcome(state, control.value);
  } else if (control.dataset.action === "import-outcome") {
    updateView(setImportOutcome(state, control.value), { focusSelector: "#import-outcome" });
  } else if (control.dataset.action === "replace-import") {
    updateView(replaceImport(state, control.value), { focusSelector: "#replace-import" });
  }
}

function handleInput(event) {
  if (event.target.matches("form[data-form] [name='name'], form[data-form] [name='email'], form[data-form] [name='role']")) {
    state = setFormDraft(state, captureDraft(event.target.closest("form")));
  }

  if (event.target.matches("#delete-confirmation")) {
    state = setDeleteConfirmation(state, event.target.value);
    event.target.removeAttribute("aria-invalid");
    event.target.removeAttribute("aria-describedby");
    event.target.closest(".field").querySelector(".field-error")?.remove();
    const confirmButton = appElement.querySelector('[data-action="confirm-delete"]');
    if (confirmButton) {
      confirmButton.disabled = !canBeginDelete(state);
    }
  }
}

function handleSubmit(event) {
  const form = event.target.closest("form[data-form]");
  if (!form) {
    return;
  }
  event.preventDefault();

  if (form.dataset.form === "delete") {
    startDelete();
    return;
  }

  const draft = captureDraft(form);
  state = setFormDraft(state, draft);
  if (form.dataset.form === "signup") {
    state = beginSignUp(state, draft);
  } else {
    state = beginSave(state, { targetId: targetIdForForm(form.dataset.form), draft });
  }

  if (state.pending?.kind === "save") {
    schedulePendingOperation();
    render();
  } else {
    render({ focusSelector: "[aria-invalid='true']" });
  }
}

function handleDialogCancel(event) {
  if (event.target.id !== "delete-dialog") {
    return;
  }
  event.preventDefault();
  closeDeleteDialogAndRestoreFocus();
}

function startDelete() {
  state = beginDelete(state);
  if (state.pending?.kind === "delete") {
    schedulePendingOperation();
    render();
  } else {
    render({ dialogFocus: Boolean(state.deleteDialog) });
  }
}

function schedulePendingOperation() {
  clearOperationTimer();
  const operationId = state.pending.id;
  operationTimer = window.setTimeout(() => {
    operationTimer = null;
    const previousRoute = state.route;
    state = completeOperation(state, operationId);
    if (state.route !== previousRoute) {
      syncHashWithState();
    } else {
      render({ dialogFocus: Boolean(state.deleteDialog) });
    }
  }, OPERATION_DELAY_MS);
}

function clearOperationTimer() {
  if (operationTimer !== null) {
    window.clearTimeout(operationTimer);
    operationTimer = null;
  }
}

function transitionTo(nextState, { replace = false } = {}) {
  clearOperationTimer();
  state = nextState;
  syncHashWithState({ replace });
}

function syncHashWithState({ replace = false } = {}) {
  const nextHash = `#/${state.route}`;
  if (location.hash === nextHash) {
    render({ focusHeading: true });
    return;
  }
  if (replace) {
    history.replaceState(null, "", `${location.pathname}${location.search}${nextHash}`);
    render({ focusHeading: true });
  } else {
    location.hash = nextHash;
  }
}

function updateView(nextState, options = {}) {
  state = nextState;
  render(options);
}

function showDeleteDialog(control) {
  deleteTrigger = { userId: control.dataset.userId, route: state.route };
  state = openDeleteDialog(state, control.dataset.userId);
  render({ dialogFocus: Boolean(state.deleteDialog) });
}

function closeDeleteDialogAndRestoreFocus() {
  clearOperationTimer();
  state = closeDeleteDialog(state);
  const focusSelector = deleteTrigger
    ? `[data-action="open-delete"][data-user-id="${CSS.escape(deleteTrigger.userId)}"]`
    : "#main-content h1";
  render();
  window.setTimeout(() => {
    const candidates = [...appElement.querySelectorAll(focusSelector)];
    const visibleTarget = candidates.find((candidate) => candidate.offsetParent !== null);
    (visibleTarget ?? candidates[0])?.focus();
  }, 0);
  deleteTrigger = null;
}

function render({ focusHeading = false, dialogFocus = false, focusSelector = null } = {}) {
  appElement.innerHTML = renderApp(state);
  const dialog = appElement.querySelector("#delete-dialog");
  if (dialog && !dialog.open) {
    dialog.showModal();
  }

  const pageHeading = appElement.querySelector("#main-content h1, #main-content > h1, .auth-panel h2");
  document.title = pageHeading ? `${pageHeading.textContent} · Umanni` : "Protótipo visual · Umanni";

  if (dialogFocus && dialog) {
    dialog.querySelector('[data-action="close-delete"]')?.focus();
  } else if (focusSelector) {
    appElement.querySelector(focusSelector)?.focus();
  } else if (focusHeading) {
    appElement.querySelector("#main-content")?.focus();
  }
}

function toggleMenu(control) {
  const shell = control.closest(".app-shell");
  const expanded = control.getAttribute("aria-expanded") === "true";
  control.setAttribute("aria-expanded", String(!expanded));
  shell.classList.toggle("menu-open", !expanded);
  control.querySelector(".sr-only").textContent = expanded ? "Abrir navegação" : "Fechar navegação";
}

function captureDraft(form) {
  const formData = new FormData(form);
  return {
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    role: formData.get("role") ?? currentRoleForForm(),
  };
}

function currentRoleForForm() {
  if (state.route === "signup" || state.route === "users/new") {
    return "regular";
  }
  const targetId = targetIdForForm(state.route === "profile/edit" ? "edit-profile" : "edit-user");
  return state.users.find((user) => user.id === targetId)?.role ?? "regular";
}

function targetIdForForm(formType) {
  if (formType === "create-user" || formType === "signup") {
    return null;
  }
  if (formType === "edit-profile") {
    return state.actorId;
  }
  return /^users\/([^/]+)\/edit$/.exec(state.route)?.[1] ?? null;
}

function routeFromHash() {
  const route = location.hash.replace(/^#\/?/, "");
  return route || "login";
}
