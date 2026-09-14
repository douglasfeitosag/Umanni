import assert from "node:assert/strict";
import test from "node:test";

import { renderApp } from "../views.mjs";

test("login view escapes fictional values and exposes the primary landmark", () => {
  const html = renderApp({
    actorId: null,
    route: "/login",
    users: [],
    feedback: null,
    pending: null,
  });

  assert.match(html, /<main[^>]+id="main-content"/);
  assert.match(html, /Desenvolvendo o potencial das pessoas/);
  assert.doesNotMatch(html, /<script>/);
});

test("signup and role-specific shell expose only their relevant journeys", () => {
  const signup = renderApp({
    actorId: null,
    route: "/signup",
    users: [],
    feedback: null,
    pending: null,
    saveOutcome: "success",
  });
  const regular = renderApp({
    actorId: "u2",
    route: "/profile",
    users: [
      { id: "u2", name: "Caio <Modelo>", email: "caio@example.test", role: "regular" },
    ],
    feedback: null,
    pending: null,
    saveOutcome: "success",
  });

  assert.match(signup, /name="name"/);
  assert.match(signup, /Criar conta de exemplo/);
  assert.match(regular, /Caio &lt;Modelo&gt;/);
  assert.match(regular, /Minha conta/);
  assert.doesNotMatch(regular, /href="#\/users"/);
});

test("administrator dashboard and populated users view render consistent records", () => {
  const users = [
    { id: "u1", name: "Lia Exemplo", email: "lia@example.test", role: "admin" },
    { id: "u2", name: "Caio Modelo", email: "caio@example.test", role: "regular" },
    { id: "u3", name: "Nina Teste", email: "nina@example.test", role: "regular" },
  ];
  const base = {
    actorId: "u1",
    users,
    feedback: null,
    pending: null,
    listScenario: "populated",
  };

  const dashboard = renderApp({ ...base, route: "/dashboard" });
  const list = renderApp({ ...base, route: "/users" });

  assert.match(dashboard, /Total de pessoas[\s\S]*3/);
  assert.match(dashboard, /Administradores[\s\S]*1/);
  assert.match(list, /<table/);
  assert.match(list, /class="user-cards"/);
  assert.match(list, /Nina Teste/);
  assert.match(list, /data-action="open-delete"/);
});

test("create and profile edit forms expose persistent labels, errors, and correct role controls", () => {
  const users = [
    { id: "u1", name: "Lia Exemplo", email: "lia@example.test", role: "admin" },
    { id: "u2", name: "Caio Modelo", email: "caio@example.test", role: "regular" },
  ];
  const base = {
    actorId: "u1",
    users,
    feedback: null,
    pending: null,
    saveOutcome: "error",
    formErrors: { email: "Informe um e-mail de exemplo válido." },
    draft: { name: "Nova Pessoa", email: "inválido", role: "regular" },
  };

  const create = renderApp({ ...base, route: "/users/new" });
  const ownEdit = renderApp({ ...base, route: "/profile/edit" });

  assert.match(create, /data-form="create-user"/);
  assert.match(create, /name="role"/);
  assert.match(create, /aria-invalid="true"/);
  assert.match(create, /Falha ilustrativa/);
  assert.match(ownEdit, /data-form="edit-profile"/);
  assert.match(ownEdit, /Papel atual/);
  assert.doesNotMatch(ownEdit, /name="role"/);
});

test("import view renders both supplied formats and every persistent phase", () => {
  const base = {
    actorId: "u1",
    route: "/import",
    users: [{ id: "u1", name: "Lia Exemplo", email: "lia@example.test", role: "admin" }],
    feedback: null,
    pending: null,
  };
  const expected = {
    idle: "Escolha um exemplo",
    selected: "pessoas-exemplo.csv",
    queued: "Na fila",
    processing: "Processando",
    completed: "Importação concluída",
    partial: "Concluída com avisos",
    failed: "Falha na importação",
  };

  for (const [phase, label] of Object.entries(expected)) {
    const html = renderApp({
      ...base,
      importScenario: { phase, format: phase === "idle" ? null : "csv", outcome: "completed" },
    });
    assert.match(html, new RegExp(label));
  }

  const xlsx = renderApp({
    ...base,
    importScenario: { phase: "selected", format: "xlsx", outcome: "partial" },
  });
  assert.match(xlsx, /pessoas-exemplo\.xlsx/);
  assert.match(xlsx, /Resultado da demonstração/);
});

test("deletion dialog keeps context through invalid, pending, and failure states", () => {
  const base = {
    actorId: "u1",
    route: "/users",
    users: [
      { id: "u1", name: "Lia Exemplo", email: "lia@example.test", role: "admin" },
      { id: "u2", name: "Caio Modelo", email: "caio@example.test", role: "regular" },
    ],
    feedback: null,
    listScenario: "populated",
    deleteOutcome: "error",
  };
  const invalid = renderApp({
    ...base,
    pending: null,
    deleteDialog: { targetId: "u2", confirmation: "excluir", error: null },
  });
  const pending = renderApp({
    ...base,
    deleteDialog: { targetId: "u2", confirmation: "EXCLUIR", error: null },
    pending: { id: "operation-1", kind: "delete", targetId: "u2", outcome: "error" },
  });
  const failed = renderApp({
    ...base,
    pending: null,
    deleteDialog: { targetId: "u2", confirmation: "EXCLUIR", error: "Falha ilustrativa ao excluir." },
  });

  assert.match(invalid, /id="delete-dialog"/);
  assert.match(invalid, /Caio Modelo/);
  assert.match(invalid, /value="excluir"/);
  assert.match(invalid, /data-action="confirm-delete" disabled/);
  assert.match(pending, /Excluindo…/);
  assert.match(pending, /data-action="close-delete"/);
  assert.match(failed, /Falha ilustrativa ao excluir/);
  assert.doesNotMatch(failed, /data-action="confirm-delete" disabled/);
});

test("users renderer exposes loading, empty, error, edit, missing, and recovery presentations", () => {
  const base = {
    actorId: "u1",
    route: "/users",
    users: [
      { id: "u1", name: "Lia Exemplo", email: "lia@example.test", role: "admin" },
      { id: "u2", name: "", email: "caio@example.test", role: "regular" },
    ],
    feedback: null,
    pending: null,
    saveOutcome: "success",
  };

  assert.match(renderApp({ ...base, listScenario: "loading" }), /Carregando usuários/);
  assert.match(renderApp({ ...base, listScenario: "empty" }), /Nenhum usuário cadastrado[\s\S]*Mostrar exemplos/);
  assert.match(renderApp({ ...base, listScenario: "error" }), /Não foi possível mostrar a lista[\s\S]*Mostrar exemplos/);
  assert.match(renderApp({ ...base, route: "/users/u2/edit" }), /data-form="edit-user"/);
  assert.match(renderApp({ ...base, route: "/users/missing/edit" }), /Usuário não encontrado/);
  assert.match(renderApp({ ...base, route: "/unknown" }), /Página de exemplo/);
  assert.match(renderApp({ ...base, listScenario: "populated" }), /icon-user-circle/);
});

test("renderer handles missing actors, custom feedback, pending saves, and own-account dialogs", () => {
  const missingActor = renderApp({
    actorId: "missing",
    route: "/profile",
    users: [],
    feedback: null,
    pending: null,
  });
  assert.match(missingActor, /Entrar como administradora/);

  const actor = { id: "u2", name: "Caio Modelo", email: "caio@example.test", role: "regular" };
  const base = {
    actorId: "u2",
    route: "/profile/edit",
    users: [actor],
    feedback: { tone: "info", title: "Título escolhido", message: "Mensagem <segura>" },
    pending: {
      id: "operation-2",
      kind: "save",
      targetId: "u2",
      draft: actor,
      outcome: "success",
    },
    saveOutcome: "success",
    deleteOutcome: "success",
    formErrors: { name: "Informe um nome." },
  };
  const pending = renderApp(base);
  assert.match(pending, /Salvando…/);
  assert.match(pending, /Título escolhido/);
  assert.match(pending, /Mensagem &lt;segura&gt;/);

  const ownDialog = renderApp({
    ...base,
    route: "/profile",
    pending: null,
    feedback: { kind: "success", message: "Atualizado." },
    deleteDialog: { targetId: "u2", confirmation: "", error: null },
  });
  assert.match(ownDialog, /Excluir minha conta/);
  assert.match(ownDialog, /Tudo certo/);

  const missingDialogTarget = renderApp({
    ...base,
    route: "/profile",
    pending: null,
    deleteDialog: { targetId: "missing", confirmation: "", error: null },
  });
  assert.doesNotMatch(missingDialogTarget, /id="delete-dialog"/);
});
