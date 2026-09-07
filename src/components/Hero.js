import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '../data/siteConfig';
import { CheckIcon, PhoneIcon } from './Icons';

export default function Hero() {
  return (
    <section className="bg-white text-slate-900 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Text Column */}
        <div className="lg:col-span-7 flex flex-col space-y-5 text-left">
          
          <div className="inline-flex items-center space-x-2 self-start bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded border border-slate-200">
            <span>Nairobi Showroom: Chambers Road, Ngara</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-tight">
            Suppliers of Laboratory Diagnostics, Hospital Furniture and Surgical Equipment in Kenya
          </h1>

          <p className="text-slate-600 text-base leading-relaxed content-prose">
            Biocare Health Systems Limited equips public and private healthcare facilities across Kenya with certified diagnostic analyzers, imaging systems, operating theatre units, and durable ward furniture. All equipment is backed by manufacturer warranties, on-site installation, and preventive maintenance by qualified biomedical engineers.
          </p>

          {/* Operational Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded">
              <span className="font-semibold text-slate-900 block mb-0.5">Authorized Brands</span>
              <span className="text-slate-500">Dymind, Prunus, Browiner, Labcold and Zybio</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded">
              <span className="font-semibold text-slate-900 block mb-0.5">Biomedical Engineers</span>
              <span className="text-slate-500">Installation, staff training and routine calibration</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded">
              <span className="font-semibold text-slate-900 block mb-0.5">Nationwide Delivery</span>
              <span className="text-slate-500">Secure transport across all 47 counties in Kenya</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
            <Link
              href="/contact"
              className="text-center bg-primary-700 hover:bg-primary-800 text-white font-medium py-3 px-6 rounded text-sm transition-colors"
            >
              Request Equipment Quotation
            </Link>
            <Link
              href={siteConfig.googleDriveCatalog}
              target="_blank"
              className="text-center bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-medium py-3 px-6 rounded text-sm transition-colors"
            >
              Download PDF Catalog
            </Link>
            <a
              href={`tel:${siteConfig.phones[0].link}`}
              className="inline-flex items-center justify-center space-x-2 text-slate-700 hover:text-slate-900 py-3 px-4 text-xs font-medium"
            >
              <PhoneIcon className="w-4 h-4 text-slate-500" />
              <span>Call Sales: {siteConfig.phones[0].value}</span>
            </a>
          </div>

        </div>

        {/* Product Showcase Column */}
        <div className="lg:col-span-5">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Featured Diagnostic Analyzer</span>
                <h2 className="text-base font-bold text-slate-900">Dymind DH36 Auto Hematology Analyzer</h2>
              </div>
              <span className="text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600 font-medium">In Stock</span>
            </div>

            {/* Product Image */}
            <div className="bg-white rounded border border-slate-200 p-4 flex items-center justify-center h-52 mb-4">
              <Image 
                src="/images/dymind-dh36.png" 
                alt="Dymind DH36 3-Part Auto Hematology Analyzer" 
                width={260}
                height={200}
                className="max-h-full max-w-full object-contain"
                priority
                unoptimized
              />
            </div>

            {/* Technical Specifications List */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start space-x-2">
                <CheckIcon className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span><strong>Throughput:</strong> 60 tests per hour with 3-part WBC differentiation</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckIcon className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span><strong>Parameters:</strong> 21 reportable parameters and 3 histograms</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckIcon className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span><strong>Sample Volume:</strong> 9 µL whole blood requirement, ideal for pediatric care</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckIcon className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span><strong>Local Support:</strong> Continuous reagent inventory and engineer servicing in Nairobi</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-500">Includes 12-Month Warranty</span>
              <Link 
                href="/products?product=dymind-dh36" 
                className="text-primary-700 hover:text-primary-800 font-medium"
              >
                View Full Specifications →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
