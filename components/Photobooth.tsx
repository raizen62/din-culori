'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import {
  Camera,
  Gift,
  Monitor,
  Sparkles,
  Star,
  Package,
  Award,
  Crown,
  TrendingUp,
  Cake,
} from 'lucide-react';
import { useGSAP, revealWithin } from '@/lib/animations';
import { scrollToId } from '@/lib/scroll';

const FEATURES = [
  { icon: Camera, title: 'Poze nelimitate', description: 'Fotografiază-te cât vrei, fără limite' },
  { icon: Gift, title: 'Magneți și plicuri', description: 'Fiecare fotografie vine cu magnet și plic personalizat' },
  { icon: Monitor, title: 'Ecran de prezentare', description: 'Vezi în timp real fotografiile tale pe ecran mare' },
  { icon: Sparkles, title: 'Fundal premium', description: 'Fundal profesional pentru cele mai frumoase fotografii' },
];

const PRICING_TIERS = [
  {
    name: 'Kids party',
    duration: '2 ore',
    price: '800',
    icon: Cake,
    popular: false,
    features: [
      'Poze printate si digitale nelimitate',
      'Asistent foto',
      'Integrare trimitere poze pe email',
      'Galerie online cu parola 1 luna',
      'Tip poza: Un singur model (Collage sau Strips)',
      'Design poza personalizat',
      'Fundal poza: Textil',
      'Accesorii fizice: 15 buc',
    ],
  },
  {
    name: 'Basic',
    duration: '4 ore',
    price: '1000',
    icon: Package,
    popular: false,
    features: [
      'Poze printate si digitale nelimitate',
      'Asistent foto',
      'Integrare trimitere poze pe email',
      'Galerie online cu parola 1 luna',
      'Tip poza: Un singur model (Collage sau Strips)',
      'Design poza personalizat',
      'Fundal poza: Textil',
      'Accesorii fizice: 15 buc',
    ],
  },
  {
    name: 'Standard',
    duration: '6 ore',
    price: '1250',
    icon: Award,
    popular: true,
    features: [
      'Toate din Basic',
      'Galerie online cu parola 2 luni (upgraded)',
      'Tip poza: Un singur model (Collage, Strips sau Single)',
      'Design poza personalizat',
      'Fundal poza: Textil/Digital',
      'Accesorii fizice: 30 buc',
      'Plicuri pentru poze: nelimitat',
      'Benzi magnetice: Nelimitat',
      'Placute cu mesaje: Standard',
      'GIF',
      'Reducere eveniment viitor: 10%',
    ],
  },
  {
    name: 'Premium',
    duration: '8 ore',
    price: '1500',
    icon: Crown,
    popular: false,
    features: [
      'Toate din Standard',
      'Galerie online cu parola 3 luni (upgraded)',
      'Tip poza: Orice Combinatie (Collage, Strips sau Single)',
      'Design poza personalizat: Unicat',
      'Accesorii fizice: 60 buc (upgraded)',
      'Placute cu mesaje: 10 buc. personalizate',
      'Reducere eveniment viitor: 20% (upgraded)',
      'Ecran 27 inch',
      'Accesorii digitale',
      'Design Ecran',
      'Social Share Station',
    ],
  },
];

function renderFeature(feature: string) {
  const hasUpgrade = feature.includes('(upgraded)');
  const cleanText = feature.replace(' (upgraded)', '');
  return (
    <>
      {cleanText}
      {hasUpgrade && <TrendingUp className="-mt-0.5 ml-1.5 inline-block h-3 w-3 text-[var(--terracotta)]" />}
    </>
  );
}

export default function Photobooth() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useGSAP(
    () => {
      revealWithin(sectionRef.current!);
    },
    { scope: sectionRef }
  );

  const formatSlides = [
    { src: '/photobooth.jpeg', title: 'Format clasic 10×15' },
    { src: '/photobooth_strip1.png', title: 'Format strip 2×6' },
  ];

  return (
    <section
      ref={sectionRef}
      id="photobooth"
      className="relative overflow-hidden border-t border-[var(--hairline-soft)] bg-[var(--ink-2)] py-28 md:py-40"
    >
      {/* Faint warm glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[560px] w-[560px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(212,130,95,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
        {/* Header */}
        <div data-reveal className="mb-10 flex items-center gap-4">
          <span className="spectrum-line h-px w-10" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--cream-50)]">
            02 — Servicii
          </span>
        </div>

        <div className="mb-16 grid gap-10 md:mb-24 lg:grid-cols-2 lg:items-end">
          <h2 data-reveal className="font-display text-[clamp(3.4rem,9vw,8.5rem)] uppercase leading-[0.9] text-[var(--cream)]">
            Photo
            <wbr />
            booth
            <span className="text-spectrum mt-1 block font-serif text-[0.32em] lowercase italic leading-none tracking-normal">
              premium
            </span>
          </h2>
          <p data-reveal data-reveal-delay="0.1" className="max-w-md text-base leading-relaxed text-[var(--cream-50)] lg:justify-self-end lg:pb-4">
            Servicii complete de photobooth pentru evenimentul tău — echipament profesional, accesorii
            și amintiri printate pe loc, în două formate.
          </p>
        </div>

        {/* Formats showcase */}
        <div className="mb-20 grid gap-10 md:mb-28 md:grid-cols-12 md:items-end">
          <button
            data-reveal
            data-cursor-label="Vezi"
            onClick={() => setLightboxIndex(0)}
            className="bloom in-bloom group relative text-left md:col-span-7"
            aria-label="Vezi formatul clasic 10×15"
          >
            <div className="overflow-hidden">
              <Image
                src="/photobooth.jpeg"
                alt="Photobooth format clasic 10×15 - Din Culori București"
                width={1200}
                height={800}
                className="bloom-img h-auto w-full object-cover group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between border-b border-[var(--hairline-soft)] pb-3">
              <span className="font-serif text-lg italic text-[var(--cream)]">Format clasic</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--cream-30)]">
                10×15 cm
              </span>
            </div>
          </button>

          <button
            data-reveal
            data-reveal-delay="0.12"
            data-cursor-label="Vezi"
            onClick={() => setLightboxIndex(1)}
            className="bloom in-bloom group relative mx-auto w-44 text-left md:col-span-5 md:w-52 md:-rotate-2 md:justify-self-center lg:w-56"
            aria-label="Vezi formatul strip 2×6"
          >
            <div className="overflow-hidden border-[6px] border-[var(--cream)] bg-[var(--cream)]">
              <Image
                src="/photobooth_strip1.png"
                alt="Photobooth format strip 2×6 - Din Culori București"
                width={400}
                height={1200}
                className="bloom-img h-auto w-full object-cover group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-serif text-lg italic text-[var(--cream)]">Strip modern</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--cream-30)]">
                2×6&Prime;
              </span>
            </div>
          </button>
        </div>

        {/* Features — numbered hairline grid */}
        <div className="mb-20 grid border-t border-[var(--hairline-soft)] md:mb-28 md:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              data-reveal
              data-reveal-delay={String(i * 0.08)}
              className="border-b border-[var(--hairline-soft)] px-1 py-8 md:border-r md:px-7 md:py-10 md:first:pl-1 md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"
            >
              <div className="mb-6 flex items-center justify-between">
                <feature.icon className="h-5 w-5 text-[var(--terracotta)]" strokeWidth={1.5} />
                <span className="font-display text-sm text-[var(--cream-30)]">0{i + 1}</span>
              </div>
              <h3 className="mb-2 font-serif text-xl italic text-[var(--cream)]">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--cream-50)]">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div data-reveal className="mb-12 flex flex-wrap items-baseline justify-between gap-4 md:mb-16">
          <h3 className="font-display text-[clamp(2.6rem,6vw,5rem)] uppercase leading-none text-[var(--cream)]">
            Pachete
          </h3>
          <p className="font-serif italic text-[var(--cream-50)]">flexibile, adaptate evenimentului tău</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PRICING_TIERS.map((tier, index) => (
            <div
              key={tier.name}
              data-reveal
              data-reveal-delay={String(index * 0.08)}
              className={`relative flex flex-col border p-7 transition-colors duration-500 ${
                tier.popular
                  ? 'border-[var(--terracotta)] bg-[var(--ink-3)]'
                  : 'border-[var(--hairline)] bg-transparent hover:bg-[rgba(243,238,229,0.02)]'
              }`}
            >
              {tier.popular && (
                <>
                  <div className="spectrum-line absolute inset-x-[-1px] top-[-1px] h-[2px]" />
                  <div className="absolute -top-3 right-6 flex items-center gap-1.5 bg-[var(--terracotta)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--ink)]">
                    <Star className="h-2.5 w-2.5 fill-current" />
                    Populară
                  </div>
                </>
              )}

              <div className="mb-7 flex items-start justify-between">
                <div>
                  <h4 className="font-display text-2xl uppercase leading-none text-[var(--cream)]">
                    {tier.name}
                  </h4>
                  <p className="mt-2 font-serif italic text-sm text-[var(--cream-50)]">{tier.duration}</p>
                </div>
                <tier.icon className="h-5 w-5 text-[var(--terracotta)]" strokeWidth={1.5} />
              </div>

              <div className="mb-7 flex items-baseline gap-2 border-b border-[var(--hairline-soft)] pb-7">
                <span className="font-display text-5xl leading-none text-[var(--cream)]">{tier.price}</span>
                <span className="font-serif italic text-[var(--cream-50)]">lei</span>
              </div>

              <ul className="mb-8 flex-1 space-y-2.5">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[var(--cream-70)]">
                    <span className="mt-px font-serif italic text-[var(--terracotta)]">+</span>
                    <span>{renderFeature(feature)}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToId('contact')}
                className={`w-full py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] transition-all duration-300 ${
                  tier.popular
                    ? 'bg-[var(--terracotta)] text-[var(--ink)] hover:bg-[var(--cream)]'
                    : 'border border-[var(--hairline)] text-[var(--cream)] hover:border-[var(--cream)] hover:bg-[var(--cream)] hover:text-[var(--ink)]'
                }`}
              >
                Solicită ofertă
              </button>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={Math.max(lightboxIndex, 0)}
        slides={formatSlides}
      />
    </section>
  );
}
