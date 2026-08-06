import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { pricing } from "@/content/home";

/**
 * Pricing (dark, textured, blocky in-line — Steel.dev register). Header band:
 * heading + intro left, CTA right. Below, one hairline-bounded grid that bleeds
 * to the frame rails, three columns divided by 1px rules. Each column stacks:
 * a tall glyph cell, the tier block (name + pill, price, summary, checklist),
 * and a full-width CTA band. The recommended tier sits on a lighter surface
 * with a filled white CTA. Squared cells, no card floating — the grid is the
 * design.
 */
export function Pricing() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Faint texture background */}
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/bg-texture.png"
          alt=""
          fill
          className="object-cover opacity-[0.14]"
          aria-hidden
        />
      </div>

      <Section tone="dark" className="bg-transparent" frameClassName="!pt-0 !pb-24" id="pricing">
        {/* Header band: heading + intro left, CTA right */}
        <div className="flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-h2 font-medium leading-tight tracking-tight">
              {pricing.heading}
            </h2>
            <p className="mt-4 text-body-lg font-medium text-text-muted">{pricing.intro}</p>
          </div>
          <Link
            href={pricing.cta.href}
            className="group inline-flex shrink-0 items-center gap-2 rounded-[6px] bg-white px-6 py-3 text-body font-medium text-bg transition hover:bg-white/90"
          >
            {pricing.cta.label} <span aria-hidden className="btn-arrow">&rarr;</span>
          </Link>
        </div>

        {/* Blocky tier grid — bleeds to the side rails, hairline-bounded */}
        <div className="frame-bleed border-t border-border">
          <div className="grid border-border max-md:divide-y md:grid-cols-3 md:divide-x divide-border">
            {pricing.tiers.map((tier) => {
              const featured = tier.highlighted;
              return (
                <div key={tier.name} className={cn("flex flex-col", featured && "bg-surface")}>
                  {/* Tall glyph cell */}
                  <div className="flex h-36 items-end border-b border-border px-8 pb-6">
                    <span className={featured ? "text-text" : "text-text-muted"}>
                      <TierIcon name={tier.icon} />
                    </span>
                  </div>

                  {/* Tier block */}
                  <div className="flex-1 px-8 py-8">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-body-lg font-medium">{tier.name}</h3>
                      {tier.badge ? (
                        <span className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 font-mono text-[10px] uppercase track-label text-bg">
                          {tier.badge}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-3 font-display text-h1 font-medium leading-none">
                      {tier.price}
                    </div>
                    <p className="mt-2 text-body text-text-muted">
                      {tier.priceNote} · {tier.timeline}
                    </p>

                    <p className="mt-6 min-h-[48px] text-body text-text-muted">{tier.summary}</p>

                    <p className="mt-8 mb-4 font-mono text-label uppercase track-label text-text-muted">
                      What&apos;s included
                    </p>
                    <ul className="flex flex-col gap-3">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-body text-text">
                          <CircleCheck featured={featured} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA band */}
                  <div className="border-t border-border p-6">
                    <Link
                      href={tier.cta.href}
                      className={cn(
                        "group inline-flex w-full items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-body font-medium transition",
                        featured
                          ? "bg-white text-bg hover:bg-white/90"
                          : "border border-border text-text hover:bg-surface-2",
                      )}
                    >
                      {tier.cta.label} <span aria-hidden className="btn-arrow">&rarr;</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* White-label band — another row of the grid, edge-to-edge */}
          <div className="border-y border-border">
            <div className="flex flex-col gap-10 px-8 py-16 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <h3 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
                  {pricing.whiteLabel.heading}
                </h3>
                <p className="mt-4 max-w-2xl text-body-lg font-medium text-text-muted">
                  {pricing.whiteLabel.paragraph}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={pricing.whiteLabel.ctas[0].href}
                  className="group inline-flex items-center gap-2 rounded-[6px] bg-white px-6 py-3 text-body font-medium text-bg transition hover:bg-white/90"
                >
                  {pricing.whiteLabel.ctas[0].label} <span aria-hidden className="btn-arrow">&rarr;</span>
                </Link>
                <Link
                  href={pricing.whiteLabel.ctas[1].href}
                  className="group inline-flex items-center gap-2 rounded-[6px] border border-border px-6 py-3 text-body font-medium text-text transition hover:bg-surface-2"
                >
                  {pricing.whiteLabel.ctas[1].label} <span aria-hidden className="btn-arrow">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

/** Per-tier line icon (Lucide via Iconify), sized for the glyph cell. */
function TierIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-8 w-8",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "layers") {
    // lucide:layers
    return (
      <svg {...common}>
        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
        <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
        <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
      </svg>
    );
  }
  if (name === "spark") {
    // lucide:sparkles
    return (
      <svg {...common}>
        <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594zM20 2v4m2-2h-4" />
        <circle cx="4" cy="20" r="2" />
      </svg>
    );
  }
  // lucide:pen-line
  return (
    <svg {...common}>
      <path d="M13 21h8m.174-14.188a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    </svg>
  );
}

/** Circled check for feature rows. */
function CircleCheck({ featured }: { featured?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("mt-0.5 h-[18px] w-[18px] shrink-0", featured ? "text-text" : "text-text-muted")}
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
