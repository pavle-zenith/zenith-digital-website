import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NumberChip } from "@/components/sections/private-doc/parts";
import type { PartnerShowcase } from "@/content/partner-showcase";

/**
 * How Zenith and the ads partner split the work. Numbered because the steps
 * run in order (campaigns, then pages, then the loop between them). A hairline
 * grid on the surface tint, three across from `lg`.
 */
export function ShowcaseTogether({ together }: { together: PartnerShowcase["together"] }) {
  return (
    <Section tone="light" className="bg-light-surface" frameClassName="!py-14 md:!py-24">
      <SectionHeader heading={together.heading} tone="light" />
      <ol
        role="list"
        className="frame-bleed-md grid gap-px border-y border-light-border bg-light-border lg:grid-cols-3"
      >
        {together.steps.map((step, i) => (
          <li key={step.title} className="flex flex-col bg-light-bg px-6 py-8 md:px-8 md:py-10">
            <NumberChip n={i + 1} tone="light" />
            <h3 className="mt-6 font-display text-h3 font-medium leading-tight tracking-tight text-balance">
              {step.title}
            </h3>
            <p className="mt-3 text-body-lg text-light-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
