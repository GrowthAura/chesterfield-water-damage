import { notFound } from 'next/navigation';
import { SERVICES, SITE_URL, serviceBySlug } from '../../lib/services';
import { PAGE_CONTENT } from '../../lib/page-content';
import DocPage, { partsText } from '../DocPage';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = serviceBySlug(params.slug);
  const c = PAGE_CONTENT[params.slug];
  if (!s || !c) return {};
  // Title + description are the tab's own verbatim meta lines.
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/${s.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `/${s.slug}`,
      type: 'website',
      images: [{ url: s.imageHero, width: 1200, height: 675, alt: s.altHero }],
    },
  };
}

export default function ServicePage({ params }) {
  const s = serviceBySlug(params.slug);
  const c = PAGE_CONTENT[params.slug];
  if (!s || !c) notFound();

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: s.name, item: `${SITE_URL}/${s.slug}` },
    ],
  };
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: c.metaDescription,
    areaServed: { '@type': 'City', name: 'Chesterfield', addressRegion: 'MO' },
    provider: { '@type': 'HomeAndConstructionBusiness', name: 'Water Damage Restoration Chesterfield', telephone: '+1-636-228-0038' },
  };
  // FAQPage schema exactly matches the visible FAQ Q/A from the tab.
  const faqSchema = c.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: c.faq.items.map((it) => ({
          '@type': 'Question',
          name: it.q,
          acceptedAnswer: { '@type': 'Answer', text: partsText(it.a) },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <DocPage page={c} service={s} />
    </>
  );
}
