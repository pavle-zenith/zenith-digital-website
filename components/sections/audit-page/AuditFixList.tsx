"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { PRIORITY_LABEL, PRIORITY_PILL } from "@/content/audits/score";
import type { AuditCheck } from "@/content/audits/types";

type Item = { check: AuditCheck; index: number };

/**
 * The "What to fix" list, with a checkbox per item so a client can tick things
 * off as they work through them.
 *
 * STORAGE. One key per item, `audit:{slug}:{segmentId}:{index}`, where `index`
 * is the item's position in the original `checks` array. That is deliberately
 * not its position in this sorted list: re-prioritising a check in the content
 * file must never move a tick onto a different item.
 *
 * The server always renders every box unticked and the saved state is read
 * after mount, so the server HTML and the first client render agree. Every read
 * and write is wrapped, because storage throws outright in private windows and
 * in browsers set to block site data; there the boxes still work, they just
 * don't survive a reload.
 */
export function AuditFixList({
  slug,
  segmentId,
  items,
}: {
  slug: string;
  segmentId: string;
  items: Item[];
}) {
  const key = (index: number) => `audit:${slug}:${segmentId}:${index}`;
  const [done, setDone] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const restored: Record<number, boolean> = {};
    for (const { index } of items) {
      try {
        if (window.localStorage.getItem(`audit:${slug}:${segmentId}:${index}`) === "1") {
          restored[index] = true;
        }
      } catch {
        // Storage blocked: start unticked.
      }
    }
    setDone(restored);
  }, [slug, segmentId, items]);

  const toggle = (index: number, value: boolean) => {
    setDone((d) => ({ ...d, [index]: value }));
    try {
      if (value) window.localStorage.setItem(key(index), "1");
      else window.localStorage.removeItem(key(index));
    } catch {
      // Storage blocked: the tick holds for this visit only.
    }
  };

  if (!items.length) {
    return <p className="py-4 text-body text-light-muted">Nothing to fix here.</p>;
  }

  return (
    <ul role="list" className="divide-y divide-light-border">
      {items.map(({ check, index }) => {
        const id = `fix-${segmentId}-${index}`;
        const isDone = Boolean(done[index]);
        return (
          <li key={index} className="py-4">
            <div className="flex items-start gap-3">
              <input
                id={id}
                type="checkbox"
                checked={isDone}
                onChange={(e) => toggle(index, e.target.checked)}
                className="mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer accent-accent"
              />
              {/* Label, then pills, then detail: the same order at every width.
                  A wrap-to-fit row put the pill beside a short label and under
                  a long one, so the priority column jumped from row to row. */}
              <div className="min-w-0 flex-1">
                <label
                  htmlFor={id}
                  className={cn(
                    "block cursor-pointer font-medium text-light-text transition-colors",
                    isDone && "text-light-muted line-through decoration-light-muted/60",
                  )}
                >
                  {check.label}
                </label>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {check.priority ? (
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-label uppercase track-label",
                        PRIORITY_PILL[check.priority],
                      )}
                    >
                      {PRIORITY_LABEL[check.priority]}
                    </span>
                  ) : null}
                  {check.status === "partial" ? (
                    <span className="inline-flex items-center rounded-full border border-light-border bg-light-bg px-2.5 py-0.5 font-mono text-label uppercase track-label text-light-muted">
                      Partly
                    </span>
                  ) : null}
                </span>
                <p className="mt-2 text-body text-light-muted">{check.detail}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
