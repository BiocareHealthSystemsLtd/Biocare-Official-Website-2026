# Website Maintenance Procedures

Guidelines to keep the Biocare Health Systems website updated and secure.

---

## 1. Adding a New Product
To list a new machine or diagnostic product on the website:
1. Open the JSON database at `src/data/products.json`.
2. Add a new product block inside the array following this schema:
   ```json
   {
     "id": "new-model-id",
     "name": "Full Product Name",
     "category": "category-slug",
     "image": "/images/your-image.webp",
     "thumbnail": "/images/your-image.webp",
     "description": "Short description for cards (2-3 lines)",
     "longDescription": "Detailed overview of specifications and applications.",
     "specs": [
       "Spec 1: Value",
       "Spec 2: Value"
     ],
     "featured": false,
     "onHotDeal": false,
     "dealDiscount": "",
     "price": "Contact for Quote",
     "googleDriveLink": "Link to Drive folder containing PDF manual",
     "relatedProducts": ["related-id-1", "related-id-2"]
   }
   ```
3. Save the file and compile the build using `npm run build` to verify there are no compilation errors.

---

## 2. Writing SEO Blog Articles
Adding blog articles maintains high local search rankings in Kenya.
1. Open `src/data/blog-posts.json`.
2. Add a new article entry at the top:
   ```json
   {
     "slug": "article-url-slug",
     "title": "SEO Optimized Article Title",
     "excerpt": "Short paragraph summarizing the article (under 160 characters).",
     "content": "<p>Paragraph 1...</p><h2>Subheading</h2><p>Paragraph 2...</p>",
     "category": "Diagnostics | Hospital Furniture | Radiology",
     "image": "/images/blog-image.webp",
     "date": "Month Day, Year",
     "author": "Author Name (Credentials)",
     "readTime": "X min read"
   }
   ```
3. Compile the build using `npm run build` to verify that dynamic routes render correctly.

---

## 3. Updating Showroom Contacts
If the showroom address, phone numbers, or WhatsApp link changes, update the configuration at `src/data/siteConfig.js`. Do not edit individual page views; editing `siteConfig.js` automatically propagates changes to the Header, Footer, Hero, Contact page, and structured JSON-LD schemas.
