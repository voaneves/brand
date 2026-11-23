/**
 * Toast queue for `.vn-toast` (see docs/components/toast.md).
 * - Messages go into a polite live region (`.vn-toast-region[role=status][aria-live=polite]`).
 * - At most `max` toasts are visible; the rest wait in a FIFO queue.
 * - Auto-dismiss pauses while the pointer is over a toast or focus is inside it, then resumes
 *   with the remaining time. Toasts with an action stay longer.
 * - Use `.vn-alert--error` (not a toast) for errors that need action.
 *
 * @param {{ region?: HTMLElement, max?: number, duration?: number, actionDuration?: number }} [options]
 */
export function createToaster(options = {}) {
  const max = options.max ?? 2;
  const baseDuration = options.duration ?? 6000;
  const actionDuration = options.actionDuration ?? 10000;
  const queue = [];
  const active = new Set();

  let region = options.region;
  if (!region) {
    region = document.createElement('div');
    region.className = 'vn-toast-region';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    document.body.append(region);
  }

  function remove(entry) {
    if (!active.has(entry)) return;
    active.delete(entry);
    clearTimeout(entry.timer);
    entry.el.dataset.leaving = 'true';
    const ms = Math.max(...getComputedStyle(entry.el).transitionDuration.split(',').map((d) => parseFloat(d) * 1000), 0);
    setTimeout(() => {
      entry.el.remove();
      flush();
    }, ms + 20);
  }

  function arm(entry) {
    clearTimeout(entry.timer);
    if (!entry.duration) return;
    entry.startedAt = Date.now();
    entry.timer = setTimeout(() => remove(entry), entry.remaining);
  }

  function pause(entry) {
    if (!entry.timer) return;
    clearTimeout(entry.timer);
    entry.timer = 0;
    entry.remaining = Math.max(entry.remaining - (Date.now() - entry.startedAt), 1000);
  }

  function mount(entry) {
    const { message, actionLabel, onAction } = entry.options;
    const el = document.createElement('div');
    el.className = 'vn-toast';
    const text = document.createElement('p');
    text.className = 'vn-toast__message';
    text.textContent = message;
    el.append(text);
    if (actionLabel) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'vn-toast__action';
      button.textContent = actionLabel;
      button.addEventListener('click', () => {
        onAction?.();
        remove(entry);
      });
      el.append(button);
    }
    entry.el = el;
    el.addEventListener('pointerenter', () => pause(entry));
    el.addEventListener('pointerleave', () => !el.matches(':focus-within') && arm(entry));
    el.addEventListener('focusin', () => pause(entry));
    el.addEventListener('focusout', (event) => {
      if (!el.contains(event.relatedTarget) && !el.matches(':hover')) arm(entry);
    });
    active.add(entry);
    region.append(el);
    arm(entry);
  }

  function flush() {
    while (active.size < max && queue.length > 0) mount(queue.shift());
  }

  return {
    /**
     * @param {{ message: string, actionLabel?: string, onAction?: () => void, duration?: number }} toast
     * `duration: 0` keeps the toast until dismissed.
     * @returns {() => void} dismiss
     */
    show(toast) {
      const duration = toast.duration ?? (toast.actionLabel ? actionDuration : baseDuration);
      const entry = { options: toast, duration, remaining: duration, timer: 0, startedAt: 0, el: null };
      queue.push(entry);
      flush();
      return () => {
        const i = queue.indexOf(entry);
        if (i >= 0) queue.splice(i, 1);
        else remove(entry);
      };
    },
    dismissAll() {
      queue.length = 0;
      [...active].forEach(remove);
    },
    destroy() {
      queue.length = 0;
      active.forEach((entry) => clearTimeout(entry.timer));
      active.clear();
      region.replaceChildren();
    },
  };
}
