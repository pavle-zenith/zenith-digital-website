import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { comparison } from "@/content/home";

/**
 * Comparison matrix — dark, textured (same backdrop as Pricing). A real <table>
 * for semantics: criterion column, then AI websites / freelancers / agencies,
 * with the Zenith column last, highlighted with the surface fill (same
 * treatment as the featured pricing tier). Scrolls horizontally inside the
 * rounded frame on small screens.
 */
export function ComparisonTable() {
  const last = comparison.columns.length - 1;

  return (
    <div className="relative isolate overflow-hidden">
      {/* Faint texture background */}
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.16]"
          aria-hidden
        />
      </div>

      <Section
        tone="dark"
        className="bg-transparent"
        frameClassName="!py-14 md:!py-24"
      >
        {/* Header — heading left, intro right (same register as the showcase). */}
        <div className="mb-8 grid md:mb-12 gap-8 md:grid-cols-2 md:items-start">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {comparison.heading}
          </h2>
          <p className="max-w-md text-body-lg font-medium text-text-muted md:justify-self-end md:text-right">
            {comparison.intro}
          </p>
        </div>

        <div className="overflow-hidden rounded-card border border-border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  {comparison.columns.map((col, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={cn(
                        "px-6 py-5 font-display text-body font-medium",
                        i === 0 && "w-[19%]",
                        i > 0 && i < last && "w-[18%] text-text-muted",
                        i === last &&
                          "w-[27%] bg-surface text-body-lg text-text",
                      )}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparison.rows.map((row) => (
                  <tr key={row.criterion}>
                    <th
                      scope="row"
                      className="px-6 py-5 font-display text-body font-medium text-text"
                    >
                      {row.criterion}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={i}
                        className={cn(
                          "px-6 py-5 text-body",
                          i === row.values.length - 1
                            ? "bg-surface font-medium text-text"
                            : "text-text-muted",
                        )}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </div>
  );
}
