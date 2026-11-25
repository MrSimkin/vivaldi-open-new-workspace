import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const extension = join(root, "extension");
const manifest = JSON.parse(readFileSync(join(extension, "manifest.json"), "utf8"));
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
assert.equal(manifest.manifest_version, 3);
assert.equal(manifest.name, "Open New Workspace");
assert.equal(manifest.version, pkg.version);
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert.equal(manifest.action.default_popup, "popup.html");
for (const field of ["permissions", "host_permissions", "optional_permissions", "optional_host_permissions", "content_scripts"]) {
  assert.ok(!manifest[field]?.length, `Unexpected ${field} in scaffold`);
}
assert.ok(!manifest.background, "Unexpected background in scaffold");
const html = readFileSync(join(extension, manifest.action.default_popup), "utf8");
for (const [, path] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  assert.ok(!/^(?:[a-z]+:|\/|\.\.)/i.test(path), `Nonlocal resource: ${path}`);
  assert.ok(existsSync(join(extension, path)), `Missing resource: ${path}`);
}
for (const name of readdirSync(extension).filter(name => name.endsWith(".js"))) {
  execFileSync(process.execPath, ["--check", join(extension, name)], { stdio: "inherit" });
}
console.log("Scaffold check passed.");
