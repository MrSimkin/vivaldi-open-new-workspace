import "./check.mjs";
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");
const destination = join(dist, "extension");
mkdirSync(dist, { recursive: true });
rmSync(destination, { recursive: true, force: true });
cpSync(join(root, "extension"), destination, { recursive: true });
console.log("Build ready: dist/extension (load unpacked). No browser runtime test performed.");
