import { SITE_URL } from '../../lib/services';
import { breadcrumbNode, graph, webPageNode } from '../../lib/schema';
import { PAGE_CONTENT } from '../../lib/page-content';
import DocPage from '../DocPage';

const c = PAGE_CONTENT['contact'];

export function generateMetadata() {
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: '/contact' },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: '/contact',
      type: 'website',
    },
  };
}

export default function ContactPage() {
  const canonical = `${SITE_URL}/contact`;
  const pageGraph = graph([
    webPageNode(canonical, 'Contact'),
    {
      '@type': 'ContactPage',
      '@id': `${canonical}#contactpage`,
      url: canonical,
      name: 'Contact Our Chesterfield Water Damage Crew',
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    breadcrumbNode(canonical, [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Contact', url: canonical },
    ]),
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageGraph) }} />
      <DocPage page={c} crumb={c.crumb} />
    </>
  );
}
