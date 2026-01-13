'use client';

import { motion } from 'framer-motion';
import { Phone, Instagram, MessageCircle } from 'lucide-react';

export default function Contact() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Telefon',
      value: '+40 726 221 081',
      href: 'tel:+40726221081',
      description: 'Sună-mă direct',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+40 726 221 081',
      href: 'https://wa.me/40726221081',
      description: 'Trimite-mi un mesaj',
      bgColor: 'bg-green-600',
      hoverColor: 'hover:bg-green-700'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@din.culori',
      href: 'https://instagram.com/din.culori',
      description: 'Urmărește-mă pe Instagram',
      bgColor: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
      hoverColor: 'hover:from-purple-700 hover:via-pink-700 hover:to-orange-600'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Contactează-mă</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Ai un proiect în minte? Contactează-mă prin telefon, WhatsApp sau Instagram și hai să discutăm!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center">
                  <div className={`w-20 h-20 ${method.bgColor} ${method.hoverColor} rounded-2xl flex items-center justify-center text-white mb-6 transition-colors`}>
                    <Icon size={36} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{method.description}</p>
                  <p className="text-gray-900 font-medium text-lg">{method.value}</p>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            <span className="font-medium">Locație:</span> Bucuresti, România
          </p>
        </motion.div>
      </div>
    </section>
  );
}
