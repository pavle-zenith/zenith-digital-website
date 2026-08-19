import { wixClassic } from "./wix-classic";
import { squarespace } from "./squarespace";
import { wixHarmony } from "./wix-harmony";
import type { MigrationGuideContent } from "./types";

export type * from "./types";

/**
 * The migration guide spokes hanging off /services/website-migration.
 *
 * Ordered by proof: the platforms we have real client evidence for lead, and
 * the hub's platform cards follow the same order. `publish: false` guides stay
 * authored and reviewable in the repo but are excluded from routing, the hub
 * links, and the sitemap, so an unverified transfers table can't be indexed.
 *
 * WordPress and Webflow spokes are deliberately absent rather than stubbed.
 * Four strong pages beat nine thin ones (handoff §7), and a guide that can't be
 * filled with real platform-specific technical detail is a doorway page.
 */
export const allMigrationGuides: MigrationGuideContent[] = [
  wixClassic,
  squarespace,
  wixHarmony,
];

export const migrationGuides = allMigrationGuides.filter((g) => g.publish);

/** Live slugs, for routing and the sitemap. */
export const migrationGuideSlugs = new Set(migrationGuides.map((g) => g.slug));

export function getMigrationGuide(
  slug: string,
): MigrationGuideContent | undefined {
  return migrationGuides.find((g) => g.slug === slug);
}

/**
 * The transfers-table vocabulary, shared by every guide so the four states
 * mean the same thing on all of them. Lives in content rather than in the
 * component because it's reader-facing copy (CLAUDE.md §15), and lives here
 * rather than in a single guide because changing a label has to change it
 * everywhere at once.
 */
export const transferStatusLabels: Record<
  MigrationGuideContent["transfers"]["rows"][number]["status"],
  { label: string; legend: string }
> = {
  carries: {
    label: "Carries over",
    legend: "Arrives intact. No rebuild, no re-typing.",
  },
  rebuilt: {
    label: "Rebuilt",
    legend: "The content survives. What holds it gets built new.",
  },
  replaced: {
    label: "Replaced",
    legend: "No direct equivalent, but Wix Studio does the job another way.",
  },
  lost: {
    label: "Doesn't move",
    legend: "Nothing carries. Plan for what you do instead.",
  },
};
