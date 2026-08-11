import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * Pricing — light. Publishing the number is the differentiator, so the price
 * gets the display treatment and the three things that move it sit beside it.
 * Pages priced per project omit `from` and the note has to justify why.
 */
export function ServicePagePricing({ data }: { data: ServicePageContent }) {
  const { pricing } = data;

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20">
        <div>
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {pricing.heading}
          </h2>

          {pricing.from ? (
            <p className="mt-8">
              <span className="block font-display text-display font-medium leading-none tracking-tight">
                {pricing.from}
              </span>
              {pricing.fromNote ? (
                <span className="mt-3 block font-mono text-label uppercase track-label text-light-muted">
                  {pricing.fromNote}
                </span>
              ) : null}
            </p>
          ) : null}

          <p className="mt-6 max-w-md text-body-lg leading-relaxed text-light-muted">
            {pricing.note}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button cta={pricing.cta} tone="light" />
            <Button cta={pricing.ctaSecondary} tone="light" />
          </div>
        </div>

        <div>
          <p className="font-mono text-label uppercase track-label text-light-muted">
            What moves the number
          </p>
          <dl className="mt-4 divide-y divide-light-border border-t border-light-border">
            {pricing.drivers.map((driver) => (
              <div key={driver.title} className="py-5">
                <dt className="font-display text-body-lg font-medium">
                  {driver.title}
                </dt>
                <dd className="mt-2 max-w-xl text-body leading-relaxed text-light-muted">
                  {driver.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
