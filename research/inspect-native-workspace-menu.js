// ONW read-only diagnostic. Run only in Vivaldi window.html DevTools.
// Open the native Workspace menu MANUALLY within 8 seconds; do not select a row.
// No click, dispatch, focus, preference write, installation or network.
// Report contains only structure, counts and catalog ordinals, no names/IDs/URLs.
(async () => {
  "use strict";
  if (location.protocol !== "chrome-extension:" || location.hostname !== "mpognobbkildjkofajifpdfhcoklimli" || !location.pathname.endsWith("/window.html")) {
    console.log("ONW-MENU", JSON.stringify({error:"WRONG_CONTEXT"})); return;
  }
  const visible = el => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== "hidden";
  const buttons = () => [...document.querySelectorAll(".button-toolbar.workspace-popup > button")].filter(visible);
  const rows = () => [...document.querySelectorAll(".workspace-item-wrapper")].filter(visible);
  const react = el => { const key=Object.keys(el).find(k=>k.startsWith("__reactProps$"));return ["onPointerDown","onPointerUp","onClick","onMouseDown","onMouseUp","onKeyDown"].filter(k=>typeof el[key]?.[k]==="function"); };
  const describe = el => {
    const rect=el.getBoundingClientRect(), mid=document.elementFromPoint(rect.left+rect.width/2,rect.top+rect.height/2);
    return {tag:el.tagName,role:["menuitem","option","button","menu","listbox"].includes(el.getAttribute("role"))?el.getAttribute("role"):null,
      handlers:react(el),disabled:el.matches(":disabled,[aria-disabled=true]"),centerHitsSelfOrChild:!!mid&&(mid===el||el.contains(mid)),
      childControls:[...el.querySelectorAll("button,[role=menuitem],[role=option],[tabindex]")].slice(0,12).map(child=>({tag:child.tagName,handlers:react(child)}))};
  };
  const read = (obj,key,...args) => new Promise(resolve=>{
    if(typeof obj?.[key]!=="function"){resolve(null);return;}
    let done=false;const finish=v=>{if(done)return;done=true;clearTimeout(timer);resolve(v);};const timer=setTimeout(()=>finish(null),2500);
    try{const ret=obj[key](...args,finish);if(ret&&typeof ret.then==="function")ret.then(x=>{if(x!==undefined)finish(x);},()=>finish(null));else if(ret!==undefined)finish(ret);}catch(_){finish(null);}
  });
  const api=globalThis.vivaldi;
  const raw=await read(api?.prefs,"get","vivaldi.workspaces.list");
  const catalog=Array.isArray(raw)?raw:Array.isArray(raw?.value)?raw.value:[];
  const names=catalog.map(x=>typeof x?.name==="string"?x.name.trim():"");
  const report={probe:"ONW-MENU-v1",catalogCount:catalog.length,buttonsBefore:buttons().map(describe),rowsBefore:rows().length};
  try {
    const windows=(await chrome.windows.getAll({windowTypes:["normal"]})).filter(w=>w.type==="normal"&&!w.incognito);
    const active=await chrome.tabs.query({active:true,windowType:"normal"});
    report.windowStates=await Promise.all(windows.map(async w=>{
      const tabs=active.filter(t=>t.windowId===w.id);if(tabs.length!==1)return {activeCount:tabs.length,state:"unknown"};
      const extra=await read(api?.tabsPrivate,"get",tabs[0].id);
      let data;try{const v=extra?.vivExtData??tabs[0].vivExtData;data=typeof v==="string"?JSON.parse(v):v;}catch(_){}
      if(!data||typeof data!=="object"||Array.isArray(data))return {activeCount:1,state:"unknown"};
      if(data.workspaceId==null)return {activeCount:1,state:"candidate-base"};
      const index=catalog.findIndex(x=>x.id===data.workspaceId);
      return {activeCount:1,state:index<0?"unknown":"named",catalogOrdinal:index<0?null:index+1};
    }));
  } catch (_) {report.windowStates="unavailable";}
  console.log("ONW: abre manualmente el selector nativo de Workspaces ahora y déjalo abierto durante 8 segundos.");
  await new Promise(resolve=>setTimeout(resolve,8000));
  report.buttonsAfter=buttons().map(describe);
  report.rowsAfter=rows().slice(0,100).map(el=>{
    const title=el.getAttribute("title")?.trim(),text=el.textContent?.trim();
    return {...describe(el),exactMatches:names.flatMap((n,i)=>n&&(n===title||n===text)?[i+1]:[]),
      descendantsExactMatches:names.flatMap((n,i)=>n&&[...el.querySelectorAll("span,[title]")].some(d=>d.textContent?.trim()===n||d.getAttribute("title")?.trim()===n)?[i+1]:[])};
  });
  console.log("ONW-MENU",JSON.stringify(report,null,2));
})();
