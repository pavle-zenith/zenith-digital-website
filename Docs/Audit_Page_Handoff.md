# Private audit pages (`/audit/[slug]`): build handoff for Claude Code

**For:** Zenith Digital website (Next.js 15 App Router, content in `content/`)
**Written:** 30 September 2026
**First client:** Lifetime Learning Center (`/audit/lifetime-learning-center`)
**Pattern references:** the `/p/` proposal pages (privacy layers, see `next.config.ts`), `/free-website-audit` (tone and components)

---

## 0. Division of labour: read first

**The copy in §5 is final.** Paste it as `content/audits/lifetime-learning-center.ts`, matching the type in §4. Don't rewrite, shorten or "improve" it. If a string doesn't fit a component, flag it; don't edit it.

Claude Code's job is the plumbing:

- the `AuditPage` type and the collection module;
- the route, the components and the four noindex layers;
- responsive behaviour, accessibility, typecheck and lint.

This is a **template**. Every future audit is one new content file and nothing else, so nothing client-specific goes in a component.

---

## 1. What this page is

When we deliver a free audit, the prospect gets:

- a Loom walkthrough;
- the PDF;
- this page.

The page is the short, on-brand version they can forward to a director or a board.

It has two jobs, in order:

1. Show them clearly what is wrong. Short, and proven with screenshots.
2. Put two priced ways forward side by side:
   - **Fix what's there:** cheaper, with an honest ceiling.
   - **Rebuild for results:** the one we recommend, and why.

It is **not a site page**:

- not indexed;
- not in the sitemap;
- not linked from anywhere;
- not in the nav.

It is a private document sent as a link, exactly like `/p/`.

Keep it short. The PDF is the full record. The page should take under three minutes to read, and the long findings list stays collapsed.

---

## 2. Privacy: the same four layers as `/p/`

Every layer is required, because any single one can be missed. Copy the reasoning comment from `next.config.ts`.

1. **Meta robots.** Route metadata sets `robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }`.
2. **Header.** Add `X-Robots-Tag: noindex, nofollow` in `next.config.ts` `headers()` for both of these:
   - `source: "/audit/:path*"`, the pages;
   - `source: "/audits/:path*"`, the public assets, including the PDF. A PDF can't carry a meta tag, so this header is its only protection.
3. **Sitemap.** Leave the route out of `app/sitemap.ts`. It's an allowlist, so do nothing, but add one line to its doc comment saying `/audit/` is deliberately absent.
4. **No internal links** to `/audit/...` anywhere on the site. Grep before you finish.

**Do NOT add a robots.txt Disallow.** robots.txt is public, so it would advertise the path, and a disallowed URL can still be indexed from a bare link because Google never reads the noindex.

**Other requirements:**

- **No `/audit` index page.** `app/audit/page.tsx` must not exist, so `/audit` returns 404.
- **Unknown slugs 404.** Use `dynamicParams = false`, `generateStaticParams` from the collection, and `notFound()`.

---

## 3. Files

```
content/audits/types.ts                    AuditPage type
content/audits/index.ts                    collection + getAudit(slug)
content/audits/lifetime-learning-center.ts §5, pasted as-is
app/audit/[slug]/page.tsx                  route, metadata, noindex
components/sections/audit-page/*           sections below (new folder)
next.config.ts                             two header entries
app/sitemap.ts                             comment only
```

**Assets are already in the repo** at `public/audits/lifetime-learning-center/`:

- `google-listing.webp` (800×530)
- `team-page.webp` (560×250)
- `placeholder-event.webp` (560×420)
- `website-audit.pdf`

Use `public/audits/` (plural), never `public/audit/`. That folder holds the `/free-website-audit` page's images and isn't related.

---

## 4. The type

```ts
export type AuditPriority = "high" | "medium" | "low";
export type AuditMark = "yes" | "no" | "partial";

export interface AuditPage {
  slug: string;
  client: string;              // "Lifetime Learning Center"
  clientUrl: string;           // display only, never a followed link
  date: string;                // "30 September 2026"
  focus: string;
  meta: { title: string; description: string };

  hero: {
    eyebrow: string;
    heading: string;
    lead: string[];            // paragraphs
    loomId: string;            // "" until recorded: render nothing, no empty frame
    pdfHref: string;
    pdfLabel: string;
    callCta: { label: string; href: string };
  };

  stats: { value: string; label: string }[];          // exactly 4
  working: { heading: string; items: string[] };      // 4
  fixes: {
    heading: string;
    items: { title: string; why: string; fix: string; effort: string }[];  // exactly 3
  };
  evidence: {
    heading: string;
    items: { src: string; alt: string; caption: string; width: number; height: number }[];
  };
  findings: {
    heading: string;
    summary: string;           // shown above the collapsed list
    groups: {
      name: string;
      items: { finding: string; why: string; priority: AuditPriority }[];
    }[];
  };

  offers: {
    heading: string;
    intro: string;
    options: {
      id: "fix" | "rebuild";
      label: string;           // "Option 1"
      name: string;
      price: string;
      priceNote: string;
      bestFor: string;
      recommended: boolean;
      includes: string[];
      cta: { label: string; href: string };
    }[];
    comparison: {
      heading: string;
      columns: [string, string];                       // option names
      rows: { label: string; fix: AuditMark; rebuild: AuditMark; fixNote?: string; rebuildNote?: string }[];
    };
    ceiling: { heading: string; body: string[] };
    credit?: string;           // optional line under the cards
  };

  proof?: {
    eyebrow: string;
    heading: string;
    body: string;
    links: { label: string; href: string }[];
  };

  close: { heading: string; body: string; note: string };
}
```

---

## 5. Content: `content/audits/lifetime-learning-center.ts`

```ts
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
```

---

## 6. Layout, top to bottom

Build it from the existing system (CLAUDE.md §7 and §15). Use `Section` for every band, hairline grids, `Button`, `Eyebrow`, `SectionHeader` and `StatBlock`. **No new tokens and no new fonts.**

1. **Hero** (dark, textured like the `/free-website-audit` hero).
   - Content: eyebrow, H1 = client name, meta line (`clientUrl · focus · date`), lead paragraphs.
   - Buttons: PDF download (`Button`, `download` attribute) and the call CTA.
   - Loom: if `loomId` is set, a 16:9 responsive `https://www.loom.com/embed/{id}` iframe with `title` = "Audit walkthrough for {client}" and `loading="lazy"`. If empty, render nothing: no placeholder, no empty frame.
   - The client URL is plain text. **Never link out to the client's site.**
2. **Stats** (light): the 4 `StatBlock`s in a hairline grid. 2×2 on phones, 4 across from `md`.
3. **What's working** (light): a two-column list with green check icons. Use the scalloped `VerifiedCheck` or a Lucide check in the local icon map.
4. **Three fixes** (light): numbered rows in a hairline grid.
   - Number chip, title, then "Why:" and "Fix:" with bold labels.
   - Effort shown as a `Pill`.
5. **What we saw** (light, `surface` tint).
   - Desktop: the Google screenshot large on the left, the two site screenshots stacked on the right. Phones: one column.
   - Use `next/image` with the given width and height, a thin border, radius 6, and captions in muted small text.
   - No lightbox needed.
6. **Everything we found** (light).
   - The `summary` line, then each group as a native `<details>` (closed by default) with the group name and item count in the `<summary>`.
   - Inside each group: rows of finding / why / a priority pill. Colour the pill by priority but **always print the word too**, so it's never colour alone.
   - A real `<table>` inside each details is fine. On phones, stack as cards.
7. **Two ways forward** (dark, textured, same backdrop as `Pricing`).
   - `intro`, then two option cards side by side from `md` (stacked on phones, rebuild first on phones).
   - The recommended card gets the white fill (same treatment as the highlighted pricing tier) and a "Recommended" badge.
   - Each card: label, name, price (display face) with `priceNote`, `bestFor` in italic muted text, the includes list, then the CTA.
   - The `credit` line sits centred under the cards in small muted text.
8. **Comparison** (same dark band, below the cards).
   - A real `<table>` with the criterion column plus two option columns.
   - Marks: `yes` = verified tick, `no` = cross, `partial` = a half/dash icon. Any note sits under its mark in small text.
   - Scrolls horizontally inside its frame on small screens, like `ComparisonTable`.
   - Build a small audit-specific table. **Don't reuse `ComparisonTable` itself**: it is hard-wired to `content/home`.
9. **Ceiling** (light): `heading` plus paragraphs, max width about 68ch. Plain and calm. **No warning colours.** This is honesty, not a scare.
10. **Proof** (light, `surface`): eyebrow, heading, body, two text links with `&rarr;` arrows.
11. **Close** (light): heading, body, `Button` to the call CTA, then the search-results `note` in muted small text.

**Global chrome:**

- Keep the site `Nav` and `Footer` from the root layout. Don't add the page to the nav.
- No `JsonLd` on this page: it's not meant to be understood by search engines.
- Default site OG image. OG title = `meta.title`.

---

## 7. Behaviour and accessibility

- **One H1** (client name). Section headings are H2, fix titles H3.
- **Priority is never shown by colour alone** (see above).
- **Contrast:** all text meets AA on both tones. Check the muted text on the dark offer band.
- **Downloads:**
  - The PDF link carries `download` and shows the file type and size ("PDF, 190 KB").
  - Compute the size at build time with `fs.statSync` in the page. Don't hardcode it.
- **Analytics:** leave PostHog's pageview as is (consent-gated). That's how we'll know the client opened it. Add no extra tracking.
- **Motion:** none beyond what shared components already do.

---

## 8. Definition of done

- [ ] `/audit/lifetime-learning-center` renders.
- [ ] `/audit` and `/audit/anything-else` return 404.
- [ ] `curl -I` on the page **and** on the PDF shows `X-Robots-Tag: noindex, nofollow`.
- [ ] Page HTML contains the robots meta with noindex, nofollow.
- [ ] `/sitemap.xml` contains no `/audit` URL.
- [ ] robots.txt is unchanged.
- [ ] `grep -r "/audit/" app components content` finds only the route itself and the audit content files.
- [ ] Copy matches §5 exactly. No em dashes, no banned words (CLAUDE.md §14).
- [ ] Checked at 375, 768 and 1280 widths.
- [ ] The option cards stack with the rebuild first on phones.
- [ ] The comparison table scrolls inside its frame.
- [ ] Empty `loomId` renders no video block.
- [ ] Adding a second audit needs only a new content file plus one line in `content/audits/index.ts`.
- [ ] `npx tsc --noEmit`, `npx eslint .` and `next build` are clean.
