import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { pApply } from "@/content/partnerships";

/**
 * Application form section (#apply anchor target) — the page's close, no CTA
 * band after it. Left: heading + the founder-fronted note (Pavle's photo when
 * set in content, a monogram tile until then). Right: the form card.
 */
export function PartnerApply() {
  const { founder } = pApply;

  return (
    <Section
      tone="light"
      id="apply"
      className="scroll-mt-24"
      frameClassName="!py-14 md:!py-24"
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight">
            {pApply.heading}
          </h2>

          {/* Founder-fronted close */}
          <div className="mt-8 flex max-w-md items-start gap-4">
            {founder.photo ? (
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[8px] border border-light-border">
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
            ) : (
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[8px] bg-accent font-display text-body-lg font-medium text-accent-ink"
                aria-hidden
              >
                PM
              </span>
            )}
            <div>
              <p className="text-body-lg font-medium leading-relaxed text-light-muted">
                {founder.note}
              </p>
              <p className="mt-3 font-display font-medium">
                {founder.name}
                <span className="block text-body font-normal text-light-muted">
                  {founder.role}
                </span>
              </p>
            </div>
          </div>
        </div>

        <PartnerForm />
      </div>
    </Section>
  );
}
