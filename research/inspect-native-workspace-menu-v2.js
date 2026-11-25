// ONW-MENU-v2: read-only bounded observation in Vivaldi window.html DevTools.
// Open the native Workspace menu manually in the INSPECTED window after the aviso.
// No synthetic events, click, focus, preference writes, network or tab changes.
// Temporary passive listener observes only interaction with the Workspace button;
// removed in finally. No names, raw text, IDs, URLs or titles in output.
(async () => {
  "use strict";
  const prefix = "ONW-MENU-V2";
  if (location.protocol !== "chrome-extension:" ||
      location.hostname !== "mpognobbkildjkofajifpdfhcoklimli" ||
      !location.pathname.endsWith("/window.html")) {
    console.log(prefix, JSON.stringify({error:"WRONG_CONTEXT"})); return;
  }
  const buttonSelector = ".button-toolbar.workspace-popup > button";
  const rowSelector = ".workspace-item-wrapper";
  const controls = 'button,[role="menuitem"],[role="option"],[role="menu"],[role="listbox"],[tabindex],[class*="workspace" i],[class*="popup" i],[class*="menu" i]';
  const wait = ms => new Promise(resolve => setTimeout(resolve,ms));
  const read = (obj,key,...args) => new Promise(resolve => {
    if (typeof obj?.[key] !== "function") { resolve(null); return; }
    let done = false;
    const finish = value => { if(done) return; done=true; clearTimeout(timer); resolve(value); };
    const timer=setTimeout(()=>finish(null),2500);
    try {
      const value=obj[key](...args,finish);
      if(value && typeof value.then==="function") value.then(x=>{if(x!==undefined)finish(x);},()=>finish(null));
      else if(value!==undefined)finish(value);
    } catch (_) { finish(null); }
  });
  const raw=await read(globalThis.vivaldi?.prefs,"get","vivaldi.workspaces.list");
  const list=Array.isArray(raw)?raw:Array.isArray(raw?.value)?raw.value:[];
  const names=list.map(x=>typeof x?.name==="string"?x.name.trim():"");
  const own=await read(globalThis.vivaldi?.windowPrivate,"getCurrentId");
  const ordinal = value => names.flatMap((n,i)=>n && n===value?.trim()?[i+1]:[]);
  const handlers = el => {
    const key=Object.keys(el).find(k=>k.startsWith("__reactProps$"));
    return ["onPointerDown","onPointerUp","onClick","onMouseDown","onMouseUp","onKeyDown"].filter(k=>typeof el[key]?.[k]==="function");
  };
  const visible = el => el.isConnected && el.getClientRects().length>0 &&
    getComputedStyle(el).visibility==="visible" && !!(el.offsetWidth||el.offsetHeight||el.getBoundingClientRect().width);
  // Only UI-structural class tokens, never arbitrary class strings or attribute values.
  const classes = el => [...el.classList].filter(c=>c.length<=60 &&
    /^(?:[a-zA-Z0-9_-]+)$/.test(c) && /workspace|popup|menu|listbox|dropdown|toolbar|button|panel|reading/i.test(c) &&
    !names.some(n=>n && c.toLowerCase().includes(n.toLowerCase()))).slice(0,8);
  const matches = el => [...new Set([
    ...ordinal(el.getAttribute("title")), ...ordinal(el.getAttribute("aria-label")),
    ...ordinal(el.textContent?.trim().slice(0,513))
  ])];
  const descendants = el => [...new Set([...el.querySelectorAll("span,[title],[aria-label]")].slice(0,80).flatMap(matches))];
  const describe = el => ({
    tag:el.tagName, classes:classes(el),
    role:["menuitem","option","menu","listbox","button"].includes(el.getAttribute("role"))?el.getAttribute("role"):null,
    handlers:handlers(el), exactMatches:matches(el), descendantMatches:descendants(el),
    legacyRow:el.matches(rowSelector),
    parents:[el.parentElement,el.parentElement?.parentElement,el.parentElement?.parentElement?.parentElement].filter(Boolean).map(p=>({tag:p.tagName,classes:classes(p)}))
  });
  const snapshot = () => [...document.querySelectorAll(controls)].filter(visible);
  const before = new Set(snapshot());
  const report = {probe:prefix,catalogCount:list.length,ownWindowResolved:Number.isSafeInteger(own)&&own>0,
    legacyRowsBefore:document.querySelectorAll(rowSelector).length,
    buttonsBefore:[...document.querySelectorAll(buttonSelector)].filter(visible).map(describe),
    trustedWorkspaceButtonPresses:0, samples:0,maxVisibleLegacyRows:0,peakNewControls:0,frames:[]};
  const checkBridge = (path,key) => {
    const listener=globalThis[key];
    let registered=null;
    try { if(typeof listener==="function" && typeof chrome.runtime.onMessageExternal?.hasListener==="function")
      registered=chrome.runtime.onMessageExternal.hasListener(listener); } catch (_) {}
    return {scriptTags:[...document.scripts].filter(s=>{try{return new URL(s.src).pathname.endsWith("/"+path);}catch(_){return false;}}).length,
      listenerDefined:typeof listener==="function",listenerRegistered:registered};
  };
  report.bridges={dtc:checkBridge("dtc-mods/dtc-vivaldi-workspace-bridge.js","__dtcVivaldiWorkspaceBridgeListener"),
    onw:checkBridge("onw-mods/onw-workspace-bridge.js","__onwBridgeListener")};
  try {
    const tabs=Number.isSafeInteger(own)&&own>0?await chrome.tabs.query({active:true,windowId:own}):[];
    const extra=tabs.length===1?await read(globalThis.vivaldi?.tabsPrivate,"get",tabs[0].id):null;
    let data;try {const v=extra?.vivExtData??tabs[0]?.vivExtData;data=typeof v==="string"?JSON.parse(v):v;} catch(_){}
    const i=list.findIndex(x=>x.id===data?.workspaceId);
    report.inspectedActiveWorkspaceOrdinal=i<0?null:i+1;
  } catch(_) {report.inspectedActiveWorkspaceOrdinal=null;}
  const onPress=e=>{if(e.isTrusted && e.target instanceof Element && e.target.closest(buttonSelector))report.trustedWorkspaceButtonPresses++;};
  document.addEventListener("pointerdown",onPress,{capture:true,passive:true});
  const signatures=new Set();
  try {
    console.log("ONW: abre AHORA el selector nativo de Workspaces en la misma ventana inspeccionada. Déjalo abierto unos 15 segundos, sin elegir un Workspace.");
    const end=performance.now()+15000;
    while(performance.now()<end) {
      const current=snapshot(), fresh=current.filter(el=>!before.has(el));
      const legacy=current.filter(el=>el.matches(rowSelector));
      report.samples++;report.maxVisibleLegacyRows=Math.max(report.maxVisibleLegacyRows,legacy.length);
      report.peakNewControls=Math.max(report.peakNewControls,fresh.length);
      const direct=fresh.filter(el=>matches(el).length>0);
      const menuLike=fresh.filter(el=>el.matches('[role="menu"],[role="listbox"],[role="menuitem"],[role="option"]')||classes(el).some(c=>/workspace|popup|menu/i.test(c)));
      const selected=[...new Set([...legacy,...direct,...menuLike,...fresh])].slice(0,24);
      if(selected.length) {
        const entries=selected.map(describe);
        const score=legacy.length*1000+new Set(entries.flatMap(x=>[...x.exactMatches,...x.descendantMatches])).size*100+Math.min(fresh.length,50);
        const signature=JSON.stringify(entries);
        if(!signatures.has(signature)) {
          signatures.add(signature);
          report.frames.push({score,newControls:fresh.length,visibleLegacyRows:legacy.length,entries});
          report.frames.sort((a,b)=>b.score-a.score);report.frames.splice(3);
        }
      }
      await wait(250);
    }
  } finally {document.removeEventListener("pointerdown",onPress,true);}
  console.log(prefix,JSON.stringify(report,null,2));
})();
