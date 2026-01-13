export default function StructuredData() {
  const photographerSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.din-culori.ro/#organization",
    "name": "Din Culori Photography",
    "alternateName": "Din Culori",
    "description": "Fotograf profesionist în București specializat în fotografii de nuntă, portrete, evenimente și ședințe foto creative. Din culori, creez amintiri.",
    "url": "https://www.din-culori.ro",
    "telephone": "+40726221081",
    "priceRange": "$$",
    "image": "https://www.din-culori.ro/images/og-image.jpg",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.din-culori.ro/logo.png"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "București",
      "addressRegion": "București",
      "addressCountry": "RO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "44.4268",
      "longitude": "26.1025"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "România"
      },
      {
        "@type": "City",
        "name": "București"
      }
    ],
    "sameAs": [
      "https://instagram.com/din.culori",
      "https://wa.me/40726221081"
    ],
    "serviceType": [
      "Fotograf Nuntă",
      "Fotograf Portret",
      "Fotograf Evenimente",
      "Ședințe Foto Creative",
      "Fotografie Profesională"
    ],
    "knowsAbout": [
      "Wedding Photography",
      "Portrait Photography",
      "Event Photography",
      "Creative Photography",
      "Professional Photography"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicii Fotografie",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fotografie Nuntă",
            "description": "Servicii foto complete pentru nunți și evenimente speciale"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fotografie Portret",
            "description": "Ședințe foto portret profesionale și creative"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fotografie Evenimente",
            "description": "Acoperire foto pentru evenimente corporate și private"
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.din-culori.ro/#website",
    "url": "https://www.din-culori.ro",
    "name": "Din Culori Photography",
    "description": "Fotograf profesionist în București specializat în nunți, portrete și evenimente",
    "publisher": {
      "@id": "https://www.din-culori.ro/#organization"
    },
    "inLanguage": "ro-RO"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Acasă",
        "item": "https://www.din-culori.ro"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Galerie",
        "item": "https://www.din-culori.ro#gallery"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Despre",
        "item": "https://www.din-culori.ro#about"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contact",
        "item": "https://www.din-culori.ro#contact"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(photographerSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
