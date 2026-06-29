import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import WhatsAppFloating from './WhatsAppFloating';

export default function Layout({ children, breadcrumbs }) {
  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* Sticky, responsive header */}
      <Header />

      {/* Breadcrumbs for subpages */}
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

      {/* Primary page workspace */}
      <main className="flex-grow animate-fade-in-up">
        {children}
      </main>

      {/* Comprehensive site footer */}
      <Footer />

      {/* Floating WhatsApp chat widget */}
      <WhatsAppFloating />
    </div>
  );
}
