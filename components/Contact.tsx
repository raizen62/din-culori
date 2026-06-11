'use client';

import { useRef } from 'react';
import { Phone, Instagram, MessageCircle, MapPin } from 'lucide-react';
import { useGSAP, revealWithin } from '@/lib/animations';

const CONTACT_METHODS = [
  {
    icon: Phone,
    title: 'Telefon',
    value: '+40 726 221 081',
    href: 'tel:+40726221081',
    description: 'Sună-mă direct pentru o discuție',
    accent: '#d4825f',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+40 726 221 081',
    href: 'https://wa.me/40726221081',
    description: 'Trimite-mi un mesaj oricând',
    accent: '#4caf82',
  },
  {
    icon: Instagram,
    title: 'Instagram',
    value: '@din.culori',
    href: 'https://instagram.com/din.culori',
    description: 'Urmărește ultimele lucrări',
    accent: '#c96bc9',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealWithin(sectionRef.current!);
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[var(--hairline-soft)] bg-[var(--ink-2)]"
    >
      {/* Decorative concentric rings */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[-80px] top-1/2 -translate-y-1/2">
        {[640, 480, 320, 160].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border"
            style={{
              width: size,
              height: size,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderColor: `rgba(243,238,229,${0.03 + i * 0.012})`,
            }}
          />
        ))}
      </div>

      {/* Faint warm glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,130,95,0.07) 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Left: Heading block */}
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <div data-reveal className="mb-10 flex items-center gap-4">
              <span className="spectrum-line h-px w-10" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--cream-50)]">
                05 — Să lucrăm împreună
              </span>
            </div>

            <h2
              data-reveal
              className="mb-8 font-display text-[clamp(2.4rem,5.2vw,4.8rem)] uppercase leading-[0.9] text-[var(--cream)]"
            >
              Contactează-mă
              <span className="text-spectrum block font-serif text-[0.4em] lowercase italic leading-[1.2] tracking-normal">
                hai să vorbim
              </span>
            </h2>

            <p data-reveal className="max-w-sm text-base leading-relaxed text-[var(--cream-50)]">
              Ai un proiect în minte? Contactează-mă prin telefon, WhatsApp sau Instagram și hai să
              discutăm!
            </p>

            <div data-reveal className="mt-12 flex items-center gap-2.5 text-[var(--cream-30)]">
              <MapPin size={13} strokeWidth={1.5} />
              <span className="text-sm tracking-wide">București, România</span>
            </div>
          </div>

          {/* Right: Contact rows */}
          <div className="flex flex-col lg:col-span-7">
            {CONTACT_METHODS.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  data-reveal
                  data-reveal-delay={String(index * 0.1)}
                  className="group relative flex items-center justify-between gap-6 border-b border-[var(--hairline-soft)] px-4 py-8 transition-colors duration-300 first:border-t md:px-6"
                >
                  {/* Accent bar slides in on hover */}
                  <div
                    className="absolute bottom-0 left-0 top-0 w-[2px] origin-top scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100"
                    style={{ background: method.accent }}
                  />
                  {/* Subtle hover wash */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, ${method.accent}0a 0%, transparent 60%)` }}
                  />

                  <div className="relative flex items-center gap-5">
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${method.accent}1a`, color: method.accent }}
                    >
                      <Icon size={20} strokeWidth={1.6} />
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--cream-30)]">
                        {method.title}
                      </p>
                      <p className="mb-0.5 text-xl font-medium leading-tight text-[var(--cream)]">
                        {method.value}
                      </p>
                      <p className="font-serif italic text-sm text-[var(--cream-50)]">{method.description}</p>
                    </div>
                  </div>

                  <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[var(--hairline)] text-[var(--cream-30)] transition-colors duration-300 group-hover:border-[var(--cream-50)] group-hover:text-[var(--cream)]">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      <path
                        d="M2 7h10M7 2l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
              );
            })}

            <p data-reveal className="mt-10 font-serif italic text-sm tracking-wide text-[var(--cream-30)]">
              Răspund de obicei în aceeași zi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
