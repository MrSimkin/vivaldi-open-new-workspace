// Integration boundary. No browser APIs are invoked by the initial scaffold.
export function getWorkspaceCapability() {
  return {
    available: false,
    code: "NOT_IMPLEMENTED",
    label: "En desarrollo",
    detail: "La integración con Workspaces nativos aún no está implementada."
  };
}
