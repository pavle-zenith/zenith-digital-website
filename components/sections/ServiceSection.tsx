import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { cn } from "@/lib/utils";
import { servicePageSlugs } from "@/content/service-pages";
import type { ServiceEntry } from "@/content/services";

/**
 * One service, one template (problem-first, per the /services handoff): H2 +
 * the when-you-need-this paragraph + primary CTA on the left; the "What you
 * get" deliverables list on the right. Sections alternate light/dark down the
 * page; the anchor id matches the future /services/[slug] slug.
 */
export function ServiceSection({
  data,
  index,
}: {
  data: ServiceEntry;
  index: number;
}) {
  const dark = index % 2 === 1;
  const muted = dark ? "text-text-muted" : "text-light-muted";
  const rule = dark ? "border-border" : "border-light-border";

  const section = (
    <Section
      tone={dark ? "dark" : "light"}
      id={data.id}
      className={cn("scroll-mt-16", dark && "bg-transparent")}
      frameClassName="!py-14 md:!py-24"
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* Left: title, problem, CTA */}
        <div>
          <h2 className="max-w-xl font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {data.title}
          </h2>

          <p className="mt-4 max-w-xl text-body-lg font-medium leading-relaxed">
            {data.when}
          </p>

          {/* Section CTAs — primary button (white fill on dark sections, the
              animated accent fill on light ones), plus the outlined secondary
              where this service has a published page of its own. Both go
              full-width and stack on phones. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={data.cta.href}
              className={cn(
                "group inline-flex w-full items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-body font-medium transition sm:w-auto",
                dark
                  ? "bg-white text-bg hover:bg-white/90"
                  : "btn-animated text-accent-ink",
              )}
            >
              {data.cta.label}{" "}
              <span aria-hidden className="btn-arrow">
                &rarr;
              </span>
            </Link>

            {data.pageSlug && servicePageSlugs.has(data.pageSlug) ? (
              <Button
                cta={{
                  label: `How ${data.title.toLowerCase()} works`,
                  href: `/services/${data.pageSlug}`,
                  variant: "secondary",
                }}
                tone={dark ? "dark" : "light"}
              />
            ) : null}
          </div>
        </div>

        {/* Right: deliverables */}
        <div>
          <p className={cn("font-mono text-label uppercase track-label", muted)}>
            What you get
          </p>
          <ol className={cn("mt-4 border-t", rule)}>
            {data.deliverables.map((d, i) => (
              <li
                key={d}
                className={cn(
                  "flex items-baseline gap-4 border-b py-4 text-body-lg font-medium",
                  rule,
                )}
              >
                <span className={cn("font-mono text-label", muted)}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {d}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Example slider + USP row */}
      <ServiceShowcase slides={data.slides} usps={data.usps} dark={dark} />
    </Section>
  );

  if (!dark) return section;

  // Dark sections sit on the studio texture (the Studio pricing-card
  // treatment) instead of the usual navy texture band.
  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.16]"
          aria-hidden
        />
      </div>
      {section}
    </div>
  );
}
