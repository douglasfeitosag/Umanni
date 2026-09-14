const frame = document.querySelector("#prototype-frame");
const resultsElement = document.querySelector("#test-results");
const statusElement = document.querySelector("#runner-status");
const results = [];

window.prototypeTestResults = results;

await run("administrator example opens the dashboard", async () => {
  const frameDocument = await loadPrototype();
  const initialHash = frame.contentWindow.location.hash;
  frameDocument.querySelector(".skip-link").click();
  await nextFrame();
  assertEqual(frame.contentWindow.location.hash, initialHash);
  assertEqual(frameDocument.activeElement?.id, "main-content");
  frameDocument.querySelector('[data-action="login"][data-user-id="u1"]').click();
  await nextFrame();
  assertEqual(frameDocument.querySelector("h1")?.textContent, "Painel");
});

await run("signup validates, fails illustratively, and retries without losing the draft", async () => {
  const frameDocument = await loadPrototype();
  frameDocument.querySelector('a[href="#/signup"]').click();
  await nextFrame();

  setValue(frameDocument.querySelector("#name"), "");
  setValue(frameDocument.querySelector("#email"), "inválido");
  frameDocument.querySelector('[data-form="signup"]').requestSubmit();
  await nextFrame();
  assertEqual(frameDocument.querySelectorAll('[aria-invalid="true"]').length, 2);

  setValue(frameDocument.querySelector("#name"), "Joana Demonstração");
  setValue(frameDocument.querySelector("#email"), "joana@example.test");
  setSelect(frameDocument.querySelector("#save-outcome"), "error");
  frameDocument.querySelector('[data-form="signup"]').requestSubmit();
  await delay(460);
  assertIncludes(frameDocument.body.textContent, "Falha ilustrativa ao salvar");
  assertEqual(frameDocument.querySelector("#name").value, "Joana Demonstração");

  setSelect(frameDocument.querySelector("#save-outcome"), "success");
  frameDocument.querySelector('[data-form="signup"]').requestSubmit();
  await delay(460);
  assertEqual(frameDocument.querySelector("h1")?.textContent, "Perfil");
  assertIncludes(frameDocument.body.textContent, "Joana Demonstração");
});

await run("administrator creates, edits, cancels, fails, and deletes one fictional user", async () => {
  const frameDocument = await loadPrototype();
  frameDocument.querySelector('[data-action="login"][data-user-id="u1"]').click();
  await nextFrame();
  frameDocument.querySelector('a[href="#/users"]').click();
  await nextFrame();
  frameDocument.querySelector('a[href="#/users/new"]').click();
  await nextFrame();

  setValue(frameDocument.querySelector("#name"), "Ana Exemplo");
  setValue(frameDocument.querySelector("#email"), "ana@example.test");
  setSelect(frameDocument.querySelector("#save-outcome"), "error");
  frameDocument.querySelector('[data-form="create-user"]').requestSubmit();
  await delay(460);
  assertIncludes(frameDocument.body.textContent, "Falha ilustrativa ao salvar");
  assertNotIncludes(frameDocument.body.textContent, "ana@example.test Exemplo");

  setSelect(frameDocument.querySelector("#save-outcome"), "success");
  frameDocument.querySelector('[data-form="create-user"]').requestSubmit();
  await delay(460);
  assertIncludes(frameDocument.body.textContent, "Ana Exemplo");

  frameDocument.querySelector('a[href="#/users/u4/edit"]').click();
  await nextFrame();
  setValue(frameDocument.querySelector("#name"), "Ana Atualizada");
  setSelect(frameDocument.querySelector("#role"), "admin");
  frameDocument.querySelector('[data-form="edit-user"]').requestSubmit();
  await delay(460);
  assertIncludes(frameDocument.body.textContent, "Ana Atualizada");
  frameDocument.querySelector('a[href="#/dashboard"]').click();
  await nextFrame();
  assertIncludes(frameDocument.body.textContent, "Administradores2");
  frameDocument.querySelector('a[href="#/users"]').click();
  await nextFrame();

  openDelete(frameDocument, "u4");
  assertEqual(frameDocument.activeElement?.textContent.trim(), "Cancelar");
  frameDocument.querySelector('[data-action="close-delete"]').click();
  await delay(60);
  assertEqual(frameDocument.querySelector("#delete-dialog"), null);
  openDelete(frameDocument, "u4");
  setValue(frameDocument.querySelector("#delete-confirmation"), "EXCLUIR");
  frameDocument.querySelector('[data-form="delete"]').requestSubmit();
  assertEqual(frameDocument.querySelector('[data-action="confirm-delete"]').disabled, true);
  frameDocument.querySelector('[data-form="delete"]').dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  frameDocument.querySelector('[data-action="close-delete"]').click();
  await delay(460);
  assertIncludes(frameDocument.body.textContent, "Ana Atualizada");
  assertEqual(frameDocument.querySelector("#delete-dialog"), null);

  openDelete(frameDocument, "u4");
  setValue(frameDocument.querySelector("#delete-confirmation"), "excluir");
  assertEqual(frameDocument.querySelector('[data-action="confirm-delete"]').disabled, true);
  setValue(frameDocument.querySelector("#delete-confirmation"), "EXCLUIR");
  setSelect(frameDocument.querySelector("#delete-outcome"), "error");
  frameDocument.querySelector('[data-form="delete"]').requestSubmit();
  await delay(460);
  assertIncludes(frameDocument.body.textContent, "Falha ilustrativa ao excluir");
  assertEqual(frameDocument.querySelector("#delete-confirmation").value, "EXCLUIR");

  setSelect(frameDocument.querySelector("#delete-outcome"), "success");
  frameDocument.querySelector('[data-form="delete"]').requestSubmit();
  await delay(460);
  assertNotIncludes(frameDocument.body.textContent, "Ana Atualizada");
});

await run("list scenarios recover without changing the fictional fixtures", async () => {
  const frameDocument = await loadPrototype();
  frameDocument.querySelector('[data-action="login"][data-user-id="u1"]').click();
  await nextFrame();
  frameDocument.querySelector('a[href="#/users"]').click();
  await nextFrame();

  setSelect(frameDocument.querySelector("#list-scenario"), "loading");
  assertIncludes(frameDocument.body.textContent, "Carregando usuários");
  setSelect(frameDocument.querySelector("#list-scenario"), "empty");
  assertIncludes(frameDocument.body.textContent, "Nenhum usuário cadastrado");
  frameDocument.querySelector('[data-action="recover-list"]').click();
  assertIncludes(frameDocument.body.textContent, "Nina Teste");
  setSelect(frameDocument.querySelector("#list-scenario"), "error");
  assertIncludes(frameDocument.body.textContent, "Não foi possível mostrar a lista");
  frameDocument.querySelector('[data-action="recover-list"]').click();
  assertIncludes(frameDocument.body.textContent, "lia@example.test");
});

await run("import examples traverse both formats and all terminal outcomes without changing counts", async () => {
  const frameDocument = await loadPrototype();
  frameDocument.querySelector('[data-action="login"][data-user-id="u1"]').click();
  await nextFrame();
  frameDocument.querySelector('a[href="#/import"]').click();
  await nextFrame();

  frameDocument.querySelector('[data-action="choose-import"][data-format="csv"]').click();
  advanceImportDemo(frameDocument, "completed");
  assertIncludes(frameDocument.body.textContent, "Importação concluída");
  frameDocument.querySelector('[data-action="retry-import"]').click();
  setSelect(frameDocument.querySelector("#replace-import"), "xlsx");
  advanceImportDemo(frameDocument, "partial");
  assertIncludes(frameDocument.body.textContent, "Concluída com avisos");
  frameDocument.querySelector('[data-action="retry-import"]').click();
  advanceImportDemo(frameDocument, "failed");
  assertIncludes(frameDocument.body.textContent, "Falha na importação");
  assertNotIncludes(frameDocument.body.textContent, "4 pessoas");
});

await run("regular profile stays self-only and deletion ends in an explanatory login state", async () => {
  const frameDocument = await loadPrototype();
  frameDocument.querySelector('[data-action="login"][data-user-id="u2"]').click();
  await nextFrame();
  assertEqual(frameDocument.querySelector("h1")?.textContent, "Perfil");
  assertEqual(frameDocument.querySelector('a[href="#/users"]'), null);

  frame.contentWindow.location.hash = "#/users";
  await nextFrame();
  assertEqual(frameDocument.querySelector("h1")?.textContent, "Perfil");
  assertIncludes(frameDocument.body.textContent, "próprio perfil");

  frameDocument.querySelector('a[href="#/profile/edit"]').click();
  await nextFrame();
  setValue(frameDocument.querySelector("#name"), "Caio Atualizado");
  setSelect(frameDocument.querySelector("#save-outcome"), "error");
  frameDocument.querySelector('[data-form="edit-profile"]').requestSubmit();
  await delay(460);
  assertIncludes(frameDocument.body.textContent, "Falha ilustrativa ao salvar");
  setSelect(frameDocument.querySelector("#save-outcome"), "success");
  frameDocument.querySelector('[data-form="edit-profile"]').requestSubmit();
  await delay(460);
  assertIncludes(frameDocument.body.textContent, "Caio Atualizado");

  openDelete(frameDocument, "u2");
  setValue(frameDocument.querySelector("#delete-confirmation"), "EXCLUIR");
  frameDocument.querySelector('[data-action="close-delete"]').click();
  assertIncludes(frameDocument.body.textContent, "Caio Atualizado");

  openDelete(frameDocument, "u2");
  setValue(frameDocument.querySelector("#delete-confirmation"), "EXCLUIR");
  setSelect(frameDocument.querySelector("#delete-outcome"), "error");
  frameDocument.querySelector('[data-form="delete"]').requestSubmit();
  await delay(460);
  assertIncludes(frameDocument.body.textContent, "Falha ilustrativa ao excluir");
  setSelect(frameDocument.querySelector("#delete-outcome"), "success");
  frameDocument.querySelector('[data-form="delete"]').requestSubmit();
  await delay(460);
  assertEqual(frameDocument.querySelector("#login-title")?.textContent, "Bem-vindo");
  assertIncludes(frameDocument.body.textContent, "Conta de exemplo removida");
});

await run("back, forward, sign-out, restart, reload, and missing routes recover deterministically", async () => {
  let frameDocument = await loadPrototype();
  frameDocument.querySelector('[data-action="login"][data-user-id="u1"]').click();
  await nextFrame();
  frameDocument.querySelector('a[href="#/users"]').click();
  await nextFrame();
  frameDocument.querySelector('a[href="#/users/missing/edit"]')?.click();
  frame.contentWindow.location.hash = "#/users/missing/edit";
  await nextFrame();
  assertEqual(frameDocument.querySelector("h1")?.textContent, "Painel");
  assertIncludes(frameDocument.body.textContent, "não encontrada");

  frame.contentWindow.history.back();
  await delay(80);
  assertEqual(frameDocument.querySelector("h1")?.textContent, "Usuários");
  frame.contentWindow.history.forward();
  await delay(80);
  assertEqual(frameDocument.querySelector("h1")?.textContent, "Painel");

  frameDocument.querySelector('[data-action="restart"]').click();
  await nextFrame();
  assertEqual(frameDocument.querySelector("#login-title")?.textContent, "Bem-vindo");
  frameDocument.querySelector('[data-action="login"][data-user-id="u1"]').click();
  await nextFrame();
  frameDocument.querySelector('[data-action="signout"]').click();
  await nextFrame();
  assertEqual(frameDocument.querySelector("#login-title")?.textContent, "Bem-vindo");

  const loaded = new Promise((resolve) => frame.addEventListener("load", resolve, { once: true }));
  frame.contentWindow.location.reload();
  await loaded;
  await nextFrame();
  frameDocument = frame.contentDocument;
  assertEqual(frameDocument.querySelector("#login-title")?.textContent, "Bem-vindo");
});

await run("enlarged visitor text and reduced motion preserve horizontal reflow", async () => {
  const frameDocument = await loadPrototype("&text-scale=200&reduced-motion=true");
  assertEqual(frameDocument.documentElement.scrollWidth <= frameDocument.documentElement.clientWidth, true);
  assertEqual(getComputedStyle(frameDocument.documentElement).fontSize, "32px");
  assertEqual(getComputedStyle(frameDocument.querySelector(".button")).transitionDuration, "1e-05s");
});

statusElement.textContent = results.every(({ passed }) => passed)
  ? `${results.length} browser tests passed`
  : `${results.filter(({ passed }) => !passed).length} browser tests failed`;
statusElement.dataset.result = results.every(({ passed }) => passed) ? "passed" : "failed";

async function run(name, testCase) {
  try {
    await testCase();
    recordResult(name, true);
  } catch (error) {
    recordResult(name, false, error.message);
  }
}

function recordResult(name, passed, detail = "") {
  results.push({ name, passed, detail });
  const item = document.createElement("li");
  item.textContent = passed ? `PASS — ${name}` : `FAIL — ${name}: ${detail}`;
  item.dataset.result = passed ? "passed" : "failed";
  resultsElement.append(item);
}

async function loadPrototype(parameters = "") {
  const loaded = new Promise((resolve) => frame.addEventListener("load", resolve, { once: true }));
  frame.src = `../index.html?test=${Date.now()}${parameters}#/login`;
  await loaded;
  await nextFrame();
  return frame.contentDocument;
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function setValue(control, value) {
  control.value = value;
  control.dispatchEvent(new Event("input", { bubbles: true }));
}

function setSelect(control, value) {
  control.value = value;
  control.dispatchEvent(new Event("change", { bubbles: true }));
}

function openDelete(frameDocument, userId) {
  frameDocument.querySelector(`[data-action="open-delete"][data-user-id="${userId}"]`).click();
}

function advanceImportDemo(frameDocument, outcome) {
  setSelect(frameDocument.querySelector("#import-outcome"), outcome);
  frameDocument.querySelector('[data-action="start-import"]').click();
  frameDocument.querySelector('[data-action="advance-import"]').click();
  frameDocument.querySelector('[data-action="advance-import"]').click();
}

function assertEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error(`expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
  }
}

function assertIncludes(actual, expected) {
  if (!String(actual).includes(expected)) {
    throw new Error(`expected ${JSON.stringify(actual)} to include ${JSON.stringify(expected)}`);
  }
}

function assertNotIncludes(actual, expected) {
  if (String(actual).includes(expected)) {
    throw new Error(`expected ${JSON.stringify(actual)} not to include ${JSON.stringify(expected)}`);
  }
}
