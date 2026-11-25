import { openNormalWindow, getLanguage } from "./workspace-adapter.js";
const $ = id => document.getElementById(id);
const strings = {
  es: { newLabel: "Nuevo Workspace", newDetail: "En construcción", baseLabel: "Workspace base", baseDetail: "Abrir ventana normal (base por verificar)", existingLabel: "Workspace existente", existingDetail: "Selección asistida; automática pendiente", assistText: "Si ya está abierto, selecciónalo en el menú nativo para enfocar su ventana. Si no está abierto, abre otra ventana y selecciónalo allí. No se comprueba automáticamente su estado.", manual: "Abrir ventana para seleccionar manualmente", opening: "Abriendo ventana…", opened: "Ventana abierta. Verifica el Workspace en Vivaldi.", failed: "No se pudo confirmar la apertura. Revisa Vivaldi antes de reintentar." },
  en: { newLabel: "New Workspace", newDetail: "Under construction", baseLabel: "Base Workspace", baseDetail: "Open normal window (base not yet verified)", existingLabel: "Existing Workspace", existingDetail: "Assisted selection; automation pending", assistText: "If already open, select it in the native menu to focus its window. If not open, open another window and select it there. Status is not checked automatically.", manual: "Open window for manual selection", opening: "Opening window…", opened: "Window opened. Verify the Workspace in Vivaldi.", failed: "Window opening could not be confirmed. Check Vivaldi before retrying." }
};
let saved;
try { saved = localStorage.getItem("onw-language"); } catch (_) {}
let language = getLanguage(saved, navigator.language);
let busy = false;
let status = "";
function render() {
  document.documentElement.lang = language;
  $("language").value = language;
  for (const id of ["newLabel", "newDetail", "baseLabel", "baseDetail", "existingLabel", "existingDetail", "assistText", "manual"]) $(id).textContent = strings[language][id];
  $("status").textContent = status ? strings[language][status] : "";
  $("base").disabled = busy;
  $("manual").disabled = busy;
}
async function open() {
  if (busy) return;
  busy = true; status = "opening"; render();
  try { await openNormalWindow(); status = "opened"; }
  catch (_) { status = "failed"; }
  finally { busy = false; render(); }
}
$("language").addEventListener("change", event => {
  language = getLanguage(event.target.value);
  try { localStorage.setItem("onw-language", language); } catch (_) {}
  render();
});
$("base").addEventListener("click", open);
$("manual").addEventListener("click", open);
$("existing").addEventListener("click", () => {
  $("assist").hidden = !$("assist").hidden;
  $("existing").setAttribute("aria-expanded", String(!$("assist").hidden));
});
render();
