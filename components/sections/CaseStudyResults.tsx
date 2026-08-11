import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * "The results" — the money section: dark textured band, oversized numbers
 * from `results[]` (quote-metrics render in quotes, never as invented
 * figures), one qualitative note beneath.
 */
export function CaseStudyResults({ study }: { study: CaseStudyDetail }) {
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
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight">
          The results
        </h2>
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:gap-0 sm:divide-x sm:divide-border md:mt-12">
          {study.results.map((m) => (
            <div key={m.label} className="sm:px-12 sm:first:pl-0 sm:last:pr-0">
              <div
                className={cn(
                  "font-display font-medium",
                  m.isQuote
                    ? "max-w-xl text-h2 leading-tight"
                    : "text-display leading-none",
                  m.positive && "text-positive",
                )}
              >
                {m.isQuote ? <>&ldquo;{m.value}&rdquo;</> : m.value}
              </div>
              <div className="mt-3 text-body-lg text-text-muted">{m.label}</div>
            </div>
          ))}
        </div>
        {study.resultsNote ? (
          <p className="mt-10 max-w-2xl text-body-lg leading-relaxed text-text-muted">
            {study.resultsNote}
          </p>
        ) : null}
      </Section>
    </div>
  );
}
