import test from "node:test";
import assert from "node:assert/strict";
import {THEMES,DEFAULT_THEME,getTheme,loadTheme,saveTheme} from "../extension/preferences.js";
test("dark gray default and invalid preference fallback",()=>{for(const v of [null,undefined,"black","",42])assert.equal(getTheme(v),DEFAULT_THEME);assert.equal(DEFAULT_THEME,"dark-gray");});
test("all supported themes survive a new popup load",()=>{const map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};assert.equal(loadTheme(storage),"dark-gray");for(const theme of THEMES){assert.equal(saveTheme(storage,theme),theme);assert.equal(loadTheme(storage),theme);}assert.equal(saveTheme(storage,"invalid"),"dark-gray");assert.equal(loadTheme(storage),"dark-gray");});
test("unavailable storage does not break themes",()=>{const storage={getItem(){throw Error("denied")},setItem(){throw Error("denied")}};assert.equal(loadTheme(storage),"dark-gray");assert.equal(saveTheme(storage,"light-gray"),"light-gray");});
