import test from 'node:test';
import assert from 'node:assert/strict';

// Exercise the actual popup module, not Vivaldi, with controlled DOM and API doubles.
class Element {
  constructor(){this.textContent='';this.value='';this.hidden=false;this.open=false;this.disabled=false;this.children=[];this.options=[];this.listeners={};}
  addEventListener(name,fn){this.listeners[name]=fn;}
  replaceChildren(){this.children=[];}
  append(...children){this.children.push(...children);}
}
const tick=()=>new Promise(resolve=>setImmediate(resolve));
async function fixture(saved, result, tag) {
  const elements=new Map();
  const get=id=>{if(!elements.has(id))elements.set(id,new Element());return elements.get(id);};
  get('theme').options=Array.from({length:4},()=>new Element());
  const root={lang:'',dataset:{}};
  const store=new Map(Object.entries(saved));
  globalThis.document={documentElement:root,getElementById:get,createElement:()=>new Element()};
  globalThis.localStorage={getItem:key=>store.get(key)??null,setItem:(key,value)=>store.set(key,value)};
  const calls=[];
  globalThis.chrome={windows:{getCurrent:async()=>({id:7,type:'normal',incognito:false})},runtime:{sendMessage:async m=>{
    calls.push(m);
    if(m.action==='RESULT')return {ok:true,busy:false,result};
    if(m.action==='LIST')return {ok:true,data:{workspaces:[{id:1,name:'Work'}],windows:[{id:7,kind:'base'}],canSelect:true}};
    throw Error('unexpected request');
  }}};
  await import('../extension/popup.js?fixture='+tag);
  await tick();
  return {get,root,store,calls};
}
test('popup defaults to ES, keeps visible extra-window warning and separates code',async()=>{
  const x=await fixture({}, {state:'error',code:'NATIVE_ROW_IDENTITY_UNVERIFIED',extraWindow:9},'es');
  assert.equal(x.root.lang,'es');assert.equal(x.root.dataset.theme,'dark-gray');
  assert.match(x.get('status').textContent,/Ventana adicional abierta/);
  assert.match(x.get('status').textContent,/No reintentes/);
  assert.doesNotMatch(x.get('status').textContent,/NATIVE_ROW/);
  assert.equal(x.get('errorDetails').hidden,false);
  assert.equal(x.get('errorDetails').open,false);
  assert.equal(x.get('errorCode').textContent,'NATIVE_ROW_IDENTITY_UNVERIFIED');
  assert.equal(x.get('items').children.length,1);
  assert.deepEqual(x.calls.map(c=>c.action),['RESULT','LIST']);
  x.get('theme').listeners.change({target:{value:'dark-blue'}});
  assert.equal(x.root.dataset.theme,'dark-blue');assert.equal(x.store.get('onw-theme'),'dark-blue');
});
test('popup preserves explicit English and dark blue; success hides error details',async()=>{
  const x=await fixture({'onw-language':'en','onw-theme':'dark-blue'}, {state:'done',kind:'opened'},'en');
  assert.equal(x.root.lang,'en');assert.equal(x.root.dataset.theme,'dark-blue');
  assert.equal(x.get('theme').options[3].textContent,'Dark blue');
  assert.equal(x.get('status').textContent,'Operation confirmed.');
  assert.equal(x.get('errorDetails').hidden,true);
  assert.equal(x.get('errorCode').textContent,'');
  assert.equal(x.get('items').children.length,1);
});
