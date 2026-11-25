import { getWorkspaceCapability } from "./workspace-adapter.js";

const capability = getWorkspaceCapability();
document.getElementById("status").textContent = capability.label;
document.getElementById("detail").textContent = capability.detail;
