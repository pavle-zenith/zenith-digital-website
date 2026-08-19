import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/migration/CtaBand";
import { post as furniture } from "@/content/blog";

/**
 * The audit capture. This stands in for a newsletter signup (owner decision):
 * a list nobody has time to write to is worth less than a lead magnet that
 * already exists and already converts.
 *
 * It LINKS to /free-website-audit rather than posting its own form. One
 * funnel, one Supabase write, one place to change the copy, and no second form
 * to keep in sync with the first.
 *
 * Rendered as the in-body CtaBand, not CtaBanner: the page still closes on a
 * full banner, and two of those in a row would read as a wall of asks.
 */
export function PostAudit() {
  const { audit } = furniture;
  return (
    <Section tone="light" frameClassName="!py-10 md:!py-14">
      <CtaBand
        heading={audit.heading}
        paragraph={audit.paragraph}
        ctas={[audit.cta]}
        tone="light"
      />
    </Section>
  );
}
