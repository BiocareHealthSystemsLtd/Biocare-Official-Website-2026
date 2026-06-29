import Link from 'next/link';

export default function BlogCard({ post }) {
  return (
    <article className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Blog Image Visual with hover scaling */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100 flex items-center justify-center">
          {post.image ? (
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-800 to-primary-600/80 z-0 flex items-center justify-center text-white p-6">
              <span className="text-sm text-center font-semibold leading-snug">{post.title}</span>
            </div>
          )}
          {/* Subtle Overlay Badge */}
          <div className="absolute top-4 right-4 bg-primary-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider z-10">
            {post.category}
          </div>

          <div className="absolute bottom-4 left-4 bg-secondary-600/90 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10">
            {post.readTime}
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="text-[10px] text-gray-400 font-semibold uppercase font-sans flex space-x-2">
            <span>{post.date}</span>
            <span>•</span>
            <span>By {post.author.split(' ')[0]}</span>
          </div>

          <h3 className="font-display font-bold text-gray-800 text-sm sm:text-base line-clamp-2 hover:text-primary-600 transition-colors">
            <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
              {post.title}
            </Link>
          </h3>

          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 font-normal">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto">
        <Link
          href={`/blog/${post.slug}`}
          className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center space-x-1.5 hover:translate-x-1 transition-transform"
          aria-label={`Read full post: ${post.title}`}
        >
          <span>Read Full Article</span>
          <span>→</span>
        </Link>
      </div>
    </article>
  );
}
