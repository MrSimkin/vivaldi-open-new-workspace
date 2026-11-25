import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const code=readFileSync(new URL("../bridge/onw-workspace-bridge.js",import.meta.url),"utf8");
const list=[{id:1,name:"Work",emoji:"💼"},{id:2,name:"Games"},{id:3,name:"Other"}];
const rowSelector=".WorkspacePopup > .WorkspacePopup-Items > .WorkspacePopup-DragArea > button.workspace-item-wrapper";
const buttonSelector=".button-toolbar.workspace-popup.workspace-anchor.tabbar-workspace-button > button";
async function fixture({labels=["Work","Games","Other"],catalog=list,order=[0,1,2],obscure=false,focused=true,changeRows=false,changeNames=false,missingName=false,multipleNames=false,missingCount=false}={}){
 let listener,open=false,active=null,clicks=[],events=[],snapshotReads=0,rows;
 const base={isConnected:true,disabled:false,getClientRects:()=>[{}],getBoundingClientRect:()=>({left:40,top:20,width:100,height:20}),getAttribute:()=>null,querySelectorAll:()=>[],matches:()=>false,contains:()=>false};
 const button={...base, __reactProps$test:{onPointerDown(){}},dispatchEvent(e){events.push([e.type,e.clientX,e.clientY]);if(e.type==="pointerdown")open=true;}};
 function makeRows(){return order.map((index,i)=>{
   const label=labels[index],count=index===2?"Active in another window":"12 tabs";
   const name={textContent:label},badge={textContent:count};
   const title={querySelectorAll(s){
     if(s===":scope > p:not(.tab-count)")return missingName&&index===0?[]:multipleNames&&index===0?[name,name]:[changeNames&&snapshotReads>=2&&index===0?{textContent:"renamed"}:name];
     if(s===":scope > p.tab-count")return missingCount&&index===0?[]:[badge];
     return [];
   }};
   return {...base,textContent:"💼"+label+count,getAttribute:k=>k==="title"?label+" \r\n2 hibernated tabs":null,
     getBoundingClientRect:()=>({left:40,top:20+30*i,width:100,height:20}),
     querySelectorAll:s=>s===":scope > div.title"?[title]:[],
     __reactProps$test:{onClick(){}},matches:s=>s===rowSelector,
     dispatchEvent(e){clicks.push([index,e.type,e.clientX,e.clientY]);active=catalog[index].id;}};
 });}
 rows=makeRows();
 const root={...base,contains:e=>rows.includes(e)};
 const document={querySelectorAll(s){if(s===buttonSelector)return[button];if(s===".WorkspacePopup")return open?[root]:[];if(s===rowSelector){if(open&&changeRows&&snapshotReads>=2)rows=makeRows();return open?rows:[];}return[];},elementFromPoint(x,y){return !open?button:obscure?{}:rows[(y-30)/30];}};
 const chrome={runtime:{onMessageExternal:{addListener:x=>listener=x,removeListener(){}}},windows:{get:async()=>({id:7,type:"normal",focused,incognito:false}),getAll:async()=>{snapshotReads++;return[{id:7,type:"normal"},{id:9,type:"normal"}];}},tabs:{query:async o=>o.windowId===7?[{id:8,windowId:7}]:[{id:8,windowId:7},{id:10,windowId:9}]}};
 const vivaldi={windowPrivate:{getCurrentId:cb=>cb(7)},prefs:{get:(k,cb)=>cb({value:catalog})},tabsPrivate:{get:(id,cb)=>cb({vivExtData:JSON.stringify(id===10?{workspaceId:3}:active===null?{}:{workspaceId:active})})}};
 class Event{constructor(type,options){this.type=type;Object.assign(this,options);}}
 const ctx={location:{protocol:"chrome-extension:",hostname:"mpognobbkildjkofajifpdfhcoklimli",pathname:"/window.html"},chrome,vivaldi,document,getComputedStyle:()=>({visibility:"visible"}),PointerEvent:Event,MouseEvent:Event,setTimeout:(fn,ms)=>setTimeout(fn,ms===75||ms===200?0:ms),clearTimeout};
 vm.runInNewContext(code,ctx);await new Promise(r=>setImmediate(r));
 const ask=()=>new Promise(resolve=>listener({protocol:3,windowId:7,requestId:"test",action:"SELECT",workspaceId:1},{id:"poebajclpmcacjgkdbkjfjbngmagakbe"},resolve));
 return {ask,clicks,events};
}
test("native menu reads exact name separate from icon, tooltip and localized count",async()=>{
 const x=await fixture(),r=await x.ask();assert.equal(r.ok,true);assert.deepEqual(x.events,[["pointerdown",90,30],["pointerup",90,30]]);assert.deepEqual(x.clicks,[[0,"click",90,30]]);
});
test("reordered native rows do not change the target identity",async()=>{
 const x=await fixture({order:[2,1,0]}),r=await x.ask();
 assert.equal(r.ok,true);assert.deepEqual(x.clicks,[[0,"click",90,90]]);
});
test("no match, duplicate mapping and ambiguous names fail closed",async()=>{
 for(const [labels,expected] of [[["Work","Games","unmatched"],"NO_MATCH"],[["Work","Work","Other"],"DUPLICATE"]]){
  const x=await fixture({labels}),r=await x.ask();assert.equal(r.code,"NATIVE_ROW_IDENTITY_UNVERIFIED_"+expected);assert.deepEqual(x.clicks,[]);
 }
 const x=await fixture({labels:["Work","Games","Games"],catalog:[{id:1,name:"Work"},{id:2,name:"Games"},{id:3,name:"Games"}]});
 assert.equal((await x.ask()).code,"NATIVE_ROW_IDENTITY_UNVERIFIED_AMBIGUOUS");assert.deepEqual(x.clicks,[]);
});
test("numeric suffix and emoji in actual names are literal, not decorations",async()=>{
 const x=await fixture({labels:["Work","Work2","Other"],catalog:[{id:1,name:"Work"},{id:2,name:"Work2"},{id:3,name:"Other"}]});
 assert.equal((await x.ask()).ok,true);assert.deepEqual(x.clicks,[[0,"click",90,30]]);
 const y=await fixture({labels:["💼 Work","Games","Other"],catalog:[{id:1,name:"💼 Work"},{id:2,name:"Games"},{id:3,name:"Other"}]});
 assert.equal((await y.ask()).ok,true);
 const z=await fixture({labels:["Work12","Games","Other"]});
 assert.equal((await z.ask()).code,"NATIVE_ROW_IDENTITY_UNVERIFIED_NO_MATCH");assert.deepEqual(z.clicks,[]);
});
test("missing or ambiguous name structure or absent count fails without falling back to tooltip",async()=>{
 for(const options of [{missingName:true},{multipleNames:true},{missingCount:true}]){
  const x=await fixture(options);assert.equal((await x.ask()).code,"NATIVE_ROW_IDENTITY_UNVERIFIED_NO_MATCH");assert.deepEqual(x.clicks,[]);
 }
});
test("same DOM row with changed name fails fresh verification",async()=>{
 const x=await fixture({changeNames:true});assert.equal((await x.ask()).code,"NATIVE_ROW_IDENTITY_UNVERIFIED_REVALIDATION");assert.deepEqual(x.clicks,[]);
});
test("wrong focused window does not even open native menu",async()=>{const x=await fixture({focused:false});assert.equal((await x.ask()).code,"DESTINATION_NOT_FOCUSED");assert.deepEqual(x.events,[]);assert.deepEqual(x.clicks,[]);});
test("obscured or replaced row is never clicked",async()=>{
 const a=await fixture({obscure:true});assert.equal((await a.ask()).code,"NATIVE_CONTROL_OBSCURED");assert.deepEqual(a.clicks,[]);
 const b=await fixture({changeRows:true});assert.equal((await b.ask()).code,"NATIVE_ROW_IDENTITY_UNVERIFIED_ROW_CHANGED");assert.deepEqual(b.clicks,[]);
});
