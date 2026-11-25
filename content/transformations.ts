/**
 * Before/after transformations: the data behind the featured Transformation
 * component (transformations-brief.md). One entry per project, keyed by the
 * case-study slug; client name, logo and live URL are read from the card, so
 * nothing here repeats them. "Read the case study" shows only when the slug
 * has a shipped detail page (`detailSlugs`).
 *
 * Images: 4:3 presentation mockups (the site in a window on a background).
 * Four pairs are 1600x1200; Emma Jordan's is 1920x1440, her case study
 * thumbnail as the after and the old page set into that same frame as the
 * before (owner, 25 Nov 2026), so only the site changes as you drag. The
 * component shows them at 16:10 cropped from the centre, which trims
 * background and keeps every window whole.
 *
 * Points: exactly what changed, one short line each, written from facts
 * already on the site. No new claims here.
 */

export type TransformationMode = "before-after" | "wireframe-final";

export type Transformation = {
  slug: string;
  mode: TransformationMode;
  before: string;
  after: string;
  /** Shown in the frame's address bar. Omit when there's no public domain. */
  domain?: string;
  /** One line under the logo: what the project was. */
  summary: string;
  /** Two or three short lines: what changed. */
  points: string[];
};

export const transformations: Transformation[] = [
  {
    slug: "knode-ai",
    mode: "before-after",
    before: "/before-after/knode-before.jpg",
    after: "/before-after/knode-after.jpg",
    domain: "knode.ai",
    summary: "Off Wix Classic onto a new Wix Studio site in 3 weeks",
    points: [
      "Positioning settled before any design",
      "Real product UI instead of stock illustration",
      "Built to grow with the Series A raise",
    ],
  },
  {
    slug: "hunting-brook-gardens",
    mode: "before-after",
    before: "/before-after/huntingbrook-before.jpg",
    after: "/before-after/huntingbrook-after.jpg",
    domain: "huntingbrookgardens.com",
    summary: "Landing pages and course infrastructure for an Irish gardening school",
    points: [
      "One landing page for every course launch",
      "Courses that run themselves on Wix Courses",
      "Typeform where the forms need to think",
    ],
  },
  {
    slug: "emma-jordan",
    mode: "before-after",
    // Before: the old page (emma-jordan-before.jpg) composited into the
    // thumbnail's browser window. After: the case study thumbnail itself.
    before: "/before-after/emma-jordan-before-framed.webp",
    after: "/case-studies/emma-jordan/card.webp",
    // Domain to add at launch (January 2027). The thumbnail shows the Vercel
    // preview with placeholder rating and student figures: recapture both
    // on the live domain at launch.
    summary: "Two strength courses moved off MailerLite onto their own pages",
    points: [
      "Built in 10 days",
      "A landing page each for Strong Still and SUMO",
      "Sign-ups and buyers go straight into Wix CRM",
    ],
  },  {
    slug: "minded",
    mode: "before-after",
    before: "/before-after/minded-before.jpg",
    after: "/before-after/minded-after.jpg",
    domain: "minded.es",
    summary: "An education platform redesign for a kids learning app",
    points: [
      "70+ pages migrated to Wix Studio",
      "The whole site in two languages",
      // OWNER: confirm this one; the card only says "education platform
      // redesign for a kids learning app".
      "Redesigned around the app it sells",
    ],
  },
  {
    slug: "fort-lauderdale-dock-rentals",
    mode: "before-after",
    before: "/before-after/foxstays-before.jpg",
    after: "/before-after/foxstays-after.jpg",
    // No domain: the client has since redesigned, so the after is our build,
    // not what's live today (see the card).
    summary: "A booking and lead-capture site for a Florida dock charter",
    points: [
      "Booking and enquiries in one place",
      "30+ warm leads from the new site",
      // OWNER: add a third point (what else changed on this build).
    ],
  },

];

export function getTransformation(slug: string): Transformation | undefined {
  return transformations.find((t) => t.slug === slug);
}

/**
 * Which transformations each surface shows, in tab order. Unknown slugs are
 * a build error (the component throws), so a renamed study can't silently
 * empty a section.
 */
export const transformationPlacements = {
  home: ["knode-ai", "hunting-brook-gardens", "emma-jordan", "minded", "fort-lauderdale-dock-rentals"],
  caseStudies: ["knode-ai", "hunting-brook-gardens", "emma-jordan", "minded", "fort-lauderdale-dock-rentals"],
  migrationService: ["knode-ai", "emma-jordan", "minded"],
  migrationGuides: { "wix-classic-to-wix-studio": ["knode-ai"] } as Record<string, string[]>,
  freeAudit: ["knode-ai", "fort-lauderdale-dock-rentals", "hunting-brook-gardens"],
  bookACall: ["knode-ai", "hunting-brook-gardens", "emma-jordan", "minded"],
} as const;
