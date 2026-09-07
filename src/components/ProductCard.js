import Link from 'next/link';
import Image from 'next/image';
import { CheckIcon, WhatsAppIcon } from './Icons';

export default function ProductCard({ product, isSelected, onSelect, onClear }) {
  const whatsappUrl = `https://wa.me/254723835776?text=Hello%20Biocare%20Health%20Systems%2C%20I%20would%20like%20to%20inquire%20about%20pricing%20and%20availability%20for%3A%20${encodeURIComponent(product.name)}`;
  const hasImage = Boolean(product.image && !product.image.includes('placeholder'));

  if (isSelected) {
    return (
      <div 
        className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6"
        id={product.id}
      >
        {/* Back Button */}
        <button
          onClick={onClear}
          className="flex items-center text-primary-700 hover:text-primary-800 font-semibold text-xs transition-colors space-x-1.5 focus:outline-none mb-2 cursor-pointer"
        >
          <span>← Back to All Products</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Visual Showcase */}
          {hasImage && (
            <div className="md:col-span-5 bg-white rounded border border-slate-200 p-6 h-64 md:h-80 w-full flex items-center justify-center overflow-hidden">
              <Image 
                src={product.image} 
                alt={product.name} 
                width={320}
                height={320}
                className="w-full h-full object-contain"
                unoptimized
              />
            </div>
          )}

          {/* Detailed Product Info */}
          <div className={hasImage ? "md:col-span-7 space-y-4" : "md:col-span-12 space-y-4"}>
            <div>
              <span className="text-[11px] font-semibold text-primary-700 uppercase tracking-wider bg-primary-50 px-2 py-0.5 rounded border border-primary-100">
                {product.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                {product.name}
              </h2>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>

            <div className="border-t border-slate-200 pt-4 space-y-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Product Overview</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                {product.longDescription}
              </p>
              
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider pt-2">Key Specifications</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-4 rounded border border-slate-200">
                {product.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-700 space-x-2">
                    <CheckIcon className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
              <Link
                href={whatsappUrl}
                target="_blank"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 px-5 rounded text-xs transition-colors flex items-center justify-center space-x-2"
                aria-label={`Get quote on WhatsApp for ${product.name}`}
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Inquire on WhatsApp</span>
              </Link>
              <Link
                href={`/contact?category=${encodeURIComponent(product.category)}&message=${encodeURIComponent(`I would like to request an official quotation for the ${product.name}.`)}`}
                className="bg-primary-700 hover:bg-primary-800 text-white font-medium py-2.5 px-5 rounded text-xs transition-colors text-center"
              >
                Request Formal Quotation
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Product Card
  return (
    <div 
      className="bg-white border border-slate-200 rounded hover:border-slate-400 transition-colors flex flex-col justify-between h-full cursor-pointer"
      id={product.id}
      onClick={onSelect}
    >
      <div>
        {/* Product Image */}
        {hasImage ? (
          <div className="bg-white p-4 relative h-48 w-full flex items-center justify-center border-b border-slate-100 overflow-hidden">
            <Image 
              src={product.image} 
              alt={product.name} 
              width={200}
              height={200}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
        ) : (
          <div className="bg-slate-50 p-4 h-24 w-full flex items-center justify-center border-b border-slate-100">
            <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{product.category}</span>
          </div>
        )}

        {/* Content details */}
        <div className="p-4 space-y-3">
          <div>
            <span className="text-[10px] font-semibold text-primary-700 uppercase tracking-wider bg-primary-50 px-2 py-0.5 rounded border border-primary-100">
              {product.category}
            </span>
            <h3 className="font-bold text-slate-900 text-sm mt-2 leading-snug">
              {product.name}
            </h3>
          </div>

          <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Quick Specs */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            {product.specs.slice(0, 3).map((spec, idx) => (
              <div key={idx} className="flex items-start text-[11px] text-slate-500 space-x-1.5">
                <CheckIcon className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                <span className="truncate">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div 
        className="p-4 pt-0 mt-auto flex flex-col gap-2" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <button
            onClick={onSelect}
            className="text-primary-700 hover:text-primary-800 font-medium text-xs cursor-pointer"
          >
            View Details →
          </button>
          <Link
            href={whatsappUrl}
            target="_blank"
            className="text-emerald-700 hover:text-emerald-800 font-medium text-xs flex items-center space-x-1"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-700" />
            <span>Quote</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
