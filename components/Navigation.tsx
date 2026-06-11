'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/animations';
import { scrollToId, getLenis } from '@/lib/scroll';
import { REVEAL_EVENT } from '@/components/fx/Preloader';

const NAV_LINKS = [
  { name: 'Photobooth', id: 'photobooth' },
  { name: 'Galerie', id: 'gallery' },
  { name: 'Despre mine', id: 'about' },
  { name: 'Contact', id: 'contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bar slides in once the preloader curtain lifts.
  useGSAP(() => {
    const intro = () =>
      gsap.fromTo(
        barRef.current,
        { y: -28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.25 }
      );
    window.addEventListener(REVEAL_EVENT, intro, { once: true });
    const fallback = window.setTimeout(intro, 4500);
    return () => {
      window.removeEventListener(REVEAL_EVENT, intro);
      window.clearTimeout(fallback);
    };
  });

  // Park the menu overlay off-screen before first paint. The SSR inline
  // translateY(-100%) gets parsed by GSAP as a pixel offset — zero it out
  // so yPercent alone drives the position from here on.
  useGSAP(
    () => {
      gsap.set(overlayRef.current, { y: 0, yPercent: -100 });
    },
    { scope: overlayRef }
  );

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const links = overlay.querySelectorAll('[data-menu-link]');
    const meta = overlay.querySelectorAll('[data-menu-meta]');
    const lenis = getLenis();

    if (isOpen) {
      if (lenis) lenis.stop();
      else document.documentElement.style.overflow = 'hidden';
      const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });
      tl.to(overlay, { yPercent: 0, duration: 0.7, ease: 'expo.inOut' })
        .fromTo(
          links,
          { yPercent: 130 },
          { yPercent: 0, duration: 0.8, ease: 'power4.out', stagger: 0.07 },
          '-=0.25'
        )
        .fromTo(
          meta,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
          '<0.1'
        );
    } else {
      if (lenis) lenis.start();
      else document.documentElement.style.overflow = '';
      gsap.to(overlay, { yPercent: -100, duration: 0.5, ease: 'expo.in', overwrite: 'auto' });
    }
  }, [isOpen]);

  const goTo = (id: string) => {
    setIsOpen(false);
    // let the curtain start closing before the page glides
    window.setTimeout(() => scrollToId(id), isOpen ? 350 : 0);
  };

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-[100]">
        <div
          ref={barRef}
          className={`transition-[background-color,border-color,padding] duration-500 border-b ${
            isScrolled && !isOpen
              ? 'border-[var(--hairline-soft)] bg-[rgba(11,10,8,0.82)] py-3 backdrop-blur-md'
              : 'border-transparent bg-transparent py-5'
          }`}
        >
          <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
            {/* Logo */}
            <Link href="/" onClick={goHome} className="flex items-center gap-3 text-[var(--cream)]">
              <Image
                src="/logo.png"
                alt="Din Culori"
                width={75}
                height={75}
                className="h-9 w-9 md:h-11 md:w-11"
              />
              <span className="font-shinier text-2xl leading-none tracking-tight">Din culori</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-9 md:flex">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(link.id);
                  }}
                  className="link-line text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--cream-70)] transition-colors hover:text-[var(--cream)]"
                >
                  <span className="mr-1.5 font-serif italic normal-case tracking-normal text-[var(--cream-30)]">
                    0{i + 1}
                  </span>
                  {link.name}
                </a>
              ))}
            </div>

            {/* Burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Închide meniul' : 'Deschide meniul'}
              aria-expanded={isOpen}
              className="group relative flex h-10 w-10 items-center justify-center md:hidden"
            >
              <span
                className={`absolute h-px w-6 bg-[var(--cream)] transition-all duration-300 ${
                  isOpen ? 'rotate-45' : '-translate-y-[4px]'
                }`}
              />
              <span
                className={`absolute h-px w-6 bg-[var(--cream)] transition-all duration-300 ${
                  isOpen ? '-rotate-45' : 'translate-y-[4px]'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <div
        ref={overlayRef}
        style={{ transform: 'translateY(-100%)' }}
        className="fixed inset-0 z-[99] flex flex-col justify-between bg-[var(--ink-2)] px-6 pb-10 pt-28 md:hidden"
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <div key={link.id} className="overflow-hidden">
              <a
                href={`#${link.id}`}
                data-menu-link
                tabIndex={isOpen ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(link.id);
                }}
                className="flex items-baseline gap-4 py-1 font-display text-[clamp(2.6rem,11vw,4rem)] uppercase leading-[1.05] text-[var(--cream)]"
              >
                <span className="font-serif text-base italic text-[var(--terracotta)]">0{i + 1}</span>
                {link.name}
              </a>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <div data-menu-meta className="spectrum-line h-px w-full" />
          <div data-menu-meta className="flex items-end justify-between">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-[var(--cream-30)]">
                Fotograf — București
              </p>
              <a href="tel:+40726221081" className="text-lg text-[var(--cream)]" tabIndex={isOpen ? 0 : -1}>
                +40 726 221 081
              </a>
            </div>
            <a
              href="https://instagram.com/din.culori"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
              className="font-serif italic text-[var(--cream-50)]"
            >
              @din.culori
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
