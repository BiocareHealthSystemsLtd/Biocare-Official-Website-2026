import { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  LaboratoryIcon, 
  FurnitureIcon, 
  DentalIcon, 
  IcuIcon,
  CheckIcon
} from './Icons';

const facilityTypes = [
  {
    id: 'clinic',
    name: 'General Clinic / Outpatient Centre',
    icon: FurnitureIcon,
    description: 'Standard outpatient clinics, primary healthcare practices, and family health centres.',
    defaultCategories: ['furniture', 'laboratory', 'emergency'],
    recommendedEquipment: [
      { name: 'Hydraulic Examination Couch & Screen', category: 'Hospital Furniture' },
      { name: 'Dymind DH36 Auto Hematology Analyzer', category: 'Hematology' },
      { name: 'Clinical Microscope (Olympus CX23)', category: 'Laboratory' },
      { name: 'Benchtop Autoclave (24L) & Centrifuge', category: 'Laboratory' }
    ]
  },
  {
    id: 'hospital',
    name: 'Comprehensive Hospital / Maternity Ward',
    icon: IcuIcon,
    description: 'Inpatient hospitals, maternity homes, ICU departments, and surgical wings.',
    defaultCategories: ['furniture', 'icu', 'imaging', 'surgical'],
    recommendedEquipment: [
      { name: 'ICU Multi-Parameter Patient Monitor', category: 'ICU Equipment' },
      { name: 'Browiner Digital Radiology Scanner & Imager', category: 'Imaging' },
      { name: 'Electro-Hydraulic Operating Table with Split Legs', category: 'Hospital Furniture' },
      { name: 'Surgical Autoclave & Ceiling Theatre Light', category: 'Surgical' }
    ]
  },
  {
    id: 'lab',
    name: 'Clinical Pathology Diagnostic Laboratory',
    icon: LaboratoryIcon,
    description: 'Diagnostic pathology centres, reference labs, and testing facilities.',
    defaultCategories: ['hematology', 'biochemistry', 'laboratory', 'consumables'],
    recommendedEquipment: [
      { name: 'Dymind DH36 / DH76 Automated Hematology Analyzer', category: 'Hematology' },
      { name: 'Semi-Automated / Automated Chemistry Analyzer', category: 'Biochemistry' },
      { name: 'Laboratory Centrifuge, Water Bath & Medical Fridge', category: 'Laboratory' },
      { name: 'CBC Reagents, Diluents & Controls Starter Pack', category: 'Consumables' }
    ]
  },
  {
    id: 'dental',
    name: 'Dental Clinic / Oral Surgery Practice',
    icon: DentalIcon,
    description: 'Private dental surgeries, orthodontic clinics, and hospital dental departments.',
    defaultCategories: ['dental', 'laboratory', 'furniture'],
    recommendedEquipment: [
      { name: 'Integrated Dental Chair Unit with Compressor', category: 'Dental' },
      { name: 'Portable Dental X-Ray & Digital Sensor', category: 'Dental' },
      { name: 'Dental Instrument Class B Autoclave', category: 'Laboratory' }
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
    
    const focusString = selectedFocus.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(', ');
    const equipmentString = selectedFacility.recommendedEquipment
      .map(e => `- ${e.name} (${e.category})`)
      .join('\n');

    const message = `Inquiry regarding equipment setup for a ${selectedFacility.name}:\n\nDepartments: ${focusString}\n\nEquipment Checklist:\n${equipmentString}\n\nPlease provide formal quotation, delivery timelines to our location, and warranty details.`;

    router.push({
      pathname: '/contact',
      query: {
        category: targetCategory,
        message: message
      }
    });
  };

  return (
    <section className="bg-slate-50 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Planning & Sizing Guide
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Facility Equipment Planning Tool
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
            Select your clinical facility type to review recommended equipment suites and generate a structured quotation request.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8">
          
          {/* Step Indicators */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6 text-xs font-medium">
            <div className={`flex items-center space-x-1.5 ${step >= 1 ? 'text-primary-700 font-bold' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${step >= 1 ? 'bg-primary-100 text-primary-800' : 'bg-slate-100 text-slate-400'}`}>
                1
              </span>
              <span><span className="hidden sm:inline">Facility </span>Type</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className={`flex items-center space-x-1.5 ${step >= 2 ? 'text-primary-700 font-bold' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${step >= 2 ? 'bg-primary-100 text-primary-800' : 'bg-slate-100 text-slate-400'}`}>
                2
              </span>
              <span>Departments</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className={`flex items-center space-x-1.5 ${step >= 3 ? 'text-primary-700 font-bold' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${step >= 3 ? 'bg-primary-100 text-primary-800' : 'bg-slate-100 text-slate-400'}`}>
                3
              </span>
              <span><span className="hidden sm:inline">Equipment </span>Checklist</span>
            </div>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Step 1: What type of healthcare facility are you equipping?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {facilityTypes.map((facility) => {
                  const Icon = facility.icon;
                  return (
                    <button
                      key={facility.id}
                      onClick={() => handleSelectFacility(facility)}
                      className="text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded p-4 transition-colors flex items-start space-x-3.5 cursor-pointer"
                    >
                      <div className="p-2 rounded bg-white border border-slate-200 shrink-0 text-slate-700">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{facility.name}</h4>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">{facility.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && selectedFacility && (
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">
                  Step 2: Key departments for {selectedFacility.name}:
                </h3>
                <button onClick={handleReset} className="text-xs text-primary-700 hover:underline">
                  Change Facility
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'furniture', label: 'Hospital Furniture' },
                  { id: 'laboratory', label: 'Laboratory Diagnostics' },
                  { id: 'hematology', label: 'Hematology Analyzers' },
                  { id: 'biochemistry', label: 'Biochemistry Analyzers' },
                  { id: 'imaging', label: 'X-Ray & Radiology' },
                  { id: 'icu', label: 'ICU & Patient Monitors' },
                  { id: 'surgical', label: 'Operating Theatre' },
                  { id: 'dental', label: 'Dental Units' },
                  { id: 'consumables', label: 'Reagents & Consumables' }
                ].map((cat) => {
                  const isSelected = selectedFocus.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleFocus(cat.id)}
                      className={`p-2.5 rounded border text-xs font-medium text-left transition-colors flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-primary-50 border-primary-300 text-primary-900 font-semibold' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {isSelected && <CheckIcon className="w-3.5 h-3.5 text-primary-700" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded text-xs font-medium text-slate-700"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2 bg-primary-700 hover:bg-primary-800 text-white rounded text-xs font-medium"
                >
                  Generate Equipment Checklist →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && selectedFacility && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Recommended Suite for {selectedFacility.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Review your preliminary equipment list before forwarding to our quotation specialists.
                  </p>
                </div>
                <button onClick={handleReset} className="text-xs text-primary-700 hover:underline">
                  Start Over
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Equipment checklist */}
                <div className="md:col-span-7 bg-slate-50 rounded border border-slate-200 p-4 space-y-2">
                  <span className="text-xs font-semibold text-slate-700 block mb-2">
                    Core Equipment Checklist:
                  </span>
                  <div className="divide-y divide-slate-200">
                    {selectedFacility.recommendedEquipment.map((eq, i) => (
                      <div key={i} className="py-2 flex justify-between items-center text-xs">
                        <span className="text-slate-800 font-medium">{eq.name}</span>
                        <span className="text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {eq.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scope & Quotation Trigger */}
                <div className="md:col-span-5 bg-slate-100 rounded border border-slate-200 p-4 flex flex-col justify-between space-y-4">
                  <div className="space-y-2 text-xs text-slate-600">
                    <span className="font-bold text-slate-900 block">Included Services:</span>
                    <ul className="space-y-1">
                      <li>• Formal proforma invoice for financing or county tender</li>
                      <li>• Verified warranty (12 - 24 months per item)</li>
                      <li>• On-site delivery and physical installation</li>
                      <li>• Biomedical engineer calibration and training</li>
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={handleRequestQuote}
                      className="w-full bg-primary-700 hover:bg-primary-800 text-white font-medium py-2.5 rounded text-xs transition-colors"
                    >
                      Request Formal Quote for This Suite
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 py-1.5 rounded text-xs"
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
