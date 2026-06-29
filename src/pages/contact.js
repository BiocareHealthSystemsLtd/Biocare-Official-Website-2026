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
        title="Contact Biocare Health Systems | Medical Equipment Kenya"
        description="Contact Biocare Health Systems Limited. Call 0723 835776 or visit our showroom on Chambers Road, Ngara, Nairobi for diagnostics, hospital furniture & lab equipment."
        schemas={[getBreadcrumbSchema(breadcrumbs)]}
      />

      {/* Hero Header */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold text-secondary-600 uppercase tracking-widest block font-sans">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-700 tracking-tight">
            We are Ready to Support Your Medical Needs
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xl mx-auto font-normal">
            Visit our showroom, chat with our engineers, or drop us an inquiry to request formal pricing brochures.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Info Area */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-primary-900 text-white p-6 md:p-8 rounded-3xl space-y-6 border-b-4 border-secondary-600">
            <div>
              <span className="text-xs font-semibold text-secondary-500 uppercase tracking-widest block font-sans">
                CONTACT CHANNELS
              </span>
              <h2 className="text-xl font-display font-extrabold mt-1">
                Biocare Headquarters
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <MapIcon className="w-5 h-5 text-secondary-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Physical Showroom:</span>
                  <span className="text-gray-300 leading-relaxed block mt-0.5">
                    {siteConfig.officeAddress.building},<br />
                    {siteConfig.officeAddress.street}, {siteConfig.officeAddress.landmark},<br />
                    Ngara, Nairobi, Kenya
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <PhoneIcon className="w-5 h-5 text-secondary-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Call Sales & Enquiries:</span>
                  <a href={`tel:${siteConfig.phones[0].link}`} className="text-secondary-400 hover:underline block mt-0.5 font-sans font-semibold">
                    {siteConfig.phones[0].value} (Sales Lead)
                  </a>
                  <a href={`tel:${siteConfig.phones[1].link}`} className="text-secondary-400 hover:underline block font-sans font-semibold">
                    {siteConfig.phones[1].value} (Admin & Support)
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <EmailIcon className="w-5 h-5 text-secondary-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Email Address:</span>
                  <a href={`mailto:${siteConfig.email}`} className="text-secondary-400 hover:underline block mt-0.5">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-primary-800 flex flex-col space-y-3">
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                className="bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba56] hover:to-[#0e6b60] text-white font-bold py-3 px-4 rounded-xl text-xs transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chat with Sales on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-7">
          <ContactForm interestCategory={category} initialMessage={message} />
        </div>

      </section>

      {/* Embedded Location Map */}
      <LocationMap />
    </Layout>
  );
}
