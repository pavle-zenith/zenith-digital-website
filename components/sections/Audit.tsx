"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Section } from "@/components/ui/Section";
import { AuditReport } from "@/components/ui/AuditReport";
import { cn } from "@/lib/utils";
import { audit } from "@/content/home";

const CYCLE_MS = 5000;

/**
 * Free-audit — Lightdash-style split. Full-width heading + intro on top; below,
 * accordion tabs left (auto-cycling on a timer, pause on hover, click to jump)
 * and a mock audit-report card right. A thin site-URL input + CTA bar spans
 * beneath both cells. Light mode, no background image.
 */
export function Audit() {
  const [open, setOpen] = useState(0);
  const [paused, setPaused] = useState(false);
  const [url, setUrl] = useState("");
  const router = useRouter();
  const count = audit.tabs.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setOpen((o) => (o + 1) % count), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = url.trim();
    router.push(
      q ? `${audit.cta.href}?url=${encodeURIComponent(q)}` : audit.cta.href,
    );
  };

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column: heading, intro, tabs, then the input pinned to the bottom */}
        <div
          className="flex flex-col"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <h2 className="max-w-lg font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {audit.heading}
          </h2>
          <p className="mt-4 max-w-md text-body-lg md:mt-5 font-medium text-light-muted">
            {audit.intro}
          </p>

          {/* Accordion tabs */}
          <div className="mt-10 border-t border-r border-light-border">
            {audit.tabs.map((tab, i) => {
              const isOpen = open === i;
              return (
                <div key={tab.title} className="border-b border-light-border">
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-expanded={isOpen}
                    className={cn(
                      "flex w-full items-center border-l-2 py-5 pl-5 pr-4 text-left transition",
                      isOpen
                        ? "border-accent"
                        : "border-light-border hover:pl-6",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-body-lg font-medium transition",
                        isOpen ? "text-light-text" : "text-light-muted",
                      )}
                    >
                      {tab.title}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="border-l-2 border-accent pb-6 pl-5 pr-4 text-body leading-relaxed text-light-muted">
                        {tab.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spacer: guarantees a minimum gap above the input, then mt-auto on
              the form fills any remaining height to pin it to the bottom. */}
          <div className="min-h-12 flex-1" aria-hidden />

          {/* Site-URL input + CTA */}
          {/* On phones the field carries its own border and surface fill so it
              reads as an input before it's focused; from sm up the two sit in
              one bordered bar and the field goes borderless again. */}
          <form
            onSubmit={submit}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:rounded-[8px] sm:border sm:border-light-border sm:p-3"
          >
            <input
              type="text"
              inputMode="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={audit.inputPlaceholder}
              aria-label="Your website URL"
              className="min-w-0 flex-1 rounded-[6px] border border-light-border bg-light-surface px-4 py-3 text-body text-light-text outline-none placeholder:text-light-muted sm:rounded-none sm:border-0 sm:bg-transparent sm:py-2.5"
            />
            <button
              type="submit"
              className="btn-animated group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-[6px] px-6 py-3 sm:w-auto text-body font-medium text-accent-ink transition"
            >
              {audit.cta.label}{" "}
              <span aria-hidden className="btn-arrow">
                &rarr;
              </span>
            </button>
          </form>
        </div>

        {/* Right column: mock audit-report card */}
        <div className="flex items-center justify-center rounded-[8px] bg-light-surface p-5 sm:p-8 lg:p-12">
          <AuditReport report={audit.report} />
        </div>
      </div>
    </Section>
  );
}
