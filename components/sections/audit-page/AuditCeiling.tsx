import { Section } from "@/components/ui/Section";
import type { AuditPage } from "@/content/audits/types";

/**
 * Why the cheaper option has a limit.
 *
 * Deliberately plain: no warning colour, no alert styling, no icon. This is the
 * page telling a prospect what the thing they might buy will not do, and
 * dressing that as a hazard would turn an honest disclosure into a pressure
 * tactic. Set at the measure so it reads as prose, because it is an argument
 * rather than a list.
 */
export function AuditCeiling({ ceiling }: { ceiling: AuditPage["offers"]["ceiling"] }) {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="max-w-(--measure)">
        <h2 className="font-display text-h2 font-semibold leading-tight text-balance">
          {ceiling.heading}
        </h2>
        <div className="mt-6 flex flex-col gap-4 text-body-lg text-light-muted">
          {ceiling.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
