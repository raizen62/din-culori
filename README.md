# Din Culori - Photography Portfolio

A beautiful, modern photography portfolio built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- 📸 **Responsive Photo Gallery** with category filtering
- 🔍 **Lightbox Viewer** for full-screen image viewing
- ✨ **Smooth Animations** using Framer Motion
- 📱 **Mobile-First Design** works on all devices
- 🎨 **Modern UI** inspired by Montoya theme
- 📝 **Contact Form** for client inquiries
- ⚡ **Fast Performance** optimized for speed
- 🎯 **SEO Friendly** with Next.js built-in features

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Lightbox**: Yet Another React Lightbox
- **Font**: Poppins (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project folder:
```bash
cd photography-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
photography-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with navigation & footer
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Header navigation
│   ├── Hero.tsx           # Hero section
│   ├── Gallery.tsx        # Photo gallery with lightbox
│   ├── About.tsx          # About section
│   ├── Contact.tsx        # Contact form
│   └── Footer.tsx         # Footer
└── public/
    └── images/            # Your photos go here
```

## Customization

### Add Your Photos

1. Place your photos in the `public/` folder
2. Update `components/Gallery.tsx`:

```typescript
const galleryImages = [
  {
    id: 1,
    src: '/your-photo.jpg',
    category: 'portrait',
    title: 'Photo Title'
  },
  // Add more photos...
];
```

### Update Content

- **Site Title**: Edit `app/layout.tsx` metadata
- **Hero Text**: Edit `components/Hero.tsx`
- **About Section**: Edit `components/About.tsx`
- **Contact Info**: Edit `components/Contact.tsx` and `components/Footer.tsx`

### Change Colors

The site uses Tailwind CSS. To change colors, replace `bg-gray-900` with your preferred color (e.g., `bg-blue-900`)

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to hostico.ro

### Quick Deploy (Static)

1. Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
```

2. Build:
```bash
npm run build
```

3. Upload the `out` folder to your hosting

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers

---

Made with ❤️ for photographers
