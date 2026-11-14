/**
 * Smooth desktop cursor follower using exponential smoothing.
 * Respects coarse pointers and prefers-reduced-motion.
 */
export function initCursor(options = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (coarse || reduced) return () => {};

  const root = options.root || document.querySelector('.vn-cursor');
  if (!root) return () => {};

  const dot = root.querySelector('.vn-cursor__dot');
  const lens = root.querySelector('.vn-cursor__lens');
  const labelEl = root.querySelector('.vn-cursor__label');

  let tx = -100;
  let ty = -100;
  let dx = tx;
  let dy = ty;
  let lx = tx;
  let ly = ty;
  let last = performance.now();
  let raf = 0;

  const tauDot = options.tauDot ?? 30;
  const tauLens = options.tauLens ?? 90;

  const move = (e) => {
    tx = e.clientX;
    ty = e.clientY;
    const hit = e.target instanceof Element ? e.target.closest('[data-cursor-label],[data-surface]') : null;
    if (labelEl) {
      const lbl = hit?.getAttribute('data-cursor-label') || '';
      labelEl.textContent = lbl;
      labelEl.style.opacity = lbl ? '1' : '0';
    }
    const surface = hit?.getAttribute('data-surface') || '';
    if (surface) root.dataset.surface = surface;
    else delete root.dataset.surface;
  };

  const down = () => { root.dataset.pressed = 'true'; };
  const up = () => { delete root.dataset.pressed; };

  const tick = (now) => {
    const dt = Math.min(now - last, 50);
    last = now;
    const aDot = 1 - Math.exp(-dt / tauDot);
    const aLens = 1 - Math.exp(-dt / tauLens);
    dx += (tx - dx) * aDot;
    dy += (ty - dy) * aDot;
    lx += (tx - lx) * aLens;
    ly += (ty - ly) * aLens;
    if (dot) dot.style.transform = `translate3d(${dx - 4}px, ${dy - 4}px, 0)`;
    if (lens) lens.style.transform = `translate3d(${lx - 28}px, ${ly - 28}px, 0)`;
    if (labelEl) labelEl.style.transform = `translate3d(${lx + 18}px, ${ly + 18}px, 0)`;
    raf = requestAnimationFrame(tick);
  };

  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerdown', down, { passive: true });
  window.addEventListener('pointerup', up, { passive: true });
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerdown', down);
    window.removeEventListener('pointerup', up);
  };
}
