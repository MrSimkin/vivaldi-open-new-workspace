import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {getLanguage,PROTOCOL} from '../extension/workspace-adapter.js';
import {THEMES,DEFAULT_THEME,getTheme,saveTheme,loadTheme} from '../extension/preferences.js';
const read=name=>readFileSync(new URL('../extension/'+name,import.meta.url),'utf8');
test('Spanish fallback; preserve explicit valid language',()=>{
 for(const saved of [undefined,null,'','fr','ES'])assert.equal(getLanguage(saved,'en-US'),'es');
 assert.equal(getLanguage('en','es-CL'),'en');assert.equal(getLanguage('es','en-US'),'es');
});
test('four themes; dark gray default; dark blue persists',()=>{
 assert.equal(DEFAULT_THEME,'dark-gray');assert.equal(THEMES.length,4);
 const map=new Map();const storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};
 assert.equal(loadTheme(storage),'dark-gray');assert.equal(saveTheme(storage,'dark-blue'),'dark-blue');
 assert.equal(loadTheme(storage),'dark-blue');assert.equal(getTheme('bogus'),'dark-gray');
 assert.equal(loadTheme(null),'dark-gray');assert.equal(saveTheme(null,'dark-blue'),'dark-blue');
});
test('theme options aligned with validated palette; explicit intrinsic width',()=>{
 const html=read('popup.html'),css=read('popup.css');
 const select=html.match(/<select id="theme">(.*?)<\/select>/s)[1];
 assert.deepEqual([...select.matchAll(/value="([^"]+)"/g)].map(m=>m[1]),[...THEMES]);
 assert.match(css,/html, body\s*\{[^}]*width: 420px; min-width: 420px/);
 assert.doesNotMatch(css,/max-width:\s*100vw/);assert.match(css,/data-theme="dark-blue"/);
});
test('error details separate from visible status; no protocol bump',()=>{
 assert.match(read('popup.html'),/id="status" role="status"/);
 assert.match(read('popup.html'),/id="errorDetails" hidden/);
 assert.match(read('popup.js'),/result\.extraWindow\?t\("extra"\)/);
 assert.match(read('popup.js'),/\$\("errorCode"\)\.textContent=code/);
 assert.equal(PROTOCOL,3);
});
