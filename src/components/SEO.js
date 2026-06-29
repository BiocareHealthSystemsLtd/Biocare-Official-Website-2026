import Head from 'next/head';
import siteConfig from '../data/siteConfig';

export default function SEO({ title, description, keywords, ogImage, ogType = 'website', canonical, schemas = [] }) {
  const metaTitle = title 
    ? siteConfig.seo.titleTemplate.replace('%s', title) 
    : siteConfig.seo.defaultTitle;
    
  const metaDescription = description || siteConfig.seo.defaultDescription;
  const metaKeywords = keywords 
    ? [...siteConfig.seo.keywords, ...keywords].join(', ') 
    : siteConfig.seo.keywords.join(', ');
    
  const siteUrl = siteConfig.url;
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : siteUrl);
  const image = ogImage || `${siteUrl}/images/biocare-logo.svg`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      
      {/* Robots crawling */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteConfig.companyName} />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteConfig.seo.twitterHandle} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />

      {/* Favicon settings */}
      <link rel="icon" href="/images/favicon.ico" />

      {/* Structured Data (Schema.org) injection */}
      {schemas && schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}
