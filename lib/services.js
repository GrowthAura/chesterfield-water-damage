// Chesterfield MO — site constants + service data.
// Phone, domain, ZIPs and summaries are VERBATIM from the doc
// (Google Doc 12dYGumIIv7bzU1K3bo0w4qy7Ws9-3pZLXsONQn9FwUg, 20 tabs).
// Per-page content (H1, meta title/description, eyebrow, lede, buttons, body,
// FAQ, final CTA) lives in lib/page-content.js — the verified 20-tab extraction.
// H1 values below MIRROR the tab H1s in page-content.js; the page template
// reads H1/meta/body from page-content.js, this file keeps site constants +
// homepage-card / nav / footer data.
// NO image fields here: every image slot is honestly EMPTY until the image
// phase installs real photos (see qa/IMAGE-SLOTS.md). No <img> tag is
// rendered anywhere in this build.
export const PHONE = '(636) 228-0038';
export const PHONE_HREF = 'tel:+16362280038';
export const SITE_NAME = 'Water Damage Restoration Chesterfield';
export const SITE_URL = 'https://www.waterdamagechesterfield.us';

export const SERVICES = [
  { slug: 'emergency-water-extraction', name: 'Emergency Water Extraction', anchor: 'Emergency Water Extraction', h1: 'Rapid Emergency Water Extraction in Chesterfield, MO', summary: 'Standing water pumped and extracted from floors, carpet and lower levels.' },
  { slug: 'flooded-basement-cleanup', name: 'Flooded Basement Cleanup', anchor: 'Flooded Basement Cleanup', h1: 'Same-Day Flooded Basement Cleanup in Chesterfield, MO', summary: 'Finished and unfinished basements pumped out, cleaned and dried.' },
  { slug: 'sump-pump-failure-cleanup', name: 'Sump Pump Failure Cleanup', anchor: 'Sump Pump Failure Cleanup', h1: 'After-Hours Sump Pump Failure Cleanup in Chesterfield, MO', summary: 'Water removal and drying after a pump stops or the pit overflows.' },
  { slug: 'sewage-backup-cleanup', name: 'Sewage Backup Cleanup', anchor: 'Sewage Backup Cleanup', h1: 'Emergency Sewage Backup Cleanup in Chesterfield, MO', summary: 'Contaminated water removed, affected materials taken out and surfaces disinfected.' },
  { slug: 'burst-pipe-water-damage', name: 'Burst Pipe Water Damage', anchor: 'Burst Pipe Water Damage', h1: 'Immediate Burst Pipe Water Damage Repair in Chesterfield, MO', summary: 'Frozen and broken supply lines, soaked walls and ceilings dried and repaired.' },
  { slug: 'mold-remediation', name: 'Mold Remediation', anchor: 'Mold Remediation', h1: 'Professional Mold Remediation in Chesterfield, MO', summary: 'Containment, removal and air filtration where a leak has already led to mold.' },
  { slug: 'flood-damage-restoration', name: 'Flood Damage Restoration', anchor: 'Flood Damage Restoration', h1: 'Local Flood Damage Restoration in Chesterfield, MO', summary: 'Storm and creek flooding cleaned up in homes and Valley properties.' },
  { slug: 'ceiling-water-damage-repair', name: 'Ceiling Water Damage Repair', anchor: 'Ceiling Water Damage Repair', h1: 'Prompt Ceiling Water Damage Repair in Chesterfield, MO', summary: 'Ceiling, floor and wall repairs in Chesterfield.' },
  { slug: 'hardwood-floor-water-damage', name: 'Hardwood Floor Water Damage', anchor: 'Hardwood Floor Water Damage', h1: 'Careful Hardwood Floor Water Damage Drying in Chesterfield, MO', summary: 'Ceiling, floor and wall repairs in Chesterfield.' },
  { slug: 'water-damaged-drywall-repair', name: 'Water Damaged Drywall Repair', anchor: 'Water Damaged Drywall Repair', h1: 'Complete Water Damaged Drywall Repair in Chesterfield, MO', summary: 'Ceiling, floor and wall repairs in Chesterfield.' },
  { slug: 'water-heater-appliance-leak-cleanup', name: 'Water Heater Leak Cleanup', anchor: 'Water Heater Leak Cleanup', h1: 'Fast Water Heater Leak Cleanup in Chesterfield, MO', summary: 'Appliance, toilet and hidden leaks in Chesterfield.' },
  { slug: 'toilet-overflow-cleanup', name: 'Toilet Overflow Cleanup', anchor: 'Toilet Overflow Cleanup', h1: 'Sanitary Toilet Overflow Cleanup in Chesterfield, MO', summary: 'Appliance, toilet and hidden leaks in Chesterfield.' },
  { slug: 'water-leak-detection', name: 'Water Leak Detection', anchor: 'Water Leak Detection', h1: 'Precise Water Leak Detection in Chesterfield, MO', summary: 'Appliance, toilet and hidden leaks in Chesterfield.' },
  { slug: 'structural-drying', name: 'Structural Drying', anchor: 'Structural Drying', h1: 'Thorough Structural Drying in Chesterfield, MO', summary: 'Drying, commercial work and claims in Chesterfield.' },
  { slug: 'commercial-water-damage-restoration', name: 'Commercial Water Damage Restoration', anchor: 'Commercial Water Damage Restoration', h1: 'On-Site Commercial Water Damage Restoration in Chesterfield, MO', summary: 'Drying, commercial work and claims in Chesterfield.' },
  { slug: 'water-damage-insurance-claims', name: 'Water Damage Insurance Claims', anchor: 'Water Damage Insurance Claim help', h1: 'Documented Water Damage Insurance Claim Help in Chesterfield, MO', summary: 'Drying, commercial work and claims in Chesterfield.' },
];

export function serviceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug);
}

// Homepage service groups — H3 headings + group membership are verbatim
// from Tab 1 (homepage). Each group heading is an H3 on the homepage.
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

// Footer services column — the OLD build's footer list, read from its
// app/layout.jsx NAV_LINKS (5 entries). Not extended, not re-invented.
export const FOOTER_SERVICES = [
  { href: '/emergency-water-extraction', label: 'Emergency' },
  { href: '/flooded-basement-cleanup', label: 'Basement Cleanup' },
  { href: '/sump-pump-failure-cleanup', label: 'Sump Pump' },
  { href: '/sewage-backup-cleanup', label: 'Sewage Backup' },
  { href: '/burst-pipe-water-damage', label: 'Burst Pipe' },
];
