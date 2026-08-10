import { Section } from "@/components/ui/Section";
import { CoverIcon } from "@/components/ui/CoverIcon";
import { auditCovers } from "@/content/free-website-audit";

/**
 * "What you'll get" — light section. Six icon cards in the shared hairline
 * grid (same register as the /book-a-call covers grid).
 */
export function AuditCovers() {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="mb-8 grid md:mb-12 gap-8 md:grid-cols-2 md:items-start">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {auditCovers.heading}
        </h2>
        <p className="text-body-lg font-medium text-light-muted">
          {auditCovers.support}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:grid-cols-2 lg:grid-cols-3">
        {auditCovers.items.map((item) => (
          <article key={item.title} className="flex flex-col bg-light-bg p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-card bg-accent text-accent-ink">
              <CoverIcon name={item.icon} />
            </span>
            <h3 className="mt-16 font-display text-h3 font-medium">
              {item.title}
            </h3>
            <p className="mt-3 max-w-md text-body leading-snug text-light-muted">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
