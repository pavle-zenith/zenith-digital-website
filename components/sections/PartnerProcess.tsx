"use client";

import { useEffect, useState } from "react";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { pProcess } from "@/content/partnerships";

const CYCLE_MS = 5000;

/**
 * How a white-label build runs — tabbed split (same mechanics as the homepage
 * Audit section): accordion tabs left auto-cycle on a timer (pause on hover,
 * click to jump), and the right panel shows a flat mock graphic per step in
 * the AuditReport register (light cards, mono labels, hairlines, one accent).
 */
export function PartnerProcess() {
  const [open, setOpen] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = pProcess.steps.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setOpen((o) => (o + 1) % count), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <Section tone="light" frameClassName="!py-24">
      <div className="mb-12 max-w-2xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {pProcess.heading}
        </h2>
        <p className="mt-5 text-body-lg font-medium text-light-muted">
          {pProcess.intro}
        </p>
      </div>

      <div
        className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Accordion tabs — self-contained column (items-start keeps the right
            rule from running past the last row), CTA beneath. */}
        <div>
          <div className="border-t border-r border-light-border">
            {pProcess.steps.map((step, i) => {
              const isOpen = open === i;
              return (
                <div key={step.title} className="border-b border-light-border">
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-expanded={isOpen}
                    className={cn(
                      "flex w-full items-baseline gap-4 border-l-2 py-5 pl-5 pr-4 text-left transition",
                      isOpen
                        ? "border-accent"
                        : "border-light-border hover:pl-6",
                    )}
                  >
                    <span className="font-mono text-label uppercase track-label text-light-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-body-lg font-medium transition",
                        isOpen ? "text-light-text" : "text-light-muted",
                      )}
                    >
                      {step.title}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      {/* Fixed min-height so every expanded body occupies the
                        same space — switching tabs never shifts the layout. */}
                      <p className="border-l-2 border-accent pb-6 pl-5 pr-4 text-body leading-relaxed text-light-muted sm:min-h-[78px]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Button cta={pProcess.cta} tone="light" />
          </div>
        </div>

        {/* Step graphic */}
        <div className="flex min-h-[380px] items-center justify-center rounded-[8px] bg-light-surface p-6 sm:p-10">
          <StepArt step={open} />
        </div>
      </div>
    </Section>
  );
}

/**
 * Flat mock graphic per step (AuditReport register): light cards, hairlines,
 * mono labels, positive/accent status marks. Purely illustrative.
 */
function StepArt({ step }: { step: number }) {
  switch (step) {
    // 01 — Brief: the partner channel thread with the brief + assets coming
    // in and scope confirmed the next business day.
    case 0:
      return (
        <div className="w-full max-w-md rounded-[8px] border border-light-border bg-light-bg p-6">
          <p className="mb-4 font-mono text-label uppercase track-label text-light-muted">
            Partner channel
          </p>
          <div className="max-w-[85%] rounded-[8px] rounded-tl-none border border-light-border bg-light-surface p-4">
            <p className="text-body font-medium text-light-text">
              Project brief
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["brief.pdf", "brand-assets.zip", "sitemap.png"].map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-light-border bg-light-bg px-2.5 py-1 font-mono text-[11px] text-light-muted"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="ml-auto mt-3 w-fit max-w-[85%] rounded-[8px] rounded-tr-none bg-accent p-4">
            <p className="text-body text-accent-ink">
              Scope, price, and timeline attached.
            </p>
          </div>
          <p className="mt-4 flex items-center gap-2 text-body text-light-muted">
            <CheckDot /> Confirmed within one business day
          </p>
        </div>
      );

    // 02 — Design direction: a wireframe artboard plus the approval row.
    case 1:
      return (
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-[8px] border border-light-border bg-light-bg">
            <div className="flex items-center gap-2 border-b border-light-border px-4 py-3">
              <span className="flex gap-1.5" aria-hidden>
                <i className="h-2 w-2 rounded-full bg-light-border" />
                <i className="h-2 w-2 rounded-full bg-light-border" />
                <i className="h-2 w-2 rounded-full bg-light-border" />
              </span>
              <span className="ml-2 rounded-full bg-light-surface px-3 py-1 font-mono text-[11px] text-light-muted">
                design-direction · v1
              </span>
            </div>
            <div className="p-5">
              <div className="rounded-[6px] bg-accent-subtle p-4">
                <div className="h-3 w-2/3 rounded-full bg-accent/30" />
                <div className="mt-2 h-3 w-2/5 rounded-full bg-accent/20" />
                <div className="mt-4 h-7 w-24 rounded-[4px] bg-accent" />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-[6px] border border-light-border p-3"
                  >
                    <div className="h-10 rounded-[4px] bg-light-surface" />
                    <div className="mt-2 h-2 w-full rounded-full bg-light-surface" />
                    <div className="mt-1.5 h-2 w-2/3 rounded-full bg-light-surface" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-[8px] border border-light-border bg-light-bg px-4 py-3">
            <span className="text-body font-medium text-light-text">
              You review it first
            </span>
            <span className="rounded-full bg-positive/10 px-3 py-1 font-mono text-label uppercase track-label text-positive">
              Approved
            </span>
          </div>
        </div>
      );

    // 03 — You present, we stay invisible: the finished site's footer credits
    // the partner's brand, with our involvement nowhere in sight.
    case 2:
      return (
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-[8px] border border-light-border bg-light-bg">
            {/* Tail of the client's page above the footer */}
            <div className="p-5">
              <div className="h-2.5 w-1/2 rounded-full bg-light-surface" />
              <div className="mt-2 h-2.5 w-2/3 rounded-full bg-light-surface" />
              <div className="mt-2 h-2.5 w-2/5 rounded-full bg-light-surface" />
            </div>
            {/* Site footer under the partner's brand */}
            <div className="bg-bg p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-body-lg font-medium text-white">
                  Your Agency
                </span>
                <span className="flex gap-2" aria-hidden>
                  <i className="h-2 w-10 rounded-full bg-white/20" />
                  <i className="h-2 w-8 rounded-full bg-white/20" />
                  <i className="h-2 w-12 rounded-full bg-white/20" />
                </span>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                <span className="text-body text-white/60">
                  &copy; Your Agency
                </span>
                <span className="rounded-full bg-white px-3 py-1 font-mono text-[11px] text-bg">
                  Designed by Your Agency
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-2 text-body text-light-muted">
            <EyeOff /> Our name appears nowhere
          </p>
        </div>
      );

    // 04 — Handover: transfer checklist, everything under the partner's brand.
    default:
      return (
        <div className="w-full max-w-md rounded-[8px] border border-light-border bg-light-bg p-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-label uppercase track-label text-light-muted">
              Handover
            </p>
            <span className="rounded-full bg-positive/10 px-3 py-1 font-mono text-label uppercase track-label text-positive">
              Complete
            </span>
          </div>
          <ul className="mt-5 flex flex-col divide-y divide-light-border">
            {[
              "Site transferred to your account",
              "Documentation included",
              "Your brand on everything",
            ].map((t) => (
              <li
                key={t}
                className="flex items-center gap-3 py-3.5 text-body text-light-text"
              >
                <CheckDot />
                {t}
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

/** Small positive check mark. */
function CheckDot() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-positive/15 text-positive">
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 13l4 4 10-10" />
      </svg>
    </span>
  );
}

/** Small eye-off mark for the invisible lane. */
function EyeOff() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  );
}
