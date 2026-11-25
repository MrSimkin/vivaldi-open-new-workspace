import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const code=readFileSync(new URL("../bridge/onw-workspace-bridge.js",import.meta.url),"utf8");
const list=[{id:1,name:"Work",emoji:"💼"},{id:2,name:"Games"},{id:3,name:"Other"}];
const rowSelector=".WorkspacePopup > .WorkspacePopup-Items > .WorkspacePopup-DragArea > button.workspace-item-wrapper";
const buttonSelector=".button-toolbar.workspace-popup.workspace-anchor.tabbar-workspace-button > button";
async function fixture({labels=["💼 Work12","Games (7)","Other"],catalog=list,obscure=false,focused=true,changeRows=false}={}){
 let listener,open=false,active=null,clicks=[],events=[],snapshotReads=0,rows;
 const base={isConnected:true,disabled:false,getClientRects:()=>[{}],getBoundingClientRect:()=>({left:40,top:20,width:100,height:20}),getAttribute:()=>null,querySelectorAll:()=>[],matches:()=>false,contains:()=>false};
 const button={...base, __reactProps$test:{onPointerDown(){}},dispatchEvent(e){events.push([e.type,e.clientX,e.clientY]);if(e.type==="pointerdown")open=true;}};
 function makeRows(){return labels.map((label,i)=>({...base,textContent:label,__reactProps$test:{onClick(){}},matches:s=>s===rowSelector,dispatchEvent(e){clicks.push([i,e.type,e.clientX,e.clientY]);active=catalog[i].id;}}));}
 rows=makeRows();
 const root={...base,contains:e=>rows.includes(e)};
 const document={querySelectorAll(s){if(s===buttonSelector)return[button];if(s===".WorkspacePopup")return open?[root]:[];if(s===rowSelector){if(open&&changeRows&&snapshotReads>=2)rows=makeRows();return open?rows:[];}return[];},elementFromPoint(){return !open?button:obscure?{}:rows[0];}};
 const chrome={runtime:{onMessageExternal:{addListener:x=>listener=x,removeListener(){}}},windows:{get:async()=>({id:7,type:"normal",focused,incognito:false}),getAll:async()=>{snapshotReads++;return[{id:7,type:"normal"},{id:9,type:"normal"}];}},tabs:{query:async o=>o.windowId===7?[{id:8,windowId:7}]:[{id:8,windowId:7},{id:10,windowId:9}]}};
 const vivaldi={windowPrivate:{getCurrentId:cb=>cb(7)},prefs:{get:(k,cb)=>cb({value:catalog})},tabsPrivate:{get:(id,cb)=>cb({vivExtData:JSON.stringify(id===10?{workspaceId:3}:active===null?{}:{workspaceId:active})})}};
 class Event{constructor(type,options){this.type=type;Object.assign(this,options);}}
 const ctx={location:{protocol:"chrome-extension:",hostname:"mpognobbkildjkofajifpdfhcoklimli",pathname:"/window.html"},chrome,vivaldi,document,getComputedStyle:()=>({visibility:"visible"}),PointerEvent:Event,MouseEvent:Event,setTimeout:(fn,ms)=>setTimeout(fn,ms===75||ms===200?0:ms),clearTimeout};
 vm.runInNewContext(code,ctx);await new Promise(r=>setImmediate(r));
 const ask=()=>new Promise(resolve=>listener({protocol:3,windowId:7,requestId:"test",action:"SELECT",workspaceId:1},{id:"poebajclpmcacjgkdbkjfjbngmagakbe"},resolve));
 return {ask,clicks,events};
}
test("native menu maps all decorated names and clicks only intended row at center",async()=>{
 const x=await fixture(),r=await x.ask();assert.equal(r.ok,true);assert.deepEqual(x.events,[["pointerdown",90,30],["pointerup",90,30]]);assert.deepEqual(x.clicks,[[0,"click",90,30]]);
});
test("ambiguous or missing identity never clicks a row or chooses by ordinal",async()=>{
 for(const labels of [["Work","Games","unmatched"],["Work","Work","Other"]]){
  const x=await fixture({labels}),r=await x.ask();assert.equal(r.code,"NATIVE_ROW_IDENTITY_UNVERIFIED");assert.deepEqual(x.clicks,[]);
 }
 const x=await fixture({labels:["Work2","Work2","Other"],catalog:[{id:1,name:"Work"},{id:2,name:"Work2"},{id:3,name:"Other"}]});assert.equal((await x.ask()).code,"NATIVE_ROW_IDENTITY_UNVERIFIED");assert.deepEqual(x.clicks,[]);
});
test("wrong focused window does not even open native menu",async()=>{const x=await fixture({focused:false});assert.equal((await x.ask()).code,"DESTINATION_NOT_FOCUSED");assert.deepEqual(x.events,[]);assert.deepEqual(x.clicks,[]);});
test("obscured or replaced row is never clicked",async()=>{
 const a=await fixture({obscure:true});assert.equal((await a.ask()).code,"NATIVE_CONTROL_OBSCURED");assert.deepEqual(a.clicks,[]);
 const b=await fixture({changeRows:true});assert.equal((await b.ask()).code,"NATIVE_ROW_IDENTITY_UNVERIFIED");assert.deepEqual(b.clicks,[]);
});
