import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AboutTimelineList } from "@/components/sections/AboutTimelineList";
import { aboutTimeline } from "@/content/about";
import { SITE } from "@/lib/schema";

/**
 * The dated record, on navy. This is the spine of /about: a checkable sequence
 * is what lets an answer engine state when the company started rather than
 * guess at it, and it is the one thing on the page a competitor cannot copy
 * without lying.
 *
 * A real timeline since the owner's visual brief (25 Nov 2026): a line down
 * the left with a dot per year, the year large beside it, the dated fact, and
 * the evidence for that year as a picture on the right (AboutTimelineList).
 *
 * Kept from the previous version: the years take the section's own ink at
 * headline scale (the accent on navy is 1.04:1, so accent years vanished),
 * and a row only carries evidence that genuinely attaches to that year.
 */
export function AboutTimeline() {
  return (
    <Section tone="dark" frameClassName="!py-14 md:!py-24">
      <SectionHeader
        heading={aboutTimeline.heading}
        intro={aboutTimeline.intro}
        tone="dark"
      />
      <AboutTimelineList
        items={aboutTimeline.items}
        // The 2026 row's frame shows this site's own address.
        host={new URL(SITE).host.replace(/^www\./, "")}
      />
    </Section>
  );
}
