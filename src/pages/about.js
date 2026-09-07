import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { getBreadcrumbSchema } from '../lib/seo';
import { CheckIcon } from '../components/Icons';
import siteConfig from '../data/siteConfig';

export default function About() {
  const breadcrumbs = [
    { name: 'About Us', path: '/about' }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Technical Consultation & Sizing',
      desc: 'We review facility test volumes, patient flow, power conditions, and clinical requirements to recommend appropriate equipment specifications.'
    },
    {
      step: '02',
      title: 'Pre-Delivery Inspection & Testing',
      desc: 'All hardware undergoes bench testing, component verification, and calibration in our Nairobi workshop prior to field dispatch.'
    },
    {
      step: '03',
      title: 'On-Site Installation & Staff Training',
      desc: 'Our certified biomedical engineers handle uncrating, physical assembly, calibration, and hands-on operational training for local technologists and nursing staff.'
    },
    {
      step: '04',
      title: 'Preventive Maintenance & Reagent Supply',
      desc: 'We provide structured service level agreements (SLAs), bi-annual calibration, emergency breakdown response, and scheduled reagent restocking.'
    }
  ];

  const pillars = [
    {
      title: 'Pharmacy & Poisons Board Licensed',
      desc: 'Biocare is fully registered and licensed to distribute medical devices, diagnostics, and surgical equipment in Kenya, guaranteeing compliance with national healthcare regulatory frameworks.'
    },
    {
      title: 'Kenya Bureau of Standards (KeBS)',
      desc: 'All diagnostic machinery, patient monitors, and hospital furniture distributed by Biocare conform to KeBS safety specifications and international manufacturing quality standards (ISO / CE).'
    },
    {
      title: 'Manufacturer-Trained Engineers',
      desc: 'Our engineering personnel undergo technical training directly with partner manufacturers, ensuring accurate optical calibration, fluidics troubleshooting, and genuine spare parts replacement.'
    }
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <SEO 
        title="About Biocare Health Systems Limited | Nairobi, Kenya"
        description="Learn about Biocare Health Systems Limited. Established in 2014, we supply certified medical equipment, laboratory diagnostics, and biomedical engineering services across Kenya."
        schemas={[getBreadcrumbSchema(breadcrumbs)]}
      />

      {/* Main Header */}
      <section className="bg-slate-50 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Company Profile & Operations
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Supplying Healthcare Infrastructure Across Kenya Since 2014
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto content-prose">
            Biocare Health Systems Limited is an authorized distributor of laboratory diagnostics, medical equipment, hospital furniture, and surgical tools based in Nairobi, Kenya.
          </p>
        </div>
      </section>

      {/* History & Core Purpose */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed content-prose">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Our Background and Healthcare Commitment
          </h2>
          <p>
            Established in 2014, Biocare Health Systems Limited was founded to address critical supply chain and technical gaps in the Kenyan medical sector. Rather than functioning solely as an equipment importer, Biocare was structured around a combined delivery and biomedical support model, ensuring that every machine supplied is correctly installed, properly calibrated, and supported by local spare parts.
          </p>
          <p>
            Over the past decade, we have equipped county referral hospitals, private family practices, mission health facilities, and dedicated pathology laboratories throughout Kenya. We maintain direct partnerships with recognized medical hardware manufacturers, including Dymind Biotechnology, Prunus Medical, Browiner Radiology, Labcold Medical Refrigeration, Minfound Systems, and Zybio Diagnostics.
          </p>
          <p>
            From our headquarters and showroom on Chambers Road, Ngara, Nairobi, our logistics team coordinates delivery, transit insurance, and engineering field dispatch to all 47 counties in Kenya.
          </p>
        </div>

        {/* Company Overview Block */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-6 rounded text-xs space-y-4">
          <span className="font-bold text-slate-900 text-sm block border-b border-slate-200 pb-2">
            Company Quick Reference
          </span>
          
          <div className="space-y-2.5 text-slate-600">
            <div>
              <strong className="text-slate-800 block">Registered Entity:</strong>
              <span>Biocare Health Systems Limited</span>
            </div>
            <div>
              <strong className="text-slate-800 block">Year Established:</strong>
              <span>2014 (Over a decade of continuous service in Kenya)</span>
            </div>
            <div>
              <strong className="text-slate-800 block">Headquarters & Showroom:</strong>
              <span>Ground Floor, Githinji Investments Building, Chambers Road, Ngara, Nairobi</span>
            </div>
            <div>
              <strong className="text-slate-800 block">Primary Sectors:</strong>
              <span>Laboratory diagnostics, hospital furniture, operating theatre systems, dental units, radiology, and clinical consumables</span>
            </div>
            <div>
              <strong className="text-slate-800 block">Technical Capability:</strong>
              <span>In-house biomedical engineering workshop, on-site calibration, and preventive maintenance SLAs</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Operational Workflow */}
      <section className="bg-slate-50 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 pb-4 border-b border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Operational Standards
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              How We Support Equipment Deployments
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {workflowSteps.map((wf) => (
              <div key={wf.step} className="bg-white border border-slate-200 p-5 rounded flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-primary-700 block mb-2 font-mono">
                    STAGE {wf.step}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    {wf.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {wf.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Governance & Standards */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 pb-4 border-b border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Quality Assurance
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Regulatory Compliance & Ethical Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <div key={i} className="bg-white border border-slate-200 p-5 rounded space-y-2">
              <div className="flex items-center space-x-2 text-primary-700">
                <CheckIcon className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">{pillar.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
