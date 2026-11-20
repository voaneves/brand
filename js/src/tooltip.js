/**
 * Escape dismisses open tooltips (WCAG 1.4.13) until the pointer or focus leaves the trigger.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initTooltip(root = document) {
  const onKey = (event) => {
    if (event.key !== 'Escape') return;
    for (const tip of root.querySelectorAll('.vn-tooltip')) {
      if (tip.matches(':hover, :focus-within')) tip.dataset.dismissed = 'true';
    }
  };
  const reset = (event) => {
    const tip = event.target instanceof Element ? event.target.closest('.vn-tooltip') : null;
    if (tip) delete tip.dataset.dismissed;
  };
  document.addEventListener('keydown', onKey);
  root.addEventListener('pointerout', reset);
  root.addEventListener('focusout', reset);
  return () => {
    document.removeEventListener('keydown', onKey);
    root.removeEventListener('pointerout', reset);
    root.removeEventListener('focusout', reset);
  };
}
