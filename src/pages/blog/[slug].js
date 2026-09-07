import Link from 'next/link';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import blogPosts from '../../data/blog-posts.json';
import { getBreadcrumbSchema, getBlogPostingSchema, getFAQSchema } from '../../lib/seo';
import { isValidAdminSession } from '../../lib/auth';

export default function BlogPost({ post }) {
  if (!post) return null;

  const breadcrumbs = [
    { name: 'Articles', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` }
  ];

  const schemas = [
    getBreadcrumbSchema(breadcrumbs),
    getBlogPostingSchema(post),
    ...(post.faqs && post.faqs.length > 0 ? [getFAQSchema(post.faqs)] : [])
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <SEO 
        title={post.title}
        description={post.excerpt}
        ogImage={post.image}
        schemas={schemas}
      />

      <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Article Header */}
        <div className="space-y-3 border-b border-slate-200 pb-6 mb-8">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <span className="font-semibold text-primary-700 uppercase tracking-wider bg-primary-50 px-2 py-0.5 rounded border border-primary-100">
              {post.category}
            </span>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center space-x-2 text-xs text-slate-600 pt-1">
            <span>Written by: <strong className="text-slate-800">{post.author}</strong></span>
          </div>
        </div>

        {/* Content body */}
        <div 
          className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        {/* Footer Navigation */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs gap-4">
          <Link href="/blog" className="text-primary-700 hover:underline font-medium">
            ← Back to All Articles
          </Link>
          <Link 
            href={`/contact?message=${encodeURIComponent(`Inquiry following article: ${post.title}`)}`} 
            className="bg-primary-700 hover:bg-primary-800 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Inquire About Equipment in This Article
          </Link>
        </div>

      </article>
    </Layout>
  );
}

export async function getServerSideProps({ params, req }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return { notFound: true };
  }

  if (post.status === 'draft') {
    if (!isValidAdminSession(req)) {
      return { notFound: true };
    }
  }

  return {
    props: {
      post,
    },
  };
}
