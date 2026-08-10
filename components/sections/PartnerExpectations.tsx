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
                className="flex items-start gap-3 py-5 text-body-lg font-medium leading-snug"
              >
                <CircleCheck />
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

/** Circled check per ask — same register as the pricing checklists. */
function CircleCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-1 h-5 w-5 shrink-0 text-light-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12l2.5 2.5 4.5-4.5" />
    </svg>
  );
}
