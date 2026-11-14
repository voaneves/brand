/**
 * Progressive scroll unveil via IntersectionObserver.
 */
export function initReveal(selector = '[data-reveal]') {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const nodes = [...document.querySelectorAll(selector)];
  if (!nodes.length) return () => {};

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || typeof IntersectionObserver === 'undefined') {
    for (const node of nodes) node.dataset.revealState = 'visible';
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.dataset.revealState = 'visible';
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );

  for (const node of nodes) {
    if (!node.dataset.revealState) node.dataset.revealState = 'hidden';
    observer.observe(node);
  }

  return () => observer.disconnect();
}
