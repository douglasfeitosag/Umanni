import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import * as stateModule from "../state.mjs";
import * as viewsModule from "../views.mjs";

const expectedStateExports = [
  "advanceImport",
  "beginDelete",
  "beginSave",
  "beginSignUp",
  "canBeginDelete",
  "cancelOperation",
  "chooseImport",
  "closeDeleteDialog",
  "completeOperation",
  "createState",
  "dismissFeedback",
  "login",
  "navigate",
  "openDeleteDialog",
  "recoverList",
  "replaceImport",
  "restart",
  "retryImport",
  "retryOperation",
  "selectActor",
  "selectCounts",
  "selectUser",
  "selectUsers",
  "setDeleteConfirmation",
  "setDeleteOutcome",
  "setFormDraft",
  "setImportOutcome",
  "setListScenario",
  "setSaveOutcome",
  "signOut",
  "signUp",
  "startImport",
];

test("inventories every decision and rendering module in the numeric coverage core", () => {
  assert.deepEqual(Object.keys(stateModule).sort(), expectedStateExports.sort());
  assert.deepEqual(Object.keys(viewsModule).sort(), ["escapeHtml", "renderApp"]);
});

test("prototype sources do not add persistence, uploads, remote writes, or dynamic execution", async () => {
  const sources = await Promise.all(
    ["../state.mjs", "../views.mjs", "../app.mjs", "../index.html"].map((path) => (
      readFile(new URL(path, import.meta.url), "utf8")
    )),
  );
  const combined = sources.join("\n");

  assert.doesNotMatch(combined, /localStorage|sessionStorage|indexedDB|document\.cookie/);
  assert.doesNotMatch(combined, /\bfetch\b|XMLHttpRequest|WebSocket|sendBeacon/);
  assert.doesNotMatch(combined, /type=["']file["']|FileReader|FormData\.prototype/);
  assert.doesNotMatch(combined, /\beval\s*\(|new Function\s*\(/);
});
