import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ post }) {
  return (
    <article className="bg-white border border-slate-200 rounded overflow-hidden flex flex-col justify-between h-full">
      <div>
        {/* Blog Image Visual */}
        <div className="relative h-44 w-full bg-slate-100 border-b border-slate-200">
          {post.image ? (
            <Image 
              src={post.image} 
              alt={post.title} 
              width={400}
              height={220}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center p-4">
              <span className="text-xs text-slate-500 font-medium text-center">{post.title}</span>
            </div>
          )}
        </div>

        <div className="p-4 space-y-2.5">
          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <span className="font-semibold text-primary-700 uppercase tracking-wider">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-sm leading-snug hover:text-primary-700 transition-colors">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0 mt-auto">
        <Link
          href={`/blog/${post.slug}`}
          className="text-primary-700 hover:text-primary-800 font-medium text-xs inline-flex items-center space-x-1"
        >
          <span>Read Technical Guide</span>
          <span>→</span>
        </Link>
      </div>
    </article>
  );
}
