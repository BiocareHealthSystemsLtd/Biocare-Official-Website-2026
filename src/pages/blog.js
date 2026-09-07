import Layout from '../components/Layout';
import SEO from '../components/SEO';
import BlogCard from '../components/BlogCard';
import blogPosts from '../data/blog-posts.json';
import { getBreadcrumbSchema } from '../lib/seo';

export default function Blog() {
  const breadcrumbs = [
    { name: 'Articles & Guides', path: '/blog' }
  ];

  const publishedPosts = blogPosts.filter(post => post.status === 'published');

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <SEO 
        title="Healthcare Technology & Equipment Guides | Biocare Kenya"
        description="Technical reviews, selection guides, and operational articles on medical equipment, laboratory diagnostics, and hospital furniture in Kenya."
        schemas={[getBreadcrumbSchema(breadcrumbs)]}
      />

      {/* Header Banner */}
      <section className="bg-slate-50 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Technical Insights
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Medical Equipment Guides & Articles
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Practical articles on laboratory analyzer maintenance, hospital bed selection, and clinical procurement standards in Kenya.
          </p>
        </div>
      </section>

      {/* Grid listing */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {publishedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publishedPosts.map((post, idx) => (
              <BlogCard key={idx} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded p-12 text-center text-slate-500 text-xs">
            No articles published yet. Check back soon for updates.
          </div>
        )}
      </section>
    </Layout>
  );
}
