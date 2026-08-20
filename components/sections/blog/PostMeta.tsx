import Image from "next/image";

import { MetaStrip } from "@/components/sections/MetaStrip";
import { blogIndex, post as furniture } from "@/content/blog";
import { founderCore } from "@/content/founder";
import { readingMinutes } from "@/lib/blog";
import { formatLongDate } from "@/lib/utils";
import type { Post } from "@/sanity/lib/types";

/**
 * The byline, as the facts strip the case studies already use for their
 * project facts. Same component, so an article and a case study state their
 * facts in one voice rather than two.
 *
 * The author leads, with his photo: name and photo come from `founderCore`,
 * the same record the founder section and the Person schema read, so the three
 * cannot drift.
 *
 * "Reviewed by" and "Last verified" were dropped (owner decision, 20 August
 * 2026). The document keeps `lastVerified` and it still feeds `dateModified`
 * in the BlogPosting markup, so nothing is lost from the machine-readable
 * side.
 */
export function PostMeta({ data }: { data: Post }) {
  const { meta } = furniture;

  return (
    <MetaStrip
      rows={[
        {
          label: meta.writtenByLabel,
          value: founderCore.name,
          // A rounded square rather than a circle: the site's chips are 6px
          // squares (CLAUDE.md §15). It fills its slot, and MetaStrip sizes
          // that slot to the full height of the cell.
          media: (
            <Image
              src={founderCore.image}
              alt=""
              width={128}
              height={128}
              className="h-full w-full rounded-[6px] border border-light-border object-cover"
            />
          ),
        },
        {
          label: meta.publishedLabel,
          value: formatLongDate(data.publishedAt),
        },
        {
          label: meta.readTimeLabel,
          value: `${readingMinutes(data.bodyChars)} ${blogIndex.readTimeSuffix}`,
        },
      ]}
    />
  );
}
