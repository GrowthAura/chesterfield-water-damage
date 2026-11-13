// Shared JSON-LD helpers — ONE @graph per page, @id-linked, honest-only.
// WebSite (#website) + HomeAndConstructionBusiness (#business, a LocalBusiness
// subtype) live in the layout; each page adds its own WebPage node and
// references the site nodes by @id. Counts are always VISIBLE counts.
// No invented fields: no reviews, no aggregateRating, no credentials,
// no prices, no street address (none in the doc). Telephone + areaServed
// are verbatim from the doc.
import { SITE_URL } from './services';

export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BUSINESS_ID = `${SITE_URL}/#business`;

export const BUSINESS_NODE = {
  '@type': 'HomeAndConstructionBusiness',
  '@id': BUSINESS_ID,
  name: 'Water Damage Restoration Chesterfield',
  telephone: '+1-636-228-0038',
  url: `${SITE_URL}/`,
  areaServed: [
    { '@type': 'City', name: 'Chesterfield', addressRegion: 'MO', postalCode: '63017' },
    { '@type': 'City', name: 'Chesterfield', addressRegion: 'MO', postalCode: '63005' },
  ],
  address: { '@type': 'PostalAddress', addressLocality: 'Chesterfield', addressRegion: 'MO', postalCode: '63017', addressCountry: 'US' },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
};

export const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Water Damage Restoration Chesterfield',
  url: `${SITE_URL}/`,
  publisher: { '@id': BUSINESS_ID },
};

// Site-wide graph (layout): WebSite + business, @id-linked.
export function siteGraph() {
  return { '@context': 'https://schema.org', '@graph': [WEBSITE_NODE, BUSINESS_NODE] };
}

// WebPage node for one page. canonical = full canonical URL (SITE_URL + path;
// homepage = SITE_URL + '/').
export function webPageNode(canonical, name) {
  return {
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
  };
}

export function breadcrumbNode(canonical, items) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqPageNode(canonical, items, partsText) {
  return {
    '@type': 'FAQPage',
    '@id': `${canonical}#faq`,
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: partsText(it.a) },
    })),
  };
}

// Wrap page nodes into a single @graph script block.
export function graph(nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
