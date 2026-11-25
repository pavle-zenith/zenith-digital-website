import Link from "next/link";

import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { ResourceCover } from "@/components/sections/resources/ResourceCover";
import type { ResourceEntry } from "@/content/resources/types";
import { cn } from "@/lib/utils";

export type TypeMeta = { label: string; icon: string };

/** "Nov 2026": always three letters (en-GB writes September as "Sept"). */
function monthYear(iso: string) {
  return new Date(iso)
    .toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" })
    .replace("Sept", "Sep");
}

/**
 * One resource on the hub: the case-study grid's card (rounded card, 1px
 * rule, light ground, the title turning ink on hover) with a 16:10 cover on
 * top in the blog covers' house frame (ResourceCover), then the type pill,
 * title, two lines of description and the date. The cover carries the
 * identity, so the description stays short. `large` is the featured size:
 * the same card with a bigger title.
 *
 * The whole card is one link. No nested anchors.
 */
export function ResourceCard({
  entry,
  type,
  updatedLabel,
  large = false,
}: {
  entry: ResourceEntry;
  type: TypeMeta;
  updatedLabel: string;
  large?: boolean;
}) {
  return (
    <Link
      href={entry.href}
      className="type-card group flex h-full flex-col overflow-hidden rounded-card border border-light-border bg-light-bg transition hover:border-light-muted/50"
    >
      <ResourceCover entry={entry} size={large ? "featured" : "grid"} />
      <span className={cn("flex flex-1 flex-col", large ? "p-6 md:p-7" : "p-6")}>
        <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-light-border px-2.5 py-0.5 font-mono text-label uppercase track-label text-light-muted">
          <FeatureIcon name={type.icon} className="h-3.5 w-3.5" />
          {type.label}
        </span>
        <span
          className={cn(
            "block font-display font-medium leading-snug tracking-tight text-light-text transition group-hover:text-accent",
            large ? "mt-5 text-[clamp(1.375rem,2.2vw,1.75rem)]" : "mt-4 text-body-lg",
          )}
        >
          {entry.title}
        </span>
        {/* No `block` here: it would override line-clamp's display and unclamp it. */}
        <span className="mt-2 line-clamp-2 text-body leading-snug text-light-muted">{entry.description}</span>
        <span className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="font-mono text-label uppercase track-label text-light-muted">
            {entry.updated ? (
              <>
                {updatedLabel} <time dateTime={entry.updated}>{monthYear(entry.updated)}</time>
              </>
            ) : null}
          </span>
          <span aria-hidden className="btn-arrow font-display text-body font-medium text-light-text">
            &rarr;
          </span>
        </span>
      </span>
    </Link>
  );
}
