import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { services } from "@/content/home";

/**
 * Section 6 — Services (Stripe-style bento grid). Intro headline top-left with an
 * "All services" CTA top-right, then a bento of service cards divided by hairlines.
 * `size: "lg"` cells span two columns. Media assets drop in later.
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
          <p className="mt-4 max-w-xl text-body-lg text-light-muted">{services.intro}</p>
        </div>
        <div className="shrink-0">
          <Button cta={services.cta} tone="light" />
        </div>
      </div>

      {/* Bento grid — 1px gaps on a rule-colored bg render as hairlines. */}
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:grid-cols-4">
        {services.items.map((item) => (
          <article
            key={item.title}
            className={cn(
              "flex flex-col bg-light-bg p-6 transition hover:bg-light-surface",
              item.size === "lg" ? "md:col-span-2" : "md:col-span-1",
            )}
          >
            {/* Media placeholder — fixed height, real asset drops in later */}
            <div className="mb-5 h-28 rounded-[6px] border border-dashed border-light-border bg-light-surface" />
            <h3 className="font-display text-h3 font-medium">{item.title}</h3>
            <p className="mt-2 text-body leading-snug text-light-muted">{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
