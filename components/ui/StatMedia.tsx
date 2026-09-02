import Image from "next/image";

import { cn, servesRaw } from "@/lib/utils";

export type MediaStat = { value: string; label?: string };

/**
 * A project screenshot with its hard numbers attached. Used by the work strip
 * and the partner stories, which is why it lives here rather than being
 * duplicated in both: the two rendered the same markup and drifted apart.
 *
 * WHERE THE NUMBERS SIT IS RESPONSIVE, and that is the point of the component.
 * From sm up the stats ride the bottom edge of the shot in a translucent blur
 * bar, which looks the way it was designed to. On a phone the shot is only as
 * wide as the viewport, so that same bar covered most of the screenshot it was
 * supposed to be annotating. Below sm the stats drop underneath the image as a
 * solid light card instead, and the shot is left alone.
 *
 * The colour flip is required by the move: over the image the text is white on
 * dark glass, below it the text sits on a light surface and has to be dark ink
 * or it vanishes.
 */
export function StatMedia({
  src,
  alt,
  stats,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className,
}: {
  src?: string;
  alt: string;
  stats: MediaStat[];
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-light-border bg-light-surface">
        {src ? (
          <Image unoptimized={servesRaw(src)} src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        ) : null}
      </div>

      {stats.length ? (
        <div className="mt-3 flex flex-wrap gap-x-10 gap-y-3 rounded-[8px] border border-light-border bg-light-surface p-4 sm:absolute sm:inset-x-4 sm:bottom-4 sm:mt-0 sm:border-white/15 sm:bg-bg/55 sm:backdrop-blur-md">
          {stats.map((st) => (
            <div key={st.value}>
              <div className="font-display text-h3 font-medium leading-none tracking-tight text-light-text sm:text-white">
                {st.value}
              </div>
              {st.label ? (
                <div className="mt-1.5 max-w-[22ch] text-body leading-snug text-light-muted sm:text-white/70">
                  {st.label}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
