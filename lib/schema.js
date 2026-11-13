// Shared JSON-LD helpers — ONE @graph per page, @id-linked, honest-only.
// WebSite (#website) + HomeAndConstructionBusiness (#business) live in the
// layout; each page adds its own WebPage (#webpage) + page-type nodes and
// references the site nodes by @id. Counts are always VISIBLE counts.
// No invented fields: no reviews, no aggregateRating, no credentials,
// no prices. Telephone + areaServed are verbatim from the doc.
import { SITE_URL } from './services';

export const WEBSITE_ID = `${SITE_URL}#website`;
export const BUSINESS_ID = `${SITE_URL}#business`;

export const BUSINESS_NODE = {
  '@type': 'HomeAndConstructionBusiness',
  '@id': BUSINESS_ID,
  name: 'Water Damage Restoration Chesterfield',
  telephone: '+1-636-228-0038',
  areaServed: [
    { '@type': 'City', name: 'Chesterfield', addressRegion: 'MO', postalCode: '63017' },
    { '@type': 'City', name: 'Chesterfield', addressRegion: 'MO', postalCode: '63005' },
  ],
  address: { '@type': 'PostalAddress', addressLocality: 'Chesterfield', addressRegion: 'MO', postalCode: '63017', addressCountry: 'US' },
};

export const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Water Damage Restoration Chesterfield',
  url: SITE_URL,
};

// Site-wide graph (layout): WebSite + business, @id-linked.
export function siteGraph() {
  return { '@context': 'https://schema.org', '@graph': [WEBSITE_NODE, BUSINESS_NODE] };
}

// WebPage node for one page. canonical = full canonical URL (SITE_URL + path;
// homepage = SITE_URL + '/'). speakable = optional SpeakableSpecification.
export function webPageNode(canonical, name, speakable) {
  const node = {
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
  };
  if (speakable) node.speakable = speakable;
  return node;
}

// Wrap page nodes into a single @graph script block.
export function graph(nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
