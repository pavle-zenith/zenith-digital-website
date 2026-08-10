"use client";

import { useState } from "react";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { faqSection } from "@/content/home";
import type { CtaLink } from "@/lib/types";

type FaqData = {
  heading: string[];
  subhead: string;
  ctas: CtaLink[];
  items: { q: string; a: string }[];
};

/**
 * FAQ (Trueform layout). Left: sticky two-line heading, subhead, and two buttons.
 * Right: an accordion where each question is its own bordered rounded card that
 * expands to reveal the answer. Feeds FAQPage JSON-LD on the page. Defaults to
 * the homepage content; other pages pass their own `data` (e.g. /book-a-call).
 */
export function Faq({ data = faqSection }: { data?: FaqData }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Left: sticky heading */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight">
            {data.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-md text-body-lg font-medium text-light-muted">
            {data.subhead}
          </p>
          {data.ctas.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {data.ctas.map((cta) => (
                <Button key={cta.href} cta={cta} tone="light" />
              ))}
            </div>
          ) : null}
        </div>

        {/* Right: accordion of bordered cards */}
        <div className="flex flex-col gap-3">
          {data.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="rounded-[8px] border border-light-border transition hover:border-light-muted/40"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-display text-body-lg font-medium">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-h3 leading-none text-light-text transition-transform duration-200",
                      isOpen && "rotate-45",
                    )}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-body leading-relaxed text-light-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
