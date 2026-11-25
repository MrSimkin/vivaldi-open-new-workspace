// ONW research P1: run ONLY in Vivaldi's own window.html DevTools.
// Read-only: enumerates API names, reads catalog shape, never outputs values.
// No writes, messaging, injection, clicks, listeners, or profile changes.
(async () => {
  "use strict";
  const report = { probe: "ONW-P1-v1", context: "unknown", namespaces: [], candidates: {}, catalog: null };
  if (location.protocol !== "chrome-extension:" ||
      location.hostname !== "mpognobbkildjkofajifpdfhcoklimli" ||
      !location.pathname.endsWith("/window.html")) {
    return { probe: report.probe, error: "WRONG_CONTEXT" };
  }
  report.context = "vivaldi-ui";
  const api = globalThis.vivaldi;
  if (!api) return { ...report, error: "VIVALDI_API_UNAVAILABLE" };
  function names(obj) {
    try { return Object.getOwnPropertyNames(obj || {}).sort(); }
    catch (_) { return []; }
  }
  report.namespaces = names(api);
  for (const name of report.namespaces) {
    try {
      const members = names(api[name]);
      const selected = /workspace|window|tabs|prefs|command|util|action|session/i.test(name)
        ? members : members.filter(k => /workspace|command/i.test(k));
      if (selected.length) report.candidates[name] = selected;
    } catch (_) { /* No call to unknown API methods. */ }
  }
  if (typeof api.prefs?.get !== "function") {
    return { ...report, error: "PREFS_GET_UNAVAILABLE" };
  }
  // DTC observed both callback and awaited return forms. Use a single call,
  // accept either completion, and bound the time; never retry a mutation.
  const result = await new Promise(resolve => {
    let done = false;
    const finish = value => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve(value);
    };
    const timer = setTimeout(() => finish({ error: "PREFS_TIMEOUT" }), 3000);
    try {
      const returned = api.prefs.get("vivaldi.workspaces.list", value => finish({ value }));
      if (returned && typeof returned.then === "function") {
        returned.then(value => { if (value !== undefined) finish({ value }); },
          () => finish({ error: "PREFS_REJECTED" }));
      } else if (returned !== undefined) finish({ value: returned });
    } catch (_) { finish({ error: "PREFS_CALL_FAILED" }); }
  });
  if (result.error) return { ...report, error: result.error };
  const raw = result.value;
  const list = Array.isArray(raw) ? raw :
    (raw && Array.isArray(raw.value) ? raw.value : null);
  const fields = Object.create(null);
  for (const item of list || []) {
    if (!item || typeof item !== "object") continue;
    for (const key of names(item)) {
      const value = item[key];
      const type = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
      (fields[key] ||= new Set()).add(type);
    }
  }
  report.catalog = {
    shape: Array.isArray(raw) ? "array" : list ? "wrapped-array" : "unrecognized",
    wrapperKeys: Array.isArray(raw) ? [] : names(raw),
    count: list ? list.length : null,
    fields: Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, [...v].sort()]))
  };
  console.log("ONW-P1", JSON.stringify(report, null, 2));
  return report;
})();
