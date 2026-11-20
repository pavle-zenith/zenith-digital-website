"use client";

import { useState } from "react";

import { FeatureIcon } from "@/components/ui/FeatureIcon";

/**
 * One "Show details" switch for a whole comparison grid, in place of a
 * toggle on every row. The details are already in every cell (hidden), so
 * they stay in the HTML; this only flips `data-details` on the wrapper,
 * which the cells read through the `group/details` variant.
 */
export function DetailToggle({
  show,
  hide,
  tone = "light",
  children,
}: {
  show: string;
  hide: string;
  tone?: "light" | "dark";
  children: React.ReactNode;
}) {
  const [on, setOn] = useState(false);
  return (
    <div className="group/details" data-details={on ? "on" : "off"}>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          aria-pressed={on}
          onClick={() => setOn((v) => !v)}
          className={
            tone === "dark"
              ? "inline-flex items-center gap-1.5 rounded-[6px] border border-border px-3 py-1.5 text-[0.875rem] font-medium text-text transition hover:bg-surface-2"
              : "inline-flex items-center gap-1.5 rounded-[6px] border border-light-border px-3 py-1.5 text-[0.875rem] font-medium text-light-text transition hover:bg-light-surface"
          }
        >
          {on ? hide : show}
          <FeatureIcon name="chevron-down" className={`h-4 w-4 transition-transform duration-200 ${on ? "rotate-180" : ""}`} />
        </button>
      </div>
      {children}
    </div>
  );
}
