import { SITE_URL } from '../../lib/services';
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
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <DocPage page={c} />
    </>
  );
}
