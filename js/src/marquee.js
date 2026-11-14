/**
 * Continuous horizontal marquee using requestAnimationFrame; pauses under reduced motion.
 */
export function initMarquee(selector = '[data-marquee]') {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return () => {};

  const containers = [...document.querySelectorAll(selector)];
  const cleanups = containers.map((container) => {
    const track = container.querySelector('.vn-marquee__track');
    if (!track) return () => {};

    const speed = Number(container.getAttribute('data-marquee-speed')) || 48;
    let offset = 0;
    let paused = false;
    let last = performance.now();
    let raf = 0;

    const pause = () => { paused = true; };
    const resume = () => { paused = false; last = performance.now(); };

    container.addEventListener('pointerenter', pause, { passive: true });
    container.addEventListener('pointerleave', resume, { passive: true });
    container.addEventListener('focusin', pause);
    container.addEventListener('focusout', resume);

    const tick = (now) => {
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      if (!paused) {
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          offset = (offset + speed * dt) % halfWidth;
          track.style.transform = `translate3d(${-offset.toFixed(1)}px, 0, 0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('pointerenter', pause);
      container.removeEventListener('pointerleave', resume);
      container.removeEventListener('focusin', pause);
      container.removeEventListener('focusout', resume);
      track.style.transform = '';
    };
  });

  return () => {
    for (const fn of cleanups) fn();
  };
}
