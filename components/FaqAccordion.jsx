'use client';

import { useEffect, useRef, useState } from 'react';

// FAQ accordion (Tulsa single-open behaviour). ALL answers start OPEN so
// every FAQ answer is visible at first paint with zero scrolling —
// answers are never hidden behind a closed accordion. Clicking a question
// then follows the single-open rule (opens that one, closes the rest).
// The .open class alone makes the answer visible in CSS, so content is
// visible even before JS runs; JS only refines the exact max-height.
export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null); // null = all open
  const panels = useRef([]);

  useEffect(() => {
    panels.current.forEach((el, i) => {
      if (!el) return;
      const isOpen = openIndex === null || openIndex === i;
      el.style.maxHeight = isOpen ? `${el.scrollHeight}px` : '0px';
    });
  }, [openIndex, items]);

  return (
    <div className="faq-list">
      {items.map((it, i) => {
        const isOpen = openIndex === null || openIndex === i;
        return (
          <div className={`faq-item${isOpen ? ' open' : ''}`} key={it.q}>
            <h3>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen ? 'true' : 'false'}
                onClick={() => setOpenIndex(isOpen && openIndex !== null ? null : i)}
              >
                {it.q}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </h3>
            <div
              className="faq-a"
              ref={(el) => {
                panels.current[i] = el;
              }}
            >
              <p>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
