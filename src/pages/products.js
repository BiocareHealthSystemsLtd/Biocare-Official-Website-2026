import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import siteConfig from '../data/siteConfig';
import { getProductSchema, getBreadcrumbSchema } from '../lib/seo';

export default function Products() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Reset pagination and selection when category or search changes
  useEffect(() => {
    setVisibleCount(12);
    setSelectedProductId(null);
  }, [selectedCategory, searchQuery]);

  // Sychronize states with URL parameters
  useEffect(() => {
    if (router.query.category) {
      setSelectedCategory(router.query.category.toString());
    } else {
      setSelectedCategory('all');
    }

    if (router.query.search) {
      setSearchQuery(router.query.search.toString());
    } else {
      setSearchQuery('');
    }
  }, [router.query]);

  const handleCategoryClick = (slug) => {
    setSelectedCategory(slug);
    const query = { ...router.query };
    if (slug === 'all') {
      delete query.category;
    } else {
      query.category = slug;
    }
    router.push({ pathname: '/products', query }, undefined, { shallow: true });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    const query = { ...router.query };
    if (!val.trim()) {
      delete query.search;
    } else {
      query.search = val.trim();
    }
    router.push({ pathname: '/products', query }, undefined, { shallow: true });
  };

  // Filter products
  const filteredProducts = productsData.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.specs.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const displayedProducts = selectedProductId
    ? filteredProducts.filter((p) => p.id === selectedProductId)
    : filteredProducts.slice(0, visibleCount);

  const breadcrumbs = [
    { name: 'Products & Equipment', path: '/products' }
  ];

  // Compile schema details for indexing
  const productSchemas = filteredProducts.map((p) => getProductSchema(p));
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const allSchemas = [breadcrumbSchema, ...productSchemas.slice(0, 10)];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <SEO 
        title="Medical Equipment & Supplies Catalog"
        description="Browse our complete medical catalog in Kenya. Laboratory hematology analyzers, hospital furniture, radiology scanners, dental units, and consumables."
        schemas={allSchemas}
      />

      <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-primary-700 to-primary-800 text-white rounded-3xl p-8 md:p-12 shadow-md relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="text-[10px] font-bold text-secondary-500 uppercase tracking-widest block font-sans">
                BIOCARE MEDICAL CATALOG
              </span>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
                High-Quality Clinical Diagnostics
              </h1>
              <p className="text-gray-300 text-xs leading-relaxed font-normal">
                Filter our medical catalog. If you are looking for specific items, reagents, or spare parts not shown below, download our full product catalogue.
              </p>
            </div>
            
            <a
              href={siteConfig.googleDriveCatalog}
              target="_blank"
              className="bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-3 px-6 rounded-lg text-xs transition-colors shrink-0 shadow-sm"
              aria-label="Download Catalogue"
            >
              Download Catalogue
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Filters */}
            <aside className="lg:col-span-3 space-y-6">
              
              {/* Search Box */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm space-y-3">
                <span className="text-xs font-bold text-gray-800 block uppercase tracking-wider">Search Equipment</span>
                <input
                  type="text"
                  placeholder="Filter name, specification..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-600"
                  aria-label="Filter products"
                />
              </div>

              {/* Categories Pills */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm space-y-3">
                <span className="text-xs font-bold text-gray-800 block uppercase tracking-wider">Categories</span>
                <nav className="flex flex-col space-y-1.5" aria-label="Product categories navigation">
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedCategory === 'all' 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-600 hover:bg-slate-50'
                    }`}
                  >
                    All Equipment ({productsData.length})
                  </button>
                  {categoriesData.map((cat) => {
                    const count = productsData.filter(
                      (p) => p.category.toLowerCase() === cat.slug.toLowerCase()
                    ).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex justify-between items-center ${
                          selectedCategory === cat.slug 
                            ? 'bg-primary-50 text-primary-700' 
                            : 'text-gray-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] bg-slate-100 text-gray-500 py-0.5 px-1.5 rounded-full font-normal">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

            </aside>

            {/* Product Grid Area */}
            <main className="lg:col-span-9 space-y-6">
              
              {/* Counter banner */}
              <div className="flex justify-between items-center text-xs text-gray-500 bg-white border border-gray-100 py-3 px-5 rounded-2xl">
                <span>
                  Showing <strong>{displayedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> items {selectedCategory !== 'all' ? `in ${selectedCategory}` : ''}
                </span>
                <span>Nairobi Delivery Options Available</span>
              </div>

              {/* Product cards listing */}
              {filteredProducts.length > 0 ? (
                <div className="space-y-8">
                  {selectedProductId ? (
                    <div className="max-w-4xl mx-auto">
                      {displayedProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          isSelected={true}
                          onClear={() => setSelectedProductId(null)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {displayedProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          isSelected={false}
                          onSelect={() => setSelectedProductId(product.id)}
                        />
                      ))}
                    </div>
                  )}
                  
                  {!selectedProductId && visibleCount < filteredProducts.length && (
                    <div className="text-center py-6 border-t border-gray-100">
                      <button
                        onClick={() => setVisibleCount((prev) => prev + 12)}
                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-8 rounded-lg text-xs transition-colors shadow-sm inline-block hover:-translate-y-0.5 duration-200 transform"
                      >
                        Load More Products
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center space-y-4">
                  <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-gray-800 text-base">No Equipment Found</h3>
                    <p className="text-gray-500 text-xs max-w-sm mx-auto font-normal">
                      We couldn't find matching models. Try clearing search filters or download our product catalogue.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      router.push('/products', undefined, { shallow: true });
                    }}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg text-xs transition-colors shadow-sm inline-block"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

            </main>

          </div>

        </div>
      </div>
    </Layout>
  );
}
