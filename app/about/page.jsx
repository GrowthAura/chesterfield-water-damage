import { SITE_URL } from '../../lib/services';
import { breadcrumbNode, graph, webPageNode } from '../../lib/schema';
import { PAGE_CONTENT } from '../../lib/page-content';
import DocPage from '../DocPage';

const c = PAGE_CONTENT['about'];

export function generateMetadata() {
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: '/about' },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: '/about',
      type: 'website',
    },
  };
}

export default function AboutPage() {
  const canonical = `${SITE_URL}/about`;
  const pageGraph = graph([
    webPageNode(canonical, 'About'),
    {
      '@type': 'AboutPage',
      '@id': `${canonical}#aboutpage`,
      url: canonical,
      name: 'About Our Chesterfield Water Damage Crew',
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    breadcrumbNode(canonical, [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'About', url: canonical },
    ]),
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageGraph) }} />
      <DocPage page={c} crumb={c.crumb} />
    </>
  );
}
