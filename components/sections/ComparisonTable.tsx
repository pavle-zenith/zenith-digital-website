import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { cn } from "@/lib/utils";
import { comparison, type ComparisonRating } from "@/content/home";

/**
 * Comparison matrix — dark, textured (same backdrop as Pricing). A real <table>
 * for semantics: criterion column, then AI websites / freelancers / agencies,
 * with the Zenith column last in a white fill so it reads as the answer.
 *
 * The table sits on a translucent blurred panel rather than straight on the
 * texture: the same legibility treatment as the stats bar over media (§15),
 * used here because small table text over a photographic texture is hard to
 * read. Every cell is marked by how good that answer is — verified tick,
 * question mark, or cross — so the table can be scanned without reading it.
 * Scrolls horizontally inside the rounded frame on small screens.
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

        <div className="overflow-hidden rounded-card border border-border bg-bg/60 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  {comparison.columns.map((col, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={cn(
                        "px-6 py-5 font-display text-body font-medium",
                        i === 0 && "w-[19%]",
                        i > 0 && i < last && "w-[18%] text-text",
                        i === last &&
                          "w-[27%] bg-white text-body-lg text-light-text",
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
                    {row.values.map((value, i) => {
                      const isOurs = i === row.values.length - 1;
                      return (
                        <td
                          key={i}
                          className={cn(
                            "px-6 py-5 text-body",
                            isOurs
                              ? "bg-white font-medium text-light-text"
                              : "text-text",
                          )}
                        >
                          <span className="flex items-start gap-2.5">
                            <RatingMark
                              rating={value.rating}
                              onLight={isOurs}
                            />
                            {value.text}
                          </span>
                        </td>
                      );
                    })}
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

/**
 * Verified tick / question mark / cross, tinted for the fill it sits on. The
 * light variants are the deeper feedback inks, since the dark-section greens
 * and reds don't clear 3:1 on white.
 */
function RatingMark({
  rating,
  onLight,
}: {
  rating: ComparisonRating;
  onLight: boolean;
}) {
  const label =
    rating === "good" ? "Yes" : rating === "mixed" ? "Varies" : "No";

  if (rating === "good") {
    return (
      <VerifiedCheck
        className={cn(
          "mt-0.5 h-[18px] w-[18px]",
          onLight ? "text-positive-ink" : "text-positive",
        )}
      />
    );
  }

  const tone = onLight
    ? "text-light-muted"
    : rating === "bad"
      ? "text-negative"
      : "text-text-muted";

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("mt-0.5 h-[18px] w-[18px] shrink-0", tone)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
    >
      <circle cx="12" cy="12" r="9" />
      {rating === "bad" ? (
        <path d="M15 9l-6 6M9 9l6 6" />
      ) : (
        <>
          <path d="M9.5 9.2a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.2-2.5 3.6" />
          <path d="M12 17.2h.01" />
        </>
      )}
    </svg>
  );
}
