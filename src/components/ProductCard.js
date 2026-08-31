import Link from 'next/link';
import Image from 'next/image';
import { CheckIcon, WhatsAppIcon } from './Icons';

export default function ProductCard({ product, isSelected, onSelect, onClear }) {
  const whatsappUrl = `https://wa.me/254723835776?text=Hi%20Biocare%20Health%2520Systems%2C%20I%20am%20interested%20in%20the%20following%20product%3A%20${encodeURIComponent(product.name)}`;
  const hasImage = Boolean(product.image && !product.image.includes('placeholder'));

  if (isSelected) {
    return (
      <div 
        className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg p-6 sm:p-8 space-y-6"
        id={product.id}
      >
        {/* Back Button */}
        <button
          onClick={onClear}
          className="flex items-center text-primary-600 hover:text-primary-700 font-bold text-xs transition-colors space-x-1.5 focus:outline-none mb-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Product List</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Visual Showcase (Only rendered if product has an image) */}
          {hasImage && (
            <div className="md:col-span-5 bg-slate-50 rounded-2xl p-6 h-64 md:h-80 w-full flex items-center justify-center border border-gray-100 overflow-hidden relative font-sans">
              <Image 
                src={product.image} 
                alt={product.name} 
                width={320}
                height={320}
                className="w-full h-full object-contain filter drop-shadow-md"
                unoptimized
              />
              {product.onHotDeal && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  {product.dealDiscount || "PROMO"}
                </div>
              )}
            </div>
          )}

          {/* Detailed Product Info */}
          <div className={hasImage ? "md:col-span-7 space-y-5" : "md:col-span-12 space-y-5"}>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded">
                  {product.category}
                </span>
                {!hasImage && product.onHotDeal && (
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    {product.dealDiscount || "PROMO"}
                  </span>
                )}
              </div>
              <h2 className="font-display font-extrabold text-gray-800 text-xl sm:text-2xl mt-3">
                {product.name}
              </h2>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed font-normal">
              {product.description}
            </p>

            <div className="border-t border-gray-100 pt-4">
              <h4 className="font-display font-bold text-gray-800 text-xs mb-2 uppercase tracking-wider">Product Overview</h4>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">
                {product.longDescription}
              </p>
              
              <h4 className="font-display font-bold text-gray-800 text-xs mb-2 uppercase tracking-wider font-sans">Specifications</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-gray-100">
                {product.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-start text-xs text-gray-600 space-x-2">
                    <CheckIcon className="w-4 h-4 text-secondary-600 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <Link
                href={whatsappUrl}
                target="_blank"
                className="w-full sm:w-auto bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba56] hover:to-[#0e6b60] text-white font-bold py-3 px-6 rounded-lg text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:-translate-y-0.5"
                aria-label={`Get quote on WhatsApp for ${product.name}`}
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Get Quotation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal return card (without top image section for non-image items)
  return (
    <div 
      className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-300 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer group"
      id={product.id}
      onClick={onSelect}
    >
      <div>
        {/* Visual Showcase Panel (Only rendered if product has an image) */}
        {hasImage && (
          <div className="bg-white p-6 relative h-48 w-full flex items-center justify-center border-b border-gray-100 overflow-hidden">
            <Image 
              src={product.image} 
              alt={product.name} 
              width={200}
              height={200}
              className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300 filter drop-shadow-md"
              unoptimized
            />
            {product.onHotDeal && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow">
                {product.dealDiscount || "PROMO"}
              </div>
            )}
          </div>
        )}

        {/* Content details */}
        <div className="p-5 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                {product.category}
              </span>
              {!hasImage && product.onHotDeal && (
                <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                  {product.dealDiscount || "PROMO"}
                </span>
              )}
            </div>
            <h3 className="font-display font-extrabold text-gray-800 text-sm sm:text-base mt-2 group-hover:text-primary-600 transition-colors">
              {product.name}
            </h3>
          </div>

          <p className="text-gray-600 text-xs leading-relaxed font-normal line-clamp-2">
            {product.description}
          </p>

          {/* Quick Specs */}
          <div className="space-y-1.5 pt-2 border-t border-gray-50">
            {product.specs.slice(0, 3).map((spec, idx) => (
              <div key={idx} className="flex items-start text-[11px] text-gray-500 space-x-1.5">
                <CheckIcon className="w-3.5 h-3.5 text-secondary-600 shrink-0 mt-0.5" />
                <span className="truncate">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div 
        className="p-5 pt-0 mt-auto flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        <Link
          href={whatsappUrl}
          target="_blank"
          className="bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba56] hover:to-[#0e6b60] text-white font-bold py-2 px-3 rounded-lg text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:-translate-y-0.5 w-full"
          aria-label={`Get quote on WhatsApp for ${product.name}`}
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
          <span>Get Quote</span>
        </Link>
      </div>
    </div>
  );
}
