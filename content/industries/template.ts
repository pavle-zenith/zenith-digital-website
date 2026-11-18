/**
 * The fixed labels every industry page shares (CLAUDE.md §15: components read
 * only from content). Per-page copy lives in each {slug}.ts; these are the
 * template's own words and are the same on every page by design.
 */
export const industryTemplate = {
  breadcrumbHub: "Industries",
  inShortLabel: "In short",
  familiarEyebrow: "Sound familiar?",
  updatedLabel: "Updated",
  fitEyebrow: "Fit",
  fitGoodLabel: "A good fit if",
  fitNotLabel: "Probably not a fit if",
  sourcesLabel: "Sources",
  stepLabel: "Step",
  deliverablesLabel: "What you get",
  workAllLabel: "See every case study",
  heroPrevLabel: "Previous project",
  heroNextLabel: "Next project",
  workPrevLabel: "Previous projects",
  workNextLabel: "Next projects",
  finalCta: {
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },
};
