import Link from 'next/link';
import productsData from '../data/products.json';
import useCarousel from '../hooks/useCarousel';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

export default function HotDealsCarousel() {
  const hotDeals = productsData.filter((p) => p.onHotDeal);
  const { activeIndex, nextSlide, prevSlide } = useCarousel(
    Math.ceil(hotDeals.length / 3),
    6000
  );

  if (hotDeals.length === 0) return null;

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-700 tracking-tight flex items-center justify-center md:justify-start space-x-2">
              <span className="text-red-500 animate-pulse font-sans">🔥</span>
              <span>Hot Deals & Weekly Promos</span>
            </h2>
            <p className="mt-1 text-gray-500 text-sm">
              Limited-time discounts, reagent bundle deals, and clinic package offers.
            </p>
          </div>
          
          {/* Slider controls */}
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="bg-gray-100 hover:bg-primary-600 text-gray-600 hover:text-white p-2 rounded-lg border transition-all"
              aria-label="Previous Promo"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-gray-100 hover:bg-primary-600 text-gray-600 hover:text-white p-2 rounded-lg border transition-all"
              aria-label="Next Promo"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel slide viewport */}
        <div className="overflow-hidden">
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500"
            style={{ transform: `translateX(-${activeIndex * 0}%)` }} // Simple layout shift or responsive wrapping
          >
            {hotDeals.slice(activeIndex * 3, activeIndex * 3 + 3).map((product, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-b from-red-50/50 to-white border border-red-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Promo details */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-red-500 text-white font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {product.dealDiscount || 'PROMOTION'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase">{product.category}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-gray-800 text-base mb-2 hover:text-primary-600 transition-colors">
                    <Link href={`/products#${product.id}`}>{product.name}</Link>
                  </h3>
                  
                  <p className="text-gray-600 text-xs leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <ul className="space-y-1 text-[11px] text-gray-500 mb-6">
                    {product.specs.slice(0, 3).map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-center space-x-1">
                        <span className="text-red-400 font-bold">•</span>
                        <span className="truncate">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                  <span className="text-xs font-semibold text-gray-500">Price: <strong className="text-red-500 font-bold text-sm block">Contact Quote</strong></span>
                  <Link
                    href="/contact"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-[11px] transition-colors shadow"
                  >
                    Claim Offer
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
