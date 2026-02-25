'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Camera, Gift, Monitor, Sparkles, Check, Star, Package, Award, Crown, TrendingUp, Cake, X } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const PHOTOBOOTH_SLIDES = [
  { id: 1, src: '/photobooth.jpeg', alt: 'Photobooth Premium', format: '10x15' },
  { id: 2, src: '/photobooth_strip1.png', alt: 'Photobooth Strip', format: 'strip' },
];

export default function Photobooth() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Close lightbox on Escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxImage) {
        setLightboxImage(null);
      }
    };

    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [lightboxImage]);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      const navHeight = 72;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const renderFeature = (feature: string) => {
    const hasUpgrade = feature.includes('(upgraded)');
    const cleanText = feature.replace(' (upgraded)', '');
    return (
      <>
        {cleanText}
        {hasUpgrade && (
          <TrendingUp className="inline-block w-3.5 h-3.5 ml-1.5 text-amber-400 -mt-0.5" />
        )}
      </>
    );
  };

  const features = [
    {
      icon: Camera,
      title: 'Poze nelimitate',
      description: 'Fotografiază-te cât vrei, fără limite',
    },
    {
      icon: Gift,
      title: 'Magneti și plicuri',
      description: 'Fiecare fotografie vine cu magnet și plic personalizat',
    },
    {
      icon: Monitor,
      title: 'Ecran de prezentare',
      description: 'Vezi în timp real fotografiile tale pe ecran mare',
    },
    {
      icon: Sparkles,
      title: 'Fundal premium',
      description: 'Fundal profesional pentru cele mai frumoase fotografii',
    }
  ];

  const pricingTiers = [
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
        'Accesorii fizice: 15 buc'
      ]
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
        'Accesorii fizice: 15 buc'
      ]
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
        'Reducere eveniment viitor: 10%'
      ]
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
        'Social Share Station'
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="photobooth"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-950"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Elegant Gradient Orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 relative z-10">
        {/* Refined Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-400/10 border border-amber-400/30 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-200 font-medium text-sm tracking-wide uppercase">Premium Experience</span>
          </div>

          <h2
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-6 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Photobooth
            <span className="block font-normal bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent mt-2">
              Premium
            </span>
          </h2>
          <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
            Oferim servicii complete de photobooth pentru evenimentul tău,
            cu echipament profesional și rezultate de calitate superioară
          </p>
        </motion.div>

        {/* Dual Format Showcase - Side by Side */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            {/* Strip Format - Left Side */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group cursor-pointer"
                onClick={() => setLightboxImage({ src: '/photobooth_strip1.png', alt: '2×6 Strip Format' })}
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-amber-400/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative w-32 md:w-40 lg:w-44 group-hover:scale-105 transition-transform duration-300">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10" style={{ aspectRatio: '2/6' }}>
                    <Image
                      src="/photobooth_strip1.png"
                      alt="2×6 Strip Format"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg whitespace-nowrap">
                    2×6 Strip
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Center Content */}
            <div className="lg:col-span-6 text-center px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="inline-block relative">
                  <div
                    className="text-6xl md:text-7xl lg:text-8xl font-light text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-100 to-white mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Două Formate
                  </div>
                  <div className="h-1 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8" />
                </div>
                <p className="text-purple-200 text-lg max-w-md mx-auto leading-relaxed">
                  Oferim flexibilitatea de a alege între format clasic 10×15 sau modernul strip 2×6,
                  perfect pentru orice stil de eveniment
                </p>
              </motion.div>
            </div>

            {/* 10×15 Format - Right Side */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative group cursor-pointer"
                onClick={() => setLightboxImage({ src: '/photobooth.jpeg', alt: '10×15 Photo Format' })}
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/20 to-amber-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative w-56 md:w-64 lg:w-72">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-300">
                    <div style={{ aspectRatio: '15/10' }}>
                      <Image
                        src="/photobooth.jpeg"
                        alt="10×15 Photo Format"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg whitespace-nowrap">
                    10×15 Photo
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Premium Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/50 to-amber-500/50 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-amber-400/20 to-purple-600/20 mb-6">
                    <feature.icon className="w-7 h-7 text-amber-300" />
                  </div>
                  <h3
                    className="text-2xl font-light text-white mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h3
              className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Pachete
            </h3>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8" />
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Pachete flexibile adaptate nevoilor tale
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={`relative group ${tier.popular ? 'md:scale-105' : ''}`}
              >
                {/* Glow Effect for Popular */}
                {tier.popular && (
                  <div className="absolute -inset-1 bg-gradient-to-br from-amber-500 via-purple-500 to-pink-500 rounded-3xl opacity-40 blur-xl group-hover:opacity-60 transition-opacity duration-500" />
                )}

                <div className={`relative h-full flex flex-col bg-white/5 backdrop-blur-md border ${tier.popular ? 'border-amber-400/50' : 'border-white/10'
                  } rounded-3xl p-8 hover:bg-white/10 transition-all duration-300`}>

                  {/* Popular Badge */}
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-xl">
                      <Star className="w-4 h-4 fill-current" />
                      Populară
                    </div>
                  )}

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-purple-600/20 mb-6">
                    <tier.icon className="w-7 h-7 text-amber-300" />
                  </div>

                  {/* Title */}
                  <h4
                    className="text-3xl font-light text-white mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {tier.name}
                  </h4>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-5xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-white"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {tier.price}
                      </span>
                      <span className="text-xl text-purple-300">lei</span>
                    </div>
                    <p className="text-purple-300 text-sm mt-1">{tier.duration}</p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400/30 to-purple-600/30 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-amber-300" />
                        </div>
                        <span className="text-purple-100 leading-relaxed">
                          {renderFeature(feature)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#contact"
                    onClick={handleContactClick}
                    className={`block w-full py-4 rounded-xl font-semibold text-center transition-all duration-300 ${tier.popular
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30'
                      }`}
                  >
                    Solicită ofertă
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm px-4"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 max-h-[85vh]">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[85vh] w-auto h-auto"
                />
              </div>

              {/* Caption */}
              <div className="mt-6 text-center">
                <p className="text-white text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {lightboxImage.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
