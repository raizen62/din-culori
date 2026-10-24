'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/animations';

// ratio is the file's real width/height so nothing gets cropped.
// Captions stay generic on purpose — no brand names.
const ACTIVATIONS = [
  { src: '/images/activari/activare_1.jpg', ratio: '2/3', title: 'Conferință', tag: 'Pe scenă' },
  { src: '/images/activari/activare_2.jpg', ratio: '3/2', title: 'Stand expozițional', tag: 'Portret' },
  { src: '/images/activari/activare_3.jpg', ratio: '2/3', title: 'Activare de brand', tag: 'Interacțiune' },
  { src: '/images/activari/activare_4.jpg', ratio: '3/2', title: 'Experiență interactivă', tag: 'Joc' },
  { src: '/images/activari/activare_5.jpg', ratio: '3/2', title: 'Scenografie de brand', tag: 'Detalii' },
  { src: '/images/activari/activare_6.jpg', ratio: '3/2', title: 'Stand de brand', tag: 'Ospitalitate' },
];

const pad = (n: number) => String(n).padStart(2, '0');

export default function ActivationsReel({ ctaHref }: { ctaHref: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reel-item]');
      const mm = gsap.matchMedia();

      // Desktop: pin the reel and translate vertical scroll into a horizontal glide.
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current!;
        const distance = () => Math.max(0, track.offsetWidth - window.innerWidth);

        const glide = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            // Created before the sections below it, but make the order explicit.
            refreshPriority: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(items.length, Math.round(self.progress * (items.length - 1)) + 1);
              if (counterRef.current) counterRef.current.textContent = pad(i);
              gsap.set(progressRef.current, { scaleX: self.progress });
            },
          },
        });

        // Giant outline type drifts slower than the photos.
        gsap.to('[data-reel-bg]', {
          xPercent: -30,
          ease: 'none',
          scrollTrigger: { trigger: pinRef.current, start: 'top top', end: () => `+=${distance()}`, scrub: true },
        });

        items.forEach((item) => {
          // Each photo develops into color as it crosses the middle of the screen.
          ScrollTrigger.create({
            trigger: item,
            containerAnimation: glide,
            start: 'left 70%',
            end: 'right 30%',
            toggleClass: { targets: item, className: 'in-bloom' },
          });
        });
      });

      // Touch / small screens / reduced motion: native swipe, photos already in color.
      mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
        items.forEach((item) => item.classList.add('in-bloom'));
        return () => items.forEach((item) => item.classList.remove('in-bloom'));
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative mb-24 md:mb-32">
      <div ref={pinRef} className="relative flex flex-col justify-center overflow-hidden py-10 lg:h-screen lg:pb-0 lg:pt-20">
        {/* Giant outline backdrop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center">
          <span
            data-reel-bg
            className="whitespace-nowrap font-display text-[24vw] uppercase leading-none text-stroke-cream opacity-[0.06]"
          >
            Activări de brand — Evenimente — Activări de brand —
          </span>
        </div>

        {/* Header row */}
        <div className="relative mx-auto mb-8 flex w-full max-w-[1600px] items-end justify-between gap-6 px-6 md:px-12 lg:mb-10">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="spectrum-line h-px w-10" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--cream-50)]">
                Din teren
              </span>
            </div>
            <h3 className="font-display text-[clamp(2.4rem,5.4vw,4.6rem)] uppercase leading-[0.92] text-[var(--cream)]">
              Activări de brand
              <span className="text-spectrum block font-serif text-[0.42em] lowercase italic leading-[1.3] tracking-normal">
                momente reale, în culori reale
              </span>
            </h3>
          </div>
          <div className="hidden text-right lg:block">
            <p className="font-display text-5xl leading-none text-[var(--cream)]">
              <span ref={counterRef}>01</span>
              <span className="text-[var(--cream-30)]"> / {pad(ACTIVATIONS.length)}</span>
            </p>
            <p className="mt-2 font-serif text-sm italic text-[var(--cream-50)]">derulează în jos →</p>
          </div>
          <p className="shrink-0 pb-2 font-serif text-sm italic text-[var(--cream-50)] lg:hidden">glisează →</p>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="relative flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:px-12 lg:w-max lg:snap-none lg:gap-10 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {ACTIVATIONS.map((a, i) => (
            <figure key={a.src} data-reel-item className="bloom group relative shrink-0 snap-center">
              <div
                className={`relative overflow-hidden lg:h-[56vh] lg:w-auto ${
                  a.ratio === '2/3' ? 'w-[64vw] sm:w-[40vw]' : 'w-[86vw] sm:w-[60vw]'
                }`}
                style={{ aspectRatio: a.ratio }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={a.src}
                    alt={`${a.title} - fotografie de eveniment corporate Din Culori`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 86vw"
                    className="bloom-img object-cover"
                  />
                </div>
              </div>
              <figcaption className="mt-3 flex items-baseline gap-3 border-b border-[var(--hairline-soft)] pb-3">
                <span className="font-display text-sm text-[var(--cream-30)]">{pad(i + 1)}</span>
                <span className="font-serif text-lg italic text-[var(--cream)]">{a.title}</span>
                <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--cream-30)]">
                  {a.tag}
                </span>
              </figcaption>
            </figure>
          ))}

          {/* Closing card */}
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-[72vw] shrink-0 snap-center flex-col justify-between self-stretch border border-[var(--hairline)] bg-[var(--ink-2)] p-7 transition-colors duration-500 hover:border-[var(--terracotta)] sm:w-[44vw] lg:h-[56vh] lg:w-[38vh] lg:self-auto lg:p-9"
          >
            <span className="spectrum-line absolute inset-x-0 top-0 h-[2px]" />
            <MessageCircle className="h-6 w-6 text-[var(--terracotta)]" strokeWidth={1.5} />
            <div>
              <p className="mb-4 font-display text-[clamp(1.9rem,2.6vw,2.5rem)] uppercase leading-[1.15] text-[var(--cream)]">
                Brandul tău e următorul?
              </p>
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--terracotta)]">
                Cere ofertă
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </p>
            </div>
          </a>
        </div>

        {/* Progress */}
        <div className="relative mx-auto mt-8 hidden w-full max-w-[1600px] px-6 md:px-12 lg:block">
          <div className="h-px w-full bg-[var(--hairline-soft)]">
            <span
              ref={progressRef}
              className="spectrum-line block h-px w-full origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
