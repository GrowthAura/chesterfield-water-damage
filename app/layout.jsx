import './globals.css';
import { Fraunces, Inter } from 'next/font/google';
import { PHONE, PHONE_HREF, SERVICES, FOOTER_SERVICES, SITE_URL } from '../lib/services';
import { siteGraph } from '../lib/schema';
import Header from '../components/Header';
import MobileCallBar from '../components/MobileCallBar';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Water Damage Restoration Chesterfield MO | 24/7 Emergency',
  description: 'Water damage in Chesterfield, MO 63017? Crew dispatched immediately, day or night. Call (636) 228-0038 to get a crew out.',
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  openGraph: {
    title: 'Water Damage Restoration Chesterfield MO | 24/7 Emergency',
    description: 'Water damage in Chesterfield, MO 63017? Crew dispatched immediately, day or night. Call (636) 228-0038 to get a crew out.',
    siteName: 'Water Damage Restoration Chesterfield',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Water Damage Restoration Chesterfield MO | 24/7 Emergency',
    description: 'Water damage in Chesterfield, MO 63017? Crew dispatched immediately, day or night. Call (636) 228-0038 to get a crew out.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Site-wide @id graph: WebSite (#website) + business (#business,
            HomeAndConstructionBusiness — a LocalBusiness subtype).
            Each page adds its own WebPage node referencing these by @id. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph()) }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        <div className="dispatch-bar">
          <div className="wrap dispatch-inner">
            <span className="pulse-dot" aria-hidden="true" />
            <p><strong>Crew dispatched immediately, day or night.</strong></p>
            <a className="dispatch-phone" href={PHONE_HREF}>{PHONE}</a>
          </div>
        </div>
        <Header />
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="wrap footer-grid">
            <div className="footer-col">
              <p className="fbrand">Water Damage Restoration Chesterfield, MO</p>
              <p>Local West County crew serving Chesterfield in ZIP codes 63017 and 63005. Call at any hour and a crew is dispatched immediately.</p>
              <p><a href={PHONE_HREF}>Call {PHONE}</a></p>
              <p>
                <a href="/services">Services</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
              </p>
            </div>
            <div className="footer-col">
              <p className="fbrand">Services</p>
              <ul>
                {FOOTER_SERVICES.map((l) => (
                  <li key={l.href}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col footer-contact">
              <p className="fbrand">Contact</p>
              <p><a href={PHONE_HREF}>{PHONE}</a></p>
              <p>Chesterfield, Missouri. ZIP codes 63017 and 63005.</p>
              <p>Emergency service: 24/7.</p>
              <p><a className="btn btn-call" href={PHONE_HREF}>{PHONE}</a></p>
            </div>
          </div>
          <div className="wrap">
            <iframe
              className="map-embed"
              title="Map of Chesterfield, Missouri"
              src="https://www.google.com/maps?q=Chesterfield,+MO+63017&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="footer-bottom">
            <div className="wrap">
              <span>Water Damage Restoration Chesterfield, MO &bull; 24/7 Emergency &bull; {PHONE}</span>
              <span className="footer-bottom-links">
                <a href="/services">Services</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
              </span>
            </div>
          </div>
        </footer>
        <MobileCallBar />
      </body>
    </html>
  );
}
