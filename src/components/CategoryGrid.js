import Link from 'next/link';
import categories from '../data/categories.json';

export default function CategoryGrid() {
  return (
    <section className="bg-white py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Equipment Catalog
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Browse Equipment by Clinical Category
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
            Direct access to specific medical departments. Filter models, view technical specifications, or download product brochures.
          </p>
        </div>

        {/* Structured Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="p-4 rounded border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-slate-900 block mb-1">
                  {category.name}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-primary-700 font-medium">Browse Category</span>
                <span className="text-slate-400">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 gap-3">
          <span>Need a specific spare part, chemical, or consumable not listed in the categories?</span>
          <Link 
            href="/contact" 
            className="text-primary-700 hover:text-primary-800 font-medium underline"
          >
            Inquire directly with our Nairobi procurement desk →
          </Link>
        </div>

      </div>
    </section>
  );
}
