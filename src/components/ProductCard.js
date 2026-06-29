import Link from 'next/link';
import { CheckIcon, WhatsAppIcon } from './Icons';
import siteConfig from '../data/siteConfig';

export default function ProductCard({ product }) {
  const whatsappUrl = `https://wa.me/254723835776?text=Hi%20Biocare%20Health%2520Systems%2C%20I%20am%20interested%20in%20the%20following%20product%3A%20${encodeURIComponent(product.name)}`;

  return (
    <div 
      className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full"
      id={product.id}
    >
      <div>
        {/* Visual Showcase Panel */}
        <div className="bg-white p-6 relative h-48 w-full flex items-center justify-center border-b border-gray-100 overflow-hidden">
          {product.image && !product.image.includes('placeholder') ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300 filter drop-shadow-md"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center font-display font-bold text-primary-200">
              {/* Visual Icon Box */}
              <div className="w-24 h-24 bg-primary-600/10 border border-primary-500/10 rounded-2xl flex flex-col justify-between p-2 shadow-inner">
                <span className="text-[7px] text-primary-600 font-sans tracking-wide font-bold">MODEL</span>
                <svg className="w-10 h-10 m-auto text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-[7px] text-gray-400 text-center font-normal uppercase tracking-wider">{product.category}</span>
              </div>
              
              <span className="text-[9px] text-gray-400 absolute bottom-0 font-sans font-normal truncate max-w-[200px]">
                {product.name}
              </span>
            </div>
          )}

          {/* Deal details overlay if present */}
          {product.onHotDeal && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow">
              {product.dealDiscount || "PROMO"}
            </div>
          )}
        </div>

        {/* Content details */}
        <div className="p-5 space-y-4">
          <div>
            <span className="bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              {product.category}
            </span>
            <h3 className="font-display font-extrabold text-gray-800 text-sm sm:text-base mt-2">
              {product.name}
            </h3>
          </div>

          <p className="text-gray-600 text-xs leading-relaxed font-normal">
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
      <div className="p-5 pt-0 mt-auto grid grid-cols-2 gap-2">
        <Link
          href={whatsappUrl}
          target="_blank"
          className="bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba56] hover:to-[#0e6b60] text-white font-bold py-2 px-3 rounded-lg text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:-translate-y-0.5"
          aria-label={`Get quote on WhatsApp for ${product.name}`}
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
          <span>Get Quote</span>
        </Link>
        
        <Link
          href={product.googleDriveLink || siteConfig.googleDriveCatalog}
          target="_blank"
          className="bg-transparent border border-gray-300 hover:bg-slate-50 text-gray-700 text-center font-bold py-2 rounded text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center"
          aria-label={`Download PDF brochure for ${product.name}`}
        >
          Brochure
        </Link>
      </div>
    </div>
  );
}
