import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { pServices } from "@/content/partnerships";

/**
 * What we build for partners — dark, textured. Seven cells in one
 * hairline-bounded grid (same shared-1px-rule construction as the benefits
 * bento); the last cell spans two columns so the grid closes flush. Each cell
 * leads with a small line icon in a hairline square.
 */
export function PartnerServices() {
  const last = pServices.items.length - 1;

  return (
    <div className="relative isolate overflow-hidden">
      {/* Faint texture background (same register as the other dark bands) */}
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/bg-texture.png"
          alt=""
          fill
          className="object-cover opacity-[0.14]"
          aria-hidden
        />
      </div>

      <Section tone="dark" className="bg-transparent" frameClassName="!py-24">
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {pServices.heading}
          </h2>
          <p className="max-w-md text-body-lg font-medium text-text-muted md:justify-self-end md:text-right">
            {pServices.intro}
          </p>
        </div>

        {/* One grid, 1px gaps over a rule-colored bg render as shared hairlines. */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {pServices.items.map((item, i) => (
            <article
              key={item.title}
              className={cn(
                "flex flex-col bg-bg p-8",
                i === last && "md:col-span-2",
              )}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-border bg-surface text-text">
                <ServiceIcon name={item.icon} />
              </span>
              <h3 className="mt-8 font-display text-body-lg font-medium">
                {item.title}
              </h3>
              <p className="mt-2 max-w-md text-body leading-snug text-text-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}

/** Small line icon per cell (Lucide, same register as the benefits grid). */
function ServiceIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    // lucide:app-window
    browser: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M10 4v4M2 8h20M6 4v4" />
      </>
    ),
    // lucide:target
    target: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    // lucide:blocks
    blocks: (
      <>
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
      </>
    ),
    // lucide:framer
    framer: <path d="M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7" />,
    // lucide:component
    component: (
      <>
        <path d="M15.536 11.293a1 1 0 0 0 0 1.414l2.828 2.829a1 1 0 0 0 1.415 0l2.828-2.829a1 1 0 0 0 0-1.414l-2.828-2.828a1 1 0 0 0-1.415 0z" />
        <path d="M2.297 11.293a1 1 0 0 0 0 1.414l2.828 2.829a1 1 0 0 0 1.415 0l2.828-2.829a1 1 0 0 0 0-1.414L6.54 8.465a1 1 0 0 0-1.415 0z" />
        <path d="M8.916 17.912a1 1 0 0 0 0 1.415l2.828 2.828a1 1 0 0 0 1.415 0l2.828-2.828a1 1 0 0 0 0-1.415l-2.828-2.828a1 1 0 0 0-1.415 0z" />
        <path d="M8.916 4.674a1 1 0 0 0 0 1.414l2.828 2.829a1 1 0 0 0 1.415 0l2.828-2.829a1 1 0 0 0 0-1.414l-2.828-2.828a1 1 0 0 0-1.415 0z" />
      </>
    ),
    // lucide:shopping-bag
    bag: (
      <>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </>
    ),
    // lucide:code
    code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
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
