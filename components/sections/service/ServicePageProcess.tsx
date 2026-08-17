import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * "How it runs" — light. Service-specific steps, each carrying its own
 * duration as a mono label. The durations are the point: they're what a
 * prospect is actually shopping for.
 *
 * Two layouts, switched by `process.image` in content. With an image the
 * section runs as the split showcase (Tecnic register): heading, intro, the
 * build environment photo, and a CTA in the left column; the stages as
 * hairline-divided rows on the right, each with its title and duration left,
 * body right, and a chip row naming what the stage covers. Without an image
 * it stays the plain numbered column.
 */
export function ServicePageProcess({ data }: { data: ServicePageContent }) {
  const { process } = data;

  if (process.image) {
    return (
      <Section tone="light" frameClassName="!py-14 md:!py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          {/* Left: heading, intro, the photo, CTA */}
          <div>
            <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
              {process.heading}
            </h2>
            <p className="mt-4 max-w-md text-body-lg font-medium text-light-muted md:mt-5">
              {process.intro}
            </p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-card border border-light-border bg-light-surface">
              <Image
                src={process.image}
                alt={process.imageAlt ?? ""}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            {process.cta ? (
              <div className="mt-8">
                <Button cta={process.cta} tone="light" />
              </div>
            ) : null}
          </div>

          {/* Right: the stages. Everything in a step stacks vertically, so
              the chip row gets the full row width and stays on one line
              instead of wrapping inside a half-width cell. */}
          <ol className="divide-y divide-light-border lg:-mt-6">
            {process.steps.map((step, i) => (
              <li
                key={step.title}
                className="py-8 first:pt-0 last:pb-0 lg:first:pt-6"
              >
                <p className="font-mono text-label uppercase track-label text-light-muted">
                  {String(i + 1).padStart(2, "0")}
                  <span aria-hidden> · </span>
                  <span className="text-accent">{step.duration}</span>
                </p>
                <h3 className="mt-3 font-display text-h3 font-medium leading-tight tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-2xl text-body leading-relaxed text-light-muted">
                  {step.body}
                </p>
                {step.focus && step.focus.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {step.focus.map((chip) => (
                      <li
                        key={chip}
                        className="whitespace-nowrap rounded-[6px] border border-light-border bg-light-surface px-3 py-1.5 text-[0.8125rem] font-medium"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Section>
    );
  }

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-8 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {process.heading}
        </h2>
        <p className="max-w-md text-body-lg font-medium text-light-muted md:justify-self-end md:text-right">
          {process.intro}
        </p>
      </div>

      <ol className="mt-10 divide-y divide-light-border border-t border-light-border md:mt-12">
        {process.steps.map((step, i) => (
          <li
            key={step.title}
            className="grid gap-3 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-12 md:py-8"
          >
            <div>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-label text-light-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
                  {step.title}
                </h3>
              </div>
              <p className="mt-2 pl-8 font-mono text-label uppercase track-label text-accent">
                {step.duration}
              </p>
            </div>
            <p className="max-w-2xl text-body leading-relaxed text-light-muted">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
