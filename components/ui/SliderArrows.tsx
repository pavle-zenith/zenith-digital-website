"use client";

import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";

/**
 * Prev/next controls for a snap-scroll track that lives in a different
 * section. The track is addressed by id rather than by ref so a server
 * component (the hero) can host the buttons for a slider rendered below it.
 * Steps one card plus the track's gap, same as an in-section slider.
 */
export function SliderArrows({
  targetId,
  label,
  tone = "light",
  gap = 24,
  className,
}: {
  targetId: string;
  /** Used in the aria-labels: "Previous {label}". */
  label: string;
  tone?: Tone;
  gap?: number;
  className?: string;
}) {
  const dark = tone === "dark";

  const scroll = (dir: 1 | -1) => {
    const track = document.getElementById(targetId);
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + gap : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className={cn("flex shrink-0 gap-2", className)}>
      {([-1, 1] as const).map((dir) => (
        <button
          key={dir}
          type="button"
          onClick={() => scroll(dir)}
          aria-label={`${dir === -1 ? "Previous" : "Next"} ${label}`}
          aria-controls={targetId}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-[6px] border transition",
            dark
              ? "border-border bg-bg text-text hover:bg-surface-2"
              : "border-light-border bg-light-bg text-light-text hover:bg-light-surface",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            className={cn("h-4 w-4", dir === -1 && "rotate-180")}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
          </svg>
        </button>
      ))}
    </div>
  );
}
