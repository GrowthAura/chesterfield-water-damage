import { PHONE, PHONE_HREF } from '../lib/services';
import { FIGURE_SLOTS } from '../lib/figure-slots';

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
// WCAG 1.3.5 (Chain 1 C-8): autocomplete so browsers can autofill. The two
// free-text fields have no standard token, so they carry autocomplete="off".
const FIELD_AUTOCOMPLETE = {
  Name: 'name',
  Phone: 'tel',
  Email: 'email',
  Address: 'street-address',
  'What happened': 'off',
  'Best time to call': 'off',
};

function ContactForm({ form, button2 }) {
  return (
    <form id="contact-form" className="contact-form" method="post" action="/contact">
      {form.fields.map((f) => (
        <div className="field" key={f}>
          <label htmlFor={FIELD_ID[f]}>{f}</label>
          {FIELD_TYPE[f] === 'textarea' ? (
            <textarea id={FIELD_ID[f]} name={FIELD_ID[f]} rows="5" autoComplete={FIELD_AUTOCOMPLETE[f]} />
          ) : (
            <input id={FIELD_ID[f]} name={FIELD_ID[f]} type={FIELD_TYPE[f]} autoComplete={FIELD_AUTOCOMPLETE[f]} />
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
// imageBody1 goes with the 3rd body H2 group, imageBody2 with the 6th —
// each figure + its following H2-group (H2 + paragraphs until the next H2)
// is wrapped in .sec-group so the figure can sit sticky beside its text
// on desktop (CSS: grid + position sticky, off below 768px). The figure
// never overlaps text: it occupies its own grid column, facing the text.
// A slot with no image (EMPTY in the 2026-11-13 fix round) renders no
// figure at all — the H2 group flows on unwrapped, structure intact.
// Per-page overrides live in lib/figure-slots.js (Chain 1 B §4): a figure
// moves only where the default pairing is clearly wrong and the correct
// H2 group is unambiguous. An out-of-range override falls back to the
// default so a figure can never vanish.
function BodyBlocks({ page, service }) {
  const out = [];
  let h2Count = 0;
  const totalH2 = page.blocks.filter((b) => b.t === 'h2').length;
  const slots = (service && FIGURE_SLOTS[service.slug]) || {};
  const body1At = slots.body1 && slots.body1 <= totalH2 ? slots.body1 : 3;
  const body2At = slots.body2 && slots.body2 <= totalH2 ? slots.body2 : 6;
  let group = null;
  const flushGroup = () => {
    if (!group) return;
    out.push(
      <div className="sec-group" key={group.key}>
        {group.figure}
        <div className="sec-group-text">{group.blocks}</div>
      </div>,
    );
    group = null;
  };
  page.blocks.forEach((b, i) => {
    if (b.t === 'h2') {
      flushGroup();
      h2Count += 1;
      const figure =
        service && service.imageBody1 && h2Count === body1At ? (
          <figure key="img1">
            <img src={service.imageBody1} alt={service.altBody1} width="1200" height="675" loading="lazy" />
          </figure>
        ) : service && service.imageBody2 && h2Count === body2At ? (
          <figure key="img2">
            <img src={service.imageBody2} alt={service.altBody2} width="1200" height="675" loading="lazy" />
          </figure>
        ) : null;
      const h2El = <h2 key={i}>{b.text}</h2>;
      const formEl = b.form && page.form ? <ContactForm key="contact-form" form={page.form} button2={page.button2} /> : null;
      if (figure) {
        group = { key: `sec-group-${h2Count}`, figure, blocks: [h2El, formEl].filter(Boolean) };
      } else {
        out.push(h2El);
        if (formEl) out.push(formEl);
      }
    } else if (b.t === 'h3') {
      const el = <h3 key={i}>{b.text}</h3>;
      if (group) group.blocks.push(el);
      else out.push(el);
    } else {
      const el = (
        <p key={i}>
          <Parts parts={b.parts} />
        </p>
      );
      if (group) group.blocks.push(el);
      else out.push(el);
    }
  });
  flushGroup();
  return out;
}

export default function DocPage({ page, service }) {
  return (
    <>
      {/* Hero: eyebrow + H1 + lede + 2 equal buttons, all from the tab.
          Service pages with a hero photo keep their dark photographic hero;
          hero-less services (11 slots went EMPTY in the 2026-11-13 fix round
          — no honest photo exists) render the same hero on solid navy, like
          the three new routes, with no img, no overlay and no empty box. */}
      <section className="photo-hero photo-hero-service">
        {service && service.imageHero && (
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
