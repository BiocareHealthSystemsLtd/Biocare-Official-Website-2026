import { CheckIcon } from './Icons';

export default function WhyChooseBiocare() {
  const values = [
    {
      title: "Biomedical Technical Support",
      description: "Our certified biomedical engineers provide 24/7 technical support, routine calibration, and fast breakdown response to keep your lab running."
    },
    {
      title: "NEMA & PPB Regulatory Compliance",
      description: "All diagnostic analyzers, radiology equipment, and dental tools meet Pharmacy and Poisons Board and NEMA environmental standards."
    },
    {
      title: "Nationwide Shipping & Delivery",
      description: "We handle secure transportation, unpacking, local calibration, and installation across all 47 counties in Kenya."
    },
    {
      title: "Manufacturer Warranties & SLAs",
      description: "Enjoy complete peace of mind with 12 to 24-month warranties on all machinery, plus tailored preventive maintenance agreements."
    }
  ];

  return (
    <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Summary */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <span className="text-xs font-semibold text-secondary-500 uppercase tracking-widest block font-sans">
              TRUSTED HEALTHCARE PARTNER
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight leading-tight">
              Why Healthcare Facilities Trust Biocare
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0">
              We don't just sell boxes. We establish long-term partnerships with clinics, diagnostic laboratories, and tier-1 hospitals across Kenya by providing continuous technical support and quality medical equipment.
            </p>
            <div className="pt-4 border-t border-primary-700/60 hidden lg:block">
              <span className="text-sm font-bold text-white block mb-1">Office Showroom Location:</span>
              <span className="text-xs text-gray-400">Ground Floor, Githinji Investments Building, Chambers Road, Nairobi</span>
            </div>
          </div>

          {/* Core Values grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val, idx) => (
              <div 
                key={idx} 
                className="bg-primary-800/40 border border-primary-700/60 p-6 rounded-2xl flex items-start space-x-4 hover:bg-primary-800/60 transition-colors"
              >
                <div className="bg-secondary-600/20 p-2 rounded-lg text-secondary-500 shrink-0">
                  <CheckIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-white text-base mb-2">
                    {val.title}
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
