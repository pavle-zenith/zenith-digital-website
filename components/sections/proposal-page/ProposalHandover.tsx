import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ProposalPage } from "@/content/proposals/types";
import { NumberChip } from "./parts";

/**
 * The handover. The section that carries the most trust, so it gets the dark
 * ground and the most room: a numbered sequence, because here the order IS the
 * promise (nothing is switched off before it's backed up and replaced).
 *
 * One column on phones. From `lg`, two columns read down the first and then
 * the second, which is why the grid flows by column with half the steps per
 * column, computed rather than fixed, so a proposal with a different number of
 * steps still splits evenly.
 */
export function ProposalHandover({ handover }: { handover: ProposalPage["handover"] }) {
  const rows = Math.ceil(handover.steps.length / 2);

  return (
    <Section id="handover" tone="dark" className="doc-anchor" frameClassName="!py-16 md:!py-28">
      <SectionHeader heading={handover.heading} intro={handover.intro} tone="dark" />

      <ol
        role="list"
        style={{ "--rows": rows } as React.CSSProperties}
        className="frame-bleed-md grid gap-px border-y border-border bg-border lg:grid-flow-col lg:grid-cols-2 lg:[grid-template-rows:repeat(var(--rows),auto)]"
      >
        {handover.steps.map((step, i) => (
          // Chip and title share the first row; on phones the body then takes
          // the full width under both rather than a column beside the chip.
          // No side padding below `md`: the grid sits inside the gutter there,
          // so the text lines up with the heading above it.
          <li
            key={step.title}
            className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 bg-bg py-7 md:gap-x-5 md:px-[clamp(20px,4vw,64px)] md:py-10"
          >
            <NumberChip n={i + 1} tone="dark" />
            <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
              {step.title}
            </h3>
            <p className="col-span-2 text-body text-text-muted sm:col-span-1 sm:col-start-2">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-12 max-w-3xl font-display text-h3 font-medium leading-snug tracking-tight text-balance text-text md:mt-16">
        {handover.closing}
      </p>
    </Section>
  );
}
