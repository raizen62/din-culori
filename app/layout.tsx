import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const shinier = localFont({
  src: "../public/fonts/Shinier-Regular.ttf",
  variable: "--font-shinier",
});

export const metadata: Metadata = {
  title: "Din Culori - Fotograf Profesionist Bucuresti | Nunți, Portrete & Evenimente",
  description: "Fotograf profesionist în București specializat în fotografii de nuntă, portrete, evenimente și ședințe foto creative. Din culori, creez amintiri. Servicii foto premium în toată România.",
  keywords: [
    "fotograf București",
    "fotograf nuntă București",
    "fotograf evenimente București",
    "fotograf portret București",
    "fotograf profesionist România",
    "servicii foto nuntă",
    "ședințe foto creative",
    "fotografie artă",
    "Din Culori fotograf",
    "fotograf creative București"
  ],
  authors: [{ name: "Din Culori Photography" }],
  creator: "Din Culori Photography",
  publisher: "Din Culori Photography",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.din-culori.ro'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Din Culori - Fotograf Profesionist Bucuresti",
    description: "Fotograf profesionist specializat în nunți, portrete și evenimente. Din culori, creez amintiri. Servicii foto premium în București și toată România.",
    url: 'https://www.din-culori.ro',
    siteName: 'Din Culori Photography',
    locale: 'ro_RO',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Din Culori - Fotograf Profesionist București',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Din Culori - Fotograf Profesionist Bucuresti",
    description: "Fotograf profesionist specializat în nunți, portrete și evenimente. Din culori, creez amintiri.",
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${shinier.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <StructuredData />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
