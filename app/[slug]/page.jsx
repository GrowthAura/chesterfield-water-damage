import { notFound } from 'next/navigation';
import { PHONE, PHONE_HREF, SERVICES, SITE_URL, serviceBySlug } from '../../lib/services';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = serviceBySlug(params.slug);
  if (!s) return {};
  // Canonical + og:url use the SITE_URL placeholder until he gives the real domain.
  return {
    title: `${s.h1} | 24/7 Emergency`,
    description: s.summary,
    alternates: { canonical: `/${s.slug}` },
    openGraph: {
      title: `${s.h1} | 24/7 Emergency`,
      description: s.summary,
      url: `/${s.slug}`,
      type: 'website',
      images: [{ url: s.imageHero, width: 1200, height: 675, alt: s.altHero }],
    },
  };
}

export default function ServicePage({ params }) {
  const s = serviceBySlug(params.slug);
  if (!s) notFound();

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
    description: s.summary,
    areaServed: { '@type': 'City', name: 'Chesterfield', addressRegion: 'MO' },
    provider: { '@type': 'HomeAndConstructionBusiness', name: 'Water Damage Restoration Chesterfield', telephone: '+1-636-228-0038' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {/* Dark photographic hero (real-photo round 2026-11-10): real hero photo as
          background + dark overlay, breadcrumb → H1 → verbatim summary lede →
          2 equal buttons, all INSIDE the hero. No new words. */}
      <section className="photo-hero photo-hero-service">
        <img className="photo-hero-bg" src={s.imageHero} alt={s.altHero} width="1200" height="675" fetchPriority="high" />
        <div className="photo-hero-overlay" aria-hidden="true" />
        <div className="wrap photo-hero-content">
          <p className="crumbs"><a href="/">Home</a> &nbsp;/&nbsp; {s.name}</p>
          <h1>{s.h1}</h1>
          <p className="lede">{s.summary}</p>
          <div className="btn-row">
            <a className="btn btn-call" href={PHONE_HREF}>{PHONE}</a>
            <a className="btn btn-help" href={PHONE_HREF}>Request Emergency Help</a>
          </div>
        </div>
      </section>
      <section className="service-body">
        <div className="wrap">
          <figure>
            <img src={s.imageBody1} alt={s.altBody1} width="1200" height="675" loading="lazy" />
          </figure>
          <p>Call at any hour and a crew is dispatched immediately with pumps, extractors and drying equipment already on the truck.</p>
          <figure>
            <img src={s.imageBody2} alt={s.altBody2} width="1200" height="675" loading="lazy" />
          </figure>
        </div>
      </section>
    </>
  );
}
