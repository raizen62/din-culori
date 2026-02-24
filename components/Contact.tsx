'use client';

import { motion } from 'framer-motion';
import { Phone, Instagram, MessageCircle, MapPin } from 'lucide-react';

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
  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: '#0c0b09' }}
    >
      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          opacity: 0.04,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Decorative concentric rings */}
      <div aria-hidden="true" className="absolute right-[-80px] top-1/2 -translate-y-1/2 pointer-events-none">
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
              borderColor: `rgba(255,255,255,${0.025 + i * 0.01})`,
            }}
          />
        ))}
      </div>

      {/* Faint warm glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,130,95,0.06) 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      <div className="container mx-auto px-6 lg:px-16 py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left: Heading block */}
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-xs uppercase tracking-[0.35em] mb-8 font-medium"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Să lucrăm împreună
            </p>

            <h2
              className="leading-[0.88] mb-8"
              style={{
                fontFamily: 'var(--font-shinier)',
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                color: '#f5f0eb',
                letterSpacing: '-0.02em',
              }}
            >
              Contactează-<br />mă
            </h2>

            {/* Terracotta rule */}
            <motion.div
              className="h-px w-14 mb-8"
              style={{ background: '#d4825f' }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />

            <p
              className="text-lg leading-relaxed max-w-sm"
              style={{ color: 'rgba(245,240,235,0.45)' }}
            >
              Ai un proiect în minte? Contactează-mă prin telefon, WhatsApp sau
              Instagram și hai să discutăm!
            </p>

            <div
              className="mt-12 flex items-center gap-2.5"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              <MapPin size={13} strokeWidth={1.5} />
              <span className="text-sm tracking-wide">București, România</span>
            </div>
          </motion.div>

          {/* Right: Contact rows */}
          <div className="lg:col-span-7 flex flex-col">
            {CONTACT_METHODS.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 + index * 0.13,
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative flex items-center justify-between gap-6 py-8 px-6 transition-colors duration-300"
                  style={{
                    borderTop: index === 0 ? '1px solid rgba(255,255,255,0.08)' : undefined,
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Left accent bar — slides in on hover */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
                    style={{ background: method.accent }}
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  />

                  {/* Subtle hover background */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, ${method.accent}08 0%, transparent 60%)`,
                    }}
                  />

                  {/* Icon + text */}
                  <div className="relative flex items-center gap-5">
                    <div
                      className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${method.accent}18`,
                        color: method.accent,
                      }}
                    >
                      <Icon size={20} strokeWidth={1.6} />
                    </div>

                    <div>
                      <p
                        className="text-[11px] uppercase tracking-[0.25em] mb-1 font-medium"
                        style={{ color: 'rgba(255,255,255,0.35)' }}
                      >
                        {method.title}
                      </p>
                      <p
                        className="text-xl font-medium leading-tight mb-0.5"
                        style={{ color: '#f5f0eb' }}
                      >
                        {method.value}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: 'rgba(245,240,235,0.35)' }}
                      >
                        {method.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className="relative flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: 'rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    <motion.svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path
                        d="M2 7h10M7 2l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </div>
                </motion.a>
              );
            })}

            {/* Bottom tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 text-sm"
              style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.05em' }}
            >
              Răspund de obicei în aceeași zi.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
