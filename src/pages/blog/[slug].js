import Link from 'next/link';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import blogPosts from '../../data/blog-posts.json';
import { getBreadcrumbSchema } from '../../lib/seo';

import siteConfig from '../../data/siteConfig';

export default function BlogPost({ post }) {
  if (!post) return null;

  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` }
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <SEO 
        title={post.title}
        description={post.excerpt}
        schemas={[getBreadcrumbSchema(breadcrumbs)]}
      />

      <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Article Meta Bar */}
        <div className="space-y-4 text-center lg:text-left border-b border-gray-100 pb-8">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <span className="bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              {post.category}
            </span>
            {post.status === 'draft' && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-amber-200">
                Draft Preview
              </span>
            )}
            <span className="text-[10px] bg-slate-100 text-gray-500 font-bold px-2 py-1 rounded uppercase tracking-wider">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-primary-700 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-center lg:justify-start space-x-3 text-xs text-gray-500 pt-2 font-normal">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold font-display">
              {post.author[0]}
            </div>
            <div>
              <span className="block font-bold text-gray-700">{post.author}</span>
              <span className="block text-[10px] text-gray-400 mt-0.5">{post.date}</span>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div 
          className="prose prose-sm md:prose max-w-none text-gray-600 leading-relaxed font-normal py-10 border-b border-gray-100 space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        {/* Back Link */}
        <div className="pt-8 flex justify-between items-center text-xs">
          <Link href="/blog" className="text-primary-600 hover:text-primary-700 font-bold flex items-center space-x-1">
            <span>← Back to Articles</span>
          </Link>
          <Link href="/contact" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-colors text-[10px] uppercase tracking-wider">
            Inquire About This Topic
          </Link>
        </div>

      </article>
    </Layout>
  );
}

// Dynamically fetch data and authorize drafts
export async function getServerSideProps({ params, req }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return { notFound: true };
  }

  if (post.status === 'draft') {
    const cookies = req.headers.cookie || '';
    const sessionToken = `${siteConfig.admin.sessionCookieName}=authorized`;
    if (!cookies.includes(sessionToken)) {
      return { notFound: true };
    }
  }

  return {
    props: {
      post,
    },
  };
}
