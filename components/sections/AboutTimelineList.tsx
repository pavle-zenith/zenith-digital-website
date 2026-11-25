"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { cn } from "@/lib/utils";
import type { AboutTimelineItem } from "@/content/about";

/**
 * The timeline's rows, on the navy band.
 *
 * LAYOUT. A line runs down the left with a dot per year. From lg each row is
 * three columns: the year, the dated fact, and that year's evidence as a
 * picture (a logo row, the Legend badge with the 100+ figure, or this site in
 * a browser frame). A row with no picture lets the fact run across both. On
 * phones the picture sits under the fact.
 *
 * MOTION (desktop and phone alike, all scroll-driven, nothing on a timer).
 * The line fills in white as you read down it, and each dot fills once the
 * fill reaches it, its year coming up from muted to full ink. From lg the
 * year and its dot are sticky inside their row, so the dot rides down the
 * line at the tip of the fill until the row has passed; the fill aims at
 * that sticky dot, so the two always meet. On phones the fill aims at the
 * middle of the screen. Reduced motion keeps the fill (it's position, not
 * animation) and drops the colour transitions with the global override.
 *
 * Without JS nothing is filled and every row still reads in full: the
 * muted years are 7.5:1 on navy.
 */
export function AboutTimelineList({
  items,
  host,
}: {
  items: AboutTimelineItem[];
  host: string;
}) {
  const list = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const el = list.current;
    const rail = line.current;
    if (!el || !rail) return;
    const dots = [...el.querySelectorAll<HTMLElement>("[data-dot]")];
    const sticky = el.querySelector<HTMLElement>("[data-year]");
    let raf = 0;

    const update = () => {
      raf = 0;
      const box = rail.getBoundingClientRect();
      // Where the fill aims: the sticky dot's resting line from lg (its
      // sticky `top` plus half its row), the middle of the screen below.
      // (A relative year reports `top: 0px`, so test the position itself.)
      const style = sticky ? getComputedStyle(sticky) : null;
      const aim =
        sticky && style?.position === "sticky"
          ? parseFloat(style.top) + sticky.offsetHeight / 2
          : window.innerHeight / 2;
      const fill = Math.min(1, Math.max(0, (aim - box.top) / box.height));
      el.style.setProperty("--tl-fill", String(fill));
      const n = dots.filter((d) => {
        const r = d.getBoundingClientRect();
        return r.top + r.height / 2 <= aim + 1;
      }).length;
      setReached((prev) => (prev === n ? prev : n));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <ol ref={list} className="relative">
      {/* The line, and its fill. Both run under the dots' centres (5px in
          from the left, the middle of an 11px dot), starting at the first
          dot (half a year's height down) and running on past the last row:
          the record isn't finished. */}
      <span
        ref={line}
        aria-hidden
        className="absolute bottom-0 left-[5px] top-[calc(var(--text-h1)/2)] w-px bg-border"
      />
      <span
        aria-hidden
        className="absolute bottom-0 left-[5px] top-[calc(var(--text-h1)/2)] w-px origin-top bg-text"
        style={{ transform: "scaleY(var(--tl-fill, 0))" }}
      />

      {items.map((item, i) => {
        const on = i < reached;
        const current = on && i === reached - 1;
        const visual = <Visual item={item} host={host} />;
        const hasVisual = Boolean(item.image || item.badge || item.figure || item.marks);
        return (
          <li
            key={item.year}
            className={cn(
              // From lg the space under a row is split. Part is the cells'
              // (CELL): a sticky year can only travel through its row's
              // content box, so that part gives it room to ride. The rest is
              // the row's own padding, which the year can't enter, so a year
              // that has ridden to the end of its row still stops well clear
              // of the next one.
              "group/row relative grid gap-6 pb-14 pl-10 last:pb-0 md:pl-14 lg:gap-10 lg:pb-16",
              hasVisual
                ? "lg:grid-cols-[9rem_minmax(0,1fr)_minmax(0,1.15fr)]"
                : "lg:grid-cols-[9rem_minmax(0,1fr)]",
            )}
          >
            {/* The year, sticky in its row from lg, with its dot. The dot is
                positioned back onto the line (the row's own left padding). */}
            <div
              data-year
              className="relative self-start lg:sticky lg:top-[calc(7rem+var(--announce-h))]"
            >
              <span
                data-dot
                aria-hidden
                className={cn(
                  "absolute -left-10 top-1/2 h-[11px] w-[11px] -translate-y-1/2 rounded-full border transition-colors duration-500 md:-left-14",
                  on ? "border-text bg-text" : "border-text-muted/50 bg-bg",
                  current && "outline outline-1 outline-offset-[3px] outline-text/40",
                )}
              />
              <span
                className={cn(
                  "block font-display text-h1 font-medium leading-none tracking-tight transition-colors duration-500",
                  on ? "text-text" : "text-text-muted",
                )}
              >
                {item.year}
              </span>
            </div>

            <div className={CELL}>
              <p className="max-w-[60ch] text-body-lg leading-relaxed text-text-muted">
                {item.body}
              </p>
              {item.selfEvident ? (
                <p className="mt-6 font-mono text-label uppercase track-label text-text">
                  {item.selfEvident}
                </p>
              ) : null}
            </div>

            {hasVisual ? <div className={cn("min-w-0", CELL)}>{visual}</div> : null}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * The fact and picture cells. From lg they carry part of the space under the
 * row (none under the last), which gives the sticky year room to travel.
 */
const CELL = "lg:pt-1 lg:pb-12 lg:group-last/row:pb-0";

/**
 * The year's evidence, by what it has: this site in a browser frame, the
 * badge beside a figure, or the year's logos at a size you can read.
 */
function Visual({ item, host }: { item: AboutTimelineItem; host: string }) {
  if (item.image) {
    return (
      <BrowserFrame address={host} tone="dark">
        <div className="relative aspect-[16/10]">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 1440px) 640px, (min-width: 1024px) 45vw, 90vw"
            className="object-cover object-top"
          />
        </div>
      </BrowserFrame>
    );
  }

  if (item.badge || item.figure) {
    return (
      <div className="flex items-center gap-8">
        {item.badge ? (
          <Image
            src={item.badge.src}
            alt={item.badge.alt}
            width={item.badge.width}
            height={item.badge.height}
            unoptimized
            className="h-24 w-auto shrink-0 object-contain md:h-28"
          />
        ) : null}
        {item.figure ? (
          <div>
            <div className="font-display text-[clamp(3.5rem,6vw,5.5rem)] font-medium leading-none tracking-tight text-text">
              {item.figure.value}
            </div>
            <div className="mt-2 text-body text-text-muted">{item.figure.label}</div>
          </div>
        ) : null}
      </div>
    );
  }

  if (item.marks) {
    const one = item.marks.length === 1;
    return (
      <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
        {item.marks.map((mark) => (
          <Image
            key={mark.src}
            src={mark.src}
            alt={mark.alt}
            width={240}
            height={64}
            className={cn(
              "w-auto object-contain opacity-90",
              one ? "h-12 md:h-14" : "h-7 md:h-9",
              // A coloured mark with no white file, turned white for navy.
              mark.knockout && "brightness-0 invert",
            )}
          />
        ))}
      </div>
    );
  }

  return null;
}
