import type Lenis from 'lenis';

// Singleton store for the Lenis instance so any component can scroll programmatically.
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

const NAV_OFFSET = -80;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    const l = lenis;
    l.scrollTo(el, {
      offset: NAV_OFFSET,
      duration: 1.4,
      onComplete: () => {
        // Layout can shift while the glide runs (lazy media, reveals);
        // nudge to the true position if we drifted.
        const drift = el.getBoundingClientRect().top + NAV_OFFSET;
        if (Math.abs(drift) > 2) l.scrollTo(window.scrollY + drift, { immediate: true });
      },
    });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
