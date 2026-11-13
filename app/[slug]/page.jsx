import { notFound } from 'next/navigation';
import { SERVICES, SITE_URL, serviceBySlug } from '../../lib/services';
import { BUSINESS_ID, breadcrumbNode, faqPageNode, graph, webPageNode } from '../../lib/schema';
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
  // No og:image: every image slot is honestly empty in this build.
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/${s.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `/${s.slug}`,
      type: 'website',
    },
  };
}

export default function ServicePage({ params }) {
  const s = serviceBySlug(params.slug);
  const c = PAGE_CONTENT[params.slug];
  if (!s || !c) notFound();

  // ONE @graph per page, @id-linked: WebPage + BreadcrumbList + Service +
  // FAQPage (5 visible Q+A from the tab). Flat URLs: the breadcrumb has
  // Home + current only (no /services/ parent in the URL).
  const canonical = `${SITE_URL}/${s.slug}`;
  const nodes = [
    webPageNode(canonical, s.name),
    breadcrumbNode(canonical, [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: s.name, url: canonical },
    ]),
    {
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: s.name,
      description: c.metaDescription,
      areaServed: { '@type': 'City', name: 'Chesterfield', addressRegion: 'MO' },
      provider: { '@id': BUSINESS_ID },
    },
  ];
  if (c.faq) nodes.push(faqPageNode(canonical, c.faq.items, partsText));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(nodes)) }} />
      <DocPage page={c} crumb={c.crumb} />
    </>
  );
}
