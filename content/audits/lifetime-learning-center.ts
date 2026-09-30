import type { AuditPage } from "./types";

/**
 * Lifetime Learning Center, Seattle. Free audit request, focus on SEO setup.
 * Every check verified 30 Sep 2026 against the live site, its sitemaps and
 * Google. Full record: public/audits/lifetime-learning-center/website-audit.pdf.
 * Prices are owner-set (30 Sep 2026). `credit` is an owner offer: delete it to
 * withdraw. Scores are computed from `checks`, never typed in.
 */
export const lifetimeLearningCenter: AuditPage = {
  slug: "lifetime-learning-center",
  client: "Lifetime Learning Center",
  clientUrl: "lifetimelearningcenter.org",
  date: "30 September 2026",
  focus: "Search and SEO setup",
  meta: {
    title: "Website audit | Lifetime Learning Center | Zenith Digital",
    description:
      "A hand-reviewed audit of lifetimelearningcenter.org: 34 checks across six areas, the three fixes that matter most, and two ways forward.",
  },

  hero: {
    eyebrow: "Private website audit",
    heading: "Lifetime Learning Center",
    verdict: "Great content, weak setup. Google knows where you are, but not what you are.",
    lead: "Your map listing already shows up when people look for learning programs for older adults in Seattle. The website behind it gives Google very little to work with. Everything below is fixable without starting over.",
    loomId: "",
    pdfHref: "/audits/lifetime-learning-center/website-audit.pdf",
    pdfLabel: "Download the full audit (PDF)",
    callCta: { label: "Book 15 minutes", href: "/book-a-call" },
  },

  score: {
    heading: "Your site score",
    method: "The share of the 34 checks below that your site passes. Partly counts as half. Every check is listed, so you can recount it.",
  },

  keyFixes: {
    heading: "Start here",
    items: [
      {
        title: "Claim your Google listing",
        body: "It's where people already find you, and right now it offers \"Own this business?\" to anyone who searches your name.",
        effort: "About an hour",
        segmentId: "google-listing",
      },
      {
        title: "Give every page a proper name",
        body: "Your homepage shows in Google as \"HOME | Lifetime Learning\", and none of your main pages has a description.",
        effort: "A day, done once",
        segmentId: "page-names",
      },
      {
        title: "Clear out what Google shouldn't see",
        body: "A template page, a test event set in Ontario, cancelled classes and 53 past events sit next to your real classes.",
        effort: "Half a day, then ten minutes a term",
        segmentId: "housekeeping",
      },
    ],
  },

  segments: [
    {
      id: "google-listing",
      name: "Google listing",
      googleSees: "A learning center at 3841 NE 123rd St, rated 4.7 from 6 reviews, that nobody has claimed.",
      checks: [
        { label: "Shows in Google's map results", status: "pass", detail: "Second for \"lifelong learning for older adults seattle\" when we checked." },
        { label: "Strong rating", status: "pass", detail: "4.7 stars." },
        { label: "Listing is claimed and managed", status: "fail", priority: "high", detail: "It shows \"Own this business?\", so anyone can suggest edits and you can't reply to reviews." },
        { label: "Enough reviews to compete", status: "fail", priority: "medium", detail: "6 reviews. Seattle Central's continuing education listing has 13." },
        { label: "Your own photos", status: "fail", priority: "medium", detail: "The only photo is a Street View shot of the building." },
        { label: "Links to the secure version of your site", status: "fail", priority: "medium", detail: "The listing still links to the old http:// address." },
      ],
      evidence: [
        {
          src: "/audits/lifetime-learning-center/google-listing.webp",
          alt: "Google results for Lifetime Learning Center Seattle, showing the listing with an Own this business link",
          caption: "Searching your name. In our check, the results under the listing were an obituary and a boat club, not your website.",
          width: 800,
          height: 530,
        },
      ],
    },
    {
      id: "page-names",
      name: "Page names and descriptions",
      googleSees: "A site called \"Lifetime Learning\" with pages named HOME, ABOUT and CLASSES.",
      checks: [
        { label: "Every page has its own title", status: "partial", priority: "low", detail: "Mostly, but two pairs of event pages share the same title." },
        { label: "Titles say what you offer and where", status: "fail", priority: "high", detail: "Your homepage title is \"HOME | Lifetime Learning\"." },
        { label: "Every main page has a description", status: "fail", priority: "high", detail: "None of the 16 main pages has one, so Google writes its own." },
        { label: "One main heading per page", status: "fail", priority: "medium", detail: "Missing on 13 of the 16 main pages, including the homepage." },
        { label: "Class pages named clearly", status: "fail", priority: "medium", detail: "\"Watercolor Basics S1\" could be anywhere, and one title is cut short to \"Spanish Conversation Prac\"." },
        { label: "Site name matches your name", status: "fail", priority: "low", detail: "Set to \"Lifetime Learning\", not \"Lifetime Learning Center\"." },
      ],
    },
    {
      id: "housekeeping",
      name: "Housekeeping",
      googleSees: "108 pages, including a template page, a test event in Ontario and 53 events that already happened.",
      checks: [
        { label: "Sitemap in place", status: "pass", detail: "Wix generates it and lists every page." },
        { label: "Old page addresses redirect", status: "pass", detail: "The old About copy redirects to Mission & Vision." },
        { label: "No template or test pages", status: "fail", priority: "high", detail: "/team still says \"I'm a title. Click here to edit me.\", and two test events are published." },
        { label: "Past events handled", status: "fail", priority: "medium", detail: "53 of 54 event pages are for events that already happened." },
        { label: "Cancelled classes taken down", status: "fail", priority: "medium", detail: "Bridge and Authoritarian Personality still have live pages marked CLASS CANCELLED." },
        { label: "No duplicate pages", status: "fail", priority: "medium", detail: "About and Mission & Vision are the same page." },
      ],
      evidence: [
        {
          src: "/audits/lifetime-learning-center/team-page.webp",
          alt: "The team page on the LLC website showing Wix template placeholder text",
          caption: "/team, listed for Google: the template text was never replaced.",
          width: 560,
          height: 250,
        },
        {
          src: "/audits/lifetime-learning-center/placeholder-event.webp",
          alt: "A placeholder event page titled Event with the text event description",
          caption: "A placeholder event, still published.",
          width: 560,
          height: 420,
        },
      ],
    },
    {
      id: "readable-content",
      name: "Content Google can read",
      googleSees: "Detailed class descriptions, and a schedule page with almost nothing on it.",
      checks: [
        { label: "Class descriptions in real text", status: "pass", detail: "Close to 40 written descriptions every term." },
        { label: "Business details describe a nonprofit school", status: "partial", priority: "low", detail: "Address and phone are marked up, but as a generic local business." },
        { label: "Class schedule readable on the page", status: "fail", priority: "high", detail: "It's embedded from another website, so Google sees the page as nearly empty." },
        { label: "Photos described", status: "fail", priority: "medium", detail: "Descriptions are file names, like \"Cercile and students_edited.jpg\"." },
        { label: "Sharing preview set", status: "fail", priority: "medium", detail: "Links shared by email, Facebook or Nextdoor show no image or description." },
        { label: "Your own site icon", status: "fail", priority: "low", detail: "The default Wix icon shows in browser tabs and next to your Google result." },
      ],
    },
    {
      id: "trust",
      name: "Trust and visitor details",
      googleSees: "Clear prices and contact details, but no page that tells a first-time visitor how to find you.",
      checks: [
        { label: "Prices stated plainly", status: "pass", detail: "$20 to register, $40 per class." },
        { label: "Address and phone on every page", status: "pass", detail: "In the footer site-wide." },
        { label: "A word from a student", status: "pass", detail: "Cynthia Ryan's quote on the homepage." },
        { label: "A page with hours, directions and parking", status: "fail", priority: "medium", detail: "\"Contact\" in the menu goes back to the homepage." },
        { label: "Numbers display correctly", status: "fail", priority: "low", detail: "Your Tax ID and \"2020-2024\" become phone links on the Support page." },
        { label: "Dates agree across pages", status: "fail", priority: "low", detail: "Class Descriptions says the term ends Friday 19 November. It's a Thursday." },
      ],
    },
    {
      id: "speed-mobile",
      name: "Speed and mobile",
      googleSees: "A light, quick site that reads well on phones.",
      checks: [
        { label: "Light pages", status: "pass", detail: "The homepage is under 200 KB." },
        { label: "Loads quickly", status: "pass", detail: "Main content appears in under a second on a normal connection." },
        { label: "Easy to read on a phone", status: "pass", detail: "Large text and big tap targets." },
        { label: "Adapts to tablets", status: "partial", priority: "medium", detail: "Tablets get the desktop layout shrunk to fit." },
      ],
    },
  ],

  offers: {
    heading: "Two ways forward",
    intro: "You can work through everything above yourselves, and \"Start here\" is the place to begin. If you'd rather hand it off, these are the two ways we'd do it.",
    options: [
      {
        id: "fix",
        label: "Option 1",
        name: "Fix what's there",
        price: "$950",
        priceNote: "one-time, nonprofit rate · about two weeks",
        bestFor: "Right if you want the basics sorted this term and the current site is staying.",
        recommended: false,
        includes: [
          "Google Business Profile claimed and completed",
          "Titles, descriptions and headings for the 16 main pages",
          "Naming templates for every class and event page",
          "Test, template, duplicate and cancelled pages cleaned up",
          "The class schedule rebuilt as real text on the page",
          "A Visit us page with hours, directions and parking",
          "Sharing image, icon and photo descriptions",
          "Search Console connected, with a 30-day check",
        ],
        cta: { label: "Start with the fix", href: "/book-a-call" },
      },
      {
        id: "rebuild",
        label: "Option 2",
        name: "Rebuild for results",
        price: "$2,500",
        priceNote: "one-time, nonprofit rate · about five weeks · 2 to 3 instalments",
        bestFor: "Right if you want new students finding you through Google, not just people who already know your name.",
        recommended: true,
        includes: [
          "Everything in Option 1",
          "Rebuilt in Wix Studio, in your existing Wix account",
          "Subject pages built around what people search for: art, history, writing, movement and languages",
          "Classes and the schedule managed in one place each term, readable by Google",
          "Designed for older eyes: large type, strong contrast, built to WCAG 2.1 AA",
          "A layout that works on phones, tablets and desktops",
          "Clear routes to register, volunteer as an instructor and donate",
          "Every existing page address redirected, so nothing in Google breaks",
          "Baseline before launch, report at 30 and 90 days",
        ],
        cta: { label: "Talk about the rebuild", href: "/book-a-call" },
      },
    ],
    comparison: {
      heading: "What each one gets you",
      columns: ["Fix what's there", "Rebuild for results"],
      rows: [
        { label: "Google describes you correctly", fix: "yes", rebuild: "yes" },
        { label: "Map listing claimed and complete", fix: "yes", rebuild: "yes" },
        { label: "Test and template pages gone", fix: "yes", rebuild: "yes" },
        { label: "Schedule readable by Google", fix: "yes", rebuild: "yes" },
        { label: "Found for subjects, not just your name", fix: "no", rebuild: "yes" },
        { label: "Works properly on tablets", fix: "no", rebuild: "yes" },
        { label: "Readable for older eyes", fix: "partial", rebuild: "yes", fixNote: "Current design, as is" },
        { label: "Registration path", fix: "partial", rebuild: "yes", fixNote: "Stays on Constant Contact", rebuildNote: "Shortened, on your site if you want it" },
        { label: "Results reporting", fix: "partial", rebuild: "yes", fixNote: "30-day check", rebuildNote: "30 and 90 days" },
      ],
    },
    ceiling: {
      heading: "Why the fix has a ceiling",
      body: [
        "The fix makes Google understand the site you have. It can't change what that site is.",
        "Your site is built in Wix's older editor, which uses a fixed desktop layout and a separate phone layout. Tablets get the desktop page shrunk to fit, and the structure stays as it is: a handful of main pages, class pages that change every term, and registration on a separate site.",
        "Google will describe you correctly and your map listing will work harder. Being found by someone searching for a watercolor or memoir writing class for seniors in Seattle takes pages built for those searches, and that's what the rebuild adds.",
      ],
    },
    credit:
      "Start with the fix and move to the rebuild within six months, and the $950 counts toward it.",
  },

  proof: {
    eyebrow: "Done before",
    heading: "Bel'Istria: from Wix's older editor to Wix Studio",
    body: "We moved Bel'Istria's 35+ pages across, gave each group of services its own page, and held every tracked ranking through the 30-day window after launch. Search impressions are up 257% year on year.",
    links: [
      { label: "Read the case study", href: "/case-studies/belistria" },
      { label: "How a Wix to Wix Studio move works", href: "/services/wix-classic-to-wix-studio" },
    ],
  },

  close: {
    heading: "Questions about any of this?",
    body: "Reply to my email, or book 15 minutes and we'll go through it together. No pressure either way. The audit is yours to use.",
    note: "Google shows different results by location and device, so the searches here reflect what we saw on 30 September 2026. Google Search Console is the reliable view, which is why both options start by connecting it.",
  },
};
