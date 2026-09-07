import React from 'react';
import Image from 'next/image';

const partnerBrands = [
  { 
    name: 'Prunus', 
    image: '/images/brand-prunus.png', 
    category: 'ICU Ventilators & Anaesthesia Workstations',
    bgClass: 'bg-white' 
  },
  { 
    name: 'Anbio', 
    image: '/images/brand-anbio.png', 
    category: 'Point-of-Care FIA & Dry Chemistry',
    bgClass: 'bg-slate-900' 
  },
  { 
    name: 'Labcold', 
    image: '/images/brand-labcold.png', 
    category: 'Medical Refrigeration & Blood Bank Cold Chain',
    bgClass: 'bg-white' 
  },
  { 
    name: 'Minfound', 
    image: '/images/brand-minfound.png', 
    category: 'Diagnostic CT Scanners & Digital Radiology',
    bgClass: 'bg-white' 
  },
  { 
    name: 'Zybio', 
    image: '/images/brand-zybio.png', 
    category: 'Clinical Chemistry Analyzers & Reagents',
    bgClass: 'bg-white' 
  }
];

export default function PartnerBrands() {
  return (
    <section className="bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Equipment Distribution
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Authorized Manufacturer Partnerships
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
            Biocare supplies and services hardware directly from certified medical manufacturers with full factory warranty and technical backing.
          </p>
        </div>

        {/* Structured Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {partnerBrands.map((brand, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200 rounded p-4 flex flex-col justify-between"
            >
              <div className={`h-14 w-full flex items-center justify-center rounded p-2 mb-3 ${brand.bgClass}`}>
                <Image 
                  src={brand.image} 
                  alt={`${brand.name} logo`}
                  width={140}
                  height={44}
                  className="max-h-full max-w-full object-contain"
                  unoptimized
                />
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="font-semibold text-slate-900 text-xs block">{brand.name}</span>
                <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">{brand.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
