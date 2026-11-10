import './globals.css';
import { PHONE, PHONE_HREF, SERVICES, SITE_URL } from '../lib/services';

export const metadata = {
  // Canonicals + og:url use the SITE_URL placeholder until he gives the real
  // domain — host never invented, one swap fixes everything (same as sitemap/robots).
  metadataBase: new URL(SITE_URL),
  title: 'Water Damage Restoration Chesterfield MO | 24/7 Emergency',
  description: 'Water damage in Chesterfield, MO 63017? Crew dispatched immediately, day or night. Call (636) 228-0038 to get a crew out.',
  // Homepage canonical + og:url carry the trailing slash explicitly (homepage
  // is the only slash URL). Next.js metadata normalizes both `alternates.canonical`
  // and og `url` down to the bare origin in emitted HTML (Pass A D4), so both
  // are emitted as explicit tags in <head> below instead of via metadata.
  openGraph: {
    title: 'Water Damage Restoration Chesterfield MO | 24/7 Emergency',
    description: 'Water damage in Chesterfield, MO 63017? Crew dispatched immediately, day or night. Call (636) 228-0038 to get a crew out.',
    siteName: 'Water Damage Restoration Chesterfield',
    type: 'website',
    images: [{ url: '/images/chesterfield-hero-water-extraction.webp', width: 1200, height: 675, alt: 'Workers wading through floodwater around a pump truck with hoses and pumping equipment' }],
  },
};

// Footer carries only the 5 best service pages (standing rule). The header
// Services menu carries all 16 — his explicit order 2026-11-10.
const NAV_LINKS = [
  { href: '/emergency-water-extraction', label: 'Emergency' },
  { href: '/flooded-basement-cleanup', label: 'Basement Cleanup' },
  { href: '/sump-pump-failure-cleanup', label: 'Sump Pump' },
  { href: '/sewage-backup-cleanup', label: 'Sewage Backup' },
  { href: '/burst-pipe-water-damage', label: 'Burst Pipe' },
];

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'Water Damage Restoration Chesterfield',
  telephone: '+1-636-228-0038',
  areaServed: [
    { '@type': 'City', name: 'Chesterfield', addressRegion: 'MO', postalCode: '63017' },
    { '@type': 'City', name: 'Chesterfield', addressRegion: 'MO', postalCode: '63005' },
  ],
  address: { '@type': 'PostalAddress', addressLocality: 'Chesterfield', addressRegion: 'MO', postalCode: '63017', addressCountry: 'US' },
};

const webSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Water Damage Restoration Chesterfield',
  url: SITE_URL,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }} />
      </head>
      <body>
        <header className="site-header">
          <div className="wrap">
            <a className="brand" href="/">Water Damage Restoration<span>Chesterfield, MO &bull; 24/7 Emergency</span></a>
            <nav className="main-nav" aria-label="Main">
              <a href="/">Home</a>
              <div className="nav-drop">
                <button type="button" className="nav-drop-btn" aria-haspopup="true" aria-expanded="false">Services &#9662;</button>
                <div className="nav-drop-panel" role="menu" aria-label="All services">
                  {SERVICES.map((s) => (<a key={s.slug} href={`/${s.slug}`} role="menuitem">{s.name}</a>))}
                </div>
              </div>
            </nav>
            <button type="button" className="menu-btn" aria-expanded="false" aria-controls="mobile-nav">&#9776; Menu</button>
            <span className="header-call"><a className="btn btn-call" href={PHONE_HREF}>{PHONE}</a></span>
          </div>
          <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile">
            <a className="mnav-call" href={PHONE_HREF}>Call {PHONE}</a>
            <a href="/">Home</a>
            {SERVICES.map((s) => (<a key={s.slug} href={`/${s.slug}`}>{s.name}</a>))}
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <div className="cols">
              <div>
                <p className="fbrand">Water Damage Restoration Chesterfield, MO</p>
                <p>Local West County crew serving Chesterfield in ZIP codes 63017 and 63005. Call at any hour and a crew is dispatched immediately.</p>
                <p><a href={PHONE_HREF}>Call {PHONE}</a></p>
              </div>
              <div>
                <p className="fbrand">Services</p>
                <ul>
                  {NAV_LINKS.map((l) => (<li key={l.href}><a href={l.href}>{l.label}</a></li>))}
                </ul>
              </div>
            </div>
            <iframe
              className="map-embed"
              title="Map of Chesterfield, Missouri"
              src="https://www.google.com/maps?q=Chesterfield,+MO+63017&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="foot-note">Water Damage Restoration Chesterfield, MO &bull; 24/7 Emergency &bull; {PHONE}</p>
          </div>
        </footer>
        <div className="call-bar" role="navigation" aria-label="Call now">
          <a className="bar-call" href={PHONE_HREF}>Call {PHONE}</a>
          <a className="bar-help" href={PHONE_HREF}>Request Emergency Help</a>
        </div>
        {/* Tiny dependency-free scripts: (1) sticky call bar appears only after
            first scroll so it never covers the hero CTAs at mobile first paint;
            (2) Services dropdown click-toggle + close on outside click / Escape;
            (3) mobile hamburger menu toggle + close on link tap / Escape. */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var bar=function(){document.documentElement.classList.toggle('bar-on',window.scrollY>80)};window.addEventListener('scroll',bar,{passive:true});bar();var drop=document.querySelector('.nav-drop'),btn=document.querySelector('.nav-drop-btn'),mbtn=document.querySelector('.menu-btn'),mnav=document.querySelector('.mobile-nav');function closeMenu(){if(mnav){mnav.classList.remove('open')}if(mbtn){mbtn.setAttribute('aria-expanded','false')}}if(btn&&drop){btn.addEventListener('click',function(e){e.stopPropagation();var o=drop.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false')});document.addEventListener('click',function(e){if(!drop.contains(e.target)){drop.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.blur()}})}document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(drop){drop.classList.remove('open')}if(btn){btn.blur();btn.setAttribute('aria-expanded','false')}closeMenu()}});if(mbtn&&mnav){mbtn.addEventListener('click',function(e){e.stopPropagation();var o=mnav.classList.toggle('open');mbtn.setAttribute('aria-expanded',o?'true':'false')});mnav.addEventListener('click',function(e){if(e.target.closest('a')){closeMenu()}});}})();` }} />
      </body>
    </html>
  );
}
