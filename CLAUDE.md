# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Din Culori" - a photography portfolio website built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. The site is configured for static export deployment to hostico.ro hosting.

**Design direction:** dark-editorial "darkroom" aesthetic — the brand name means "From Colors", so color emerges from a near-black canvas. Animations are GSAP-driven with Lenis smooth scrolling. The signature motifs are the `--spectrum` gradient (thin chromatic lines, gradient text) and the "color bloom" effect (gallery photos sit desaturated and saturate as they cross the viewport center or on hover).

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
- `images.qualities: [75, 90]` declares the quality values used by `next/image`
- Full deployment instructions are in DEPLOYMENT.md

When building for production, run `npm run build` - this creates the `/out` folder ready for upload to hosting.

## Architecture

### App Router Structure

Single-page layout composed in `app/page.tsx`:
- `app/layout.tsx` - Root layout: fonts, `StructuredData`, experience layer (`SmoothScroll`, `Preloader`, `CustomCursor`, `Grain`), `Navigation`, `Footer`
- Section order on the page: `Hero` → `Marquee` → `Manifesto` → `Photobooth` → `Gallery` → `About` → `Contact`
- All interactive components are client components (`'use client'`)

### Animation System (GSAP + Lenis)

- **Libraries**: `gsap` (+ `ScrollTrigger`, `SplitText`), `@gsap/react` (`useGSAP`), `lenis` (smooth scroll). Framer Motion and Embla were removed in the redesign.
- `lib/animations.ts` - registers plugins and exports `gsap`, `ScrollTrigger`, `SplitText`, `useGSAP`, and `revealWithin(scope)` which animates every `[data-reveal]` element in a section (optional `data-reveal-delay="0.1"`). Reveal triggers use `start: 'clamp(top 88%)'` so elements near the page bottom still fire.
- `lib/scroll.ts` - Lenis singleton (`setLenis`/`getLenis`), `scrollToId(id)` (Lenis-powered anchor scroll with nav offset and post-glide drift correction), `prefersReducedMotion()`.
- `components/fx/SmoothScroll.tsx` - creates Lenis, syncs it with ScrollTrigger via `gsap.ticker`, exposes `window.lenis` (used in dev tooling). Skipped entirely under `prefers-reduced-motion`.
- `components/fx/Preloader.tsx` - counter + spectrum-line load screen; dispatches the `dc:reveal` window event (exported as `REVEAL_EVENT`) when the curtain lifts. Hero and Navigation listen for it to start their intros (each has a fallback timeout).
- `components/fx/CustomCursor.tsx` - dot + ring cursor on fine pointers only; elements with `data-cursor-label="Vezi"` grow the ring into a labelled disc.
- `components/fx/Grain.tsx` - fixed film-grain overlay.
- **Respect reduced motion** in any new animation: check `prefersReducedMotion()` and set final states instead.

**GSAP + Tailwind v4 gotcha:** Tailwind v4 translate utilities use the CSS `translate` property, which GSAP neutralizes (`translate: none`). Don't mix Tailwind transform classes with GSAP-tweened elements — set initial transforms with `gsap.set` (and zero out `y` if the element has an SSR inline `translateY(-100%)`, since GSAP parses that as a pixel offset; see `Navigation.tsx`).

**`background-clip: text` gotcha:** the `.text-spectrum` gradient text breaks if its glyphs are inside GSAP-transformed child wrappers (e.g. SplitText chars). Animate such headlines as whole lines inside `overflow-hidden` masks instead (see `Hero.tsx`).

### Design Tokens (app/globals.css)

- Palette: `--ink` (near-black warm), `--ink-2`/`--ink-3` (panels), `--cream` (+ `--cream-70/50/30` alphas), `--terracotta` (accent), `--hairline`/`--hairline-soft` (borders), `--spectrum` (brand gradient).
- shadcn-style tokens (`--background`, `--primary`, …) are mapped onto this dark palette.
- Utility classes: `.text-spectrum` (animated gradient text), `.text-stroke-cream` (outline type), `.spectrum-line`, `.link-line` (gradient underline grow, `data-active="true"` keeps it on), `.bloom`/`.bloom-img`/`.in-bloom` (desaturate → color), `.grain`, `.marquee-track`.
- Fonts (loaded in `app/layout.tsx`): **Anton** (`--font-anton`, `font-display`, display headlines, uppercase), **Instrument Sans** (`--font-instrument-sans`, body), **Instrument Serif** italic (`--font-instrument-serif`, `font-serif`, accent words), **Shinier** (`--font-shinier`, logo + signature). All Google fonts use `latin-ext` for Romanian diacritics.

### Component Patterns

**1. Section anatomy** — every section follows: section label row (spectrum dash + numbered `0X — Label` uppercase micro-type), huge Anton heading (often with a serif-italic spectrum subline), content, all revealed via `data-reveal` + `revealWithin(sectionRef)` in a `useGSAP` hook. Section IDs for anchors: `photobooth`, `gallery`, `about`, `contact`.

**2. Image handling**
- Hero slideshow and section images use Next.js `Image`; Gallery uses `<img>` (lightbox compatibility — the lint warning is accepted)
- Image paths start at `/images/...` (no `/public` prefix)
- Gallery/Photobooth images get the bloom treatment: wrapper has `bloom` (+ ScrollTrigger toggles `in-bloom`), image has `bloom-img`

**3. Hero slideshow** — GSAP crossfade + Ken Burns (no carousel lib). Slides in `HERO_SLIDES`, interval `SLIDE_MS`, spectrum progress bar and `0X / 06` counter, mouse parallax on fine pointers.

**4. Gallery** — asymmetric 12-col editorial grid: column spans + vertical stagger come from the `LAYOUT` cycle, while each photo keeps its **true aspect ratio** (`ratio` field per image, `'4/5'` or `'2/3'`) so people are never cropped. Category filters with superscript counts (no pagination — all images of the active category render), `yet-another-react-lightbox` on click. Per-item ScrollTriggers are rebuilt inside a `gsap.context` in a `useEffect` keyed by the active category. When adding a photo, set `ratio` to match the file's orientation.

**5. Navigation** — fixed bar (blurs after 50px scroll), desktop links with numbered labels, mobile full-screen overlay menu animated per-toggle in the `isOpen` effect; scroll locking via `lenis.stop()/start()`.

### Data Management

**Gallery Images** - `components/Gallery.tsx`, `galleryImages` array:
```typescript
{ id: 1, src: '/images/photo.jpg', category: 'food', title: 'Titlu' }
```
Categories must exist in the `CATEGORIES` array (key + Romanian label) in the same file.

**Hero Slides** - `components/Hero.tsx`, `HERO_SLIDES` array: `{ id, src, alt }`.

**Photobooth pricing/features** - `components/Photobooth.tsx`: `PRICING_TIERS` (name, duration, price, icon, popular, features; `(upgraded)` suffix renders a trend icon) and `FEATURES`.

**Contact Information** - `components/Contact.tsx` (`CONTACT_METHODS`) and `components/Footer.tsx` (`SOCIALS` + phone).

### TypeScript Configuration

- **Target**: ES2017, **JSX**: react-jsx, **Module Resolution**: bundler, **Strict**: enabled
- **Path Alias**: `@/*` resolves to root directory

## Key Libraries

- **Animation**: GSAP (ScrollTrigger, SplitText) + `@gsap/react`, Lenis smooth scroll
- **Icons**: Lucide React
- **Lightbox**: Yet Another React Lightbox (gallery + photobooth formats)

## Common Tasks

**Adding New Photos**
1. Place images in `public/images/`
2. Add to `galleryImages` in `components/Gallery.tsx` (and a category if new)
3. For hero, add to `HERO_SLIDES` in `components/Hero.tsx`

**Changing Site Content**
- Site title/metadata: `app/layout.tsx`
- Hero headline/tagline: `components/Hero.tsx`; marquee items: `components/Marquee.tsx`
- Manifesto statement: `components/Manifesto.tsx`
- About copy: `components/About.tsx`
- Contact info: `components/Contact.tsx` and `components/Footer.tsx`

## Important Notes

- Single page; anchor navigation goes through `scrollToId` (never `window.scrollTo` directly — it fights Lenis)
- The whole site is one continuous dark canvas; don't introduce light section backgrounds
- Contact is link-based (tel/WhatsApp/Instagram) — there is no contact form
- Build output is static HTML/CSS/JS in `/out` folder - no server-side features in production
