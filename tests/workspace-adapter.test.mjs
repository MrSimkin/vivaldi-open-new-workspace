import test from "node:test";
import assert from "node:assert/strict";
import {locateWorkspace,validateSnapshot,openExisting,openNormalWindow,getLanguage,focusWindow} from "../extension/workspace-adapter.js";
const cat=[{id:1,name:"One"},{id:2,name:"Two"}];
const named=(id,workspaceId)=>({id,kind:"named",workspaceId});
const base=id=>({id,kind:"base"});
const unknown=id=>({id,kind:"unknown"});
const snap=(windows,workspaces=cat,canSelect=true)=>({windows,workspaces,canSelect});
test("focus active by strict native ID",()=>assert.deepEqual(locateWorkspace(snap([named(5,1),base(6)]),1),{kind:"focus",windowId:5}));
test("inactive, unknown and duplicate states",()=>{assert.deepEqual(locateWorkspace(snap([base(5)]),1),{kind:"open"});assert.throws(()=>locateWorkspace(snap([unknown(5)]),1),/ACTIVE_STATE_UNKNOWN/);assert.throws(()=>locateWorkspace(snap([named(5,1),named(6,1)]),1),/AMBIGUOUS_WORKSPACE/);assert.throws(()=>locateWorkspace(snap([base(5)]),"1"),/WORKSPACE_MISSING/);});
test("invalid catalogue and window IDs",()=>{assert.throws(()=>validateSnapshot(snap([base(5)],[cat[0],cat[0]])),/INVALID_CATALOG/);assert.throws(()=>validateSnapshot(snap([base(5),base(5)])),/INVALID_WINDOWS/);});
test("focus path never opens a window",async()=>{let focused=[];const r=await openExisting(1,5,{snapshot:async()=>snap([named(6,1),base(5)]),focus:async id=>focused.push(id),create:async()=>assert.fail("opened")});assert.deepEqual(focused,[6]);assert.equal(r.kind,"focused");});
test("inactive path selects in destination and preserves source",async()=>{const steps=[];let n=0;const snapshots=[snap([base(5)]),snap([base(5),base(6)]),snap([base(5),named(6,1)])];const r=await openExisting(1,5,{snapshot:async()=>snapshots[n++],create:async()=>{steps.push("create");return 6;},ready:async id=>steps.push("ready:"+id),select:async(id,ws)=>steps.push("select:"+id+":"+ws),exists:async id=>id===5,focus:async id=>steps.push("focus:"+id)});assert.deepEqual(steps,["create","ready:6","select:6:1","focus:6"]);assert.deepEqual(r,{kind:"opened",windowId:6});});
test("unknown states or duplicate names never create",async()=>{for(const s of [snap([unknown(5)]),snap([base(5)],[{id:1,name:"One"},{id:2,name:"One"}]),snap([base(5)],cat,false)])await assert.rejects(openExisting(1,5,{snapshot:async()=>s,create:async()=>assert.fail("opened")}));});
test("selection failure reports extra window without retry or closure",async()=>{let calls=0,n=0;await assert.rejects(openExisting(1,5,{snapshot:async()=>n++===0?snap([base(5)]):snap([base(5),base(6)]),create:async()=>6,ready:async()=>{},select:async()=>{calls++;throw Error("NATIVE_ITEM_UNAVAILABLE");}}),e=>e.message==="NATIVE_ITEM_UNAVAILABLE"&&e.extraWindow===6);assert.equal(calls,1);});
test("race when workspace opens elsewhere focuses it, reports extra window",async()=>{let n=0;const states=[snap([base(5)]),snap([base(5),base(6),named(7,1)]),snap([base(5),base(6),named(7,1)])];const r=await openExisting(1,5,{snapshot:async()=>states[n++],create:async()=>6,ready:async()=>{},focus:async id=>assert.equal(id,7),select:async()=>assert.fail("selected")});assert.equal(r.extraWindow,6);});
test("normal window and language",async()=>{assert.equal(await openNormalWindow({create:async o=>{assert.deepEqual(o,{type:"normal",focused:true});return{id:7};}}),7);assert.equal(getLanguage(null,"es-CL"),"es");assert.equal(getLanguage("en","es-CL"),"en");});

test("focus waits for verified window instead of trusting update response",async()=>{
 const calls=[];let reads=0;const w={id:6,type:"normal",incognito:false,state:"normal"};
 await focusWindow(6,{get:async()=>({...w,focused:++reads>=3}),update:async(id,opts)=>{calls.push([id,opts]);return {...w,focused:false};}},async()=>{});
 assert.deepEqual(calls,[[6,{focused:true}]]);assert.equal(reads,3);
});
test("focus failure does not retry mutation or create",async()=>{
 const calls=[];const w={id:6,type:"normal",incognito:false,state:"normal",focused:false};
 await assert.rejects(focusWindow(6,{get:async()=>w,update:async(id,opts)=>{calls.push([id,opts]);return w;}},async()=>{}),/FOCUS_UNVERIFIED/);
 assert.deepEqual(calls,[[6,{focused:true}]]);
});
test("focus rechecks metadata from target bridge, not origin",async()=>{
 const calls=[];await openExisting(1,5,{snapshot:async id=>{calls.push(id);return snap([base(5),named(6,1)]);},focus:async()=>{}});
 assert.deepEqual(calls,[5,6]);
});
