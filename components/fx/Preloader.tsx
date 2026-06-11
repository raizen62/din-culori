'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/scroll';

export const REVEAL_EVENT = 'dc:reveal';

export default function Preloader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reveal = () => window.dispatchEvent(new Event(REVEAL_EVENT));

      if (prefersReducedMotion()) {
        setDone(true);
        reveal();
        return;
      }

      const html = document.documentElement;
      html.style.overflow = 'hidden';
      const release = () => {
        html.style.overflow = '';
      };

      const progress = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          release();
          setDone(true);
        },
      });

      tl.fromTo(
        wordRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      )
        .to(
          progress,
          {
            v: 100,
            duration: 1.3,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.round(progress.v)).padStart(3, '0');
              }
            },
          },
          0.1
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.3, ease: 'power2.inOut' },
          0.1
        )
        .to([wordRef.current, counterRef.current], {
          opacity: 0,
          y: -16,
          duration: 0.4,
          ease: 'power2.in',
        })
        .add(reveal, '<0.15')
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'expo.inOut',
        });

      // Safety: never trap the page if something interrupts the timeline.
      const safety = window.setTimeout(() => {
        release();
        reveal();
        setDone(true);
      }, 4000);
      return () => {
        window.clearTimeout(safety);
        release();
      };
    },
    { scope: rootRef }
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[var(--ink)]"
    >
      <div ref={wordRef} className="flex flex-col items-center gap-5 opacity-0">
        <span className="font-display text-[clamp(2.2rem,6vw,4rem)] uppercase leading-none tracking-[0.04em] text-[var(--cream)]">
          Din Culori
        </span>
        <span className="font-serif italic text-base text-[var(--cream-50)]">
          creez amintiri
        </span>
      </div>

      <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12">
        <div className="mb-4 flex items-end justify-between">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--cream-30)]">
            Fotograf — București
          </span>
          <span
            ref={counterRef}
            className="font-display text-2xl leading-none text-[var(--cream-70)] tabular-nums"
          >
            000
          </span>
        </div>
        <div ref={lineRef} className="spectrum-line h-px w-full origin-left scale-x-0" />
      </div>
    </div>
  );
}
