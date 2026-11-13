import { SITE_URL } from '../../lib/services';
import { graph, webPageNode } from '../../lib/schema';
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
      images: [{ url: '/images/chesterfield-hero-water-extraction.webp', width: 1200, height: 675, alt: 'Workers wading through floodwater around a pump truck with hoses and pumping equipment' }],
    },
  };
}

export default function AboutPage() {
  const canonical = `${SITE_URL}/about`;
const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'About', item: canonical },
    ],
  };
const pageGraph = graph([webPageNode(canonical, 'About'), breadcrumb]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageGraph) }} />
      <DocPage page={c} />
    </>
  );
}
