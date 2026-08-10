import { Section } from "@/components/ui/Section";
import { CoverIcon } from "@/components/ui/CoverIcon";
import { callCovers } from "@/content/book-a-call";

/**
 * "What the call covers" — light section. Centered heading, then six cells in
 * the shared hairline grid (1px gaps over a rule-colored background). Each cell:
 * a navy icon chip top-left (Lucide line icons via Iconify, inlined), a spacer,
 * then the title + body anchored at the bottom (live-site layout).
 */
export function CallCovers() {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <h2 className="mx-auto mb-8 md:mb-12 max-w-3xl text-center font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {callCovers.heading}
      </h2>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:grid-cols-2 lg:grid-cols-3">
        {callCovers.items.map((item) => (
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
