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
            <p className="mt-4 text-body-lg text-text-muted">{pricing.intro}</p>
          </div>
          <Link
            href={pricing.cta.href}
            className="inline-flex shrink-0 items-center gap-2 rounded-[6px] bg-white px-6 py-3 text-body font-medium text-bg transition hover:bg-white/90"
          >
            {pricing.cta.label} <span aria-hidden>&rarr;</span>
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
                        "inline-flex w-full items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-body font-medium transition",
                        featured
                          ? "bg-white text-bg hover:bg-white/90"
                          : "border border-border text-text hover:bg-surface-2",
                      )}
                    >
                      {tier.cta.label} <span aria-hidden>&rarr;</span>
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
                <p className="mt-4 max-w-2xl text-body-lg text-text-muted">
                  {pricing.whiteLabel.paragraph}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={pricing.whiteLabel.ctas[0].href}
                  className="inline-flex items-center gap-2 rounded-[6px] bg-white px-6 py-3 text-body font-medium text-bg transition hover:bg-white/90"
                >
                  {pricing.whiteLabel.ctas[0].label} <span aria-hidden>&rarr;</span>
                </Link>
                <Link
                  href={pricing.whiteLabel.ctas[1].href}
                  className="inline-flex items-center gap-2 rounded-[6px] border border-border px-6 py-3 text-body font-medium text-text transition hover:bg-surface-2"
                >
                  {pricing.whiteLabel.ctas[1].label} <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

/** Per-tier line icon (pen / layers / spark), sized for the glyph cell. */
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
    return (
      <svg {...common}>
        <path d="M12 2l9 5-9 5-9-5 9-5z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 17l9 5 9-5" />
      </svg>
    );
  }
  if (name === "spark") {
    return (
      <svg {...common}>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
      </svg>
    );
  }
  // pen
  return (
    <svg {...common}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
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
