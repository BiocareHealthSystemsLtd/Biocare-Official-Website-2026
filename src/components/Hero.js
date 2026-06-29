import Link from 'next/link';
import siteConfig from '../data/siteConfig';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white text-slate-800 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      {/* Soft Background Graphic elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-secondary-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Column */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center space-x-2 self-center lg:self-start bg-primary-50 border border-primary-100 px-3 py-1 rounded-full text-xs font-semibold text-primary-700 tracking-wide uppercase font-sans">
            <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse"></span>
            <span>Nairobi, Kenya's Leading Supplier</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight text-slate-800">
            Reliable Medical <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Equipment & Diagnostics
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Equipping clinics and hospitals across Kenya with cutting-edge Dymind hematology analyzers, digital radiology, ergonomic delivery tables, and specialized dental suites. Backed by expert local service SLA contracts.
          </p>

          {/* Quick Stats/Trust badges in Light Theme */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-lg mx-auto lg:mx-0 pt-4 text-center">
            <div className="bg-primary-50/50 border border-primary-100 p-3 rounded-xl shadow-sm">
              <span className="block text-xl md:text-2xl font-bold text-primary-600 font-display">100%</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Certified Gear</span>
            </div>
            <div className="bg-primary-50/50 border border-primary-100 p-3 rounded-xl shadow-sm">
              <span className="block text-xl md:text-2xl font-bold text-primary-600 font-display">24/7</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Local Support</span>
            </div>
            <div className="bg-primary-50/50 border border-primary-100 p-3 rounded-xl shadow-sm">
              <span className="block text-xl md:text-2xl font-bold text-primary-600 font-display">47</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Counties Served</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
            <Link
              href="/contact"
              className="w-full sm:w-auto text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm"
              aria-label="Request quote from Biocare"
            >
              Request Quick Quote
            </Link>
            <Link
              href={siteConfig.googleDriveCatalog}
              target="_blank"
              className="w-full sm:w-auto text-center bg-transparent hover:bg-slate-50 text-slate-700 border-2 border-slate-200 font-bold py-3 px-8 rounded-lg transition-all text-sm"
              aria-label="Download full PDF catalog"
            >
              Download PDF Catalog
            </Link>
          </div>

        </div>

        {/* Dynamic Mockup Image Column */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px]">
            {/* Visual Card */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200/80 shadow-2xl flex flex-col justify-between p-8 overflow-hidden animate-pulse-slow">
              
              {/* Pulse scanning line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary-600 to-transparent animate-[bounce_4s_infinite]"></div>

              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-primary-600 tracking-widest uppercase">Diagnostic Feed</span>
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-500"></span>
              </div>

              {/* Graphic representation of analyzer/cells */}
              <div className="my-auto flex flex-col items-center justify-center space-y-4 py-2">
                <div className="relative w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center bg-white rounded-2xl p-3 shadow-inner overflow-hidden">
                  <img 
                    src="/images/dymind-dh36.png" 
                    alt="Dymind DH36 Hematology Analyzer" 
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-center space-y-1">
                  <span className="block font-display font-extrabold text-base sm:text-lg text-slate-800">Dymind DH36</span>
                  <span className="block font-sans text-xs text-slate-500">3-Part Auto Hematology Analyzer | 60 Tests/Hr</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-100 pt-4">
                <span>SYSTEM CALIBRATED</span>
                <span className="text-secondary-600 font-extrabold">ONLINE</span>
              </div>
            </div>

            {/* Smaller floats */}
            <div className="absolute -bottom-4 -left-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex items-center space-x-3 max-w-[200px]">
              <div className="bg-secondary-600/20 p-2 rounded-lg text-secondary-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth="2.2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="block font-bold text-xs text-white">KeBS Approved</span>
                <span className="block text-[9px] text-slate-400 font-semibold uppercase">Quality Assured</span>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
