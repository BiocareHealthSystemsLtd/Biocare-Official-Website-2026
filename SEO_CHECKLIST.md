# Pre-Launch SEO Checklist - Biocare Health Systems Limited

Ensure these tasks are verified before launching the website live to search engines.

---

## 1. Title & Meta Tags
- [ ] **Homepage**: Title length is between 50-60 characters (`Medical Equipment Suppliers Kenya | Hospital & Lab Equipment | Biocare`).
- [ ] **Homepage**: Meta Description is between 150-160 characters and includes keywords: `medical equipment Kenya`, `diagnostics`.
- [ ] **Showcase**: Unique titles and description for `/products`.
- [ ] **Subpages**: Every page renders a single canonical URL.

---

## 2. Heading Structure (H1-H6)
- [ ] Every page has exactly one `<h1>` tag representing the primary keyword.
- [ ] Sub-sections use sequential hierarchical headings (`<h2>`, `<h3>`).
- [ ] No empty heading tags are present in code.

---

## 3. Structured Data Schema
- [ ] Organization schema renders on homepage.
- [ ] LocalBusiness schema (with Nairobi Ngara phone numbers and coordinates) renders on homepage.
- [ ] Product schemas render correctly on the `/products` pages.
- [ ] BreadcrumbList schemas render on all subpages.
- [ ] Verify schemas using [Google Rich Results Test](https://search.google.com/test/rich-results).

---

## 4. Performance & Core Web Vitals
- [ ] Run Lighthouse Audit. Target scores:
  - Performance: 95+
  - Accessibility: 95+ (Focus rings, color contrast)
  - Best Practices: 98+
  - SEO: 100
- [ ] Images serve WebP formats.
- [ ] Layout Shift (CLS) is below 0.1.

---

## 5. Webmaster Configuration
- [ ] `sitemap.xml` resides at `/sitemap.xml` and is submitted to **Google Search Console**.
- [ ] `robots.txt` is accessible and points to sitemap.
- [ ] Check links for broken 404 responses.
- [ ] Set up **Google Analytics (GA4)** measurement stream and add ID to environment.
