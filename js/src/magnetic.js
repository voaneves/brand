/**
 * Subtle magnetic pull on interactive elements with `[data-magnetic]`.
 */
export function initMagnetic(selector = '[data-magnetic]') {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (coarse || reduced) return () => {};

  const elements = [...document.querySelectorAll(selector)];
  const cleanups = elements.map((el) => {
    const strength = Number(el.getAttribute('data-magnetic')) || 0.22;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const ox = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const oy = (e.clientY - (rect.top + rect.height / 2)) * strength;
      el.style.transform = `translate3d(${ox.toFixed(1)}px, ${oy.toFixed(1)}px, 0)`;
    };

    const onLeave = () => {
      el.style.transform = '';
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.style.transform = '';
    };
  });

  return () => {
    for (const fn of cleanups) fn();
  };
}
