import { Section } from "@/components/ui/Section";
import { AuditPanel } from "@/components/sections/blog/AuditPanel";
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
 * Rendered as the light AuditPanel, so the one ask that gives something away
 * looks like an offer rather than another closing banner.
 *
 * NOTE: a post whose body already carries an audit `calloutCta` now shows this
 * panel twice, since those render the same component. If that is one too many,
 * this section is the one to drop: the in-body ask is placed at a friction
 * point the reader has just felt, and this one is on a fixed rhythm.
 */
export function PostAudit() {
  const { audit } = furniture;
  return (
    <Section tone="light" frameClassName="!py-10 md:!py-14">
      <AuditPanel
        heading={audit.heading}
        paragraph={audit.paragraph}
        ctaLabel={audit.cta.label}
        ctaHref={audit.cta.href}
      />
    </Section>
  );
}
