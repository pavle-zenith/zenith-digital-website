import { INDUSTRIES } from "@/content/case-studies";
import type { IndustryPageContent } from "./types";
import {
  PACKAGES,
  amountAndPeriod,
  detail,
  figure,
  lower,
  metricPart,
  rangeOf,
} from "./proof";

/**
 * /industries/travel — the reference page for the industry template (owner
 * brief, 17 Nov 2026). Built first and held for owner review.
 *
 * Every figure below is read from content/case-studies.ts through ./proof.
 * Scottish Luxury Experience's $521k is credited "with MOD Digital" wherever
 * it appears, because the result belongs to the full system, not the site.
 *
 * General claims about the booking platforms link the platforms' own help
 * pages (checked 17 Nov 2026). No commission percentage is quoted: both
 * platforms vary it by market, contract and property type.
 *
 * Consistent with the published article "What makes a good luxury travel
 * website?" (bookable or tailored, the price sets the brief, the site's job
 * ends at the conversation), which this page links rather than repeats.
 */

const sle = detail("scottish-luxury-experience");
const [sleAmount] = amountAndPeriod("scottish-luxury-experience");
const [tripFrom, tripTo] = rangeOf(figure("scottish-luxury-experience", "Trips sold"));
const sleBuild = figure("scottish-luxury-experience", "Kickoff to launch");

const belGrowth = figure("belistria", "YoY impression growth");

const justStayBuild = figure("just-stay", "Kickoff to launch");

const stilbyLanguages = metricPart("stilby", /\d+ languages/);
const mindedLanguages = metricPart("minded", /\d+ languages/);

const { minimum, studio, landing } = PACKAGES;

export const travel: IndustryPageContent = {
  slug: "travel",
  industry: "travel",
  publish: true,
  updated: "2026-11-17",
  name: INDUSTRIES.travel,
  filterLinkLabel: "See the travel page",

  seo: {
    title: "Travel agency and tour operator websites | Zenith Digital",
    description: `Websites for travel agencies and tour operators that take enquiries and bookings direct. ${sle.client}: ${sleAmount} booked, with MOD Digital.`,
  },

  hero: {
    h1: "Travel websites that take the booking themselves",
    // Owner, 18 Nov 2026: the hero paragraph says what we do and for whom. The
    // SLE figure lives on its project card, the FAQ and the meta description.
    proof:
      "We design and build websites for travel agencies, tour operators and holiday rentals that turn interest into direct bookings and well-briefed enquiries, connected to the booking system you already run.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" },
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "secondary",
      },
    ],
    shots: {
      center: "scottish-luxury-experience",
      left: "belistria",
      right: "just-stay",
    },
  },

  inShort: `Zenith Digital designs and builds websites on Wix Studio or in custom code for travel agencies, tour operators, holiday rentals, transfer companies and adventure brands, with the booking or enquiry flow connected to the system you already run. A full site takes ${minimum.timeline.replace(" weeks", "")} to ${studio.timeline}. Prices start ${lower(landing.price)} for a campaign landing page and ${lower(minimum.price)} for a full site.`,

  fit: {
    heading: "Who we work best with among travel businesses",
    good: [
      { icon: "compass", text: "Tour operators selling tailored trips by enquiry" },
      { icon: "house", text: "Holiday rentals paying platform fees on repeat guests" },
      { icon: "map-pin", text: "Transfer firms that need a page per route" },
    ],
    notAFit: [
      "You need a booking engine built from scratch",
      "Your season opens in under two weeks",
      "You want guests to keep booking on Airbnb",
    ],
  },

  familiar: {
    heading: ["Guests find you.", "Then they book somewhere else."],
    intro:
      "Most of the bookings a travel website loses, it loses before anyone gets in touch. If two or three of these ring true, the rest of this page is for you.",
    items: [
      {
        icon: "receipt",
        title: "Repeat guests still book you through Airbnb or Booking.com.",
        body: "Every one of those bookings pays the platform. We give your site its own booking route, so guests who already know you book direct.",
        sources: [
          {
            label: "Airbnb: service fees",
            href: "https://www.airbnb.com/help/article/1857",
          },
          {
            label: "Booking.com: our commission",
            href: "https://partner.booking.com/en-us/help/commission-invoices-tax/commission/understanding-our-commission",
          },
        ],
      },
      {
        icon: "palette",
        title: "The website looks cheaper than the trips it sells.",
        body: "We set the design from your price tag: real photography, restrained type, nothing that reads as a template.",
      },
      {
        icon: "form",
        title: "Enquiries arrive with nothing you can quote from.",
        body: "We build the enquiry around what your sales call needs, then hand it to a person, not a checkout.",
      },
      {
        icon: "search",
        title: "One page is trying to rank for every route and service.",
        body: "We give each service, route and place its own page, so each one can answer the searches made for it.",
      },
      {
        icon: "calendar",
        title: "The properties on your site are out of date again.",
        body: "We connect the site to the booking system you already run, so what's listed is what's bookable.",
      },
      {
        icon: "languages",
        title: "Guests from abroad can't read the trip in their language.",
        body: "We build each trip a page per language, so a guest searching in German lands on the German version.",
      },
    ],
  },

  steps: {
    heading: "How we build a travel website",
    intro: "Five steps, and what you have in hand at the end of each.",
    items: [
      {
        navLabel: "Booking model",
        scene: "travel-booking",
        title: "Decide bookable or tailored",
        body: "Transfers and set experiences are bookable; a trip built around one client is tailored and needs an enquiry, not a cart. We settle it before design, because the structure, the traffic and the last step all follow from it.",
        deliverables: [
          "Booking or enquiry plan",
          "Site map",
          "Fixed price and launch date",
        ],
      },
      {
        navLabel: "Integrations",
        scene: "travel-sync",
        title: "Connect the booking system you already run",
        body: "If you take bookings through a booking engine or channel manager, the site plugs into it rather than replacing it. Where it offers an integration, your listings stay in sync and nobody re-uploads them.",
        deliverables: [
          "Booking integration",
          "Listing sync",
          "Enquiry routing",
        ],
      },
      {
        navLabel: "Page structure",
        scene: "travel-pages",
        title: "Give every service, route and place its own page",
        body: "Guests search for the service in the place. One page per service, route or destination lets each answer its own searches, and a CMS means the next one is yours to add.",
        deliverables: [
          "Service and destination pages",
          "Editable collections",
          "On-page SEO and schema",
          "Language versions",
        ],
      },
      {
        navLabel: "Design",
        scene: "travel-design",
        title: "Let the destination do the selling",
        body: "The design brief comes from your price: cinematic photography, restrained type and unhurried pacing for premium trips; clear prices and dates for stays. On a travel site the imagery is the product, so plan the photography before the features.",
        deliverables: [
          "Wireframes and copy",
          "The site, built in Wix Studio or custom code",
          "Copy written for how guests decide",
        ],
      },
      {
        navLabel: "Launch",
        scene: "travel-launch",
        title: "Launch before the season",
        body: "We set the launch date against your calendar, so the site is live before the season opens and before the first campaign spends. Your old site stays up until the switch.",
        deliverables: [
          "Redirects and domain",
          "Analytics and Search Console",
          "Handover walkthrough",
          "30 days of support",
        ],
      },
    ],
  },

  // "What clients say", not "What travel clients say": Joshua Christie's
  // Alluring Endeavours (owner's pick, 18 Nov 2026) isn't confirmed as a
  // travel business. Restore "travel" once it is.
  testimonials: {
    heading: "What clients say",
    intro:
      "A short-let host, a luxury tour brand's partner, a transfer company in Istria and a marketing lead, in their own words.",
    items: [
      { id: "jack-shorrock" },
      {
        id: "flynn-blackie",
        context: "The partner behind Scottish Luxury Experience",
      },
      { id: "ivan-belobrajdic" },
      { id: "joshua-christie" },
    ],
  },

  work: {
    heading: "Travel websites we've built",
  },

  pricing: {
    heading: "What a travel website costs",
    note: "Fixed prices, agreed before we start. Choose by how many trips, routes or properties need a page of their own.",
    notes: {
      landing:
        "For a seasonal campaign or a single trip, live before the season opens.",
    },
  },

  faq: {
    heading: ["Travel website", "questions"],
    subhead: "Straight answers on bookings, platforms, cost and timing.",
    items: [
      {
        q: "How much does a travel website cost?",
        a: `A full site starts ${lower(minimum.price)} for ${lower(minimum.scope)} in ${minimum.timeline}, and ${studio.name} is ${studio.price} for ${lower(studio.scope)} in ${studio.timeline}. A single campaign landing page is ${lower(landing.price)}, ${lower(landing.timeline)}. ${sle.client} and Just Stay each took ${justStayBuild === sleBuild ? sleBuild : `${sleBuild} and ${justStayBuild}`} from kickoff to launch.`,
      },
      {
        q: "Can my website take bookings directly instead of through Airbnb or Booking.com?",
        a: "Yes, as long as there's a booking system for it to connect to. Just Stay's site lists properties synced from Bookeddirectly through Zapier and sends guests to its direct booking service, and Villa Maria's site takes bookings for its apartments and rooms without the OTAs. You don't have to leave the platforms: the site is where repeat and referred guests book without the fee.",
      },
      {
        q: "Does a tour operator need a booking engine or an enquiry form?",
        a: `An enquiry form if you sell tailored trips, a booking engine if you sell fixed products with set dates and prices. ${sle.client} sells journeys from ${tripFrom} to ${tripTo} through an enquiry that hands the client to its founders for a call; Bel'Istria's transfers are bookable, so its site carries two booking flows. Many operators need both.`,
      },
      {
        q: "Will moving my travel website off Wix Classic lose my Google rankings?",
        // Period checked against the Bel'Istria case study: January kickoff,
        // late-February 2025 launch. Zero rankings lost is owner-confirmed.
        a: `Not if every URL is mapped. Bel'Istria moved from Wix Classic to Wix Studio with full URL mapping and kept every tracked ranking through the move (January to February 2025), then grew search impressions ${belGrowth} year on year.`,
      },
      {
        q: "Can you build a travel website in more than one language?",
        a: `Yes. We've shipped sites in ${stilbyLanguages} for Stilby and ${mindedLanguages} for MindEd. On a travel site that means each trip, route and property gets a page in each language, so a guest searching in German lands on the German version.`,
      },
      {
        q: "Can you work alongside our marketing agency?",
        a: `Yes, and the strongest travel result on this page came that way. On ${sle.client}, MOD Digital ran the strategy, ads, CRM and proposals, and we built the website that fronts them in ${sleBuild}, to their campaign calendar. The ${sleAmount} belongs to that whole system, not to the site alone.`,
      },
    ],
  },

  related: {
    heading: "More on travel websites",
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
        label: "What makes a good luxury travel website?",
        href: "/blog/luxury-travel-website-design",
        desc: "Bookable or tailored, and what two luxury travel builds taught us about the difference.",
        icon: "pen",
      },
      {
        kind: "Industry",
        label: "Property and real estate websites",
        href: "/industries/property",
        desc: "Rentals and lettings sites, including Just Stay, which does both.",
        icon: "house",
      },
      {
        kind: "Migration guide",
        label: "Wix Classic to Wix Studio",
        href: "/services/wix-classic-to-wix-studio",
        desc: "The move Bel'Istria made, with what carries over and what gets rebuilt.",
        icon: "transfer",
      },
    ],
  },

  finalCta: {
    heading: ["Paying a platform for", "guests who'd book direct?"],
    paragraph:
      "A free 20-minute call. We'll look at how your bookings come in today and tell you honestly what a direct site would change.",
  },

  schema: {
    serviceName: "Travel website design",
    description:
      "Website design and build on Wix Studio or in custom code for travel agencies, tour operators, holiday rentals, transfer companies and adventure brands, with booking and enquiry flows connected to the operator's own systems.",
  },
};
