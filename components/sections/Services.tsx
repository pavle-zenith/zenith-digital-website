import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { cn } from "@/lib/utils";
import { services } from "@/content/home";

// span -> col-span utility (static strings so Tailwind keeps them).
const SPAN: Record<number, string> = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
};

/**
 * Section 6 — Services (Stripe-style grid). Intro headline top-left with an
 * "All services" CTA, then a 6-column grid of equal cards (span 3, two per
 * row; other spans still supported via the map). Each card leads with its
 * generated product-UI mockup, divided by hairlines.
 */
export function Services() {
  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      {/* Intro row: headline left, CTA bottom-right */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {services.heading}
          </h2>
          <p className="mt-4 max-w-xl text-body-lg font-medium text-light-muted">
            {services.intro}
          </p>
        </div>
        <div className="shrink-0">
          <Button cta={services.cta} tone="light" />
        </div>
      </div>

      {/* 6-col grid — 1px gaps on a rule-colored bg render as hairlines. */}
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:grid-cols-6">
        {services.items.map((item) => (
          // Each card links to its dedicated service page where one exists,
          // and to the hub otherwise, so the grid feeds the internal link graph.
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "group flex flex-col bg-light-bg p-6 transition hover:bg-light-surface",
              SPAN[item.span],
            )}
          >
            {/* Media: a drag-to-compare slider when the item carries a
                before/after pair, otherwise the product-UI mockup. */}
            {"beforeAfter" in item && item.beforeAfter ? (
              <div className="mb-6">
                <BeforeAfterSlider
                  title="Dock rental"
                  before={item.beforeAfter.before}
                  after={item.beforeAfter.after}
                  caption={false}
                  labels={false}
                  frameClassName="aspect-[16/10] rounded-[6px] border border-light-border bg-light-surface"
                />
              </div>
            ) : (
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-[6px] border border-light-border bg-light-surface">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 67vw, 850px"
                  className="object-cover"
                  aria-hidden
                />
              </div>
            )}
            <h3 className="font-display text-h3 font-medium transition group-hover:text-accent">
              {item.title}
            </h3>
            <p className="mt-2 max-w-md text-body leading-snug text-light-muted">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
