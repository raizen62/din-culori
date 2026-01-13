import { Instagram, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Din Culori</h3>
            <p className="text-gray-400">
              Din culori, creez amintiri.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Link-uri rapide</h4>
            <ul className="space-y-2">
              <li>
                <a href="#gallery" className="text-gray-400 hover:text-white transition-colors">
                  Galerie
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  Despre mine
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contacteaza-ma
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contact & Social</h4>
            <div className="flex gap-4 mb-3">
              <a
                href="tel:+40726221081"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Telefon"
              >
                <Phone size={24} />
              </a>
              <a
                href="https://wa.me/40726221081"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={24} />
              </a>
              <a
                href="https://instagram.com/din.culori"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">+40 726 221 081</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Din Culori. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
