import type { AuditPage } from "./types";

/**
 * Lifetime Learning Center, Seattle. Free audit request, focus on SEO setup.
 * Findings checked 30 Sep 2026 against the live site, its sitemaps and Google.
 * Full record: public/audits/lifetime-learning-center/website-audit.pdf.
 * Prices are owner-set (30 Sep 2026). The credit line is an owner offer:
 * delete `credit` to withdraw it.
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
      "A hand-reviewed audit of lifetimelearningcenter.org: what's holding it back in Google, the three fixes that matter most, and two ways forward.",
  },

  hero: {
    eyebrow: "Private website audit",
    heading: "Lifetime Learning Center",
    lead: [
      "Google already knows where you are. Your website just doesn't tell it what you are. Your map listing shows up when people look for learning programs for older adults in Seattle, but it doesn't appear to be managed by anyone at LLC, and the website behind it gives Google very little to work with.",
      "Below: what we found, the three fixes that matter most, and two ways to get it done.",
    ],
    loomId: "",
    pdfHref: "/audits/lifetime-learning-center/website-audit.pdf",
    pdfLabel: "Download the full audit (PDF)",
    callCta: { label: "Book 15 minutes", href: "/book-a-call" },
  },

  stats: [
    { value: "108", label: "pages your site lists for Google" },
    { value: "0 of 16", label: "main pages have a description" },
    { value: "53 of 54", label: "event pages are for past events" },
    { value: "6", label: "Google reviews, on an unclaimed listing" },
  ],

  working: {
    heading: "What's already working",
    items: [
      "The site is light and loads quickly, and the phone version is easy to read.",
      "Close to 40 written class descriptions every term: real content Google rewards.",
      "You already appear in Google's map results for lifelong learning for older adults in Seattle.",
      "Prices are stated plainly: $20 to register, $40 per class.",
    ],
  },

  fixes: {
    heading: "The three things we'd fix first",
    items: [
      {
        title: "Claim your Google Business Profile",
        why: "It's where you already show up, and right now it offers \"Own this business?\" to anyone who searches your name.",
        fix: "Claim it, add real class photos, term hours and a description, and ask students for a review at the end of each term.",
        effort: "About an hour, plus a few days for Google's verification",
      },
      {
        title: "Give every page a proper name",
        why: "Your homepage appears in Google as \"HOME | Lifetime Learning\", and none of your main pages has a description, so Google has to guess.",
        fix: "Titles, descriptions and one clear heading for the 16 main pages, plus one naming template each for class and event pages.",
        effort: "A day of careful work, done once",
      },
      {
        title: "Clear out what Google shouldn't see",
        why: "Next to your real classes sit an unedited Wix template page, a test event set in Ontario, Canada, two cancelled classes and 53 past events.",
        fix: "Remove or hide them, agree a simple rule for each new term, and connect Google Search Console.",
        effort: "Half a day, then ten minutes a term",
      },
    ],
  },

  evidence: {
    heading: "What we saw",
    items: [
      {
        src: "/audits/lifetime-learning-center/google-listing.webp",
        alt: "Google results for Lifetime Learning Center Seattle, showing the listing with an Own this business link",
        caption: "Searching your name: the listing offers \"Own this business?\" and shows a Street View photo. In our check, the results under it were an obituary and a boat club, not your website.",
        width: 800,
        height: 530,
      },
      {
        src: "/audits/lifetime-learning-center/team-page.webp",
        alt: "The team page on the LLC website showing Wix template placeholder text",
        caption: "/team, listed for Google: the Wix template text was never replaced.",
        width: 560,
        height: 250,
      },
      {
        src: "/audits/lifetime-learning-center/placeholder-event.webp",
        alt: "A placeholder event page titled Event with the text event description",
        caption: "A placeholder event, still published and still listed for Google.",
        width: 560,
        height: 420,
      },
    ],
  },

  findings: {
    heading: "Everything we found",
    summary: "22 findings in five groups. The PDF has the full detail on each.",
    groups: [
      {
        name: "Your Google listing",
        items: [
          { finding: "Business profile appears unclaimed", why: "Anyone can suggest edits to your hours or phone number, and you can't reply to reviews or add photos.", priority: "high" },
          { finding: "Listing links to the old http:// address", why: "An extra redirect on every click, and a sign the listing hasn't been touched in a while.", priority: "medium" },
          { finding: "6 reviews", why: "Reviews are one of the main things that move you up the map results.", priority: "medium" },
        ],
      },
      {
        name: "Page names and descriptions",
        items: [
          { finding: "Titles like \"HOME\", \"ABOUT\", \"CLASSES\"", why: "The title is the link people click in Google, and \"HOME\" says nothing about you.", priority: "high" },
          { finding: "No description on any main page", why: "Google fills the gap with whatever text it finds first.", priority: "high" },
          { finding: "No main heading on 13 of 16 main pages", why: "The main heading is how Google confirms what a page is about.", priority: "medium" },
          { finding: "Class page titles don't say what or where", why: "\"Watercolor Basics S1\" could be anywhere in the world.", priority: "medium" },
          { finding: "Site name set to \"Lifetime Learning\"", why: "Google may show the shorter name instead of the one people search for.", priority: "low" },
          { finding: "One class title cut short by hidden characters", why: "\"Intermediate Spanish Conversation Prac\" is how it shows in Google.", priority: "low" },
        ],
      },
      {
        name: "Pages Google shouldn't see",
        items: [
          { finding: "Wix template page at /team", why: "An unfinished page tells visitors, and Google, the site isn't looked after.", priority: "high" },
          { finding: "Test and placeholder events", why: "One is set in St. Catharines, Ontario, which muddies where Google thinks you are.", priority: "high" },
          { finding: "53 past events and 2 cancelled classes still live", why: "Old pages compete with current ones.", priority: "medium" },
          { finding: "About and Mission & Vision are the same page", why: "Two copies split what Google credits to either.", priority: "medium" },
          { finding: "Google still lists an old page address", why: "A sign Google hasn't revisited the site recently.", priority: "medium" },
        ],
      },
      {
        name: "Content Google can't read",
        items: [
          { finding: "The class schedule is embedded from another website", why: "Google and screen readers treat your most useful page as nearly empty.", priority: "high" },
          { finding: "Photo descriptions are file names", why: "Screen readers read \"Cercile and students_edited.jpg\" aloud.", priority: "medium" },
          { finding: "No sharing image or description", why: "Links shared by email, Facebook or Nextdoor show up blank.", priority: "medium" },
          { finding: "Default Wix icon in browser tabs", why: "Google shows it next to your result instead of your logo.", priority: "low" },
        ],
      },
      {
        name: "Trust and details",
        items: [
          { finding: "\"Contact\" in the menu goes to the homepage", why: "There's no page with hours, directions, parking and accessibility.", priority: "medium" },
          { finding: "Tax ID and \"2020-2024\" are phone links", why: "Tapping them on a phone tries to dial them.", priority: "low" },
          { finding: "Term end date says Friday 19 November", why: "It's a Thursday, and the Register page says so.", priority: "low" },
          { finding: "Described to Google as a generic local business", why: "Marking you as a nonprofit educational organization helps Google and AI assistants describe you correctly.", priority: "low" },
        ],
      },
    ],
  },

  offers: {
    heading: "Two ways forward",
    intro: "You can work through everything above yourselves, and the three fixes are the place to start. If you'd rather hand it off, these are the two ways we'd do it.",
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
    body: "We moved Bel'Istria's 35+ pages across, held every tracked ranking through launch, and gave each service its own page. Search impressions are up 257% year on year.",
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
