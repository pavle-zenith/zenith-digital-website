"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type JumpLink = {
  id: string;
  name: string;
  /** Rendered after the name, e.g. an audit segment's score pill. */
  badge?: React.ReactNode;
};

/**
 * Jump bar for the private documents (/audit/, /proposal/): one link per
 * section, then the price target pushed to the right with an arrow.
 *
 * FIXED, REVEALED ONCE THE HERO SCROLLS AWAY. In the page flow it sat directly
 * above the audit scorecard on load, so the same six segments appeared twice
 * in a row. Kept out of the flow, it never duplicates what's on screen and only
 * appears when it's useful, sliding down from under the nav.
 *
 * Its `top` is the site nav's REAL height, measured, not a magic number:
 * the nav's height is owned by another component, and a hardcoded 64px would
 * silently leave a gap or an overlap the day that changes. The same
 * measurement, plus the bar's own height, is published as CSS variables that
 * `.doc-anchor` uses, so a jump never lands a heading underneath either bar.
 * Only a header that is actually pinned (sticky or fixed) counts: a page with
 * its own in-flow header, like /partner-showcase, scrolls it away, so the bar
 * sits at the very top there.
 *
 * The current section is marked with `aria-current` from an observer rather
 * than a scroll handler, and on a phone the active link is scrolled into view
 * inside the bar, by moving the bar's own scroll position so the page itself
 * never jumps.
 */
export function JumpBar({
  items,
  trailing,
  heroId,
  label,
}: {
  items: JumpLink[];
  /** The conversion target (options, price), set apart at the far end. */
  trailing?: { id: string; name: string };
  /** The bar stays hidden while this element is on screen. */
  heroId: string;
  /** Accessible name for the landmark. */
  label: string;
}) {
  const barRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<string | null>(null);
  // Hidden until the hero has scrolled up under the nav. Starts hidden, so the
  // server render and a load at the top of the page agree.
  const [shown, setShown] = useState(false);

  // Publish the nav and bar heights for `top` and for anchor offsets.
  useEffect(() => {
    const root = document.documentElement;
    const nav = pinnedHeader();
    const bar = barRef.current;
    if (!bar) return;

    const publish = () => {
      root.style.setProperty("--doc-nav-h", `${navHeight()}px`);
      root.style.setProperty("--doc-jump-h", `${bar.getBoundingClientRect().height}px`);
    };
    publish();
    const ro = new ResizeObserver(publish);
    if (nav) ro.observe(nav);
    ro.observe(bar);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--doc-nav-h");
      root.style.removeProperty("--doc-jump-h");
    };
  }, []);

  // Reveal once the hero has gone up under the nav.
  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) {
      setShown(true);
      return;
    }
    const navH = navHeight();
    const observer = new IntersectionObserver(
      ([entry]) => entry && setShown(!entry.isIntersecting),
      // The nav's band counts as gone: the hero is "away" once it's under it.
      { rootMargin: `-${navH}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  // Track which section owns the top of the reading area.
  useEffect(() => {
    const ids = [...items.map((i) => i.id), ...(trailing ? [trailing.id] : [])];
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const offset = () =>
      navHeight() + Math.round(barRef.current?.getBoundingClientRect().height ?? 52);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A band just under the two bars: whichever section's top sits in it is
      // the one being read.
      { rootMargin: `-${offset()}px 0px -55% 0px`, threshold: 0 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [items, trailing]);

  // Keep the active link visible inside the sideways-scrolling bar.
  useEffect(() => {
    const track = trackRef.current;
    const link = active ? track?.querySelector<HTMLElement>(`[data-jump="${active}"]`) : null;
    if (!track || !link) return;
    const inView =
      link.offsetLeft >= track.scrollLeft &&
      link.offsetLeft + link.offsetWidth <= track.scrollLeft + track.clientWidth;
    if (!inView) track.scrollTo({ left: link.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  const linkClass = (isActive: boolean) =>
    cn(
      "flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-body font-medium whitespace-nowrap transition",
      isActive
        ? "border-accent text-light-text"
        : "border-transparent text-light-muted hover:text-light-text",
    );

  return (
    <nav
      ref={barRef}
      aria-label={label}
      // inert while tucked away, so its links leave the tab order too.
      inert={!shown}
      className={cn(
        "tone-light fixed inset-x-0 z-40 border-b border-light-border bg-light-bg transition-transform duration-300 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0" : "-translate-y-full",
      )}
      style={{ top: "var(--doc-nav-h, 4rem)" }}
    >
      <div className="frame">
        <ul
          ref={trackRef}
          className="-mx-3 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-jump={item.id}
                aria-current={active === item.id ? "location" : undefined}
                className={linkClass(active === item.id)}
              >
                {item.name}
                {item.badge}
              </a>
            </li>
          ))}
          {trailing ? (
            <li className="ml-auto">
              <a
                href={`#${trailing.id}`}
                data-jump={trailing.id}
                aria-current={active === trailing.id ? "location" : undefined}
                className={linkClass(active === trailing.id)}
              >
                {trailing.name}
                <span aria-hidden className="btn-arrow">
                  &rarr;
                </span>
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}

/** The page header, if it stays pinned to the top while scrolling. */
function pinnedHeader(): HTMLElement | null {
  const header = document.querySelector<HTMLElement>("header");
  if (!header) return null;
  const { position } = getComputedStyle(header);
  return position === "sticky" || position === "fixed" ? header : null;
}

function navHeight(): number {
  return Math.round(pinnedHeader()?.getBoundingClientRect().height ?? 0);
}
