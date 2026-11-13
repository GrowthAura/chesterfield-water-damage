'use client';

import { useState } from 'react';
import { PHONE, PHONE_HREF } from '../lib/services';

// Contact form — fields + note come from the Contact tab itself
// ("Form fields: Name, Phone, Email, Address, What happened, Best time to call."
// "Form note: For active leaks, flooding or sewage, please call instead of
// using the form."). Submit text reuses the tab's own CTA wording
// ("Send a Message"). This is a static export with no backend: on submit the
// form shows the tab's own note and the call link instead of posting
// nowhere. A real form-to-email endpoint is an open item for the parent.
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
const FIELD_AUTOCOMPLETE = {
  Name: 'name',
  Phone: 'tel',
  Email: 'email',
  Address: 'street-address',
  'What happened': 'off',
  'Best time to call': 'off',
};

export default function ContactForm({ form, button2 }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="form-card">
        <div className="form-success" role="status">
          <p>{form.note}</p>
          <a className="btn btn-call" href={PHONE_HREF}>{PHONE}</a>
        </div>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      className="form-card"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
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
      <button className="btn btn-call" type="submit" style={{ width: '100%' }}>
        {button2}
      </button>
      <p className="form-note">{form.note}</p>
    </form>
  );
}
