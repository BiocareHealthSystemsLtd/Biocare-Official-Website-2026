import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import FeaturedProductsCarousel from '../components/FeaturedProductsCarousel';
import HotDealsCarousel from '../components/HotDealsCarousel';
import PartnerBrands from '../components/PartnerBrands';
import CategoryGrid from '../components/CategoryGrid';
import WhyChooseBiocare from '../components/WhyChooseBiocare';
import TestimonialSection from '../components/TestimonialSection';
import BlogCard from '../components/BlogCard';
import ContactForm from '../components/ContactForm';
import LocationMap from '../components/LocationMap';
import blogPosts from '../data/blog-posts.json';
import DiagnosticWizard from '../components/DiagnosticWizard';
import siteConfig from '../data/siteConfig';
import { getOrganizationSchema, getLocalBusinessSchema } from '../lib/seo';
import { PhoneIcon, EmailIcon, MapIcon } from '../components/Icons';

export default function Home() {
  const latestPosts = blogPosts.filter(post => post.status === 'published').slice(0, 3);
  const schemas = [getOrganizationSchema(), getLocalBusinessSchema()];

  return (
    <Layout>
      <SEO 
        title="Medical Equipment Suppliers Kenya | Hospital & Lab Equipment"
        description="Biocare Health Systems Limited is an authorized supplier of medical equipment, laboratory diagnostics, hospital furniture, and surgical tools in Nairobi, Kenya. Nationwide delivery and biomedical support."
        schemas={schemas}
      />

      {/* Hero Section */}
      <Hero />

      {/* Authorized Manufacturer Partners */}
      <PartnerBrands />

      {/* Featured Medical Equipment */}
      <FeaturedProductsCarousel />

      {/* Facility Setup Packages */}
      <HotDealsCarousel />

      {/* Category Directory */}
      <CategoryGrid />

      {/* Biomedical Engineering & Operational Standards */}
      <WhyChooseBiocare />

      {/* Healthcare Facilities Served & Procurement Workflow */}
      <TestimonialSection />

      {/* Clinical Equipment & Technical Guides */}
      <section className="bg-slate-50 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Technical Articles
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Clinical Equipment Guides & Updates
              </h2>
            </div>
            <p className="text-xs text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
              Technical articles on laboratory hematology selection, continuous glucose monitors, hospital bed maintenance, and diagnostic setups in Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post, idx) => (
              <BlogCard key={idx} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Facility Equipment Planning Tool */}
      <DiagnosticWizard />

      {/* Nairobi Showroom & Location */}
      <LocationMap />

      {/* Quotation Request Section */}
      <section className="bg-white py-12 lg:py-16 px-4 sm:px-6 lg:px-8" id="quote-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Details column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Direct Procurement Desk
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Request an Official Price Quotation
              </h2>
            </div>
            
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Submit your equipment specifications or hospital tender inquiries. Our sales engineers in Nairobi compile formal proforma invoices including warranty terms, delivery timelines, and optional maintenance service level agreements.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded">
                <div className="flex items-start space-x-2.5">
                  <PhoneIcon className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Telephone Inquiries:</span>
                    <a href={`tel:${siteConfig.phones[0].link}`} className="text-primary-700 hover:underline block font-medium">
                      {siteConfig.phones[0].value} (Sales Desk)
                    </a>
                    <a href={`tel:${siteConfig.phones[1].link}`} className="text-primary-700 hover:underline block font-medium">
                      {siteConfig.phones[1].value} (Office Administration)
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded">
                <div className="flex items-start space-x-2.5">
                  <EmailIcon className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Email Communications:</span>
                    <a href={`mailto:${siteConfig.email}`} className="text-primary-700 hover:underline block font-medium">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded">
                <div className="flex items-start space-x-2.5">
                  <MapIcon className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Showroom & Workshop:</span>
                    <span className="text-slate-600 leading-relaxed block">
                      {siteConfig.officeAddress.building}, {siteConfig.officeAddress.street}, {siteConfig.officeAddress.landmark}, Nairobi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </section>
    </Layout>
  );
}
