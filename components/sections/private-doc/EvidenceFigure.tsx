import Image from "next/image";

export type EvidenceImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** A narrower drawing of the same diagram, shown below `sm`. */
  small?: { src: string; width: number; height: number };
};

/**
 * One screenshot of the client's site, framed and captioned. The layout around
 * it (how many across, how wide) belongs to the section using it.
 *
 * A wide diagram can carry a `small` version drawn for phone width: below `sm`
 * the browser swaps it in through <picture>, so its text stays readable
 * instead of shrinking with the wide drawing. Print keeps the wide one.
 */
export function EvidenceFigure({ image, className }: { image: EvidenceImage; className?: string }) {
  /* Served straight from the private asset folder, which carries the noindex
     header; through the optimizer it would be re-served from /_next/image,
     where that header does not apply. */
  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      unoptimized
      className="h-auto w-full"
    />
  );
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-[6px] border border-light-border bg-light-bg">
        {image.small ? (
          <picture>
            <source
              media="(max-width: 639px)"
              srcSet={image.small.src}
              width={image.small.width}
              height={image.small.height}
            />
            {img}
          </picture>
        ) : (
          img
        )}
      </div>
      <figcaption className="mt-3 text-label tracking-normal text-light-muted">
        {image.caption}
      </figcaption>
    </figure>
  );
}
