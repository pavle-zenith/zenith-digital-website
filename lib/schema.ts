import { founderCore } from "@/content/founder";

/**
 * Sitewide entity graph. Organization and WebSite render once from the root
 * layout; Person renders on the pages that show the founder section.
 *
 * The three nodes cross-reference by @id so crawlers resolve them as one
 * entity rather than three loose objects: Organization#founder points at the
 * Person, Person#worksFor points back, and WebSite#publisher points at the
 * Organization. That mutual reference is the whole point of the exercise, per
 * the brand-collision problem in CLAUDE.md §8.
 */

export const SITE = "https://www.thezenithdigital.com";

export const ORG_ID = `${SITE}/#organization`;
export const PERSON_ID = `${SITE}/#pavle-maodus`;
export const WEBSITE_ID = `${SITE}/#website`;

/**
 * Public profile URLs for `sameAs`. Anything still bracketed is an owner
 * placeholder and must never reach the markup: a `sameAs` pointing at
 * "[clutch profile URL]" is worse than a short list.
 */
// sameAs takes identity profiles, not ways to contact him, so the mailto and
// the wa.me link are filtered out alongside unfilled placeholders.
export const founderSameAs = founderCore.links
  .map((l) => l.href)
  .filter(
    (href) =>
      !href.includes("[") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("https://wa.me/"),
  );

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Zenith Digital",
  url: SITE,
  description:
    "Zenith Digital is a Wix Studio web design agency based in Belgrade, Serbia, serving clients across the UK, EU, and US.",
  // Google's Organization rich result and knowledge panel both read `logo`.
  // Points at the App Router icon so there's one brand mark, not two.
  logo: `${SITE}/icon.png`,
  // Owner-confirmed 17 Aug 2026. Stated once, sitewide, so the company's age
  // can't be inferred differently from page to page.
  foundingDate: "2021",
  areaServed: ["United Kingdom", "European Union", "United States"],
  // Wix's official partner tier. A named, checkable credential beats the
  // derived "top 1%" phrasing: the Wix profile in `sameAs` confirms it.
  award: "Wix Legend Partner",
  founder: { "@id": PERSON_ID },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belgrade",
    addressCountry: "RS",
  },
  email: "hello@thezenithdigital.com",
  // Organization and Person carry the same public profiles, per the handoff.
  ...(founderSameAs.length > 0 ? { sameAs: founderSameAs } : {}),
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: founderCore.name,
  jobTitle: "Founder",
  image: `${SITE}${founderCore.image}`,
  worksFor: { "@id": ORG_ID },
  ...(founderSameAs.length > 0 ? { sameAs: founderSameAs } : {}),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE,
  name: "Zenith Digital",
  publisher: { "@id": ORG_ID },
};
