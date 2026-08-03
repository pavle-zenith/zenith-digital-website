"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

/**
 * Draggable before/after comparison (mouse + touch via pointer events). The
 * "after" image fills the card; the "before" image sits on top and is revealed
 * left of the handle with a clip-path inset. A 44px knob rides the divider and
 * doubles as a keyboard slider (arrow keys). Shared component — reused on
 * /case-studies later, so keep it page-agnostic.
 */
export function BeforeAfterSlider({
  title,
  before,
  after,
}: {
  title: string;
  before: string;
  after: string;
}) {
  const [pct, setPct] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) update(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPct((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPct((p) => Math.min(100, p + 5));
  };

  return (
    <figure className="flex flex-col gap-4">
      <div
        ref={ref}
        className="relative aspect-[4/3] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-card border border-border"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* After (base layer) */}
        <Image
          src={after}
          alt={`${title} website after the Zenith rebuild`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />
        {/* Before (top layer, revealed left of the handle) */}
        <Image
          src={before}
          alt={`${title} website before the rebuild`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          draggable={false}
        />

        {/* Corner labels */}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] uppercase track-label text-white backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] uppercase track-label text-white backdrop-blur-sm">
          After
        </span>

        {/* Divider + knob */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-white/90"
          style={{ left: `${pct}%` }}
          aria-hidden
        />
        <button
          type="button"
          role="slider"
          aria-label={`Compare ${title} before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-light-border bg-white text-light-text shadow-none"
          style={{ left: `${pct}%` }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />
          </svg>
        </button>
      </div>
      <figcaption className="font-display text-body-lg font-medium">{title}</figcaption>
    </figure>
  );
}
