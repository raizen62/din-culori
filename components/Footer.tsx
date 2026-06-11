'use client';

import { useRef } from 'react';
import { Instagram, Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { useGSAP, revealWithin } from '@/lib/animations';
import { scrollToId, getLenis } from '@/lib/scroll';

const FOOTER_LINKS = [
  { name: 'Photobooth', id: 'photobooth' },
  { name: 'Galerie', id: 'gallery' },
  { name: 'Despre mine', id: 'about' },
  { name: 'Contact', id: 'contact' },
];

const SOCIALS = [
  { icon: Phone, href: 'tel:+40726221081', label: 'Telefon' },
  { icon: MessageCircle, href: 'https://wa.me/40726221081', label: 'WhatsApp' },
  { icon: Instagram, href: 'https://instagram.com/din.culori', label: 'Instagram' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealWithin(footerRef.current!);
    },
    { scope: footerRef }
  );

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-[var(--ink)]">
      <div className="spectrum-line h-px w-full" />

      <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-20 md:px-12 md:pt-28">
        {/* CTA row */}
        <div data-reveal className="mb-16 flex flex-col items-start justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <p className="max-w-md font-serif text-2xl italic leading-snug text-[var(--cream-70)] md:text-3xl">
            Hai să creăm ceva <span className="text-spectrum">frumos</span> împreună.
          </p>
          <div className="flex items-center gap-8">
            <button
              onClick={() => scrollToId('contact')}
              className="link-line text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--cream)]"
            >
              Începe un proiect
            </button>
            <button
              onClick={toTop}
              aria-label="Înapoi sus"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] text-[var(--cream-50)] transition-colors duration-300 hover:border-[var(--cream)] hover:text-[var(--cream)]"
            >
              <ArrowUp size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Giant wordmark — fills with the spectrum on hover */}
        <div data-reveal className="group relative mb-16 select-none md:mb-20" aria-hidden="true">
          <p className="text-stroke-cream whitespace-nowrap text-center font-display text-[clamp(3.2rem,11.5vw,11rem)] uppercase leading-[0.9] opacity-90">
            Din Culori
          </p>
          <p className="text-spectrum absolute inset-0 whitespace-nowrap text-center font-display text-[clamp(3.2rem,11.5vw,11rem)] uppercase leading-[0.9] opacity-0 transition-opacity duration-700 group-hover:opacity-100">
            Din Culori
          </p>
        </div>

        {/* Bottom meta */}
        <div data-reveal className="flex flex-col gap-8 border-t border-[var(--hairline-soft)] pt-8 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Linkuri footer">
            {FOOTER_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToId(link.id)}
                className="link-line text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--cream-50)] transition-colors hover:text-[var(--cream)]"
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={social.label}
                className="text-[var(--cream-50)] transition-colors duration-300 hover:text-[var(--terracotta)]"
              >
                <social.icon size={18} strokeWidth={1.5} />
              </a>
            ))}
            <span className="text-sm text-[var(--cream-30)]">+40 726 221 081</span>
          </div>

          <p className="text-[11px] tracking-wide text-[var(--cream-30)]">
            © {new Date().getFullYear()} Din Culori —{' '}
            <span className="font-serif italic">fotograf, București</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
