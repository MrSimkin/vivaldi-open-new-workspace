import { openExisting, openNormalWindow, focusWindow, requestBridge, validWindow, validWorkspace } from "./workspace-adapter.js";
const api = chrome;
const delay = ms => new Promise(r => setTimeout(r,ms));
let busy = false;
const snapshot = id => requestBridge(id,"SNAPSHOT");
const focus = id => focusWindow(id,api.windows,delay);
const io = {
  snapshot, focus,
  create: () => openNormalWindow(api.windows),
  exists: async id => { try {return (await api.windows.get(id)).id === id;} catch (_) {return false;} },
  ready: async id => {
    for (let i=0;i<8;i++) {
      try { if ((await requestBridge(id,"PING"))?.ready === true) return; } catch (_) {}
      await delay(350);
    }
    throw Error("DESTINATION_BRIDGE_UNAVAILABLE");
  },
  select: (id,workspaceId) => requestBridge(id,"SELECT",{workspaceId})
};
async function save(value) { await api.storage.session.set({onwResult:value}); }
api.runtime.onMessage.addListener((m,sender,send) => {
  if (sender.id !== api.runtime.id || sender.url !== api.runtime.getURL("popup.html") ||
      !m || !["LIST","OPEN","BASE","RESULT"].includes(m.action)) return false;
  if (m.action === "RESULT") {
    api.storage.session.get("onwResult").then(v => send({ok:true,result:v.onwResult || null,busy}),()=>send({ok:false,code:"RESULT_UNAVAILABLE"}));
    return true;
  }
  if (!validWindow(m.source)) { send({ok:false,code:"INVALID_REQUEST"});return false; }
  if (m.action === "LIST") {
    snapshot(m.source).then(data=>send({ok:true,data}),e=>send({ok:false,code:e.message}));
    return true;
  }
  if (m.action === "OPEN" && !validWorkspace(m.id)) {send({ok:false,code:"INVALID_REQUEST"});return false;}
  if (busy) {send({ok:false,code:"BUSY"});return false;}
  busy = true;
  // Keep the event channel open; completion also persists after the popup closes.
  (async()=>{
    let result;
    try {
      await save({state:"running"});
      const source = await api.windows.get(m.source);
      if (source.incognito || source.type !== "normal") throw Error("SOURCE_NOT_NORMAL");
      const outcome = m.action === "OPEN" ? await openExisting(m.id,m.source,io) :
        {kind:"normal-window",windowId:await openNormalWindow(api.windows)};
      result = {state:"done",...outcome};
    } catch(e) {result={state:"error",code:e.message || "UNKNOWN",extraWindow:e.extraWindow || null};}
    try {await save(result);} catch (_) {}
    busy=false; send({ok:result.state==="done",result});
  })();
  return true;
});
