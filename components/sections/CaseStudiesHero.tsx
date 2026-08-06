import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { csHero } from "@/content/case-studies";

/**
 * /case-studies hero — light and compact (Braintrust register): one bold
 * two-tone statement H1 (primary sentence in ink, continuation muted) with the
 * two conversion CTAs bottom-right. The support line and stat row are parked
 * in the content file.
 */
export function CaseStudiesHero() {
  return (
    <Section tone="light" divide={false} frameClassName="!py-20">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <h1 className="max-w-3xl font-display text-h2 font-medium leading-[1.15] tracking-tight text-balance">
          {csHero.heading}{" "}
          <span className="text-light-muted">{csHero.headingMuted}</span>
        </h1>

        <div className="flex flex-wrap gap-3 lg:shrink-0 lg:pb-1">
          {csHero.ctas.map((cta) => (
            <Button key={cta.href} cta={cta} tone="light" />
          ))}
        </div>
      </div>
    </Section>
  );
}
