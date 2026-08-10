import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { pPricing } from "@/content/partnerships";

/**
 * Partner pricing — same card anatomy as the homepage tiers: a header zone
 * (icon + badge row, name, summary, price, full-width CTA) over a checklist
 * zone on white. Tier distinction lives in the header zones: navy + texture
 * for the featured retainer, white for fixed, grey surface for referral.
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

      {/* Tier cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {pPricing.tiers.map((tier, i) => {
          const featured = tier.highlighted;
          return (
            <div
              key={tier.name}
              className="flex flex-col overflow-hidden rounded-[8px] border border-light-border bg-light-bg text-light-text"
            >
              {/* Header zone — alternating solid treatments: navy + texture
                  (featured) / white / grey. */}
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
                    <span className={featured ? "text-white" : "text-light-muted"}>
                      <TierIcon name={tier.icon} />
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] uppercase track-label",
                        featured
                          ? "bg-white text-bg"
                          : "border border-light-border text-light-muted",
                      )}
                    >
                      {tier.badge}
                    </span>
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
                  What&apos;s included
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
    </Section>
  );
}

/** Per-tier line icon (Lucide via Iconify), sized for the header row. */
function TierIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-7 w-7",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "calendar") {
    // lucide:calendar-days
    return (
      <svg {...common}>
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    );
  }
  if (name === "file-check") {
    // lucide:file-check
    return (
      <svg {...common}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    );
  }
  // lucide:send
  return (
    <svg {...common}>
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
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
