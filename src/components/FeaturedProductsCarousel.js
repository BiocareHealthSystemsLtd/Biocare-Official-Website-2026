import Link from 'next/link';
import Image from 'next/image';
import useCarousel from '../hooks/useCarousel';
import productsData from '../data/products.json';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from './Icons';

export default function FeaturedProductsCarousel() {
  const featuredProducts = productsData.filter((p) => p.featured);
  const { activeIndex, nextSlide, prevSlide, goToSlide } = useCarousel(
    featuredProducts.length,
    5000
  );

  if (featuredProducts.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-700 tracking-tight">
            Featured Diagnostics & Machines
          </h2>
          <p className="mt-2 text-gray-500 max-w-xl mx-auto text-sm">
            Explore our state-of-the-art hematology analyzers, radiology systems, and clinical solutions.
          </p>
        </div>

        {/* Carousel viewport */}
        <div className="relative bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Image display */}
            <div className="lg:col-span-5 flex justify-center items-center relative h-64 sm:h-80 md:h-96 w-full bg-white rounded-2xl p-6 overflow-hidden border border-gray-100">
              <div className="relative w-full h-full transform hover:scale-105 transition-transform duration-500 flex justify-center items-center">
                {featuredProducts[activeIndex].image ? (
                  <img
                    src={featuredProducts[activeIndex].image}
                    alt={featuredProducts[activeIndex].name}
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                ) : (
                  <>
                    {/* Fallback svg representation if the image file hasn't loaded */}
                    <svg className="absolute w-24 h-24 text-primary-100 opacity-60 z-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeWidth="1" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3M2.27 12c.014-1.232.046-2.453.138-3.662a4.006 4.006 0 0 1 3.7-3.7 48.656 48.656 0 0 1 7.324 0 4.006 4.006 0 0 1 3.7 3.7c.017.22.032.441.046.662M2.27 12l-3-3m3 3 3-3" />
                    </svg>
                    <div className="relative w-full h-full flex items-center justify-center font-display font-bold text-primary-200">
                      <span className="text-center text-sm absolute bottom-4 text-gray-400 font-sans font-normal">
                        {featuredProducts[activeIndex].name} Showcase Visual
                      </span>
                      
                      {/* Digital Device Drawing representation */}
                      <div className="w-48 h-48 bg-primary-600/10 border border-primary-500/20 rounded-2xl flex flex-col justify-between p-4 shadow-inner relative">
                        <div className="flex justify-between items-center text-[10px] text-primary-600 font-sans">
                          <span>BIOCARE PRO</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse"></span>
                        </div>
                        <div className="m-auto text-primary-600">
                          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest text-center">Equipment Model</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Deal tag overlay if on hot deals */}
              {featuredProducts[activeIndex].onHotDeal && (
                <div className="absolute top-4 left-4 bg-secondary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow">
                  {featuredProducts[activeIndex].dealDiscount || "Hot Deal"}
                </div>
              )}
            </div>

            {/* Specs column */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
              
              <div className="space-y-4">
                <span className="text-xs font-semibold text-secondary-600 uppercase tracking-widest">
                  {featuredProducts[activeIndex].category.toUpperCase()} EQUIPMENT
                </span>
                
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-gray-800">
                  {featuredProducts[activeIndex].name}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {featuredProducts[activeIndex].longDescription}
                </p>

                {/* Spec Bullets */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wider">Specifications / Features:</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {featuredProducts[activeIndex].specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start text-xs text-gray-600 space-x-2">
                        <CheckIcon className="w-4 h-4 text-secondary-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-100">
                <Link
                  href={`/products#${featuredProducts[activeIndex].id}`}
                  className="w-full sm:w-auto text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg text-xs transition-colors shadow"
                  aria-label={`Learn more about ${featuredProducts[activeIndex].name}`}
                >
                  View Machine Specs
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto text-center bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-6 rounded-lg text-xs transition-colors"
                  aria-label={`Get quote for ${featuredProducts[activeIndex].name}`}
                >
                  Request Price Quote
                </Link>
              </div>

            </div>

          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-primary-600 text-gray-600 hover:text-white p-2.5 rounded-full border shadow hover:shadow-lg transition-all focus:outline-none z-10"
            aria-label="Previous Slide"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-primary-600 text-gray-600 hover:text-white p-2.5 rounded-full border shadow hover:shadow-lg transition-all focus:outline-none z-10"
            aria-label="Next Slide"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8 z-10">
            {featuredProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-primary-600' : 'w-2 bg-gray-300'}`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
