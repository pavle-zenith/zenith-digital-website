# Wix Classic guide: render the new blocks, add the commercial layer

**For:** Claude Code · **Written:** 19 August 2026
**File:** `content/migration-guides/wix-classic.ts`, `types.ts`, `components/sections/migration/*`

Copy in this brief is final. Do not rewrite it, do not add prose to fill space.

---

## 0. Why this exists

Three blocks were authored into `wix-classic.ts` and are not on the live page, because `MigrationGuide.tsx` has no cases for them: **`glance`**, **`benefits`**, **`routes`**. `routes` is the P0 factual correction (Wix documents two migration paths in articles that never reference each other) so its absence is the single biggest gap.

Two blocks were removed that need to come back in a changed form: **`sources`** and a **migration-specific cost block**.

---

## 1. Render the three authored blocks

Add cases to `MigrationGuide.tsx`. Content already exists, do not author any.

**`glance`** — "Wix Classic to Wix Studio at a glance". Six `{label, value}` pairs. Render as a labelled grid, 3x2 desktop, stacked mobile. Label small and muted, value at `body`. This is the most extractable block on the page, so mark it up as a definition list (`dl`/`dt`/`dd`) rather than divs. Place it directly under the hero.

**`benefits`** — "What you get on Wix Studio". Six `TitledBlock`s. Cards, 3x2. This is the only place on the page cards are the right answer, because the six items are genuinely parallel.

**`routes`** — "There are two ways to do this". Two `MigrationRoute` items, each with `title`, `navLabel`, `eligibility`, `body`, `lead`, `points`. Render as **two side-by-side panels**, not long-form and not tabs: the reader is choosing between them and needs to compare. `eligibility` renders as a `Pill` at the top of each panel. Points render with the bold-label treatment already built for `LongForm`. `footnote` spans full width beneath.

---

## 2. Restore `sources`, changed

It was deleted from the type and content. Put it back. The header comments in `squarespace.ts` and `wix-harmony.ts` still reference a `sources` field that no longer exists, so those comments are currently lying about the file.

This is the page's citability moat. Every competitor reviewed (Flow Ninja, WordPressToWix.pro, wixwebdesignservices) cites nothing.

```ts
export type GuideSource = { label: string; href: string; note: string };

sources?: {
  heading: string;
  intro: string;
  /** ISO date. Rendered as "Last verified 19 August 2026". */
  verified: string;
  items: GuideSource[];
};
```

Render compactly near the bottom, above the FAQ. Also render a one-line **byline directly under the H1**:

> Written by Zenith Digital · Reviewed by Pavle Maodus, Wix Legend Partner · Last verified 19 August 2026

Content for `wix-classic.ts` (add verbatim):

```
heading: "Sources"
intro: "Platform constraints on this page link to Wix's own documentation, so you can check them rather than take our word for it."
verified: "2026-08-19"
```

| label | href | note |
|---|---|---|
| Studio Editor: Creating a Studio Version of a Wix Editor Site | https://support.wix.com/en/article/studio-editor-creating-a-studio-version-of-a-wix-editor-site | The branch route. Shares the dashboard, does not carry the design, and publishing permanently retires the Editor branch. |
| Wix Editor: Rebuilding Your Site in the Studio Editor | https://support.wix.com/en/article/wix-editor-rebuilding-your-site-in-the-studio-editor | The fresh-build route, which Wix documents separately without reference to the branch workflow. |
| Wix Studio: Assigning a Wix Premium Plan to a Wix Studio Site | https://support.wix.com/en/article/wix-studio-assigning-a-wix-premium-plan-to-a-wix-studio-site | Premium upgrades to a Studio plan, with remaining value credited pro rata in the same Wix account. |
| CMS: Importing Content into a Collection | https://support.wix.com/en/article/cms-formerly-content-manager-importing-content-into-a-collection | CSV import into a collection, capped at 50,000 items per file. |
| Importing or Exporting URL Redirects with a CSV File | https://support.wix.com/en/article/importing-or-exporting-url-redirects-with-a-csv-file | Bulk redirect import, up to 500 rows at a time. |
| Site Members: Moving Members Between Sites | https://support.wix.com/en/article/request-moving-members-from-one-site-to-another-in-your-wix-account | Member lists cannot move between separate sites. Wix does not state whether a Studio branch behaves the same way, which is why this page says to verify it in your account. |
| Copying and Deleting Coded Sites, Pages, and Elements | https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/overview/copying-and-deleting-coded-sites-pages-and-elements | Velo event code added via the Properties and Events panel stops working when copied to another site. |

---

## 3. Replace the sitewide `<Pricing />` with a migration cost block

`MigrationGuide.tsx` currently renders the shared `<Pricing />` component. On a migration guide that answers the wrong question: the reader wonders whether they are buying a migration, a redesign or a new website. Replace it.

Add to the type:

```ts
cost: {
  heading: string;
  priceFrom: string;
  timeline: string;
  /** What the fee actually buys. */
  included: string[];
  /** What moves the number, in the reader's terms. */
  drivers: string[];
  note: string;
  ctas: CtaLink[];
};
```

Render as a single designed panel: price and timeline prominent, `included` as a checked list, `drivers` as a plain list under a small heading. Then **one text link** to `/pricing` for anyone wanting the full package tiers. Do not embed the tier cards.

Content for `wix-classic.ts` (verbatim):

```
heading: "What a Wix Classic migration costs"
priceFrom: "From €1,750"
timeline: "2 to 5 weeks, plus 30 days of monitoring"
```

**included:**
- Full URL and ranking inventory of your current site before anything is built
- Responsive Studio build with your repeating content modelled as CMS collections
- Every page's content, images and per-page SEO settings moved and verified field by field
- Redirect map built, imported and tested against the inventory
- Apps reconfigured and checked, including the ones Studio doesn't support
- Cutover handled in a single afternoon with your old site live until it happens
- 30 days of index monitoring, with migration-caused problems fixed at no extra cost

**drivers:**
- How many pages hold search equity worth mapping across
- Whether you're taking the branch route or building fresh
- How much repeating content becomes CMS collections
- Configuration sitting inside Bookings, Stores, Events or Pricing Plans
- Custom Velo code that needs rewiring rather than copying
- Whether the site is being restructured as well as rebuilt

```
note: "A brochure rebuild sits at the bottom of that range. Bel'Istria's 35+ page carry with a full URL map ran eight weeks end to end. You get a fixed number before anything starts, not an hourly estimate."
```

CTAs: `Get a fixed quote` → `/book-a-call` (primary), `Free migration check` → `/free-website-audit` (secondary).

---

## 4. Contextual CTAs at the friction points

One CTA in the body is not enough, but a fixed rhythm of buttons is worse. Put the ask where the reader has just felt the difficulty.

Add to `LongFormBlock` and to the `transfers` block:

```ts
/** A contextual ask rendered immediately after this block. */
cta?: { heading: string; paragraph: string; cta: CtaLink };
```

Render as a slim inset band at reading measure, visually quieter than `CtaBanner`. Never two in a row.

Place exactly three, with this copy:

**After `transfers`:**
> **Not sure which of these apply to your site?**
> Send us the URL and we'll check your account, your app list and your page count before you commit to anything.
> `Free migration check` → `/free-website-audit`

**After the `routes` block:**
> **Not sure which route you're eligible for?**
> It's checkable inside your Wix account in a couple of minutes. We'll do it with you on a call and tell you which one is cheaper for your site.
> `Book a call` → `/book-a-call`

**After the `seoMechanics` item "What we can and can't promise":**
> **Already getting organic traffic?**
> Have us inventory the URLs and rankings before anything gets rebuilt. That's the step that decides whether a migration holds.
> `Free migration check` → `/free-website-audit`

Keep the existing `auditCta` and `finalCta` where they are.

---

## 5. Sticky section navigator

Remove both per-section "jump to" blocks. They sit *inside* the section they link into, so they appear after the reader has arrived and navigate within something they're already reading.

Replace with **one sticky page-level navigator**, using `navLabel` where present and falling back to `title`. Desktop: a left rail or sticky top bar. Mobile: a collapsed "Jump to" dropdown. Highlight the active section on scroll. Hide it once the FAQ is reached.

Sections to list: At a glance · What you get · The two routes · Who should move · What carries across · How the move runs · Search rankings · Three decisions · Cost · Case studies · FAQ

---

## 6. Section order

```
Hero (+ byline)
At a glance              glance
What you get on Studio   benefits
The two routes           routes            → contextual CTA
Who should move          fit
What carries across      transfers         → contextual CTA
How the move runs        steps
Search rankings          seoMechanics      → contextual CTA
Three decisions          mistakes
Cost                     cost
Case studies             proof
Sources                  sources
FAQ                      faq
Keep reading             related
Final CTA                finalCta
```

Move `Testimonials` and `ClientLogos` out of the guide. They're sitewide social proof interrupting a technical explanation, and `proof` already carries migration-specific evidence. If a trust strip is wanted, put a slim one directly under the hero instead: `100+ websites · Wix Legend Partner · URL-by-URL migration planning · 30-day monitoring`.

Alternate navy and white. The three long-form sections must not share a background.

---

## 7. Definition of done

- [ ] `glance`, `benefits`, `routes` render; `glance` marked up as a definition list
- [ ] Byline under H1; `sources` restored to type, content and page
- [ ] Sitewide `<Pricing />` removed from the guide; `cost` block renders with `included` and `drivers`
- [ ] Three contextual CTAs placed exactly as specified, none doubled up
- [ ] One sticky navigator using `navLabel`; both per-section jump blocks removed
- [ ] `Testimonials` and `ClientLogos` removed from the guide template
- [ ] `squarespace.ts` and `wix-harmony.ts` header comments no longer reference fields that don't exist
- [ ] `npx tsc --noEmit` and `npx eslint app/ content/ components/` clean
- [ ] No prose authored by the implementer
