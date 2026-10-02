import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { publicImageSize } from "@/lib/imageSize";
import { partnerShowcaseUi as ui } from "@/content/partner-showcase";
import type { PartnerShowcase } from "@/content/partner-showcase";

/**
 * "Do you build on my platform?", answered top to bottom: the heading and its
 * line, then one ruled row per group, the group's name on the left and its
 * tools flowing beside it. Stacked rather than side by side, so a group can
 * hold as many tools as it needs without the columns going uneven.
 *
 * Tools are flat tiles with no border: they are labels, and a bordered box
 * here read as one more filter button. Every row ends on "& more", the same
 * size but unfilled and muted, so it reads as "and others" rather than as one
 * more tool.
 *
 * The logo files are white marks made for navy; here they are drawn solid dark
 * (`brightness-0`). A logo that is a wordmark carries its own name; one that is
 * a glyph (Framer's, Webflow's) gets the name set beside it, because a reader
 * who isn't technical may not know the mark. That split, and the logo's width
 * and height, are read from the file at build time, so a swapped logo needs no
 * code change and never shifts the layout while it loads. A logo that can't
 * be read shows as text.
 */
export function ShowcasePlatforms({ tech }: { tech: PartnerShowcase["tech"] }) {
  return (
    <Section id="platforms" tone="light" className="doc-anchor" frameClassName="!pt-14 !pb-0 md:!pt-24">
      <SectionHeader heading={tech.heading} intro={tech.line} tone="light" />

      <div className="frame-bleed-md divide-y divide-light-border border-t border-light-border">
        {tech.groups.map((group) => (
          <div
            key={group.label}
            className="grid gap-4 py-6 md:grid-cols-[14rem_minmax(0,1fr)] md:items-center md:gap-8 md:px-[clamp(20px,4vw,64px)] md:py-7"
          >
            <h3 className="font-display text-body-lg font-medium">{group.label}</h3>
            <ul role="list" className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item.name}>
                  <PlatformChip name={item.name} logo={item.logo} />
                </li>
              ))}
              <li>
                <span className="flex min-h-12 items-center px-2 text-body font-medium text-light-muted">
                  {ui.moreTools}
                </span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function PlatformChip({ name, logo }: { name: string; logo?: string }) {
  const size = logo ? publicImageSize(logo) : null;
  const glyph = size ? size.width / size.height < 2 : false;

  return (
    <span className="flex min-h-12 items-center gap-2.5 rounded-[6px] bg-light-surface px-4 py-1.5">
      {logo && size ? (
        <Image
          src={logo}
          alt={glyph ? "" : name}
          width={size.width}
          height={size.height}
          unoptimized
          // Wordmark files carry wide transparent margins (the mark is about
          // half the file's height), so they are drawn taller than a glyph.
          className={glyph ? "h-5 w-auto shrink-0 brightness-0" : "h-9 w-auto shrink-0 brightness-0"}
        />
      ) : null}
      {!logo || !size || glyph ? (
        <span className="min-w-0 text-body font-medium text-light-text">{name}</span>
      ) : null}
    </span>
  );
}
