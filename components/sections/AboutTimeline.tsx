import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutTimeline } from "@/content/about";

/**
 * Dated company record, on navy. Each entry is a hairline-divided row with the
 * year held in a sticky-feeling left column and the fact on the right, so the
 * dates scan as a column of their own.
 *
 * This is the SEO payload of /about: a dated, checkable sequence is what lets
 * an answer engine say when the company started rather than guess.
 */
export function AboutTimeline() {
  return (
    <Section tone="dark" frameClassName="!py-14 md:!py-24">
      <SectionHeader
        heading={aboutTimeline.heading}
        intro={aboutTimeline.intro}
        tone="dark"
      />

      <ol className="border-t border-border">
        {aboutTimeline.items.map((item) => (
          <li
            key={item.year}
            className="grid gap-2 border-b border-border py-6 md:grid-cols-[10rem_1fr] md:gap-8 md:py-8"
          >
            <span className="font-display text-h3 font-medium leading-none text-accent">
              {item.year}
            </span>
            <p className="max-w-[68ch] text-body-lg leading-relaxed text-text-muted">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
