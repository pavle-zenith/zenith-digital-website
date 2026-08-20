import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { cn, isInternal } from "@/lib/utils";
import type { CtaLink, Tone } from "@/lib/types";

/**
 * THE IN-BODY CTA. Every ask inside a page body uses this: the migration
 * guides' contextual CTAs at the friction points, the blog's `calloutCta`
 * blocks, and the blog's audit capture. One component, so a reader learns what
 * an ask looks like here rather than meeting a different treatment per content
 * type.
 *
 * TWO VARIANTS, one shape.
 *
 * `card` (default) is the quiet one: a bordered surface panel. It is what the
 * guides use, where an ask interrupts a technical explanation and should not
 * shout over it.
 *
 * `banner` is the miniature of the sitewide CtaBanner: same photograph, same
 * bottom-heavy scrim, same bottom-anchored white text with the button off to
 * the right, at a fraction of the height. The blog uses it, so a post's asks
 * read as the site's asks rather than as boxes in an article. It is
 * deliberately NOT a second design: if the two ever diverge, this is a bug.
 *
 * The banner has SQUARE corners and no margin of its own, because it is meant
 * to run edge to edge and a rounded corner against a rail reads as a mistake.
 * Bleeding it is the caller's job: the blog's in-body asks cancel their
 * column's gutter, PostAudit cancels the frame's.
 */
export function CtaBand({
  heading,
  paragraph,
  ctas,
  tone,
  variant = "card",
  image = "/textures/studio-texture.jpg",
}: {
  heading: string;
  paragraph: string;
  ctas: CtaLink[];
  tone: Tone;
  variant?: "card" | "banner";
  /** Banner only. Defaults to the texture the sitewide banner uses. */
  image?: string;
}) {
  if (variant === "banner") {
    return (
      <div className="relative isolate overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
          aria-hidden
        />
        {/* Bottom-heavy, exactly as the full-size banner, so the text sitting
            low against it reads at any crop. */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/25"
          aria-hidden
        />

        {/* Content sits at the BOTTOM of a minimum height, as on the
            full-size banner. That is what makes it read as the same object
            scaled down rather than a differently proportioned box. */}
        <div className="relative flex min-h-[300px] flex-col justify-end p-8 md:min-h-[340px] md:p-12">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-xl">
              {/* A paragraph, not a heading: these sit between H2 sections and
                would otherwise inject a phantom level into the outline the
                chapters column is built from. */}
              <p className="font-display text-h3 font-medium leading-snug tracking-tight text-balance text-white">
                {heading}
              </p>
              <p className="mt-3 text-body leading-relaxed text-white/75">
                {paragraph}
              </p>
            </div>

            {/* The accent is a near-black that vanishes on a dark scrim
                (CLAUDE.md §15), so the ask takes a white fill here. */}
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              {ctas.map((cta) => (
                <BannerButton key={cta.href} cta={cta} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "rounded-card border p-6 md:p-7",
        dark
          ? "border-border bg-surface"
          : "border-light-border bg-light-surface",
      )}
    >
      <p className="font-display text-body-lg font-medium">{heading}</p>
      <p
        className={cn(
          "mt-2 text-body leading-relaxed",
          dark ? "text-text-muted" : "text-light-muted",
        )}
      >
        {paragraph}
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {ctas.map((cta) => (
          <Button key={cta.href} cta={cta} tone={tone} />
        ))}
      </div>
    </div>
  );
}

/**
 * White-filled ask for the banner. Not the shared Button: that one fills with
 * the accent, which is a near-black and disappears against the scrim. Keeps
 * the body-face arrow the rest of the site uses (CLAUDE.md §15).
 */
function BannerButton({ cta }: { cta: CtaLink }) {
  const secondary = cta.variant === "secondary";
  const cls = cn(
    "group inline-flex w-full items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-body font-medium transition active:scale-[.99] sm:w-auto",
    secondary
      ? "border border-white/30 text-white hover:bg-white/10"
      : "bg-white text-bg hover:bg-white/90",
  );
  const label = (
    <>
      {cta.label}{" "}
      <span aria-hidden className="btn-arrow">
        &rarr;
      </span>
    </>
  );

  if (isInternal(cta.href)) {
    return (
      <Link href={cta.href} className={cls}>
        {label}
      </Link>
    );
  }
  return (
    <a href={cta.href} className={cls} rel="noopener" target="_blank">
      {label}
    </a>
  );
}
