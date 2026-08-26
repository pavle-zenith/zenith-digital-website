import Image from "next/image";

import { Section } from "@/components/ui/Section";

/**
 * A full-page screenshot inside a laptop lid that scrolls on its own, only
 * while the pointer is over it. The site is a static image: nothing is
 * interactive and there is no scrollbar, which is the point. It shows a whole
 * design in one band without the reader leaving the page.
 *
 * Placed after the results and before the testimonial: the numbers have just
 * made the case, so this is the band that shows what they were made by, and
 * the client's own words land straight after it.
 *
 * It is a real overflow container, not a scroll-linked transform. The browser
 * already does exactly what's wanted here: a wheel over the element scrolls the
 * element, a wheel anywhere else scrolls the page, and a swipe works on touch
 * without a line of JavaScript. An earlier version tied the pan to page scroll
 * and read as a fast, uncontrollable blur, because a 5:1 image has to travel
 * its whole height in one viewport pass.
 *
 * `overscroll-contain` stops the page from taking over at the ends, so a scroll
 * that starts inside the frame finishes inside it. The scrollbar is hidden in
 * both engines: it is a picture of a website, and a live scrollbar on it reads
 * as chrome that belongs to the screenshot.
 *
 * THE FRAME is artwork, not CSS. /laptop-full.webp is the supplied mockup with
 * its transparent margins trimmed and nothing else removed. Its screen is a
 * transparent cut-out, so the screenshot is laid UNDER the artwork and shows
 * through the hole, and the notch draws over the top of the shot exactly as it
 * would on a real machine. Trimming took the asset from 4.3MB to 70KB.
 *
 * THE BASE IS KEPT AND THEN CLIPPED. An earlier version cropped the artwork at
 * the lid, which ended the laptop on a hard flat edge floating mid-section and
 * read as a cropped image. Here the whole machine is drawn and the section's
 * bottom edge cuts it, partway through the base: the laptop peeks up from the
 * boundary and reads as continuing below the fold, which is the difference
 * between a frame and a crop. The section carries no bottom padding, so that
 * cut lands exactly on the section boundary.
 *
 * `src` must be a RAW capture with no browser chrome baked in: the
 * /portfolio-slider and /case-study-grid assets carry their own mockup frame
 * and would end up framed twice.
 *
 * Capture at a 1440px viewport in Chrome DevTools ("Capture full size
 * screenshot"). If the capture comes off a 2x display, downsample it to 1440
 * wide before committing: a tall page at DPR 2 runs past 40 megapixels, which
 * iOS Safari refuses to decode, and 1440 against a screen rendering ~1,060px is
 * already sharper than 1:1.
 */

/** The artwork's own pixel size, so the frame reserves the right box. */
const LID = { src: "/laptop-full.webp", width: 2400, height: 1449 };

/**
 * How much of the artwork's height stays visible. The base occupies the last
 * 6.8%, so 96% cuts roughly 64px into it: enough silver to read as a real
 * machine continuing past the edge, not enough to show the keyboard.
 */
const VISIBLE = 0.96;

/**
 * The transparent screen cut-out, measured off the artwork's alpha channel:
 * x 391→3413, y 56→2018 of the 3803×2296 trim. Held as percentages so the
 * screen tracks the frame at every width.
 */
const SCREEN = {
  left: "10.2814%",
  top: "2.4390%",
  width: "79.4636%",
  height: "85.4530%",
};

export function CaseStudyScrollShot({
  src,
  alt,
  /**
   * Sits above the frame. It earns its place as an affordance, not a label: a
   * static picture of a laptop gives no sign that the screen inside it moves,
   * and the reader has to be told before they will try. Overridable per study
   * for a site where "finished" is the wrong word.
   */
  caption = "Scroll the finished site",
  /** Natural pixel size of the capture, so Next reserves the right box. */
  width,
  height,
  tone = "light",
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  tone?: "light" | "dark";
}) {
  return (
    <Section tone={tone} frameClassName="relative !pt-14 !pb-0 md:!pt-24">
      {/* Inverted studio texture, the ground the page heroes use. Confined to
          the frame column rather than the viewport, so it stops at the side
          rails like every other textured band on the site. */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.28] invert"
        />
        {/* Lifts the centre back toward white so the lid sits on a clean ground
            while the texture still reads at the edges. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 55%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 88%, transparent) 50%, color-mix(in srgb, var(--color-light-bg) 55%, transparent) 100%)",
          }}
        />
      </div>

      {/* Affordance line. Mono label, the register every other caption on the
          site uses, with a scroll cue drawn rather than set as a glyph. */}
      <p className="relative mb-6 flex items-center justify-center gap-2 font-mono text-label uppercase track-label text-light-muted md:mb-8">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 5v14m0 0l-5-5m5 5l5-5" />
        </svg>
        {caption}
      </p>

      {/* The clip window: the artwork is drawn at full height inside it and
          the last 4% falls outside, so the machine is cut by the section edge
          rather than by its own asset boundary. */}
      <div
        className="relative mx-auto w-full max-w-[880px] overflow-hidden"
        style={{ aspectRatio: `${LID.width} / ${LID.height * VISIBLE}` }}
      >
      <div
        className="absolute inset-x-0 top-0"
        style={{ aspectRatio: `${LID.width} / ${LID.height}` }}
      >
        {/*
         * The screen, under the artwork. tabIndex makes the region reachable by
         * keyboard, which is what a scrollable box owes anyone not using a
         * pointer: focus it, then arrow or page down through the screenshot.
         */}
        <div
          tabIndex={0}
          role="group"
          aria-label={`${alt}. Scroll inside this frame to see the full page.`}
          style={SCREEN}
          className="absolute overflow-y-auto overscroll-contain bg-white outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-scrollbar]:hidden"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 880px) 74vw, 700px"
            className="block h-auto w-full"
          />
        </div>

        {/* The frame, over the screen. pointer-events-none is load-bearing:
            without it the artwork swallows the wheel and the shot never
            scrolls. */}
        <Image
          src={LID.src}
          alt=""
          fill
          sizes="(max-width: 880px) 96vw, 880px"
          aria-hidden
          className="pointer-events-none select-none object-contain"
        />
      </div>
      </div>
    </Section>
  );
}
