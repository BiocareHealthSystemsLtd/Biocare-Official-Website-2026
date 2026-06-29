import Layout from '../components/Layout';
import SEO from '../components/SEO';
import BlogCard from '../components/BlogCard';
import blogPosts from '../data/blog-posts.json';
import { getBreadcrumbSchema } from '../lib/seo';

export default function Blog() {
  const breadcrumbs = [
    { name: 'Blog & Articles', path: '/blog' }
  ];

  const publishedPosts = blogPosts.filter(post => post.status === 'published');

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <SEO 
        title="Medical Equipment News & Insights"
        description="Read the latest insights and guides about medical equipment, laboratory diagnostics, radiology advances, and clinic setups in Kenya."
        schemas={[getBreadcrumbSchema(breadcrumbs)]}
      />

      {/* Header Banner */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold text-secondary-600 uppercase tracking-widest block font-sans">
            EDUCATION & ARTICLES
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-700 tracking-tight">
            Healthcare Technology Insights
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto font-normal">
            Stay informed with technical reviews, selection guides, and industry news written by clinical and engineering experts in Nairobi.
          </p>
        </div>
      </section>

      {/* Grid listing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {publishedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publishedPosts.map((post, idx) => (
              <BlogCard key={idx} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-white border rounded-3xl p-12 text-center text-gray-500 font-normal">
            No articles published yet. Check back soon for updates.
          </div>
        )}
      </section>
    </Layout>
  );
}
