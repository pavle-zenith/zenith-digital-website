"use client";

import { useEffect, useState } from "react";

import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

/**
 * The page-level section navigator.
 *
 * REPLACES the per-section "jump to" lists, which sat inside the section they
 * linked into: by the time you could see one you had already arrived, and it
 * only navigated within what you were reading. This is one bar for the whole
 * guide, so it works as orientation rather than as an index of a section.
 *
 * Sticks under the site header, tracks the section in view, and takes itself
 * away once the FAQ is reached, since everything below that is conversion
 * furniture rather than reading.
 *
 * Desktop: a horizontally scrollable rail of links. Mobile: a collapsed
 * dropdown, so it costs one line of screen rather than a wrapped block.
 */
export function GuideNav({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  // Shared with the blog's chapters column so the two cannot disagree
  // about which section the reader is on.
  const active = useActiveSection(items);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const faq = document.getElementById("faq");
    if (!faq) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setHidden(entry.isIntersecting || entry.boundingClientRect.top < 0),
      { rootMargin: "-96px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(faq);
    return () => observer.disconnect();
  }, []);

  const activeLabel =
    items.find((i) => i.id === active)?.label ?? items[0]?.label;

  return (
    <div
      className={cn(
        // tone-light sets --rule, so .frame draws the same side rails as every
        // Section. top-16 clears the 4rem site header, which is sticky at z-50.
        "tone-light sticky top-16 z-30 border-b border-light-border bg-light-bg transition-opacity duration-200",
        hidden && "pointer-events-none opacity-0",
      )}
      aria-hidden={hidden}
    >
      <div className="frame !py-0">
        {/* Mobile: one line that opens a list. */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex w-full items-center justify-between gap-4 py-3 text-left"
          >
            <span className="font-mono text-label uppercase track-label text-light-muted">
              Jump to
            </span>
            <span className="flex items-center gap-2 font-display font-medium text-light-text">
              {activeLabel}
              <span
                aria-hidden
                className={cn(
                  "text-h3 leading-none transition-transform duration-200",
                  open && "rotate-45",
                )}
              >
                +
              </span>
            </span>
          </button>
          <div
            className={cn(
              "grid transition-[grid-template-rows] duration-300",
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <ul className="frame-bleed divide-y divide-light-border border-t border-light-border">
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block px-[clamp(20px,4vw,64px)] py-3 font-display font-medium transition",
                        item.id === active
                          ? "bg-light-surface text-light-text"
                          : "text-light-muted hover:text-light-text",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop: one row of cells spanning rail to rail, split by
            hairlines. Every cell takes an equal share of the width (flex-1 on
            a zero basis) so the set ends exactly on the right rail rather than
            running past it, and labels wrap instead of truncating. */}
        <ul className="frame-bleed hidden divide-x divide-light-border lg:flex">
          {items.map((item) => (
            <li key={item.id} className="flex min-w-0 flex-1 basis-0">
              <a
                href={`#${item.id}`}
                data-chip={item.id}
                aria-current={item.id === active ? "true" : undefined}
                className={cn(
                  "flex w-full items-center justify-center px-2 py-3 text-center text-[0.8125rem] font-medium leading-snug text-balance transition",
                  item.id === active
                    ? "bg-light-surface text-light-text"
                    : "text-light-muted hover:bg-light-surface hover:text-light-text",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
