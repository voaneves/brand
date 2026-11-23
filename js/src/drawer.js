const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/** Make everything outside `drawer` inert and return a function that undoes it. */
function inertOutside(drawer) {
  const changed = [];
  let node = drawer;
  while (node && node !== document.body) {
    const parent = node.parentElement;
    if (!parent) break;
    for (const sibling of parent.children) {
      if (sibling !== node && !sibling.inert && sibling.tagName !== 'SCRIPT') {
        sibling.inert = true;
        changed.push(sibling);
      }
    }
    node = parent;
  }
  return () => changed.forEach((el) => { el.inert = false; });
}

/**
 * Accessible navigation drawer: opens from `[data-drawer-open][aria-controls=<id>]`,
 * moves focus inside, traps Tab, closes on Escape / `[data-drawer-close]` / in-page links,
 * makes the rest of the page inert and returns focus to the trigger.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initDrawer(root = document) {
  const cleanups = [];

  for (const trigger of root.querySelectorAll('[data-drawer-open]')) {
    const drawer = document.getElementById(trigger.getAttribute('aria-controls') ?? '');
    if (!drawer) continue;
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    trigger.setAttribute('aria-expanded', String(!drawer.hidden));
    let restore = null;

    const focusables = () => [...drawer.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);

    const onKeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !drawer.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !drawer.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    function open() {
      if (!drawer.hidden) return;
      drawer.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      restore = inertOutside(drawer);
      document.addEventListener('keydown', onKeydown);
      (drawer.querySelector('[data-drawer-autofocus]') ?? focusables()[0] ?? drawer).focus();
    }

    function close() {
      if (drawer.hidden) return;
      drawer.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', onKeydown);
      restore?.();
      restore = null;
      trigger.focus();
    }

    const onTrigger = () => (drawer.hidden ? open() : close());
    const onDrawerClick = (event) => {
      const el = event.target instanceof Element ? event.target : null;
      if (el?.closest('[data-drawer-close]') || el?.closest('a[href^="#"]')) close();
    };
    if (!drawer.hasAttribute('tabindex')) drawer.tabIndex = -1;
    trigger.addEventListener('click', onTrigger);
    drawer.addEventListener('click', onDrawerClick);
    cleanups.push(() => {
      trigger.removeEventListener('click', onTrigger);
      drawer.removeEventListener('click', onDrawerClick);
      document.removeEventListener('keydown', onKeydown);
      restore?.();
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
