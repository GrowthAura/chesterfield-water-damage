import { SITE_URL } from '../../lib/services';
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
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <DocPage page={c} />
    </>
  );
}
