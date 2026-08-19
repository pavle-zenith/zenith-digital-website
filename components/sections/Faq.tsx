import { Section } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { faqSection } from "@/content/home";
import type { CtaLink } from "@/lib/types";

type FaqData = {
  heading: string[];
  subhead: string;
  ctas: CtaLink[];
  items: { q: string; a: string }[];
};

/**
 * FAQ (Trueform layout). Left: sticky two-line heading, subhead, and two buttons.
 * Right: an accordion where each question is its own bordered rounded card that
 * expands to reveal the answer. Feeds FAQPage JSON-LD on the page. Defaults to
 * the homepage content; other pages pass their own `data` (e.g. /book-a-call).
 */
export function Faq({ data = faqSection }: { data?: FaqData }) {
  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Left: sticky heading */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight">
            {data.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-md text-body-lg font-medium text-light-muted">
            {data.subhead}
          </p>
          {data.ctas.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {data.ctas.map((cta) => (
                <Button key={cta.href} cta={cta} tone="light" />
              ))}
            </div>
          ) : null}
        </div>

        {/* Right: accordion of bordered cards */}
        <FaqAccordion items={data.items} />
      </div>
    </Section>
  );
}
