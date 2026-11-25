"use client";

import { guideAsideRow } from "@/components/sections/migration/GuideAside";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

/**
 * The checklist's side navigator: the phases, numbered, the current one
 * filled. The contents of the shared guide aside (GuideAside supplies the
 * rule, label and sticky behaviour), drawn exactly like the blog's chapters
 * column, so the site has one sidebar rather than a third.
 */
export function PhaseNav({ items }: { items: { id: string; label: string }[] }) {
  const active = useActiveSection(items);
  return (
    <ul>
      {items.map((item, i) => (
        <li key={item.id} className={cn(guideAsideRow("light"), item.id === active && "bg-light-surface")}>
          <a
            href={`#${item.id}`}
            aria-current={item.id === active ? "true" : undefined}
            className={cn(
              "flex gap-3 py-3 text-body leading-snug transition",
              item.id === active ? "font-medium text-light-text" : "text-light-muted hover:text-light-text",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "shrink-0 pt-[0.2rem] font-mono text-label track-label tabular-nums",
                item.id === active ? "text-accent" : "text-light-muted",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-balance">{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
