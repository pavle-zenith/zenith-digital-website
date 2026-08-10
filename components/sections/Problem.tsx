import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { whyZenith } from "@/content/home";

/**
 * "The reasons businesses pick us, and stay" — header (heading left, intro +
 * CTA right), a wide center image (framed placeholder until the owner sets
 * whyZenith.image), then five reason cards in the shared-hairline grid (three
 * thirds over two halves), each led by a small line icon in an accent square
 * (Included register).
 */
export function Problem() {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="mb-8 grid md:mb-12 gap-8 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {whyZenith.heading}
        </h2>
        <div className="flex flex-col items-start gap-6 md:items-end">
          <p className="max-w-md text-body-lg font-medium text-light-muted md:text-right">
            {whyZenith.intro}
          </p>
          <Link
            href={whyZenith.cta.href}
            className="btn-animated group inline-flex w-full items-center justify-center gap-2 rounded-[6px] px-6 py-3 sm:w-auto text-body font-medium text-accent-ink transition"
          >
            {whyZenith.cta.label}{" "}
            <span aria-hidden className="btn-arrow">
              &rarr;
            </span>
          </Link>
        </div>
      </div>

      {/* Center image — 16:9 to match the supplied artwork, so nothing crops. */}
      <div className="relative mb-8 aspect-video md:mb-12 overflow-hidden rounded-card border border-light-border bg-light-surface">
        {whyZenith.image ? (
          <Image
            src={whyZenith.image}
            alt=""
            fill
            sizes="(max-width: 1440px) 100vw, 1280px"
            className="object-cover"
            aria-hidden
          />
        ) : null}
      </div>

      {/* One grid, 1px gaps over a rule-colored bg render as shared hairlines.
          Five cards: three thirds on top, two halves beneath. */}
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:grid-cols-2 lg:grid-cols-6">
        {whyZenith.items.map((item, i) => (
          <article
            key={item.title}
            className={cn(
              "flex flex-col bg-light-bg p-8",
              i < 3 ? "lg:col-span-2" : "lg:col-span-3",
              i === 4 && "md:col-span-2 lg:col-span-3",
            )}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-accent text-accent-ink">
              <ReasonIcon name={item.icon} />
            </span>
            <h3 className="mt-8 font-display text-h3 font-medium">
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

/** Small line icon per card (Lucide, same register as the Included boxes). */
function ReasonIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    // lucide:arrow-right-left
    migrate: (
      <>
        <path d="m16 3 4 4-4 4" />
        <path d="M20 7H4" />
        <path d="m8 21-4-4 4-4" />
        <path d="M4 17h16" />
      </>
    ),
    // lucide:search
    search: (
      <>
        <path d="m21 21-4.34-4.34" />
        <circle cx="11" cy="11" r="8" />
      </>
    ),
    // lucide:layout-grid
    grid: (
      <>
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </>
    ),
    // lucide:award
    award: (
      <>
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
        <circle cx="12" cy="8" r="6" />
      </>
    ),
    // lucide:globe
    globe: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </>
    ),
    // lucide:rocket
    rocket: (
      <>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
        <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
      </>
    ),
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
