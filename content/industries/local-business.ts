import { INDUSTRIES } from "@/content/case-studies";
import type { IndustryPageContent } from "./types";
import { PACKAGES, card, lower } from "./proof";

/**
 * /industries/local-business, written from the travel template
 * (18 Nov 2026). Held for owner review. Industry key "local".
 *
 * Two projects, both scope cards, so the page claims scope, never results:
 * Ameci Pizza Kitchen (menu, specials, catering and online ordering for a
 * family pizzeria in Irvine) and Bonnie Barbers (prices, recent cuts and
 * directions on Tranent High Street). Details beyond the card lines are read
 * off the sites' own screenshots. The clients' own figures (review counts,
 * prices) are theirs and never repeated here. The hero's third shot is BW
 * Kitchens, a local service business filed under trades.
 *
 * Testimonials (owner, 18 Nov 2026): local clients first, then general ones
 * to fill the section.
 */

const ameci = card("ameci-pizza-culver");
const bonnie = card("bonnie-barbers");

const { minimum, studio, landing } = PACKAGES;

export const localBusiness: IndustryPageContent = {
  slug: "local-business",
  industry: "local",
  publish: true,
  updated: "2026-11-18",
  name: INDUSTRIES.local,
  filterLinkLabel: "See the local business page",

  seo: {
    title: "Local business and restaurant websites | Zenith Digital",
    description:
      "Websites for barbers, restaurants, shops and local services: prices, menus and hours on the first screen, and the booking or order button where people look.",
  },

  hero: {
    h1: "Local business websites that people find, trust and visit",
    proof:
      "We design and build websites for barbers, restaurants, shops and local services, with the prices, the menu, the hours and the booking or order button where people look first.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" },
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "secondary",
      },
    ],
    // No local detail studies yet: the shots are grid cards. BW Kitchens is
    // filed under trades but is a local service business in Worthing.
    shots: {
      center: {
        src: "/case-studies/bonnie-barbers/card.webp",
        alt: "Bonnie Barbers' website in a browser window: the headline Fresh cuts on Tranent High Street, a Book a cut button and today's opening status",
      },
      left: {
        src: "/case-studies/ameci-pizza-culver/card.webp",
        alt: "Ameci Pizza Kitchen's website in a browser window: Irvine's neighborhood pizzeria since 1994, with pickup, delivery and catering, and buttons to order online or ask about catering",
      },
      right: {
        src: "/case-studies/bw-kitchens/card.webp",
        alt: "BW Kitchens' website in a browser window: kitchen fitters and home remodelling contractors in Worthing, with a free quote button and photos of fitted kitchens",
      },
    },
  },

  inShort: `Zenith Digital designs and builds websites on Wix Studio for barbers, restaurants, shops and local services: prices or the menu, opening hours and directions on the first screen, booking or ordering one tap away, and your details set up for search and the map. A small site takes ${minimum.timeline} and starts ${lower(minimum.price)}; a single page starts ${lower(landing.price)}.`,

  fit: {
    heading: "Who we work best with among local businesses",
    good: [
      { icon: "calendar", text: "Barbers, salons and studios taking bookings" },
      { icon: "receipt", text: "Restaurants and cafés with a menu to keep current" },
      { icon: "map-pin", text: "Shops and services people visit in person" },
    ],
    notAFit: [
      "You need a till or POS system built",
      "You want your own delivery app built",
      "You have no photos of the place yet",
    ],
  },

  familiar: {
    heading: ["People find you on the map.", "Then your website loses them."],
    intro:
      "Most local business sites lose people in the first few seconds, on a phone, outside. If two or three of these ring true, the rest of this page is for you.",
    items: [
      {
        icon: "receipt",
        title: "People find you on Google Maps, then can't find your prices.",
        body: "We put the prices or the menu one tap from the first screen, written the way customers ask for them.",
      },
      {
        icon: "clipboard",
        title: "The menu on your site is last year's.",
        body: "We build the menu, the prices and the specials as content you change yourself, in minutes.",
      },
      {
        icon: "calendar",
        title: "Customers ring to ask if you're open.",
        body: "We show today's hours and whether you're open right now, next to the address and the phone number.",
      },
      {
        icon: "bag",
        title: "Pickup orders go through apps when they could come to you.",
        body: "We put your own order button on every screen, so regulars order from you directly.",
      },
      {
        icon: "shield",
        title: "Your best reviews never make it onto the site.",
        body: "We show your rating and a few real reviews next to the booking or order button, where people decide.",
      },
      {
        icon: "users",
        title: "Catering and group bookings get lost in DMs.",
        body: "We give them their own form, asking for the date, the numbers and the details, straight to your inbox.",
      },
    ],
  },

  steps: {
    heading: "How we build a local business website",
    intro: "Five steps, and what you have in hand at the end of each.",
    items: [
      {
        navLabel: "Essentials",
        scene: "local-essentials",
        title: "Put the essentials on the first screen",
        body: "What you do, where you are, when you're open, how to call and how to book or order. On a phone, outside your door, that's all most people need.",
        deliverables: [
          "First-screen plan",
          "Site map",
          "Fixed price and launch date",
        ],
      },
      {
        navLabel: "Booking",
        scene: "local-booking",
        title: "Connect booking or ordering",
        body: "The book or order button goes to the system you already use, and calling or getting directions is one tap.",
        deliverables: [
          "Booking or ordering link-up",
          "Click-to-call",
          "Directions and map",
        ],
      },
      {
        navLabel: "Menu",
        scene: "local-menu",
        title: "Prices and menus you keep current",
        body: "The menu, the price list and the specials are content you edit, not a PDF someone has to replace.",
        deliverables: [
          "Editable menu or price list",
          "Specials or offers section",
          "Photo gallery",
        ],
      },
      {
        navLabel: "Local search",
        scene: "local-localsearch",
        title: "Help search and the map send people to you",
        body: "Your name, address, hours and phone match everywhere, your details are marked up for search engines, and the site and your Google Business Profile point at each other.",
        deliverables: [
          "Business details and schema",
          "Google Business Profile links",
          "Reviews section",
        ],
      },
      {
        navLabel: "Launch",
        scene: "local-launch",
        title: "Launch without a day offline",
        body: "We set the launch date with you and switch over without taking the site down, so nobody looking for you finds a gap.",
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
    intro:
      "A party rental owner, a home care business owner and other clients we've built for, in their own words.",
    items: [
      { id: "erin-camp" },
      { id: "traci-alexander" },
      { id: "kayla-bloom" },
      { id: "luka-stojakovic" },
      { id: "evy-hansen" },
    ],
  },

  work: {
    heading: "Local business websites we've built",
  },

  pricing: {
    heading: "What a local business website costs",
    note: "Fixed prices, agreed before we start. Most local businesses need The Minimum; add pages when there's a reason to.",
    notes: {
      landing: "For one page with your prices, hours, booking and directions, live in about a week.",
    },
  },

  faq: {
    heading: ["Local business", "website questions"],
    subhead: "Straight answers on menus, bookings, the map, cost and timing.",
    items: [
      {
        q: "How much does a website for a small local business cost?",
        a: `${minimum.name} starts ${lower(minimum.price)} for ${lower(minimum.scope)}, live in ${minimum.timeline}, which covers most local businesses. A single page with your prices, hours and booking is ${lower(landing.price)}, ${lower(landing.timeline)}. ${studio.name} is ${studio.price} if you need more pages and a CMS.`,
      },
      {
        q: "What should a restaurant website have?",
        a: `The menu, today's hours, the address, the phone number and a way to order, all within a tap. ${ameci.client}'s site carries its menu, specials, catering, reviews and visit details, with an order online button on the first screen.`,
      },
      {
        q: "Can customers book appointments from my website?",
        a: `Yes. ${bonnie.client}'s site has a Book a cut button in the header and on the first screen, next to its prices, recent cuts and directions, so booking is one tap wherever someone is on the page.`,
      },
      {
        q: "Can I update my menu or prices myself?",
        a: "Yes. The menu, price list and specials are built as content you edit from the dashboard, so a price change or a new special goes up in minutes.",
      },
      {
        q: "Will a website help me show up on Google Maps?",
        a: "The map listing comes from your Google Business Profile, and the website backs it up: the same name, address and hours, your details marked up for search engines, and links in both directions. Nobody can promise a ranking, but a profile with a good site behind it gives Google more reasons to show you.",
      },
      {
        q: "Do I need a website if I already have Instagram and Google Maps?",
        a: "Usually, yes. People find you on the map and on social, then look for prices, the menu, the hours or a booking button. A website is where those live in one place you control, and it's what your Google profile links to.",
      },
    ],
  },

  related: {
    heading: "More on local business websites",
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
        label: "Why isn't my Wix website showing up on Google?",
        href: "/blog/wix-website-not-showing-on-google",
        desc: "The usual reasons a local site doesn't appear, and how to check yours.",
        icon: "pen",
      },
      {
        kind: "Comparison",
        label: "Wix Studio vs Squarespace",
        href: "/compare/wix-studio-vs-squarespace",
        desc: "The two most common choices for a local business site.",
        icon: "split",
      },
      {
        kind: "Industry",
        label: "Trades websites",
        href: "/industries/trades",
        desc: "Sites for builders, electricians and other trades that win quote requests.",
        icon: "wrench",
      },
    ],
  },

  finalCta: {
    heading: ["Busy in person,", "quiet online?"],
    paragraph:
      "A free 20-minute call. We'll look at your site the way someone standing outside your door would, and tell you honestly what's stopping them from coming in.",
  },

  schema: {
    serviceName: "Local business website design",
    description:
      "Website design and build on Wix Studio for barbers, restaurants, shops and local services, with prices or menus, opening hours, booking or ordering and local search setup.",
  },
};
