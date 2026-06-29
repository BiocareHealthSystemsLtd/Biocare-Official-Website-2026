# Biocare Health Systems Limited Website

This is the production-ready Next.js web application built for Biocare Health Systems Limited, a medical equipment and laboratory supplier in Nairobi, Kenya.

## Features

- **SEO Optimized**: Complete search meta configurations with Breadcrumb, LocalBusiness, and Product structured JSON-LD schemas.
- **Tailwind CSS v4 styling**: Modern CSS-first medical design system in `globals.css` with zero dependencies.
- **Fast Search & Filters**: Instant clientside product indexing and category routing.
- **Lead Capture**: AJAX inquiry form mapping interests to custom quote emails.
- **GA4 Analytics ready**: Pre-installed tracking scripts for core clicks, phone taps, and whatsapp triggers.
- **Lightweight Product catalog**: Pinnable Google Drive link allows users to explore deep files and brochures without browser lags.

---

## Tech Stack

- **Framework**: Next.js 16 (Pages Router)
- **Styling**: Tailwind CSS v4 & PostCSS
- **Forms & Validation**: Custom React Hooks Clientside
- **Email Delivery**: SendGrid Mail API

---

## Directory Structure

```text
website/
├── public/                  # Static assets
│   ├── favicon.ico
│   ├── sitemap.xml          # Search sitemap
│   └── robots.txt           # Crawling protocols
├── src/
│   ├── data/                # Static JSON databases
│   │   ├── products.json    # Diagnostic analyzers & specs
│   │   ├── categories.json  # Equipment groupings
│   │   ├── blog-posts.json  # SEO articles
│   │   ├── testimonials.json# Hospital reviews
│   │   ├── faqs.json        # Collapsible FAQs
│   │   └── siteConfig.js    # Contacts & coordinates
│   ├── styles/              # CSS variables & Tailwind v4
│   │   └── globals.css
│   ├── components/          # Reusable UI widgets
│   │   ├── Layout.js
│   │   ├── Header.js
│   │   ├── SEO.js
│   │   ├── ProductCard.js
│   │   └── ...
│   ├── lib/                 # Utility files
│   │   ├── seo.js           # Structured data compiler
│   │   └── sendgrid.js      # SendGrid integration
│   └── pages/               # Routing
│       ├── index.js         # Homepage
│       ├── products.js      # Filterable catalog
│       └── api/             # API routes
```

---

## Local Setup

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root based on `.env.example`:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SENDGRID_API_KEY=SG.your_key_here
CONTACT_EMAIL_TO=contact@biocarehealthsystems.co.ke
CONTACT_EMAIL_FROM=noreply@biocarehealthsystems.co.ke
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

### 4. Build Production Bundle

```bash
npm run build
npm run start
```
