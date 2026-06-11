'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from './scroll';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const EASE_OUT = 'power4.out';

/**
 * Reveals every `[data-reveal]` element inside the scope as it scrolls into view.
 * Elements sharing a parent stagger; `data-reveal-delay` adds extra delay (s).
 */
export function revealWithin(scope: HTMLElement) {
  if (prefersReducedMotion()) return;
  const items = gsap.utils.toArray<HTMLElement>(scope.querySelectorAll('[data-reveal]'));
  items.forEach((el) => {
    const delay = parseFloat(el.dataset.revealDelay ?? '0');
    gsap.fromTo(
      el,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        delay,
        ease: EASE_OUT,
        scrollTrigger: { trigger: el, start: 'clamp(top 88%)', once: true },
      }
    );
  });
}
