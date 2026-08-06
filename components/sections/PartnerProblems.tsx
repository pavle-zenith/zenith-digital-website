import { Section } from "@/components/ui/Section";
import { pProblems } from "@/content/partnerships";

/**
 * Problem-first beat between the hero and the two tracks — three agency
 * situations in a hairline-topped row (same register as the process steps),
 * closed by one display-weight punchline. Headerless by design; an sr-only
 * heading keeps the outline intact.
 */
export function PartnerProblems() {
  return (
    <Section tone="light" frameClassName="!py-20">
      <h2 className="sr-only">{pProblems.srHeading}</h2>

      <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
        {pProblems.items.map((item) => (
          <div key={item.title} className="border-t border-light-border pt-6">
            <h3 className="font-display text-body-lg font-medium">
              {item.title}
            </h3>
            <p className="mt-2 text-body leading-snug text-light-muted">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-14 max-w-3xl font-display text-h3 font-medium leading-snug tracking-tight text-balance">
        {pProblems.closing}
      </p>
    </Section>
  );
}
