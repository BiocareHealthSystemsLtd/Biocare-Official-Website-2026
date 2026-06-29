import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import siteConfig from '../data/siteConfig';
import categories from '../data/categories.json';
import productsData from '../data/products.json';
import { MenuIcon, CloseIcon, SearchIcon, PhoneIcon, EmailIcon, WhatsAppIcon } from './Icons';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const [suggestions, setSuggestions] = useState([]);

  // Handle autocomplete query filtering
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const filtered = productsData.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Clear suggestions on route navigation
  useEffect(() => {
    setSuggestions([]);
  }, [router.asPath]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.asPath]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const featuredShortcuts = [
    { name: 'Hematology Analyzer', path: '/products?category=hematology' },
    { name: 'Delivery Bed', path: '/products?category=furniture' },
    { name: 'X-Ray Printer', path: '/products?category=imaging' },
    { name: 'Dental Unit', path: '/products?category=dental' }
  ];

  return (
    <>
      {/* Top Banner Bar - Hidden on Mobile */}
      <div className="bg-primary-700 text-white text-xs py-2 px-4 hidden md:block border-b border-primary-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center space-x-1.5">
              <PhoneIcon className="w-3.5 h-3.5 text-secondary-500" />
              <span>Call: {siteConfig.phones[0].value} / {siteConfig.phones[1].value}</span>
            </span>
            <span className="flex items-center space-x-1.5 font-sans">
              <EmailIcon className="w-3.5 h-3.5 text-secondary-500" />
              <span>{siteConfig.email}</span>
            </span>
          </div>
          <div className="flex space-x-6 items-center">
            <span>Hours: {siteConfig.operatingHours.split('|')[0]}</span>
            <Link 
              href={siteConfig.googleDriveCatalog} 
              target="_blank" 
              className="bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-1 px-3 rounded transition-colors text-[10px] uppercase tracking-wider"
              aria-label="Download Catalogue"
            >
              Download Catalogue
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <header className={`w-full z-40 transition-all duration-300 ${scrolled ? 'fixed top-0 shadow-md glass-nav border-b border-gray-200' : 'relative bg-white border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img 
              src="/images/biocare-logo-wide.png" 
              alt="Biocare Health Systems Limited Logo" 
              className="h-11 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-8 items-center font-medium text-gray-600 text-sm">
            {navLinks.map((link, idx) => (
              <Link 
                key={idx} 
                href={link.path}
                className={`hover:text-primary-600 transition-colors py-2 relative ${router.pathname === link.path ? 'text-primary-600 font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:height-[2px] after:bg-primary-600' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search form & WA CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 focus:bg-white text-gray-800 rounded-full pl-4 pr-10 py-1.5 text-xs focus:ring-1 focus:ring-primary-600 focus:outline-none w-48 lg:w-56 border border-gray-200 transition-all"
                aria-label="Search equipment"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-600" aria-label="Submit search">
                <SearchIcon className="w-4 h-4" />
              </button>

              {/* Autocomplete Suggestions Box */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden text-left py-1 text-xs">
                  {suggestions.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products#${p.id}`}
                      onClick={() => {
                        setSearchQuery('');
                        setSuggestions([]);
                      }}
                      className="block px-4 py-2 hover:bg-slate-50 transition-colors border-b last:border-0 border-gray-100"
                    >
                      <span className="font-bold text-slate-800 block truncate">{p.name}</span>
                      <span className="text-[10px] text-gray-400 capitalize block mt-0.5">{p.category}</span>
                    </Link>
                  ))}
                </div>
              )}
            </form>

            <Link
              href={siteConfig.whatsapp}
              target="_blank"
              className="bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba56] hover:to-[#0e6b60] text-white flex items-center space-x-2 text-xs font-semibold py-1.5 px-4 rounded-full shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300"
              aria-label="Contact us on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </Link>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex md:hidden items-center space-x-3">
            <Link
              href={siteConfig.whatsapp}
              target="_blank"
              className="bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba56] hover:to-[#0e6b60] text-white p-2 rounded-full shadow-lg shadow-emerald-500/10 hover:scale-110 transition-all duration-300"
              aria-label="Contact us on WhatsApp"
            >
              <WhatsAppIcon className="w-4.5 h-4.5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-primary-600 focus:outline-none p-1.5 border rounded-lg"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Shortcuts sub-bar for desktop */}
        <div className="hidden lg:block bg-gray-50 border-t border-b border-gray-100 py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-semibold text-gray-500">
            <div className="flex space-x-6 items-center">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Quick Shortcuts:</span>
              {featuredShortcuts.map((shortcut, idx) => (
                <Link key={idx} href={shortcut.path} className="hover:text-primary-600 transition-colors">
                  {shortcut.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-primary-600 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse"></span>
              <span>Ground Floor, Githinji Investments Building, Nairobi</span>
            </div>
          </div>
        </div>
      </header>

      {/* Spacing correction when fixed header active */}
      {scrolled && <div className="h-[73px] lg:h-[105px] hidden md:block"></div>}
      {scrolled && <div className="h-[60px] md:hidden"></div>}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          
          {/* Drawer content */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col p-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <Link href="/" className="flex items-center">
                <img 
                  src="/images/biocare-logo.png" 
                  alt="Biocare Health Systems Limited Logo" 
                  className="h-14 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-primary-600"
                aria-label="Close menu"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative mb-6">
              <input
                type="text"
                placeholder="Search medical equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 text-gray-800 rounded-lg pl-4 pr-10 py-2 text-xs focus:ring-1 focus:ring-primary-600 focus:outline-none w-full border border-gray-200"
                aria-label="Search equipment"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-600" aria-label="Submit search">
                <SearchIcon className="w-4 h-4" />
              </button>

              {/* Autocomplete Suggestions Box for Mobile */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden text-left py-1 text-xs">
                  {suggestions.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products#${p.id}`}
                      onClick={() => {
                        setSearchQuery('');
                        setSuggestions([]);
                        setMobileMenuOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-slate-50 transition-colors border-b last:border-0 border-gray-100"
                    >
                      <span className="font-bold text-slate-800 block truncate">{p.name}</span>
                      <span className="text-[9px] text-gray-400 capitalize block mt-0.5">{p.category}</span>
                    </Link>
                  ))}
                </div>
              )}
            </form>

            {/* Navigation links */}
            <nav className="flex flex-col space-y-4 font-medium text-gray-700 text-sm">
              {navLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  href={link.path}
                  className={`hover:text-primary-600 py-1.5 border-b border-gray-50 transition-colors ${router.pathname === link.path ? 'text-primary-600 font-semibold' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Quick product catalog download */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col space-y-4">
              <Link
                href={siteConfig.googleDriveCatalog}
                target="_blank"
                className="bg-primary-600 hover:bg-primary-700 text-white text-center font-semibold py-2 px-4 rounded-lg shadow-sm text-xs transition-colors"
                aria-label="Download Catalogue"
              >
                Download PDF Catalogue
              </Link>
              <Link
                href={`tel:${siteConfig.phones[0].link}`}
                className="flex items-center justify-center space-x-2 text-gray-600 hover:text-primary-600 text-xs font-semibold py-2 border rounded-lg border-gray-200"
              >
                <PhoneIcon className="w-3.5 h-3.5" />
                <span>Call Sales: {siteConfig.phones[0].value}</span>
              </Link>
            </div>

            <div className="mt-auto text-[10px] text-gray-400 text-center font-sans">
              <p>© {new Date().getFullYear()} Biocare Health Systems Ltd.</p>
              <p>Chambers Road, Ngara, Nairobi</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
