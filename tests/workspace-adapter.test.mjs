import test from "node:test";
import assert from "node:assert/strict";
import { openNormalWindow, getLanguage } from "../extension/workspace-adapter.js";

test("normal window uses no source tab, URL or Workspace mutation", async () => {
  let calls = 0;
  const id = await openNormalWindow({ create: async options => {
    calls++; assert.deepEqual(options, { type: "normal", focused: true }); return { id: 7 };
  } });
  assert.equal(id, 7); assert.equal(calls, 1);
});
test("missing API and invalid result fail explicitly", async () => {
  await assert.rejects(openNormalWindow({}), /WINDOW_API_UNAVAILABLE/);
  await assert.rejects(openNormalWindow({ create: async () => ({}) }), /WINDOW_NOT_CONFIRMED/);
});
test("window API errors are propagated without retry", async () => {
  let calls = 0;
  await assert.rejects(openNormalWindow({ create: async () => { calls++; throw new Error("failure"); } }), /failure/);
  assert.equal(calls, 1);
});
test("saved language wins; default follows browser", () => {
  assert.equal(getLanguage("es", "en-US"), "es");
  assert.equal(getLanguage("en", "es-CL"), "en");
  assert.equal(getLanguage(null, "es-CL"), "es");
  assert.equal(getLanguage("invalid", "fr"), "en");
});
