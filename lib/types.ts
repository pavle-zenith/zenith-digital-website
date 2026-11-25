export type Tone = "dark" | "light";

export type CtaLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type Metric = { value: string; label: string };

/**
 * A page's featured before/after (components/sections/Transformation): which
 * entries it shows, in tab order (from `transformationPlacements` in
 * content/transformations.ts), and the section's own heading.
 */
export type TransformationSection = {
  slugs: readonly string[];
  heading?: string;
  support?: string;
};
