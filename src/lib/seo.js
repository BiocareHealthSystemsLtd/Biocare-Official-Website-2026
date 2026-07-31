import siteConfig from '../data/siteConfig';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': siteConfig.companyName,
    'url': siteConfig.url,
    'logo': `${siteConfig.url}/images/biocare-logo.svg`,
    'description': siteConfig.description,
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': siteConfig.phones[0].link,
        'contactType': 'Sales & Customer Support',
        'areaServed': 'KE',
        'availableLanguage': ['English', 'Swahili']
      },
      {
        '@type': 'ContactPoint',
        'telephone': siteConfig.phones[1].link,
        'contactType': 'Administration',
        'areaServed': 'KE',
        'availableLanguage': ['English', 'Swahili']
      }
    ],
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
    '@type': ['LocalBusiness', 'MedicalBusiness'],
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
    'hasMap': siteConfig.googleMapsEmbed,
    'telephone': siteConfig.phones[0].link,
    'email': siteConfig.email,
    'priceRange': '$$$',
    'areaServed': {
      '@type': 'Country',
      'name': 'Kenya'
    },
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
    'image': product.image && product.image.startsWith('http') ? product.image : `${siteConfig.url}${product.image || '/images/biocare-logo.svg'}`,
    'description': product.description,
    'category': product.category,
    'brand': {
      '@type': 'Brand',
      'name': product.name.includes('Dymind') ? 'Dymind' : (product.name.includes('Olympus') ? 'Olympus' : 'Biocare')
    },
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'KES',
      'price': '0',
      'priceValidUntil': '2027-12-31',
      'availability': 'https://schema.org/InStock',
      'itemCondition': 'https://schema.org/NewCondition',
      'url': `${siteConfig.url}/products?product=${encodeURIComponent(product.id)}`
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

export function getFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

export function getBlogPostingSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'image': post.image && post.image.startsWith('http') ? post.image : `${siteConfig.url}${post.image || '/images/biocare-logo.svg'}`,
    'datePublished': post.datePublished || post.date || '2026-01-01',
    'dateModified': post.dateModified || post.date || '2026-07-01',
    'author': {
      '@type': 'Organization',
      'name': siteConfig.companyName
    },
    'publisher': {
      '@type': 'Organization',
      'name': siteConfig.companyName,
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteConfig.url}/images/biocare-logo.svg`
      }
    },
    'mainEntityOfPage': `${siteConfig.url}/blog/${post.slug}`
  };
}
