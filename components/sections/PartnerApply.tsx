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
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
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
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent font-display font-medium text-accent-ink"
                  aria-hidden
                >
                  PM
                </span>
              )}
              <span>
                <span className="flex items-center gap-1.5 font-display font-medium">
                  {founder.name}
                  <VerifiedCheck />
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

/** Scalloped verified badge — same mark as the partner-story quote captions. */
function VerifiedCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0 text-light-text"
      fill="currentColor"
      aria-hidden
    >
      <path d="M21.6,9.84A4.57,4.57,0,0,1,21.18,9,4,4,0,0,1,21,8.07a4.21,4.21,0,0,0-.64-2.16,4.25,4.25,0,0,0-1.87-1.28,4.77,4.77,0,0,1-.85-.43A5.11,5.11,0,0,1,17,3.54a4.2,4.2,0,0,0-1.8-1.4A4.22,4.22,0,0,0,13,2.21a4.24,4.24,0,0,1-1.94,0,4.22,4.22,0,0,0-2.24-.07A4.2,4.2,0,0,0,7,3.54a5.11,5.11,0,0,1-.66.66,4.77,4.77,0,0,1-.85.43A4.25,4.25,0,0,0,3.61,5.91,4.21,4.21,0,0,0,3,8.07,4,4,0,0,1,2.82,9a4.57,4.57,0,0,1-.42.82A4.3,4.3,0,0,0,1.63,12a4.3,4.3,0,0,0,.77,2.16,4,4,0,0,1,.42.82,4.11,4.11,0,0,1,.15.95,4.19,4.19,0,0,0,.64,2.16,4.25,4.25,0,0,0,1.87,1.28,4.77,4.77,0,0,1,.85.43,5.11,5.11,0,0,1,.66.66,4.12,4.12,0,0,0,1.8,1.4,3,3,0,0,0,.87.13A6.66,6.66,0,0,0,11,21.81a4,4,0,0,1,1.94,0,4.33,4.33,0,0,0,2.24.06,4.12,4.12,0,0,0,1.8-1.4,5.11,5.11,0,0,1,.66-.66,4.77,4.77,0,0,1,.85-.43,4.25,4.25,0,0,0,1.87-1.28A4.19,4.19,0,0,0,21,15.94a4.11,4.11,0,0,1,.15-.95,4.57,4.57,0,0,1,.42-.82A4.3,4.3,0,0,0,22.37,12,4.3,4.3,0,0,0,21.6,9.84Zm-4.89.87-5,5a1,1,0,0,1-1.42,0l-3-3a1,1,0,1,1,1.42-1.42L11,13.59l4.29-4.3a1,1,0,0,1,1.42,1.42Z" />
    </svg>
  );
}
