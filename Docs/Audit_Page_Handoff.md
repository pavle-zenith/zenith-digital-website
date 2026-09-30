# Private audit pages (`/audit/[slug]`): build handoff for Claude Code

**For:** Zenith Digital website (Next.js 15 App Router, content in `content/`)
**Written:** 30 September 2026 · **Revised:** 30 September 2026 (v2: scored, segmented layout)
**First client:** Lifetime Learning Center (`/audit/lifetime-learning-center`)
**Pattern references:**

- the `/p/` proposal pages (privacy layers, see `next.config.ts`);
- `/free-website-audit` (tone and components);
- Flow Ninja's Foresight audit report (structure only, see §1).

---

## 0. Division of labour: read first

**The copy in §5 is final.** Paste it as `content/audits/lifetime-learning-center.ts`, matching the type in §4. Don't rewrite, shorten or "improve" it. If a string doesn't fit a component, flag it; don't edit it.

Claude Code's job is the plumbing:

- the `AuditPage` type, the scoring helper and the collection module;
- the route, the components and the four noindex layers;
- responsive behaviour, accessibility, typecheck and lint.

This is a **template**. Every future audit is one new content file and nothing else, so nothing client-specific goes in a component.

---

## 1. What this page is

When we deliver a free audit, the prospect gets:

- a Loom walkthrough;
- the PDF;
- this page.

The page is the version they read and forward to a director or a board.

It has two jobs, in order:

1. Show clearly what is wrong. It's scored, split into segments and colour-coded, so it can be scanned in a minute.
2. Put two priced ways forward side by side:
   - **Fix what's there:** cheaper, with an honest ceiling.
   - **Rebuild for results:** the one we recommend, and why.

**Structure borrowed from Flow Ninja's audit report.** It is easy to scan because it is split into segments, and every segment follows the same pattern:

- a coloured score;
- a green "working" list;
- a red "to fix" list;
- a one-line read of how the site comes across.

**Where we deliberately differ:**

- **Our score is not a black box.** It is simply the share of the listed checks that pass. Every check is on the page, so the client can recount it.
- **A scorecard of bars instead of a radar chart.** It's faster to read and works on a phone.
- **Built from our own system:** hairline grids, not floating cards.

It is **not a site page**:

- not indexed;
- not in the sitemap;
- not linked from anywhere;
- not in the nav.

It is a private document sent as a link, exactly like `/p/`.

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
content/audits/score.ts                    scoring + band helpers (§4)
content/audits/index.ts                    collection + getAudit(slug)
content/audits/lifetime-learning-center.ts §5, pasted as-is
app/audit/[slug]/page.tsx                  route, metadata, noindex
components/sections/audit-page/*           sections (new folder)
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

## 4. Type and scoring

```ts
export type CheckStatus = "pass" | "partial" | "fail";
export type AuditPriority = "high" | "medium" | "low";
export type AuditMark = "yes" | "no" | "partial";

export interface AuditCheck {
  label: string;             // the check, phrased as the good state
  status: CheckStatus;
  detail: string;            // what we found, one sentence
  priority?: AuditPriority;  // required when status !== "pass" (enforce with a dev-time assert)
}

export interface AuditImage { src: string; alt: string; caption: string; width: number; height: number }

export interface AuditSegment {
  id: string;                // anchor, e.g. "google-listing"
  name: string;
  googleSees: string;        // "How Google sees it" one-liner
  checks: AuditCheck[];
  evidence?: AuditImage[];
}

export interface AuditPage {
  slug: string;
  client: string;
  clientUrl: string;         // display only, never a followed link
  date: string;
  focus: string;
  meta: { title: string; description: string };

  hero: {
    eyebrow: string;
    heading: string;
    verdict: string;         // one line under the H1
    lead: string;
    loomId: string;          // "" until recorded: render nothing
    pdfHref: string;
    pdfLabel: string;
    callCta: { label: string; href: string };
  };

  score: { heading: string; method: string };   // number is computed, never typed

  keyFixes: {
    heading: string;
    items: { title: string; body: string; effort: string; segmentId: string }[];  // exactly 3
  };

  segments: AuditSegment[];

  offers: {
    heading: string;
    intro: string;
    options: {
      id: "fix" | "rebuild";
      label: string;
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
      columns: [string, string];
      rows: { label: string; fix: AuditMark; rebuild: AuditMark; fixNote?: string; rebuildNote?: string }[];
    };
    ceiling: { heading: string; body: string[] };
    credit?: string;
  };

  proof?: { eyebrow: string; heading: string; body: string; links: { label: string; href: string }[] };
  close: { heading: string; body: string; note: string };
}
```

**`score.ts`.** These are pure functions, used by both the gauge and the scorecard.

- **Points:** a `pass` is worth 1, a `partial` 0.5, a `fail` 0.
- **Segment score:** `Math.round(100 * points / checks.length)`.
- **Overall score:** computed across **all checks pooled together**, not as an average of the segment scores.
- **Counts:** return `{ passed, partial, failed, total }` as well, for the caption under the gauge.
- **Bands:**
  - `good` for scores of 75 and above;
  - `fair` for 40 to 74;
  - `poor` for below 40.
- **Band colours** use the existing signal tokens:

  | Band | Fill | Text |
  |---|---|---|
  | good | `--color-positive` | `--color-positive-ink` |
  | fair | `--color-warning` | `--color-warning-ink` |
  | poor | `--color-negative` | `--color-negative-ink` |

- **Priority colours** use the same tokens:
  - high = negative;
  - medium = warning;
  - low = muted text on a surface fill.
- **Never colour alone.** Every coloured element also prints its word: "Good", "Needs work", "Poor", "High", "Medium", "Low", "Partly".

**Expected numbers for this client, to test against:**

| | Score | Band |
|---|---|---|
| Overall | **37** (11 passed, 3 partly, 20 to fix, 34 checks) | poor |
| Google listing | 33 | poor |
| Page names | 8 | poor |
| Housekeeping | 33 | poor |
| Readable content | 25 | poor |
| Trust and visitor details | 50 | fair |
| Speed and mobile | 88 | good |

Write a small unit test (or a dev-only assert) that these come out exactly.

---

## 5. Content: `content/audits/lifetime-learning-center.ts`

```ts
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
```

---

## 6. Layout, top to bottom

Build it from the existing system (CLAUDE.md §7 and §15). Use `Section` for every band, hairline grids (`gap-px` over the rule colour, solid cells), `Button`, `Eyebrow`, `Pill` and `SectionHeader`.

- **No floating shadowed cards.** Where Flow Ninja uses cards, we use hairline-ruled panels.
- **No new tokens and no new fonts.** Status colours are the existing signal tokens (§4).

### 6.1 Hero (dark, textured like the `/free-website-audit` hero)

- **Left column:**
  - eyebrow;
  - H1 = client name;
  - the meta line (`clientUrl · focus · date`) in the mono caption style;
  - `verdict` in the display face at H3 size;
  - `lead` in muted body-large;
  - two buttons: PDF download (`download` attribute, label plus "PDF, 190 KB", with the size computed at build via `fs.statSync`) and the call CTA.
- **Right column:** the **score gauge** (6.2).
- **Loom:** if `loomId` is set, a 16:9 embed sits below, full frame width, titled "Audit walkthrough for {client}", `loading="lazy"`. If it's empty, render nothing.
- The client URL is plain text. **Never link out to the client's site.**

### 6.2 Score gauge

- **Shape:** an inline SVG semicircle.
  - Track in the rule colour.
  - Arc stroke in the overall band's fill colour, with rounded caps, proportional to the score.
- **Centre:** the score in the display face ("37") with a small "/100".
- **Under it:** the band word ("Poor"), then the counts line, "11 passed · 3 partly · 20 to fix", then `score.method` in small muted text.
- **Accessibility:** the SVG is `aria-hidden`, and a visually hidden sentence carries the numbers.
- **Motion:** the arc may draw in once on load. Skip that under reduced motion.

### 6.3 Jump bar (sticky)

A horizontal strip pinned under the site nav once the hero scrolls away.

- **Links:** one per segment (name plus its score in a small band-coloured pill), then "Your options".
- **Phones:** it scrolls sideways (hidden scrollbar, as in the §15 sliders).
- **Current section:** use `IntersectionObserver` to mark it with `aria-current`.
- **Offset:** set the sticky offset from the nav's real height, not a magic number.

### 6.4 Scorecard (light)

The replacement for Flow Ninja's radar chart. One row per segment, in a hairline grid:

- the segment name, as a link to its anchor;
- a horizontal bar (track plus band-coloured fill, width = score);
- the score number and the band word.
- Sort in content order. Don't sort by score, so the page and the scorecard agree.

### 6.5 Start here (light, `surface` tint)

- **The three `keyFixes`** as three numbered cells in a hairline grid: 3 across from `lg`, stacked on phones.
- **Each cell:** number chip, title, body, effort as a `Pill`, and "See details &rarr;" linking to its segment.
- **Why it's here:** this is the "key improvement points" block, moved up. A skimmer gets the answer before the detail.

### 6.6 Segments (alternate light / light-surface per segment)

For each segment, top to bottom:

1. **Heading row.**
   - H2 with the segment name.
   - To its right, a score `Pill` coloured by band: "33 · Poor".
   - Under the heading, "X of Y checks passed" in mono caption style.
2. **Two panels side by side** from `md` (stacked on phones, **fixes first on phones**):
   - **"What's working"** panel:
     - header chip in positive ink with a small dot;
     - each `pass` check is a row with a check icon, the label in medium weight, and the detail beneath in muted text.
   - **"What to fix"** panel:
     - header chip in negative ink;
     - each `fail` and `partial` check, **sorted high → medium → low**;
     - each row has a checkbox, the label, the detail, and a priority `Pill` (a `partial` also shows a "Partly" pill).
   - **Checkboxes** are a client convenience: "tick them off as you fix them".
     - Store state in `localStorage` under `audit:{slug}:{segmentId}:{index}`.
     - Wrap every read and write in try/catch.
     - Hydrate after mount, so the server HTML is always unchecked.
     - Use a real `<input type="checkbox">` with a `<label>`.
   - **Empty panels:** if a segment has no passes, show "Nothing passing here yet." Keep the panel so the layout doesn't jump.
3. **"How Google sees it" box.** A full-width band under the panels:
   - `accent-subtle` fill with an `accent-line` top rule;
   - a mono caption label, then `googleSees` in body-large.
   - This is our version of Flow Ninja's "How does AI see your…" box.
4. **Evidence**, if present:
   - screenshots in a row (2 across from `md`, stacked on phones);
   - `next/image` with the given width and height, a thin border, radius 6;
   - captions in small muted text.

Rows inside panels are separated by hairlines, not gaps. Keep the check rows compact, one or two lines each.

### 6.7 Two ways forward (dark, textured, same backdrop as `Pricing`), `id="options"`

- **Layout:** `intro`, then the two option cards, side by side from `md`, stacked on phones with the **rebuild first**.
- **Recommended card:** the white fill (same as the highlighted pricing tier) and a "Recommended" badge.
- **Each card:** label, name, price (display face) with `priceNote`, `bestFor` in italic muted text, the includes list, then the CTA.
- **Credit line:** `credit` sits centred under the cards in small muted text.

### 6.8 Comparison (same dark band)

- **Table:** a real `<table>` with the criterion column plus two option columns.
- **Marks:** yes = verified tick, no = cross, partial = dash icon. Any note sits under its mark in small text.
- **Small screens:** scrolls horizontally inside its frame.
- **Build a small audit-specific table.** Don't reuse `ComparisonTable`: it's hard-wired to `content/home`.

### 6.9 Ceiling (light)

- `heading` plus paragraphs, max width about 68ch.
- Calm. **No warning colours.** This is honesty, not a scare.

### 6.10 Proof (light, `surface`)

Eyebrow, heading, body, two text links with `&rarr;`.

### 6.11 Close (light)

Heading, body, `Button` to the call CTA, then the `note` in small muted text.

### 6.12 Sticky bottom bar (phones only, below `md`)

- A slim bar fixed to the bottom: "See your two options" → `#options`, as a white-on-accent `Button`, full width.
- **Hide it** once `#options` is in view.
- **Respect** safe-area insets.
- **Desktop doesn't need it:** the jump bar carries "Your options".

**Global chrome:**

- Keep the site `Nav` and `Footer`. Don't add the page to the nav.
- No `JsonLd`.
- Default site OG image. OG title = `meta.title`.
- **No share buttons.** Flow Ninja has them, but this is a private document.

---

## 7. Behaviour and accessibility

- **Headings:** one H1 (client name). Segment and section headings are H2, check labels are not headings.
- **Colour is never the only signal.** Every band and priority prints its word, and the gauge and bars have a text equivalent.
- **Contrast:**
  - status text uses the `-ink` tokens, which clear AA on both white and `light-surface` (see DESIGN.md);
  - the fill tokens are for bars and the arc only, never text;
  - check the muted text on the dark offer band.
- **Keyboard:**
  - the jump bar, checkboxes and "See details" links are all reachable;
  - focus rings use the tone-aware `--focus-ring`.
- **Anchors:** segment anchors get `scroll-margin-top` equal to nav plus jump bar, so headings aren't hidden under them.
- **Analytics:** leave PostHog's pageview as is (consent-gated). That's how we'll know the client opened it. Add nothing else.
- **Motion:** the gauge draw-in, and nothing else. All of it is off under reduced motion.

---

## 8. Definition of done

**Routing and privacy:**

- [ ] `/audit/lifetime-learning-center` renders.
- [ ] `/audit` and unknown slugs return 404.
- [ ] `curl -I` on the page **and** the PDF shows `X-Robots-Tag: noindex, nofollow`.
- [ ] Page HTML has the robots meta.
- [ ] `/sitemap.xml` has no `/audit` URL.
- [ ] robots.txt is unchanged.
- [ ] `grep -r "/audit/" app components content` finds only the route and the audit content.

**Scoring:**

- [ ] Scores match §4 exactly: overall 37 (11 / 3 / 20 of 34), and every segment.
- [ ] No score is typed into content.
- [ ] A dev-time assert fails if a non-pass check lacks a priority.

**Copy:**

- [ ] Matches §5 exactly.
- [ ] No em dashes, no banned words (CLAUDE.md §14).

**Layout and behaviour:**

- [ ] Checked at 375, 768 and 1280 widths.
- [ ] Phones: segment fix panels come before working panels, and the rebuild card comes first.
- [ ] Jump bar: sticks, scrolls sideways on phones, and marks the current segment.
- [ ] Mobile bottom bar hides at `#options`.
- [ ] Checkboxes persist across reloads, and the page still works with storage blocked.
- [ ] Empty `loomId` renders no video block.

**Template:**

- [ ] A second audit needs only a new content file plus one line in `content/audits/index.ts`.

**Build:**

- [ ] `npx tsc --noEmit`, `npx eslint .` and `next build` are clean.
