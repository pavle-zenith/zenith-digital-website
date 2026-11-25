"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A figure that counts up once, the first time it scrolls into view.
 *
 * The server renders the final value, so the number is right without JS, in
 * the HTML an answer engine reads. After hydration a figure still below the
 * fold is set to zero (unseen), and on entering view runs up to its value
 * over 1.4s (ease-out), then stays; one already on screen is left alone. Only the number moves: "€1M+" keeps its "€" and "M+", and a value
 * with nothing worth counting ("Since 2019", a single digit) is left alone.
 * Reduced motion skips it entirely.
 *
 * NO SHIFT. The final value sits invisibly in the same grid cell as the
 * moving one, so the box is the finished figure's size from the first frame.
 * Assistive tech reads only the final value.
 */
export function CountUp({ value }: { value: string }) {
  const parts = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    const p = parse(value);
    if (!el || !p) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen when the page loads: leave the final figure be
    // rather than snap it to zero in front of the reader.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    // Still below the fold: start it at zero, unseen, ready to count.
    const zero = `${p.prefix}${(0).toFixed(p.decimals)}${p.suffix}`;
    setShown(zero);

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          const eased = 1 - Math.pow(1 - t, 3);
          const n = p.number * eased;
          setShown(t < 1 ? `${p.prefix}${n.toFixed(p.decimals)}${p.suffix}` : null);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  if (!parts) return <>{value}</>;

  return (
    <span ref={ref} className="inline-grid">
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {value}
      </span>
      <span className="col-start-1 row-start-1 tabular-nums" aria-hidden>
        {shown ?? value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

/**
 * "100+" -> 100 with suffix "+"; "5.96x" -> 5.96, two decimals; "€1M+" -> 1.
 * Returns null when there's nothing worth counting: no number, letters ahead
 * of it ("Since 2019"), or a single-digit whole number.
 */
function parse(value: string) {
  const m = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const [, prefix, num, suffix] = m;
  if (/[a-z]/i.test(prefix)) return null;
  const number = Number(num);
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  if (decimals === 0 && number < 10) return null;
  return { prefix, number, decimals, suffix };
}
