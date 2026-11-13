'use client';

import { useEffect, useState } from 'react';
import { PHONE, PHONE_HREF } from '../lib/services';

// Mobile call bar: hidden at first paint (appears only after >80px scroll,
// so it never covers the hero CTA buttons), and hides again while the
// footer is in view (IntersectionObserver, threshold 0).
export default function MobileCallBar() {
  const [show, setShow] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const footer = document.querySelector('footer');
    let observer = null;
    if (footer && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => setFooterInView(entries[0].isIntersecting),
        { threshold: 0 },
      );
      observer.observe(footer);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`mobile-callbar${show ? ' show' : ''}${footerInView ? ' footer-inview' : ''}`}
      role="navigation"
      aria-label="Call now"
    >
      <a className="btn btn-call" href={PHONE_HREF}>Call {PHONE}</a>
      <a className="btn btn-help" href={PHONE_HREF}>Request Emergency Help</a>
    </div>
  );
}
