import { PHONE, PHONE_HREF } from '../lib/services';
import FaqAccordion from '../components/FaqAccordion';
import ContactForm from '../components/ContactForm';

// Shared renderer for doc-tab content pages (16 services + /services/ +
// /about/ + /contact/). EVERY visible word comes from lib/page-content.js
// (the doc tab for that route) — nothing is invented here. 'parts' arrays
// carry the doc's parenthetical-path link annotations as <a> links; the
// "(...)" marker itself is never rendered.
// NO images: every image slot is honestly EMPTY in this build (no <img>
// tag, no empty box) until the image phase installs real photos.

export function partsText(parts) {
  return (parts || []).map((p) => p.t).join('');
}

export function Parts({ parts }) {
  return (
    <>
      {(parts || []).map((p, i) =>
        p.href ? (
          <a key={i} href={p.href}>
            {p.t}
          </a>
        ) : (
          <span key={i}>{p.t}</span>
        ),
      )}
    </>
  );
}

export function Buttons({ button2 }) {
  return (
    <div className="btn-row">
      <a className="btn btn-call" href={PHONE_HREF}>
        {PHONE}
      </a>
      <a className="btn btn-help" href={PHONE_HREF}>
        {button2}
      </a>
    </div>
  );
}

export function PageHero({ page, crumb }) {
  return (
    <section className="photo-hero">
      <div className="wrap photo-hero-content">
        {crumb && (
          <p className="crumbs">
            <a href="/">Home</a> &nbsp;/&nbsp; {crumb}
          </p>
        )}
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.h1}</h1>
        <p className="lede">
          <Parts parts={page.lede} />
        </p>
        <Buttons button2={page.button2} />
      </div>
    </section>
  );
}

export function BodyBlocks({ page }) {
  return (
    <>
      {page.blocks.map((b, i) => {
        if (b.t === 'h2') {
          return (
            <div key={i}>
              <h2>{b.text}</h2>
              {b.form && page.form ? <ContactForm form={page.form} button2={page.button2} /> : null}
            </div>
          );
        }
        if (b.t === 'h3') return <h3 key={i}>{b.text}</h3>;
        return (
          <p key={i}>
            <Parts parts={b.parts} />
          </p>
        );
      })}
    </>
  );
}

export function FaqSection({ page }) {
  if (!page.faq) return null;
  return (
    <section className="section faq-section">
      <div className="wrap faq-wrap">
        <h2>{page.faq.h2}</h2>
        <FaqAccordion
          items={page.faq.items.map((it) => ({ q: it.q, a: partsText(it.a) }))}
        />
      </div>
    </section>
  );
}

export function FinalCta({ page }) {
  if (!page.finalCta) return null;
  return (
    <section className="final-cta">
      <div className="wrap">
        <h2>{page.finalCta.h2}</h2>
        {page.finalCta.parts.map((pp, i) => (
          <p key={i}>
            <Parts parts={pp} />
          </p>
        ))}
        <a className="cta-phone" href={PHONE_HREF}>
          {PHONE}
        </a>
        <Buttons button2={page.button2} />
      </div>
    </section>
  );
}

export default function DocPage({ page, crumb }) {
  return (
    <>
      <PageHero page={page} crumb={crumb} />
      <section className="service-body">
        <div className="wrap">
          <BodyBlocks page={page} />
        </div>
      </section>
      <FaqSection page={page} />
      <FinalCta page={page} />
    </>
  );
}
