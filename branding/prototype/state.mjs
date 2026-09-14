const BASELINE_USERS = Object.freeze([
  Object.freeze({ id: 'u1', name: 'Lia Exemplo', email: 'lia@example.test', role: 'admin' }),
  Object.freeze({ id: 'u2', name: 'Caio Modelo', email: 'caio@example.test', role: 'regular' }),
  Object.freeze({ id: 'u3', name: 'Nina Teste', email: 'nina@example.test', role: 'regular' }),
]);

const baselineUsers = () => BASELINE_USERS.map((user) => ({ ...user }));

export function createState({ operationSequence = 0 } = {}) {
  return {
    users: baselineUsers(),
    actorId: null,
    nextId: 4,
    route: 'login',
    feedback: null,
    listScenario: 'populated',
    importScenario: { phase: 'idle', format: null, outcome: 'completed' },
    saveOutcome: 'success',
    deleteOutcome: 'success',
    operationSequence,
    pending: null,
    failure: null,
    formErrors: null,
    formDraft: null,
    deleteDialog: null,
  };
}

export function restart(state) {
  return createState({ operationSequence: state.operationSequence });
}

export function selectCounts(state) {
  const admins = state.users.filter((user) => user.role === 'admin').length;
  return { total: state.users.length, admins, regulars: state.users.length - admins };
}

export function selectUsers(state) {
  return state.users.map((user) => ({ ...user }));
}

export function selectUser(state, userId) {
  const user = state.users.find((candidate) => candidate.id === userId);
  return user ? { ...user } : null;
}

export function selectActor(state) {
  return selectUser(state, state.actorId);
}

const feedback = (kind, message) => ({ kind, message });
const routeFor = (user) => (user.role === 'admin' ? 'dashboard' : 'profile');
const isAdminRoute = (route) => (
  route === 'dashboard' || route === 'users' || route === 'users/new'
  || route === 'import' || /^users\/[^/]+\/edit$/.test(route)
);
const isProfileRoute = (route) => route === 'profile' || route === 'profile/edit';

export function login(state, actorId) {
  const actor = state.users.find((user) => user.id === actorId);
  if (!actor) {
    return { ...state, route: 'login', actorId: null, pending: null, formDraft: null, deleteDialog: null, feedback: feedback('error', 'Exemplo de pessoa não encontrado.') };
  }
  return { ...state, actorId: actor.id, route: routeFor(actor), pending: null, formDraft: null, deleteDialog: null, feedback: null };
}

export function signOut(state) {
  return { ...state, actorId: null, route: 'login', pending: null, formDraft: null, deleteDialog: null, feedback: null };
}

export function navigate(state, route) {
  const actor = state.users.find((user) => user.id === state.actorId);
  if (!actor) {
    const safeRoute = route === 'login' || route === 'signup' ? route : 'login';
    return {
      ...state,
      actorId: null,
      route: safeRoute,
      pending: null,
      formDraft: null,
      deleteDialog: null,
      feedback: safeRoute === route ? state.feedback : feedback('info', 'Entre em um exemplo para continuar.'),
    };
  }
  if (isAdminRoute(route) && actor.role !== 'admin') {
    return { ...state, route: 'profile', pending: null, formDraft: null, deleteDialog: null, feedback: feedback('info', 'Este exemplo só pode acessar o próprio perfil.') };
  }
  if (isProfileRoute(route) || isAdminRoute(route)) {
    const target = /^users\/([^/]+)\/edit$/.exec(route)?.[1];
    if (target && !state.users.some((user) => user.id === target)) {
      return { ...state, route: routeFor(actor), pending: null, formDraft: null, deleteDialog: null, feedback: feedback('error', 'Pessoa de exemplo não encontrada.') };
    }
    return { ...state, route, pending: null, formDraft: null, deleteDialog: null, feedback: null };
  }
  return { ...state, route: routeFor(actor), pending: null, formDraft: null, deleteDialog: null, feedback: feedback('info', 'Destino de demonstração não encontrado.') };
}

export function signUp(state, draft) {
  const normalized = { ...normalizedDraft(draft, 'regular'), role: 'regular' };
  if (!normalized.name || !isEmail(normalized.email)) {
    return {
      ...state,
      route: 'signup',
      feedback: feedback('error', 'Revise os campos obrigatórios da demonstração.'),
      formErrors: validateDraft(normalized),
      formDraft: normalized,
    };
  }
  const id = `u${state.nextId}`;
  const user = { id, ...normalized };
  return {
    ...state,
    users: [...state.users, user],
    actorId: id,
    nextId: state.nextId + 1,
    route: 'profile',
    feedback: feedback('success', 'Conta de exemplo criada.'),
    formErrors: null,
    formDraft: null,
  };
}

export function beginSignUp(state, draft) {
  if (state.pending) return changed(state, {});
  const normalized = { ...normalizedDraft(draft ?? state.formDraft, 'regular'), role: 'regular' };
  const errors = validateDraft(normalized);
  if (Object.keys(errors).length > 0) {
    return changed(state, {
      route: 'signup',
      formDraft: normalized,
      formErrors: errors,
      feedback: feedback('error', 'Revise os campos obrigatórios da demonstração.'),
    });
  }
  return begin(changed(state, { route: 'signup', formDraft: normalized }), {
    kind: 'save', context: 'signup', targetId: null, draft: normalized, outcome: state.saveOutcome,
  });
}

function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateDraft({ name, email, role }) {
  const errors = {};
  if (!name) errors.name = 'Informe um nome de exemplo.';
  if (!email) errors.email = 'Informe um e-mail de exemplo.';
  else if (!isEmail(email)) errors.email = 'Informe um e-mail de exemplo válido.';
  if (role !== 'admin' && role !== 'regular') errors.role = 'Escolha um papel de exemplo válido.';
  return errors;
}

const actorFor = (state) => state.users.find((user) => user.id === state.actorId) ?? null;
const userFor = (state, id) => state.users.find((user) => user.id === id) ?? null;
const changed = (state, patch) => ({ ...state, ...patch });

function canEdit(state, actor, target, draft) {
  if (!actor || !target) return 'Pessoa de exemplo não encontrada.';
  if (actor.role !== 'admin' && target.id !== actor.id) return 'Este exemplo só pode editar o próprio perfil.';
  if (actor.role !== 'admin' && draft.role !== target.role) return 'Decisão de produto pendente.';
  if (target.id === actor.id && target.role !== draft.role) return 'Decisão de produto pendente.';
  if (target.role === 'admin' && draft.role !== 'admin' && selectCounts(state).admins === 1) return 'Decisão de produto pendente.';
  return null;
}

function deleteBlocker(state, targetId) {
  const actor = actorFor(state);
  const target = userFor(state, targetId);
  if (!actor || !target) return 'Pessoa de exemplo não encontrada.';
  if (actor.role !== 'admin' && target.id !== actor.id) return 'Este exemplo só pode excluir o próprio perfil.';
  if (target.role === 'admin' && selectCounts(state).admins === 1) return 'Decisão de produto pendente.';
  return null;
}

function normalizedDraft(draft, defaultRole) {
  return {
    name: String(draft?.name ?? '').trim(),
    email: String(draft?.email ?? '').trim(),
    role: draft?.role ?? defaultRole,
  };
}

function saveContext(state, targetId, requestedContext) {
  if (['create', 'users', 'profile'].includes(requestedContext)) return requestedContext;
  if (!targetId) return 'create';
  return state.route === 'profile/edit' ? 'profile' : 'users';
}

export function setFormDraft(state, draft) {
  return changed(state, { formDraft: normalizedDraft(draft, state.formDraft?.role ?? 'regular') });
}

function begin(state, operation) {
  if (state.pending) return changed(state, {});
  const sequence = state.operationSequence + 1;
  return changed(state, {
    operationSequence: sequence,
    pending: { id: `operation-${sequence}`, ...operation },
    failure: null,
    feedback: null,
    formErrors: null,
  });
}

export function setSaveOutcome(state, outcome) {
  if (state.pending) return changed(state, {});
  if (outcome !== 'success' && outcome !== 'error') return changed(state, { feedback: feedback('error', 'Resultado de salvar inválido.') });
  return changed(state, { saveOutcome: outcome });
}

export function setDeleteOutcome(state, outcome) {
  if (state.pending) return changed(state, {});
  if (outcome !== 'success' && outcome !== 'error') return changed(state, { feedback: feedback('error', 'Resultado de excluir inválido.') });
  return changed(state, { deleteOutcome: outcome });
}

export function setListScenario(state, scenario) {
  if (!['populated', 'loading', 'empty', 'error'].includes(scenario)) {
    return changed(state, { feedback: feedback('error', 'Cenário de lista inválido.') });
  }
  return changed(state, { listScenario: scenario });
}

export function recoverList(state) {
  return changed(state, { listScenario: 'populated', feedback: null });
}

export function dismissFeedback(state) {
  return changed(state, { feedback: null });
}

export function beginSave(state, { targetId = null, draft, context } = {}) {
  if (state.pending) return changed(state, {});
  const actor = actorFor(state);
  const target = targetId ? userFor(state, targetId) : null;
  const normalized = normalizedDraft(draft ?? state.formDraft, target?.role ?? 'regular');
  if (!actor) return changed(state, { formDraft: normalized, feedback: feedback('error', 'Entre em um exemplo para salvar.') });
  if (!targetId && actor.role !== 'admin') return changed(state, { formDraft: normalized, feedback: feedback('error', 'Este exemplo não pode criar pessoas.') });
  if (targetId && !target) return changed(state, { formDraft: normalized, feedback: feedback('error', 'Pessoa de exemplo não encontrada.') });
  const errors = validateDraft(normalized);
  if (Object.keys(errors).length > 0) return changed(state, { formDraft: normalized, formErrors: errors, feedback: feedback('error', 'Revise os campos obrigatórios da demonstração.') });
  if (target) {
    const policy = canEdit(state, actor, target, normalized);
    if (policy) return changed(state, { formDraft: normalized, feedback: feedback('info', policy) });
  }
  return begin(changed(state, { formDraft: normalized }), {
    kind: 'save', context: saveContext(state, targetId, context), targetId, draft: normalized, outcome: state.saveOutcome,
  });
}

export function beginDelete(state, { targetId, confirmation } = {}) {
  if (state.pending) return changed(state, {});
  const dialog = targetId === undefined
    ? state.deleteDialog
    : { targetId, confirmation: String(confirmation ?? ''), error: null };
  const trimmedConfirmation = String(dialog?.confirmation ?? '').trim();
  const blocker = deleteBlocker(state, dialog?.targetId);
  if (blocker) return changed(state, { feedback: feedback(blocker === 'Decisão de produto pendente.' ? 'info' : 'error', blocker), deleteDialog: null });
  if (trimmedConfirmation !== 'EXCLUIR') {
    return changed(state, {
      feedback: feedback('error', 'Digite EXCLUIR para confirmar a demonstração.'),
      formErrors: { confirmation: 'Confirmação inválida.' },
      deleteDialog: { ...dialog, error: 'Confirmação inválida.' },
    });
  }
  return begin(changed(state, { deleteDialog: { ...dialog, error: null } }), {
    kind: 'delete', targetId: dialog.targetId, confirmation: trimmedConfirmation, outcome: state.deleteOutcome,
  });
}

export function canBeginDelete(state) {
  return Boolean(
    !state.pending
    && state.deleteDialog
    && state.deleteDialog.confirmation.trim() === 'EXCLUIR'
    && !deleteBlocker(state, state.deleteDialog.targetId),
  );
}

export function openDeleteDialog(state, targetId) {
  const blocker = deleteBlocker(state, targetId);
  if (blocker) return changed(state, { feedback: feedback(blocker === 'Decisão de produto pendente.' ? 'info' : 'error', blocker), deleteDialog: null });
  return changed(state, { deleteDialog: { targetId, confirmation: '', error: null }, formErrors: null, feedback: null });
}

export function setDeleteConfirmation(state, confirmation) {
  if (!state.deleteDialog || state.pending) return changed(state, {});
  return changed(state, { deleteDialog: { ...state.deleteDialog, confirmation: String(confirmation ?? ''), error: null } });
}

export function closeDeleteDialog(state) {
  const cancelled = state.pending?.kind === 'delete' ? cancelOperation(state) : state;
  return changed(cancelled, { deleteDialog: null, formErrors: null });
}

export function cancelOperation(state) {
  if (!state.pending) return changed(state, {});
  return changed(state, {
    pending: null,
    formDraft: state.pending.kind === 'save' ? null : state.formDraft,
    feedback: feedback('info', 'Operação de demonstração cancelada.'),
  });
}

function commitSave(state, operation) {
  if (operation.context === 'signup') {
    const id = `u${state.nextId}`;
    return changed(state, {
      users: [...state.users, { id, ...operation.draft, role: 'regular' }],
      actorId: id,
      nextId: state.nextId + 1,
      listScenario: 'populated',
      route: 'profile',
      feedback: feedback('success', 'Conta de exemplo criada.'),
    });
  }
  if (operation.targetId) {
    const users = state.users.map((user) => (user.id === operation.targetId ? { ...user, ...operation.draft } : user));
    return changed(state, {
      users,
      listScenario: 'populated',
      route: operation.context === 'profile' ? 'profile' : 'users',
      feedback: feedback('success', 'Pessoa de exemplo salva.'),
    });
  }
  const id = `u${state.nextId}`;
  return changed(state, {
    users: [...state.users, { id, ...operation.draft }],
    nextId: state.nextId + 1,
    listScenario: 'populated',
    route: 'users',
    feedback: feedback('success', 'Pessoa de exemplo criada.'),
  });
}

function commitDelete(state, operation) {
  const users = state.users.filter((user) => user.id !== operation.targetId);
  const actorDeleted = operation.targetId === state.actorId;
  return changed(state, {
    users,
    deleteDialog: null,
    actorId: actorDeleted ? null : state.actorId,
    route: actorDeleted ? 'login' : 'users',
    feedback: feedback(actorDeleted ? 'info' : 'success', actorDeleted ? 'Conta de exemplo removida. Entre novamente ou reinicie a demonstração.' : 'Pessoa de exemplo excluída.'),
  });
}

export function completeOperation(state, operationId) {
  if (!state.pending || state.pending.id !== operationId) return state;
  const operation = state.pending;
  if (operation.outcome === 'error') {
    return changed(state, {
      pending: null,
      failure: { ...operation },
      deleteDialog: operation.kind === 'delete'
        ? { ...(state.deleteDialog ?? { targetId: operation.targetId, confirmation: operation.confirmation }), error: 'Falha ilustrativa ao excluir.' }
        : state.deleteDialog,
      feedback: feedback('error', operation.kind === 'save' ? 'Falha ilustrativa ao salvar.' : 'Falha ilustrativa ao excluir.'),
    });
  }
  const base = changed(state, { pending: null, failure: null, formDraft: operation.kind === 'save' ? null : state.formDraft });
  return operation.kind === 'save' ? commitSave(base, operation) : commitDelete(base, operation);
}

export function retryOperation(state) {
  if (!state.failure || state.pending) return changed(state, {});
  const { kind, targetId, draft, confirmation, context } = state.failure;
  if (kind === 'save' && state.failure.context === 'signup') return beginSignUp(state, draft);
  if (kind === 'save') return beginSave(state, { targetId, draft, context });
  return beginDelete(state, state.deleteDialog?.targetId === targetId ? {} : { targetId, confirmation });
}

const importFile = (format) => (format === 'csv' ? 'pessoas-exemplo.csv' : 'pessoas-exemplo.xlsx');
const terminalImportPhases = new Set(['completed', 'partial', 'failed']);

export function chooseImport(state, format) {
  if (format !== 'csv' && format !== 'xlsx') {
    return changed(state, { feedback: feedback('error', 'Escolha um exemplo CSV ou XLSX.') });
  }
  return changed(state, {
    importScenario: { phase: 'selected', format, filename: importFile(format), outcome: state.importScenario.outcome },
    feedback: null,
  });
}

export function setImportOutcome(state, outcome) {
  if (!['completed', 'partial', 'failed'].includes(outcome)) {
    return changed(state, { feedback: feedback('error', 'Resultado de importação inválido.') });
  }
  return changed(state, { importScenario: { ...state.importScenario, outcome } });
}

export function startImport(state) {
  if (state.importScenario.phase !== 'selected') return state;
  return changed(state, { importScenario: { ...state.importScenario, phase: 'queued' }, feedback: null });
}

export function advanceImport(state) {
  const scenario = state.importScenario;
  if (scenario.phase === 'queued') return changed(state, { importScenario: { ...scenario, phase: 'processing' } });
  if (scenario.phase === 'processing') {
    return changed(state, {
      importScenario: { ...scenario, phase: scenario.outcome },
      feedback: feedback(scenario.outcome === 'failed' ? 'error' : 'success', `Demonstração de importação: ${scenario.outcome}.`),
    });
  }
  if (terminalImportPhases.has(scenario.phase)) return state;
  return changed(state, { feedback: feedback('info', 'Selecione um exemplo antes de avançar.') });
}

export function retryImport(state) {
  if (!terminalImportPhases.has(state.importScenario.phase)) return state;
  return changed(state, { importScenario: { ...state.importScenario, phase: 'selected' }, feedback: null });
}

export function replaceImport(state, format) {
  return chooseImport(state, format);
}
