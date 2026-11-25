// Experimental ONW companion for Vivaldi's window.html UI context only.
// Independent implementation, no DTC code/key/protocol; no preference writes or tab moves.
(() => {
  "use strict";
  const CLIENT = "poebajclpmcacjgkdbkjfjbngmagakbe", PROTOCOL = 2;
  if (location.protocol !== "chrome-extension:" || location.hostname !== "mpognobbkildjkofajifpdfhcoklimli" || !location.pathname.endsWith("/window.html")) return;
  const v = globalThis.vivaldi, c = globalThis.chrome;
  const validId = x => (Number.isSafeInteger(x) && x >= 0) || (typeof x === "string" && x.length > 0 && x.length <= 128);
  const windowId = x => Number.isSafeInteger(x) && x > 0;
  const wait = ms => new Promise(r=>setTimeout(r,ms));
  const read = (obj,method,...args) => new Promise((resolve,reject)=>{
    if (typeof obj?.[method] !== "function") return reject(Error("API_UNAVAILABLE"));
    let done=false;
    const finish=(err,val)=>{if(done)return;done=true;clearTimeout(timer);err?reject(Error(err)):resolve(val);};
    const timer=setTimeout(()=>finish("READ_TIMEOUT"),2500);
    try {
      const ret=obj[method](...args,value=>{if(c.runtime.lastError)finish("READ_FAILED");else finish(null,value);});
      if(ret && typeof ret.then==="function")ret.then(value=>{if(value!==undefined)finish(null,value);},()=>finish("READ_FAILED"));
      else if(ret!==undefined)finish(null,ret);
    } catch (_) {finish("READ_FAILED");}
  });
  function parse(raw) {
    try {const x=typeof raw==="string"?JSON.parse(raw):raw;return x && typeof x==="object" && !Array.isArray(x)?x:null;} catch(_){return null;}
  }
  async function catalog() {
    const raw=await read(v?.prefs,"get","vivaldi.workspaces.list");
    const list=Array.isArray(raw)?raw:Array.isArray(raw?.value)?raw.value:null;
    if (!list || list.length>1000) throw Error("CATALOG_UNAVAILABLE");
    const seen=new Set();
    return list.map(x=>{
      if(!validId(x?.id)||seen.has(x.id)||typeof x.name!=="string"||!x.name.trim()||x.name.length>512)throw Error("CATALOG_INVALID");
      seen.add(x.id);
      // Only plain emoji text; never emit SVG or raw HTML.
      const emoji=typeof x.emoji==="string" && x.emoji.length<=32?x.emoji:"";
      return {id:x.id,name:x.name,emoji};
    });
  }
  const visible = el => el && el.getClientRects().length>0 && getComputedStyle(el).visibility!=="hidden";
  function menuButton() {
    const found=[...document.querySelectorAll(".button-toolbar.workspace-popup > button")].filter(e=>visible(e)&&!e.disabled);
    return found.length===1?found[0]:null;
  }
  function entries() {return [...document.querySelectorAll(".workspace-item-wrapper")].filter(visible);}
  async function snapshot() {
    const workspaces=await catalog(), ids=new Set(workspaces.map(w=>w.id));
    const windows=(await c.windows.getAll({windowTypes:["normal"]})).filter(w=>w.type==="normal"&&!w.incognito);
    const tabs=await c.tabs.query({active:true,windowType:"normal"});
    let evidence=false;
    const states=await Promise.all(windows.map(async w=>{
      const active=tabs.filter(t=>t.windowId===w.id);
      if(!windowId(w.id)||active.length!==1||!Number.isInteger(active[0].id))return {id:w.id,kind:"unknown"};
      try {
        const extra=await read(v?.tabsPrivate,"get",active[0].id);
        const data=parse(extra?.vivExtData??active[0].vivExtData);
        if(!data)return {id:w.id,kind:"unknown"};
        if(data.workspaceId===undefined||data.workspaceId===null)return {id:w.id,kind:"candidate-base"};
        if(!ids.has(data.workspaceId))return {id:w.id,kind:"unknown"};
        evidence=true;return {id:w.id,kind:"named",workspaceId:data.workspaceId};
      }catch(_){return {id:w.id,kind:"unknown"};}
    }));
    // DTC distinguishes absent workspaceId from broken metadata. If none of
    // the active tabs provide positive evidence, inspect membership only,
    // never URL/title; cap the scan and remain unknown if evidence is absent.
    if(!evidence && ids.size && states.some(w=>w.kind==="candidate-base")){
      const all=(await c.tabs.query({windowType:"normal"})).filter(t=>windows.some(w=>w.id===t.windowId)).slice(0,150);
      for(let i=0;i<all.length&&!evidence;i+=12){
        const group=await Promise.all(all.slice(i,i+12).map(async t=>{
          try {const x=await read(v?.tabsPrivate,"get",t.id);return ids.has(parse(x?.vivExtData??t.vivExtData)?.workspaceId);}catch(_){return false;}
        }));
        evidence=group.some(Boolean);
      }
    }
    return {workspaces,windows:states.map(w=>w.kind==="candidate-base"?{id:w.id,kind:evidence||!ids.size?"base":"unknown"}:w),canSelect:!!menuButton()};
  }
  function activate(el) {
    // Use the native UI event path, not internal preference writes.
    // If a React pointer handler is present, dispatch one pointer sequence;
    // otherwise use one DOM click. No retry/fallback after dispatch.
    const propsKey=Object.keys(el).find(k=>k.startsWith("__reactProps$"));
    if(propsKey && typeof el[propsKey]?.onPointerDown==="function"){
      el.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true,cancelable:true,pointerType:"mouse",button:0,buttons:1}));
      el.dispatchEvent(new PointerEvent("pointerup",{bubbles:true,cancelable:true,pointerType:"mouse",button:0,buttons:0}));
    }else el.click();
  }
  async function select(id, own) {
    const s=await snapshot(), target=s.workspaces.find(w=>w.id===id);
    if(!target)throw Error("WORKSPACE_MISSING");
    if(s.windows.some(w=>w.kind==="unknown")||s.windows.some(w=>w.kind==="named"&&w.workspaceId===id))throw Error("STATE_CHANGED");
    if(s.windows.find(w=>w.id===own)?.kind!=="base")throw Error("DESTINATION_NOT_BASE");
    if(s.workspaces.filter(w=>w.name.trim()===target.name.trim()).length!==1)throw Error("AMBIGUOUS_NAME");
    const button=menuButton();
    if(!button||entries().length)throw Error("NATIVE_MENU_UNAVAILABLE");
    activate(button);
    let row;
    for(let i=0;i<25;i++){
      const matches=entries().filter(e=>{
        const title=e.getAttribute("title");
        return (title?.trim()===target.name.trim() || e.textContent?.trim()===target.name.trim()) &&
          !e.matches("[aria-disabled=true],:disabled") && typeof e.click==="function";
      });
      if(matches.length>1)throw Error("AMBIGUOUS_MENU_ITEM");
      if(matches.length===1){row=matches[0];break;}
      await wait(60);
    }
    if(!row)throw Error("NATIVE_ITEM_UNAVAILABLE");
    // Revalidate identity and destination immediately before the single action.
    const fresh=await snapshot();
    if(!row.isConnected||!visible(row)||fresh.windows.some(w=>w.kind==="unknown"||w.kind==="named"&&w.workspaceId===id)||
      fresh.windows.find(w=>w.id===own)?.kind!=="base"||
      fresh.workspaces.filter(w=>w.name.trim()===target.name.trim()).length!==1||
      !fresh.workspaces.some(w=>w.id===id&&w.name===target.name))throw Error("STATE_CHANGED");
    activate(row);
    for(let i=0;i<15;i++){
      await wait(150);
      const after=await snapshot();
      if(after.windows.some(w=>w.id===own&&w.kind==="named"&&w.workspaceId===id))return {selected:true};
    }
    throw Error("SELECTION_UNVERIFIED");
  }
  // Route to a specific UI window. Never use last-focused as identity.
  (async()=>{
    let own;
    try {own=await read(v?.windowPrivate,"getCurrentId");} catch(_){return;}
    if(!windowId(own))return;
    let selecting=false;
    const previous=globalThis.__onwBridgeListener;
    if(previous)c.runtime.onMessageExternal.removeListener(previous);
    const listener=(m,sender,send)=>{
      if(sender?.id!==CLIENT||m?.protocol!==PROTOCOL||m.windowId!==own||
        typeof m.requestId!=="string"||m.requestId.length>100||!["PING","SNAPSHOT","SELECT"].includes(m.action))return false;
      if(m.action==="SELECT"&&!validId(m.workspaceId))return false;
      (async()=>{
        let response;
        try {
          if(m.action==="SELECT"){
            if(selecting)throw Error("BUSY");
            selecting=true;try{response=await select(m.workspaceId,own);}finally{selecting=false;}
          }else if(m.action==="SNAPSHOT")response=await snapshot();
          else response={ready:typeof v?.prefs?.get==="function"&&typeof v?.tabsPrivate?.get==="function"&&!!menuButton()};
          send({ok:true,protocol:PROTOCOL,requestId:m.requestId,windowId:own,data:response});
        }catch(e){send({ok:false,protocol:PROTOCOL,requestId:m.requestId,windowId:own,code:e.message||"BRIDGE_ERROR"});}
      })();
      return true;
    };
    globalThis.__onwBridgeListener=listener;
    c.runtime.onMessageExternal.addListener(listener);
  })();
})();
