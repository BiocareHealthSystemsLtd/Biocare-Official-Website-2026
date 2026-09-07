import { CheckIcon } from './Icons';
import siteConfig from '../data/siteConfig';

export default function WhyChooseBiocare() {
  const capabilities = [
    {
      title: "Certified Biomedical Engineering",
      description: "Our in-house engineering team provides on-site hardware uncrating, physical installation, electrical grounding checks, and precise sensor calibration."
    },
    {
      title: "Clinical Staff Operator Training",
      description: "Every major equipment installation includes hands-on training for laboratory technologists, nurses, and clinical officers to ensure accurate testing and safe usage."
    },
    {
      title: "Dedicated Reagents & Spare Parts Hub",
      description: "Our Nairobi warehouse maintains continuous stock of original Dymind reagents, lyse solutions, biochemistry packs, replacement valves, and optical bulbs."
    },
    {
      title: "PPB & KeBS Regulatory Compliance",
      description: "All diagnostic analyzers, dental chairs, and ward equipment comply with Pharmacy and Poisons Board regulatory standards and KeBS safety specifications."
    }
  ];

  return (
    <section className="bg-[#141830] text-slate-200 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#232a54]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Overview text */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold text-cerulean-400 uppercase tracking-wider block">
              Biomedical Engineering & Support
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Operational Standards and Technical After-Sales Care
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Medical equipment requires dependable installation, verified calibration, and reliable consumable replenishment. Biocare Health Systems Limited maintains an active biomedical engineering workshop in Nairobi to guarantee that your clinical operations continue without avoidable diagnostic downtime.
            </p>

            <div className="pt-4 border-t border-[#232a54] text-xs text-slate-400 space-y-1">
              <span className="font-semibold text-white block">Nairobi Service Center & Showroom:</span>
              <p>{siteConfig.officeAddress.building}, {siteConfig.officeAddress.street}, {siteConfig.officeAddress.landmark}, Nairobi</p>
              <p>Direct Support Lines: <span className="text-cerulean-300 font-medium">{siteConfig.phones[0].value} / {siteConfig.phones[1].value}</span></p>
            </div>
          </div>

          {/* 4 Pillars in a clean 2x2 grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#1c2242] border border-[#2d3666] p-5 rounded hover:border-[#3e4a8a] transition-colors"
              >
                <div className="flex items-center space-x-2 text-cerulean-400 mb-2">
                  <CheckIcon className="w-4 h-4 text-cerulean-400 shrink-0" />
                  <h3 className="font-bold text-white text-sm">
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
