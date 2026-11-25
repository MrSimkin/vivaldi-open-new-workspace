// Standard window operation only; native Workspace selection is not implemented.
export async function openNormalWindow(windowsApi = globalThis.chrome?.windows) {
  if (typeof windowsApi?.create !== "function") throw new Error("WINDOW_API_UNAVAILABLE");
  const result = await windowsApi.create({ type: "normal", focused: true });
  if (!Number.isInteger(result?.id) || result.id < 0) throw new Error("WINDOW_NOT_CONFIRMED");
  return result.id;
}
export function getLanguage(saved, browserLanguage = "en") {
  return saved === "es" || saved === "en" ? saved : /^es(?:-|$)/i.test(browserLanguage) ? "es" : "en";
}
