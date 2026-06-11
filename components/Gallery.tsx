'use client';

import { useEffect, useRef, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { gsap, ScrollTrigger, useGSAP, revealWithin } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/scroll';

// ratio matches each file's real proportions so nothing gets cropped.
const galleryImages = [
  { id: 1, src: '/images/mancare_1.jpg', category: 'food', title: 'Cataif', ratio: '4/5' },
  { id: 2, src: '/images/mancare_2.jpg', category: 'food', title: 'Grătar', ratio: '2/3' },
  { id: 3, src: '/images/mancare_3.jpg', category: 'food', title: 'Șuncă', ratio: '2/3' },
  { id: 4, src: '/images/mancare_4.jpg', category: 'food', title: 'Kürtős', ratio: '4/5' },
  { id: 5, src: '/images/nunta_1.jpg', category: 'wedding', title: 'Nuntă', ratio: '2/3' },
  { id: 6, src: '/images/nunta_2.jpg', category: 'wedding', title: 'Nuntă', ratio: '2/3' },
  { id: 7, src: '/images/random_1.jpg', category: 'random', title: 'La patinoar', ratio: '2/3' },
  { id: 8, src: '/images/random_2.jpg', category: 'random', title: 'Elf', ratio: '4/5' },
  { id: 9, src: '/images/concert_1.jpg', category: 'concert', title: 'Folk Frate', ratio: '4/5' },
];

const CATEGORIES = [
  { key: 'all', label: 'Toate' },
  { key: 'food', label: 'Food' },
  { key: 'concert', label: 'Concerte' },
  { key: 'wedding', label: 'Nunți' },
  { key: 'random', label: 'Diverse' },
];

const CATEGORY_ALT: Record<string, string> = {
  food: 'fotografie culinară',
  wedding: 'fotografie de nuntă',
  concert: 'fotografie de concert',
  random: 'fotografie de eveniment',
};

// Editorial layout rhythm — column spans + vertical stagger, three per row.
// Aspect ratios come from the photos themselves, never from the slot.
const LAYOUT = [
  { span: 'lg:col-span-5', offset: '' },
  { span: 'lg:col-span-4', offset: 'lg:mt-20' },
  { span: 'lg:col-span-3', offset: 'lg:mt-44' },
  { span: 'lg:col-span-4', offset: 'lg:-mt-10' },
  { span: 'lg:col-span-5', offset: 'lg:mt-16' },
  { span: 'lg:col-span-3', offset: 'lg:mt-36' },
];

export default function Gallery() {
  const [category, setCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    category === 'all' ? galleryImages : galleryImages.filter((img) => img.category === category);

  const counts = Object.fromEntries(
    CATEGORIES.map((c) => [
      c.key,
      c.key === 'all' ? galleryImages.length : galleryImages.filter((i) => i.category === c.key).length,
    ])
  );

  useGSAP(
    () => {
      revealWithin(sectionRef.current!);
    },
    { scope: sectionRef }
  );

  // (Re)build per-item animations whenever the filter changes.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-g-item]', grid);
      items.forEach((item, i) => {
        if (reduced) {
          item.classList.add('in-bloom');
          return;
        }

        // Entrance — fires immediately for items already in view (filter change).
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: Math.min(i * 0.06, 0.3),
            ease: 'power4.out',
            scrollTrigger: { trigger: item, start: 'clamp(top 96%)', once: true },
          }
        );

        // Color blooms while the photo crosses the middle of the viewport.
        ScrollTrigger.create({
          trigger: item,
          start: 'top 72%',
          end: 'bottom 18%',
          toggleClass: { targets: item, className: 'in-bloom' },
        });
      });
    }, grid);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [category]);

  return (
    <section ref={sectionRef} id="gallery" className="bg-[var(--ink)] py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {/* Header */}
        <div data-reveal className="mb-10 flex items-center gap-4">
          <span className="spectrum-line h-px w-10" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--cream-50)]">
            03 — Portofoliu
          </span>
        </div>

        <div className="mb-14 flex flex-col gap-10 md:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <h2 data-reveal className="font-display text-[clamp(3.4rem,9vw,8.5rem)] uppercase leading-[0.9] text-[var(--cream)]">
            Galerie
            <sup className="text-spectrum ml-3 align-super font-serif text-[0.25em] italic tracking-normal">
              ({String(galleryImages.length).padStart(2, '0')})
            </sup>
          </h2>

          {/* Filters */}
          <div data-reveal className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-end lg:pb-4">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                data-active={category === c.key}
                className={`link-line text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
                  category === c.key ? 'text-[var(--cream)]' : 'text-[var(--cream-30)] hover:text-[var(--cream-70)]'
                }`}
              >
                {c.label}
                <sup className="ml-1 font-serif italic tracking-normal text-[var(--terracotta)]">
                  {counts[c.key]}
                </sup>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          {filtered.map((image, index) => {
            const layout = LAYOUT[index % LAYOUT.length];
            return (
              <figure
                key={image.id}
                data-g-item
                className={`bloom group cursor-pointer ${layout.span} ${layout.offset}`}
                data-cursor-label="Vezi"
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
              >
                <div
                  className={`relative overflow-hidden ${
                    image.ratio === '2/3' ? 'aspect-[2/3]' : 'aspect-[4/5]'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={`${image.title} — ${CATEGORY_ALT[image.category]} București, Din Culori`}
                    loading="lazy"
                    className="bloom-img h-full w-full object-cover group-hover:scale-[1.045]"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between border-b border-[var(--hairline-soft)] pb-3">
                  <span className="flex items-baseline gap-3">
                    <span className="font-display text-xs text-[var(--cream-30)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-lg italic text-[var(--cream)]">{image.title}</span>
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--cream-30)]">
                    {CATEGORIES.find((c) => c.key === image.category)?.label}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={filtered.map((img) => ({ src: img.src }))}
      />
    </section>
  );
}
