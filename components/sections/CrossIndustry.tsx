import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { crossIndustry } from "@/content/home";

/**
 * Cross-industry client grid, ported 1:1 from the live Zenith site. A 4-column grid
 * of clients: logo (placeholder where the real mark isn't in yet) + what we did for
 * them. No dividers — items breathe on open space, only gap between them.
 */
export function CrossIndustry() {
  return (
    <Section tone="light" frameClassName="!py-20">
      <h2 className="mb-14 max-w-3xl font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {crossIndustry.heading}
      </h2>

      <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {crossIndustry.items.map((item) => (
          <div key={item.name} className="flex flex-col gap-3">
            <div className="flex h-7 items-center">
              {item.logo ? (
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={120}
                  height={26}
                  className="h-5 w-auto max-w-[140px] object-contain object-left"
                />
              ) : (
                <span className="font-display text-body font-medium text-light-text">
                  {item.name}
                </span>
              )}
            </div>
            <p className="text-body leading-snug text-light-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
