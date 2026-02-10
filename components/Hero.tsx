'use client';

import { motion } from 'framer-motion';
import HeroCarousel from './HeroCarousel';

const HERO_SLIDES = [
  {
    id: 2,
    src: '/images/carousel/carousel_2.jpg',
    alt: 'Fotografie profesională de nuntă București - Momentele tale speciale capturate artistic de Din Culori'
  },
  {
    id: 1,
    src: '/images/carousel/carousel_1.jpg',
    alt: 'Portret profesional București - Fotografie artistică și creativă de calitate superioară'
  },
  {
    id: 3,
    src: '/images/carousel/carousel_3.jpg',
    alt: 'Fotograf evenimente București - Servicii foto profesionale pentru momente de neuitat'
  },
  {
    id: 4,
    src: '/images/carousel/carousel_4.jpg',
    alt: 'Ședință foto creativă București - Fotografie artistică cu atenție la detalii'
  },
  {
    id: 5,
    src: '/images/carousel/carousel_5.jpg',
    alt: 'Fotografie de nuntă naturală și emoțională - Din Culori Photography București'
  },
  {
    id: 6,
    src: '/images/carousel/carousel_6.jpg',
    alt: 'Povestea ta în imagini - Fotograf profesionist specializat în evenimente speciale'
  },
];

export default function Hero() {
  const handleGalleryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('gallery');
    if (targetElement) {
      const navHeight = 72;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel Layer */}
      <div className="absolute inset-0 z-0">
        <HeroCarousel slides={HERO_SLIDES} autoplayInterval={5000} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 font-shinier">
            Din Culori
          </h1>

          <p className="text-xl md:text-2xl font-light tracking-wide mb-4 max-w-2xl mx-auto">
            Din culori, creez amintiri.
          </p>
          <p className="text-lg md:text-xl font-light tracking-wide mb-8 max-w-3xl mx-auto">
            Fotograf specializat în nunți, portrete, evenimente și ședințe foto creative în București și România
          </p>
          <motion.a
            href="#gallery"
            onClick={handleGalleryClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:opacity-90 transition-all shadow-lg"
          >
            Vezi galerie
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-3 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
