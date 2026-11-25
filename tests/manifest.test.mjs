import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL(p,import.meta.url),"utf8");
const m=JSON.parse(read("../extension/manifest.json"));
test("MV3 version and limited permissions",()=>{assert.equal(m.manifest_version,3);assert.equal(m.version,JSON.parse(read("../package.json")).version);assert.deepEqual(m.permissions,["storage"]);assert.equal(m.host_permissions,undefined);assert.equal(m.externally_connectable,undefined);});
test("three options; creation deferred",()=>{const html=read("../extension/popup.html");for(const id of ["new","base","existing","language","items","status"])assert.ok(html.includes('id="'+id+'"'));assert.match(html,/id="new" disabled/);});

test("existing list is visible and automatically loaded on startup",()=>{const html=read("../extension/popup.html"),js=read("../extension/popup.js");assert.match(html,/<section id="list" aria-labelledby="existingLabel">/);assert.doesNotMatch(js,/\$\("existing"\)\.addEventListener/);assert.match(js,/if\(source&&!busy\)await list\(\)/);});
test("light popup and valid PNG icon headers",()=>{assert.match(read("../extension/popup.css"),/color-scheme: light;/);for(const [size,path] of Object.entries(m.icons)){const b=readFileSync(new URL("../extension/"+path,import.meta.url));assert.equal(b.subarray(0,8).toString("hex"),"89504e470d0a1a0a");assert.equal(b.readUInt32BE(16),Number(size));assert.equal(b.readUInt32BE(20),Number(size));}for(const [size,path] of Object.entries(m.action.default_icon))assert.equal(path,m.icons[size]);});

test("theme configuration has three choices and safe dark initial theme",()=>{const html=read("../extension/popup.html"),css=read("../extension/popup.css"),js=read("../extension/popup.js");assert.match(html,/data-theme="dark-gray"/);assert.match(html,/id="settings"/);for(const theme of ["dark-gray","light-gray","light-blue"])assert.ok(html.includes('value="'+theme+'"'));assert.match(css,/color-scheme: dark;/);assert.match(css,/data-theme="light-gray"/);assert.match(css,/data-theme="light-blue"/);assert.match(js,/loadTheme\(localStorage\)/);assert.match(js,/saveTheme\(localStorage,e.target.value\)/);});
