import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DividedList, DividedRow } from "@/components/ui/DividedList";
import { aboutHow } from "@/content/about";

/**
 * What working with us actually means. Divided rows rather than a card grid:
 * each item is a claim and its consequence, which is list-shaped, and the
 * system prefers the ruled-row pattern for exactly that (DESIGN.md, Shapes).
 *
 * The claim sits in the left column at a fixed width so the four of them stack
 * into a readable column of statements, and the elaboration runs beside it.
 * Read down the left edge alone and you still get the whole argument.
 */
export function AboutHow() {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <SectionHeader heading={aboutHow.heading} tone="light" />
      <DividedList tone="light" className="border-b border-light-border">
        {aboutHow.items.map((item) => (
          <DividedRow
            key={item.title}
            className="grid gap-2 py-6 md:grid-cols-[22rem_1fr] md:gap-8"
          >
            <h3 className="font-display text-body-lg font-medium">
              {item.title}
            </h3>
            <p className="max-w-[68ch] text-body-lg leading-relaxed text-light-muted">
              {item.body}
            </p>
          </DividedRow>
        ))}
      </DividedList>
    </Section>
  );
}
