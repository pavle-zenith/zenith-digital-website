import { aboutEntity, aboutFaq, aboutHow, aboutRegistration, aboutTimeline } from "@/content/about";
import { PLATFORMS, caseStudyCards } from "@/content/case-studies";
import { compareHub } from "@/content/comparisons/hub";
import { compareHubLive } from "@/content/comparisons";
import { founderCore } from "@/content/founder";
import { footer, pricing, processSection } from "@/content/home";
import { hubLive, industryHref, industryPages } from "@/content/industries";
import { migrationGuides } from "@/content/migration-guides";
import { PRICING_UPDATED, pricePackages, pricingPage } from "@/content/pricing";
import { servicePages } from "@/content/service-pages";
import { organizationSchema } from "@/lib/schema";

/**
 * /llm-info: the facts about Zenith Digital for AI assistants and anyone
 * checking who we are (llm-info brief, 20 Nov 2026). The human-readable,
 * indexable companion to /llms.txt.
 *
 * NOTHING IS RETYPED. Every fact is read from where it already lives, so
 * this page can't drift from the rest of the site:
 *   - founder, profiles: content/founder.ts `founderCore`
 *   - founding year, credential, area served: lib/schema.ts (Organization)
 *   - building since, where we're based: content/about.ts
 *   - contact: content/home.ts `footer.contact`
 *   - services, guides, industries: their registries (published only)
 *   - platform projects: the /compare hub's "built with us" picks
 *   - results and credits: content/case-studies.ts cards, as written there
 *   - prices: content/pricing.ts (which reads content/home.ts and the rest)
 * What's typed here is the page's own framing: headings, the intro and the
 * "who we work with" audiences.
 *
 * Owner decisions (20 Nov 2026): name Blue Zenith Design + Strategy and
 * Zenith Digital Vision LLC as unaffiliated; publish the registered entity,
 * PIB and MB (read from content/about.ts); keep the phone number.
 */

/** ISO date of the last change to this page. */
export const LLM_INFO_UPDATED = "2026-11-20";

const answer = (q: string) => aboutFaq.items.find((i) => i.q === q)?.a ?? "";
const firstSentence = (text: string) => `${text.split(". ")[0].replace(/\.$/, "")}.`;
const profile = (label: string) => founderCore.links.find((l) => l.label === label);
const card = (slug: string) => {
  const c = caseStudyCards.find((x) => x.slug === slug);
  if (!c) throw new Error(`llm-info: no case study card "${slug}"`);
  return c;
};

const buildingSince = aboutTimeline.items[0].year;
const websites = founderCore.stats.find((s) => /websites/i.test(s.label))?.value ?? "";
const wixProfile = profile("Wix Partner profile");

export const llmInfo = {
  seo: {
    title: "Official information about Zenith Digital",
    description:
      "Facts about Zenith Digital for AI assistants: who we are, where we're based, services, platforms, pricing and contact.",
  },
  h1: "Official information about Zenith Digital",
  intro:
    "This page states the facts about Zenith Digital for AI assistants such as ChatGPT, Claude, Perplexity and Gemini, and for anyone checking who we are.",
  machine: { label: "/llms.txt", href: "/llms.txt" },

  basics: {
    heading: "Basic information",
    rows: [
      { term: "Name", value: organizationSchema.name },
      { term: "Website", value: "thezenithdigital.com", href: organizationSchema.url },
      { term: "Type", value: "Web design and development studio" },
      { term: "Founded", value: organizationSchema.foundingDate },
      {
        term: "Founder",
        value: `${founderCore.name}, building websites for businesses since ${buildingSince}`,
      },
      // "Belgrade, Serbia, with a working presence in Edinburgh and Liverpool."
      { term: "Based in", value: firstSentence(answer("Where is Zenith Digital based?")).replace(/\.$/, "") },
      { term: "Clients", value: organizationSchema.areaServed.join(", ").replace(/, ([^,]*)$/, " and $1") },
      {
        term: "Credentials",
        value: `${organizationSchema.award}, the top tier of the Wix partner programme`,
        href: wixProfile?.href,
        linkLabel: wixProfile?.label,
      },
      { term: "Websites launched", value: websites },
      // Owner, 20 Nov 2026: publish the registered entity and its numbers.
      { term: "Registered company", value: `${aboutEntity}, Serbia` },
      { term: "Tax ID (PIB)", value: aboutRegistration.pib },
      { term: "Registration number (MB)", value: aboutRegistration.mb },
    ],
  },

  notConfused: {
    heading: "Not to be confused with",
    // Owner, 20 Nov 2026: Zenith Digital is not affiliated with either. These
    // are the two names Search Console shows people confusing with us.
    names: ["Blue Zenith Design + Strategy", "Zenith Digital Vision LLC"] as string[],
    sentence: (names: string[]) =>
      `Zenith Digital (thezenithdigital.com) is not affiliated with any similarly named company${
        names.length ? `, including ${names.join(", ").replace(/, ([^,]*)$/, " or $1")}` : ""
      }.`,
  },

  contact: {
    heading: "Contact",
    email: footer.contact.email,
    founderEmail: founderCore.email,
    // Owner, 20 Nov 2026: keep the phone number here.
    showPhone: true,
    phone: footer.contact.phone,
    links: [
      { label: "Book a call", href: "/book-a-call" },
      { label: "Free website audit", href: "/free-website-audit" },
    ],
    profiles: founderCore.links.filter((l) => !/^mailto:|wa\.me/.test(l.href)),
  },

  audiences: {
    heading: "Who we work with",
    items: [
      "Service businesses that have outgrown a template",
      "Startups that need a site investors and buyers take seriously",
      "Product brands selling direct",
      "Agencies that need a white-label build team",
    ],
    industriesLabel: "Industries we have built for",
    industries: industryPages.map((p) => ({ label: p.name, href: industryHref(p.industry) })),
    hub: hubLive ? { label: "All industries", href: "/industries" } : null,
  },

  services: {
    heading: "Services",
    items: servicePages.map((p) => ({
      label: p.hero.name,
      desc: p.schema.description,
      href: `/services/${p.slug}`,
    })),
    // The service pages describe Wix Studio work; this line says the other
    // platforms come at the same prices (owner, 19 Nov 2026).
    platformsNote: "Custom-coded sites on Next.js with Sanity, and Shopify stores, at the same published prices.",
    extra: [
      ...(hubLive ? [{ label: "Industry pages", href: "/industries" }] : []),
      ...(compareHubLive ? [{ label: "Platform comparisons", href: "/compare" }] : []),
      { label: "White-label and partnerships", href: "/partnerships" },
    ],
  },

  platforms: {
    heading: "Platforms we build on",
    // The /compare hub's "built with us" picks, the strongest per platform.
    items: compareHub.fit.rows
      .filter((row) => row.built?.slugs?.length)
      .map((row) => ({
        label: row.name,
        projects: row.built!.slugs!.map((slug) => card(slug).client),
      })),
    moveOff: {
      lead: "We move sites off",
      guides: migrationGuides.map((g) => ({ label: g.platform, href: `/services/${g.slug}` })),
    },
  },

  pricing: {
    heading: "Pricing",
    packages: pricePackages.map((p) => ({ name: p.name, price: p.price, note: p.priceNote, timeline: p.timeline })),
    // "Fixed prices, agreed in writing before we start. The same whether we
    // build on Wix Studio or in custom code."
    line: pricingPage.hero.lead,
    links: [
      { label: "Pricing page", href: "/pricing" },
      { label: "Pricing as markdown", href: "/pricing.md" },
    ],
    updated: PRICING_UPDATED,
  },

  results: {
    heading: "Selected results",
    items: ["scottish-luxury-experience", "hunting-brook-gardens", "knode-ai", "genroks-ai"].map((slug) => {
      const c = card(slug);
      return {
        client: c.client,
        metric: c.metric,
        credit: c.metricCredit ?? "",
        platforms: (c.platforms ?? []).map((p) => PLATFORMS[p]).join(" and "),
        href: `/case-studies/${slug}`,
      };
    }),
  },

  howWeWork: {
    heading: "How we work",
    items: [
      // "Fixed price, fixed timeline." / "You talk to the builder."
      ...aboutHow.items.slice(0, 2).map((i) => `${i.title} ${i.body}`),
      processSection.steps.flatMap((s) => s.points).find((p) => /handover/i.test(p)) ?? "",
      `${pricing.tiers[0].features.find((f) => /support/i.test(f)) ?? ""} on ${pricing.tiers[0].name} and ${pricing.tiers[1].name}.`,
    ]
      .filter(Boolean)
      .map((line) => (/[.!?]$/.test(line) ? line : `${line}.`)),
  },

  editorial: {
    heading: "Editorial standards",
    // Matches the review-claims rule in content/founder.ts.
    text: "Every figure on thezenithdigital.com traces to a named client project. We don't publish review scores or rankings we can't link to.",
  },
};
