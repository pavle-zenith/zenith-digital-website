import { INDUSTRIES } from "@/content/case-studies";
import type { IndustryPageContent } from "./types";
import { PACKAGES, card, figure, lower } from "./proof";

/**
 * /industries/property, written from the travel template (18 Nov 2026).
 * Held for owner review.
 *
 * No property project has a detail case study, so every project is a scope
 * card and the page claims scope, never results: St Matthew Place (a sales
 * site for a luxury development in Boka Kotorska), Superstan (searchable
 * listings and enquiry routing for an estate agency) and ARCOM Energy (coming
 * soon: property services on the French Riviera for three audiences, in
 * French and English). Details beyond the card lines are read off the sites'
 * own screenshots.
 *
 * OWNER, please confirm before publishing:
 *   1. ARCOM Energy is still "coming soon" but carries one FAQ. Drop it if it
 *      shouldn't be named before launch.
 *   2. David Opavski (Stilby) is quoted here because his words are about
 *      "real estate and architecture groups". Stilby itself still sits under
 *      e-commerce; see the open question on that page.
 */

const smp = card("st-matthew-place");
const superstan = card("superstan");
const arcom = card("arcom-energy");
// Owner, 18 Nov 2026: Just Stay is travel and property (short-let bookings
// and landlord lettings), so it shows here through its card's `alsoIn`.
const justStay = card("just-stay");
const justStayBuild = figure("just-stay", "Kickoff to launch");

const { minimum, studio, landing } = PACKAGES;

export const property: IndustryPageContent = {
  slug: "property",
  industry: "property",
  publish: true,
  updated: "2026-11-18",
  name: INDUSTRIES.property,
  filterLinkLabel: "See the property page",

  seo: {
    title: "Real estate and property website design | Zenith Digital",
    description:
      "Websites for estate agencies, developers and property services: searchable listings, development sales sites and enquiries routed to the right person.",
  },

  hero: {
    h1: "Property websites that turn browsers into serious enquiries",
    proof:
      "We design and build websites for estate agencies, property developers and property services, with searchable listings, development sales pages and enquiries that reach the right person.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" },
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "secondary",
      },
    ],
    // No property detail studies yet: the shots are the projects' own grid
    // cards.
    shots: {
      center: {
        src: "/case-studies/st-matthew-place/card.webp",
        alt: "St Matthew Place in a browser window: the headline Luksuzni stanovi u Boki Kotorskoj over the apartment building, with the apartment offer and location in the menu",
      },
      left: {
        src: "/case-studies/superstan/card.webp",
        alt: "Superstan's estate agency website in a browser window: a property search by service, property type and municipality over a night view of the city",
      },
      right: {
        src: "/case-studies/arcom-energy/card.webp",
        alt: "ARCOM Energy's website in a browser window: One partner, one point of contact, with separate routes for private homeowners, rental property managers and building managers",
      },
    },
  },

  inShort: `Zenith Digital designs and builds websites on Wix Studio for estate agencies, property developers and property services: searchable listings your team updates, sales sites for new developments, and enquiries routed by service and audience, in more than one language where buyers need it. A full site takes ${minimum.timeline.replace(" weeks", "")} to ${studio.timeline}. Prices start ${lower(landing.price)} for a landing page and ${lower(minimum.price)} for a full site.`,

  fit: {
    heading: "Who we work best with in property",
    good: [
      { icon: "building", text: "Developers selling a new build off-plan" },
      { icon: "search", text: "Estate agencies with listings to search" },
      { icon: "users", text: "Property services with several client types" },
    ],
    notAFit: [
      "You need a portal with agent logins",
      "You want listings pushed to portals automatically",
      "Your development has no plans or renders yet",
    ],
  },

  familiar: {
    heading: ["Buyers are looking.", "Your site makes them work for it."],
    intro:
      "Most property sites lose people between the first photo and the enquiry form. If two or three of these ring true, the rest of this page is for you.",
    items: [
      {
        icon: "search",
        title: "Buyers can't search your listings the way they think.",
        body: "We build search around how people actually look: buy or rent, property type, area and price.",
      },
      {
        icon: "building",
        title: "Off-plan buyers can't picture living there.",
        body: "We give the apartments, the location and the views their own pages, so the place sells before the floor plan.",
      },
      {
        icon: "send",
        title: "Every enquiry lands in one inbox, whoever it's meant for.",
        body: "We route each enquiry by service and property, so the right person answers it first.",
      },
      {
        icon: "users",
        title: "Owners, landlords and managers all land on the same page.",
        body: "We give each audience its own route and its own reasons, from the first screen.",
      },
      {
        icon: "languages",
        title: "International buyers can't read the listing.",
        body: "We build a version per language, so a buyer abroad reads the property in their own.",
      },
      {
        icon: "calendar",
        title: "The listings on your site were sold weeks ago.",
        body: "We put listings on a CMS your team updates in minutes, so what's on the site is what's available.",
      },
    ],
  },

  steps: {
    heading: "How we build a property website",
    intro: "Five steps, and what you have in hand at the end of each.",
    items: [
      {
        navLabel: "Audience",
        scene: "property-audience",
        title: "Decide who the site has to convince",
        body: "Buyers, renters, sellers, owners and building managers want different things from the first screen. We map each one to its own route before design, so nobody has to dig.",
        deliverables: [
          "Audience and route map",
          "Site map",
          "Fixed price and launch date",
        ],
      },
      {
        navLabel: "Listings",
        scene: "property-listings",
        title: "Build listings people can search",
        body: "Listings live in a CMS with the fields buyers filter by, and every property gets a page from one template, so adding the next one takes minutes, not a developer.",
        deliverables: [
          "Listings CMS",
          "Search and filters",
          "Listing page template",
        ],
      },
      {
        navLabel: "Design",
        scene: "property-design",
        title: "Sell the place, not just the property",
        body: "Location, views, light and materials do the selling for a development; clear facts and photos do it for a listing. The design follows whichever you sell.",
        deliverables: [
          "Wireframes and copy",
          "Development and location pages",
          "The site, built in Wix Studio",
        ],
      },
      {
        navLabel: "Enquiries",
        scene: "property-enquiries",
        title: "Route every enquiry to the right person",
        body: "Viewing requests, valuations and service calls each get a form that asks what that team needs, and lands with them, not in a shared inbox.",
        deliverables: [
          "Enquiry forms per route",
          "CRM and email routing",
          "Analytics events",
        ],
      },
      {
        navLabel: "Launch",
        scene: "property-launch",
        title: "Launch before the sales push",
        body: "We set the launch against your calendar: the sales release, the first viewing day, the campaign. Your old site stays up until the switch.",
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
    heading: "What property clients say",
    intro:
      "A short-let and lettings business, an estate agency manager and a real estate group director, in their own words.",
    items: [
      { id: "jack-shorrock" },
      { id: "luka-stojakovic" },
      { id: "david-opavski" },
    ],
  },

  work: {
    heading: "Property websites we've built",
  },

  pricing: {
    heading: "What a property website costs",
    note: "Fixed prices, agreed before we start. Choose by how many listings, developments and audiences need their own pages.",
    notes: {
      landing: "For one development, a sales release or a valuation campaign, live in about a week.",
    },
  },

  faq: {
    heading: ["Property website", "questions"],
    subhead: "Straight answers on listings, developments, enquiries, cost and timing.",
    items: [
      {
        q: "How much does a real estate website cost?",
        a: `A full site starts ${lower(minimum.price)} for ${lower(minimum.scope)} in ${minimum.timeline}, and ${studio.name} is ${studio.price} for ${lower(studio.scope)} in ${studio.timeline}, with a CMS for listings. A single development or campaign page is ${lower(landing.price)}, ${lower(landing.timeline)}.`,
      },
      {
        q: "Can I add and update property listings myself?",
        a: "Yes. Listings live in a CMS with fields for type, area, price and status, and each one renders from the same page template, so your team adds, edits and marks a property as sold without a developer.",
      },
      {
        q: "Can buyers search properties by area and type?",
        a: `Yes. ${superstan.client}'s estate agency site searches its listings by service, property type and municipality from the first screen, and routes each enquiry to the right place.`,
      },
      {
        q: "What should a new development website include?",
        a: `The development, the apartments on offer, the location and one clear way to enquire, each on its own page. ${smp.client}'s sales site for a luxury development in Boka Kotorska is built around exactly those, so the place sells before the floor plan does.`,
      },
      {
        q: "Can one site serve homeowners, landlords and building managers?",
        a: `Yes, with a route for each. ${arcom.client}'s site, launching soon, gives private homeowners, rental property managers and building managers their own entry point from the first screen, in French and English.`,
      },
      {
        q: "Can a property website win landlords as well as guests or tenants?",
        a: `Yes, with a funnel for each. ${justStay.client}, a UK short-let and lettings business, sends guests into direct booking and landlords into a lead pipeline for letting their properties through it, from the same site, live in ${justStayBuild}.`,
      },
      {
        q: "Can enquiries go to different agents or teams?",
        a: "Yes. Each form asks what that enquiry needs, a viewing, a valuation or a service call, and goes to the person or team who handles it, with a copy in your CRM.",
      },
    ],
  },

  related: {
    heading: "More on property websites",
    items: [
      {
        kind: "Service",
        label: "Wix Studio website design",
        href: "/services/wix-studio-website-design",
        desc: "The design and build service behind these sites, from structure to launch.",
        icon: "palette",
      },
      {
        kind: "Article",
        label: "How do you know if your business needs a new website?",
        href: "/blog/do-i-need-a-new-website",
        desc: "The signs that a refresh won't do, and what a rebuild should fix.",
        icon: "pen",
      },
      {
        kind: "Article",
        label: "Will a website redesign hurt your Google rankings?",
        href: "/blog/website-redesign-google-rankings",
        desc: "How to rebuild an agency site without losing the searches it already wins.",
        icon: "pen",
      },
      {
        kind: "Migration guide",
        label: "WordPress to Wix Studio",
        href: "/services/wordpress-to-wix-studio",
        desc: "What happens to plugins, listings and custom content when the stack changes.",
        icon: "transfer",
      },
    ],
  },

  finalCta: {
    heading: ["Good properties,", "too few enquiries?"],
    paragraph:
      "A free 20-minute call. We'll look at your site the way a buyer would, and tell you honestly what's stopping them from getting in touch.",
  },

  schema: {
    serviceName: "Real estate and property website design",
    description:
      "Website design and build on Wix Studio for estate agencies, property developers and property services, with searchable listings, development sales pages and enquiry routing by service and audience.",
  },
};
