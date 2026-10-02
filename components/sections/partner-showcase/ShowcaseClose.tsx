import { Section } from "@/components/ui/Section";
import type { PartnerShowcase } from "@/content/partner-showcase";

/**
 * The close. No button and no form: the reader's next step is with the person
 * who shared the page, so the page ends by pointing back to them.
 */
export function ShowcaseClose({ close }: { close: PartnerShowcase["close"] }) {
  return (
    <Section tone="light" frameClassName="!py-20 md:!py-32">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-h1 font-medium leading-tight tracking-tight text-balance">
          {close.heading}
        </h2>
        <p className="mt-4 text-body-lg text-light-muted">{close.paragraph}</p>
      </div>
    </Section>
  );
}
