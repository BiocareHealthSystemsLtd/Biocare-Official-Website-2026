import Link from 'next/link';
import { CheckIcon } from './Icons';

const setupPackages = [
  {
    id: 'outpatient',
    title: 'Outpatient Clinic Suite',
    target: 'Ideal for dispensaries, outpatient medical centers, and family health practices',
    equipment: [
      'Adjustable Examination Couch with Paper Roll Holder',
      'Clinical Centrifuge (12-Tube Capacity)',
      'Class B Benchtop Autoclave (24L Sterilizer)',
      'Diagnostic ENT Set (Otoscope, Ophthalmoscope, Specula)',
      'Digital Blood Pressure Unit & Pulse Oximeter'
    ],
    support: 'Includes delivery, unpacking, and user manual walkthrough'
  },
  {
    id: 'maternity',
    title: 'Maternity & Labour Ward Package',
    target: 'Designed for maternity homes, county health centres, and obstetric wings',
    equipment: [
      'Hydraulic Obstetric Delivery Bed with Lithotomy Crutches',
      'Infant Radiant Warmer with Temperature Sensor',
      'Dual-Bottle High-Vacuum Electric Suction Unit',
      'Ultrasonic Fetal Heart Doppler with Display',
      'Stainless Steel Instrument Trolley & Dressing Set'
    ],
    support: 'Includes hydraulic testing, assembly, and 12-month mechanical warranty'
  },
  {
    id: 'laboratory',
    title: 'Diagnostic Pathology Package',
    target: 'Standard diagnostic package for medical laboratories and hospital labs',
    equipment: [
      'Dymind DH36 Auto Hematology Analyzer (60 Tests/Hour)',
      'Semi-Automated Biochemistry Analyzer (AGD 2020)',
      'Olympus CX23 Binocular Clinical Microscope',
      'Laboratory Tube Roller Mixer & Micro-Hematocrit Centrifuge',
      'Starter Reagent Kit (Diluent, Lyse, Detergent, Controls)'
    ],
    support: 'Includes on-site calibration by biomedical engineer and technician training'
  },
  {
    id: 'theatre-icu',
    title: 'Theatre & Critical Care Package',
    target: 'Specialized suite for surgical theatres, minor OT, and step-down recovery units',
    equipment: [
      'Electro-Hydraulic Operating Table with Split-Leg Section',
      'Multi-Parameter Patient Monitor (ECG, NIBP, SpO2, Temp, Resp)',
      'Surgical Ceiling or Mobile Examination Theatre Light',
      'Mobile Emergency Crash Cart with Defibrillator Mount',
      'Medical Oxygen Flowmeter, Regulator & Cylinder Trolley'
    ],
    support: 'Includes electrical safety verification, calibration certification, and SLA options'
  }
];

export default function HotDealsCarousel() {
  return (
    <section className="bg-slate-50 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Facility Procurement Solutions
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Department Setup & Equipment Packages
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
            Curated equipment suites designed to help new clinics and expanding hospitals procure matching hardware with verified technical compatibility.
          </p>
        </div>

        {/* 4 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {setupPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {pkg.title}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-4 pb-3 border-b border-slate-100">
                  {pkg.target}
                </p>

                <span className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider block mb-2">
                  Package Hardware:
                </span>
                <ul className="space-y-2 text-xs text-slate-600 mb-5">
                  {pkg.equipment.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckIcon className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="text-[11px] text-slate-500 leading-tight">
                  <strong>Service:</strong> {pkg.support}
                </div>
                <Link
                  href={`/contact?category=${encodeURIComponent(pkg.title)}`}
                  className="block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2 rounded text-xs transition-colors border border-slate-200"
                >
                  Request Package Pricing
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
