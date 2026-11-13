import { notFound } from 'next/navigation';
import { SERVICES, SITE_URL, serviceBySlug, serviceCardImage } from '../../lib/services';
import { BUSINESS_ID, graph, webPageNode } from '../../lib/schema';
import { PAGE_CONTENT } from '../../lib/page-content';
import DocPage, { partsText } from '../DocPage';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = serviceBySlug(params.slug);
  const c = PAGE_CONTENT[params.slug];
  if (!s || !c) return {};
  // og:image: the hero when there is one, else the service's remaining clean
  // body image (card fallback); a service with no image at all emits no
  // og:image rather than a broken one (11 slots EMPTY, fix round 2026-11-13).
  const ogImage = serviceCardImage(s);
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
      ...(ogImage ? { images: [{ url: ogImage.src, width: 1200, height: 675, alt: ogImage.alt }] } : {}),
    },
  };
}

export default function ServicePage({ params }) {
  const s = serviceBySlug(params.slug);
  const c = PAGE_CONTENT[params.slug];
  if (!s || !c) notFound();

  // ONE @graph per page, @id-linked: WebPage + BreadcrumbList + Service +
  // FAQPage (when the tab has one — 5 visible Q+A per service page).
  const canonical = `${SITE_URL}/${s.slug}`;
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: s.name, item: canonical },
    ],
  };
  const serviceSchema = {
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name: s.name,
    description: c.metaDescription,
    areaServed: { '@type': 'City', name: 'Chesterfield', addressRegion: 'MO' },
    provider: { '@id': BUSINESS_ID },
  };
  // FAQPage schema exactly matches the visible FAQ Q/A from the tab.
  const faqSchema = c.faq
    ? {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: c.faq.items.map((it) => ({
          '@type': 'Question',
          name: it.q,
          acceptedAnswer: { '@type': 'Answer', text: partsText(it.a) },
        })),
      }
    : null;
  const nodes = [webPageNode(canonical, s.name), breadcrumb, serviceSchema];
  if (faqSchema) nodes.push(faqSchema);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(nodes)) }} />
      <DocPage page={c} service={s} />
    </>
  );
}
