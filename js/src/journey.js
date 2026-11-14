/**
 * Scroll progress tracker setting `--vn-journey-progress` (0..1) on `[data-journey]`.
 */
export function initJourney(selector = '[data-journey]') {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const elements = [...document.querySelectorAll(selector)];
  if (!elements.length) return () => {};

  const update = () => {
    const vh = window.innerHeight || 1;
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      const total = rect.height + vh;
      const raw = total > 0 ? (vh - rect.top) / total : 0;
      const clamped = Math.max(0, Math.min(1, raw));
      el.style.setProperty('--vn-journey-progress', clamped.toFixed(4));
    }
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}
