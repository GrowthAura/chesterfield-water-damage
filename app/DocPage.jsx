import { PHONE, PHONE_HREF } from '../lib/services';

// Shared renderer for doc-tab content pages (16 services + /services/ + /about/ + /contact/).
// EVERY visible word comes from lib/page-content.js (the doc tab for that route) —
// nothing is invented here. 'parts' arrays carry the doc's parenthetical-path
// link annotations as <a> links; the "(...)" marker itself is never rendered.

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

// Contact form — fields + note come from the Contact tab itself
// ("Form fields: Name, Phone, Email, Address, What happened, Best time to call."
// "Form note: For active leaks, flooding or sewage, please call instead of using the form.")
// Submit text reuses the tab's own CTA wording ("Send a Message").
// NOTE: this is a static export with no backend — a POST has nowhere to go on
// GitHub Pages (405), same known limit as the other static sites. On real PHP
// hosting it needs a handler; visitors should call. Flagged in FINDINGS.
const FIELD_TYPE = {
  Name: 'text',
  Phone: 'tel',
  Email: 'email',
  Address: 'text',
  'What happened': 'textarea',
  'Best time to call': 'text',
};
const FIELD_ID = {
  Name: 'name',
  Phone: 'phone',
  Email: 'email',
  Address: 'address',
  'What happened': 'what-happened',
  'Best time to call': 'best-time-to-call',
};

function ContactForm({ form, button2 }) {
  return (
    <form id="contact-form" className="contact-form" method="post" action="/contact">
      {form.fields.map((f) => (
        <div className="field" key={f}>
          <label htmlFor={FIELD_ID[f]}>{f}</label>
          {FIELD_TYPE[f] === 'textarea' ? (
            <textarea id={FIELD_ID[f]} name={FIELD_ID[f]} rows="5" />
          ) : (
            <input id={FIELD_ID[f]} name={FIELD_ID[f]} type={FIELD_TYPE[f]} />
          )}
        </div>
      ))}
      <button className="btn btn-call" type="submit">
        {button2}
      </button>
      <p className="form-note">{form.note}</p>
    </form>
  );
}

function Buttons({ button2 }) {
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

// Body image rule (service pages only, documented in FINDINGS):
// imageBody1 goes immediately BEFORE the 3rd body H2, imageBody2 immediately
// BEFORE the 6th body H2 — images break up the long article, never before the
// first heading and never inside the FAQ / final-CTA sections.
function BodyBlocks({ page, service }) {
  const out = [];
  let h2Count = 0;
  page.blocks.forEach((b, i) => {
    if (b.t === 'h2') {
      h2Count += 1;
      if (service && h2Count === 3) {
        out.push(
          <figure key="img1">
            <img src={service.imageBody1} alt={service.altBody1} width="1200" height="675" loading="lazy" />
          </figure>,
        );
      }
      if (service && h2Count === 6) {
        out.push(
          <figure key="img2">
            <img src={service.imageBody2} alt={service.altBody2} width="1200" height="675" loading="lazy" />
          </figure>,
        );
      }
      out.push(<h2 key={i}>{b.text}</h2>);
      if (b.form && page.form) {
        out.push(<ContactForm key="contact-form" form={page.form} button2={page.button2} />);
      }
    } else if (b.t === 'h3') {
      out.push(<h3 key={i}>{b.text}</h3>);
    } else {
      out.push(
        <p key={i}>
          <Parts parts={b.parts} />
        </p>,
      );
    }
  });
  return out;
}

export default function DocPage({ page, service }) {
  return (
    <>
      {/* Hero: eyebrow + H1 + lede + 2 equal buttons, all from the tab.
          Service pages keep their dark photographic hero; the three new routes
          have no assigned photo, so they render the same hero on solid navy. */}
      <section className="photo-hero photo-hero-service">
        {service && (
          <>
            <img className="photo-hero-bg" src={service.imageHero} alt={service.altHero} width="1200" height="675" fetchPriority="high" />
            <div className="photo-hero-overlay" aria-hidden="true" />
          </>
        )}
        <div className="wrap photo-hero-content">
          <p className="crumbs">
            <a href="/">Home</a> &nbsp;/&nbsp; {page.crumb}
          </p>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.h1}</h1>
          <p className="lede">
            <Parts parts={page.lede} />
          </p>
          <Buttons button2={page.button2} />
        </div>
      </section>

      <section className="service-body">
        <div className="wrap">
          <BodyBlocks page={page} service={service} />
        </div>
      </section>

      {page.faq && (
        <section className="faq">
          <div className="wrap">
            <h2>{page.faq.h2}</h2>
            {page.faq.items.map((it) => (
              <div className="faq-item" key={it.q}>
                <h3>{it.q}</h3>
                <p>
                  <Parts parts={it.a} />
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {page.finalCta && (
        <section className="final-cta">
          <div className="wrap">
            <h2>{page.finalCta.h2}</h2>
            {page.finalCta.parts.map((pp, i) => (
              <p key={i}>
                <Parts parts={pp} />
              </p>
            ))}
            <Buttons button2={page.button2} />
          </div>
        </section>
      )}
    </>
  );
}
