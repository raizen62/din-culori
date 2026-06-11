'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, revealWithin } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/scroll';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      revealWithin(sectionRef.current!);
      if (prefersReducedMotion()) return;

      const wrap = portraitRef.current!;
      const img = wrap.querySelector('img');
      gsap.fromTo(
        wrap,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: { trigger: wrap, start: 'top 78%', once: true },
        }
      );
      gsap.fromTo(
        img,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: wrap, start: 'top 78%', once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="border-t border-[var(--hairline-soft)] bg-[var(--ink)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div data-reveal className="mb-14 flex items-center gap-4 md:mb-20">
          <span className="spectrum-line h-px w-10" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--cream-50)]">
            04 — Despre mine
          </span>
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Portrait */}
          <div className="relative lg:col-span-5">
            <div
              aria-hidden="true"
              className="absolute -left-3 -top-3 hidden h-full w-full border border-[var(--hairline)] md:block"
            />
            <div ref={portraitRef} className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/poza-profil.jpg"
                alt="Din Culori - Fotograf profesionist București specializat în nunți, portrete și evenimente"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <p data-reveal className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[var(--cream-30)]">
              <span>București, România</span>
              <span className="font-serif italic normal-case tracking-normal">disponibil oriunde</span>
            </p>
          </div>

          {/* Copy */}
          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <h2
              data-reveal
              className="mb-10 font-display text-[clamp(2.8rem,6.5vw,5.6rem)] uppercase leading-[0.92] text-[var(--cream)]"
            >
              Autenticitatea
              <span className="text-spectrum block font-serif text-[0.5em] lowercase italic leading-[1.1] tracking-normal">
                întâlnește arta
              </span>
            </h2>

            <div className="space-y-5 text-[15px] leading-relaxed text-[var(--cream-70)] md:text-base">
              <p data-reveal>
                Bine ai venit la Din Culori, unde fiecare fotografie spune o poveste unică prin lentila
                creativității și a pasiunii. Cu ani de experiență în surprinderea celor mai prețioase
                momente ale vieții, sunt specializat în crearea unor imagini atemporale, pe care le vei
                prețui pentru totdeauna.
              </p>
              <p data-reveal>
                Abordarea mea în fotografie este simplă:{' '}
                <em className="font-serif italic text-[var(--cream)]">autenticitatea întâlnește arta</em>.
                Fie că este vorba de o nuntă, o ședință foto de portret sau o aventură în natură, cred în
                surprinderea emoțiilor reale și în crearea unor povești vizuale care să rezoneze.
              </p>
              <p data-reveal>
                Cu sediul în România, sunt disponibil pentru proiecte oriunde în lume. Hai să lucrăm
                împreună pentru a crea ceva frumos.
              </p>
            </div>

            <p data-reveal className="font-shinier mt-12 text-3xl text-[var(--terracotta)] md:text-4xl">
              Din culori, creez amintiri.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
