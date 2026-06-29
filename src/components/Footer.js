import { useState } from 'react';
import Link from 'next/link';
import siteConfig from '../data/siteConfig';
import categories from '../data/categories.json';
import { PhoneIcon, EmailIcon, MapIcon, WhatsAppIcon, SendIcon } from './Icons';

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
        setMessage('Thank you for subscribing to our newsletter!');
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

  const footerCategories = categories.slice(0, 6);

  return (
    <footer className="bg-primary-900 text-gray-300 font-sans border-t-4 border-secondary-600">
      {/* Top Footer Widget Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Info Column */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <img 
              src="/images/biocare-logo-wide.png" 
              alt="Biocare Health Systems Limited Logo" 
              className="h-12 w-auto object-contain bg-white rounded p-1"
            />
          </div>
          <p className="text-xs font-bold text-secondary-400 tracking-wide">
            Empowering Healthcare and Innovation
          </p>
          <p className="text-xs text-gray-400 leading-relaxed font-normal">
            {siteConfig.description}
          </p>
          <div className="pt-2">
            <span className="text-xs font-semibold text-white block mb-2 uppercase tracking-widest">Connect with Us:</span>
            <div className="flex space-x-4">
              <Link href={siteConfig.socials.facebook} target="_blank" className="bg-primary-800 hover:bg-primary-700 text-white p-2 rounded-full transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-5 1.55-5 4.5V8z"/>
                </svg>
              </Link>
              <Link href={siteConfig.socials.instagram} target="_blank" className="bg-primary-800 hover:bg-primary-700 text-white p-2 rounded-full transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </Link>
              <Link href={siteConfig.socials.linkedin} target="_blank" className="bg-primary-800 hover:bg-primary-700 text-white p-2 rounded-full transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Links Column */}
        <div className="flex flex-col space-y-4">
          <span className="text-sm font-semibold text-white uppercase tracking-wider border-b border-primary-800 pb-2">Quick Navigation</span>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-white transition-colors">Home Page</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Medical Catalog</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Biocare</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">SEO Blog / News</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">Support & FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li className="pt-2">
              <Link href={siteConfig.googleDriveCatalog} target="_blank" className="text-secondary-500 font-bold hover:text-secondary-400 transition-colors uppercase tracking-widest text-[10px]">
                Download Catalogue (PDF)
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories Column */}
        <div className="flex flex-col space-y-4">
          <span className="text-sm font-semibold text-white uppercase tracking-wider border-b border-primary-800 pb-2">Equipment Categories</span>
          <ul className="space-y-2 text-xs">
            {footerCategories.map((cat, idx) => (
              <li key={idx}>
                <Link href={`/products?category=${cat.slug}`} className="hover:text-white transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
            <li><Link href="/products" className="hover:text-white transition-colors italic">View All Categories...</Link></li>
          </ul>
        </div>

        {/* Contact & Newsletter Column */}
        <div className="flex flex-col space-y-4">
          <span className="text-sm font-semibold text-white uppercase tracking-wider border-b border-primary-800 pb-2">Nairobi Showroom</span>
          
          <ul className="space-y-3 text-xs">
            <li className="flex items-start space-x-2">
              <MapIcon className="w-4 h-4 text-secondary-500 shrink-0 mt-0.5" />
              <span className="text-gray-400 font-normal">
                {siteConfig.officeAddress.building}, {siteConfig.officeAddress.street}, {siteConfig.officeAddress.landmark}, Nairobi
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <PhoneIcon className="w-4 h-4 text-secondary-500 shrink-0" />
              <a href={`tel:${siteConfig.phones[0].link}`} className="hover:text-white transition-colors">{siteConfig.phones[0].value}</a>
            </li>
            <li className="flex items-center space-x-2">
              <EmailIcon className="w-4 h-4 text-secondary-500 shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a>
            </li>
          </ul>

          <div className="pt-2">
            <span className="text-xs font-semibold text-white block mb-2 uppercase tracking-wider">Join Our Newsletter:</span>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <div className="relative flex">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-primary-800 focus:bg-primary-700 text-white rounded-l px-3 py-2 text-xs focus:outline-none w-full border border-primary-700 placeholder-gray-500"
                  aria-label="Newsletter email address"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-secondary-600 hover:bg-secondary-700 disabled:bg-gray-700 text-white px-3.5 rounded-r transition-colors flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
              {message && (
                <span className={`text-[10px] ${status === 'success' ? 'text-secondary-400' : 'text-red-400'}`}>
                  {message}
                </span>
              )}
            </form>
          </div>
        </div>

      </div>

      {/* Bottom Footer Credits */}
      <div className="bg-primary-950 text-gray-500 text-[10px] md:text-xs py-6 border-t border-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <span>© {new Date().getFullYear()} {siteConfig.companyName}. All Rights Reserved.</span>
          </div>
          <div className="flex space-x-6 text-[10px] md:text-xs font-medium">
            <Link href="/about" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-gray-300">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
