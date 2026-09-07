import React from 'react';
import Image from 'next/image';

const partnerBrands = [
  { 
    name: 'Prunus', 
    image: '/images/brand-prunus.png', 
    category: 'ICU Ventilators & Anaesthesia',
    bgClass: 'bg-white' 
  },
  { 
    name: 'Anbio', 
    image: '/images/brand-anbio.png', 
    category: 'Point-of-Care FIA & Dry Chem',
    bgClass: 'bg-slate-900' 
  },
  { 
    name: 'Labcold', 
    image: '/images/brand-labcold.png', 
    category: 'Blood Bank & Vaccine Cold Chain',
    bgClass: 'bg-white' 
  },
  { 
    name: 'Minfound', 
    image: '/images/brand-minfound.png', 
    category: 'CT Scanners & Digital Radiology',
    bgClass: 'bg-white' 
  },
  { 
    name: 'Zybio', 
    image: '/images/brand-zybio.png', 
    category: 'Automated Chemistry Analyzers',
    bgClass: 'bg-white' 
  }
];

export default function PartnerBrands() {
  // 4 sets (20 items total): Set A (10 items) and Set B (10 items)
  // Perfectly seamless continuous loop at 50% translation across any screen/window width
  const tickerItems = [
    ...partnerBrands, 
    ...partnerBrands, 
    ...partnerBrands, 
    ...partnerBrands
  ];

  return (
    <section className="bg-slate-50 py-10 border-b border-slate-200 overflow-hidden w-full">
      {/* Header aligned with standard page max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-3 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Equipment Distribution
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Authorized Manufacturer Partnerships
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
            Biocare is an authorized Kenyan distributor and certified biomedical service partner for international diagnostic manufacturers.
          </p>
        </div>
      </div>

      {/* Auto-scrolling ticker track spanning full window width */}
      <div className="relative w-full overflow-hidden ticker-mask py-2">
        <div 
          className="partner-ticker-track flex flex-row flex-nowrap items-center space-x-5 py-1"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            width: 'max-content'
          }}
        >
          {tickerItems.map((brand, idx) => (
            <div 
              key={idx} 
              className="w-64 h-20 bg-white border border-slate-200 rounded p-3 flex items-center space-x-3 shrink-0 shadow-xs hover:border-slate-300 transition-colors"
              style={{ flexShrink: 0 }}
            >
              <div className={`h-14 w-24 shrink-0 flex items-center justify-center rounded p-1.5 ${brand.bgClass} border border-slate-100`}>
                <Image 
                  src={brand.image} 
                  alt={`${brand.name} logo`}
                  width={110}
                  height={40}
                  className="max-h-full max-w-full object-contain"
                  unoptimized
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-bold text-slate-900 text-xs block truncate">{brand.name}</span>
                <span className="text-[11px] text-slate-500 block leading-tight mt-0.5 line-clamp-2">{brand.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
