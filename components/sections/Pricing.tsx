import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { pricing } from "@/content/home";

/**
 * Pricing (dark, textured section — Reducto-style tier cards). Header band:
 * heading + intro left, CTA right. Below, three solid cards over the texture,
 * each split into a header zone (icon, name, summary, price, full-width CTA)
 * and a checklist zone on white. Tier distinction lives in the header zones:
 * white for the entry tier, navy + texture for the featured tier, grey surface
 * for the retainer tier. Nothing is transparent over the section texture.
 */
export function Pricing({
  showWhiteLabel = true,
}: {
  /**
   * The agency white-label band. On by default (homepage, /services); the
   * migration guides switch it off, because a reader part-way through choosing
   * a platform move is not the audience for a reseller pitch.
   */
  showWhiteLabel?: boolean;
} = {}) {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Faint texture background */}
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.16]"
          aria-hidden
        />
      </div>

      <Section
        tone="dark"
        className="bg-transparent"
        frameClassName="!pt-0 !pb-14 md:!pb-24"
        id="pricing"
      >
        {/* Header band: heading + intro left, CTA right */}
        <div className="flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-h2 font-medium leading-tight tracking-tight">
              {pricing.heading}
            </h2>
            <p className="mt-4 text-body-lg font-medium text-text-muted">
              {pricing.intro}
            </p>
          </div>
          <Link
            href={pricing.cta.href}
            className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-[6px] bg-white px-6 py-3 sm:w-auto text-body font-medium text-bg transition hover:bg-white/90"
          >
            {pricing.cta.label}{" "}
            <span aria-hidden className="btn-arrow">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Tier cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {pricing.tiers.map((tier, i) => {
            const featured = tier.highlighted;
            return (
              <div
                key={tier.name}
                className={cn(
                  "flex flex-col overflow-hidden rounded-[8px] bg-light-bg text-light-text",
                  // White outline so the featured card's dark header keeps a
                  // defined edge against the dark section behind it.
                  featured && "ring-1 ring-white/60",
                )}
              >
                {/* Header zone — the tier's identity block. Alternating solid
                    treatments: white / navy + texture (featured) / grey. */}
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
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="pointer-events-none object-cover opacity-[0.28]"
                      aria-hidden
                    />
                  ) : i > 1 ? (
                    <Image
                      src="/textures/zenith-texture.jpg"
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="pointer-events-none object-cover opacity-[0.3]"
                      aria-hidden
                    />
                  ) : null}

                  <div className="relative p-8">
                    <div className="flex h-8 items-center justify-between">
                      <span
                        className={featured ? "text-white" : "text-light-muted"}
                      >
                        <TierIcon name={tier.icon} />
                      </span>
                      {tier.badge ? (
                        <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 font-mono text-[10px] uppercase track-label text-bg">
                          {tier.badge}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-6 font-display text-h3 font-medium leading-tight">
                      {tier.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 min-h-[52px] text-body",
                        featured ? "text-white/60" : "text-light-muted",
                      )}
                    >
                      {tier.summary}
                    </p>

                    <div className="mt-6 font-display text-h2 font-medium leading-none">
                      {tier.price}
                    </div>
                    <p
                      className={cn(
                        "mt-2 text-body",
                        featured ? "text-white/60" : "text-light-muted",
                      )}
                    >
                      {tier.priceNote} · {tier.timeline}
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
                    {tier.featuresLabel}
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

        {/* White-label band — a full-width light card below the tier grid.
            The studio texture is CSS-inverted (mainly light, dark streak
            shading); the tint gradient keeps the copy on the left readable
            while the shading opens up on the right. */}
        {showWhiteLabel ? (
          <div className="relative mt-4 overflow-hidden rounded-[8px] bg-light-bg text-light-text">
            <Image
              src="/textures/studio-texture.jpg"
              alt=""
              fill
              sizes="100vw"
              className="pointer-events-none object-cover opacity-[0.45] invert"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 92%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 55%, transparent) 60%, color-mix(in srgb, var(--color-light-bg) 20%, transparent) 100%)",
              }}
              aria-hidden
            />
            <div className="relative flex min-h-[300px] flex-col justify-end gap-10 px-8 py-10 md:min-h-[380px] md:flex-row md:items-end md:justify-between md:px-12 md:py-12">
              <div className="max-w-3xl">
                <h3 className="font-display text-h3 font-medium leading-tight tracking-tight text-balance md:text-[1.75rem]">
                  {pricing.whiteLabel.heading}
                </h3>
                <p className="mt-4 max-w-2xl text-body-lg font-medium text-light-muted">
                  {pricing.whiteLabel.paragraph}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={pricing.whiteLabel.ctas[0].href}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-[6px] btn-animated px-6 py-3 sm:w-auto text-body font-medium text-accent-ink"
                >
                  {pricing.whiteLabel.ctas[0].label}{" "}
                  <span aria-hidden className="btn-arrow">
                    &rarr;
                  </span>
                </Link>
                <Link
                  href={pricing.whiteLabel.ctas[1].href}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-[6px] border border-light-border bg-white px-6 py-3 sm:w-auto text-body font-medium text-light-text transition hover:bg-light-surface"
                >
                  {pricing.whiteLabel.ctas[1].label}{" "}
                  <span aria-hidden className="btn-arrow">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </Section>
    </div>
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
  if (name === "mountain") {
    // lucide:mountain
    return (
      <svg {...common}>
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
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

/** Circled check for feature rows (light card body). */
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
