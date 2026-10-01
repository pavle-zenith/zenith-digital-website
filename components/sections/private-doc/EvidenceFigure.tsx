import Image from "next/image";

export type EvidenceImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

/**
 * One screenshot of the client's site, framed and captioned. The layout around
 * it (how many across, how wide) belongs to the section using it.
 */
export function EvidenceFigure({ image, className }: { image: EvidenceImage; className?: string }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-[6px] border border-light-border bg-light-bg">
        {/* Served straight from the private asset folder, which carries the
            noindex header; through the optimizer it would be re-served from
            /_next/image, where that header does not apply. */}
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          unoptimized
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-label tracking-normal text-light-muted">
        {image.caption}
      </figcaption>
    </figure>
  );
}
