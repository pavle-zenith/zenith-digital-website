import { INDUSTRIES } from "@/content/case-studies";
import type { IndustryPageContent } from "./types";
import { PACKAGES, card, detail, figure, lower } from "./proof";

/**
 * /industries/marine, written from the travel template (18 Nov 2026). Held
 * for owner review.
 *
 * One detail study: Yacht Junky, a multi-seller boat and yacht marketplace
 * built natively in Wix Studio with Velo, as a partnership build with MOD
 * Digital. Its figures are platform facts (features, no external services),
 * never business outcomes, and the case study's own honest trade-off
 * (payments, escrow and seller dashboards argue for custom) is carried into
 * the "not a fit" list and the marketplace FAQ. Fort Lauderdale Dock Rentals
 * (Foxstays) is a scope card with "30+ warm leads"; it has no live link
 * because the client has since redesigned the site.
 *
 * OWNER, please confirm before publishing:
 *   1. Testimonials: Flynn (MOD, video) is the only voice on record here, so
 *      the section shows one card. A Foxstays quote would fill it.
 */

const yj = detail("yacht-junky");
const yjBuild = yj.meta.timeline;
const yjFeatures = figure("yacht-junky", "Marketplace features shipped");
const fldr = card("fort-lauderdale-dock-rentals");

const { minimum, studio, landing } = PACKAGES;

export const marine: IndustryPageContent = {
  slug: "marine",
  industry: "marine",
  publish: true,
  updated: "2026-11-18",
  name: INDUSTRIES.marine,
  filterLinkLabel: "See the marine page",

  seo: {
    title: "Yacht, boat and marina website design | Zenith Digital",
    description:
      "Websites for yacht marketplaces, brokers, charters and dock rentals: searchable listings, private enquiries and prices in the buyer's own currency.",
  },

  hero: {
    h1: "Yacht, boat and dock websites that turn browsers into buyers",
    proof:
      "We design and build websites for boat and yacht marketplaces, brokers, charters and dock rentals, with listings people can search, enquiries that reach the right seller and bookings that come with the details.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" },
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "secondary",
      },
    ],
    shots: {
      center: "yacht-junky",
      left: {
        src: "/portfolio-slider/fort-lauderdale-dock-rental.jpg",
        alt: "Foxstays dock rental website in a browser window: an aerial view of yachts at private docks, with buttons to list your dock or find a dock",
      },
      right: {
        src: "/case-studies/yacht-junky/supporting-2.webp",
        alt: "A Yacht Junky listing page in a browser window: a photo gallery of a Sunseeker Portofino 40, the price in pounds with a currency switch, and a direct enquiry form to the seller",
      },
    },
  },

  inShort: `Zenith Digital designs and builds websites on Wix Studio for boat and yacht marketplaces, brokers, charter companies and dock rentals: searchable listings your team manages, enquiries routed to the right seller without publishing their details, and prices shown in the buyer's currency. A full site takes ${minimum.timeline.replace(" weeks", "")} to ${studio.timeline}. Prices start ${lower(landing.price)} for a landing page and ${lower(minimum.price)} for a full site.`,

  fit: {
    heading: "Who we work best with in marine",
    good: [
      { icon: "anchor", text: "Boat and yacht marketplaces and brokers" },
      { icon: "map-pin", text: "Dock, slip and marina rental businesses" },
      { icon: "calendar", text: "Charter companies taking enquiries" },
    ],
    notAFit: [
      "You need escrow or payments between buyer and seller",
      "You need full seller dashboards and payouts",
      "Your listings and photos aren't ready yet",
    ],
  },

  familiar: {
    heading: ["Buyers are serious.", "Your site isn't built for them."],
    intro:
      "Most boat and dock sites lose people between the first photo and the enquiry. If two or three of these ring true, the rest of this page is for you.",
    items: [
      {
        icon: "search",
        title: "Buyers can't filter boats by the specs they shortlist on.",
        body: "We build search around how buyers narrow it down: category, region, make, price and the specs that matter.",
      },
      {
        icon: "globe",
        title: "Prices are in one currency and the buyer is in another.",
        body: "We show prices in the buyer's currency, converted on the listing, so nobody leaves to do the maths.",
      },
      {
        icon: "lock",
        title: "Private sellers don't want their number on the internet.",
        body: "We route enquiries to the seller without publishing their details, and email them the moment one lands.",
      },
      {
        icon: "users",
        title: "Dock owners and boaters land on the same page.",
        body: "We give each side its own route from the first screen: list your dock, or find one.",
      },
      {
        icon: "form",
        title: "Charter and rental enquiries arrive with no dates or boat size.",
        body: "We ask for dates, vessel length and location up front, so you can answer with a price, not a question.",
      },
      {
        icon: "layers",
        title: "Every new listing means asking someone to build a page.",
        body: "We make listings data, not pages: add a boat or a berth and its page appears, filters and all.",
      },
    ],
  },

  steps: {
    heading: "How we build a marine website",
    intro: "Five steps, and what you have in hand at the end of each.",
    items: [
      {
        navLabel: "Model",
        scene: "marine-model",
        title: "Decide who lists, who books and who enquires",
        body: "A marketplace, a brokerage, a charter fleet and a dock network each have different sides to serve. We map who lists, who searches and where every enquiry goes before design starts.",
        deliverables: [
          "Marketplace or booking model",
          "Site map",
          "Fixed price and launch date",
        ],
      },
      {
        navLabel: "Listings",
        scene: "marine-listings",
        title: "Build listings as data, not pages",
        body: "Listings, sellers and enquiries live in related CMS collections, and every listing page is generated from them, so the catalogue grows without anyone touching a page.",
        deliverables: [
          "Listings and seller CMS",
          "Dynamic listing pages",
          "Search and filters",
        ],
      },
      {
        navLabel: "Enquiries",
        scene: "marine-enquiries",
        title: "Route enquiries without exposing anyone",
        body: "Enquiries reach the right seller or skipper, notifications go out straight away, and private contact details stay private. Where the platform needs more than its defaults, custom Velo code covers it.",
        deliverables: [
          "Enquiry routing",
          "Seller notifications",
          "CRM capture",
        ],
      },
      {
        navLabel: "Design",
        scene: "marine-design",
        title: "Let the vessel and the water sell it",
        body: "Large photography for the boat, specs a buyer can scan in seconds, and a price that's never hard to find. The design follows how people shortlist.",
        deliverables: [
          "Wireframes and copy",
          "Listing and category pages",
          "The site, built in Wix Studio",
        ],
      },
      {
        navLabel: "Launch",
        scene: "marine-launch",
        title: "Launch before the season",
        body: "We set the launch against your calendar, so the site is live before the boat show or the season opens. Your old site stays up until the switch.",
        deliverables: [
          "Redirects and domain",
          "Analytics and Search Console",
          "Handover walkthrough",
          "30 days of support",
        ],
      },
    ],
  },

  testimonials: {
    heading: "What clients say",
    intro: "The partner behind Yacht Junky and other clients we've built for, in their own words.",
    // Owner, 18 Nov 2026: industry voices first, then general ones to fill.
    items: [
      { id: "flynn-blackie", context: "The partner behind Yacht Junky" },
      { id: "michael-forte" },
      { id: "erin-camp" },
      { id: "luka-stojakovic" },
    ],
  },

  work: {
    heading: "Marine websites we've built",
  },

  pricing: {
    heading: "What a marine website costs",
    note: "Fixed prices, agreed before we start. Choose by how many listing types, sides and enquiry routes the site needs.",
    notes: {
      landing: "For a boat show, a charter season or one listing campaign, live in about a week.",
    },
  },

  faq: {
    heading: ["Marine website", "questions"],
    subhead: "Straight answers on marketplaces, listings, enquiries, cost and timing.",
    items: [
      {
        q: "How much does a boat or yacht website cost?",
        a: `A full site starts ${lower(minimum.price)} for ${lower(minimum.scope)} in ${minimum.timeline}, and ${studio.name} is ${studio.price} for ${lower(studio.scope)} in ${studio.timeline}, with a CMS for listings. A single campaign page is ${lower(landing.price)}, ${lower(landing.timeline)}. ${yj.client}'s marketplace was built in ${yjBuild}.`,
      },
      {
        q: "Can you build a boat or yacht marketplace on Wix Studio?",
        a: `Yes. ${yj.client} is a multi-seller marketplace built entirely inside Wix Studio: the native CMS holds listings, sellers and enquiries, and Velo adds ${yjFeatures} marketplace features with no external services or hosting. The honest limit: payments between buyer and seller, escrow and full seller dashboards argue for a custom build.`,
      },
      {
        q: "Can buyers see boat prices in their own currency?",
        a: `Yes. ${yj.client}'s listings convert prices between currencies on the page, because boat buyers and sellers are rarely in the same country.`,
      },
      {
        q: "How do private sellers get enquiries without publishing their contact details?",
        a: `The enquiry form on each listing routes to the seller behind it, who gets an email the moment it lands. On ${yj.client}, private sellers stay reachable without their contact details ever appearing on the site, and buyers keep a history of what they've asked about.`,
      },
      {
        q: "Can a dock rental site serve both dock owners and boaters?",
        a: `Yes, with a route for each from the first screen. The ${fldr.client} site gave dock owners a way to list their dock and boaters a way to find one, with booking and lead capture behind both, and brought in ${fldr.metric}.`,
      },
      {
        q: "Can I add boats and listings myself?",
        a: `Yes. On ${yj.client} a new vessel is a content entry, not a build task: add it in the CMS and its page appears with search and filters, so the team runs the marketplace without a developer.`,
      },
    ],
  },

  related: {
    heading: "More on marine websites",
    items: [
      {
        kind: "Service",
        label: "Wix Studio development",
        href: "/services/wix-studio-development",
        desc: "Velo, CMS architecture and integrations, the layer that turns a site into a marketplace.",
        icon: "code",
      },
      {
        kind: "Service",
        label: "Landing pages",
        href: "/services/landing-pages",
        desc: "Campaign pages for a boat show or a charter season, live in about a week.",
        icon: "split",
      },
      {
        kind: "Article",
        label: "Is Wix Studio good enough for a premium brand website?",
        href: "/blog/wix-studio-premium-brand",
        desc: "The platform's real limits, for brands selling at the top of the market.",
        icon: "pen",
      },
      {
        kind: "Industry",
        label: "Property and real estate websites",
        href: "/industries/property",
        desc: "Rentals and listings sites for property businesses.",
        icon: "house",
      },
    ],
  },

  finalCta: {
    heading: ["Good boats, good berths,", "too few enquiries?"],
    paragraph:
      "A free 20-minute call. We'll look at your site the way a buyer or a boater would, and tell you honestly what's stopping them from getting in touch.",
  },

  schema: {
    serviceName: "Yacht, boat and marina website design",
    description:
      "Website design and build on Wix Studio for boat and yacht marketplaces, brokers, charter companies and dock rentals, with searchable listings, private enquiry routing and multi-currency prices.",
  },
};
