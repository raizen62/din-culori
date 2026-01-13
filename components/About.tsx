'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square rounded-lg overflow-hidden"
          >
            {/* Placeholder - Replace with your photo */}
            <div className="w-full h-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <Image src="/poza-profil.jpg" alt="About Me" width={500} height={500} />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Despre mine</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Bine ai venit la Din Culori, unde fiecare fotografie spune o poveste unică prin lentila creativității și a pasiunii. Cu ani de experiență în surprinderea celor mai prețioase momente ale vieții, sunt specializat în crearea unor imagini atemporale, pe care le vei prețui pentru totdeauna.
              </p>
              <p>
                Abordarea mea în fotografie este simplă: autenticitatea întâlnește arta. Fie că este vorba de o nuntă, o ședință foto de portret sau o aventură în natură, cred în surprinderea emoțiilor reale și în crearea unor povești vizuale care să rezoneze.
              </p>
              <p>
                Cu sediul în România, sunt disponibil pentru proiecte oriunde în lume. Hai să lucrăm împreună pentru a crea ceva frumos.
              </p>
            </div>

            {/* <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">500+</h3>
                <p className="text-gray-600">Proiecte</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">5+</h3>
                <p className="text-gray-600">Ani</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">300+</h3>
                <p className="text-gray-600">Clienti</p>
              </div>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
