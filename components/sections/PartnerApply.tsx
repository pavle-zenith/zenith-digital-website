import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
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

          {/* Founder-fronted close — standout white card, accent hairline */}
          <div className="mt-8 max-w-md rounded-[8px] border border-accent-line bg-light-bg p-6">
            <p className="font-display text-body-lg font-medium leading-snug">
              {founder.headline}
            </p>
            <p className="mt-3 text-body leading-relaxed text-light-muted">
              {founder.note}
            </p>
            <div className="mt-5 flex items-center gap-3 border-t border-light-border pt-5">
              {founder.photo ? (
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[6px]">
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
              ) : (
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] bg-accent font-display font-medium text-accent-ink"
                  aria-hidden
                >
                  PM
                </span>
              )}
              <span>
                <span className="flex items-center gap-1.5 font-display font-medium">
                  {founder.name}
                  <VerifiedCheck className="text-light-text" />
                </span>
                <span className="block text-body text-light-muted">
                  {founder.role}
                </span>
              </span>
            </div>
          </div>
        </div>

        <PartnerForm />
      </div>
    </Section>
  );
}

