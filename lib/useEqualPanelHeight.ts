"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reserves the height of the tallest panel in an auto-advancing accordion, so
 * advancing never resizes the section.
 *
 * WHY THIS EXISTS. These accordions expand the open panel with a 0fr/1fr grid
 * row. That is correct for a click-driven accordion: the reader asked for the
 * panel, so the page growing under them is expected. It is wrong the moment a
 * timer drives it. Bodies differ in length, so each auto-advance resized the
 * section and shoved everything below it up and down while the reader was
 * looking at something else. On a phone, where the panels stack and the copy
 * rewraps to more lines, the swing is several hundred pixels.
 *
 * WHY IT MEASURES rather than taking a fixed min-height. A hardcoded value has
 * to be picked per breakpoint and goes stale the moment the copy changes, which
 * is why the one place that tried it scoped the number to sm and up and left
 * phones jumping. Measuring the real rendered bodies is correct at every width
 * and survives an editor rewriting the text.
 *
 * Usage: spread `ref` on the element wrapping the panels, mark each panel's
 * content element with `data-panel-body`, and apply `minHeight` to each panel's
 * inner (clipped) wrapper.
 */
export function useEqualPanelHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [minHeight, setMinHeight] = useState<number>();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Measures the content elements, never the wrappers minHeight is applied
    // to, so a measurement can't feed back into the value it produced.
    const measure = () => {
      let max = 0;
      root
        .querySelectorAll<HTMLElement>("[data-panel-body]")
        .forEach((el) => (max = Math.max(max, el.offsetHeight)));
      setMinHeight(max || undefined);
    };

    measure();
    window.addEventListener("resize", measure);
    // Text reflows when the real face swaps in, which changes every body's
    // height after the first measurement.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, []);

  return { ref, minHeight };
}
