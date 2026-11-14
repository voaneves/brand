const STORAGE_KEY = 'vn-theme';

/**
 * Resolve stored or system color theme and apply `data-theme` to `<html>`.
 */
export function initTheme(storageKey = STORAGE_KEY) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 'light';
  }

  let saved = null;
  try {
    saved = window.localStorage.getItem(storageKey);
  } catch {
    saved = null;
  }

  const mode =
    saved === 'light' || saved === 'dark'
      ? saved
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

  document.documentElement.dataset.theme = mode;
  return mode;
}

/**
 * Persist explicit theme (`light` | `dark`) on `<html>` and in `localStorage`.
 */
export function setTheme(mode, storageKey = STORAGE_KEY) {
  if (typeof document === 'undefined') return mode;
  const next = mode === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  try {
    window.localStorage.setItem(storageKey, next);
  } catch {
    // Ignore storage errors in restricted browsing contexts.
  }
  return next;
}

/**
 * Toggle between `light` and `dark` theme modes.
 */
export function toggleTheme(storageKey = STORAGE_KEY) {
  if (typeof document === 'undefined') return 'light';
  const current = document.documentElement.dataset.theme;
  return setTheme(current === 'dark' ? 'light' : 'dark', storageKey);
}
