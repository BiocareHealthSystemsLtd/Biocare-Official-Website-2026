/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/about-us/',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/brands',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/brands/',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/laboratory-equipment',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/laboratory-equipment/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/ican',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ican/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/top-medical-equipment-suppliers-in-east-africa-expanding-access-to-quality-care',
        destination: '/blog/top-medical-equipment-suppliers-in-east-africa-expanding-access-to-quality-care',
        permanent: true,
      },
      {
        source: '/top-medical-equipment-suppliers-in-east-africa-expanding-access-to-quality-care/',
        destination: '/blog/top-medical-equipment-suppliers-in-east-africa-expanding-access-to-quality-care',
        permanent: true,
      },
      {
        source: '/hospital-furniture-suppliers-in-kenya-creating-healing-environments',
        destination: '/blog/hospital-furniture-suppliers-in-kenya-creating-healing-environments',
        permanent: true,
      },
      {
        source: '/hospital-furniture-suppliers-in-kenya-creating-healing-environments/',
        destination: '/blog/hospital-furniture-suppliers-in-kenya-creating-healing-environments',
        permanent: true,
      },
      {
        source: '/dental-equipment-suppliers-in-kenya-choosing-quality-for-better-oral-care',
        destination: '/blog/dental-equipment-suppliers-in-kenya-choosing-quality-for-better-oral-care',
        permanent: true,
      },
      {
        source: '/dental-equipment-suppliers-in-kenya-choosing-quality-for-better-oral-care/',
        destination: '/blog/dental-equipment-suppliers-in-kenya-choosing-quality-for-better-oral-care',
        permanent: true,
      },
      {
        source: '/medical-equipment-suppliers-near-me-a-guide-for-kenyan-healthcare-providers',
        destination: '/blog/medical-equipment-suppliers-near-me-a-guide-for-kenyan-healthcare-providers',
        permanent: true,
      },
      {
        source: '/medical-equipment-suppliers-near-me-a-guide-for-kenyan-healthcare-providers/',
        destination: '/blog/medical-equipment-suppliers-near-me-a-guide-for-kenyan-healthcare-providers',
        permanent: true,
      },
      {
        source: '/medical-supplies-in-nairobi-cbd-a-one-stop-shop-for-healthcare-needs',
        destination: '/blog/medical-supplies-in-nairobi-cbd-a-one-stop-shop-for-healthcare-needs',
        permanent: true,
      },
      {
        source: '/medical-supplies-in-nairobi-cbd-a-one-stop-shop-for-healthcare-needs/',
        destination: '/blog/medical-supplies-in-nairobi-cbd-a-one-stop-shop-for-healthcare-needs',
        permanent: true,
      },
      {
        source: '/medical-equipment-prices-in-kenya-factors-and-hidden-costs-explained',
        destination: '/blog/medical-equipment-prices-in-kenya-factors-and-hidden-costs-explained',
        permanent: true,
      },
      {
        source: '/medical-equipment-prices-in-kenya-factors-and-hidden-costs-explained/',
        destination: '/blog/medical-equipment-prices-in-kenya-factors-and-hidden-costs-explained',
        permanent: true,
      },
      {
        source: '/medical-equipment-suppliers-in-nairobi-serving-kenyas-healthcare-hub',
        destination: '/blog/medical-equipment-suppliers-in-nairobi-serving-kenyas-healthcare-hub',
        permanent: true,
      },
      {
        source: '/medical-equipment-suppliers-in-nairobi-serving-kenyas-healthcare-hub/',
        destination: '/blog/medical-equipment-suppliers-in-nairobi-serving-kenyas-healthcare-hub',
        permanent: true,
      },
      {
        source: '/wholesale-medical-supplies-in-kenya-benefits-and-buying-guide',
        destination: '/blog/wholesale-medical-supplies-in-kenya-benefits-and-buying-guide',
        permanent: true,
      },
      {
        source: '/wholesale-medical-supplies-in-kenya-benefits-and-buying-guide/',
        destination: '/blog/wholesale-medical-supplies-in-kenya-benefits-and-buying-guide',
        permanent: true,
      },
      {
        source: '/top-medical-equipment-suppliers-in-kenya-how-to-choose-the-best',
        destination: '/blog/top-medical-equipment-suppliers-in-kenya-how-to-choose-the-best',
        permanent: true,
      },
      {
        source: '/top-medical-equipment-suppliers-in-kenya-how-to-choose-the-best/',
        destination: '/blog/top-medical-equipment-suppliers-in-kenya-how-to-choose-the-best',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
