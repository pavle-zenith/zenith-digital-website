import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { pBenefits } from "@/content/partnerships";

/**
 * What partners get — dark, textured. Six cells in one hairline-bounded grid
 * (same shared-1px-rule construction as the light "Why Zenith" bento). Each
 * cell leads with a small line icon in a hairline square (dark-tone take on
 * the Included boxes). The risk-reduction strip closes the section.
 */
export function PartnerBenefits() {
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

      <Section
        tone="dark"
        className="bg-transparent"
        frameClassName="!py-14 md:!py-24"
      >
        <h2 className="mb-8 max-w-2xl font-display md:mb-12 text-h2 font-medium leading-tight tracking-tight text-balance">
          {pBenefits.heading}
        </h2>

        {/* One grid, 1px gaps over a rule-colored bg render as shared hairlines. */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {pBenefits.items.map((item) => (
            <article key={item.title} className="flex flex-col bg-bg p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-border bg-surface text-text">
                <BenefitIcon name={item.icon} />
              </span>
              <h3 className="mt-8 font-display text-h3 font-medium">
                {item.title}
              </h3>
              <p className="mt-3 text-body leading-snug text-text-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        {/* Risk-reduction strip */}
        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6">
          {pBenefits.riskStrip.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-body font-medium"
            >
              <Check />
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13l4 4 10-10" />
    </svg>
  );
}

/** Small line icon per cell (Lucide, same register as the Included boxes). */
function BenefitIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    // lucide:gem
    gem: (
      <>
        <path d="M6 3h12l4 6-10 13L2 9Z" />
        <path d="M11 3 8 9l4 13 4-13-3-6" />
        <path d="M2 9h20" />
      </>
    ),
    // lucide:eye-off
    eyeOff: (
      <>
        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
        <path d="m2 2 20 20" />
      </>
    ),
    // lucide:percent
    percent: (
      <>
        <path d="M19 5 5 19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </>
    ),
    // lucide:clock
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    // lucide:user-round
    user: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </>
    ),
    // lucide:layers
    layers: (
      <>
        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
        <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
        <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
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
