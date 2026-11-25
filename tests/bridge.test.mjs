import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const code=readFileSync(new URL("../bridge/onw-workspace-bridge.js",import.meta.url),"utf8");
const client="poebajclpmcacjgkdbkjfjbngmagakbe";
async function fixture({list=[{id:1,name:"Test",emoji:"🎲"}],metadata={workspaceId:1},window=7}={}){
 let listener;
 const c={runtime:{onMessageExternal:{addListener:x=>{listener=x;},removeListener(){}}},windows:{getAll:async()=>[{id:window,type:"normal",incognito:false}]},tabs:{query:async()=>[{id:8,windowId:window}]}};
 const v={windowPrivate:{getCurrentId:cb=>cb(window)},prefs:{get:(key,cb)=>cb({value:list})},tabsPrivate:{get:(id,cb)=>cb({vivExtData:JSON.stringify(metadata)})}};
 const ctx={location:{protocol:"chrome-extension:",hostname:"mpognobbkildjkofajifpdfhcoklimli",pathname:"/window.html"},chrome:c,vivaldi:v,document:{querySelectorAll:()=>[]},setTimeout,clearTimeout};
 vm.runInNewContext(code,ctx);await new Promise(r=>setImmediate(r));
 assert.equal(typeof listener,"function");
 const ask=(action,sender=client,target=window,extra={})=>new Promise(resolve=>{
   const m={protocol:3,windowId:target,requestId:"test",action,...extra};
   const accepted=listener(m,{id:sender},v=>resolve(JSON.parse(JSON.stringify(v))));
   if(!accepted)resolve(null);
 });
 return ask;
}
test("bridge reads wrapped list and active workspace without exposing tabs",async()=>{
 const ask=await fixture(),r=await ask("SNAPSHOT");
 assert.equal(r.ok,true);assert.deepEqual(r.data,{workspaces:[{id:1,name:"Test",emoji:"🎲"}],windows:[{id:7,kind:"named",workspaceId:1}],canSelect:false});
});
test("bridge rejects unrelated sender, wrong window and arbitrary action",async()=>{
 const ask=await fixture();assert.equal(await ask("SNAPSHOT","other"),null);assert.equal(await ask("SNAPSHOT",client,9),null);assert.equal(await ask("EVAL"),null);
});
test("bridge does not classify absent membership as base without evidence",async()=>{
 const ask=await fixture({metadata:{}});const r=await ask("SNAPSHOT");assert.deepEqual(r.data.windows,[{id:7,kind:"unknown"}]);
});
test("empty catalog is valid; malformed catalog is rejected",async()=>{
 const a=await fixture({list:[],metadata:{}});assert.deepEqual((await a("SNAPSHOT")).data.windows,[{id:7,kind:"base"}]);
 const b=await fixture({list:[{id:1,name:"A"},{id:1,name:"B"}]});assert.equal((await b("SNAPSHOT")).code,"CATALOG_INVALID");
});
test("bridge refuses selection when target is active",async()=>{
 const ask=await fixture();const r=await ask("SELECT",client,7,{workspaceId:1});assert.equal(r.ok,false);assert.equal(r.code,"STATE_CHANGED");
});

test("legacy protocol is rejected before mutation",async()=>{const ask=await fixture();assert.equal(await ask("SELECT",client,7,{workspaceId:1,protocol:2}),null);});
