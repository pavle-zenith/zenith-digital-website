import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { whyZenith } from "@/content/home";

// span -> col-span (static strings so Tailwind keeps them).
const SPAN: Record<number, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
};

/**
 * "Why they chose Zenith" — light bento (Lightdash / Services register). One
 * hairline-bounded grid: cells share 1px rules (no floating cards), three across
 * the top (span 2 of 6), two wider on the bottom (span 3). Each cell has a flat
 * inline-SVG visual up top and the title + body beneath.
 */
export function Problem() {
  return (
    <Section tone="light" frameClassName="!py-24">
      <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {whyZenith.heading}
        </h2>
        <div className="flex flex-col items-start gap-6 md:items-end">
          <p className="max-w-md text-body-lg font-medium text-light-muted md:text-right">{whyZenith.intro}</p>
          <Link
            href={whyZenith.cta.href}
            className="inline-flex items-center gap-2 rounded-[6px] bg-accent px-6 py-3 text-body font-medium text-accent-ink transition hover:bg-accent-hover"
          >
            {whyZenith.cta.label} <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* One grid, 1px gaps over a rule-colored bg render as shared hairlines. */}
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-light-border bg-light-border lg:grid-cols-6">
        {whyZenith.items.map((item) => (
          <article
            key={item.title}
            className={cn("flex flex-col bg-light-bg p-8", SPAN[item.span])}
          >
            {/* Visual sits directly in the cell (no inner box). */}
            <div className="mb-8 flex h-40 items-center justify-center overflow-hidden">
              <CardArt name={item.art} />
            </div>

            <h3 className="font-display text-h3 font-medium">{item.title}</h3>
            <p className="mt-3 max-w-md text-body leading-snug text-light-muted">{item.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/**
 * Flat inline-SVG asset per cell. Navy strokes/fills on the light surface, a
 * single accent highlight each — same construction as the audit report mock.
 */
function CardArt({ name }: { name: string }) {
  const line = "var(--color-light-border)";
  const ink = "var(--color-light-text)";
  const muted = "var(--color-light-muted)";
  const accent = "var(--color-accent)";

  switch (name) {
    case "migration":
      // Old site card -> arrow -> new site card, one "page" node moving across.
      return (
        <svg viewBox="0 0 260 130" className="h-full w-full" fill="none" aria-hidden>
          <rect x="10" y="18" width="86" height="94" rx="6" fill="var(--color-light-surface)" stroke={line} />
          <rect x="20" y="28" width="66" height="18" rx="3" fill={line} />
          <path d="M20 58h50M20 70h66M20 82h40M20 94h58" stroke={line} strokeWidth="3" strokeLinecap="round" />
          <rect x="164" y="18" width="86" height="94" rx="6" fill="var(--color-light-surface)" stroke={accent} />
          <rect x="174" y="28" width="66" height="18" rx="3" fill={accent} opacity="0.18" />
          <path d="M174 58h50M174 70h66M174 82h40M174 94h58" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
          <path d="M104 65h44" stroke={muted} strokeWidth="2" strokeDasharray="4 4" />
          <path d="M144 60l8 5-8 5" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="118" y="52" width="26" height="26" rx="4" fill={accent} />
        </svg>
      );
    case "seo":
      // Search result ranked #1 with a rising bar of rank positions.
      return (
        <svg viewBox="0 0 240 130" className="h-full w-full" fill="none" aria-hidden>
          <rect x="16" y="20" width="150" height="90" rx="8" fill="var(--color-light-surface)" stroke={line} />
          <circle cx="34" cy="38" r="7" fill={accent} opacity="0.15" />
          <path d="M31 38l2 2 4-4" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="48" y="33" width="70" height="8" rx="4" fill={ink} opacity="0.8" />
          <path d="M28 58h126M28 70h96M28 82h126M28 94h80" stroke={line} strokeWidth="3" strokeLinecap="round" />
          {/* rank bars */}
          <g>
            <rect x="182" y="86" width="14" height="24" rx="2" fill={line} />
            <rect x="200" y="66" width="14" height="44" rx="2" fill={line} />
            <rect x="218" y="40" width="14" height="70" rx="2" fill={accent} />
          </g>
          <path d="M182 84l18-18 16-24" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        </svg>
      );
    case "industry":
      // Grid of varied industry tiles, a few accented.
      return (
        <svg viewBox="0 0 240 130" className="h-full w-full" fill="none" aria-hidden>
          {[
            [16, 18, false], [70, 18, true], [124, 18, false], [178, 18, false],
            [16, 58, false], [70, 58, false], [124, 58, true], [178, 58, false],
          ].map(([x, y, hot], i) => (
            <g key={i}>
              <rect x={x as number} y={y as number} width="46" height="34" rx="5" fill={hot ? accent : "var(--color-light-surface)"} stroke={hot ? accent : line} />
              <circle cx={(x as number) + 12} cy={(y as number) + 12} r="4" fill={hot ? "#fff" : muted} opacity={hot ? 1 : 0.6} />
              <rect x={(x as number) + 22} y={(y as number) + 9} width="16" height="4" rx="2" fill={hot ? "#fff" : line} opacity={hot ? 0.9 : 1} />
              <rect x={(x as number) + 8} y={(y as number) + 22} width="30" height="4" rx="2" fill={hot ? "#fff" : line} opacity={hot ? 0.7 : 1} />
            </g>
          ))}
        </svg>
      );
    case "editor":
      // Wix Studio editor: toolbar, left rail, canvas with a selected block + cursor.
      return (
        <svg viewBox="0 0 300 130" className="h-full w-full" fill="none" aria-hidden>
          <rect x="10" y="12" width="280" height="106" rx="8" fill="var(--color-light-surface)" stroke={line} />
          <path d="M10 34h280" stroke={line} />
          <circle cx="24" cy="23" r="2.5" fill={muted} /><circle cx="33" cy="23" r="2.5" fill={muted} /><circle cx="42" cy="23" r="2.5" fill={muted} />
          <rect x="120" y="19" width="60" height="8" rx="4" fill={line} />
          <path d="M52 34v84" stroke={line} />
          {[44, 58, 72, 86, 100].map((y) => (
            <rect key={y} x="24" y={y} width="16" height="10" rx="2" fill={line} />
          ))}
          {/* canvas blocks */}
          <rect x="66" y="46" width="94" height="26" rx="3" fill={accent} opacity="0.14" stroke={accent} />
          <rect x="170" y="46" width="108" height="26" rx="3" fill="var(--color-light-surface)" stroke={line} />
          <rect x="66" y="82" width="212" height="24" rx="3" fill="var(--color-light-surface)" stroke={line} />
          {/* cursor */}
          <path d="M120 62l0 18 5-5 4 8 3-1-4-8 7-1z" fill={ink} />
        </svg>
      );
    case "map":
      // Abstract node network over a "Europe" wordless region: 3 hubs + links.
      return (
        <svg viewBox="0 0 300 130" className="h-full w-full" fill="none" aria-hidden>
          <path
            d="M60 30c18-6 34 2 50-2s30 6 44 2 26 4 40 0M40 66c22 4 40-6 60-2s36 8 56 4 40 2 52-6M70 98c20 2 36-6 54-2s32 6 48 2"
            stroke={line}
            strokeWidth="1.5"
          />
          {/* links */}
          <path d="M96 44L150 92M150 92L214 52M96 44L214 52" stroke={accent} strokeWidth="1.5" opacity="0.5" />
          {/* hubs */}
          {[
            [96, 44, "UK/EU"], [214, 52, "US"], [150, 92, "Belgrade"],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx as number} cy={cy as number} r="12" fill={accent} opacity="0.12" />
              <circle cx={cx as number} cy={cy as number} r={i === 2 ? 6 : 5} fill={accent} />
            </g>
          ))}
          {/* other pins */}
          {[[60, 30], [194, 34], [244, 76], [70, 98], [124, 60]].map(([cx, cy], i) => (
            <circle key={i} cx={cx as number} cy={cy as number} r="2.5" fill={muted} />
          ))}
        </svg>
      );
    default:
      return null;
  }
}
