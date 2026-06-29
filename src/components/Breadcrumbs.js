import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="text-sm py-4 px-4 bg-gray-50 border-b border-gray-100" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-gray-500">
        <Link href="/" className="hover:text-primary-600 transition-colors">
          Home
        </Link>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <div key={idx} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-800 font-semibold truncate max-w-[200px] md:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-primary-600 transition-colors">
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
