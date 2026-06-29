import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { getBreadcrumbSchema } from '../lib/seo';
import { CheckIcon } from '../components/Icons';

export default function About() {
  const breadcrumbs = [
    { name: 'About Us', path: '/about' }
  ];

  const values = [
    { title: 'Quality Assurance', desc: 'We only partner with trusted international brands such as Dymind, Olympus, and HU.Q to ensure lab diagnostics operate with high accuracy.' },
    { title: 'Local Expert Engineers', desc: 'Our Nairobi-based biomedical engineering team is trained directly by manufacturers to offer expert calibration and fast troubleshooting.' },
    { title: 'Ethical Compliance', desc: 'We are fully registered and approved by NEMA and the Pharmacy and Poisons Board of Kenya, ensuring strict adherence to environmental safety.' }
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <SEO 
        title="About Biocare Health Systems | Medical Equipment Kenya"
        description="Learn about Biocare Health Systems Limited. We are Nairobi's trusted medical equipment supplier with 10+ years experience supplying Kenyan clinics."
        schemas={[getBreadcrumbSchema(breadcrumbs)]}
      />

      {/* Main Banner */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold text-secondary-600 uppercase tracking-widest block font-sans">
            OUR COMPANY STORY
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-700 tracking-tight">
            Supporting Healthcare Delivery in Kenya
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Biocare Health Systems Limited is a leading distributor of laboratory analyzers, diagnostic systems, hospital furniture, and clinical supplies.
          </p>
        </div>
      </section>

      {/* Profile & History */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-extrabold text-primary-700 tracking-tight">
            A Trusted Medical Supplier Since 2014
          </h2>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-normal">
            Founded in 2014, Biocare Health Systems Ltd is a leading provider of medical equipment, devices, and consumables in Kenya. We specialize in the supply, installation, training, troubleshooting, repair, and maintenance of a wide range of hospital and laboratory equipment, including machines for laboratory, theatre, and dental departments, as well as hospital furniture and diagnostics.
          </p>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-normal">
            Our commitment to quality and excellence has made us a trusted partner for over 500 healthcare facilities across Kenya and beyond. Partnering with top manufacturers, we ensure that our clients receive reliable, efficient, and high-quality medical solutions that enhance the seamless operation of healthcare services.
          </p>
        </div>

        {/* Visual blocks */}
        <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center space-y-1">
            <span className="block text-3xl font-extrabold text-primary-600 font-display">12+</span>
            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Years Active</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center space-y-1">
            <span className="block text-3xl font-extrabold text-primary-600 font-display">500+</span>
            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Labs Equipped</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center space-y-1">
            <span className="block text-3xl font-extrabold text-primary-600 font-display">47</span>
            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Counties Reached</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center space-y-1">
            <span className="block text-3xl font-extrabold text-primary-600 font-display">100%</span>
            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Local Support</span>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          <div className="bg-primary-800/40 border border-primary-700/60 p-8 rounded-3xl space-y-4">
            <span className="text-secondary-500 text-2xl">🎯</span>
            <h3 className="font-display font-extrabold text-xl text-white">Our Mission</h3>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-normal">
              Our mission is to deliver quality healthcare services and products at affordable costs for healthcare providers. We are committed in the maintenance of excellent services to all partners in the healthcare industry.
            </p>
          </div>

          <div className="bg-primary-800/40 border border-primary-700/60 p-8 rounded-3xl space-y-4">
            <span className="text-secondary-500 text-2xl">👁️</span>
            <h3 className="font-display font-extrabold text-xl text-white">Our Vision</h3>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-normal">
              Our vision is to be the market leader in providing quality healthcare products in East Africa.
            </p>
          </div>

        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-display font-extrabold text-primary-700 tracking-tight">
            Our Core Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div key={i} className="bg-white border border-gray-200/80 p-6 rounded-2xl hover:shadow-md transition-all space-y-3">
              <div className="bg-secondary-600/15 w-8 h-8 rounded-lg flex items-center justify-center text-secondary-600">
                <CheckIcon className="w-4 h-4" />
              </div>
              <h4 className="font-display font-extrabold text-gray-800 text-base">{v.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed font-normal">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
