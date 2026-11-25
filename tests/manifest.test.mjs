import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL(p,import.meta.url),"utf8");
const m=JSON.parse(read("../extension/manifest.json"));
test("MV3 version and limited permissions",()=>{assert.equal(m.manifest_version,3);assert.equal(m.version,JSON.parse(read("../package.json")).version);assert.deepEqual(m.permissions,["storage"]);assert.equal(m.host_permissions,undefined);assert.equal(m.externally_connectable,undefined);});
test("three options; creation deferred",()=>{const html=read("../extension/popup.html");for(const id of ["new","base","existing","language","items","status"])assert.ok(html.includes('id="'+id+'"'));assert.match(html,/id="new" disabled/);});
