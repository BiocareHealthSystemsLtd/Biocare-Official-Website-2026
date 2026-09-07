import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import siteConfig from '../data/siteConfig';
import productsData from '../data/products.json';
import { MenuIcon, CloseIcon, SearchIcon, PhoneIcon, EmailIcon, WhatsAppIcon } from './Icons';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const suggestions = searchQuery.trim().length >= 2 
    ? productsData.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products & Equipment', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Articles', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const featuredShortcuts = [
    { name: 'Hematology Analyzers', path: '/products?category=hematology' },
    { name: 'Hospital Furniture', path: '/products?category=furniture' },
    { name: 'Radiology & X-Ray', path: '/products?category=imaging' },
    { name: 'Dental Chairs', path: '/products?category=dental' },
    { name: 'Operating Theatre', path: '/products?category=surgical' }
  ];

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6 items-center">
            <span className="flex items-center space-x-2">
              <PhoneIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Direct Sales: <a href={`tel:${siteConfig.phones[0].link}`} className="text-white hover:underline">{siteConfig.phones[0].value}</a></span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center space-x-2">
              <EmailIcon className="w-3.5 h-3.5 text-slate-400" />
              <a href={`mailto:${siteConfig.email}`} className="text-white hover:underline">{siteConfig.email}</a>
            </span>
          </div>
          <div className="flex space-x-4 items-center">
            <span className="text-slate-400">Nairobi Showroom: Chambers Rd, Ngara</span>
            <span className="text-slate-600">|</span>
            <Link 
              href={siteConfig.googleDriveCatalog} 
              target="_blank" 
              className="text-white hover:text-slate-200 font-medium underline underline-offset-2"
            >
              Download PDF Catalog
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <header className={`w-full z-40 transition-colors duration-150 ${scrolled ? 'fixed top-0 site-nav-scrolled bg-white border-b border-slate-200' : 'relative bg-white border-b border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image 
              src="/images/biocare-logo-wide.png" 
              alt="Biocare Health Systems Limited" 
              width={180}
              height={44}
              className="h-10 md:h-11 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-7 items-center font-medium text-slate-700 text-sm">
            {navLinks.map((link, idx) => {
              const isActive = router.pathname === link.path;
              return (
                <Link 
                  key={idx} 
                  href={link.path}
                  className={`py-1 transition-colors ${isActive ? 'text-primary-700 font-semibold border-b-2 border-primary-700' : 'hover:text-primary-700'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Search form & WhatsApp contact */}
          <div className="hidden md:flex items-center space-x-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search equipment or catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 focus:bg-white text-slate-900 rounded-md pl-3.5 pr-9 py-2 text-xs border border-slate-300 focus:border-slate-500 focus:outline-none w-48 lg:w-56 transition-colors"
                aria-label="Search equipment"
              />
              <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700" aria-label="Submit search">
                <SearchIcon className="w-4 h-4" />
              </button>

              {/* Autocomplete Suggestions Box */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-50 overflow-hidden text-left py-1 text-xs">
                  {suggestions.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products?product=${encodeURIComponent(p.id)}`}
                      onClick={() => setSearchQuery('')}
                      className="block px-3.5 py-2 hover:bg-slate-50 transition-colors border-b last:border-0 border-slate-100"
                    >
                      <span className="font-semibold text-slate-800 block truncate">{p.name}</span>
                      <span className="text-[11px] text-slate-500 capitalize block mt-0.5">{p.category}</span>
                    </Link>
                  ))}
                </div>
              )}
            </form>

            <Link
              href={siteConfig.whatsapp}
              target="_blank"
              className="bg-emerald-700 hover:bg-emerald-800 text-white flex items-center space-x-2 text-xs font-semibold py-2 px-3.5 rounded-md transition-colors"
              aria-label="Contact via WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>WhatsApp</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href={siteConfig.whatsapp}
              target="_blank"
              className="bg-emerald-700 text-white p-2 rounded-md"
              aria-label="Contact via WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 hover:text-slate-900 p-2 border border-slate-300 rounded-md"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Shortcuts sub-bar for desktop */}
        <div className="hidden lg:block bg-slate-50 border-t border-slate-200 py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-600">
            <div className="flex space-x-5 items-center">
              <span className="text-slate-500 font-medium">Quick Categories:</span>
              {featuredShortcuts.map((shortcut, idx) => (
                <Link key={idx} href={shortcut.path} className="hover:text-primary-700 transition-colors">
                  {shortcut.name}
                </Link>
              ))}
            </div>
            <div className="text-slate-500">
              Biomedical Engineering & Supplies Across Kenya
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
          <div className="fixed inset-0 bg-slate-900/60" onClick={() => setMobileMenuOpen(false)}></div>
          
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-xl flex flex-col p-5">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-200">
              <Image 
                src="/images/biocare-logo-wide.png" 
                alt="Biocare Health Systems Limited" 
                width={140}
                height={38}
                className="h-9 w-auto object-contain"
                unoptimized
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-500 hover:text-slate-800 p-1"
                aria-label="Close menu"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative mb-5">
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 text-slate-800 rounded-md pl-3 pr-9 py-2 text-xs border border-slate-300 w-full focus:outline-none focus:border-slate-500"
                aria-label="Search equipment"
              />
              <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Submit search">
                <SearchIcon className="w-4 h-4" />
              </button>
            </form>

            {/* Navigation links */}
            <nav className="flex flex-col space-y-3 font-medium text-slate-700 text-sm">
              {navLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1.5 border-b border-slate-100 transition-colors ${router.pathname === link.path ? 'text-primary-700 font-semibold' : 'hover:text-primary-700'}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-5 border-t border-slate-200 space-y-3">
              <Link
                href={siteConfig.googleDriveCatalog}
                target="_blank"
                className="block bg-slate-800 hover:bg-slate-900 text-white text-center font-medium py-2 px-4 rounded-md text-xs transition-colors"
              >
                Download Product Catalog (PDF)
              </Link>
              <a
                href={`tel:${siteConfig.phones[0].link}`}
                className="block text-center text-slate-700 py-2 border border-slate-300 rounded-md text-xs font-medium"
              >
                Call Sales: {siteConfig.phones[0].value}
              </a>
            </div>

            <div className="mt-auto text-xs text-slate-500 pt-4 border-t border-slate-200">
              <p className="font-semibold text-slate-700">Showroom & Workshop:</p>
              <p className="mt-0.5">Githinji Investments Building, Chambers Rd, Ngara, Nairobi</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
