import { useState } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import faqsData from '../data/faqs.json';
import { getBreadcrumbSchema } from '../lib/seo';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredFaqs = faqsData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const breadcrumbs = [
    { name: 'Frequently Asked Questions', path: '/faq' }
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <SEO 
        title="Frequently Asked Questions (FAQ) | Biocare Kenya"
        description="Find answers to common questions about Biocare Health Systems. Warranty guidelines, Nairobi delivery timelines, technical support SLAs, and quotations."
        schemas={[getBreadcrumbSchema(breadcrumbs)]}
      />

      {/* Header */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold text-secondary-600 uppercase tracking-widest block font-sans">
            CUSTOMER SUPPORT
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-700 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto font-normal">
            Can't find what you need? Search our FAQs below or contact our showroom directly.
          </p>
        </div>
      </section>

      {/* FAQ Workspace */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-6">
        
        {/* Local Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Type keywords to search FAQs (e.g. delivery, warranty)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-600"
            aria-label="Filter FAQs"
          />
        </div>

        {/* Accordions */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4 border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`bg-white border-b border-gray-100 last:border-0 transition-colors ${isOpen ? 'bg-slate-50/30' : ''}`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-extrabold text-gray-800 text-xs md:text-sm">
                      {faq.question}
                    </span>
                    <span className={`text-primary-600 font-bold transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  <div 
                    className={`px-5 overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-[300px] pb-4' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-600 text-xs leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center text-gray-500 font-normal">
            No matching questions found. Drop us a message on the contact page.
          </div>
        )}

      </section>
    </Layout>
  );
}
