"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * The accordion itself, separated from the FAQ section that usually wraps it.
 *
 * `Faq` is a full section: sticky heading on the left, accordion on the right.
 * A blog post's in-body `faqBlock` needs the accordion without the section, at
 * the body's reading measure. Extracting the list means both get the same
 * open/close behaviour and the same card, rather than a second accordion that
 * looks almost right.
 */
export function FaqAccordion({
  items,
  className,
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => {
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
  );
}
