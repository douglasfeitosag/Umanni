import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createState,
  beginDelete,
  beginSave,
  beginSignUp,
  canBeginDelete,
  advanceImport,
  chooseImport,
  closeDeleteDialog,
  completeOperation,
  cancelOperation,
  dismissFeedback,
  login,
  navigate,
  restart,
  retryOperation,
  retryImport,
  recoverList,
  replaceImport,
  openDeleteDialog,
  selectCounts,
  selectActor,
  selectUser,
  selectUsers,
  setDeleteOutcome,
  setFormDraft,
  setImportOutcome,
  setListScenario,
  setDeleteConfirmation,
  setSaveOutcome,
  signOut,
  signUp,
  startImport,
} from '../state.mjs';

test('creates an immutable fictional baseline and resets visible state', () => {
  const state = createState();

  assert.deepEqual(state.users, [
    { id: 'u1', name: 'Lia Exemplo', email: 'lia@example.test', role: 'admin' },
    { id: 'u2', name: 'Caio Modelo', email: 'caio@example.test', role: 'regular' },
    { id: 'u3', name: 'Nina Teste', email: 'nina@example.test', role: 'regular' },
  ]);
  assert.deepEqual(selectCounts(state), { total: 3, admins: 1, regulars: 2 });
  assert.equal(state.route, 'login');
  assert.equal(state.actorId, null);
  assert.equal(state.saveOutcome, 'success');
  assert.equal(state.deleteOutcome, 'success');
  assert.equal(state.formDraft, null);

  const reset = restart({ ...state, route: 'users', operationSequence: 4 });
  assert.notStrictEqual(reset, state);
  assert.equal(reset.route, 'login');
  assert.equal(reset.operationSequence, 4);
  assert.deepEqual(reset.users, state.users);
});

test('keeps a normalized save draft through validation, pending, failure, and outcome changes', () => {
  const admin = login(createState(), 'u1');
  const entered = setFormDraft(admin, {
    name: '  Rascunho Exemplo ', email: ' rascunho@example.test ', role: 'regular',
  });
  assert.deepEqual(entered.formDraft, {
    name: 'Rascunho Exemplo', email: 'rascunho@example.test', role: 'regular',
  });
  assert.deepEqual(setSaveOutcome(entered, 'error').formDraft, entered.formDraft);

  const invalid = beginSave(entered, {
    draft: { name: '  ', email: ' inválido ', role: 'regular' },
  });
  assert.deepEqual(invalid.formDraft, { name: '', email: 'inválido', role: 'regular' });

  const pending = beginSave(setSaveOutcome(entered, 'error'), { draft: entered.formDraft });
  assert.deepEqual(pending.formDraft, entered.formDraft);
  const failed = completeOperation(pending, pending.pending.id);
  assert.deepEqual(failed.formDraft, entered.formDraft);

  const retried = retryOperation(setSaveOutcome(failed, 'success'));
  assert.deepEqual(retried.formDraft, entered.formDraft);
  assert.equal(completeOperation(retried, retried.pending.id).formDraft, null);
});

test('runs sign-up through the cancellable save operation and retries an illustrative failure', () => {
  const initial = createState();
  const pending = beginSignUp(setSaveOutcome(initial, 'error'), {
    name: '  Cadastro Exemplo ', email: ' cadastro@example.test ', role: 'admin',
  });
  assert.deepEqual(pending.pending, {
    id: 'operation-1', kind: 'save', context: 'signup', targetId: null,
    draft: { name: 'Cadastro Exemplo', email: 'cadastro@example.test', role: 'regular' }, outcome: 'error',
  });
  assert.deepEqual(pending.formDraft, pending.pending.draft);

  const failed = completeOperation(pending, pending.pending.id);
  assert.equal(failed.users.length, 3);
  assert.equal(failed.failure.context, 'signup');
  assert.deepEqual(failed.formDraft, pending.pending.draft);

  const retried = retryOperation(setSaveOutcome(failed, 'success'));
  assert.equal(retried.pending.context, 'signup');
  const completed = completeOperation(retried, retried.pending.id);
  assert.equal(completed.actorId, 'u4');
  assert.equal(completed.route, 'profile');
  assert.deepEqual(completed.users.at(-1), {
    id: 'u4', name: 'Cadastro Exemplo', email: 'cadastro@example.test', role: 'regular',
  });
  assert.equal(completed.formDraft, null);
});

test('returns admin edits to users and own profile edits to profile through operation context', () => {
  const adminEdit = beginSave(navigate(login(createState(), 'u1'), 'users/u2/edit'), {
    targetId: 'u2', draft: { name: 'Caio Editado', email: 'caio@example.test', role: 'regular' },
  });
  assert.equal(adminEdit.pending.context, 'users');
  assert.equal(completeOperation(adminEdit, adminEdit.pending.id).route, 'users');

  const profileEdit = beginSave(navigate(login(createState(), 'u2'), 'profile/edit'), {
    targetId: 'u2', draft: { name: 'Caio Perfil', email: 'caio@example.test', role: 'regular' },
  });
  assert.equal(profileEdit.pending.context, 'profile');
  assert.equal(completeOperation(profileEdit, profileEdit.pending.id).route, 'profile');

  const created = beginSave(login(createState(), 'u1'), {
    draft: { name: 'Criada', email: 'criada@example.test', role: 'regular' },
  });
  assert.equal(created.pending.context, 'create');
  assert.equal(completeOperation(created, created.pending.id).route, 'users');
});

test('keeps invalid sign-up fields in core state without starting an operation', () => {
  const invalid = beginSignUp(createState(), { name: ' ', email: ' inválido ' });
  assert.equal(invalid.pending, null);
  assert.deepEqual(invalid.formDraft, { name: '', email: 'inválido', role: 'regular' });
  assert.equal(invalid.route, 'signup');
});

test('preserves a normalized sign-up draft on invalid submission and clears drafts on navigation or cancellation', () => {
  const invalid = signUp(createState(), { name: '  ', email: ' inválido ' });
  assert.deepEqual(invalid.formDraft, { name: '', email: 'inválido', role: 'regular' });
  assert.equal(navigate(invalid, 'login').formDraft, null);

  const pending = beginSave(login(createState(), 'u1'), {
    draft: { name: '  Cancelar ', email: ' cancelar@example.test ', role: 'regular' },
  });
  assert.notEqual(pending.formDraft, null);
  assert.equal(cancelOperation(pending).formDraft, null);
});

test('progresses supplied CSV and XLSX examples without changing people or counts', () => {
  const admin = login(createState(), 'u1');
  const selected = chooseImport(admin, 'csv');
  assert.deepEqual(selected.importScenario, {
    phase: 'selected', format: 'csv', filename: 'pessoas-exemplo.csv', outcome: 'completed',
  });
  const queued = startImport(selected);
  const processing = advanceImport(queued);
  const completed = advanceImport(processing);
  assert.equal(queued.importScenario.phase, 'queued');
  assert.equal(processing.importScenario.phase, 'processing');
  assert.equal(completed.importScenario.phase, 'completed');
  assert.deepEqual(selectCounts(completed), { total: 3, admins: 1, regulars: 2 });
  assert.strictEqual(advanceImport(completed), completed);

  const partial = advanceImport(advanceImport(startImport(setImportOutcome(chooseImport(admin, 'xlsx'), 'partial'))));
  assert.deepEqual(partial.importScenario, {
    phase: 'partial', format: 'xlsx', filename: 'pessoas-exemplo.xlsx', outcome: 'partial',
  });
  const retried = retryImport(partial);
  assert.equal(retried.importScenario.phase, 'selected');
  assert.equal(retried.importScenario.format, 'xlsx');
});

test('keeps regular people self-only and leaves last-admin choices unresolved', () => {
  const regular = login(createState(), 'u2');
  const forgedEdit = beginSave(regular, {
    targetId: 'u3', draft: { name: 'Nina Teste', email: 'nina@example.test', role: 'regular' },
  });
  assert.equal(forgedEdit.pending, null);
  assert.match(forgedEdit.feedback.message, /próprio perfil/i);

  const changedRole = beginSave(regular, {
    targetId: 'u2', draft: { name: 'Caio Modelo', email: 'caio@example.test', role: 'admin' },
  });
  assert.equal(changedRole.pending, null);
  assert.equal(changedRole.feedback.message, 'Decisão de produto pendente.');

  const admin = login(createState(), 'u1');
  const lastAdmin = beginDelete(admin, { targetId: 'u1', confirmation: 'EXCLUIR' });
  assert.equal(lastAdmin.pending, null);
  assert.equal(lastAdmin.feedback.message, 'Decisão de produto pendente.');

  const ownDeletion = completeOperation(beginDelete(regular, { targetId: 'u2', confirmation: 'EXCLUIR' }), 'operation-1');
  assert.equal(ownDeletion.actorId, null);
  assert.equal(ownDeletion.route, 'login');
});

test('keeps deletion dialog target and exact confirmation in core state through errors and retry', () => {
  const admin = login(createState(), 'u1');
  const opened = openDeleteDialog(admin, 'u2');
  assert.deepEqual(opened.deleteDialog, { targetId: 'u2', confirmation: '', error: null });
  const invalid = beginDelete(setDeleteConfirmation(opened, 'excluir'));
  assert.deepEqual(invalid.deleteDialog, {
    targetId: 'u2', confirmation: 'excluir', error: 'Confirmação inválida.',
  });
  assert.equal(invalid.pending, null);

  const valid = beginDelete(setDeleteConfirmation(setDeleteOutcome(invalid, 'error'), ' EXCLUIR '));
  assert.equal(valid.pending.kind, 'delete');
  assert.deepEqual(valid.deleteDialog, { targetId: 'u2', confirmation: ' EXCLUIR ', error: null });
  const failed = completeOperation(valid, valid.pending.id);
  assert.deepEqual(failed.deleteDialog, {
    targetId: 'u2', confirmation: ' EXCLUIR ', error: 'Falha ilustrativa ao excluir.',
  });
  assert.equal(retryOperation(setDeleteOutcome(failed, 'success')).pending.targetId, 'u2');
  assert.equal(closeDeleteDialog(valid).pending, null);
  assert.equal(closeDeleteDialog(valid).deleteDialog, null);
});

test('keeps fixtures while list presentation changes and restart prevents stale ID collisions', () => {
  const initial = login(createState(), 'u1');
  const empty = setListScenario(initial, 'empty');
  assert.equal(empty.listScenario, 'empty');
  assert.equal(empty.users.length, 3);
  assert.equal(initial.listScenario, 'populated');
  assert.equal(setListScenario(empty, 'not-a-scenario').listScenario, 'empty');

  const firstPending = beginSave(initial, {
    draft: { name: 'Primeira', email: 'primeira@example.test', role: 'regular' },
  });
  const restarted = restart(firstPending);
  const secondPending = beginSave(login(restarted, 'u1'), {
    draft: { name: 'Segunda', email: 'segunda@example.test', role: 'regular' },
  });
  assert.equal(secondPending.pending.id, 'operation-2');
  assert.strictEqual(completeOperation(secondPending, 'operation-1'), secondPending);
  assert.equal(completeOperation(secondPending, 'operation-2').users.at(-1).name, 'Segunda');
});

test('cancels pending work on navigation or sign-out and keeps demonstration selectors stable while pending', () => {
  const admin = login(createState(), 'u1');
  const saving = beginSave(setSaveOutcome(admin, 'error'), {
    draft: { name: 'Pendente', email: 'pendente@example.test', role: 'regular' },
  });
  assert.equal(setSaveOutcome(saving, 'success').saveOutcome, 'error');
  const navigated = navigate(saving, 'users');
  assert.equal(navigated.pending, null);
  assert.strictEqual(completeOperation(navigated, 'operation-1'), navigated);

  const deleting = beginDelete(login(createState(), 'u1'), { targetId: 'u2', confirmation: 'EXCLUIR' });
  const signedOut = signOut(deleting);
  assert.equal(signedOut.pending, null);
  assert.equal(signedOut.deleteDialog, null);
  assert.equal(completeOperation(signedOut, 'operation-1').users.length, 3);
});

test('rejects illustrative invalid drafts and preserves failed import as a retryable scenario', () => {
  const invalid = signUp(createState(), { name: ' ', email: 'not-an-email' });
  assert.equal(invalid.route, 'signup');
  assert.deepEqual(invalid.formErrors, {
    name: 'Informe um nome de exemplo.', email: 'Informe um e-mail de exemplo válido.',
  });

  const failed = advanceImport(advanceImport(startImport(setImportOutcome(
    chooseImport(login(createState(), 'u1'), 'csv'), 'failed',
  ))));
  assert.equal(failed.importScenario.phase, 'failed');
  assert.equal(retryImport(failed).importScenario.phase, 'selected');
  assert.equal(failed.users.length, 3);
});

test('creates and edits only through one cancellable, idempotent save operation', () => {
  const admin = login(createState(), 'u1');
  const started = beginSave(admin, { draft: { name: '  Ana Exemplo ', email: ' ana@example.test ', role: 'regular' } });

  assert.deepEqual(started.pending, {
    id: 'operation-1', kind: 'save', context: 'create', targetId: null,
    draft: { name: 'Ana Exemplo', email: 'ana@example.test', role: 'regular' }, outcome: 'success',
  });
  assert.equal(admin.users.length, 3);
  assert.strictEqual(beginSave(started, { draft: { name: 'Outra', email: 'outra@example.test', role: 'regular' } }).pending.id, 'operation-1');

  const completed = completeOperation(started, 'operation-1');
  assert.equal(completed.users.length, 4);
  assert.equal(completed.users.at(-1).name, 'Ana Exemplo');
  assert.deepEqual(selectCounts(completed), { total: 4, admins: 1, regulars: 3 });
  assert.strictEqual(completeOperation(completed, 'operation-1'), completed);

  const changed = completeOperation(beginSave(completed, {
    targetId: 'u2', draft: { name: 'Caio Atualizado', email: 'caio@example.test', role: 'admin' },
  }), 'operation-2');
  assert.deepEqual(changed.users.find((user) => user.id === 'u2'), {
    id: 'u2', name: 'Caio Atualizado', email: 'caio@example.test', role: 'admin',
  });

  const cancelled = cancelOperation(beginSave(admin, {
    draft: { name: 'Cancelada', email: 'cancelada@example.test', role: 'regular' },
  }));
  assert.equal(cancelled.pending, null);
  assert.equal(completeOperation(cancelled, 'operation-1').users.length, 3);
});

test('keeps failed save and deletion attempts recoverable without mutation', () => {
  const admin = login(createState(), 'u1');
  const saveFailureStarted = beginSave(setSaveOutcome(admin, 'error'), {
    draft: { name: 'Falha', email: 'falha@example.test', role: 'regular' },
  });
  const failedSave = completeOperation(saveFailureStarted, 'operation-1');
  assert.equal(failedSave.users.length, 3);
  assert.equal(failedSave.pending, null);
  assert.equal(failedSave.failure.kind, 'save');

  const recovered = completeOperation(retryOperation(setSaveOutcome(failedSave, 'success')), 'operation-2');
  assert.equal(recovered.users.length, 4);

  const deleteError = beginDelete(setDeleteOutcome(admin, 'error'), { targetId: 'u2', confirmation: ' EXCLUIR ' });
  assert.equal(deleteError.pending.kind, 'delete');
  const failedDelete = completeOperation(deleteError, 'operation-1');
  assert.equal(failedDelete.users.length, 3);
  assert.equal(failedDelete.failure.confirmation, 'EXCLUIR');
  const deleted = completeOperation(retryOperation(setDeleteOutcome(failedDelete, 'success')), 'operation-2');
  assert.equal(deleted.users.some((user) => user.id === 'u2'), false);
});

test('enters each fictional role, signs up regular examples, and guards routes', () => {
  const initial = createState();
  const admin = login(initial, 'u1');
  assert.equal(admin.route, 'dashboard');
  assert.equal(admin.actorId, 'u1');
  assert.equal(navigate(admin, 'users').route, 'users');

  const regular = login(initial, 'u2');
  assert.equal(regular.route, 'profile');
  const forgedAdminRoute = navigate(regular, 'users');
  assert.equal(forgedAdminRoute.route, 'profile');
  assert.match(forgedAdminRoute.feedback.message, /perfil/i);

  const visitorRoute = navigate(initial, 'dashboard');
  assert.equal(visitorRoute.route, 'login');

  const signedUp = signUp(initial, { name: '  Nova Exemplo ', email: ' nova@example.test ' });
  assert.equal(signedUp.actorId, 'u4');
  assert.equal(signedUp.route, 'profile');
  assert.deepEqual(signedUp.users.at(-1), {
    id: 'u4', name: 'Nova Exemplo', email: 'nova@example.test', role: 'regular',
  });
  assert.equal(signOut(signedUp).actorId, null);
  assert.equal(signOut(signedUp).route, 'login');
});

test('exposes copied selectors and rejects missing, visitor, or unauthorized save targets', () => {
  const initial = createState();
  const selected = selectUsers(initial);
  selected[0].name = 'Mutação externa';
  assert.equal(selectUser(initial, 'u1').name, 'Lia Exemplo');
  assert.equal(selectActor(initial), null);
  assert.equal(selectUser(initial, 'missing'), null);
  assert.match(login(initial, 'missing').feedback.message, /não encontrado/i);
  assert.match(beginSave(initial, { draft: { name: 'A', email: 'a@example.test', role: 'regular' } }).feedback.message, /Entre/i);
  assert.match(beginSave(login(initial, 'u2'), { draft: { name: 'A', email: 'a@example.test', role: 'regular' } }).feedback.message, /não pode criar/i);
  assert.match(beginSave(login(initial, 'u1'), {
    targetId: 'missing', draft: { name: 'A', email: 'a@example.test', role: 'regular' },
  }).feedback.message, /não encontrada/i);
});

test('recovers every public scenario guard without inventing an import result', () => {
  const initial = createState();
  assert.equal(navigate(initial, 'signup').route, 'signup');
  assert.equal(navigate(initial, 'unknown').route, 'login');
  assert.equal(navigate(login(initial, 'u1'), 'users/missing/edit').route, 'dashboard');
  assert.equal(recoverList(setListScenario(initial, 'loading')).listScenario, 'populated');
  assert.equal(dismissFeedback(setListScenario(initial, 'invalid')).feedback, null);
  assert.match(setSaveOutcome(initial, 'invalid').feedback.message, /inválido/i);
  assert.match(setDeleteOutcome(initial, 'invalid').feedback.message, /inválido/i);
  assert.match(chooseImport(initial, 'pdf').feedback.message, /CSV ou XLSX/i);
  assert.match(setImportOutcome(initial, 'invalid').feedback.message, /inválido/i);
  assert.strictEqual(startImport(initial), initial);
  assert.match(advanceImport(initial).feedback.message, /Selecione/i);
  assert.strictEqual(retryImport(initial), initial);
  assert.equal(replaceImport(initial, 'xlsx').importScenario.filename, 'pessoas-exemplo.xlsx');
});

test('covers public guard outcomes without allowing policy bypasses', () => {
  const initial = createState();
  const admin = login(initial, 'u1');
  assert.equal(navigate(admin, 'profile').route, 'profile');
  assert.equal(navigate(admin, 'unknown').route, 'dashboard');
  assert.deepEqual(signUp(initial, { name: 'Nome', email: '' }).formErrors, {
    email: 'Informe um e-mail de exemplo.',
  });
  assert.equal(beginSave(admin, {
    targetId: 'u1', draft: { name: 'Lia Exemplo', email: 'lia@example.test', role: 'admin' },
  }).pending.kind, 'save');
  assert.equal(beginSave(admin, {
    targetId: 'u1', draft: { name: 'Lia Exemplo', email: 'lia@example.test', role: 'regular' },
  }).feedback.message, 'Decisão de produto pendente.');
  assert.match(beginSave(admin, {
    draft: { name: 'Nome', email: 'nome@example.test', role: 'other' },
  }).formErrors.role, /papel/i);

  assert.match(openDeleteDialog(initial, 'u2').feedback.message, /não encontrada/i);
  assert.match(openDeleteDialog(login(initial, 'u2'), 'u3').feedback.message, /próprio perfil/i);
  assert.equal(openDeleteDialog(admin, 'u1').feedback.message, 'Decisão de produto pendente.');
  assert.notStrictEqual(setDeleteConfirmation(initial, 'EXCLUIR'), initial);
  assert.equal(closeDeleteDialog(openDeleteDialog(admin, 'u2')).deleteDialog, null);
  const readyToDelete = setDeleteConfirmation(openDeleteDialog(admin, 'u2'), ' EXCLUIR ');
  assert.equal(canBeginDelete(readyToDelete), true);
  assert.equal(canBeginDelete(setDeleteConfirmation(readyToDelete, 'excluir')), false);
  const pendingDelete = beginDelete(readyToDelete);
  assert.equal(canBeginDelete(pendingDelete), false);
  assert.equal(setDeleteOutcome(pendingDelete, 'error').deleteOutcome, 'success');
  assert.equal(retryOperation(initial).pending, null);
});
