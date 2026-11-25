export const THEMES = Object.freeze(["dark-gray","light-gray","light-blue"]);
export const DEFAULT_THEME = "dark-gray";
export function getTheme(value) {
  return THEMES.includes(value) ? value : DEFAULT_THEME;
}
export function loadTheme(storage) {
  try { return getTheme(storage.getItem("onw-theme")); }
  catch (_) { return DEFAULT_THEME; }
}
export function saveTheme(storage,value) {
  const theme = getTheme(value);
  try { storage.setItem("onw-theme",theme); } catch (_) {}
  return theme;
}
