import Link from 'next/link';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function Custom404() {
  return (
    <Layout>
      <SEO 
        title="404 - Page Not Found"
        description="The requested page could not be found. Return to Biocare Health Systems Limited catalog or home page."
      />

      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-slate-50 font-sans">
        <div className="space-y-6 max-w-md bg-white border border-gray-200/80 p-8 rounded-3xl shadow-sm">
          
          <div className="text-secondary-500 text-6xl animate-bounce">
            🩺
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-display font-extrabold text-primary-700 tracking-tight">
              404 - Diagnose Error
            </h1>
            <p className="text-gray-500 text-xs leading-relaxed font-normal">
              We couldn't locate the file or route you are looking for. It might have been relocated, or it might not be in our active system directory.
            </p>
          </div>

          <div className="flex flex-col space-y-2.5 pt-4">
            <Link 
              href="/" 
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg text-xs transition-colors shadow-sm"
            >
              Return to Homepage
            </Link>
            <Link 
              href="/products" 
              className="bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold py-3 rounded-lg text-xs transition-colors"
            >
              View Diagnostic Catalog
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
}
