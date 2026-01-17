'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Camera, Gift, Monitor, Sparkles, Check, Star, Package, Award, Crown } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function Photobooth() {
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

  const features = [
    {
      icon: Camera,
      title: 'Poze nelimitate',
      description: 'Fotografiază-te cât vrei, fără limite',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Gift,
      title: 'Magneti și plicuri',
      description: 'Fiecare fotografie vine cu magnet și plic personalizat',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Monitor,
      title: 'Ecran de prezentare',
      description: 'Vezi în timp real fotografiile tale pe ecran mare',
      gradient: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Sparkles,
      title: 'Fundal premium',
      description: 'Fundal profesional pentru cele mai frumoase fotografii',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const pricingTiers = [
    {
      name: 'Basic',
      duration: '4 ore',
      price: '700',
      icon: Package,
      popular: false,
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'Poze printate si digitale nelimitate',
        'Asistent foto',
        'Integrare trimitere poze pe email',
        'Galerie online cu parola 1 luna',
        'Tip poza: Un singur model (Collage sau Strips)',
        'Design poza personalizat: Din catalog Basic cu 15+ modele diferite',
        'Fundal poza: Textil',
        'Accesorii fizice: 15 buc'
      ]
    },
    {
      name: 'Standard',
      duration: '6 ore',
      price: '850',
      icon: Award,
      popular: true,
      gradient: 'from-purple-500 to-pink-500',
      features: [
        'All of Basic',
        'Galerie online cu parola 2 luni (upgraded)',
        'Tip poza: Un singur model (Collage, Strips sau Single)',
        'Design poza personalizat: Din catalog Standard + optional poza bebelusul predefinita',
        'Fundal poza: Textil/Digital',
        'Accesorii fizice: 30 buc',
        'Plicuri pentru poze: nelimitat',
        'Benzi magnetice: Nelimitat',
        'Guestbook: Standard',
        'Placute cu mesaje: Standard',
        'GIF',
        'Reducere eveniment viitor: 10%'
      ]
    },
    {
      name: 'Premium',
      duration: '8 ore',
      price: '1000',
      icon: Crown,
      popular: false,
      gradient: 'from-yellow-400 to-orange-500',
      features: [
        'All of Standard',
        'Galerie online cu parola 3 luni (upgraded)',
        'Tip poza: Orice Combinatie (Collage, Strips sau Single)',
        'Design poza personalizat: Unicat + optional poza cu parintii si bebelusul LIVE de la eveniment',
        'Fundal poza: Textil/Premium/Digital',
        'Accesorii fizice: 60 buc',
        'Guestbook: Premium la alegere',
        'Placute cu mesaje: 10 buc. personalizate',
        'Reducere eveniment viitor: 20% (upgraded)',
        'Ecran 27 inch',
        'Accesorii digitale',
        'Design Ecran + Kiosk',
        'Social Share Station'
      ]
    }
  ];

  return (
    <section id="photobooth" className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-purple-900 to-foreground">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-xl"
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Premium Experience</span>
            </div>
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Photobooth
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Premium
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Oferim servicii complete de photobooth pentru evenimentul tău,
            cu echipament profesional și rezultate de calitate superioară
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10"
                 style={{ aspectRatio: '15/10' }}>
              <Image
                src="/photobooth.jpeg"
                alt="Photobooth Premium"
                fill
                className="object-cover"
              />
              {/* Gradient Overlay on Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-6 -right-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-2xl shadow-2xl font-bold text-lg transform rotate-6"
            >
              ✨ Premium
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Icon with Gradient Background */}
                <div className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 relative">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed relative">
                  {feature.description}
                </p>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Alege pachetul potrivit
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Pachete flexibile adaptate nevoilor tale
            </p>
          </div>

          {/* Mobile Carousel - visible only on mobile */}
          <div className="lg:hidden relative -mx-6">
            <Carousel
              opts={{
                align: "center",
                loop: true,
                startIndex: 1,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {pricingTiers.map((tier, index) => (
                  <CarouselItem key={tier.name} className="pl-2 md:pl-4 basis-[85%]">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100
                      }}
                      className={`relative bg-white/10 backdrop-blur-md rounded-3xl border ${
                        tier.popular ? 'border-purple-400/50 shadow-2xl shadow-purple-500/20' : 'border-white/20'
                      } p-8 overflow-hidden group`}
                    >
                      {/* Popular Badge */}
                      {tier.popular && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-bl-2xl rounded-tr-3xl font-bold text-sm flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current" />
                          Populara
                        </div>
                      )}

                      {/* Gradient Accent */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                      {/* Header */}
                      <div className="relative mb-8">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.gradient} mb-4`}>
                          <tier.icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-3xl font-bold text-white mb-2">{tier.name}</h4>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {tier.price}
                          </span>
                          <span className="text-2xl text-gray-400 font-medium">lei</span>
                        </div>
                        <p className="text-gray-400 text-sm">{tier.duration}</p>
                      </div>

                      {/* Features List */}
                      <ul className="space-y-4 relative mb-8">
                        {tier.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-3"
                          >
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${tier.gradient} flex items-center justify-center mt-0.5`}>
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-200 text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <a
                        href="#contact"
                        onClick={handleContactClick}
                        className={`relative block w-full py-4 rounded-xl font-bold text-center transition-all duration-300 ${
                          tier.popular
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
                            : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:border-white/50'
                        }`}
                      >
                        Solicită ofertă
                      </a>

                      {/* Decorative Element */}
                      <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${tier.gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Desktop Grid - visible only on md and above */}
          <div className="hidden lg:grid grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-white/10 backdrop-blur-md rounded-3xl border ${
                  tier.popular ? 'border-purple-400/50 shadow-2xl shadow-purple-500/20' : 'border-white/20'
                } p-8 overflow-hidden group`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-bl-2xl rounded-tr-3xl font-bold text-sm flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Populara
                  </div>
                )}

                {/* Gradient Accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Header */}
                <div className="relative mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.gradient} mb-4`}>
                    <tier.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-2">{tier.name}</h4>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {tier.price}
                    </span>
                    <span className="text-2xl text-gray-400 font-medium">lei</span>
                  </div>
                  <p className="text-gray-400 text-sm">{tier.duration}</p>
                </div>

                {/* Features List */}
                <ul className="space-y-4 relative mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + featureIndex * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${tier.gradient} flex items-center justify-center mt-0.5`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-200 text-sm leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.a
                  href="#contact"
                  onClick={handleContactClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative block w-full py-4 rounded-xl font-bold text-center transition-all duration-300 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
                      : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:border-white/50'
                  }`}
                >
                  Solicită ofertă
                </motion.a>

                {/* Decorative Element */}
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${tier.gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
