'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/animations';
import { scrollToId, prefersReducedMotion } from '@/lib/scroll';
import { REVEAL_EVENT } from '@/components/fx/Preloader';

const HERO_SLIDES = [
  {
    id: 2,
    src: '/images/carousel/carousel_2.jpg',
    alt: 'Fotografie profesională de nuntă București - Momentele tale speciale capturate artistic de Din Culori',
  },
  {
    id: 1,
    src: '/images/carousel/carousel_1.jpg',
    alt: 'Portret profesional București - Fotografie artistică și creativă de calitate superioară',
  },
  {
    id: 3,
    src: '/images/carousel/carousel_3.jpg',
    alt: 'Fotograf evenimente București - Servicii foto profesionale pentru momente de neuitat',
  },
  {
    id: 4,
    src: '/images/carousel/carousel_4.jpg',
    alt: 'Ședință foto creativă București - Fotografie artistică cu atenție la detalii',
  },
  {
    id: 5,
    src: '/images/carousel/carousel_5.jpg',
    alt: 'Fotografie de nuntă naturală și emoțională - Din Culori Photography București',
  },
  {
    id: 6,
    src: '/images/carousel/carousel_6.jpg',
    alt: 'Povestea ta în imagini - Fotograf profesionist specializat în evenimente speciale',
  },
];

const SLIDE_MS = 5200;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Intro choreography — fires when the preloader curtain lifts.
  useGSAP(
    () => {
      const section = sectionRef.current!;
      const fadeEls = section.querySelectorAll('[data-hero-fade]');

      if (prefersReducedMotion()) {
        gsap.set(fadeEls, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(fadeEls, { opacity: 0, y: 26 });
      let played = false;

      const lines = headlineRef.current!.querySelectorAll('[data-hero-line]');
      gsap.set(lines, { yPercent: 115 });

      const play = () => {
        if (played) return;
        played = true;
        const tl = gsap.timeline();
        tl.fromTo(
          slidesRef.current,
          { scale: 1.14 },
          { scale: 1, duration: 2.4, ease: 'expo.out' },
          0
        )
          .to(
            lines,
            { yPercent: 0, duration: 1.25, ease: 'power4.out', stagger: 0.14 },
            0.15
          )
          .to(fadeEls, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09 }, 0.7);
      };

      window.addEventListener(REVEAL_EVENT, play, { once: true });
      const fallback = window.setTimeout(play, 4500);

      // Gentle parallax exit while scrolling away.
      gsap.to(section.querySelector('[data-hero-content]'), {
        yPercent: 16,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom 20%', scrub: true },
      });

      return () => {
        window.removeEventListener(REVEAL_EVENT, play);
        window.clearTimeout(fallback);
      };
    },
    { scope: sectionRef }
  );

  // Slideshow autoplay.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), SLIDE_MS);
    return () => window.clearInterval(t);
  }, []);

  // Crossfade + ken burns on slide change, progress bar restart.
  useEffect(() => {
    const slides = slidesRef.current?.children;
    if (!slides) return;
    const incoming = slides[index] as HTMLElement;
    const img = incoming.querySelector('img');

    gsap.set(incoming, { zIndex: 2 });
    gsap.to(incoming, {
      opacity: 1,
      duration: 1.4,
      ease: 'power2.inOut',
      onComplete: () => {
        Array.from(slides).forEach((s, i) => {
          if (i !== index) gsap.set(s, { opacity: 0, zIndex: 1 });
        });
      },
    });
    if (img && !prefersReducedMotion()) {
      gsap.fromTo(img, { scale: 1.09 }, { scale: 1, duration: SLIDE_MS / 1000 + 1.6, ease: 'power1.out' });
    }
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: SLIDE_MS / 1000, ease: 'none' }
      );
    }
  }, [index]);

  // Subtle mouse parallax on the imagery (fine pointers only).
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion()) return;
    const el = slidesRef.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' });
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      xTo(nx * -18);
      yTo(ny * -12);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100svh] overflow-hidden bg-[var(--ink)]">
      {/* Slideshow */}
      <div ref={slidesRef} className="absolute -inset-6">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: 1 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Legibility veils */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(11,10,8,0.55)] via-[rgba(11,10,8,0.12)] to-[rgba(11,10,8,0.92)]" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(11,10,8,0.5)_100%)]" />

      {/* Content */}
      <div
        data-hero-content
        className="absolute inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-[1600px] flex-col justify-end px-6 pb-12 md:px-12 md:pb-14"
      >
        <p
          data-hero-fade
          className="mb-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--cream-70)] md:text-[11px]"
        >
          Fotograf de nunți, evenimente <span className="font-serif italic normal-case tracking-normal text-[var(--terracotta)]">&</span> portrete
        </p>

        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          {/* Headline */}
          <h1
            ref={headlineRef}
            aria-label="Din Culori"
            className="font-display uppercase leading-[0.86] tracking-[0.01em]"
            style={{ fontSize: 'clamp(4.6rem, 16vw, 15rem)' }}
          >
            <span className="block overflow-hidden py-[0.05em] -my-[0.05em]">
              <span data-hero-line className="text-stroke-cream block will-change-transform">Din</span>
            </span>
            <span className="block overflow-hidden py-[0.05em] -my-[0.05em]">
              <span data-hero-line className="text-spectrum block will-change-transform">Culori</span>
            </span>
          </h1>

          {/* Right rail */}
          <div className="flex w-full flex-col gap-6 lg:max-w-xs lg:items-end lg:pb-3 lg:text-right">
            <p data-hero-fade className="font-serif text-xl italic leading-snug text-[var(--cream-70)] md:text-2xl">
              „Din culori, creez amintiri.&rdquo; — povestea ta, în lumină și culoare.
            </p>

            <div data-hero-fade className="flex items-center gap-7 lg:justify-end">
              <button
                onClick={() => scrollToId('gallery')}
                className="link-line text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--cream)]"
              >
                Vezi galeria
              </button>
              <button
                onClick={() => scrollToId('photobooth')}
                className="link-line text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--cream-50)] hover:text-[var(--cream)] transition-colors"
              >
                Photobooth
              </button>
            </div>

            {/* Slide counter */}
            <div data-hero-fade className="flex w-full items-center gap-4 lg:justify-end">
              <span className="font-display text-sm tabular-nums text-[var(--cream-70)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="relative h-px flex-1 max-w-[140px] overflow-hidden bg-[var(--hairline)]">
                <div ref={progressRef} className="spectrum-line absolute inset-0 origin-left scale-x-0" />
              </div>
              <span className="font-display text-sm tabular-nums text-[var(--cream-30)]">
                {String(HERO_SLIDES.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-fade
        className="absolute bottom-0 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 pb-3 md:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--cream-30)]">Scroll</span>
        <div className="h-10 w-px overflow-hidden bg-[var(--hairline)]">
          <div className="h-full w-full animate-[scroll-cue_1.8s_ease-in-out_infinite] bg-[var(--cream-70)]" />
        </div>
      </div>
    </section>
  );
}
