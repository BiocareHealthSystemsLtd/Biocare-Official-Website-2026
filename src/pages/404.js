import Link from 'next/link';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function Custom404() {
  return (
    <Layout>
      <SEO 
        title="404 - Page Not Found | Biocare Kenya"
        description="The requested page could not be found. Return to Biocare Health Systems Limited catalog or contact our Nairobi sales team."
      />

      <section className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-slate-50 font-sans">
        <div className="space-y-5 max-w-md bg-white border border-slate-200 p-8 rounded-lg">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 font-mono tracking-wider">ERROR 404</span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Page Not Found
            </h1>
            <p className="text-slate-600 text-xs leading-relaxed">
              The page you are looking for is not available. You can navigate back to our homepage or search through our medical equipment and supplies catalog.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 justify-center">
            <Link 
              href="/" 
              className="bg-primary-700 hover:bg-primary-800 text-white font-medium py-2.5 px-5 rounded text-xs transition-colors"
            >
              Return to Homepage
            </Link>
            <Link 
              href="/products" 
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2.5 px-5 rounded text-xs transition-colors border border-slate-200"
            >
              Browse Catalog
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
}
