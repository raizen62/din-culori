import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Manifesto from '@/components/Manifesto';
import Photobooth from '@/components/Photobooth';
import Corporate from '@/components/Corporate';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--ink)]">
      <Hero />
      <Marquee />
      <Manifesto />
      <Photobooth />
      <Corporate />
      <Gallery />
      <About />
      <Contact />
    </main>
  );
}
