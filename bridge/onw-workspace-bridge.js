// Experimental ONW companion for Vivaldi's window.html UI context only.
// Independent implementation, no DTC code/key/protocol; no preference writes or tab moves.
(() => {
  "use strict";
  const CLIENT = "poebajclpmcacjgkdbkjfjbngmagakbe", PROTOCOL = 3;
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
  const visible = el => el?.isConnected && el.getClientRects().length>0 && getComputedStyle(el).visibility==="visible";
  const enabled = el => !el.disabled && !el.matches("[aria-disabled=true],:disabled");
  const buttonSelector = ".button-toolbar.workspace-popup.workspace-anchor.tabbar-workspace-button > button";
  const rowSelector = ".WorkspacePopup > .WorkspacePopup-Items > .WorkspacePopup-DragArea > button.workspace-item-wrapper";
  const reactProps = el => el[Object.keys(el).find(k=>k.startsWith("__reactProps$"))] || {};
  const popup = () => [...document.querySelectorAll(".WorkspacePopup")].filter(visible);
  function menuButton() {
    const found=[...document.querySelectorAll(buttonSelector)].filter(e=>visible(e)&&enabled(e)&&typeof reactProps(e).onPointerDown==="function");
    return found.length===1?found[0]:null;
  }
  function entries() {return [...document.querySelectorAll(rowSelector)].filter(visible);}
  // Catalog-derived labels only. Never choose by substring or row index.
  // Require a bijection across all visible rows before any row activation.
  function rowCandidates(row,workspaces) {
    const values=[row.getAttribute("title"),row.getAttribute("aria-label"),row.textContent,
      ...[...row.querySelectorAll("span,[title],[aria-label]")].slice(0,80).flatMap(el=>[el.getAttribute("title"),el.getAttribute("aria-label"),el.textContent])]
      .filter(x=>typeof x==="string"&&x.length<=600).map(x=>x.trim());
    const labels = w => {
      const name=w.name.trim(), emoji=w.emoji?.trim();
      return [...new Set([name,...(emoji?[emoji+" "+name,emoji+name]:[])])];
    };
    const matches = (value,label) => {
      if(value===label)return true;
      if(!value.startsWith(label))return false;
      // Bounded numeric badge hypothesis; reject overlapping names.
      return /^(?:\s*\d{1,6}|\s*\(\d{1,6}\)|\s*\[\d{1,6}\])$/.test(value.slice(label.length));
    };
    return workspaces.filter(w=>labels(w).some(label=>values.some(value=>matches(value,label))));
  }
  function resolveMenu(workspaces) {
    const roots=popup(), rows=entries();
    if(roots.length!==1||rows.length!==workspaces.length||!rows.every(row=>roots[0].contains(row)))return {code:"NATIVE_MENU_STRUCTURE"};
    const mapping=new Map();
    for(const row of rows){
      const candidates=rowCandidates(row,workspaces);
      if(candidates.length!==1||mapping.has(candidates[0].id))return {code:"NATIVE_ROW_IDENTITY_UNVERIFIED"};
      mapping.set(candidates[0].id,row);
    }
    return {mapping};
  }
  function center(el) {
    if(!visible(el)||!enabled(el))throw Error("NATIVE_CONTROL_UNAVAILABLE");
    const rect=el.getBoundingClientRect(),x=rect.left+rect.width/2,y=rect.top+rect.height/2;
    const hit=document.elementFromPoint(x,y);
    if(!rect.width||!rect.height||!hit||!(hit===el||el.contains(hit)))throw Error("NATIVE_CONTROL_OBSCURED");
    return {clientX:x,clientY:y,bubbles:true,cancelable:true,view:globalThis.window,button:0};
  }
  function openMenu(button) {
    if(button!==menuButton()||popup().length)throw Error("NATIVE_MENU_UNAVAILABLE");
    const point=center(button);
    const opts={...point,pointerId:1,isPrimary:true,pointerType:"mouse"};
    button.dispatchEvent(new PointerEvent("pointerdown",{...opts,buttons:1}));
    if(button.isConnected)button.dispatchEvent(new PointerEvent("pointerup",{...opts,buttons:0}));
  }
  function selectRow(row) {
    if(!row.matches(rowSelector)||typeof reactProps(row).onClick!=="function")throw Error("NATIVE_ROW_HANDLER_UNAVAILABLE");
    const point=center(row);
    row.dispatchEvent(new MouseEvent("click",{...point,buttons:0,detail:1}));
  }
  async function requireFocusedDestination(own) {
    const w=await c.windows.get(own);
    if(w?.id!==own||w.type!=="normal"||w.incognito||w.focused!==true)throw Error("DESTINATION_NOT_FOCUSED");
  }
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
      const deadline=Date.now()+2500;
      for(let i=0;i<all.length&&!evidence&&Date.now()<deadline;i+=12){
        const group=await Promise.all(all.slice(i,i+12).map(async t=>{
          try {const x=await read(v?.tabsPrivate,"get",t.id);return ids.has(parse(x?.vivExtData??t.vivExtData)?.workspaceId);}catch(_){return false;}
        }));
        evidence=group.some(Boolean);
      }
    }
    return {workspaces,windows:states.map(w=>w.kind==="candidate-base"?{id:w.id,kind:evidence||!ids.size?"base":"unknown"}:w),canSelect:!!menuButton()};
  }
  async function select(id, own) {
    const actionDeadline=Date.now()+12000;
    const s=await snapshot(), target=s.workspaces.find(w=>w.id===id);
    if(!target)throw Error("WORKSPACE_MISSING");
    if(s.windows.some(w=>w.kind==="unknown")||s.windows.some(w=>w.kind==="named"&&w.workspaceId===id))throw Error("STATE_CHANGED");
    if(s.windows.find(w=>w.id===own)?.kind!=="base")throw Error("DESTINATION_NOT_BASE");
    if(s.workspaces.filter(w=>w.name.trim()===target.name.trim()).length!==1)throw Error("AMBIGUOUS_NAME");
    const button=menuButton();
    if(!button||popup().length||entries().length)throw Error("NATIVE_MENU_UNAVAILABLE");
    await requireFocusedDestination(own);
    if(Date.now()>actionDeadline)throw Error("SELECTION_DEADLINE");
    openMenu(button);
    let resolved={code:"NATIVE_MENU_STRUCTURE"};
    for(let i=0;i<40&&Date.now()<actionDeadline;i++){
      resolved=resolveMenu(s.workspaces);
      if(resolved.mapping)break;
      await wait(75);
    }
    if(!resolved.mapping)throw Error(resolved.code);
    const row=resolved.mapping.get(id);
    if(!row)throw Error("NATIVE_ROW_IDENTITY_UNVERIFIED");
    const fresh=await snapshot();
    await requireFocusedDestination(own);
    if(Date.now()>actionDeadline)throw Error("SELECTION_DEADLINE");
    if(fresh.windows.some(w=>w.kind==="unknown"||w.kind==="named"&&w.workspaceId===id)||
      fresh.windows.find(w=>w.id===own)?.kind!=="base"||
      fresh.workspaces.filter(w=>w.name.trim()===target.name.trim()).length!==1||
      !fresh.workspaces.some(w=>w.id===id&&w.name===target.name))throw Error("STATE_CHANGED");
    const again=resolveMenu(fresh.workspaces);
    if(!again.mapping||again.mapping.get(id)!==row)throw Error("NATIVE_ROW_IDENTITY_UNVERIFIED");
    selectRow(row);
    const deadline=Date.now()+5000;
    while(Date.now()<deadline){
      await wait(200);
      const active=await c.tabs.query({active:true,windowId:own});
      if(active.length!==1)continue;
      try {const extra=await read(v?.tabsPrivate,"get",active[0].id);if(parse(extra?.vivExtData??active[0].vivExtData)?.workspaceId===id)return {selected:true};}catch(_){}
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
