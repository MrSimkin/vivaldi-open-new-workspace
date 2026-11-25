import test from "node:test";
import assert from "node:assert/strict";
import { getWorkspaceCapability } from "../extension/workspace-adapter.js";

test("scaffold explicitly reports integration unavailable", () => {
  const result = getWorkspaceCapability();
  assert.equal(result.available, false);
  assert.equal(result.code, "NOT_IMPLEMENTED");
  assert.ok(result.label.length > 0);
  assert.ok(result.detail.includes("no está implementada"));
});

test("capability is callable without a browser or privileged API", () => {
  assert.deepEqual(getWorkspaceCapability(), getWorkspaceCapability());
});
