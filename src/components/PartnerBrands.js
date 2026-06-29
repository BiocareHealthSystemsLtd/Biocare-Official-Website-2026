import React from 'react';

const brands = [
  { name: 'Prunus', image: '/images/brand-prunus.png', bgClass: 'bg-white border-gray-100', imgClass: '' },
  { name: 'Anbio', image: '/images/brand-anbio.png', bgClass: 'bg-slate-900 border-slate-800 shadow-slate-900/10', imgClass: '' },
  { name: 'Labcold', image: '/images/brand-labcold.png', bgClass: 'bg-white border-gray-100', imgClass: '' },
  { name: 'Minfound', image: '/images/brand-minfound.png', bgClass: 'bg-white border-gray-100', imgClass: '' },
  { name: 'Zybio', image: '/images/brand-zybio.png', bgClass: 'bg-white border-gray-100', imgClass: 'scale-[3.5]' }
];

export default function PartnerBrands() {
  // Duplicate the list to make it scroll seamlessly
  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest block font-sans">
            OFFICIAL DISTRIBUTOR
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-800 tracking-tight mt-1">
            Global Brands We Represent & Distribute
          </h2>
        </div>

        {/* Scrolling ticker track */}
        <div className="relative w-full flex items-center overflow-hidden py-4 mask-gradient">
          <div className="flex space-x-12 items-center animate-marquee whitespace-nowrap min-w-full">
            {marqueeBrands.map((brand, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-center h-16 w-44 shrink-0 rounded-xl border p-4 shadow-sm hover:shadow-md hover:border-primary-300/30 transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden ${brand.bgClass}`}
              >
                <div className={`flex items-center justify-center h-full w-full ${brand.imgClass || ''}`}>
                  <img 
                    src={brand.image} 
                    alt={`${brand.name} logo`}
                    className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS mask for fade-out effects at edges */}
      <style jsx>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </section>
  );
}
