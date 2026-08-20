import { useEffect, useState } from "react";

/**
 * Which in-page section the reader is currently on.
 *
 * Extracted from GuideNav when the blog's chapters column needed the same
 * answer. Two navigators computing "where am I" from two copies of the same
 * observer is exactly the drift the rest of this codebase keeps designing out,
 * so the walk happens in one place and both read the result.
 *
 * The default margin is tuned for the sticky site header: a section counts as
 * current once its top has passed under the header, and stops counting once it
 * has left the top 40% of the viewport. The nearest such section wins, so the
 * label matches what is actually under the reader rather than what is entering.
 */
export function useActiveSection(
  items: { id: string }[],
  rootMargin = "-96px 0px -60% 0px",
): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin, threshold: 0 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [items, rootMargin]);

  return active;
}
