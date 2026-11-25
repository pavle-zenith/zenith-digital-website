import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { CtaLink } from "@/lib/types";
import type { PartnerShowcase } from "@/content/partner-showcase";

/**
 * The close. On the English page no button and no form: the reader's next
 * step is with the person who shared the page, so the page ends by pointing
 * back to them. The Serbian page (/izrada-sajtova) is Zenith's own and ends
 * on its one action, passed as `cta`.
 */
export function ShowcaseClose({
  close,
  cta,
}: {
  close: PartnerShowcase["close"];
  cta?: CtaLink;
}) {
  return (
    <Section tone="light" frameClassName="!py-20 md:!py-32">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-h1 font-medium leading-tight tracking-tight text-balance">
          {close.heading}
        </h2>
        <p className="mt-4 text-body-lg text-light-muted">{close.paragraph}</p>
        {cta ? (
          <div className="mt-8 flex justify-center">
            <Button cta={{ ...cta, variant: "primary" }} tone="light" />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
