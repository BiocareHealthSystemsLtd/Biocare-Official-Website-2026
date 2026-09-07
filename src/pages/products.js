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
  const selectedCategory = router.query.category ? router.query.category.toString() : 'all';
  const searchQuery = router.query.search ? router.query.search.toString() : '';

  const [visibleCount, setVisibleCount] = useState(12);
  const selectedProductId = router.query.product
    ? router.query.product.toString()
    : router.query.id
    ? router.query.id.toString()
    : null;

  useEffect(() => {
    if (selectedProductId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProductId]);

  const handleSelectProduct = (productId) => {
    const query = { ...router.query, product: productId };
    router.push({ pathname: '/products', query }, undefined, { shallow: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearProduct = () => {
    const query = { ...router.query };
    delete query.product;
    delete query.id;
    router.push({ pathname: '/products', query }, undefined, { shallow: true });
  };

  const handleCategoryClick = (slug) => {
    setVisibleCount(12);
    const query = { ...router.query };
    delete query.product;
    delete query.id;
    if (slug === 'all') {
      delete query.category;
    } else {
      query.category = slug;
    }
    router.push({ pathname: '/products', query }, undefined, { shallow: true });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setVisibleCount(12);
    const query = { ...router.query };
    delete query.product;
    delete query.id;
    if (!val.trim()) {
      delete query.search;
    } else {
      query.search = val.trim();
    }
    router.push({ pathname: '/products', query }, undefined, { shallow: true });
  };

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.specs.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const selectedProductObj = selectedProductId
    ? productsData.find((p) => p.id === selectedProductId)
    : null;

  const displayedProducts = selectedProductObj
    ? [selectedProductObj]
    : filteredProducts.slice(0, visibleCount);

  const breadcrumbs = [
    { name: 'Products & Equipment', path: '/products' }
  ];

  const productSchemas = filteredProducts.map((p) => getProductSchema(p));
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const allSchemas = [breadcrumbSchema, ...productSchemas.slice(0, 10)];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <SEO 
        title="Medical Equipment & Supplies Catalog | Biocare Kenya"
        description="Browse certified medical equipment in Kenya. Laboratory hematology analyzers, hospital furniture, radiology scanners, dental units, and consumables with Nairobi biomedical support."
        schemas={allSchemas}
      />

      <div className="bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Banner */}
          <div className="bg-slate-900 text-white rounded-lg p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Equipment & Machinery Catalog
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Hospital, Laboratory & Surgical Equipment
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Filter our medical equipment range below. If you require specific technical datasheets, tender documentation, or items not listed, download our comprehensive catalog or contact our sales engineers.
              </p>
            </div>
            
            <a
              href={siteConfig.googleDriveCatalog}
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-slate-100 text-slate-900 font-medium py-2.5 px-5 rounded text-xs transition-colors shrink-0"
            >
              Download PDF Catalog
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Filters */}
            <aside className="lg:col-span-3 space-y-5">
              
              {/* Search Box */}
              <div className="bg-white border border-slate-200 rounded p-4 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">Search Equipment</span>
                <input
                  type="text"
                  placeholder="Filter name or spec (e.g. DH36, Bed)..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-slate-500"
                  aria-label="Filter products"
                />
              </div>

              {/* Categories Navigation */}
              <div className="bg-white border border-slate-200 rounded p-4 space-y-2">
                <span className="text-xs font-bold text-slate-800 block mb-1">Categories</span>
                <nav className="flex flex-col space-y-1 text-xs" aria-label="Product categories navigation">
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className={`text-left px-2.5 py-1.5 rounded transition-colors flex justify-between items-center cursor-pointer ${
                      selectedCategory === 'all' 
                        ? 'bg-primary-50 text-primary-800 font-semibold' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-[11px] text-slate-400">({productsData.length})</span>
                  </button>
                  {categoriesData.map((cat) => {
                    const count = productsData.filter(
                      (p) => p.category.toLowerCase() === cat.slug.toLowerCase()
                    ).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className={`text-left px-2.5 py-1.5 rounded transition-colors flex justify-between items-center cursor-pointer ${
                          selectedCategory === cat.slug 
                            ? 'bg-primary-50 text-primary-800 font-semibold' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate pr-2">{cat.name}</span>
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

            </aside>

            {/* Product Grid Area */}
            <main className="lg:col-span-9 space-y-5">
              
              {/* Counter banner */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-600 bg-white border border-slate-200 py-3 px-4 rounded gap-2">
                <span>
                  Showing <strong>{displayedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> products
                  {selectedCategory !== 'all' ? ` in ${selectedCategory}` : ''}
                </span>
                {(selectedCategory !== 'all' || searchQuery) && (
                  <button
                    onClick={() => {
                      handleCategoryClick('all');
                    }}
                    className="text-primary-700 hover:underline cursor-pointer"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Product cards listing */}
              {(filteredProducts.length > 0 || selectedProductId) ? (
                <div className="space-y-6">
                  {selectedProductId ? (
                    <div>
                      {displayedProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          isSelected={true}
                          onClear={handleClearProduct}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {displayedProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          isSelected={false}
                          onSelect={() => handleSelectProduct(product.id)}
                        />
                      ))}
                    </div>
                  )}
                  
                  {!selectedProductId && visibleCount < filteredProducts.length && (
                    <div className="text-center py-6 border-t border-slate-200">
                      <button
                        onClick={() => setVisibleCount((prev) => prev + 12)}
                        className="bg-primary-700 hover:bg-primary-800 text-white font-medium py-2 px-6 rounded text-xs transition-colors cursor-pointer"
                      >
                        Load More Products
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded p-12 text-center space-y-3">
                  <h3 className="font-bold text-slate-800 text-sm">No Matching Products Found</h3>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto">
                    We could not locate products matching your search criteria. Try clearing search filters or download our PDF catalog.
                  </p>
                  <button
                    onClick={handleClearProduct}
                    className="bg-primary-700 hover:bg-primary-800 text-white font-medium py-2 px-4 rounded text-xs transition-colors cursor-pointer"
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
