'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, SplitText, useGSAP, revealWithin } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/scroll';

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current!;
      revealWithin(section);
      if (prefersReducedMotion()) return;

      // Words emerge from darkness as you scroll — the darkroom develops.
      const split = new SplitText(textRef.current, { type: 'words' });
      gsap.fromTo(
        split.words,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: 0.4,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('[data-float]').forEach((el) => {
        gsap.to(el, {
          yPercent: parseFloat(el.dataset.float ?? '0'),
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[var(--ink)] py-28 md:py-44">
      {/* Floating photographs */}
      <div
        data-float="-22"
        className="bloom pointer-events-auto absolute right-[5%] top-[10%] hidden w-48 rotate-3 xl:block"
      >
        <Image
          src="/images/random_1.jpg"
          alt="Patinoar iarna - fotografie de eveniment Din Culori"
          width={420}
          height={520}
          className="bloom-img h-auto w-full object-cover"
        />
        <p className="mt-2 font-serif text-xs italic text-[var(--cream-30)]">— la patinoar, dec. 2025</p>
      </div>
      <div
        data-float="18"
        className="bloom pointer-events-auto absolute bottom-[6%] left-[4%] hidden w-40 -rotate-6 xl:block"
      >
        <Image
          src="/images/mancare_4.jpg"
          alt="Kurtos - fotografie culinară Din Culori"
          width={420}
          height={520}
          className="bloom-img h-auto w-full object-cover"
        />
        <p className="mt-2 font-serif text-xs italic text-[var(--cream-30)]">— street food, București</p>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div data-reveal className="mb-10 flex items-center gap-4 md:mb-14">
            <span className="spectrum-line h-px w-10" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--cream-50)]">
              01 — Manifest
            </span>
          </div>

          <p
            ref={textRef}
            className="text-[clamp(1.7rem,4vw,3.4rem)] font-medium leading-[1.25] tracking-tight text-[var(--cream)]"
          >
            Fiecare cadru începe în întuneric. Apoi vine{' '}
            <em className="font-serif italic text-[var(--terracotta)]">lumina</em> — iar din culori se
            nasc <em className="font-serif italic text-[var(--terracotta)]">amintirile</em>. Fotografiez
            oameni, <em className="font-serif italic text-[var(--terracotta)]">emoții</em> și povești,
            exact așa cum se simt.
          </p>

          <div data-reveal data-reveal-delay="0.15" className="mt-12 flex flex-wrap gap-x-12 gap-y-4 md:mt-16">
            {[
              ['Nunți & botezuri', 'momente o singură dată'],
              ['Evenimente & concerte', 'energia, păstrată'],
              ['Portrete & food', 'detaliul care rămâne'],
            ].map(([title, sub]) => (
              <div key={title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--cream)]">
                  {title}
                </p>
                <p className="mt-1 font-serif italic text-sm text-[var(--cream-50)]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
