"use client";

import { useState } from "react";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { included } from "@/content/home";

/**
 * "Everything included" — tabbed feature grid. Centered heading + intro, a row
 * of three equal tabs (active = accent fill, inactive = hairline outline), and
 * three boxes for the active tab: icon in a navy square, title, description.
 * Flat surfaces and hairlines, per the section system.
 */
export function Included() {
  const [active, setActive] = useState(0);
  const tab = included.tabs[active];

  return (
    <Section tone="light" frameClassName="!py-24">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {included.heading}
        </h2>
        <p className="mt-5 text-body-lg font-medium text-light-muted">{included.intro}</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {included.tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={cn(
              "rounded-[6px] border px-6 py-4 text-center font-display text-body-lg font-medium transition",
              i === active
                ? "border-accent bg-accent text-accent-ink"
                : "border-light-border text-light-text hover:bg-light-surface",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Boxes for the active tab */}
      <div className="grid gap-4 md:grid-cols-3">
        {tab.boxes.map((box) => (
          <div
            key={box.title}
            className="flex flex-col rounded-[8px] border border-light-border bg-light-surface p-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-accent text-accent-ink">
              <BoxIcon name={box.icon} />
            </span>
            <h3 className="mt-10 font-display text-body-lg font-medium">{box.title}</h3>
            <p className="mt-2 text-body leading-snug text-light-muted">{box.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/** Small line icon per feature box (Lucide, sourced via Iconify). */
function BoxIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    // lucide:server
    server: (
      <>
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <path d="M6 6h.01M6 18h.01" />
      </>
    ),
    // lucide:shield-check
    shield: (
      <>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    // lucide:credit-card
    card: (
      <>
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <path d="M2 10h20" />
      </>
    ),
    // lucide:plug
    plug: <path d="M12 22v-5m3-9V2m2 6a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1zM9 8V2" />,
    // lucide:code
    code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
    // lucide:layers
    layers: (
      <>
        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
        <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
        <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
      </>
    ),
    // lucide:pen-line
    pen: <path d="M13 21h8m.174-14.188a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />,
    // lucide:search
    search: (
      <>
        <path d="m21 21-4.34-4.34" />
        <circle cx="11" cy="11" r="8" />
      </>
    ),
    // lucide:rocket
    rocket: (
      <>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
        <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name] ?? <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}
