# Deployment Guide for Hostico.ro

## Option 1: Deploy as Static Export (Recommended)

This is the easiest way to deploy your Next.js photography portfolio to your hostico.ro hosting.

### Step 1: Build for Production

1. Open your terminal in the `photography-portfolio` folder
2. Run the following commands:

```bash
npm run build
```

### Step 2: Export Static Files

Since hostico.ro uses cPanel with Apache/LiteSpeed, we'll export your site as static HTML:

1. Update `next.config.ts` (or create it if it doesn't exist):

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

2. Run the build again:

```bash
npm run build
```

This will create an `out` folder with all your static files.

### Step 3: Upload to Hostico.ro

**Via cPanel File Manager:**

1. Login to your cPanel at hostico.ro
2. Go to **File Manager**
3. Navigate to `public_html` (or your domain's root folder)
4. Delete any existing files (index.html, etc.)
5. Upload all files from the `out` folder to `public_html`
6. Make sure the file permissions are correct (644 for files, 755 for folders)

**Via FTP:**

1. Use FileZilla or WinSCP
2. Connect using your FTP credentials from hostico.ro
3. Navigate to `/public_html`
4. Upload all contents from the `out` folder

### Step 4: SSL Certificate

Your hosting includes free SSL certificates:

1. In cPanel, go to **SSL/TLS Status**
2. Enable AutoSSL for your domain
3. Wait a few minutes for the certificate to be issued
4. Your site will be accessible via HTTPS

---

## Option 2: Deploy with Node.js Server

If you want to use the Node.js features of Next.js:

### Step 1: Prepare the Application

1. Build your application:
```bash
npm run build
```

2. Create a production package with all dependencies:
```bash
npm ci --production
```

### Step 2: Upload via cPanel

1. Zip your entire project folder
2. Upload to your hostico.ro hosting via cPanel File Manager
3. Extract the files

### Step 3: Setup Node.js Application in cPanel

1. In cPanel, find **Setup Node.js App**
2. Click **Create Application**
3. Configure:
   - **Node.js version**: 18.x or higher
   - **Application mode**: Production
   - **Application root**: `/home/your-username/photography-portfolio`
   - **Application URL**: Your domain
   - **Application startup file**: `server.js`

4. Create `server.js` in your project root:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = false
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

5. Click **Create** and **Start Application**

---

## Post-Deployment Checklist

- [ ] Test all pages and navigation
- [ ] Check that images load correctly
- [ ] Test contact form
- [ ] Verify gallery lightbox works
- [ ] Test on mobile devices
- [ ] Check site speed with Google PageSpeed Insights
- [ ] Submit sitemap to Google Search Console
- [ ] Setup Google Analytics (optional)

---

## Customization Guide

### Adding Your Photos

1. Replace placeholder images in `components/Gallery.tsx`
2. Add your photos to `public/images/` folder
3. Update the `galleryImages` array with your photo paths

Example:
```typescript
const galleryImages = [
  {
    id: 1,
    src: '/images/photo1.jpg',
    category: 'portrait',
    title: 'Beautiful Portrait'
  },
  // Add more...
];
```

### Update Contact Information

Edit `components/Contact.tsx` and `components/Footer.tsx` with your:
- Email address
- Phone number
- Social media links
- Business hours

### Change Colors and Styling

- Primary styles are in Tailwind classes
- To change the main color scheme, update the classes in components
- Example: Change `bg-gray-900` to `bg-blue-900` for blue theme

### Setup Email for Contact Form

To make the contact form functional, you can use:

1. **EmailJS** (Free tier available)
   - Sign up at emailjs.com
   - Install: `npm install @emailjs/browser`
   - Update Contact.tsx with EmailJS integration

2. **FormSubmit.co** (Simple, no coding)
   - Change form action to: `https://formsubit.co/your-email@example.com`

3. **Hostico.ro Email** (Your hosting includes unlimited emails)
   - Create API endpoint using Node.js with nodemailer
   - Or use PHP mail() function

---

## Troubleshooting

**Images not loading?**
- Make sure `unoptimized: true` is set in next.config.ts
- Check file paths are correct

**404 errors on refresh?**
- Add `.htaccess` file in public_html:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

**Slow loading?**
- Optimize images before uploading
- Use WebP format for photos
- Consider using a CDN

---

## Support

- Hostico.ro Live Help: Available 24/7
- Next.js Documentation: https://nextjs.org/docs
- Your project issues: Check the console for errors

Good luck with your photography portfolio!
