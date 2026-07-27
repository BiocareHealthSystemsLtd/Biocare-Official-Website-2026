import productsData from '../data/products.json';
import blogPosts from '../data/blog-posts.json';
import categoriesData from '../data/categories.json';
import siteConfig from '../data/siteConfig';

const EXTERNAL_URL = siteConfig.url;

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

  <!-- Blog Posts -->
  ${posts
    .filter((post) => post.status === 'published')
    .map((post) => {
      return `
  <url>
    <loc>${EXTERNAL_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
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
