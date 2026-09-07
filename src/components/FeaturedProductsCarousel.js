import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import productsData from '../data/products.json';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from './Icons';

export default function FeaturedProductsCarousel() {
  const featuredProducts = productsData.filter((p) => p.featured === true);
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  if (!featuredProducts || featuredProducts.length === 0) return null;

  const currentProduct = featuredProducts[activeIndex];

  return (
    <section className="bg-white py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Diagnostic & Clinical Machinery
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Featured Medical Equipment
            </h2>
          </div>
          <div className="flex items-center space-x-2 mt-3 md:mt-0">
            <span className="text-xs text-slate-500 mr-2">
              {activeIndex + 1} of {featuredProducts.length}
            </span>
            <button
              onClick={prevSlide}
              className="p-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              aria-label="Previous equipment"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              aria-label="Next equipment"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Equipment Showcase Container */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Image display */}
            <div className="lg:col-span-5 flex justify-center items-center h-64 sm:h-80 w-full bg-white rounded border border-slate-200 p-6 overflow-hidden">
              {currentProduct.image ? (
                <Image
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  width={360}
                  height={320}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              ) : (
                <div className="text-center text-xs text-slate-400">
                  <span>Product Visual Available in Showroom</span>
                </div>
              )}
            </div>

            {/* Details & Specs column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              
              <div className="space-y-3">
                <span className="text-xs font-semibold text-primary-700 uppercase tracking-wider">
                  {currentProduct.category}
                </span>
                
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {currentProduct.name}
                </h3>
                
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {currentProduct.longDescription || currentProduct.description}
                </p>

                {/* Key Technical Specifications */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-800 block mb-2">Technical Specifications:</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {currentProduct.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start space-x-2">
                        <CheckIcon className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
                <Link
                  href={`/products?product=${currentProduct.id}`}
                  className="bg-primary-700 hover:bg-primary-800 text-white font-medium py-2.5 px-5 rounded text-xs transition-colors"
                >
                  View Machine Specifications
                </Link>
                <Link
                  href="/contact"
                  className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-medium py-2.5 px-5 rounded text-xs transition-colors"
                >
                  Request Formal Price Quote
                </Link>
                <span className="text-xs text-slate-500 ml-auto hidden sm:inline">
                  Warranty & Installation Included
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
