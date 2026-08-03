import { Section } from "@/components/ui/Section";
import { callCovers } from "@/content/book-a-call";

/**
 * "What the call covers" — light section. Centered heading, then six cells in
 * the shared hairline grid (1px gaps over a rule-colored background). Each cell:
 * a navy icon chip top-left (Lucide line icons via Iconify, inlined), a spacer,
 * then the title + body anchored at the bottom (live-site layout).
 */
export function CallCovers() {
  return (
    <Section tone="light" frameClassName="!py-24">
      <h2 className="mx-auto mb-12 max-w-3xl text-center font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {callCovers.heading}
      </h2>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:grid-cols-2 lg:grid-cols-3">
        {callCovers.items.map((item) => (
          <article key={item.title} className="flex flex-col bg-light-bg p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-card bg-accent text-accent-ink">
              <CoverIcon name={item.icon} />
            </span>
            <h3 className="mt-16 font-display text-h3 font-medium">{item.title}</h3>
            <p className="mt-3 max-w-md text-body leading-snug text-light-muted">{item.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/** Lucide line icons (sourced via Iconify), one per card. */
function CoverIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    // lucide:search-check
    audit: (
      <>
        <path d="m8 11 2 2 4-4" />
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
    // lucide:filter
    leaks: <path d="M22 3H2l8 9.46V19l4 2v-8.54z" />,
    // lucide:file-check-2
    proposal: (
      <>
        <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4M3 15l2 2 4-4" />
      </>
    ),
    // lucide:sparkles
    seo: (
      <>
        <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594zM20 2v4m2-2h-4" />
        <circle cx="4" cy="20" r="2" />
      </>
    ),
    // lucide:bar-chart-3
    competitor: <path d="M3 3v18h18m-3-4V9m-5 8V5M8 17v-3" />,
    // lucide:gift
    keep: (
      <>
        <path d="M12 7v14m8-10v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8m3.5-4a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 4.5-5a2.5 2.5 0 0 1 0 5" />
        <rect width="18" height="4" x="3" y="7" rx="1" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
