import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { cn } from "@/lib/utils";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * "What's included" — dark, textured, in the PartnerServices bento register:
 * one hairline-bounded grid (1px gaps over a rule-colored background render as
 * shared rules), each cell leading with a line icon in a hairline square.
 * Span classes on the tail cells keep the grid flush whatever the item count
 * (pages carry six to eight deliverables).
 */
export function ServicePageIncluded({ data }: { data: ServicePageContent }) {
  const items = data.included.items;
  const count = items.length;
  const last = count - 1;

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

      <Section
        tone="dark"
        className="bg-transparent"
        frameClassName="!py-14 md:!py-24"
      >
        <div className="mb-8 grid gap-8 md:mb-12 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {data.included.heading}
          </h2>
          <p className="max-w-md text-body-lg font-medium text-text-muted md:justify-self-end md:text-right">
            {data.included.intro}
          </p>
        </div>

        {/* One grid, 1px gaps over a rule-colored bg render as shared hairlines. */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <article
              key={item.title}
              className={cn(
                "flex flex-col bg-bg p-8",
                // Close the grid flush on both breakpoints: an odd count spans
                // the last cell across md's two columns (which also fills lg's
                // 4+3 row), and a remainder of two on lg spans the final pair.
                count % 2 === 1 && i === last && "md:col-span-2",
                count % 4 === 2 && i >= count - 2 && "lg:col-span-2",
              )}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-border bg-surface text-text">
                <FeatureIcon name={item.icon ?? ""} />
              </span>
              <h3 className="mt-8 font-display text-body-lg font-medium">
                {item.title}
              </h3>
              <p className="mt-2 max-w-md text-body leading-snug text-text-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
