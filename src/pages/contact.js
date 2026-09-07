import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import LocationMap from '../components/LocationMap';
import { getBreadcrumbSchema } from '../lib/seo';
import siteConfig from '../data/siteConfig';
import { PhoneIcon, EmailIcon, MapIcon, WhatsAppIcon } from '../components/Icons';

export default function Contact() {
  const router = useRouter();
  const { category, message } = router.query;

  const breadcrumbs = [
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <SEO 
        title="Contact Biocare Health Systems Limited | Nairobi, Kenya"
        description="Contact Biocare Health Systems Limited. Call 0723 835776 or visit our showroom on Chambers Road, Ngara, Nairobi for medical equipment, diagnostics & formal quotations."
        schemas={[getBreadcrumbSchema(breadcrumbs)]}
      />

      {/* Hero Header */}
      <section className="bg-slate-50 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Direct Procurement & Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Contact Our Nairobi Sales & Engineering Desk
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Request official equipment proforma quotations, schedule a showroom inspection, or speak directly with our biomedical engineering staff.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Info Area */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#141830] text-white p-6 sm:p-7 rounded space-y-5 border border-[#232a54]">
            <div>
              <span className="text-xs font-semibold text-cerulean-400 uppercase tracking-wider block">
                Official Head Office
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                Biocare Health Systems Limited
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <MapIcon className="w-4 h-4 text-cerulean-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-slate-200">Showroom & Workshop Address:</span>
                  <span className="text-slate-400 leading-relaxed block mt-0.5">
                    {siteConfig.officeAddress.building},<br />
                    {siteConfig.officeAddress.street}, {siteConfig.officeAddress.landmark},<br />
                    Ngara, Nairobi, Kenya
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <PhoneIcon className="w-4 h-4 text-cerulean-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-slate-200">Telephone Lines:</span>
                  <a href={`tel:${siteConfig.phones[0].link}`} className="text-white hover:text-cerulean-300 transition-colors block mt-0.5 font-medium">
                    {siteConfig.phones[0].value} (Sales & Quotations)
                  </a>
                  <a href={`tel:${siteConfig.phones[1].link}`} className="text-white hover:text-cerulean-300 transition-colors block font-medium">
                    {siteConfig.phones[1].value} (Admin & Technical Support)
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <EmailIcon className="w-4 h-4 text-cerulean-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-slate-200">Email Correspondence:</span>
                  <a href={`mailto:${siteConfig.email}`} className="text-white hover:text-cerulean-300 transition-colors block mt-0.5">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <span className="text-xs text-slate-400 block">
                Operating Hours: Mon - Fri: 8:00 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM
              </span>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 px-4 rounded text-xs transition-colors flex items-center justify-center space-x-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-7">
          <ContactForm interestCategory={category} initialMessage={message} />
        </div>

      </section>

      {/* Location Map */}
      <LocationMap />
    </Layout>
  );
}
