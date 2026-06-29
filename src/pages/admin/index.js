import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import siteConfig from '../../data/siteConfig';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'categories' | 'blog'

  // Databases States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  
  // Loading indicators
  const [loadingData, setLoadingData] = useState(false);

  // Modals States
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // null for new, otherwise object

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const [showBlogModal, setShowBlogModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  // Form States
  const [productForm, setProductForm] = useState({
    id: '', name: '', category: '', description: '', longDescription: '',
    specs: '', featured: false, onHotDeal: false, dealDiscount: '',
    price: 'Contact for Quote', googleDriveLink: '', relatedProducts: '',
    image: '', thumbnail: ''
  });

  const [categoryForm, setCategoryForm] = useState({
    id: '', name: '', slug: '', description: '', icon: 'LaboratoryIcon', driveLink: ''
  });

  const [blogForm, setBlogForm] = useState({
    slug: '', title: '', excerpt: '', content: '', category: 'Diagnostics',
    image: '/images/blog-1.webp', date: '', author: 'Biocare Editor', readTime: '5 min read',
    status: 'published'
  });

  // Upload state
  const [uploadingField, setUploadingField] = useState(null);

  // File to base64 direct Cloudinary upload helper
  const handleFileUpload = async (e, targetForm, setFormState, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit');
      return;
    }

    setUploadingField(fieldName);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64String }),
        });

        if (res.ok) {
          const data = await res.json();
          setFormState((prev) => ({
            ...prev,
            [fieldName]: data.url,
          }));
        } else {
          const data = await res.json();
          alert(data.error || 'Failed to upload image');
        }
      } catch (err) {
        alert('Network error uploading image');
      } finally {
        setUploadingField(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Verify auth session on load
  useEffect(() => {
    checkAuthSession();
  }, []);

  const checkAuthSession = async () => {
    try {
      const res = await fetch('/api/admin/auth');
      if (res.ok) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setAuthChecking(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        const data = await res.json();
        setAuthError(data.error || 'Login failed');
      }
    } catch (err) {
      setAuthError('Connection error occurred');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
      router.push('/');
    } catch (err) {
      alert('Failed to log out');
    }
  };

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [prodRes, catRes, blogRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
        fetch('/api/admin/blog')
      ]);

      if (prodRes.ok) setProducts(await prodRes.json());
      if (catRes.ok) setCategories(await catRes.json());
      if (blogRes.ok) setBlogPosts(await blogRes.json());
    } catch (err) {
      console.error('Failed to load databases', err);
    } finally {
      setLoadingData(false);
    }
  };

  // CRUD Operations: PRODUCTS
  const openProductForm = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setProductForm({
        id: product.id,
        name: product.name,
        category: product.category,
        description: product.description,
        longDescription: product.longDescription,
        specs: product.specs.join('\n'),
        featured: product.featured,
        onHotDeal: product.onHotDeal,
        dealDiscount: product.dealDiscount || '',
        price: product.price || 'Contact for Quote',
        googleDriveLink: product.googleDriveLink || '',
        relatedProducts: (product.relatedProducts || []).join(', '),
        image: product.image || '',
        thumbnail: product.thumbnail || ''
      });
    } else {
      setCurrentProduct(null);
      setProductForm({
        id: '', name: '', category: '', description: '', longDescription: '',
        specs: '', featured: false, onHotDeal: false, dealDiscount: '',
        price: 'Contact for Quote', googleDriveLink: '', relatedProducts: '',
        image: '', thumbnail: ''
      });
    }
    setShowProductModal(true);
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formatted = {
      ...productForm,
      specs: productForm.specs.split('\n').filter(s => s.trim() !== ''),
      relatedProducts: productForm.relatedProducts.split(',').map(s => s.trim()).filter(s => s !== '')
    };

    const method = currentProduct ? 'PUT' : 'POST';
    try {
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formatted)
      });
      if (res.ok) {
        setShowProductModal(false);
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save product');
      }
    } catch (err) {
      alert('Network error saving product');
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      alert('Error deleting product');
    }
  };

  // CRUD Operations: CATEGORIES
  const openCategoryForm = (category = null) => {
    if (category) {
      setCurrentCategory(category);
      setCategoryForm(category);
    } else {
      setCurrentCategory(null);
      setCategoryForm({ id: '', name: '', slug: '', description: '', icon: 'LaboratoryIcon', driveLink: '' });
    }
    setShowCategoryModal(true);
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const method = currentCategory ? 'PUT' : 'POST';
    try {
      const res = await fetch('/api/admin/categories', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      });
      if (res.ok) {
        setShowCategoryModal(false);
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save category');
      }
    } catch (err) {
      alert('Error saving category');
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete category');
      }
    } catch (err) {
      alert('Error deleting category');
    }
  };

  // CRUD Operations: BLOG POSTS
  const openBlogForm = (post = null) => {
    if (post) {
      setCurrentBlog(post);
      setBlogForm({
        ...post,
        status: post.status || 'published'
      });
    } else {
      setCurrentBlog(null);
      setBlogForm({
        slug: '', title: '', excerpt: '', content: '', category: 'Diagnostics',
        image: '/images/blog-1.webp', date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        author: 'Biocare Technical', readTime: '5 min read', status: 'published'
      });
    }
    setShowBlogModal(true);
  };

  const saveBlogPost = async (e) => {
    e.preventDefault();
    const method = currentBlog ? 'PUT' : 'POST';
    try {
      const res = await fetch('/api/admin/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogForm)
      });
      if (res.ok) {
        setShowBlogModal(false);
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save article');
      }
    } catch (err) {
      alert('Error saving article');
    }
  };

  const deleteBlogPost = async (slug) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/admin/blog?slug=${slug}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete article');
      }
    } catch (err) {
      alert('Error deleting article');
    }
  };

  // Auth checking indicator
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Verifying Admin Session...</span>
      </div>
    );
  }

  // Auth Login Portal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <form onSubmit={handleLogin} className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest block font-sans">
              BIOCARE BACKOFFICE
            </span>
            <h1 className="text-2xl font-display font-extrabold text-slate-800">
              Admin Portal Login
            </h1>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Enter Access Password</label>
            <input
              type="password"
              required
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>

          {authError && <div className="text-xs text-red-500 font-semibold">{authError}</div>}

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg text-xs transition-colors shadow flex items-center justify-center space-x-2"
          >
            {isLoggingIn ? <span>Verifying...</span> : <span>Login to Dashboard</span>}
          </button>
          
          <div className="text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-primary-600">Return to Homepage</Link>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col p-6 space-y-8 shrink-0">
        <div>
          <span className="font-display font-black text-lg tracking-wider block text-white">BIOCARE ADMIN</span>
          <span className="text-[8px] uppercase tracking-widest text-slate-400 font-semibold block mt-0.5">Systems Management</span>
        </div>

        <nav className="flex flex-col space-y-1.5 flex-grow" aria-label="Admin sidebar menu">
          <button
            onClick={() => setActiveTab('products')}
            className={`text-left px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors ${activeTab === 'products' ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            Manage Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`text-left px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors ${activeTab === 'categories' ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            Manage Categories
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`text-left px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors ${activeTab === 'blog' ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            Manage Blog Posts
          </button>
        </nav>

        <div className="pt-6 border-t border-slate-800 flex flex-col space-y-2">
          <Link href="/" className="text-slate-400 hover:text-white text-xs py-1" target="_blank">
            Visit Homepage ↗
          </Link>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white font-bold py-2 rounded text-[11px] transition-colors border border-red-500/30"
          >
            Log Out Session
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-grow p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-xl md:text-2xl font-display font-extrabold text-slate-800 capitalize">
              {activeTab === 'blog' ? 'SEO Articles Dashboard' : `Manage ${activeTab}`}
            </h1>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Instantly create, modify, or remove items from the production database files.
            </p>
          </div>

          <button
            onClick={() => {
              if (activeTab === 'products') openProductForm();
              if (activeTab === 'categories') openCategoryForm();
              if (activeTab === 'blog') openBlogForm();
            }}
            className="bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-2 px-5 rounded-lg text-xs transition-colors shadow"
          >
            + Add New {activeTab === 'blog' ? 'Article' : activeTab.slice(0, -1)}
          </button>
        </div>

        {/* LOADING INDICATOR */}
        {loadingData && (
          <div className="p-12 text-center text-xs text-slate-500 font-semibold uppercase">
            Syncing database files...
          </div>
        )}

        {/* PRODUCTS TAB VIEW */}
        {!loadingData && activeTab === 'products' && (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4">Hot Deal</th>
                    <th className="p-4">Price Tag</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="p-4">
                        <span className="font-bold text-slate-800 block">{p.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{p.id}</span>
                      </td>
                      <td className="p-4 capitalize font-semibold text-slate-600">{p.category}</td>
                      <td className="p-4">{p.featured ? 'Yes' : 'No'}</td>
                      <td className="p-4">{p.onHotDeal ? 'Yes' : 'No'}</td>
                      <td className="p-4 font-mono font-semibold text-slate-600">{p.price}</td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => openProductForm(p)} className="text-primary-600 hover:underline font-bold">Edit</button>
                        <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:underline font-bold">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CATEGORIES TAB VIEW */}
        {!loadingData && activeTab === 'categories' && (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                    <th className="p-4">Category Name</th>
                    <th className="p-4">Slug</th>
                    <th className="p-4">Description</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-800">{c.name}</td>
                      <td className="p-4 font-mono text-slate-500">{c.slug}</td>
                      <td className="p-4 text-slate-500 leading-normal max-w-sm truncate">{c.description}</td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => openCategoryForm(c)} className="text-primary-600 hover:underline font-bold">Edit</button>
                        <button onClick={() => deleteCategory(c.id)} className="text-red-500 hover:underline font-bold">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BLOG TAB VIEW */}
        {!loadingData && activeTab === 'blog' && (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                    <th className="p-4">Article Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts.map((post) => (
                    <tr key={post.slug} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="p-4">
                        <span className="font-bold text-slate-800 block">{post.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{post.slug}</span>
                      </td>
                      <td className="p-4">{post.category}</td>
                      <td className="p-4">{post.author.split(' ')[0]}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          post.status === 'draft' 
                            ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {post.status || 'published'}
                        </span>
                      </td>
                      <td className="p-4">{post.date}</td>
                      <td className="p-4 text-right space-x-2">
                        {post.status === 'draft' && (
                          <Link 
                            href={`/blog/${post.slug}`} 
                            target="_blank" 
                            className="text-amber-600 hover:underline font-bold mr-2"
                          >
                            Preview
                          </Link>
                        )}
                        <button onClick={() => openBlogForm(post)} className="text-primary-600 hover:underline font-bold">Edit</button>
                        <button onClick={() => deleteBlogPost(post.slug)} className="text-red-500 hover:underline font-bold">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* PRODUCTS CRUD FORM MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <form onSubmit={saveProduct} className="bg-white border border-slate-200 max-w-2xl w-full p-6 md:p-8 rounded-3xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-display font-extrabold text-lg text-slate-800">
              {currentProduct ? 'Modify Product Details' : 'Add New Product'}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Product ID (Slug) *</label>
                <input
                  type="text"
                  required
                  disabled={!!currentProduct}
                  value={productForm.id}
                  onChange={(e) => setProductForm({ ...productForm, id: e.target.value })}
                  placeholder="e.g. dymind-dh36"
                  className="w-full bg-slate-50 disabled:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Product Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="Full name of device"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Category *</label>
                <select
                  required
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="">-- Choose Category --</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Price tag (displays in tables)</label>
                <input
                  type="text"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Short Card Description *</label>
              <textarea
                required
                rows="2"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                placeholder="2-3 line overview..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Detailed Specifications (One per line) *</label>
              <textarea
                required
                rows="4"
                value={productForm.specs}
                onChange={(e) => setProductForm({ ...productForm, specs: e.target.value })}
                placeholder="e.g. Throughput: 60 tests per hour&#10;Sample Volume: 9.0uL"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Long Details (Html/Text)</label>
              <textarea
                rows="3"
                value={productForm.longDescription}
                onChange={(e) => setProductForm({ ...productForm, longDescription: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Product Image URL / Upload</label>
                <div className="flex space-x-2 font-sans">
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="/images/example.webp"
                    className="flex-grow bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
                  />
                  <label className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-3 py-2 rounded-lg text-xs cursor-pointer shrink-0 select-none">
                    {uploadingField === 'image' ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, productForm, setProductForm, 'image')}
                      disabled={uploadingField !== null}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Thumbnail URL / Upload</label>
                <div className="flex space-x-2 font-sans">
                  <input
                    type="text"
                    value={productForm.thumbnail}
                    onChange={(e) => setProductForm({ ...productForm, thumbnail: e.target.value })}
                    placeholder="/images/example.webp"
                    className="flex-grow bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
                  />
                  <label className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-3 py-2 rounded-lg text-xs cursor-pointer shrink-0 select-none">
                    {uploadingField === 'thumbnail' ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, productForm, setProductForm, 'thumbnail')}
                      disabled={uploadingField !== null}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Google Drive PDF Link</label>
                <input
                  type="url"
                  value={productForm.googleDriveLink}
                  onChange={(e) => setProductForm({ ...productForm, googleDriveLink: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Related Products IDs (Comma split)</label>
                <input
                  type="text"
                  value={productForm.relatedProducts}
                  onChange={(e) => setProductForm({ ...productForm, relatedProducts: e.target.value })}
                  placeholder="e.g. dymind-dh800, olympus-cx23"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-6 items-center border-t border-slate-100 pt-4">
              <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={productForm.featured}
                  onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                  className="w-4 h-4 text-primary-600"
                />
                <span>Pin on Featured Carousel</span>
              </label>
              <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={productForm.onHotDeal}
                  onChange={(e) => setProductForm({ ...productForm, onHotDeal: e.target.checked })}
                  className="w-4 h-4 text-primary-600"
                />
                <span>Set on Hot Promo Deals</span>
              </label>
            </div>

            {productForm.onHotDeal && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Discount Tag label (e.g. 15% OFF)</label>
                <input
                  type="text"
                  value={productForm.dealDiscount}
                  onChange={(e) => setProductForm({ ...productForm, dealDiscount: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-6 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg text-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CATEGORIES CRUD MODAL */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <form onSubmit={saveCategory} className="bg-white border border-slate-200 max-w-md w-full p-6 rounded-3xl shadow-2xl space-y-4">
            <h3 className="font-display font-extrabold text-lg text-slate-800">
              {currentCategory ? 'Edit Category' : 'Add Category'}
            </h3>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Category ID (Unique) *</label>
              <input
                type="text"
                required
                disabled={!!currentCategory}
                value={categoryForm.id}
                onChange={(e) => setCategoryForm({ ...categoryForm, id: e.target.value })}
                className="w-full bg-slate-50 disabled:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Category Title Name *</label>
              <input
                type="text"
                required
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Category URL Slug *</label>
              <input
                type="text"
                required
                value={categoryForm.slug}
                onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Description Details *</label>
              <textarea
                required
                rows="3"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCategoryModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-6 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg text-xs"
              >
                Save Category
              </button>
            </div>
          </form>
        </div>
      )}

      {/* BLOG CRUD MODAL */}
      {showBlogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <form onSubmit={saveBlogPost} className="bg-white border border-slate-200 max-w-3xl w-full p-6 md:p-8 rounded-3xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-display font-extrabold text-lg text-slate-800">
              {currentBlog ? 'Modify Article' : 'Write New Article'}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. Selection guidelines on analyzers"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Article Slug *</label>
                <input
                  type="text"
                  required
                  disabled={!!currentBlog}
                  value={blogForm.slug}
                  onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                  placeholder="selection-guideline-analyzers"
                  className="w-full bg-slate-50 disabled:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Category Tag *</label>
                <input
                  type="text"
                  required
                  value={blogForm.category}
                  onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Author Name *</label>
                <input
                  type="text"
                  required
                  value={blogForm.author}
                  onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Blog Image URL / Upload</label>
                <div className="flex space-x-2 font-sans">
                  <input
                    type="text"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    placeholder="/images/blog-example.webp"
                    className="flex-grow bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
                  />
                  <label className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-3 py-2 rounded-lg text-xs cursor-pointer shrink-0 select-none">
                    {uploadingField === 'blogImage' ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, blogForm, setBlogForm, 'image')}
                      disabled={uploadingField !== null}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Publication Status</label>
                <select
                  value={blogForm.status}
                  onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft (Previewable)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Short Excerpt (SEO Description) *</label>
              <textarea
                required
                rows="2"
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase font-sans">Full Content (HTML tags supported) *</label>
              <textarea
                required
                rows="8"
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                placeholder="<p>Write your article here...</p>"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowBlogModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-6 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg text-xs"
              >
                Publish Article
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
