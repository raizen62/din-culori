'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Camera, Images, Megaphone, MessageCircle, Phone } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP, revealWithin } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/scroll';

const WHATSAPP_MESSAGE =
  'Bună ziua! Aș dori o ofertă pentru un eveniment corporate.\n' +
  'Servicii dorite (fotograf / photobooth / ambele):\nTip eveniment:\nData:\nLocație:\nDurată estimată:\nNumăr participanți:';
const WHATSAPP_HREF = `https://wa.me/40726221081?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const PHOTOBOOTH_MESSAGE =
  'Bună ziua! Aș dori o ofertă pentru photobooth la un eveniment corporate.\n' +
  'Tip eveniment:\nData:\nLocație:\nDurată estimată:\nNumăr participanți:\nLogo / culori brand: le trimit separat';
const PHOTOBOOTH_WHATSAPP_HREF = `https://wa.me/40726221081?text=${encodeURIComponent(PHOTOBOOTH_MESSAGE)}`;
const PHONE_HREF = 'tel:+40726221081';

const EVENT_TYPES = [
  { title: 'Conferințe & summit-uri', description: 'Speakeri, paneluri, networking și atmosfera din sală' },
  { title: 'Team building', description: 'Energia echipei, surprinsă natural, fără poze înțepenite' },
  { title: 'Gale & petreceri', description: 'Petreceri de Crăciun, aniversări de companie, premieri' },
  { title: 'Lansări de produs', description: 'Momentul reveal, produsul în prim-plan, reacțiile invitaților' },
  { title: 'Activări de brand', description: 'Festivaluri, târguri și standuri cu identitatea brandului' },
];

const DELIVERABLES = [
  { icon: Camera, title: 'Acoperire completă', description: 'De la sosirea invitaților până la ultimul toast — momentele care contează pentru brand.' },
  { icon: Images, title: 'Galerie online privată', description: 'Fotografii editate, gata de descărcat și distribuit în toată echipa.' },
  { icon: Megaphone, title: 'Pregătite pentru PR', description: 'Selecții pentru comunicate, social media și newsletter-ul intern.' },
];

// Mirrors what the Photobooth packages already include, framed for companies.
const PHOTOBOOTH_PERKS = [
  'Design de poză cu logo-ul și culorile companiei',
  'Poze printate și digitale nelimitate, pe loc',
  'Fundal textil sau digital, adaptat brandului',
  'Accesorii fizice și plăcuțe cu mesaje personalizate',
  'Ecran de prezentare și Social Share Station',
  'Galerie online cu parolă pentru toți invitații',
];

const PHOTOBOOTH_USES = ['Petreceri de Crăciun', 'Team building', 'Lansări de produs', 'Târguri & standuri'];

const PROCESS = [
  { step: '01', title: 'Discutăm', description: 'Îmi spui despre eveniment: data, locația, programul și ce vrei să obții.' },
  { step: '02', title: 'Ofertă personalizată', description: 'Primești o ofertă construită exact pe nevoile tale — fără pachete fixe.' },
  { step: '03', title: 'Ziua evenimentului', description: 'Lucrez discret, în ritmul evenimentului, fără să deranjez invitații.' },
  { step: '04', title: 'Livrare', description: 'Fotografiile editate ajung în galeria ta online, gata de folosit.' },
];

const QUOTE_CHECKLIST = ['Fotograf, photobooth sau ambele', 'Tipul evenimentului', 'Data și locația', 'Durata estimată', 'Numărul de participanți'];

export default function Corporate() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current!;
      revealWithin(section);

      const blooms = gsap.utils.toArray<HTMLElement>('[data-bloom]', section);
      if (prefersReducedMotion()) {
        blooms.forEach((el) => el.classList.add('in-bloom'));
        return;
      }

      // Photos develop into color as they cross the viewport center.
      blooms.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 72%',
          end: 'bottom 18%',
          toggleClass: { targets: el, className: 'in-bloom' },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-parallax]', section).forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -parseFloat(el.dataset.parallax ?? '0') },
          {
            yPercent: parseFloat(el.dataset.parallax ?? '0'),
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="corporate"
      className="relative overflow-hidden border-t border-[var(--hairline-soft)] bg-[var(--ink)] py-28 md:py-40"
    >
      {/* Faint cool glow — counterweight to the warm Photobooth glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-[30%] h-[620px] w-[620px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(120,140,220,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
        {/* Header */}
        <div data-reveal className="mb-10 flex items-center gap-4">
          <span className="spectrum-line h-px w-10" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--cream-50)]">
            03 — Corporate
          </span>
        </div>

        <div className="mb-16 grid gap-10 md:mb-24 lg:grid-cols-2 lg:items-end">
          <h2 data-reveal className="font-display text-[clamp(3.4rem,9vw,8.5rem)] uppercase leading-[0.9] text-[var(--cream)]">
            Evenimente
            <span className="block text-stroke-cream">corporate</span>
            <span className="text-spectrum mt-2 block font-serif text-[0.32em] lowercase italic leading-none tracking-normal">
              povestea brandului tău, în culori
            </span>
          </h2>
          <p data-reveal data-reveal-delay="0.1" className="max-w-md text-base leading-relaxed text-[var(--cream-50)] lg:justify-self-end lg:pb-4">
            Fotografie de eveniment și photobooth branduit pentru companii care vor imagini cu
            personalitate — nu doar poze de arhivă. Surprind oamenii, energia și detaliile care spun
            cine sunteți, iar invitații pleacă acasă cu o amintire printată.
          </p>
        </div>

        {/* Photo composition */}
        <div className="mb-24 grid gap-6 md:mb-32 md:grid-cols-12 md:items-start">
          <figure data-reveal data-bloom className="bloom group relative md:col-span-8">
            <div className="relative aspect-[3/2] overflow-hidden">
              <div data-parallax="6" className="absolute inset-[-8%_0]">
                <Image
                  src="/images/carousel/carousel_1.jpg"
                  alt="Scenă eveniment corporate cu public - fotografie Din Culori"
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="bloom-img object-cover group-hover:scale-[1.03]"
                />
              </div>
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between border-b border-[var(--hairline-soft)] pb-3">
              <span className="font-serif text-lg italic text-[var(--cream)]">Scenă & public</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--cream-30)]">
                Eveniment live
              </span>
            </figcaption>
          </figure>

          <div className="flex flex-col gap-6 md:col-span-4 md:mt-24">
            <figure data-reveal data-reveal-delay="0.12" data-bloom className="bloom group relative">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/images/carousel/carousel_5.jpg"
                  alt="Concert la un eveniment de brand - fotografie Din Culori"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="bloom-img object-cover group-hover:scale-[1.04]"
                />
              </div>
            </figure>
            <figure data-reveal data-reveal-delay="0.2" data-bloom className="bloom group relative">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/images/carousel/carousel_4.jpg"
                  alt="Stand de brand la un eveniment - fotografie Din Culori"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="bloom-img object-cover group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between border-b border-[var(--hairline-soft)] pb-3">
                <span className="font-serif text-lg italic text-[var(--cream)]">Activări de brand</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--cream-30)]">
                  Detalii
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Event types — big editorial index */}
        <div className="mb-24 md:mb-32">
          <div data-reveal className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="font-display text-[clamp(2.6rem,6vw,5rem)] uppercase leading-none text-[var(--cream)]">
              Ce fotografiez
            </h3>
            <p className="font-serif italic text-[var(--cream-50)]">orice format, orice dimensiune</p>
          </div>

          <ul className="border-t border-[var(--hairline-soft)]">
            {EVENT_TYPES.map((type, i) => (
              <li
                key={type.title}
                data-reveal
                data-reveal-delay={String(i * 0.06)}
                className="group relative border-b border-[var(--hairline-soft)]"
              >
                <span
                  aria-hidden="true"
                  className="spectrum-line absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
                />
                <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-2 py-6 md:grid-cols-[4rem_1fr_minmax(0,24rem)] md:py-8">
                  <span className="font-display text-sm text-[var(--cream-30)]">0{i + 1}</span>
                  <span className="font-display text-[clamp(1.8rem,4.4vw,3.6rem)] uppercase leading-none text-[var(--cream)] transition-all duration-500 group-hover:translate-x-3 group-hover:text-[var(--terracotta)]">
                    {type.title}
                  </span>
                  <span className="col-start-2 font-serif text-base italic text-[var(--cream-50)] md:col-start-3 md:text-right">
                    {type.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Corporate photobooth */}
        <div className="relative mb-24 md:mb-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
            {/* Visual: classic branded print */}
            <div className="relative lg:col-span-6">
              <figure data-reveal data-bloom className="bloom group relative">
                <div className="overflow-hidden">
                  <Image
                    src="/photobooth.jpeg"
                    alt="Photobooth corporate cu print personalizat - Din Culori București"
                    width={1200}
                    height={800}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="bloom-img h-auto w-full object-cover group-hover:scale-[1.04]"
                  />
                </div>
              </figure>
              <div
                data-reveal
                data-reveal-delay="0.25"
                className="absolute -left-2 -top-16 flex h-20 w-20 items-center justify-center sm:-top-12 sm:h-24 sm:w-24 md:-left-3 md:-top-10 md:h-28 md:w-28"
              >
                <span className="flex h-full w-full -rotate-12 items-center justify-center rounded-full bg-[var(--terracotta)] text-center font-display text-[10px] sm:text-[11px] uppercase leading-tight tracking-wide text-[var(--ink)] md:text-xs">
                  Logo-ul
                  <br />
                  tău aici
                </span>
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-6">
              <div data-reveal className="mb-6 flex items-center gap-4">
                <span className="spectrum-line h-px w-10" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--cream-50)]">
                  Și photobooth
                </span>
              </div>
              <h3
                data-reveal
                className="mb-6 font-display text-[clamp(2.6rem,6vw,5rem)] uppercase leading-[0.92] text-[var(--cream)]"
              >
                Photobooth corporate
                <span className="text-spectrum block font-serif text-[0.42em] lowercase italic leading-[1.3] tracking-normal">
                  cu identitatea brandului tău
                </span>
              </h3>
              <p data-reveal className="mb-8 max-w-lg text-base leading-relaxed text-[var(--cream-50)]">
                Cel mai rapid mod de a pune brandul în mâinile invitaților. Fiecare poză iese cu logo-ul
                companiei — colegii o iau acasă, o pun pe birou și o distribuie online.
              </p>

              <ul className="mb-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {PHOTOBOOTH_PERKS.map((perk, i) => (
                  <li
                    key={perk}
                    data-reveal
                    data-reveal-delay={String(i * 0.05)}
                    className="flex items-start gap-2.5 border-b border-[var(--hairline-soft)] pb-3 text-sm leading-relaxed text-[var(--cream-70)]"
                  >
                    <span className="mt-px font-serif italic text-[var(--terracotta)]">+</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div data-reveal className="mb-10 flex flex-wrap gap-2">
                {PHOTOBOOTH_USES.map((use) => (
                  <span
                    key={use}
                    className="rounded-full border border-[var(--hairline)] px-4 py-1.5 font-serif text-sm italic text-[var(--cream-70)]"
                  >
                    {use}
                  </span>
                ))}
              </div>

              <div data-reveal className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={PHOTOBOOTH_WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 whitespace-nowrap bg-[var(--terracotta)] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--cream)]"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                  Cere ofertă photobooth
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-24 grid border-t border-[var(--hairline-soft)] md:mb-32 md:grid-cols-3">
          {DELIVERABLES.map((item, i) => (
            <div
              key={item.title}
              data-reveal
              data-reveal-delay={String(i * 0.08)}
              className="border-b border-[var(--hairline-soft)] px-1 py-8 md:border-r md:px-7 md:py-10 md:first:pl-1 md:last:border-r-0"
            >
              <div className="mb-6 flex items-center justify-between">
                <item.icon className="h-5 w-5 text-[var(--terracotta)]" strokeWidth={1.5} />
                <span className="font-display text-sm text-[var(--cream-30)]">0{i + 1}</span>
              </div>
              <h4 className="mb-2 font-serif text-xl italic text-[var(--cream)]">{item.title}</h4>
              <p className="text-sm leading-relaxed text-[var(--cream-50)]">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mb-24 md:mb-32">
          <div data-reveal className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="font-display text-[clamp(2.6rem,6vw,5rem)] uppercase leading-none text-[var(--cream)]">
              Cum lucrăm
            </h3>
            <p className="font-serif italic text-[var(--cream-50)]">simplu, clar, fără surprize</p>
          </div>

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-8">
            <span aria-hidden="true" className="spectrum-line absolute left-0 right-0 top-[7px] hidden h-px opacity-40 md:block" />
            {PROCESS.map((p, i) => (
              <li key={p.step} data-reveal data-reveal-delay={String(i * 0.1)} className="relative">
                <span className="relative mb-6 block h-[15px] w-[15px] rounded-full border border-[var(--cream-50)] bg-[var(--ink)]">
                  <span className="absolute inset-[4px] rounded-full bg-[var(--terracotta)]" />
                </span>
                <span className="mb-3 block font-display text-5xl leading-none text-stroke-cream">{p.step}</span>
                <h4 className="mb-2 font-serif text-xl italic text-[var(--cream)]">{p.title}</h4>
                <p className="max-w-xs text-sm leading-relaxed text-[var(--cream-50)]">{p.description}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Quote CTA */}
        <div data-reveal className="relative overflow-hidden border border-[var(--hairline)] bg-[var(--ink-2)]">
          <div className="spectrum-line absolute inset-x-0 top-0 h-[2px]" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(212,130,95,0.1) 0%, transparent 70%)' }}
          />

          <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--cream-50)]">
                Preț
              </p>
              <h3 className="mb-6 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] uppercase leading-[0.92] text-[var(--cream)]">
                Ofertă personalizată
                <span className="text-spectrum block font-serif text-[0.42em] lowercase italic leading-[1.3] tracking-normal">
                  după nevoile evenimentului tău
                </span>
              </h3>
              <p className="max-w-lg text-base leading-relaxed text-[var(--cream-50)]">
                Fiecare eveniment corporate e diferit, așa că nu lucrez cu pachete fixe. Scrie-mi câteva
                detalii și îți trimit o ofertă construită exact pe ce ai nevoie.
              </p>
            </div>

            <div className="lg:col-span-5">
              <p className="mb-4 font-serif italic text-[var(--cream-70)]">Ca să-ți răspund rapid, spune-mi:</p>
              <ul className="mb-9 space-y-2.5">
                {QUOTE_CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--cream-70)]">
                    <span className="mt-px font-serif italic text-[var(--terracotta)]">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col 2xl:flex-row">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2.5 bg-[var(--terracotta)] whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--cream)]"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                  Cere ofertă pe WhatsApp
                </a>
                <a
                  href={PHONE_HREF}
                  className="flex flex-1 items-center justify-center gap-2.5 border border-[var(--hairline)] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--cream)] transition-all duration-300 hover:border-[var(--cream)] hover:bg-[var(--cream)] hover:text-[var(--ink)]"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.8} />
                  Sună-mă
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
