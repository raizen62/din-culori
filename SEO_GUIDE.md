# SEO Optimization Guide - Din Culori Photography

This document outlines all SEO optimizations implemented for your photography portfolio website to help rank higher in search engines.

## Implemented SEO Optimizations

### 1. Comprehensive Metadata (app/layout.tsx)

**What was added:**
- Enhanced title with location keywords: "Din Culori - Fotograf Profesionist Bucuresti | Nunți, Portrete & Evenimente"
- Detailed meta description optimized for Romanian photography searches
- Targeted keywords array including:
  - "fotograf București"
  - "fotograf nuntă București"
  - "fotograf evenimente București"
  - "fotograf portret București"
  - And more...
- Open Graph tags for social media sharing (Facebook, LinkedIn)
- Twitter Card metadata for Twitter/X sharing
- Canonical URL configuration
- Google Search Console verification placeholder

**SEO Impact:** ⭐⭐⭐⭐⭐ Critical
- Helps Google understand your business and location
- Improves click-through rates from search results
- Better social media previews when sharing links

### 2. Structured Data / Schema.org (components/StructuredData.tsx)

**What was added:**
Three types of JSON-LD structured data:

a) **ProfessionalService Schema:**
   - Business name, description, contact info
   - Location (București, Romania)
   - Service offerings (wedding, portrait, events)
   - Social media profiles (Instagram, WhatsApp)
   - Geographic coordinates
   - Area served (Romania)

b) **WebSite Schema:**
   - Website metadata
   - Language specification (Romanian)

c) **BreadcrumbList Schema:**
   - Site navigation structure
   - Helps search engines understand site hierarchy

**SEO Impact:** ⭐⭐⭐⭐⭐ Critical
- Enables rich snippets in Google search results
- Can show star ratings, business info, prices in search
- Improves local SEO for București searches
- Better visibility in Google Maps/Local Pack

### 3. Sitemap.xml (public/sitemap.xml)

**What was added:**
- XML sitemap listing all pages/sections
- Priority and update frequency signals
- Properly formatted for Google Search Console submission

**SEO Impact:** ⭐⭐⭐⭐ High
- Helps search engines discover and index all pages
- Communicates page importance and update frequency

### 4. Robots.txt (public/robots.txt)

**What was added:**
- Allows all search engine bots
- Blocks private directories (_next, api)
- References sitemap location
- Respects crawl rate limits

**SEO Impact:** ⭐⭐⭐ Medium
- Controls how search engines crawl your site
- Prevents indexing of non-public files

### 5. Optimized Image Alt Texts

**What was changed:**

**Hero Carousel (components/Hero.tsx):**
- Before: "Din Culori Photography - Slide 1"
- After: "Fotografie profesională de nuntă București - Momentele tale speciale capturate artistic de Din Culori"

**About Image (components/About.tsx):**
- Before: "About Me"
- After: "Din Culori - Fotograf profesionist București specializat în nunți, portrete și evenimente"

**Gallery Images (components/Gallery.tsx):**
- Dynamic alt texts including title, category, and location keywords
- Added `loading="lazy"` for performance

**SEO Impact:** ⭐⭐⭐⭐ High
- Images can rank in Google Image Search
- Better accessibility (screen readers)
- Reinforces location and service keywords

### 6. Enhanced Hero Content (components/Hero.tsx)

**What was added:**
- Updated H1 tag to include location: "Din Culori - Fotograf Profesionist București"
- Added descriptive paragraph about services offered
- Better keyword density without keyword stuffing

**SEO Impact:** ⭐⭐⭐⭐⭐ Critical
- H1 is the most important on-page SEO element
- Clear communication of services and location

### 7. Language and Locale Settings

**What was changed:**
- HTML lang attribute changed from "en" to "ro"
- Open Graph locale set to "ro_RO"
- JSON-LD inLanguage set to "ro-RO"

**SEO Impact:** ⭐⭐⭐⭐ High
- Better targeting for Romanian searchers
- Improved local search rankings

## Action Items - What You Need to Do Next

### CRITICAL (Do Immediately)

1. **Update Domain in Metadata**
   - File: `app/layout.tsx`
   - Line 36: Change `https://www.dinculori.ro` to your actual domain
   - Also update in:
     - `components/StructuredData.tsx` (all URLs)
     - `public/sitemap.xml` (all URLs)
     - `public/robots.txt` (sitemap URL)

2. **Create Open Graph Image**
   - Create a 1200x630px image showcasing your best work
   - Save as `public/images/og-image.jpg`
   - This appears when people share your site on social media
   - Use Canva or Photoshop with template: "Open Graph Image"

3. **Add Google Search Console Verification**
   - Go to https://search.google.com/search-console
   - Add your property
   - Choose "HTML tag" verification method
   - Copy the verification code
   - Replace `your-google-verification-code` in `app/layout.tsx` line 74

4. **Submit Sitemap to Google**
   - In Google Search Console
   - Go to Sitemaps section
   - Submit: `https://yourdomain.com/sitemap.xml`

### HIGH PRIORITY (Do Within 1 Week)

5. **Create Google Business Profile**
   - Go to https://business.google.com
   - Create profile for "Din Culori Photography"
   - Add your phone, location, website
   - Upload photos from your portfolio
   - Get reviews from clients
   - **Impact:** Appear in Google Maps and local pack

6. **Optimize Images**
   - All images should be:
     - WebP format (smaller file size, faster loading)
     - Max 200KB for gallery images
     - Max 500KB for hero carousel
   - Use tools like TinyPNG or Squoosh.app
   - **Impact:** Faster page load = better rankings

7. **Create Logo**
   - Create a square logo (512x512px)
   - Save as `public/logo.png`
   - Referenced in structured data

8. **Register on Photography Directories**
   - ZilesinoPti.ro (wedding directory)
   - Nunta.ro
   - Add your website link (backlinks improve SEO)

### MEDIUM PRIORITY (Do Within 1 Month)

9. **Content Expansion**
   - Create a blog section with posts like:
     - "Top 10 Locații Pentru Ședințe Foto în București"
     - "Ghid Complet: Ce Să Aștepți de la un Fotograf de Nuntă"
     - "Sfaturi Pentru Ședințe Foto Reușite"
   - Each post = new keywords to rank for

10. **Get Backlinks**
    - Contact wedding venues and offer to photograph their space
    - Ask them to link to your site from their website
    - Write guest posts on wedding blogs
    - Quality backlinks = higher rankings

11. **Social Media Optimization**
    - Post regularly on Instagram (@din.culori)
    - Link to your website in bio and posts
    - Use location tags for București
    - Use hashtags like #fotografbucuresti #fotografnunta

12. **Client Testimonials**
    - Add a testimonials section to the About page
    - Include client names and photos (with permission)
    - Can be structured as Schema.org Review markup

### ONGOING MAINTENANCE

13. **Monitor Performance**
    - Check Google Search Console weekly
    - Track which keywords drive traffic
    - Monitor page speed with PageSpeed Insights
    - Fix any errors that appear

14. **Update Content Regularly**
    - Add new photos to gallery monthly
    - Update "last modified" date in sitemap.xml
    - Keep portfolio fresh and current

15. **Track Rankings**
    - Use Google Search Console to see your rankings
    - Target keywords to track:
      - "fotograf bucuresti"
      - "fotograf nunta bucuresti"
      - "fotograf evenimente bucuresti"
      - "din culori fotograf"

## Performance Optimizations Implemented

1. **Lazy Loading**
   - Gallery images load only when scrolled into view
   - Reduces initial page load time

2. **Image Optimization Settings**
   - Next.js Image component with quality=90
   - Responsive images served at correct sizes

## Technical SEO Checklist

- [x] Meta title optimized with keywords
- [x] Meta description compelling and keyword-rich
- [x] H1 tag includes main keywords
- [x] Alt text on all images
- [x] Mobile-responsive design
- [x] HTTPS (required after deployment)
- [x] Sitemap.xml created
- [x] Robots.txt created
- [x] Schema.org structured data
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Canonical URLs
- [x] Language/locale settings
- [ ] Google Search Console verified
- [ ] Google Business Profile created
- [ ] Analytics installed (Google Analytics)
- [ ] Site submitted to search engines

## Expected Results Timeline

**Week 1-2:**
- Google discovers and indexes your site
- Appears in search results for brand name "Din Culori"

**Month 1:**
- Start ranking for long-tail keywords
- "fotograf profesionist bucuresti sector X"
- "fotograf nunta iasi [your coverage area]"

**Month 2-3:**
- Improve rankings for medium competition keywords
- "fotograf evenimente bucuresti"
- "sedinte foto creative bucuresti"

**Month 3-6:**
- Start competing for high-competition keywords
- "fotograf bucuresti"
- "fotograf nunta bucuresti"

**6+ Months:**
- Establish authority in photography niche
- Top 3 rankings for location-based searches
- Regular traffic from organic search

## Measuring Success

Use Google Search Console to track:
1. **Impressions** - How many people see your site in search results
2. **Clicks** - How many people click through
3. **Average Position** - Your ranking for each keyword
4. **Click-Through Rate (CTR)** - Percentage who click (aim for 3-5%)

Target metrics after 6 months:
- 500+ impressions/month
- 50+ clicks/month
- Position 1-10 for main keywords
- 5%+ CTR

## Additional Recommendations

### Speed Optimization
1. Enable Cloudflare (free CDN)
2. Compress all images to WebP
3. Minify CSS/JS (Next.js does this automatically)
4. Enable browser caching

### Content Strategy
1. Add "Latest Work" section - updated monthly
2. Create case studies of wedding photography
3. Show behind-the-scenes content
4. Add FAQ section answering common questions

### Local SEO
1. Get reviews on Google Business Profile
2. List on Yelp, Facebook, Instagram
3. Partner with local wedding vendors
4. Attend local wedding fairs/events

## Need Help?

If you need assistance with:
- Creating Open Graph images
- Writing blog content
- Technical SEO issues
- Google Search Console setup

Ask Claude Code or consult an SEO specialist.

---

**Remember:** SEO is a marathon, not a sprint. Consistent effort over 3-6 months will show significant results.
