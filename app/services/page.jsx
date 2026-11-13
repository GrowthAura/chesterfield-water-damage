import { SERVICES, SITE_URL } from '../../lib/services';
import { breadcrumbNode, graph, webPageNode } from '../../lib/schema';
import { PAGE_CONTENT } from '../../lib/page-content';
import DocPage, { BodyBlocks, FinalCta, PageHero } from '../DocPage';

const c = PAGE_CONTENT['services'];

export function generateMetadata() {
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: '/services' },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: '/services',
      type: 'website',
    },
  };
}

export default function ServicesPage() {
  const canonical = `${SITE_URL}/services`;
  const pageGraph = graph([
    webPageNode(canonical, 'Services'),
    breadcrumbNode(canonical, [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Services', url: canonical },
    ]),
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageGraph) }} />
      <PageHero page={c} crumb={c.crumb} />
      {/* Full 16-service card grid (Tulsa .services-grid mechanism). Cards
          carry the service NAME only — the name is already visible on this
          page as the Tab 2 H3s, so the grid adds zero new visible words. */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="services-grid">
            {SERVICES.map((s) => (
              <article className="service-card" key={s.slug}>
                <div className="sc-body">
                  <a className="card-title" href={`/${s.slug}`}>{s.name}</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="service-body">
        <div className="wrap">
          <BodyBlocks page={c} />
        </div>
      </section>
      <FinalCta page={c} />
    </>
  );
}
