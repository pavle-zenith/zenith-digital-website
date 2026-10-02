import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { publicImageSize } from "@/lib/imageSize";
import { TickList } from "@/components/sections/private-doc/parts";
import { partnerShowcaseUi as ui } from "@/content/partner-showcase";
import type { PartnerShowcase, ShowcaseSlide } from "@/content/partner-showcase";
import { ServiceSlides, type SlideView } from "./ServiceSlides";

/**
 * The five services as full-width rows under shared hairlines, in the
 * content's order (landing pages first: it is what an ads client feels).
 *
 * Text and picture take equal halves from `lg`, the picture at the project
 * shots' own 4:3, and the text centred against it. Desktop alternates: odd rows text left and picture
 * right, even rows the reverse, so five rows read as a sequence rather than a
 * repeated card. On phones every row is picture first, then text, and never
 * alternates.
 *
 * The rows bleed to the rails so the rules run edge to edge, and the last row
 * draws no bottom rule: the next section's top rule is the separator
 * (DESIGN.md, No Double Hairline).
 */
export function ShowcaseServices({ services }: { services: PartnerShowcase["services"] }) {
  return (
    <Section id="services" tone="light" className="doc-anchor" frameClassName="!pt-14 !pb-0 md:!pt-24">
      <SectionHeader heading={services.heading} intro={services.intro} tone="light" />

      <ol role="list" className="frame-bleed divide-y divide-light-border border-t border-light-border">
        {services.items.map((item, i) => {
          const mediaLeft = i % 2 === 1;
          return (
            <li
              key={item.id}
              id={item.id}
              className="doc-anchor grid gap-8 px-[clamp(20px,4vw,64px)] py-12 md:py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20"
            >
              {/* min-w-0 on both cells: below lg the row is one implicit
                  column, and without it the slide track's intrinsic width
                  (every slide side by side) sets that column's width and
                  pushes the page sideways. */}
              <div className={cn("min-w-0 lg:row-start-1", mediaLeft ? "lg:col-start-2" : "lg:col-start-1")}>
                <p className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-label uppercase track-label text-light-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i === 0 ? (
                    <Pill accent tone="light">
                      {ui.firstServicePill}
                    </Pill>
                  ) : null}
                </p>
                <h3 className="mt-4 font-display text-h2 font-medium leading-tight tracking-tight text-balance">
                  {item.name}
                </h3>
                <p className="mt-3 text-body-lg italic text-light-muted">{item.when}</p>
                <p className="mt-5 text-body text-light-text">{item.description}</p>
                <TickList items={item.deliverables} columns={1} className="mt-8" />
              </div>

              {/* Picture: first on phones; beside the text from lg. */}
              <div
                className={cn(
                  "order-first min-w-0 lg:order-none lg:row-start-1",
                  mediaLeft ? "lg:col-start-1" : "lg:col-start-2",
                )}
              >
                <ServiceSlides service={item.name} slides={item.slides.map(withFocus)} />
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

/**
 * Where the square crop is anchored, read from the image itself at build time.
 * Wide shots (2:1 and up) are two browser windows side by side: anchor near the
 * left so the first window stays whole. Anything closer to square is centred.
 */
function withFocus(slide: ShowcaseSlide): SlideView {
  const size = publicImageSize(slide.image);
  const wide = size ? size.width / size.height >= 1.8 : false;
  return { ...slide, focus: wide ? "12% 50%" : "50% 50%" };
}
