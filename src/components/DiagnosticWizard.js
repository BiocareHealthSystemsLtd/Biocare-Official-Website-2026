import { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  LaboratoryIcon, 
  FurnitureIcon, 
  DentalIcon, 
  IcuIcon, 
  SurgicalIcon,
  ImagingIcon,
  HematologyIcon,
  BiochemistryIcon
} from './Icons';

const facilityTypes = [
  {
    id: 'clinic',
    name: 'General Clinic / Medical Center',
    icon: FurnitureIcon,
    description: 'Perfect for standard clinics, outpatient facilities, and family health practices.',
    defaultCategories: ['furniture', 'laboratory', 'emergency'],
    recommendedEquipment: [
      { name: 'Hydraulic Delivery Bed / Examination Couch', category: 'furniture' },
      { name: 'Dymind DH36 Hematology Analyzer', category: 'hematology' },
      { name: 'Clinical Microscope (Olympus CX23)', category: 'laboratory' },
      { name: 'Basic Centrifuge & Autoclave', category: 'laboratory' }
    ]
  },
  {
    id: 'hospital',
    name: 'Comprehensive Hospital / Maternity',
    icon: IcuIcon,
    description: 'Designed for inpatient facilities, ICU wards, maternity clinics, and surgical centers.',
    defaultCategories: ['furniture', 'icu', 'imaging', 'surgical'],
    recommendedEquipment: [
      { name: 'ICU Multi-parameter Patient Monitor', category: 'icu' },
      { name: 'Radiology Ultrasound Scanner & Dry Film Printer', category: 'imaging' },
      { name: 'Electro-Hydraulic Operating Table', category: 'furniture' },
      { name: 'Surgical Instrument Autoclaves & OT Light', category: 'surgical' }
    ]
  },
  {
    id: 'lab',
    name: 'Diagnostic Laboratory',
    icon: LaboratoryIcon,
    description: 'Tailored for specialized clinical pathology labs and diagnostic centers.',
    defaultCategories: ['hematology', 'biochemistry', 'laboratory', 'consumables'],
    recommendedEquipment: [
      { name: 'Dymind DH800 / DH36 Auto Hematology Analyzer', category: 'hematology' },
      { name: 'Semi-Auto / Full-Auto Biochemistry Analyzer', category: 'biochemistry' },
      { name: 'Lab Centrifuge, Incubator & Refrigerator', category: 'laboratory' },
      { name: 'High-Grade Reagents & Consumables Pack', category: 'consumables' }
    ]
  },
  {
    id: 'dental',
    name: 'Specialized Dental Clinic',
    icon: DentalIcon,
    description: 'For oral surgery centers, family dental practices, and cosmetic dentistry.',
    defaultCategories: ['dental', 'laboratory', 'furniture'],
    recommendedEquipment: [
      { name: 'Premium Dental Chair Unit with Full Accessories', category: 'dental' },
      { name: 'Portable Dental X-Ray & Sensor', category: 'dental' },
      { name: 'Dental Instrument Autoclave & Sterilizer', category: 'laboratory' }
    ]
  }
];

export default function DiagnosticWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedFocus, setSelectedFocus] = useState([]);

  const handleSelectFacility = (facility) => {
    setSelectedFacility(facility);
    setSelectedFocus(facility.defaultCategories);
    setStep(2);
  };

  const toggleFocus = (category) => {
    setSelectedFocus((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleReset = () => {
    setSelectedFacility(null);
    setSelectedFocus([]);
    setStep(1);
  };

  const handleRequestQuote = () => {
    if (!selectedFacility) return;

    const categoryMapping = {
      clinic: 'Hospital Furniture',
      hospital: 'ICU Equipment',
      lab: 'Hematology Equipment',
      dental: 'Dental Equipment'
    };

    const targetCategory = categoryMapping[selectedFacility.id] || 'Hospital Furniture';
    
    // Construct prefilled email/message
    const focusString = selectedFocus.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(', ');
    const equipmentString = selectedFacility.recommendedEquipment
      .map(e => `- ${e.name}`)
      .join('\n');

    const message = `Hello Biocare Team,\n\nWe are looking to set up/upgrade a "${selectedFacility.name}" and would like a custom quote for the following equipment suite:\n\nFocus Areas: ${focusString}\n\nRecommended Bundle:\n${equipmentString}\n\nPlease share availability, delivery terms, and formal pricing.`;

    router.push({
      pathname: '/contact',
      query: {
        category: targetCategory,
        message: message
      }
    });
  };

  return (
    <section className="bg-gradient-to-br from-primary-900 via-primary-950 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-primary-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-semibold text-secondary-400 uppercase tracking-widest block font-sans">
            INTERACTIVE SETUP GUIDE
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Select Your Facility & Configure Your Quote
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto leading-relaxed font-normal">
            Answer a few quick questions to receive a tailored equipment recommendation list curated by our clinical engineers.
          </p>
        </div>

        {/* Wizard Panel */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Step Indicators */}
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
            <div className="flex items-center space-x-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? 'bg-secondary-600 text-white' : 'bg-white/10 text-gray-400'}`}>
                1
              </span>
              <span className="text-xs font-semibold hidden sm:inline">Facility Type</span>
            </div>
            <div className="w-12 h-[1px] bg-white/10 shrink-0"></div>
            <div className="flex items-center space-x-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-secondary-600 text-white' : 'bg-white/10 text-gray-400'}`}>
                2
              </span>
              <span className="text-xs font-semibold hidden sm:inline">Focus Areas</span>
            </div>
            <div className="w-12 h-[1px] bg-white/10 shrink-0"></div>
            <div className="flex items-center space-x-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 3 ? 'bg-secondary-600 text-white' : 'bg-white/10 text-gray-400'}`}>
                3
              </span>
              <span className="text-xs font-semibold hidden sm:inline">Tailored Package</span>
            </div>
          </div>

          {/* Wizard Content */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-secondary-400 mb-4 font-display">What type of medical facility are you configuring?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facilityTypes.map((facility) => {
                  const Icon = facility.icon;
                  return (
                    <button
                      key={facility.id}
                      onClick={() => handleSelectFacility(facility)}
                      className="text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary-500/50 rounded-2xl p-5 transition-all duration-300 group flex items-start space-x-4"
                    >
                      <div className="bg-secondary-900/50 text-secondary-400 p-3 rounded-xl group-hover:bg-secondary-600 group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-white group-hover:text-secondary-400 transition-colors font-display">{facility.name}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed font-normal">{facility.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && selectedFacility && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-secondary-400 font-display">Select key focus areas for {selectedFacility.name}:</h3>
                <button onClick={handleReset} className="text-xs text-gray-400 hover:text-white underline">
                  Back to Step 1
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['furniture', 'laboratory', 'icu', 'imaging', 'surgical', 'dental', 'hematology', 'biochemistry', 'consumables'].map((cat) => {
                  const isSelected = selectedFocus.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleFocus(cat)}
                      className={`py-3 px-4 rounded-xl border text-xs font-semibold capitalize transition-all ${
                        isSelected 
                          ? 'bg-secondary-600 border-secondary-500 text-white shadow-md' 
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {cat === 'icu' ? 'ICU Equipment' : cat.replace('-', ' ')}
                    </button>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border border-white/20 hover:bg-white/10 rounded-xl text-xs font-bold transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-secondary-600 hover:bg-secondary-700 rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Configure Bundle
                </button>
              </div>
            </div>
          )}

          {step === 3 && selectedFacility && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-secondary-400 font-display">Recommended Suite for {selectedFacility.name}</h3>
                  <p className="text-xs text-gray-400 font-normal">Review your clinical suite configuration list below</p>
                </div>
                <button onClick={handleReset} className="text-xs text-gray-400 hover:text-white underline">
                  Start Over
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Equipment List */}
                <div className="lg:col-span-7 bg-white/5 rounded-2xl p-5 border border-white/10 space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-secondary-400 block border-b border-white/10 pb-2">
                    Recommended Equipment Checklist
                  </span>
                  <div className="divide-y divide-white/5">
                    {selectedFacility.recommendedEquipment.map((eq, i) => (
                      <div key={i} className="py-2.5 flex justify-between items-center text-xs">
                        <span className="text-gray-200 font-medium">{eq.name}</span>
                        <span className="text-[10px] text-secondary-400 capitalize px-2 py-0.5 bg-secondary-900/50 rounded border border-secondary-800/30">
                          {eq.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bundle Benefits & CTA */}
                <div className="lg:col-span-5 bg-gradient-to-br from-secondary-900/30 to-primary-950/40 rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                  <div className="space-y-4 mb-6">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-secondary-400 block border-b border-white/10 pb-2">
                      Included Package Benefits
                    </span>
                    <ul className="space-y-2 text-xs text-gray-300">
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full shrink-0"></span>
                        <span>Full 1-Year Comprehensive Warranty</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full shrink-0"></span>
                        <span>Free Delivery within Nairobi</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full shrink-0"></span>
                        <span>On-site Installation & Staff Training</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full shrink-0"></span>
                        <span>24/7 Biomedical Engineer Standby</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleRequestQuote}
                      className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-lg flex items-center justify-center space-x-2"
                    >
                      <span>Request Custom Bundle Quote</span>
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      className="w-full bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-2 rounded-xl text-xs transition-all border border-white/10"
                    >
                      Back to Step 2
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
