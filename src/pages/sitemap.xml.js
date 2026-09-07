import productsData from '../data/products.json';
import blogPosts from '../data/blog-posts.json';
import categoriesData from '../data/categories.json';
import siteConfig from '../data/siteConfig';

const EXTERNAL_URL = siteConfig.url;

function normalizeDate(dateStr, fallback) {
  if (!dateStr) return fallback;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return fallback;
  return parsed.toISOString().split('T')[0];
}

function generateSiteMap(products, posts, categories) {
  const currentDate = new Date().toISOString().split('T')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Pages -->
  <url>
    <loc>${EXTERNAL_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${EXTERNAL_URL}/products</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${EXTERNAL_URL}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${EXTERNAL_URL}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${EXTERNAL_URL}/faq</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${EXTERNAL_URL}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Product Pages -->
  ${products
    .map((product) => {
      return `
  <url>
    <loc>${EXTERNAL_URL}/products?product=${encodeURIComponent(product.id)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('')}

  <!-- Category Landing Pages -->
  ${categories
    .map((cat) => {
      return `
  <url>
    <loc>${EXTERNAL_URL}/products?category=${encodeURIComponent(cat.slug)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('')}

  <!-- Blog Posts & Guides -->
  ${posts
    .filter((post) => post.status === 'published')
    .map((post) => {
      const isCornerstone = post.slug === 'dymind-hematology-analyzers-kenya';
      return `
  <url>
    <loc>${EXTERNAL_URL}/blog/${post.slug}</loc>
    <lastmod>${normalizeDate(post.date, currentDate)}</lastmod>
    <changefreq>${isCornerstone ? 'weekly' : 'monthly'}</changefreq>
    <priority>${isCornerstone ? '0.9' : '0.7'}</priority>
  </url>`;
    })
    .join('')}
</urlset>
`;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap(productsData, blogPosts, categoriesData);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  // getServerSideProps handles rendering XML
  return null;
}
