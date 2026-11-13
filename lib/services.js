// Chesterfield MO — service data. Summaries are VERBATIM from the homepage doc
// (Google Doc 12dYGumIIv7bzU1K3bo0w4qy7Ws9-3pZLXsONQn9FwUg). Nothing invented.
// Per-page content (H1, meta title/description, eyebrow, lede, buttons, body,
// FAQ, final CTA) lives in lib/page-content.js — full 20-tab read 2026-11-12.
// The h1 values below MIRROR the tab H1s in page-content.js; the page template
// reads H1/meta/body from page-content.js, this file keeps images + homepage-card data.
// Grouped H3s (ceiling/floor/wall, appliance/toilet/leaks, drying/commercial/claims)
// share their verbatim group line as the page intro — no invented words.
export const PHONE = '(636) 228-0038';
export const PHONE_HREF = 'tel:+16362280038';
export const SITE_NAME = 'Water Damage Restoration Chesterfield';
// Real domain — waterdamagechesterfield.us (his word 2026-11-13, live on Cloudflare).
// Canonicals, og:url, sitemap and robots all use this one constant.
export const SITE_URL = 'https://www.waterdamagechesterfield.us';

export const SERVICES = [
  { slug: 'emergency-water-extraction', name: 'Emergency Water Extraction', anchor: 'Emergency Water Extraction', h1: 'Rapid Emergency Water Extraction in Chesterfield, MO', summary: 'Standing water pumped and extracted from floors, carpet and lower levels.' },
  { slug: 'flooded-basement-cleanup', name: 'Flooded Basement Cleanup', anchor: 'Flooded Basement Cleanup', h1: 'Same-Day Flooded Basement Cleanup in Chesterfield, MO', summary: 'Finished and unfinished basements pumped out, cleaned and dried.', imageBody1: '/images/chesterfield-flooded-basement-cleanup-wet-carpet-removal.webp', altBody1: 'Empty finished basement with wall-to-wall carpet, recessed lights and a carpeted staircase' },
  { slug: 'sump-pump-failure-cleanup', name: 'Sump Pump Failure Cleanup', anchor: 'Sump Pump Failure Cleanup', h1: 'After-Hours Sump Pump Failure Cleanup in Chesterfield, MO', summary: 'Water removal and drying after a pump stops or the pit overflows.' },
  { slug: 'sewage-backup-cleanup', name: 'Sewage Backup Cleanup', anchor: 'Sewage Backup Cleanup', h1: 'Emergency Sewage Backup Cleanup in Chesterfield, MO', summary: 'Contaminated water removed, affected materials taken out and surfaces disinfected.', imageBody1: '/images/chesterfield-sewage-backup-cleanup-sewage-disinfectant-fogging.webp', altBody1: 'Worker in a protective suit fogging a room from above with a handheld wand' },
  { slug: 'burst-pipe-water-damage', name: 'Burst Pipe Water Damage', anchor: 'Burst Pipe Water Damage', h1: 'Immediate Burst Pipe Water Damage Repair in Chesterfield, MO', summary: 'Frozen and broken supply lines, soaked walls and ceilings dried and repaired.', imageHero: '/images/chesterfield-burst-pipe-water-damage-burst-pipe-cutting.webp', altHero: 'Water pouring from the open end of a broken metal pipe', imageBody1: '/images/chesterfield-burst-pipe-water-damage-frozen-pipe-thawing.webp', altBody1: 'Frozen outdoor water tap dripping in snow' },
  { slug: 'mold-remediation', name: 'Mold Remediation', anchor: 'Mold Remediation', h1: 'Professional Mold Remediation in Chesterfield, MO', summary: 'Containment, removal and air filtration where a leak has already led to mold.', imageHero: '/images/chesterfield-mold-remediation-mold-drywall-removal.webp', altHero: 'Worker in a protective suit, respirator and goggles holding a spray gun indoors', imageBody1: '/images/chesterfield-mold-remediation-mold-filtration-unit.webp', altBody1: 'Worker in a protective suit fogging a living room with a fumigation machine' },
  { slug: 'flood-damage-restoration', name: 'Flood Damage Restoration', anchor: 'Flood Damage Restoration', h1: 'Local Flood Damage Restoration in Chesterfield, MO', summary: 'Storm and creek flooding cleaned up in homes and Valley properties.', imageHero: '/images/chesterfield-flood-damage-restoration-flood-mud-cleanup.webp', altHero: 'Worker in rubber boots brushing muddy floodwater across a floor with a push broom' },
  { slug: 'ceiling-water-damage-repair', name: 'Ceiling Water Damage Repair', anchor: 'Ceiling Water Damage Repair', h1: 'Prompt Ceiling Water Damage Repair in Chesterfield, MO', summary: 'Ceiling, floor and wall repairs in Chesterfield.', imageBody1: '/images/chesterfield-ceiling-water-damage-repair-ceiling-patch-finishing.webp', altBody1: 'Man sanding a drywall ceiling with a power sander during a home renovation', imageBody2: '/images/chesterfield-ceiling-water-damage-repair-ceiling-painted-finish.webp', altBody2: 'Worker in a respirator spray-painting a new ceiling during a renovation' },
  { slug: 'hardwood-floor-water-damage', name: 'Hardwood Floor Water Damage', anchor: 'Hardwood Floor Water Damage', h1: 'Careful Hardwood Floor Water Damage Drying in Chesterfield, MO', summary: 'Ceiling, floor and wall repairs in Chesterfield.' },
  { slug: 'water-damaged-drywall-repair', name: 'Water Damaged Drywall Repair', anchor: 'Water Damaged Drywall Repair', h1: 'Complete Water Damaged Drywall Repair in Chesterfield, MO', summary: 'Ceiling, floor and wall repairs in Chesterfield.', imageHero: '/images/chesterfield-water-damaged-drywall-repair-new-panel-install.webp', altHero: 'Construction worker in a white hard hat and respirator checking a newly fitted drywall panel with a level', imageBody1: '/images/chesterfield-water-damaged-drywall-repair-taping-mudding.webp', altBody1: 'Worker in a white hard hat and respirator smoothing a wall with a wide finishing blade', imageBody2: '/images/chesterfield-water-damaged-drywall-repair-finished-painted-wall.webp', altBody2: 'Hand holding a paint roller applying white paint to a wall' },
  { slug: 'water-heater-appliance-leak-cleanup', name: 'Water Heater Leak Cleanup', anchor: 'Water Heater Leak Cleanup', h1: 'Fast Water Heater Leak Cleanup in Chesterfield, MO', summary: 'Appliance, toilet and hidden leaks in Chesterfield.', imageHero: '/images/chesterfield-water-heater-appliance-leak-cleanup-disconnecting-heater.webp', altHero: 'Home utility room with a tank water heater beside a washing machine and sink' },
  { slug: 'toilet-overflow-cleanup', name: 'Toilet Overflow Cleanup', anchor: 'Toilet Overflow Cleanup', h1: 'Sanitary Toilet Overflow Cleanup in Chesterfield, MO', summary: 'Appliance, toilet and hidden leaks in Chesterfield.', imageHero: '/images/chesterfield-toilet-overflow-cleanup-disinfecting-bathroom.webp', altHero: 'Worker in a protective suit and blue gloves disinfecting a bathroom faucet with a spray bottle and cloth' },
  { slug: 'water-leak-detection', name: 'Water Leak Detection', anchor: 'Water Leak Detection', h1: 'Precise Water Leak Detection in Chesterfield, MO', summary: 'Appliance, toilet and hidden leaks in Chesterfield.', imageBody1: '/images/chesterfield-water-leak-detection-ceiling-stain-tracing.webp', altBody1: 'Ceiling with brown water stains and peeling paint', imageBody2: '/images/chesterfield-water-leak-detection-thermal-camera-closeup.webp', altBody2: 'Tablet screen showing a thermal image in yellow and blue' },
  { slug: 'structural-drying', name: 'Structural Drying', anchor: 'Structural Drying', h1: 'Thorough Structural Drying in Chesterfield, MO', summary: 'Drying, commercial work and claims in Chesterfield.', imageBody1: '/images/chesterfield-structural-drying-containment-negative-air.webp', altBody1: 'Dehumidifier and air mover drying a room with an opened wall' },
  { slug: 'commercial-water-damage-restoration', name: 'Commercial Water Damage Restoration', anchor: 'Commercial Water Damage Restoration', h1: 'On-Site Commercial Water Damage Restoration in Chesterfield, MO', summary: 'Drying, commercial work and claims in Chesterfield.', imageBody1: '/images/chesterfield-commercial-water-damage-restoration-warehouse-drying.webp', altBody1: 'Worker in a mask and gloves mopping a warehouse floor beside a yellow mop bucket' },
  { slug: 'water-damage-insurance-claims', name: 'Water Damage Insurance Claims', anchor: 'Water Damage Insurance Claim help', h1: 'Documented Water Damage Insurance Claim Help in Chesterfield, MO', summary: 'Drying, commercial work and claims in Chesterfield.', imageHero: '/images/chesterfield-water-damage-insurance-claims-ceiling-photo-documentation.webp', altHero: 'Hands holding a camera photographing a bright room interior', imageBody2: '/images/chesterfield-water-damage-insurance-claims-reviewing-photos-homeowner.webp', altBody2: 'Two people reviewing restoration paperwork together inside a home under renovation' },
];

// Homepage service groups — H3 headings verbatim from the doc.
export const SERVICE_GROUPS = [
  { h3: 'Emergency water extraction in Chesterfield', slugs: ['emergency-water-extraction'] },
  { h3: 'Flooded basement cleanup in Chesterfield', slugs: ['flooded-basement-cleanup'] },
  { h3: 'Sump pump failure cleanup in Chesterfield', slugs: ['sump-pump-failure-cleanup'] },
  { h3: 'Sewage backup cleanup in Chesterfield', slugs: ['sewage-backup-cleanup'] },
  { h3: 'Burst pipe water damage in Chesterfield', slugs: ['burst-pipe-water-damage'] },
  { h3: 'Mold remediation in Chesterfield', slugs: ['mold-remediation'] },
  { h3: 'Flood damage restoration in Chesterfield', slugs: ['flood-damage-restoration'] },
  { h3: 'Ceiling, floor and wall repairs in Chesterfield', slugs: ['ceiling-water-damage-repair', 'hardwood-floor-water-damage', 'water-damaged-drywall-repair'] },
  { h3: 'Appliance, toilet and hidden leaks in Chesterfield', slugs: ['water-heater-appliance-leak-cleanup', 'toilet-overflow-cleanup', 'water-leak-detection'] },
  { h3: 'Drying, commercial work and claims in Chesterfield', slugs: ['structural-drying', 'commercial-water-damage-restoration', 'water-damage-insurance-claims'] },
];

export function serviceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug);
}
// Card / og-image fallback for hero-less services (fix round 2026-11-13):
// 11 slots went EMPTY — no honest photo exists anywhere on Pexels — so a
// service with no hero still shows its remaining clean body image on the
// homepage card (and as og:image). A service with no image at all renders
// a text-only card. Never force a wrong photo into an empty slot; these
// await real job photos.
export function serviceCardImage(s) {
  if (!s) return null;
  if (s.imageHero) return { src: s.imageHero, alt: s.altHero };
  if (s.imageBody1) return { src: s.imageBody1, alt: s.altBody1 };
  if (s.imageBody2) return { src: s.imageBody2, alt: s.altBody2 };
  return null;
}

