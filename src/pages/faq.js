import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import faqsData from '../data/faqs.json';
import { getBreadcrumbSchema, getFAQSchema } from '../lib/seo';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
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

  const schemas = [
    getBreadcrumbSchema(breadcrumbs),
    getFAQSchema(faqsData)
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <SEO 
        title="Frequently Asked Questions (FAQ) | Biocare Health Systems Kenya"
        description="Find answers to common questions about Biocare Health Systems Limited. Warranty guidelines, delivery across Kenya, biomedical technical support, and quotations."
        schemas={schemas}
      />

      {/* Header */}
      <section className="bg-slate-50 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Customer Support & Procurement
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Review common questions regarding ordering, delivery to Kenyan counties, warranty terms, and biomedical technical services.
          </p>
        </div>
      </section>

      {/* FAQ Workspace */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-6">
        
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs by keyword (e.g., delivery, warranty, reagents, calibration)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-slate-500"
            aria-label="Filter FAQs"
          />
        </div>

        {/* Accordions */}
        {filteredFaqs.length > 0 ? (
          <div className="border border-slate-200 rounded divide-y divide-slate-200 bg-white">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none hover:bg-slate-50"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm pr-4">
                      {faq.question}
                    </span>
                    <span className="text-slate-400 font-bold text-xs shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-slate-600 text-xs leading-relaxed bg-slate-50/50">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded p-8 text-center text-slate-500 text-xs">
            No matching questions found. Please contact our team directly through our quotation form or WhatsApp.
          </div>
        )}

        {/* Support Prompt */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded flex flex-col sm:flex-row justify-between items-center text-xs gap-3">
          <div>
            <span className="font-bold text-slate-800 block">Have a specific question about an equipment tender or model?</span>
            <span className="text-slate-500">Our engineering and sales team in Nairobi is available to assist you.</span>
          </div>
          <Link 
            href="/contact" 
            className="bg-primary-700 hover:bg-primary-800 text-white font-medium px-4 py-2 rounded shrink-0 transition-colors"
          >
            Contact Sales Desk
          </Link>
        </div>

      </section>
    </Layout>
  );
}
