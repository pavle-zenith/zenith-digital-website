import { CaseStudySlider } from "@/components/sections/CaseStudySlider";
import { caseStudyCards } from "@/content/case-studies";

/**
 * Related case studies — closes the detail page so it never dead-ends (the
 * byCrawford rule, as a track rather than a single next link). Same-industry
 * projects lead, the rest follow. The slider itself is the shared
 * CaseStudySlider; this wrapper only picks and orders the cards.
 */
export function CaseStudyRelated({ currentSlug }: { currentSlug: string }) {
  const current = caseStudyCards.find((c) => c.slug === currentSlug);
  const others = caseStudyCards.filter((c) => c.slug !== currentSlug);
  const items = current
    ? [
        ...others.filter((c) => c.industry === current.industry),
        ...others.filter((c) => c.industry !== current.industry),
      ]
    : others;

  return <CaseStudySlider heading="Related case studies" items={items} allCta />;
}
