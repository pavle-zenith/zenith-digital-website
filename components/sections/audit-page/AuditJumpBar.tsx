"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { BAND_LABEL, BAND_PILL, type Band } from "@/content/audits/score";

export type JumpItem = { id: string; name: string; score: number; band: Band };

/**
 * Jump bar: one link per segment with its score, then "Your options".
 *
 * FIXED, REVEALED ONCE THE HERO SCROLLS AWAY, which is the handoff's own
 * wording. The first build placed it in the page flow as a sticky element, and
 * a render showed the cost: on load it sat directly above the scorecard, so
 * the same six segments and scores appeared twice in a row with an empty band
 * between them. Kept out of the flow, it never duplicates the scorecard and
 * only appears when it's useful, sliding down from under the nav.
 *
 * Its `top` is the site nav's REAL height, measured, not a magic number:
 * the nav's height is owned by another component, and a hardcoded 64px would
 * silently leave a gap or an overlap the day that changes. The same
 * measurement, plus the bar's own height, is published as CSS variables that
 * `.audit-anchor` uses, so a jump never lands a heading underneath either bar.
 *
 * The current section is marked with `aria-current` from an observer rather
 * than a scroll handler, and on a phone the active link is scrolled into view
 * inside the bar, by moving the bar's own scroll position so the page itself
 * never jumps.
 */
export function AuditJumpBar({ items }: { items: JumpItem[] }) {
  const barRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<string | null>(null);
  // Hidden until the hero has scrolled up under the nav. Starts hidden, so the
  // server render and a load at the top of the page agree.
  const [shown, setShown] = useState(false);

  // Publish the nav and bar heights for `top` and for anchor offsets.
  useEffect(() => {
    const root = document.documentElement;
    const nav = document.querySelector("header");
    const bar = barRef.current;
    if (!bar) return;

    const publish = () => {
      if (nav) root.style.setProperty("--audit-nav-h", `${nav.getBoundingClientRect().height}px`);
      root.style.setProperty("--audit-jump-h", `${bar.getBoundingClientRect().height}px`);
    };
    publish();
    const ro = new ResizeObserver(publish);
    if (nav) ro.observe(nav);
    ro.observe(bar);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--audit-nav-h");
      root.style.removeProperty("--audit-jump-h");
    };
  }, []);

  // Reveal once the hero has gone up under the nav.
  useEffect(() => {
    const hero = document.getElementById("audit-hero");
    if (!hero) {
      setShown(true);
      return;
    }
    const navH = Math.round(document.querySelector("header")?.getBoundingClientRect().height ?? 64);
    const observer = new IntersectionObserver(
      ([entry]) => entry && setShown(!entry.isIntersecting),
      // The nav's band counts as gone: the hero is "away" once it's under it.
      { rootMargin: `-${navH}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Track which section owns the top of the reading area.
  useEffect(() => {
    const ids = [...items.map((i) => i.id), "options"];
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const offset = () =>
      Math.round(
        (document.querySelector("header")?.getBoundingClientRect().height ?? 64) +
          (barRef.current?.getBoundingClientRect().height ?? 52),
      );

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
  }, [items]);

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
      aria-label="Audit sections"
      // inert while tucked away, so its links leave the tab order too.
      inert={!shown}
      className={cn(
        "tone-light fixed inset-x-0 z-40 border-b border-light-border bg-light-bg transition-transform duration-300 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0" : "-translate-y-full",
      )}
      style={{ top: "var(--audit-nav-h, 4rem)" }}
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
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border bg-light-bg px-2 py-0.5 font-mono text-label tabular-nums",
                    BAND_PILL[item.band],
                  )}
                >
                  {item.score}
                  <span className="sr-only">, {BAND_LABEL[item.band]}</span>
                </span>
              </a>
            </li>
          ))}
          <li className="ml-auto">
            <a
              href="#options"
              data-jump="options"
              aria-current={active === "options" ? "location" : undefined}
              className={linkClass(active === "options")}
            >
              Your options
              <span aria-hidden className="btn-arrow">
                &rarr;
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
