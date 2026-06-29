import Link from 'next/link';
import categories from '../data/categories.json';
import { CategoryIcon } from './Icons';

export default function CategoryGrid() {
  const mainCategories = categories.slice(0, 8); // Display top 8 categories

  return (
    <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-700 tracking-tight">
            Browse Products by Category
          </h2>
          <p className="mt-2 text-gray-500 max-w-xl mx-auto text-sm">
            Quickly filter our medical supplies or download detailed technical brochures in our product catalogue.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {mainCategories.map((category, idx) => (
            <Link 
              key={idx}
              href={`/products?category=${category.slug}`}
              className="group bg-white border border-gray-200/80 rounded-2xl p-6 text-center hover:border-primary-600 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between"
            >
              <div className="bg-primary-50 group-hover:bg-primary-600 text-primary-600 group-hover:text-white p-4 rounded-xl transition-colors duration-300 mb-4 flex items-center justify-center">
                <CategoryIcon name={category.icon} className="w-7 h-7" />
              </div>
              
              <div>
                <h3 className="font-display font-bold text-gray-800 text-sm md:text-base group-hover:text-primary-600 transition-colors mb-1">
                  {category.name}
                </h3>
                <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
                  {category.description}
                </p>
              </div>

              <span className="text-[10px] text-primary-600 font-semibold uppercase tracking-wider mt-4 block group-hover:translate-x-1 transition-transform">
                Explore Catalog →
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
