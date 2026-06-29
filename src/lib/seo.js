import siteConfig from '../data/siteConfig';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': siteConfig.companyName,
    'url': siteConfig.url,
    'logo': `${siteConfig.url}/logo.png`,
    'description': siteConfig.description,
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': siteConfig.phones[0].link,
      'contactType': 'Customer Service',
      'areaServed': 'KE',
      'availableLanguage': 'en'
    },
    'sameAs': [
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
      siteConfig.socials.linkedin
    ]
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': siteConfig.companyName,
    'image': `${siteConfig.url}/images/biocare-logo.svg`,
    'description': siteConfig.description,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': `${siteConfig.officeAddress.building}, ${siteConfig.officeAddress.street}`,
      'addressLocality': siteConfig.officeAddress.city,
      'addressRegion': siteConfig.officeAddress.city,
      'addressCountry': 'KE'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -1.278394,
      'longitude': 36.824208
    },
    'telephone': siteConfig.phones[0].link,
    'email': siteConfig.email,
    'priceRange': '$$',
    'areaServed': 'KE',
    'url': siteConfig.url,
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '08:00',
        'closes': '17:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Saturday',
        'opens': '09:00',
        'closes': '13:00'
      }
    ]
  };
}

export function getProductSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': product.image.startsWith('http') ? product.image : `${siteConfig.url}${product.image}`,
    'description': product.description,
    'brand': {
      '@type': 'Brand',
      'name': product.name.includes('Dymind') ? 'Dymind' : (product.name.includes('Olympus') ? 'Olympus' : 'Biocare')
    },
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'KES',
      'lowPrice': '0',
      'highPrice': '0',
      'offerCount': '1',
      'price': 'Contact for Quote',
      'priceVal': 'Contact for Quote',
      'availability': 'https://schema.org/InStock',
      'url': `${siteConfig.url}/products#${product.id}`
    }
  };
}

export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${siteConfig.url}${item.path}`
    }))
  };
}
