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
  const latestPosts = blogPosts.filter(post => post.status === 'published').slice(0, 3); // Display latest 3 published articles
  const schemas = [getOrganizationSchema(), getLocalBusinessSchema()];

  return (
    <Layout>
      {/* Search Engine Optimization meta details & schemas */}
      <SEO 
        title="Medical Equipment Suppliers Kenya | Hospital & Lab Equipment"
        description="Leading medical equipment supplier in Kenya. Dymind laboratory diagnostics, hospital furniture, radiology systems & dental chairs. Sales & biomedical engineering."
        schemas={schemas}
      />

      {/* Hero Banner Section */}
      <Hero />

      {/* Partner Brand Logos Infinite Marquee */}
      <PartnerBrands />

      {/* Featured Products Carousel */}
      <FeaturedProductsCarousel />

      {/* Promotional Hot Deals */}
      <HotDealsCarousel />

      {/* Main Categories Navigation Grid */}
      <CategoryGrid />

      {/* Value proposition & Trust badges */}
      <WhyChooseBiocare />

      {/* Customer Testimonial Feedback slider */}
      <TestimonialSection />

      {/* Dynamic SEO Blog Articles Section */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-secondary-600 uppercase tracking-widest block font-sans">
              EDUCATION & INSIGHTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-700 tracking-tight mt-1">
              Latest Medical Technology Blog
            </h2>
            <p className="mt-2 text-gray-500 max-w-xl mx-auto text-sm">
              Discover tips on laboratory optimization, hospital furniture selections, and digital x-ray standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {latestPosts.map((post, idx) => (
              <BlogCard key={idx} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Selection Diagnostic Wizard */}
      <DiagnosticWizard />

      {/* Map Section */}
      <LocationMap />

      {/* Dual CTA Contact & Form Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8" id="quote-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Details column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold text-secondary-600 uppercase tracking-widest block font-sans">
                TALK TO A SPECIALIST
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-700 tracking-tight mt-1">
                Get a Formal Quotation Today
              </h2>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              Have specific catalog queries or bulk equipment supply requests? Our sales leads will compile options matching your budget.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-slate-50 border rounded-2xl">
                <PhoneIcon className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800 text-xs block">Call Direct:</span>
                  <a href={`tel:${siteConfig.phones[0].link}`} className="text-primary-600 hover:underline text-xs block font-semibold mt-0.5">
                    {siteConfig.phones[0].value} (Sales Line)
                  </a>
                  <a href={`tel:${siteConfig.phones[1].link}`} className="text-primary-600 hover:underline text-xs block font-semibold">
                    {siteConfig.phones[1].value} (Admin Line)
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-slate-50 border rounded-2xl">
                <EmailIcon className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800 text-xs block">Email Enquiries:</span>
                  <a href={`mailto:${siteConfig.email}`} className="text-primary-600 hover:underline text-xs block font-semibold mt-0.5">
                    {siteConfig.email}
                  </a>
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
