"use client";

import { useEffect, useState } from "react";

/**
 * Shared auto-advancing index for the tab and step carousels (process steps,
 * audit tabs, testimonial tabs). Three rules, all accessibility requirements
 * rather than polish:
 *
 *  - It never starts under `prefers-reduced-motion`. The global override in
 *    globals.css collapses transitions and animations, but a `setInterval`
 *    that swaps content is plain JavaScript and sails straight past CSS.
 *  - It stops for good the moment the visitor picks a panel themselves. Content
 *    that keeps rotating after a deliberate choice pulls text out from under
 *    someone mid-sentence, which WCAG 2.2.2 (Pause, Stop, Hide) treats as a
 *    Level A failure.
 *  - `setPaused` covers hover, and callers wire it to the whole panel rather
 *    than only the control row, so reading the copy pauses the rotation too.
 *
 * The media query is read inside the effect rather than at render so the server
 * and the first client render agree (no hydration mismatch).
 */
export function useAutoCycle(count: number, intervalMs: number) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (paused || stopped || count < 2) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => setActive((a) => (a + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [paused, stopped, count, intervalMs]);

  /** Wire this to any control that sets the index deliberately. */
  const select = (i: number) => {
    setStopped(true);
    setActive(i);
  };

  // `paused` and `stopped` are both surfaced so a countdown indicator can show
  // the true state: paused is temporary (hover), stopped is permanent (the
  // visitor chose a panel and the rotation is over).
  return { active, select, paused, setPaused, stopped };
}
