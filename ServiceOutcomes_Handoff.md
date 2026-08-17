# Service page outcomes section — build handoff

One new section component, placed on all five `/services/[slug]` pages. All
copy is already in the content files. You're building the component and
slotting it in.

## What already exists

- `content/service-pages/types.ts` — the `outcomes?` block is defined:
  `{ heading, intro?, items: [{ title, body, image?, imageAlt? }] }`
- All five service pages carry four `outcomes` items each, written per page.
  Nothing is shared between pages.

## Why this section exists

Reference: the "difference a proper website actually makes for you" section on
the live Wix site, and Flow Ninja's "infrastructure behind a good website" on
their service pages. Both state plain-language benefits in the reader's terms,
separate from any deliverables list.

The distinction that matters when building it: `included` is what we hand over
("CMS setup", "Loom handover"). `outcomes` is what changes for the reader
("your team can change things without you"). Same project, different sentence.
Don't let the two sections end up looking like the same component with
different words, or the page reads as repetition.

## Component: `ServicePageOutcomes`

Live at `components/sections/service/ServicePageOutcomes.tsx`, alongside the
existing `ServicePageStakes` / `ServicePageIncluded` set.

- **Layout:** 2x2 card grid on desktop (four items on every page), single
  column on mobile. Cards are generous: this is a slow-down-and-read section,
  not a dense feature list, so give it more vertical room per card than
  `included` gets.
- **Card contents:** optional media area at the top (see below), then title
  (h3), then body. Body runs 2 to 3 lines at desktop width.
- **Media:** `image` is optional and currently unset on every item. Build the
  card so it renders cleanly as text-only, and so adding `image` later drops a
  16:10 or 4:3 visual into the top of the card without a layout rewrite. Do
  NOT substitute icons to fill the gap: an icon per card is exactly the
  generic pattern §14 warns about, and `included` already uses icons.
- **Section styling:** per §7 tokens. Hairline-bordered cards on the section
  surface, no shadows, restrained radius. Follow each page's existing
  navy/white alternation at the insertion point.
- **Heading block:** `heading` as the section h2, `intro` as the support line
  beside or beneath it, matching how `stakes` renders its intro. No eyebrow.

## Placement

Between `stakes` and `included`, on all five pages. That gives each page the
arc: where you are (`whoFor`) → what staying costs (`stakes`) → what changes
(`outcomes`) → what we do (`included`) → how it runs (`process`).

Render nothing when `outcomes` is undefined, same conditional pattern as
`stakes`.

## Guardrails

- No icons, no numbered badges, no decorative gradients on the cards.
- Don't duplicate `included`'s card component with new props: these are
  different shapes and should look different on the page.
- Copy comes from the content files only, nothing hardcoded.
- Check the four cards balance visually when bodies differ in length: equal
  card heights per row, text top-aligned.

## Done when

- [ ] `ServicePageOutcomes` renders from the content block, text-only, on all
      five service pages in the position above.
- [ ] The section is visually distinct from both `stakes` and `included` at a
      glance, not the same grid three times.
- [ ] Adding an `image` to one item renders it without breaking the row.
- [ ] Alternation intact, mobile checked, `npm run build` clean.

## Follow-up for the owner (not blocking)

Four visuals per page would lift this section the way the live site's version
does. Cheapest useful set: a before/after conversion mockup, a SERP or AI
answer showing the client named, a phone notification of an enquiry arriving,
and a CMS editing screenshot. Same four could be reused across pages at first,
with page-specific shots added later.
