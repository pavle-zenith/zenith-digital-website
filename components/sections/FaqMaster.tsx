"use client";

import { useState } from "react";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { fCategories, fContact } from "@/content/faq";

/**
 * /faq body — a 50/50 split: the six categorized accordion blocks on the left
 * (divided by hairlines, first item open per category), and a sticky plain
 * contact block (text + subtext + email/phone buttons) on the right, past a
 * vertical hairline. Category ids stay as stable anchors.
 */
export function FaqMaster() {
  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
        {/* Category column — hairline-divided blocks */}
        <div className="divide-y divide-light-border lg:pr-16">
          {fCategories.map((cat) => (
            <CategoryBlock key={cat.id} category={cat} />
          ))}
        </div>

        {/* Sticky contact block, past the vertical rule */}
        <div className="lg:border-l lg:border-light-border lg:pl-16">
          <div className="lg:sticky lg:top-24">
            <h2 className="font-display text-h2 font-medium leading-tight tracking-tight">
              {fContact.heading}
            </h2>
            <p className="mt-3 max-w-md text-body-lg font-medium leading-relaxed text-light-muted">
              {fContact.text}
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:${fContact.email}`}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-[6px] btn-animated px-6 py-3 text-body font-medium text-accent-ink"
              >
                {fContact.email}{" "}
                <span aria-hidden className="btn-arrow">
                  &rarr;
                </span>
              </a>
              <a
                href={`tel:${fContact.phone.replace(/\s/g, "")}`}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-[6px] border border-light-border bg-light-bg px-6 py-3 text-body font-medium text-light-text transition hover:bg-light-surface"
              >
                {fContact.phone}{" "}
                <span aria-hidden className="btn-arrow">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CategoryBlock({
  category,
}: {
  category: (typeof fCategories)[number];
}) {
  // First item open per category.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div
      id={category.id}
      className="scroll-mt-24 py-10 first:pt-0 last:pb-0 md:py-12"
    >
      <h2 className="text-center font-display text-h3 font-medium leading-tight tracking-tight md:text-left md:text-[1.75rem]">
        {category.label}
      </h2>

      <div className="mt-6 flex flex-col gap-3">
        {category.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className="rounded-[8px] border border-light-border bg-light-bg transition hover:border-light-muted/40"
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
  );
}
