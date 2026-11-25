import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  TransformationTabs,
  type TransformationView,
} from "@/components/sections/TransformationTabs";
import {
  caseStudyCards,
  detailSlugs,
  getCaseStudyDetail,
} from "@/content/case-studies";
import { getTransformation } from "@/content/transformations";

/**
 * The featured before/after (transformations brief, 25 Nov 2026): one of our
 * best before/afters told as a story rather than shown as a bare widget. A
 * browser window drawn in code holds the drag-to-compare slider; the cell
 * beside it says who it was for and what changed, and links to the case
 * study when there is one. Two or more entries get a row of tabs above, one
 * per client. Used once per page at most, in a few deliberate places.
 *
 * Copy lives in content/transformations.ts (what changed, per project) and in
 * each host's own content file (the section heading). Client name, logo and
 * the detail link are read from the case studies, so nothing is repeated.
 *
 * `Transformation` is the whole section; `TransformationShowcase` is the
 * block alone, for a host that already owns its section and heading (the
 * audit page sets it beside the sample report).
 */
export function Transformation({
  slugs,
  heading,
  support,
  link = true,
}: {
  slugs: readonly string[];
  heading?: string;
  support?: string;
  /** Off on a case study's own page, where the link would point at itself. */
  link?: boolean;
}) {
  // Without a heading (a case study's own page) the band starts at the
  // section's edge, and the section's top rule is the band's.
  const headed = Boolean(heading || support);
  return (
    // No bottom padding: the band runs to the section's edge, where the next
    // section's divide closes it (the testimonials band does the same).
    <Section tone="light" frameClassName={headed ? "!pt-14 md:!pt-24 !pb-0" : "!py-0"}>
      <SectionHeader
        heading={heading}
        intro={support}
        tone="light"
        align="center"
        className="mb-10 md:mb-14"
      />
      <TransformationShowcase slugs={slugs} link={link} ruled={headed} />
    </Section>
  );
}

export function TransformationShowcase({
  slugs,
  link = true,
  compact = false,
  ruled = true,
}: {
  slugs: readonly string[];
  link?: boolean;
  /** The band's own top rule; off when the section's divide sits on it. */
  ruled?: boolean;
  /**
   * For a host column narrower than the page (about half of it): the band
   * closes into a bordered card, the project sits under the window instead
   * of beside it, and the images are requested at that width.
   */
  compact?: boolean;
}) {
  return (
    <TransformationTabs
      views={slugs.map((slug) => view(slug, link))}
      compact={compact}
      ruled={ruled}
    />
  );
}

/**
 * Everything one tab needs, resolved on the server. An unknown slug throws,
 * so a renamed study fails the build instead of quietly emptying a section.
 */
function view(slug: string, link: boolean): TransformationView {
  const t = getTransformation(slug);
  const card = caseStudyCards.find((c) => c.slug === slug);
  if (!t || !card) {
    throw new Error(`Transformation: no ${!t ? "transformation" : "case-study card"} for "${slug}"`);
  }
  return {
    slug,
    client: card.client,
    // Light panel: only a dark-ink wordmark reads on it. Without one the
    // client's name is set in the display face instead.
    logo: getCaseStudyDetail(slug)?.logoDark,
    domain: t.domain,
    labels:
      t.mode === "wireframe-final"
        ? { before: "Wireframe", after: "Final design" }
        : { before: "Before", after: "After" },
    before: t.before,
    after: t.after,
    summary: t.summary,
    points: t.points,
    href: link && detailSlugs.has(slug) ? `/case-studies/${slug}` : undefined,
  };
}
