'use client';

import { Instagram, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
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
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Din Culori</h3>
            <p className="opacity-80">
              Din culori, creez amintiri.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Link-uri rapide</h4>
            <ul className="space-y-2">
              <li>
                <a href="#gallery" onClick={(e) => handleSmoothScroll(e, 'gallery')} className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Galerie
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Despre mine
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
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
                className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                aria-label="Telefon"
              >
                <Phone size={24} />
              </a>
              <a
                href="https://wa.me/40726221081"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle size={24} />
              </a>
              <a
                href="https://instagram.com/din.culori"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
            <p className="opacity-80 text-sm">+40 726 221 081</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/20 text-center opacity-80 text-sm">
          <p>&copy; {new Date().getFullYear()} Din Culori. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
