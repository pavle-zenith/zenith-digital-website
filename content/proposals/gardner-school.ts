import { founderCore } from "../founder";
import type { AuditProposalPage } from "./types";

/**
 * The Gardner School (thegardnerschool.com): preschool and childcare,
 * 6 weeks to 5 years, company-owned, HQ Franklin, TN. An audit only, for
 * Brooke Newton (Chief Marketing Officer, new in the role): no offer, price,
 * timeline or payment wording anywhere. Her question, answered at the top:
 * launch the new site (gardner.jlb.webservice.team) or keep editing the live
 * one? Answer: launch it, after a pre-launch checklist. The audit is
 * structural (launch, SEO, AEO, conversion), not a punch list of an
 * unfinished site. Never blame the developer or the previous team.
 *
 * Rebuilt 17 Nov 2026 from the owner's Foresight scan of the new site's
 * homepage (not named on the page), with every point re-checked in a real
 * browser. Foresight points kept: hero leads with an aspiration, nothing a
 * competitor couldn't claim, no tuition signal, no third-party validation,
 * no analytics or consent, no meta descriptions or canonicals, alt text,
 * no FAQ markup. Foresight points dropped: "no self-serve tour booking" (the
 * ChildCare CRM tour form has a time step), its 51/100 and Analytics 0
 * scores (they score a staging site, where noindex and no tracking are
 * expected), "1,812 URLs" (the sitemap index lists 906).
 *
 * CHECKED 17 Nov 2026 on the new site:
 *   - robots.txt "Disallow: /"; homepage meta robots "noindex, nofollow".
 *   - No GTM, gtag, dataLayer or consent tool on the homepage. The live site
 *     runs GTM-NT9XMHM (checked 16 Nov).
 *   - Sitemaps: 45 schools (+ index), 666 tags, 118 posts, 7 programs,
 *     21 pages including 3 thank-you pages, /theme/ and /program-slider/.
 *     The live sitemap index has no tag sitemap.
 *   - Schools on live (50) but not on the new site: andover-ma,
 *     bannockburn-deerfield, hingham-ma, la-grange-park-il, maple-grove,
 *     milton-ma. Renamed: the-gardner-school-of-naperville-north,
 *     -of-warrenville, -at-yorktown-center, -of-st-louis-park (each now
 *     carries a metro prefix). Two Chelmsford pages on the new site.
 *   - Programs move from /infants/, /programs/toddlers/ etc. to /program/…;
 *     metros from /our-schools/chicago/ to /neighborhood/chicago-il-area/.
 *     No directors sitemap on the new site (236 director URLs live).
 *   - Homepage, /faq/, /schedule-a-tour/, /schools/bucktown/: no meta
 *     description, no canonical, JSON-LD only WebPage, BreadcrumbList,
 *     WebSite (+ ImageObject). Homepage title "Home - The Gardner School".
 *     42 of 48 homepage images without alt text.
 *   - Homepage H1 "For All They Will Become", with "Premier preschool and
 *     childcare for children 6 weeks to 5 years." in a smaller line above.
 *     No "franchis" on the homepage or FAQ. NAEYC only in a blog post title
 *     ("Two Gardner Schools Earn NAEYC Accreditation…").
 *   - FAQ: "more than 40 locations across Colorado, Illinois, Indiana,
 *     Kentucky, Massachusetts, Minnesota, Ohio, and Tennessee" (no Virginia,
 *     where Ashburn, Herndon and Manassas are). Tuition answer: "Tuition
 *     varies by location, age group, and schedule", no starting point.
 *   - Earlier agent check: tour form requires the child's date of birth,
 *     start date, days of the week and "how did you hear"; school pages show
 *     no rating. Listen360: 206 reviews for Oak Brook.
 * The live site's own details (Chicago metro page, Yelp widget, Bucktown's
 * names, director bio) are left out: the new site replaces it.
 */

const EMAIL = { label: "Email us", href: "mailto:hello@thezenithdigital.com" };
const ASSETS = "/proposals/gardner-school";

export const gardnerSchool: AuditProposalPage = {
  kind: "audit",
  slug: "gardner-iv8ce",
  client: "The Gardner School",
  lang: "en",
  meta: {
    title: "The Gardner School - SEO, AEO and conversion audit | Zenith Digital",
    description:
      "What to fix before the new Gardner School site launches, and what grows tour requests after it, benchmarked against Primrose and Goddard.",
    ogTitle: "The Gardner School: what to fix before and after launch",
    ogLocale: "en_US",
  },

  labels: {
    jump: "Contents",
    severity: { critical: "Critical", high: "High", medium: "Medium" },
    seen: "What we saw",
    why: "Why it matters",
    proposal: "What we recommend",
    duration: "Duration",
    price: "Price",
    mobileBar: "See where to start",
    missingImage: "[SCREENSHOT]",
  },

  hero: {
    eyebrow: "SEO, AEO and conversion audit",
    heading: "The Gardner School: what to fix before and after launch",
    lead: "A review of the new site and thegardnerschool.com, benchmarked against Primrose and The Goddard School. It covers what has to be right on launch day, and what grows tour requests after it.",
    meta: [
      { label: "Prepared for", value: "Brooke Newton, Chief Marketing Officer" },
      { label: "Date", value: "17 November 2026" },
      { label: "Prepared by", value: "Pavle Maodus, Zenith Digital" },
    ],
    primaryCta: { label: "See where to start", href: "#priorities" },
    secondaryCta: EMAIL,
  },

  summary: {
    id: "summary",
    heading: "In short",
    body: [
      "Launch the new site, after a short pre-launch checklist. It already has the school finder, tour booking on every school page and a real FAQ, so there's no reason to keep patching the old one. The risk is in the switch itself. After launch, the gains are in how clearly the site answers parents.",
    ],
    points: [
      "Six live schools have no page on the new site yet, and most addresses change.",
      "666 tag pages would be indexed next to 45 schools.",
      "Parents' questions are answered, but nothing marks them up for Google or AI.",
    ],
    fixesHeading: "Already working on the new site",
    fixes: [
      "School finder by ZIP and current location",
      "Tour booking on every school page",
      "An FAQ that answers what parents ask",
    ],
  },

  stats: {
    id: "at-a-glance",
    heading: "At a glance",
    items: [
      { value: "45", label: "school pages on the new site, against 50 on the live site" },
      { value: "666", label: "tag pages in the new site's sitemap, next to 118 articles" },
      { value: "0", label: "FAQ, organization or school markup on the pages we checked" },
      { value: "206", label: "Listen360 reviews for Oak Brook alone, none shown on the new school pages" },
    ],
  },

  findings: {
    id: "findings",
    heading: "What we found",
    intro: "Launch risks first, then what grows tour requests after launch.",
    items: [
      {
        id: "finding-1",
        number: "Finding 1",
        title: "The switch could drop six schools and break old links",
        severity: "critical",
        tag: "Launch",
        seen: [
          "The new site has 45 school pages, against 50 on the live site. Andover, Bannockburn-Deerfield, Hingham, La Grange Park, Maple Grove and Milton have no page yet.",
          [
            "Four schools change address: Naperville North, Warrenville, Yorktown and St. Louis Park.",
            "Every program and metro page moves, for example /infants/ to /program/infants/ and /our-schools/chicago/ to /neighborhood/chicago-il-area/.",
            "The live site's 236 director profiles have no page on the new site.",
            "The homepage still says 43 schools, with Chelmsford as the 44th.",
          ],
        ],
        why: [
          "Those school, program and metro pages are what ranks for \"preschool near me\" today. An address that changes without a redirect starts from zero, and a family searching for Hingham finds nothing.",
        ],
        proposal: [
          [
            "A page for every open school, and every count updated to 50",
            "A redirect from every old address to its new one: schools, programs, metro pages, and director profiles to their school",
            "The redirect list checked in Search Console in launch week",
          ],
        ],
        evidence: [
          {
            src: `${ASSETS}/new-site-numbers.webp`,
            alt: "The new site's homepage numbers band: 43 School Locations, 44,000 Students Reached, 20 Years of Care, 1000's Moments of Joy.",
            caption: "The new site's homepage still says 43 school locations.",
            width: 1600,
            height: 627,
          },
        ],
      },
      {
        id: "finding-2",
        number: "Finding 2",
        title: "Three switches to flip on launch day",
        severity: "critical",
        tag: "Launch",
        seen: [
          "As you'd expect for a site in progress, the new site asks search engines to stay away: robots.txt blocks every page and the homepage is marked noindex. It also has no analytics, tag manager or cookie consent yet, while the live site runs Google Tag Manager.",
        ],
        why: [
          "If either setting carries over, the new site disappears from Google, or you lose the tour data you'd use to judge the launch.",
        ],
        proposal: [
          [
            "The robots.txt block and noindex removed on launch day, then the sitemap submitted",
            "The live Tag Manager setup moved over, with cookie consent",
            "Finder, tour and contact events tracked by school from day one",
          ],
        ],
      },
      {
        id: "finding-3",
        number: "Finding 3",
        title: "666 tag pages would be indexed next to 45 schools",
        severity: "high",
        tag: "SEO",
        seen: [
          "The new site's sitemap lists 666 tag pages, like /tag/abcmouse-com/, against 118 articles and 45 schools. It also lists three thank-you pages, a /theme/ page and a /program-slider/ page. The live site keeps tags out of its sitemap.",
        ],
        why: [
          "Google judges a site by everything it's asked to index. Hundreds of near-empty tag pages dilute the school pages that bring families in, and thank-you pages in search make tour numbers look higher than they are.",
        ],
        proposal: [
          [
            "Tag pages kept for browsing, but out of the index and the sitemap",
            "Thank-you, theme and slider pages out too",
            "A sitemap of real pages only: schools, programs, metro areas and articles",
          ],
        ],
      },
      {
        id: "finding-4",
        number: "Finding 4",
        title: "Your answers are there, but Google and AI can't read them as answers",
        severity: "high",
        tag: "AEO",
        seen: [
          "The new FAQ answers what parents ask, from ages to potty training, but none of it is marked up as questions and answers. On the pages we checked (homepage, FAQ, tour page and Bucktown), the only structured data is basic page and breadcrumb markup. Nothing describes the company, or each school as a childcare business.",
          [
            "None of those pages has a meta description, and the homepage title is just \"Home - The Gardner School\".",
            "The FAQ lists eight states and leaves out Virginia, home to Ashburn, Herndon and Manassas.",
            "42 of 48 homepage images have no alt text.",
          ],
        ],
        why: [
          "Parents now ask Google's AI answers and ChatGPT things like \"infant care near me\" or \"what ages does The Gardner School take\". Those tools quote pages that state facts plainly and mark them up, and Goddard already lists exact ages for every class in its navigation.",
        ],
        proposal: [
          [
            "FAQ markup on the FAQ page, and a short FAQ on each school and program page",
            "Organization markup on the homepage, and childcare business markup on every school page: address, hours, ages",
            "A title and description for every key page, starting with the homepage and schools",
            "Alt text on photos, which also matters for accessibility",
          ],
        ],
      },
      {
        id: "finding-5",
        number: "Finding 5",
        title: "The homepage leads with a feeling, not the offer",
        severity: "high",
        tag: "Positioning",
        seen: [
          "The homepage's main heading is \"For All They Will Become\". What you offer, preschool and childcare for 6 weeks to 5 years, sits in a smaller line above it. Nothing on the homepage says the schools aren't franchised, and NAEYC accreditation only appears in a blog post.",
        ],
        why: [
          "A parent decides in seconds whether a site is for them, and answer engines read the main heading first. Primrose and Goddard both sell franchises from their main navigation, so one company running every classroom is a real difference. Today nobody sees it.",
        ],
        proposal: [
          [
            "A main heading that names the offer and who it's for, with the aspiration as the line under it",
            "A proof band: not franchised, 20 years, 50 schools, 44,000 students, NAEYC-accredited schools",
            "A short page on why company-owned matters, linked from the homepage",
          ],
        ],
      },
      {
        id: "finding-6",
        number: "Finding 6",
        title: "Ratings, the tour form and cost: what parents compare",
        severity: "high",
        tag: "Conversion",
        seen: [
          [
            "Your schools collect reviews on Listen360 (206 for Oak Brook alone), but the new school pages show no rating or review count.",
            "The tour form lets parents pick a time, but requires the child's date of birth, start date, days of the week and \"how did you hear about us\" before it sends.",
            "The FAQ's cost answer says tuition \"varies by location, age group, and schedule\", with no starting point or what's included.",
          ],
        ],
        why: [
          "A school's rating, how easy it is to book a visit, and a sense of cost are what parents compare between schools. Neither Primrose nor Goddard shows ratings on its school pages, so that's an open lane.",
        ],
        proposal: [
          [
            "Each school's Listen360 rating and review count on its page and in the finder",
            "Tour form step one: time, name, email and phone; the child's details after",
            "A clearer cost answer: what tuition includes, and a starting point per school if you're comfortable sharing one",
          ],
        ],
      },
    ],
  },

  mockup: {
    id: "design",
    heading: "What a school page should do",
    body: "Most families decide on a school page. One template, used for all 50 schools, does the heavy lifting.",
    image: {
      src: `${ASSETS}/school-page.webp`,
      alt: "Proposed school page template.",
      caption: "Proposed school page template.",
      width: 1440,
      height: 1308,
      small: { src: `${ASSETS}/school-page-small.webp`, width: 720, height: 1690 },
    },
    points: [
      {
        lead: "Facts first.",
        text: "Ages, hours, rating and director above the fold.",
      },
      {
        lead: "Answers on the page.",
        text: "A short FAQ that parents and AI assistants can both read.",
      },
      {
        lead: "Booking in view.",
        text: "A short tour request that stays reachable on phones.",
      },
    ],
  },

  priorities: {
    id: "priorities",
    heading: "Where to start",
    intro: "In this order.",
    rows: [
      {
        when: "Before launch",
        what: "Pages for the six missing schools, every count updated to 50, and a redirect for every school, program, metro and director address that changes. Tag, thank-you and theme pages out of the sitemap.",
      },
      {
        when: "Launch day",
        what: "Remove the robots.txt block and noindex, move Tag Manager and consent over, submit the sitemap and check the redirects in Search Console.",
      },
      {
        when: "First 30 days",
        what: "A homepage heading that names the offer, the proof band, a title and description for every key page, and FAQ, organization and school markup.",
      },
      {
        when: "Next 60 days",
        what: "Listen360 ratings on every school page, a shorter first step on the tour form, a clearer cost answer and alt text on photos. Then compare tour requests by school with launch week.",
      },
    ],
  },

  faq: {
    id: "questions",
    heading: "Questions",
    items: [
      {
        q: "Should we launch the new site?",
        a: "Yes, after the pre-launch checklist. It already does the hard parts: the school finder, tour booking from the school page and the FAQ.",
      },
      {
        q: "Will we lose Google rankings?",
        a: "Not if every address that changes gets a redirect and the six missing schools get pages before launch. Most of the risk sits in that list.",
      },
      {
        q: "Can our current developer do this?",
        a: "Yes. Everything here is standard WordPress work on the new site.",
      },
      {
        q: "Do we have to publish tuition?",
        a: "No. A clear answer on what tuition includes and how it's set helps parents without listing prices.",
      },
      {
        q: "How will we know it's working?",
        a: "Track tour requests by school and source from launch day, then compare month over month.",
      },
    ],
  },

  close: {
    id: "next-step",
    heading: "Next step",
    body: "Happy to walk your team through any of this. Reply with questions, or book a call.",
    primaryCta: EMAIL,
    secondaryCta: { label: "Book a call", href: "/book-a-call" },
    stats: [
      { value: "2", label: "sites reviewed, live and in development" },
      { value: "2", label: "competitors benchmarked" },
      { value: "6", label: "focus areas, ranked" },
      { value: "100+", label: "websites launched by Zenith Digital" },
    ],
    photo: { src: founderCore.image, alt: "Pavle Maodus, founder of Zenith Digital" },
    signature: ["Pavle Maodus", "Founder, Zenith Digital"],
  },
};
