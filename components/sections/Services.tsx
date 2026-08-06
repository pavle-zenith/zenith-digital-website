import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { services } from "@/content/home";

// span -> col-span utility (static strings so Tailwind keeps them).
const SPAN: Record<number, string> = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  6: "md:col-span-6",
};

/**
 * Section 6 — Services (Stripe-style grid). Intro headline top-left with an
 * "All services" CTA, then a 6-column grid: row 1 = two wide cards (span 3),
 * row 2 = three equal cards (span 2), row 3 = one full-width card (span 6).
 * Each card leads with its generated product-UI mockup, divided by hairlines.
 */
export function Services() {
  return (
    <Section tone="light" frameClassName="!py-20">
      {/* Intro row: headline left, CTA bottom-right */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {services.heading}
          </h2>
          <p className="mt-4 max-w-xl text-body-lg font-medium text-light-muted">{services.intro}</p>
        </div>
        <div className="shrink-0">
          <Button cta={services.cta} tone="light" />
        </div>
      </div>

      {/* 6-col grid — 1px gaps on a rule-colored bg render as hairlines. */}
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:grid-cols-6">
        {services.items.map((item) => (
          item.span === 6 ? (
            // Full-width row (white-label): compact, CTA-height. Small thumbnail
            // left, title + description beside it, no tall image.
            <article
              key={item.title}
              className={cn(
                "flex flex-col gap-5 bg-light-bg p-6 transition hover:bg-light-surface sm:flex-row sm:items-center sm:gap-6",
                SPAN[item.span],
              )}
            >
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[6px] border border-light-border bg-light-surface sm:aspect-square sm:h-24 sm:w-24">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover"
                  aria-hidden
                />
              </div>
              <div>
                <h3 className="font-display text-h3 font-medium">{item.title}</h3>
                <p className="mt-2 max-w-2xl text-body leading-snug text-light-muted">
                  {item.description}
                </p>
              </div>
            </article>
          ) : (
            <article
              key={item.title}
              className={cn(
                "flex flex-col bg-light-bg p-6 transition hover:bg-light-surface",
                SPAN[item.span],
              )}
            >
              {/* Product-UI mockup */}
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-[6px] border border-light-border bg-light-surface">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 700px"
                  className="object-cover"
                  aria-hidden
                />
              </div>
              <h3 className="font-display text-h3 font-medium">{item.title}</h3>
              <p className="mt-2 max-w-md text-body leading-snug text-light-muted">
                {item.description}
              </p>
            </article>
          )
        ))}
      </div>
    </Section>
  );
}
