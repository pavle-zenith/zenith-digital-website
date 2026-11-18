import { INDUSTRIES } from "@/content/case-studies";
import type { IndustryPageContent } from "./types";
import { PACKAGES, card, detail, figure, lower } from "./proof";

/**
 * /industries/coaches, written from the travel template (18 Nov 2026). Held
 * for owner review.
 *
 * One detail study: Katie Hailey (Figma to live Wix Studio site in 1.5
 * weeks, Wix Events booking, CMS and CRM handed over). Jim Steele, Kevan
 * Christie, Mindful Productivity and Readmedial are scope cards, so the page
 * claims what was built for them, never results. Jim's "10+ venues
 * interested" stays on his card only, where it's stated as recorded.
 *
 * OWNER, please confirm before publishing:
 *   1. Testimonials: only Jim Steele and Traci Alexander (who mentions her
 *      life coaching business) are coaching clients on record. Katie, Kevan,
 *      Mindful Productivity and Readmedial have none. A video from any of them
 *      would lift this section most. Is Kayla Bloom (Wlcm2Wtvr, video) a
 *      coach? If so she can lead.
 */

const katie = detail("katie-hailey");
const katieBuild = figure("katie-hailey", "Figma to launch");
const jim = card("jim-steele");
const kevan = card("kevan-christie");
const mindful = card("mindful-productivity");

const { minimum, studio, landing } = PACKAGES;

export const coaches: IndustryPageContent = {
  slug: "coaches",
  industry: "coaches",
  publish: true,
  updated: "2026-11-18",
  name: INDUSTRIES.coaches,
  filterLinkLabel: "See the coaches page",

  seo: {
    title: "Coach, speaker and author website design | Zenith Digital",
    description: `Websites for coaches, speakers and authors that turn a reputation into booked calls, classes and keynotes. ${katie.client}: Figma to live in ${katieBuild}.`,
  },

  hero: {
    h1: "Websites that turn your name into bookings",
    proof:
      "We design and build websites for coaches, speakers, practitioners and authors that make the offer clear, put the proof up front, and take the booking or the enquiry.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" },
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "secondary",
      },
    ],
    shots: {
      center: "katie-hailey",
      left: {
        src: "/case-studies/jim-steele/card.webp",
        alt: "Jim Steele's speaker website in a browser window: the headline Better, smarter, stronger decision-making under pressure, a keynote photo and logos of past clients",
      },
      right: {
        src: "/case-studies/mindful-productivity/card.webp",
        alt: "Mindful Productivity's website in a browser window: an invitation to a half-day retreat under the headline Shake things up. Find your true north.",
      },
    },
  },

  inShort: `Zenith Digital designs and builds websites on Wix Studio for coaches, speakers, wellness practitioners and authors, with class and retreat booking, speaker enquiries and email sign-ups connected to a CRM you run yourself. A full site takes ${minimum.timeline.replace(" weeks", "")} to ${studio.timeline}. Prices start ${lower(landing.price)} for a landing page and ${lower(minimum.price)} for a full site.`,

  fit: {
    heading: "Who we work best with among coaches and speakers",
    good: [
      { icon: "calendar", text: "Practitioners booking classes, sessions or retreats" },
      { icon: "mic", text: "Speakers who need event bookers to say yes" },
      { icon: "pen", text: "Authors launching a book or a body of work" },
    ],
    notAFit: [
      "You want a link-in-bio page, not a website",
      "You haven't named what you offer yet",
      "You'd rather not show your face or name",
    ],
  },

  familiar: {
    heading: ["People know your name.", "Your website doesn't sell it."],
    intro:
      "Most coaching and speaker sites lose people between the first impression and the booking. If two or three of these ring true, the rest of this page is for you.",
    items: [
      {
        icon: "users",
        title: "The site is all about you, but not what you offer.",
        body: "We give each offer its own page, with who it's for, what happens and what it costs, so the next step is obvious.",
      },
      {
        icon: "mic",
        title: "Event bookers can't find your topics and reel in one place.",
        body: "We build keynote pages, a speaking reel and a bookers' kit, so an organiser can make the case for you internally.",
      },
      {
        icon: "calendar",
        title: "Classes and retreats get booked over email and DMs.",
        body: "We connect booking to the site and to one CRM, so every attendee and enquiry lands in the same place.",
      },
      {
        icon: "pen",
        title: "Your book is out, and the site still reads like a CV.",
        body: "We give the book, the press and the events their own pages, so readers and journalists find what they came for.",
      },
      {
        icon: "send",
        title: "Your free guide isn't collecting anyone's email.",
        body: "We build the guide, quiz or reflection into a page with its own sign-up, connected to your email tool.",
      },
      {
        icon: "brush",
        title: "Changing the class schedule means waiting on a developer.",
        body: "We hand over a site built around the parts you change, so updating dates and prices is your job, not ours.",
      },
    ],
  },

  steps: {
    heading: "How we build a coaching or speaker website",
    intro: "Five steps, and what you have in hand at the end of each.",
    items: [
      {
        navLabel: "Offer",
        scene: "coaches-offer",
        title: "Name the offer before the design",
        body: "We start with what you sell and who buys it: one-to-one coaching, classes, retreats, keynotes or a book. Each gets a page, and the homepage points people to the right one.",
        deliverables: [
          "Offer and audience map",
          "Site map",
          "Fixed price and launch date",
        ],
      },
      {
        navLabel: "Proof",
        scene: "coaches-proof",
        title: "Put the proof where the decision happens",
        body: "Logos of where you've spoken, video of you in the room, testimonials and press sit next to the offer they support, not on a separate page nobody opens.",
        deliverables: [
          "Proof and media plan",
          "Speaker or press kit page",
          "Testimonial layout",
        ],
      },
      {
        navLabel: "Booking",
        scene: "coaches-booking",
        title: "Connect bookings, calendars and the CRM",
        body: "Classes, sessions and retreats book on the site, speaking enquiries come in with the details an organiser needs, and everything lands in one CRM.",
        deliverables: [
          "Booking or event setup",
          "Enquiry forms",
          "CRM setup",
        ],
      },
      {
        navLabel: "Lead capture",
        scene: "coaches-leadcapture",
        title: "Turn visitors into a list",
        body: "Most visitors aren't ready to book. A free guide, quiz or newsletter keeps them close, with an email sequence that brings them back when they are.",
        deliverables: [
          "Lead magnet page",
          "Email sign-up and automation",
          "Analytics events",
        ],
      },
      {
        navLabel: "Handover",
        scene: "coaches-handover",
        title: "Hand it over so you run it",
        body: "We structure the site around what you change most, then walk you through it. The goal is a site you update between sessions, not one you wait on.",
        deliverables: [
          "Editable sections and CMS",
          "Handover walkthrough",
          "Redirects and domain",
          "30 days of support",
        ],
      },
    ],
  },

  testimonials: {
    heading: "What clients say",
    intro:
      "A keynote speaker, a coach running two businesses and other clients we've built for, in their own words.",
    // Owner, 18 Nov 2026: industry clients first, then general ones to fill.
    items: [
      { id: "jim-steele" },
      { id: "traci-alexander" },
      { id: "kayla-bloom" },
      { id: "christopher-barone" },
      { id: "erin-camp" },
    ],
  },

  work: {
    heading: "Coaching, speaker and author websites we've built",
  },

  pricing: {
    heading: "What a coaching website costs",
    note: "Fixed prices, agreed before we start. Choose by how many offers, events and pages need their own place.",
    notes: {
      landing: "For one offer, a retreat or a free guide, live in about a week.",
    },
  },

  faq: {
    heading: ["Coaching website", "questions"],
    subhead: "Straight answers on bookings, speaking, books, cost and timing.",
    items: [
      {
        q: "How much does a coaching or speaker website cost?",
        a: `A full site starts ${lower(minimum.price)} for ${lower(minimum.scope)} in ${minimum.timeline}, and ${studio.name} is ${studio.price} for ${lower(studio.scope)} in ${studio.timeline}. A single offer or retreat page is ${lower(landing.price)}, ${lower(landing.timeline)}. ${katie.client}'s site went from a finished design to live in ${katieBuild}.`,
      },
      {
        q: "Can people book my classes, sessions or retreats on my website?",
        a: `Yes. ${katie.client}'s classes, retreats and events book through Wix Events, native to the site, and every booking lands in the same CRM as her enquiries. ${mindful.client}'s site takes bookings for its half-day and weekend retreats.`,
      },
      {
        q: "What should a speaker website include?",
        a: `Your keynote topics, video of you speaking, the organisations you've spoken for, a bookers' kit an organiser can forward, and one clear way to enquire. ${jim.client}'s site is built around exactly that, with lead capture behind it.`,
      },
      {
        q: "Can you build a website for a book launch?",
        a: `Yes. ${kevan.client}'s site was built for his debut novel, with the book, his journalism archive, events and press each on their own page, so readers and the media find what they came for.`,
      },
      {
        q: "I already have my website designed in Figma. Can you build it?",
        a: `Yes. ${katie.client}'s design was finished in Figma, and we built it as designed in Wix Studio in ${katieBuild}, responsive behaviour included, with booking, CMS and CRM set up.`,
      },
      {
        q: "Can I update my own website after launch?",
        a: `Yes, that's the point of the handover. ${katie.client}'s site was built around the content she changes, with editable sections, a CMS and a CRM, and she has run it without a developer since.`,
      },
    ],
  },

  related: {
    heading: "More on coaching and speaker websites",
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
        label: "Why does your website get traffic but no enquiries?",
        href: "/blog/traffic-but-no-enquiries",
        desc: "Where visitors drop off between reading about you and getting in touch.",
        icon: "pen",
      },
      {
        kind: "Article",
        label: "How long does it take to build a Wix Studio website?",
        href: "/blog/wix-studio-build-time",
        desc: "Realistic timelines, and what speeds a build up or slows it down.",
        icon: "pen",
      },
      {
        kind: "Migration guide",
        label: "Squarespace to Wix Studio",
        href: "/services/squarespace-to-wix-studio",
        desc: "What carries over from Squarespace, and what has to be rebuilt.",
        icon: "transfer",
      },
    ],
  },

  finalCta: {
    heading: ["Known for what you do,", "but not booked for it?"],
    paragraph:
      "A free 20-minute call. We'll look at your site the way a new client or an event booker would, and tell you honestly what's stopping the booking.",
  },

  schema: {
    serviceName: "Coach, speaker and author website design",
    description:
      "Website design and build on Wix Studio for coaches, speakers, wellness practitioners and authors, with class and retreat booking, speaker enquiries and email sign-ups connected to the client's own CRM.",
  },
};
