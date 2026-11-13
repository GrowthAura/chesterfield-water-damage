// Per-page figure-slot overrides (Chain 1 UI/UX A-to-Z, audit B §4).
// Body figures default to the 3rd H2 group (body1) and the 6th H2 group
// (body2) — see app/DocPage.jsx BodyBlocks. An entry below moves a figure
// ONLY where the default pairing is clearly wrong AND the correct H2 group
// is unambiguous by section topic. Keys are service slugs; values are the
// 1-based H2-group index each figure sits with. The map is keyed by SLOT
// (body1/body2), not by filename, so it survives an image swap in that
// slot; every target below also fits any plausible replacement photo for
// its slot (a detection photo still belongs with "How we locate it", an
// adjuster photo still belongs with "Working with the adjuster", a
// remediation-equipment/fogging photo still belongs with "How remediation
// works"). Slots the image round may empty or whose replacement subject is
// unknown (sump, flooded, hardwood, toilet, water-heater,
// insurance body1) are deliberately NOT re-slotted.
//
// - ceiling body1 (man sanding a patched ceiling): "Sources we trace" (3)
//   -> "Repair steps" (5). Sanding/finishing IS a repair step.
// - drywall body1 (taping/mudding a wall): "Behind the wall" (3) ->
//   "The rebuild" (4). Taping is rebuild finishing, not behind-the-wall.
// - drywall body2 (paint roller on a finished wall): "Drying comes first"
//   (6) -> "Matching the existing finish" (8). Painting is the last step.
// - emergency body1 (PPE worker with extraction wand on carpet):
//   "Where the water usually comes from here" (3) -> "What the first
//   hour looks like" (2). Extraction work IS a first-hour activity.
// - sewage body1 (disinfectant fogging): "What makes this different" (3)
//   -> "How we clean it up" (4). Fogging is a cleanup step.
// - mold body1 (fogging / air treatment): "Signs you probably have mold"
//   (3) -> "How remediation works" (4). Treatment belongs with the process.
// - leak body2 (thermal camera): "What we do and what a plumber does" (6)
//   -> "How we locate it" (4). The camera is a locating tool.
// - insurance body2 (inspector with clipboard at a door): "Deductibles and
//   limits" (6) -> "Working with the adjuster" (5). An adjuster-arrival
//   photo belongs with the adjuster section.
export const FIGURE_SLOTS = {
  'ceiling-water-damage-repair': { body1: 5 },
  'water-damaged-drywall-repair': { body1: 4, body2: 8 },
  'emergency-water-extraction': { body1: 2 },
  'sewage-backup-cleanup': { body1: 4 },
  'mold-remediation': { body1: 4 },
  'water-leak-detection': { body2: 4 },
  'water-damage-insurance-claims': { body2: 5 },
};
