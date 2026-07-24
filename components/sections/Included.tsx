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
        <p className="mt-5 text-body-lg text-light-muted">{included.intro}</p>
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

/** Small line icon per feature box. */
function BoxIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "server":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="7" rx="1.5" />
          <rect x="3" y="13" width="18" height="7" rx="1.5" />
          <path d="M7 7.5h.01M7 16.5h.01" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
          <path d="M9.5 12l2 2 3.5-3.5" />
        </svg>
      );
    case "card":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18M7 15h4" />
        </svg>
      );
    case "plug":
      return (
        <svg {...common}>
          <path d="M9 7V3M15 7V3" />
          <path d="M6 7h12v4a6 6 0 01-6 6 6 6 0 01-6-6V7z" />
          <path d="M12 17v4" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 2l9 5-9 5-9-5 9-5z" />
          <path d="M3 12l9 5 9-5" />
          <path d="M3 17l9 5 9-5" />
        </svg>
      );
    case "pen":
      return (
        <svg {...common}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M14 4c3 0 6 1 6 1s1 3 1 6c0 5-6 9-9 9l-4-4c0-3 3-9 6-12z" />
          <circle cx="14.5" cy="9.5" r="1.5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
