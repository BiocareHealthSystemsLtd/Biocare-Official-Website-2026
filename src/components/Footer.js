import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '../data/siteConfig';
import categories from '../data/categories.json';
import { PhoneIcon, EmailIcon, MapIcon } from './Icons';

export default function Footer() {
  const [emailInput, setEmailInput] = useState('');
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim() }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing. We will keep you updated on equipment updates and clinical guidelines.');
        setEmailInput('');
      } else {
        const data = await response.json();
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    }
  };

  const footerCategories = categories.slice(0, 7);

  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Info Column */}
        <div className="space-y-4">
          <Link href="/" className="inline-block bg-white p-2 rounded-md">
            <Image 
              src="/images/biocare-logo-wide.png" 
              alt="Biocare Health Systems Limited" 
              width={160}
              height={40}
              className="h-9 w-auto object-contain"
              unoptimized
            />
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            Biocare Health Systems Limited is an authorized supplier of medical equipment, laboratory diagnostics, hospital furniture, and surgical tools in Kenya. Established in 2014, we provide certified hardware, on-site biomedical installation, and ongoing technical maintenance.
          </p>
          <div className="pt-2">
            <span className="text-xs font-semibold text-white block mb-2">Connect With Our Team:</span>
            <div className="flex space-x-3">
              <Link href={siteConfig.socials.facebook} target="_blank" className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-md transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-5 1.55-5 4.5V8z"/>
                </svg>
              </Link>
              <Link href={siteConfig.socials.linkedin} target="_blank" className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-md transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white tracking-wide border-b border-slate-800 pb-2">Navigation</h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Equipment & Products Catalog</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Biocare</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Articles & Technical Guides</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Request a Quotation</Link></li>
            <li className="pt-2">
              <Link href={siteConfig.googleDriveCatalog} target="_blank" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                Download Full Catalog (PDF) →
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories Column */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white tracking-wide border-b border-slate-800 pb-2">Product Categories</h3>
          <ul className="space-y-2 text-xs text-slate-400">
            {footerCategories.map((cat, idx) => (
              <li key={idx}>
                <Link href={`/products?category=${cat.slug}`} className="hover:text-white transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link href="/products" className="text-slate-300 hover:text-white font-medium transition-colors">
                View All Categories...
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Location Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white tracking-wide border-b border-slate-800 pb-2">Nairobi Showroom & Office</h3>
          
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-start space-x-2.5">
              <MapIcon className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                {siteConfig.officeAddress.building}, {siteConfig.officeAddress.street}, {siteConfig.officeAddress.landmark}, Nairobi, Kenya
              </span>
            </li>
            <li className="flex items-center space-x-2.5">
              <PhoneIcon className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Sales: <a href={`tel:${siteConfig.phones[0].link}`} className="hover:text-white text-slate-300">{siteConfig.phones[0].value}</a></span>
            </li>
            <li className="flex items-center space-x-2.5">
              <PhoneIcon className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Admin: <a href={`tel:${siteConfig.phones[1].link}`} className="hover:text-white text-slate-300">{siteConfig.phones[1].value}</a></span>
            </li>
            <li className="flex items-center space-x-2.5">
              <EmailIcon className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white text-slate-300">{siteConfig.email}</a>
            </li>
          </ul>

          <div className="pt-2">
            <span className="text-xs font-semibold text-white block mb-1.5">Equipment Updates:</span>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="bg-slate-800 focus:bg-slate-700 text-white rounded-l px-3 py-2 text-xs focus:outline-none w-full border border-slate-700 placeholder-slate-500"
                aria-label="Newsletter email address"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white px-3.5 rounded-r transition-colors text-xs font-medium"
              >
                Join
              </button>
            </form>
            {message && (
              <span className={`text-[11px] block mt-1.5 ${status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {message}
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Legal Credits */}
      <div className="bg-slate-950 text-slate-500 text-xs py-5 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div>
            <span>© {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.</span>
          </div>
          <div className="flex space-x-6 text-xs text-slate-400">
            <Link href="/about" className="hover:text-white">About Us</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
