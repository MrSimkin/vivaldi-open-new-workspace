export const VIVALDI_UI = "mpognobbkildjkofajifpdfhcoklimli";
export const PROTOCOL = 3;
export const validWindow = n => Number.isSafeInteger(n) && n > 0;
export const validWorkspace = n => (Number.isSafeInteger(n) && n >= 0) || (typeof n === "string" && n.length > 0 && n.length <= 128);

export function getLanguage(saved) {
  return saved === "es" || saved === "en" ? saved : "es";
}

export function validateSnapshot(data) {
  if (!data || !Array.isArray(data.workspaces) || !Array.isArray(data.windows)) throw Error("INVALID_SNAPSHOT");
  const ids = new Set(), wins = new Set();
  for (const w of data.workspaces) {
    if (!validWorkspace(w?.id) || typeof w.name !== "string" || !w.name.trim() || w.name.length > 512 || ids.has(w.id)) throw Error("INVALID_CATALOG");
    ids.add(w.id);
  }
  for (const w of data.windows) {
    if (!validWindow(w?.id) || wins.has(w.id) || !["base","named","unknown"].includes(w.kind) ||
        (w.kind === "named" && !ids.has(w.workspaceId))) throw Error("INVALID_WINDOWS");
    wins.add(w.id);
  }
  return data;
}

export function locateWorkspace(snapshot, id) {
  validateSnapshot(snapshot);
  if (!snapshot.workspaces.some(w => w.id === id)) throw Error("WORKSPACE_MISSING");
  const matches = snapshot.windows.filter(w => w.kind === "named" && w.workspaceId === id);
  if (matches.length > 1) throw Error("AMBIGUOUS_WORKSPACE");
  if (matches.length === 1) return { kind: "focus", windowId: matches[0].id };
  if (snapshot.windows.some(w => w.kind === "unknown")) throw Error("ACTIVE_STATE_UNKNOWN");
  return { kind: "open" };
}

// Poll actual focus after the single focus request; never create on failure.
export async function focusWindow(id, windowsApi=globalThis.chrome?.windows, wait=ms=>new Promise(r=>setTimeout(r,ms))) {
  if(!validWindow(id))throw Error("INVALID_REQUEST");
  const check=w=>{if(w?.id!==id||w.type!=="normal"||w.incognito)throw Error("WINDOW_NOT_NORMAL");return w;};
  const initial=check(await windowsApi.get(id));
  if(initial.focused===true&&initial.state!=="minimized")return;
  if(initial.state==="minimized")check(await windowsApi.update(id,{state:"normal"}));
  await windowsApi.update(id,{focused:true});
  for(let i=0;i<20;i++){
    const w=check(await windowsApi.get(id));
    if(w.focused===true&&w.state!=="minimized")return;
    await wait(100);
  }
  throw Error("FOCUS_UNVERIFIED");
}

export async function openNormalWindow(windowsApi = globalThis.chrome?.windows) {
  if (typeof windowsApi?.create !== "function") throw Error("WINDOW_API_UNAVAILABLE");
  const result = await windowsApi.create({type:"normal",focused:true});
  if (!validWindow(result?.id)) throw Error("WINDOW_NOT_CONFIRMED");
  return result.id;
}

// Dependencies are injected for tests; never retry a mutating operation.
export async function openExisting(id, source, io) {
  if (!validWorkspace(id) || !validWindow(source)) throw Error("INVALID_REQUEST");
  const snap = validateSnapshot(await io.snapshot(source));
  if (!snap.windows.some(w => w.id === source)) throw Error("SOURCE_MISSING");
  const plan = locateWorkspace(snap,id);
  if (plan.kind === "focus") {
    await io.focus(plan.windowId);
    const after = locateWorkspace(await io.snapshot(plan.windowId),id);
    if (after.kind !== "focus" || after.windowId !== plan.windowId) throw Error("FOCUS_UNVERIFIED");
    return {kind:"focused",windowId:plan.windowId};
  }
  // Duplicate names are safe to list/focus by ID, but not to select by UI text.
  const target = snap.workspaces.find(w => w.id === id);
  if (snap.workspaces.filter(w => w.name.trim() === target.name.trim()).length !== 1) throw Error("AMBIGUOUS_NAME");
  if (snap.canSelect !== true) throw Error("NATIVE_MENU_UNAVAILABLE");
  const destination = await io.create();
  if (!validWindow(destination) || destination === source || snap.windows.some(w => w.id === destination)) throw Error("NEW_WINDOW_UNVERIFIED");
  try {
    await io.ready(destination);
    const current = validateSnapshot(await io.snapshot(destination));
    const next = locateWorkspace(current,id);
    if (next.kind === "focus") {
      await io.focus(next.windowId);
      const after = locateWorkspace(await io.snapshot(next.windowId),id);
      if (after.kind !== "focus" || after.windowId !== next.windowId) throw Error("FOCUS_UNVERIFIED");
      return {kind:"focused",windowId:next.windowId,extraWindow:destination !== next.windowId ? destination : null};
    }
    if (current.windows.find(w => w.id === destination)?.kind !== "base") throw Error("DESTINATION_NOT_BASE");
    await io.select(destination,id);
    const after = locateWorkspace(await io.snapshot(destination),id);
    if (after.kind !== "focus" || after.windowId !== destination || !after.windowId) throw Error("SELECTION_UNVERIFIED");
    if (!(await io.exists(source))) throw Error("SOURCE_MISSING");
    await io.focus(destination);
    return {kind:"opened",windowId:destination};
  } catch (e) {
    // Do not close a window automatically: it may already contain user tabs.
    const error = Error(e.message || "OPEN_UNVERIFIED");
    error.extraWindow = destination;
    throw error;
  }
}

export function requestBridge(windowId, action, payload = {}, runtime = globalThis.chrome?.runtime) {
  if (!validWindow(windowId) || !runtime?.sendMessage) return Promise.reject(Error("BRIDGE_UNAVAILABLE"));
  const requestId = crypto.randomUUID();
  return new Promise((resolve,reject) => {
    let settled = false;
    const finish = (err,value) => {
      if (settled) return;
      settled = true; clearTimeout(timer);
      err ? reject(Error(err)) : resolve(value);
    };
    const timer = setTimeout(() => finish("BRIDGE_TIMEOUT"), action === "SELECT" ? 20000 : action === "PING" ? 1100 : 8500);
    try {
      runtime.sendMessage(VIVALDI_UI,{protocol:PROTOCOL,requestId,windowId,action,...payload},response => {
        if (runtime.lastError) return finish("BRIDGE_UNAVAILABLE");
        if (!response || response.protocol !== PROTOCOL || response.requestId !== requestId || response.windowId !== windowId) return finish("BRIDGE_RESPONSE_INVALID");
        if (!response.ok) return finish(typeof response.code === "string" ? response.code : "BRIDGE_REJECTED");
        finish(null,response.data);
      });
    } catch (_) { finish("BRIDGE_UNAVAILABLE"); }
  });
}
