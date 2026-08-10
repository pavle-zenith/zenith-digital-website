import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { pPricing } from "@/content/partnerships";

/**
 * Partner pricing — three light cards (monthly retainer, fixed per-project,
 * referral) in one hairline-bounded grid, same anatomy as the homepage tiers:
 * name + badge pill, price, summary, checklist, CTA band pinned to the
 * bottom. The recommended tier sits on the light surface.
 */
export function PartnerPricing() {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="mb-8 grid md:mb-12 gap-8 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {pPricing.heading}
        </h2>
        <p className="max-w-md text-body-lg font-medium text-light-muted md:justify-self-end md:text-right">
          {pPricing.intro}
        </p>
      </div>

      {/* One grid, 1px gaps over a rule-colored bg render as shared hairlines. */}
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-light-border bg-light-border lg:grid-cols-3">
        {pPricing.tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "flex flex-col",
              tier.highlighted ? "bg-light-surface" : "bg-light-bg",
            )}
          >
            <div className="flex flex-1 flex-col p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-body-lg font-medium">
                  {tier.name}
                </h3>
                <span className="rounded-full border border-light-border px-2.5 py-0.5 font-mono text-[10px] uppercase track-label text-light-muted">
                  {tier.badge}
                </span>
              </div>

              <div className="mt-4 font-display text-h2 font-medium leading-none tracking-tight">
                {tier.price}
              </div>
              <p className="mt-2 text-body text-light-muted">
                {tier.priceNote}
              </p>

              <p className="mt-6 min-h-[72px] text-body leading-snug text-light-muted">
                {tier.summary}
              </p>

              <p className="mb-4 mt-8 font-mono text-label uppercase track-label text-light-muted">
                What&apos;s included
              </p>
              <ul className="flex flex-col gap-3">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-body text-light-text"
                  >
                    <CircleCheck />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA band */}
            <div className="border-t border-light-border p-6">
              <Button
                cta={{
                  ...tier.cta,
                  variant: tier.highlighted ? "primary" : "secondary",
                }}
                tone="light"
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function CircleCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-[18px] w-[18px] shrink-0 text-light-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12l2.5 2.5 4.5-4.5" />
    </svg>
  );
}
