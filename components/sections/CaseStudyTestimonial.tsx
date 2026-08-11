import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * Highlighted client testimonial, closing the study before the related
 * slider. No card or fill: the quote sits centered in the open section with
 * room around it, then avatar, name with the verified tick, and role. The
 * page skips the section when the study has no testimonial.
 */
export function CaseStudyTestimonial({
  testimonial,
}: {
  testimonial: NonNullable<CaseStudyDetail["testimonial"]>;
}) {
  return (
    <Section tone="light" frameClassName="!py-20 md:!py-32">
      <figure className="mx-auto max-w-3xl text-center">
        <blockquote className="font-display text-h3 font-medium leading-snug tracking-tight text-balance md:text-[1.75rem]">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-10 flex items-center justify-center gap-3">
          {testimonial.avatar ? (
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[6px] border border-light-border">
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
              <VerifiedCheck className="text-light-text" />
            </span>
            <span className="block text-body text-light-muted">
              {testimonial.role}
            </span>
          </span>
        </figcaption>
      </figure>
    </Section>
  );
}
