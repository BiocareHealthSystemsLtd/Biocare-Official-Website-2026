import Link from 'next/link';

const clientTiers = [
  {
    tier: "County & Referral Hospitals",
    description: "Equipping public and private referral facilities with high-throughput hematology analyzers, digital X-ray systems, multi-parameter ICU monitors, and operating theatre suites.",
    keyServices: "Site power verification, manufacturer warranty compliance, and service level maintenance agreements."
  },
  {
    tier: "Private Clinics & Family Practices",
    description: "Setting up outpatient practices with hydraulic examination couches, benchtop autoclaves, diagnostic sets, and point-of-care blood glucose and chemistry units.",
    keyServices: "Cost-effective equipment packages, straightforward procurement, and rapid delivery within Nairobi and across counties."
  },
  {
    tier: "Clinical Pathology Laboratories",
    description: "Deploying automated Dymind hematology analyzers, semi-automated biochemistry stations, Olympus microscopes, and cold chain laboratory refrigeration.",
    keyServices: "Monthly reagent replenishment schedules, emergency breakdown visits, and optical/sensor recalibration."
  },
  {
    tier: "Maternity & Nursing Homes",
    description: "Supplying ergonomic obstetric delivery tables, radiant infant warmers, ultrasonic fetal dopplers, and durable multi-crank patient ward beds.",
    keyServices: "Mechanical testing, side-rail safety compliance, and operator instructions for nursing staff."
  }
];

export default function TestimonialSection() {
  return (
    <section className="bg-white py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Institutional Capabilities
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Healthcare Facilities We Equip Across Kenya
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
            Biocare partners with hospital directors, laboratory heads, and county health procurement teams to supply reliable clinical hardware.
          </p>
        </div>

        {/* 4 Tiers List/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clientTiers.map((client, idx) => (
            <div 
              key={idx} 
              className="p-5 border border-slate-200 rounded bg-slate-50 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-primary-700 uppercase tracking-wider block mb-1">
                  Sector 0{idx + 1}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {client.tier}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {client.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs text-slate-500">
                <strong className="text-slate-700">Support Approach:</strong> {client.keyServices}
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Summary */}
        <div className="mt-8 p-6 bg-slate-100 border border-slate-200 rounded text-xs text-slate-700">
          <h4 className="font-bold text-slate-900 mb-2 text-sm">
            Standard Procurement & Handover Workflow
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <span className="font-semibold text-primary-700 block mb-1">1. Consultation</span>
              <p className="text-slate-600 leading-relaxed">We review facility workload, test volume, and budget to recommend matching machinery.</p>
            </div>
            <div>
              <span className="font-semibold text-primary-700 block mb-1">2. Formal Quote</span>
              <p className="text-slate-600 leading-relaxed">Detailed quotation with warranty terms, accessory lists, and delivery timelines.</p>
            </div>
            <div>
              <span className="font-semibold text-primary-700 block mb-1">3. Delivery & Setup</span>
              <p className="text-slate-600 leading-relaxed">Secure transport, on-site assembly, electrical checks, and calibration by engineers.</p>
            </div>
            <div>
              <span className="font-semibold text-primary-700 block mb-1">4. Training & SLA</span>
              <p className="text-slate-600 leading-relaxed">Hands-on user training for operators followed by scheduled preventative maintenance.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
