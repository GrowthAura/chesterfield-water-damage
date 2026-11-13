'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PHONE, PHONE_HREF, SERVICES } from '../lib/services';

// Header: sticky shadow, Services dropdown (all 16), burger + mobile nav.
// Desktop dropdown opens on hover/focus (CSS) and on click (state); it
// closes on outside click and on Escape. The mobile menu closes on link
// tap, on Escape, and on any scroll (Tulsa standing rule).
export default function Header() {
  const pathname = usePathname();
  const [dropOpen, setDropOpen] = useState(false);
  const [escapeClosed, setEscapeClosed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      if (window.scrollY !== 0) setMenuOpen(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!dropOpen) return;
    const onClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
        setEscapeClosed(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [dropOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setDropOpen(false);
      setEscapeClosed(true);
      setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Any scroll closes the mobile menu; a fresh hover/focus clears Escape state.
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('wheel', close, { passive: true });
    window.addEventListener('touchmove', close, { passive: true });
    return () => {
      window.removeEventListener('wheel', close);
      window.removeEventListener('touchmove', close);
    };
  }, [menuOpen]);

  const isHome = pathname === '/';
  const isServices = pathname === '/services' || pathname === '/services/';
  const isAbout = pathname === '/about';
  const isContact = pathname === '/contact';
  const currentSlug = pathname ? pathname.replace(/^\/|\/$/g, '') : '';

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap header-inner">
        <a className="brand" href="/">
          <strong>Water Damage Restoration</strong>
          <span>Chesterfield, MO &bull; 24/7 Emergency</span>
        </a>
        <nav className="main-nav" aria-label="Main">
          {isHome ? (
            <span className="cur" aria-current="page">Home</span>
          ) : (
            <a href="/">Home</a>
          )}
          <div
            ref={dropRef}
            className={`nav-drop${dropOpen ? ' open' : ''}${escapeClosed ? ' escape-closed' : ''}`}
            onMouseEnter={() => setEscapeClosed(false)}
            onFocus={() => setEscapeClosed(false)}
          >
            {isServices ? (
              <span className="nav-drop-btn cur" aria-current="page">Services</span>
            ) : (
              <button
                type="button"
                className="nav-drop-btn"
                aria-haspopup="true"
                aria-expanded={dropOpen ? 'true' : 'false'}
                onClick={(e) => {
                  e.stopPropagation();
                  setEscapeClosed(false);
                  setDropOpen((o) => !o);
                }}
              >
                Services
              </button>
            )}
            <button
              type="button"
              className="nav-caret"
              aria-label="Toggle services menu"
              aria-haspopup="true"
              aria-expanded={dropOpen ? 'true' : 'false'}
              onClick={(e) => {
                e.stopPropagation();
                setEscapeClosed(false);
                setDropOpen((o) => !o);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="drop-menu" aria-label="All services">
              {SERVICES.map((s) =>
                s.slug === currentSlug ? (
                  <span key={s.slug} className="cur" aria-current="page">{s.name}</span>
                ) : (
                  <a key={s.slug} href={`/${s.slug}`}>{s.name}</a>
                ),
              )}
              {isServices ? (
                <span className="drop-all cur" aria-current="page">View All Services &rarr;</span>
              ) : (
                <a className="drop-all" href="/services">View All Services &rarr;</a>
              )}
            </div>
          </div>
          {isAbout ? (
            <span className="cur" aria-current="page">About</span>
          ) : (
            <a href="/about">About</a>
          )}
          {isContact ? (
            <span className="cur" aria-current="page">Contact</span>
          ) : (
            <a href="/contact">Contact</a>
          )}
        </nav>
        <a className="btn btn-call header-call" href={PHONE_HREF}>{PHONE}</a>
        <a className="header-call-m" href={PHONE_HREF}>Call Now</a>
        <button
          type="button"
          className={`burger${menuOpen ? ' open' : ''}`}
          aria-expanded={menuOpen ? 'true' : 'false'}
          aria-controls="mobile-nav"
          aria-label="Menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} id="mobile-nav" aria-label="Mobile">
          <a className="mnav-call" href={PHONE_HREF}>Call {PHONE}</a>
          {isHome ? (
            <span className="cur" aria-current="page">Home</span>
          ) : (
            <a href="/">Home</a>
          )}
          {SERVICES.map((s) =>
            s.slug === currentSlug ? (
              <span key={s.slug} className="cur" aria-current="page">{s.name}</span>
            ) : (
              <a key={s.slug} href={`/${s.slug}`}>{s.name}</a>
            ),
          )}
          {isServices ? (
            <span className="cur" aria-current="page">All Services</span>
          ) : (
            <a href="/services">All Services</a>
          )}
          {isAbout ? (
            <span className="cur" aria-current="page">About</span>
          ) : (
            <a href="/about">About</a>
          )}
          {isContact ? (
            <span className="cur" aria-current="page">Contact</span>
          ) : (
            <a href="/contact">Contact</a>
          )}
        </nav>
      </div>
    </header>
  );
}
