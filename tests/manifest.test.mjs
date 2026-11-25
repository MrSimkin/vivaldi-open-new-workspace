import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = path => readFileSync(new URL(path, import.meta.url), "utf8");
const manifest = JSON.parse(read("../extension/manifest.json"));

test("manifest uses MV3 and version matches tooling", () => {
  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.version, JSON.parse(read("../package.json")).version);
});

test("scaffold declares no permissions or background worker", () => {
  for (const key of ["permissions", "host_permissions", "optional_permissions", "optional_host_permissions", "content_scripts", "background"]) {
    assert.equal(manifest[key], undefined);
  }
});

test("popup does not expose a nonfunctional action button", () => {
  const html = read("../extension/popup.html");
  assert.match(html, /id="status"/);
  assert.match(html, /id="detail"/);
  assert.doesNotMatch(html, /<button\b/i);
});
