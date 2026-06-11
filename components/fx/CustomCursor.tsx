'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    document.documentElement.classList.add('dc-cursor');
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const labelled = target.closest<HTMLElement>('[data-cursor-label]');
      const interactive = target.closest('a, button, [role="button"], [data-cursor]');
      if (labelled) {
        label.textContent = labelled.dataset.cursorLabel ?? '';
        gsap.to(ring, { scale: 2.6, backgroundColor: 'rgba(243,238,229,0.95)', duration: 0.35 });
        gsap.to(label, { opacity: 1, duration: 0.25 });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
      } else if (interactive) {
        gsap.to(ring, { scale: 1.7, backgroundColor: 'rgba(243,238,229,0)', duration: 0.35 });
        gsap.to(label, { opacity: 0, duration: 0.15 });
        gsap.to(dot, { opacity: 1, scale: 0.5, duration: 0.25 });
      } else {
        gsap.to(ring, { scale: 1, backgroundColor: 'rgba(243,238,229,0)', duration: 0.35 });
        gsap.to(label, { opacity: 0, duration: 0.15 });
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.25 });
      }
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.classList.remove('dc-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      {/* z-index sits above the lightbox portal (9999) so the cursor never vanishes */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10002] h-1.5 w-1.5 rounded-full bg-[var(--cream)] opacity-0"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10001] flex h-9 w-9 items-center justify-center rounded-full border border-[var(--cream-50)] opacity-0"
      >
        <span
          ref={labelRef}
          className="text-[8.5px] font-semibold uppercase tracking-[0.18em] text-[var(--ink)] opacity-0"
        >
          Vezi
        </span>
      </div>
    </>
  );
}
