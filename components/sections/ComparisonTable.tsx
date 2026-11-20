import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { CompareColumns, type CompareOption } from "@/components/ui/CompareColumns";
import { comparison } from "@/content/home";

/**
 * Zenith Digital against AI websites, freelancers and agencies (dark,
 * textured, the same backdrop as Pricing). Scannable columns since 20 Nov
 * 2026 (owner): a card per option with its annual cost as the headline and
 * the other criteria as marked rows, ours white and first on phones. The
 * data stays the matrix in content/home.ts `comparison`; this reads it by
 * column.
 */
export function ComparisonTable() {
  const [criterion, ...rest] = comparison.rows;
  const options: CompareOption[] = comparison.columns.slice(1).map((name, i) => {
    const ours = i === comparison.columns.length - 2;
    return {
      name,
      icon: comparison.icons[i],
      ours,
      badge: ours ? comparison.badge : undefined,
      headline: criterion.values[i].text,
      sub: criterion.criterion,
      rows: rest.map((row) => ({
        label: row.criterion,
        text: row.values[i].text,
        mark: row.values[i].rating,
      })),
    };
  });

  return (
    <div className="relative isolate overflow-hidden">
      {/* Faint texture background */}
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.16]"
          aria-hidden
        />
      </div>

      <Section tone="dark" className="bg-transparent" frameClassName="!py-14 md:!py-24">
        <CompareColumns
          tone="dark"
          options={options}
          labels={{ ...comparison.sliderLabels, region: comparison.heading }}
          header={
            <>
              <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
                {comparison.heading}
              </h2>
              <p className="mt-4 max-w-2xl text-body-lg font-medium text-text-muted">{comparison.intro}</p>
            </>
          }
        />
      </Section>
    </div>
  );
}
