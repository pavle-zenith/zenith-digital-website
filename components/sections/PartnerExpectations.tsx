import { Section } from "@/components/ui/Section";
import { pExpectations } from "@/content/partnerships";

/**
 * Partner expectations — the short honesty section. Heading left; a
 * hairline-divided list of the three asks right, with the closing line under it.
 */
export function PartnerExpectations() {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <h2 className="max-w-md font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {pExpectations.heading}
        </h2>

        <div>
          <ul className="divide-y divide-light-border border-y border-light-border">
            {pExpectations.items.map((item) => (
              <li
                key={item}
                className="py-5 text-body-lg font-medium leading-snug"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-body text-light-muted">
            {pExpectations.closing}
          </p>
        </div>
      </div>
    </Section>
  );
}
