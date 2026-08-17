import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { cn } from "@/lib/utils";
import { pricing as homePricing } from "@/content/home";
import { pPricing } from "@/content/partnerships";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * Pricing — light, the PartnerPricing card anatomy: a header zone (icon +
 * badge, name, summary, price, full-width CTA) over a checklist zone, three
 * cards across. The plans are The Minimum and The Studio from the homepage
 * tiers plus the Referral track from the partnerships page, resolved by name
 * from their own content so no figure is retyped here. Referral rides along
 * so every service page also advertises the commission track.
 *
 * The header is centered: per-page heading with the `note` as its support
 * line. The optional `pullQuote` (the payback arithmetic on the design page)
 * closes the section below the plan cards, under a short accent rule. The
 * per-page price drivers are no longer rendered in this layout.
 */
export function ServicePagePricing({ data }: { data: ServicePageContent }) {
  const minimum = homePricing.tiers.find((t) => t.name === "The Minimum");
  const studio = homePricing.tiers.find((t) => t.name === "The Studio");
  const referral = pPricing.tiers.find((t) => t.name === "Referral");
  const plans = [minimum, studio, referral].filter(
    (t): t is NonNullable<typeof t> => Boolean(t),
  );

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.pricing.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-body-lg font-medium text-light-muted">
          {data.pricing.note}
        </p>
      </div>

      {/* Plan cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((tier, i) => {
          const featured = "highlighted" in tier && tier.highlighted;
          const badge = tier.badge || null;
          const timeline = "timeline" in tier ? tier.timeline : null;
          const featuresLabel =
            "featuresLabel" in tier && tier.featuresLabel
              ? tier.featuresLabel
              : "What's included";

          return (
            <div
              key={tier.name}
              className="flex flex-col overflow-hidden rounded-[8px] border border-light-border bg-light-bg text-light-text"
            >
              {/* Header zone — alternating solid treatments: navy + texture
                  (featured) / white / grey surface for referral. */}
              <div
                className={cn(
                  "relative overflow-hidden",
                  featured
                    ? "bg-bg text-white"
                    : i > 1
                      ? "bg-light-surface"
                      : "bg-light-bg",
                )}
              >
                {featured ? (
                  <Image
                    src="/textures/studio-texture.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="pointer-events-none object-cover opacity-[0.28]"
                    aria-hidden
                  />
                ) : null}

                <div className="relative p-8">
                  <div className="flex h-8 items-center justify-between">
                    <span
                      className={featured ? "text-white" : "text-light-muted"}
                    >
                      <FeatureIcon name={tier.icon} />
                    </span>
                    {badge ? (
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] uppercase track-label",
                          featured
                            ? "bg-white text-bg"
                            : "border border-light-border text-light-muted",
                        )}
                      >
                        {badge}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-6 font-display text-h3 font-medium leading-tight">
                    {tier.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 min-h-[72px] text-body leading-snug",
                      featured ? "text-white/60" : "text-light-muted",
                    )}
                  >
                    {tier.summary}
                  </p>

                  <div className="mt-6 font-display text-h2 font-medium leading-[1.05] tracking-tight">
                    {tier.price}
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-body",
                      featured ? "text-white/60" : "text-light-muted",
                    )}
                  >
                    {tier.priceNote}
                    {timeline ? ` · ${timeline}` : ""}
                  </p>
                  <Link
                    href={tier.cta.href}
                    className={cn(
                      "group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-body font-medium transition",
                      featured
                        ? "bg-white text-bg hover:bg-white/90"
                        : "btn-animated text-accent-ink",
                    )}
                  >
                    {tier.cta.label}{" "}
                    <span aria-hidden className="btn-arrow">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>

              {/* Checklist zone */}
              <div className="flex-1 border-t border-light-border px-8 py-8">
                <p className="font-mono text-label uppercase track-label text-light-muted">
                  {featuresLabel}
                </p>
                <ul className="mt-5 flex flex-col gap-3">
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
            </div>
          );
        })}
      </div>

      {/* Pull quote closing the section under the plans */}
      {data.pricing.pullQuote ? (
        <div className="mx-auto mt-12 max-w-3xl text-center md:mt-16">
          <div aria-hidden className="mx-auto w-10 border-t-2 border-accent" />
          <p className="mt-6 font-display text-h3 font-medium leading-snug tracking-tight text-balance">
            {data.pricing.pullQuote}
          </p>
        </div>
      ) : null}
    </Section>
  );
}

/** Filled accent check for the plan checklists. */
function CircleCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5.03 7.53-6 6a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l2.47 2.47 5.47-5.47a.75.75 0 1 1 1.06 1.06z" />
    </svg>
  );
}
