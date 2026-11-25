import Image from "next/image";

import { FeatureIcon } from "@/components/ui/FeatureIcon";
import type { CoverTile, ResourceEntry } from "@/content/resources/types";
import { cn } from "@/lib/utils";

/**
 * A resource card's 16:10 cover (resources covers brief, 24 Nov 2026), in the
 * blog covers' house frame (public/blog/{slug}/cover.webp): a near-black
 * ground with the studio texture's diagonal light streaks, a short white line
 * top left, the `zenith digital` wordmark top right on the same baseline, and
 * a content panel inset from the edges and cropped by the bottom one.
 *
 * - `entry.image` set (a blog cover, an owner's designed cover): that image,
 *   nothing else.
 * - A platform pair (comparisons, migration guides): just the two marks in
 *   white on the textured ground, side by side. No line, no panel, no
 *   wordmark (owner's call, 24 Nov 2026): the logos say it all.
 * - Otherwise the frame with a panel drawn from `entry.art`: the calculator's
 *   default estimate or a checklist sheet.
 *
 * The streaks are the real texture asset at the strength the blog covers use
 * (measured: about 36% of the texture's brightness), not a CSS imitation.
 * Everything else is HTML, so it stays sharp and costs nothing to serve, and
 * it's sized in container units, so a featured card and a grid card show the
 * same composition at their own scale.
 *
 * Decorative: aria-hidden, and nothing in it the card's title and pill don't
 * already say. The box holds its 16:10 before anything loads, so nothing
 * shifts; on card hover the contents scale to 1.02 inside it (no layout
 * change; reduced motion turns the transition off).
 */
export function ResourceCover({ entry, size }: { entry: ResourceEntry; size: "featured" | "grid" }) {
  const sizes = size === "featured" ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";
  return (
    <div aria-hidden className="@container relative aspect-[16/10] overflow-hidden border-b border-light-border bg-black">
      <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        {entry.image ? (
          <Image src={entry.image.src} alt="" fill sizes={sizes} className="object-cover" />
        ) : (
          <Frame entry={entry} sizes={sizes} />
        )}
      </div>
    </div>
  );
}

function Frame({ entry, sizes }: { entry: ResourceEntry; sizes: string }) {
  const art = entry.art ?? { kind: "frame" as const, line: entry.title };
  const texture = (
    <Image src="/textures/studio-texture.jpg" alt="" fill sizes={sizes} className="object-cover opacity-[0.36]" />
  );

  if (art.kind === "pair") {
    return (
      <>
        {texture}
        <div className="absolute inset-0 flex items-center justify-center gap-[3cqw]">
          <Mark tile={art.left} />
          <span
            className={cn(
              // A fixed width, so the marks don't move when the web font swaps in.
              "w-[5cqw] shrink-0 text-center",
              art.joiner === "arrow"
                ? "arrow-glyph text-[4.4cqw] leading-none text-white/70"
                : "font-mono text-[2.4cqw] uppercase tracking-[0.08em] text-white/55",
            )}
          >
            {art.joiner === "arrow" ? "→" : art.joiner.vs}
          </span>
          <Mark tile={art.right} />
        </div>
      </>
    );
  }

  return (
    <>
      {texture}

      {/* The line and the wordmark sit on one baseline about 30% down, as on
          the blog covers; a two-line title grows upwards from it. */}
      <div className="absolute inset-x-[6.25%] bottom-[69.5%] flex items-end justify-between gap-[4cqw]">
        <p
          className={cn(
            "font-display font-medium leading-[1.12] tracking-tight text-white",
            "text-[4cqw]",
            art.kind === "frame" && "line-clamp-2 max-w-[60%]",
          )}
        >
          {art.line}
        </p>
        <p className="shrink-0 pb-[0.3cqw] font-display text-[2.7cqw] font-medium lowercase leading-none tracking-tight text-white">
          zenith digital
        </p>
      </div>

      {/* The panel: inset from the sides, cropped by the bottom edge. */}
      <div className="absolute inset-x-[6.25%] top-[40%] bottom-[-6%]">
        {art.kind === "estimate" ? (
          <div className="h-full border border-white/10 bg-bg px-[4.5cqw] pt-[3.4cqw] text-text">
            <p className="font-mono text-[1.9cqw] uppercase tracking-[0.06em] text-text-muted">{art.heading}</p>
            <ul className="mt-[1.6cqw] border-t border-white/10">
              {art.rows.map((row) => (
                <li key={row.label} className="flex items-baseline justify-between gap-[2cqw] border-b border-white/10 py-[1.3cqw]">
                  <span className="text-[2.3cqw] text-text-muted">{row.label}</span>
                  <span className="font-display text-[2.5cqw] font-medium">{row.value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-[1.8cqw] flex items-baseline justify-between gap-[2cqw]">
              <span className="font-mono text-[1.9cqw] uppercase tracking-[0.06em] text-text-muted">{art.total.label}</span>
              <span className="font-display text-[4.6cqw] font-medium leading-none tracking-tight text-white">
                {art.total.value}
              </span>
            </div>
          </div>
        ) : art.kind === "sheet" ? (
          <div className="h-full bg-light-bg px-[4.5cqw] pt-[3cqw]">
            <div className="flex h-[3.4cqw] items-center justify-end">
              {art.format ? (
                <span className="rounded-full border border-light-border px-[1.4cqw] py-[0.3cqw] font-mono text-[1.8cqw] uppercase tracking-[0.06em] text-light-muted">
                  {art.format}
                </span>
              ) : null}
            </div>
            <ul className="mt-[1.2cqw] border-t border-light-border">
              {art.items.map((item, i) => {
                const ticked = i < art.ticked;
                return (
                  <li key={item} className="flex items-center gap-[2cqw] border-b border-light-border py-[1.5cqw]">
                    <span
                      className={cn(
                        "flex h-[2.7cqw] w-[2.7cqw] shrink-0 items-center justify-center rounded-[0.5cqw] border",
                        ticked ? "border-accent bg-accent text-accent-ink" : "border-light-muted/60 bg-light-bg",
                      )}
                    >
                      {ticked ? <FeatureIcon name="check" className="h-[2cqw] w-[2cqw]" /> : null}
                    </span>
                    <span
                      className={cn(
                        "truncate font-display text-[2.4cqw] font-medium",
                        ticked ? "text-light-muted" : "text-light-text",
                      )}
                    >
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="h-full border border-white/10 bg-white/[0.04]" />
        )}
      </div>
    </>
  );
}

/**
 * One platform's mark, white on the dark ground, in a fixed slot so a pair
 * sits centred whatever the logos' shapes. Marks are sized by eye to carry
 * the same weight: a wide wordmark by width, a solid mark a little smaller,
 * a square mark by height. Every mark but an already-white one is filled
 * white with a filter, so the brand files stay untouched.
 */
function Mark({ tile }: { tile: CoverTile }) {
  return (
    <span className="flex h-[16cqw] w-[30cqw] shrink-0 flex-col items-center justify-center gap-[1.6cqw]">
      {tile.logo ? (
        // Plain <img>: the marks are tiny SVG and PNG files that need no
        // resizing, and a fixed-size next/image would fight the container units.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tile.logo}
          alt=""
          className={cn(
            "object-contain",
            tile.wide
              ? "w-[30cqw]"
              : tile.dense
                ? "h-[6.5cqw]"
                : tile.caption
                  ? // The Wix mark's file is square with the wordmark across its
                    // middle: pull the caption up past the empty top and bottom.
                    "-my-[3.6cqw] h-[12cqw]"
                  : "h-[9.5cqw]",
            !tile.white && "brightness-0 invert",
          )}
        />
      ) : tile.icon ? (
        <FeatureIcon name={tile.icon} className="h-[8.5cqw] w-[8.5cqw] text-white" />
      ) : null}
      {tile.caption ? (
        <span className="font-display text-[2.8cqw] font-medium leading-none text-white">{tile.caption}</span>
      ) : null}
    </span>
  );
}
