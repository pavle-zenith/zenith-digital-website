import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * Lead testimonial — placed right after the detail-page hero (Flow Ninja
 * placement): the client's voice lands before our narrative, so everything
 * after it reads as confirmed rather than claimed. The page skips this
 * section entirely when the study has no testimonial.
 */
export function CaseStudyLeadQuote({
  testimonial,
}: {
  testimonial: NonNullable<CaseStudyDetail["testimonial"]>;
}) {
  return (
    <Section tone="dark" frameClassName="!py-14 md:!py-20">
      <figure className="mx-auto max-w-3xl text-center">
        <blockquote className="font-display text-h3 font-medium leading-snug text-balance md:text-[1.75rem]">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-8 flex items-center justify-center gap-3">
          {testimonial.avatar ? (
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[6px] border border-border">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
          ) : null}
          <span className="text-left">
            <span className="flex items-center gap-1.5 font-display font-medium">
              {testimonial.name}
              <VerifiedCheck />
            </span>
            <span className="block text-body text-text-muted">
              {testimonial.role}
            </span>
          </span>
        </figcaption>
      </figure>
    </Section>
  );
}
