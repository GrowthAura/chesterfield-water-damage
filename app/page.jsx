import { PHONE, PHONE_HREF, SERVICES, SERVICE_GROUPS, SITE_URL } from '../lib/services';

const FAQ = [
  { q: 'How fast can a crew get to my house in Chesterfield?', a: 'The crew is dispatched immediately when you call, at any hour. Arrival depends on where you are and road conditions, and you are told the expected time on the phone.' },
  { q: 'Is a wet basement carpet worth saving?', a: 'Often, yes, if the water was clean and extraction starts within about a day. The pad underneath usually has to be replaced. Carpet soaked by sewage or outside floodwater is removed.' },
  { q: 'How long does drying take?', a: 'Most homes dry in three to five days with professional equipment. Thick plaster, hardwood and heavily soaked framing can take longer. Daily readings decide when equipment comes out, not a fixed schedule.' },
  { q: 'Do I need to move out while the work is done?', a: 'Usually not. Equipment is loud and warm, but most families stay. Sewage jobs and large mold jobs are the common exceptions.' },
  { q: 'Should I search for water damage restoration near me or call a plumber first?', a: 'If water is still flowing and you cannot stop it, a plumber fixes the source. For everything already wet, call a water damage company. We can help you shut the water off by phone and work alongside your plumber.' },
  { q: 'Do you handle commercial buildings in Chesterfield Valley?', a: 'Yes. Retail, office, medical, warehouse and hangar space are all handled, with after-hours scheduling so tenants can stay open.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

function bySlug(slug) {
  return SERVICES.find((s) => s.slug === slug);
}

export default function HomePage() {
  return (
    <>
      {/* Homepage-only canonical + og:url with the trailing slash (homepage is
          the only slash URL). Next.js metadata normalizes both down to the bare
          origin (Pass A D4), so they are emitted here as explicit tags — Next
          hoists them into <head>. Service pages keep their own metadata tags. */}
      <link rel="canonical" href={`${SITE_URL}/`} />
      <meta property="og:url" content={`${SITE_URL}/`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* 1. Hero — full-bleed DARK photographic hero (real-photo round 2026-11-10):
          the real hero photo as background + dark overlay, intro INSIDE the hero,
          2 equal buttons, the 4 trust phrases as plain chips (the standalone
          trust band is removed — same phrases, no duplication). */}
      <section className="photo-hero">
        <img className="photo-hero-bg" src="/images/chesterfield-hero-water-extraction.webp" alt="Workers wading through floodwater around a pump truck with hoses and pumping equipment" width="1200" height="675" fetchPriority="high" />
        <div className="photo-hero-overlay" aria-hidden="true" />
        <div className="wrap photo-hero-content">
          <p className="eyebrow">Water Damage Restoration &bull; Chesterfield, Missouri</p>
          <h1>24/7 Emergency Water Damage Restoration in Chesterfield, MO</h1>
          <p className="lede">Water on the floor does not wait for business hours. Our local crew handles water damage restoration in Chesterfield, MO for homes and businesses in 63017 and 63005: flooded basements, failed sump pumps, burst pipes, sewage backups and storm water. Call at any hour and a crew is dispatched immediately with pumps, extractors and drying equipment already on the truck.</p>
          <div className="btn-row">
            <a className="btn btn-call" href={PHONE_HREF}>{PHONE}</a>
            <a className="btn btn-help" href={PHONE_HREF}>Request Emergency Help</a>
          </div>
          <ul className="hero-chips">
            <li>24/7 Live Answer</li>
            <li>Crew Dispatched Immediately</li>
            <li>Local West County Crew</li>
            <li>Claim Documentation Included</li>
          </ul>
        </div>
      </section>

      {/* 3. Intro */}
      <section>
        <div className="wrap">
          <h2>Who do you call for water damage in Chesterfield, MO when a basement floods overnight?</h2>
          <p>Call a local water damage crew that answers around the clock. In Chesterfield, a crew is dispatched immediately to stop the source, pump out standing water and begin drying the same night.</p>
          <p>The first call matters more than most people expect. Water that sits in carpet pad, drywall and framing keeps spreading for hours after the leak itself has stopped, and in a humid St. Louis County summer mold can start within one to two days. Getting extraction and drying equipment running quickly is what keeps a wet room from turning into a full tear-out.</p>
        </div>
      </section>

      {/* 4. Navy features band — verbatim phrases from the doc, no added heading */}
      <div className="features">
        <div className="wrap cards3">
          <div className="fcard">
            <p><strong>Crew dispatched immediately</strong>Call at any hour and a crew is dispatched immediately with pumps, extractors and drying equipment already on the truck.</p>
          </div>
          <div className="fcard">
            <p><strong>Work starts on arrival</strong>The truck carries submersible pumps, truck-mounted and portable extractors, air movers, dehumidifiers and moisture meters, so work starts on arrival instead of after a second trip.</p>
          </div>
          <div className="fcard">
            <p><strong>Drying checked daily</strong>Drying equipment is set and checked daily until moisture readings are back to normal for the building.</p>
          </div>
        </div>
      </div>

      {/* 5. Services */}
      <section>
        <div className="wrap">
          <h2>Water damage services in Chesterfield</h2>
          <p>Every service below is handled by the same crew, so one call covers the job from the first pump-out to the final repair.</p>
          {SERVICE_GROUPS.map((g) => (
            <div className="svc-group" key={g.h3}>
              <h3>{g.h3}</h3>
              <div className="cards">
                {g.slugs.map((slug) => {
                  const s = bySlug(slug);
                  return (
                    <article className={`card${g.slugs.length === 1 ? ' card-wide' : ''}`} key={slug}>
                      <img src={s.image} alt={s.alt} width="640" height="426" loading="lazy" />
                      <div className="card-body">
                        <a className="card-title" href={`/${s.slug}`}>{s.anchor}</a>
                        {g.slugs.length === 1 && <p>{s.summary}</p>}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Two Chesterfields */}
      <section>
        <div className="wrap">
          <h2>Two Chesterfields, two different water problems</h2>
          <p>Chesterfield is not one kind of property, and the water problems split along the bluff line.</p>
          <div className="areas">
            <div className="area-card">
              <h3>Hilltop subdivisions in 63017</h3>
              <p>South of I-64, along Clarkson Road, Baxter Road and Olive Boulevard, most homes are two-story houses from the 1980s through the 2000s with finished walkout basements. Those lower levels hold home theaters, bedrooms, wet bars and offices, and nearly all of them depend on a sump pump. The soil is heavy clay that holds water against foundation walls. When a storm knocks out Ameren Missouri power or a float switch sticks, the pit overflows and a finished room takes on water in minutes. Sewer lateral backups through floor drains, frozen pipes in rooms over garages and second-floor laundry leaks round out the calls we see most.</p>
            </div>
            <div className="area-card">
              <h3>Chesterfield Valley in 63005</h3>
              <p>North of I-64, the Valley sits on Missouri River bottomland behind the Monarch-Chesterfield Levee. It is mostly retail, offices, warehouses and the Spirit of St. Louis Airport. Here the problems are groundwater pressure under slabs, sprinkler line breaks, flat-roof drain failures and storm water at loading docks. Businesses need water out quickly and work scheduled around their opening hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Process */}
      <section className="process">
        <div className="wrap">
          <h2>What happens after you call</h2>
          <ol className="steps">
            <li>
              <h3>1. A real person takes the details</h3>
              <p>You tell us where the water is, where it came from if you know, and whether the power is on. If the source is still running, we talk you through shutting off the main valve or the fixture supply while the crew is on the way.</p>
            </li>
            <li>
              <h3>2. The crew is dispatched immediately</h3>
              <p>The truck carries submersible pumps, truck-mounted and portable extractors, air movers, dehumidifiers and moisture meters, so work starts on arrival instead of after a second trip.</p>
            </li>
            <li>
              <h3>3. Inspection and moisture mapping</h3>
              <p>We trace how far the water travelled, including inside walls and under flooring, and identify the water category: clean supply water, gray water from appliances, or contaminated water from sewers and floods. That decides what can be dried and what has to come out.</p>
            </li>
            <li>
              <h3>4. Extraction, drying and cleaning</h3>
              <p>Standing water is removed, wet materials that cannot be saved are taken out, and drying equipment is set and checked daily until moisture readings are back to normal for the building.</p>
            </li>
            <li>
              <h3>5. Repairs</h3>
              <p>Once the structure is dry, damaged drywall, insulation, baseboards and flooring are repaired so the room is usable again.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* 8. Why water spreads */}
      <section>
        <div className="wrap">
          <h2>Why water spreads so quickly in West County homes</h2>
          <p>Builders in this part of St. Louis County finished basements with carpet over pad, drywall down to the slab and wood trim. All three act like a wick. An inch of water on the floor can climb a foot or more up the wall within a day. Clay soil outside keeps the foundation damp long after the rain stops, so a basement that looks dry on the surface can still read wet inside the wall cavity.</p>
          <p>This is why water damage repair in Chesterfield, MO usually involves more than a shop vacuum and a fan. Proper drying means measuring moisture in the materials, removing baseboards so air can reach the wall base, and running dehumidifiers sized for the room until the readings come down.</p>
        </div>
      </section>

      {/* 9. Before the crew arrives */}
      <section>
        <div className="wrap">
          <h2>What to do before the crew arrives</h2>
          <ul className="checklist">
            <li>Shut off the water at the main valve if a pipe or fixture is the source.</li>
            <li>Turn off power to the wet area at the breaker if you can reach the panel without standing in water.</li>
            <li>Stay out of water that came from a floor drain, toilet or outside flooding. It is contaminated.</li>
            <li>Move electronics, rugs, documents and small furniture to a dry room.</li>
            <li>Put foil or plastic under furniture legs that sit on wet carpet.</li>
            <li>Take photos and short videos of every affected room before anything is moved. Your adjuster will ask for them.</li>
            <li>Do not run the furnace fan or central air through wet rooms if you suspect mold or sewage.</li>
          </ul>
        </div>
      </section>

      {/* 10. Cost */}
      <section>
        <div className="wrap">
          <h2>How much does water damage cleanup cost here?</h2>
          <p>Cost depends on three things: how much area is wet, how clean the water is, and how long it sat. A small clean-water leak caught the same day can stay in the range of several hundred dollars to a couple of thousand. A flooded finished basement, or any job involving sewage, usually runs from a few thousand dollars into five figures once removal and rebuilding are included. After the inspection you get a written scope that lists the work room by room, so you know what you are approving before it starts.</p>
          <p>For water damage cleanup in Chesterfield, MO that is covered by a homeowners policy, the same written scope, photos and daily moisture readings go to your adjuster.</p>
        </div>
      </section>

      {/* 11. Insurance */}
      <section>
        <div className="wrap">
          <h2>Working with your insurance company</h2>
          <p>Most policies cover sudden and accidental water, such as a burst pipe or a failed water heater. Sump overflow and sewer backup normally need a separate water backup endorsement, and rising water from outside falls under a flood policy. We do not decide coverage, but we document the cause, the affected materials and the drying record in the format adjusters expect, which shortens the back-and-forth.</p>
        </div>
      </section>

      {/* 12. Where we work */}
      <section>
        <div className="wrap">
          <h2>Where we work in and around Chesterfield</h2>
          <p>The crew covers all of Chesterfield in ZIP codes 63017 and 63005, from the neighborhoods off Clarkson Road, Baxter Road, Wild Horse Creek Road and Olive Boulevard to the businesses along Chesterfield Airport Road, Long Road and Swingley Ridge Road. Being based in West County means short drive times to Central Park, Faust Park, the St. Luke's Hospital area and the Valley.</p>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="faq">
        <div className="wrap">
          <h2>Chesterfield water damage questions</h2>
          {FAQ.map((f) => (
            <div className="faq-item" key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 14. Final CTA */}
      <section className="final-cta">
        <div className="wrap">
          <h2>Need help right now?</h2>
          <p>If you need water damage restoration in Chesterfield, MO tonight, call (636) 228-0038. This is an emergency water damage service that answers day and night, and the crew is dispatched immediately. For anything from a damp wall to a flooded lower level, water damage repair in Chesterfield, MO starts with that one call.</p>
          <div className="btn-row">
            <a className="btn btn-call" href={PHONE_HREF}>{PHONE}</a>
            <a className="btn btn-help" href={PHONE_HREF}>Request Emergency Help</a>
          </div>
        </div>
      </section>
    </>
  );
}
