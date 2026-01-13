'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Photobooth from '@/components/Photobooth';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Photobooth />
      <Gallery />
      <About />
      <Contact />
    </main>
  );
}
