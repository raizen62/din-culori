# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Din Culori" - a photography portfolio website built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. The site is configured for static export deployment to hostico.ro hosting.

## Development Commands

```bash
npm run dev    # Start development server at http://localhost:3000
npm run build  # Build for production (creates static export in /out folder)
npm run start  # Start production server (for Node.js deployment)
npm run lint   # Run ESLint
```

## Deployment Configuration

The project is configured for **static export** (see next.config.ts):
- `output: 'export'` generates a static site in the `/out` folder
- `images.unoptimized: true` required for static hosting without Next.js image optimization
- Full deployment instructions are in DEPLOYMENT.md

When building for production, run `npm run build` - this creates the `/out` folder ready for upload to hosting.

## Architecture

### App Router Structure

The site uses Next.js 16 App Router with a single-page layout:
- `app/layout.tsx` - Root layout with Poppins font, Navigation, and Footer components
- `app/page.tsx` - Main page composing all sections (Hero, Photobooth, Gallery, About, Contact)
- All sections are client components using `'use client'` directive for interactivity

### Component Patterns

**1. Section Components**
All main sections follow this pattern:
- Client-side rendered with `'use client'`
- Use Framer Motion for scroll animations with `whileInView` viewport triggers
- Section IDs for anchor navigation (e.g., `id="gallery"`, `id="contact"`)
- Consistent spacing: `py-20` for sections, alternating `bg-white`/`bg-gray-50`

**2. Image Handling**
- Hero carousel uses Next.js `Image` component with `fill`, `priority`, and `quality={90}`
- Gallery uses standard `<img>` tags (required for Lightbox compatibility)
- All images referenced from `public/` folder (e.g., `/images/carousel/carousel_1.jpg`)
- Image paths in components DO NOT include `/public` prefix - just `/images/...`

**3. Animation Patterns**
- Initial state: `initial={{ opacity: 0, y: 20 }}`
- Animate on scroll: `whileInView={{ opacity: 1, y: 0 }}`
- Viewport config: `viewport={{ once: true }}` to animate only once
- Hover effects: `whileHover={{ scale: 1.05 }}`

**4. Carousel Implementation**
Hero carousel uses:
- Embla Carousel via shadcn/ui Carousel component
- Autoplay plugin: `embla-carousel-autoplay` with configurable delay
- Fade plugin: `embla-carousel-fade` for smooth transitions
- Slide data structure: `{ id: number, src: string, alt: string }`

**5. Gallery Component**
- Category filtering: buttons update `selectedCategory` state
- Pagination: shows 8 items per page with Previous/Next/Page number controls
- Lightbox: `yet-another-react-lightbox` opens on image click
- Image data structure: `{ id: number, src: string, category: string, title: string }`

### Data Management

**Gallery Images**
Update `components/Gallery.tsx` - modify the `galleryImages` array:
```typescript
const galleryImages = [
  { id: 1, src: 'images/photo.jpg', category: 'portrait', title: 'Photo Title' }
];
```
Categories must match the `categories` array in the same file.

**Hero Carousel**
Update `components/Hero.tsx` - modify the `HERO_SLIDES` array:
```typescript
const HERO_SLIDES = [
  { id: 1, src: '/images/carousel/slide1.jpg', alt: 'Description' }
];
```

**Contact Information**
Update in two places:
- `components/Contact.tsx` - contact form and info section
- `components/Footer.tsx` - footer contact details and links

### Styling

- **Framework**: Tailwind CSS v4 with PostCSS
- **Font**: Poppins (weights: 300, 400, 500, 600, 700) via Google Fonts
- **Color Scheme**: Gray scale (`gray-50` through `gray-900`) with accent colors for Photobooth section
- **Responsive**: Mobile-first with `md:`, `lg:`, `xl:` breakpoints
- **Path Alias**: `@/*` maps to project root (configured in tsconfig.json)

### TypeScript Configuration

- **Target**: ES2017
- **JSX**: react-jsx (JSX transform mode)
- **Module Resolution**: bundler
- **Strict Mode**: Enabled
- **Path Alias**: `@/*` resolves to root directory

## Key Libraries

- **Animation**: Framer Motion for scroll and hover effects
- **Icons**: Lucide React
- **Lightbox**: Yet Another React Lightbox
- **Carousel**: Embla Carousel (autoplay + fade plugins)
- **UI Components**: shadcn/ui (Carousel, Button) with Radix UI primitives

## Contact Form

The contact form in `components/Contact.tsx` currently simulates submission (setTimeout). To make it functional:
- Integrate EmailJS, FormSubmit.co, or hostico.ro email service
- See DEPLOYMENT.md "Setup Email for Contact Form" section for options

## Common Tasks

**Adding New Photos**
1. Place images in `public/images/` folder
2. Update `galleryImages` array in `components/Gallery.tsx`
3. For hero carousel, update `HERO_SLIDES` in `components/Hero.tsx`

**Changing Site Content**
- Site title/metadata: `app/layout.tsx`
- Hero text: `components/Hero.tsx`
- About section: `components/About.tsx`
- Contact info: `components/Contact.tsx` and `components/Footer.tsx`

**Adding New Carousel Plugin**
Import from embla-carousel-{plugin-name} and add to plugins array in HeroCarousel component.

## Important Notes

- All page sections are on a single page (`app/page.tsx`) - no multi-page routing
- Smooth scroll enabled via `scroll-smooth` class on `<html>` element
- Contact form submission is not functional by default (placeholder implementation)
- Build output is static HTML/CSS/JS in `/out` folder - no server-side features in production
