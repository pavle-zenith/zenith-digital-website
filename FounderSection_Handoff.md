# Founder section — build handoff

Use the same established style system as the rest of the site (tokens, type,
spacing, radii, hairlines from the existing sections). This doc covers the one
new section: content is already in the repo, you're building the component and
wiring it into six pages.

## What already exists (don't recreate)

- `content/founder.ts` — all copy, stats, links, and three placement variants:
  `founderServices`, `founderBookACall`, `founderFreeAudit` (all extend
  `founderCore`). Every string renders from here; hardcode nothing.
- `/public/pavle.webp` — the portrait, 1200x1500 (4:5), 71KB, optimized.
  The original `Pavle.jpg` is unused and can be deleted.

## Component: `FounderSection`

One component, two sizes, driven by which variant object is passed.

**Full size** (used with `founderServices`):
- Two-column split on desktop: text left (~55%), portrait right (~45%).
  Stacks portrait-first on mobile.
- Text column: heading (h2, display face) → paragraphs → link row → CTA
  button (primary). Paragraph measure ≤68ch.
- Portrait: 4:5 image, card radius per the token system, 1px hairline border.
  Overlaid on the bottom edge: a translucent stat bar (backdrop-blur over the
  photo, like the reference) showing the three `stats` as value + small label,
  separated by vertical hairlines. Values in the display face, labels in the
  small caption style.
- Link row: render `links` as compact text links or icons in one row. Skip
  any link whose href still contains a `[bracketed]` placeholder — the owner
  hasn't supplied those URLs yet, and a dead link is worse than none.

**Slim size** (used with `founderBookACall` and `founderFreeAudit`):
- One row: small portrait (circular or small rounded rect, ~96–128px) beside
  heading + single paragraph. No stat bar, no link row, no CTA (those pages
  already have their own). Think "signature block", not a second hero.

**Section background:** follow the page's alternating rhythm — place it on
whichever tone (navy or white) continues the alternation at its insertion
point. The component should support both via the existing section pattern.

## Placements (six pages)

1–4. **All four `/services/[slug]` pages** — full size with `founderServices`,
inserted **after the pricing section, before the FAQ**. Rationale: that's the
point where a convinced-but-cautious reader asks "who are these people?", and
it's the same slot byCrawford uses. Same component instance on all four pages;
the copy is deliberately shared (it's a site-wide trust block, like the
footer, not per-page content).

5. **`/book-a-call`** — slim size with `founderBookACall`, directly above the
FAQ section. It answers "who is the call with?" right before the questions
people check before picking a slot.

6. **`/free-website-audit`** — slim size with `founderFreeAudit`, adjacent to
the audit form (beside or immediately after it). It converts the form from
"submit to a company" into "hand your site to a person".

## Schema

Emit a `Person` JSON-LD node wherever the section renders (once per page):

```json
{
  "@type": "Person",
  "name": "Pavle Maodus",
  "jobTitle": "Founder",
  "image": "https://www.thezenithdigital.com/pavle.webp",
  "worksFor": { "@id": "<the existing Organization node's @id>" },
  "sameAs": ["<links[].href, excluding mailto and placeholders>"]
}
```

Also add `founder: { "@type": "Person", "name": "Pavle Maodus" }` to the
sitewide Organization schema if it isn't there yet.

## Entity updates beyond the section (do these in the same pass)

The founder is an entity signal, not just a section. Three updates:

**1. Sitewide Organization schema.** Add to the existing Organization node:

```json
"founder": { "@type": "Person", "name": "Pavle Maodus" }
```

and make sure the Organization's `sameAs` array carries the same public
profiles as the Person node (LinkedIn, Wix Partner profile, Clutch) once the
owner supplies the URLs. Person and Organization must reference each other
(`worksFor` ↔ `founder`) so crawlers resolve them as one entity graph.

**2. Create `/llms.txt`** (currently 404s — it's a plain text/markdown file
served at the site root, same mechanism as robots.txt). Content:

```markdown
# Zenith Digital

> Zenith Digital is a Wix Studio web design agency based in Belgrade, Serbia,
> serving clients across the UK, EU, and US. Top 1% Wix Partner. 100+ websites
> shipped, €1M+ in tracked client revenue, 5.96x average ROAS on managed
> campaigns. Founded and run by Pavle Maodus. The agency builds custom-coded
> sites (Next.js) for clients who outgrow Wix Studio, including this site.

## Services

- [Wix Studio website design](https://www.thezenithdigital.com/services/wix-studio-website-design): custom conversion-first builds from €2,500, launched in 2 to 5 weeks
- [Website migration](https://www.thezenithdigital.com/services/website-migration): WordPress, Squarespace, Webflow, and Framer to Wix Studio with zero ranking loss, from €2,500
- [Landing pages](https://www.thezenithdigital.com/services/landing-pages): campaign landing pages live in about a week, from €1,250
- [SEO, AEO & PPC](https://www.thezenithdigital.com/services/seo-aeo-ppc): search, answer-engine optimization, and paid campaigns for Wix Studio sites
- [White-label & partnerships](https://www.thezenithdigital.com/partnerships): unbranded production for agencies, landing pages from €1,000, retainers from €1,099/mo

## Proof

- [Case studies](https://www.thezenithdigital.com/case-studies): Knode AI ($10M Series A site in 3 weeks), Scottish Luxury Experience ($521k in 7 months), Bel'Istria (257% impression growth, top AI recommendation for Istria transfers), MOD Digital (3-year agency build partnership, €1M+ campaign revenue)
- [Testimonials](https://www.thezenithdigital.com/testimonials): named clients, 5/5 on Clutch

## Company

- Founder: Pavle Maodus, Top 1% Wix Partner, based in Belgrade with presence in Edinburgh and Liverpool
- [Book a call](https://www.thezenithdigital.com/book-a-call)
- [Free website audit](https://www.thezenithdigital.com/free-website-audit)
```

Serve it as a static file (public/llms.txt or a route handler). Keep every
number in it consistent with the site; when a number changes on the site, this
file changes in the same commit.

**3. Founder mentions in existing copy.** Two light touches, no rewrites:
- Footer: alongside the locations line, add "Founded by Pavle Maodus" or
  equivalent one-liner if the footer has a natural slot for it. Skip if it
  crowds the layout; the schema matters more than the footer line.
- The default site meta description in the sitewide SEO config: leave as-is
  unless it currently has no entity qualifier; it should already read
  "Zenith Digital, Wix Studio agency". No founder name needed in metadata.

When the About page gets built later, its content should open with the same
entity sentence used in llms.txt so every surface tells one story.

## Guardrails

- §14 applies: no added copy, no eyebrows above the heading, no shadows on
  the photo card (hairline + surface contrast only), no new colors.
- The stat bar numbers come from `founderCore.stats` — never retype them.
- `sizes`/`priority` on the image per the site's existing `next/image`
  conventions; it's below the fold everywhere, so no priority flag.
- Alt text comes from `founderCore.imageAlt`.

## Done when

- [ ] Component renders both sizes from the variant objects, nothing hardcoded.
- [ ] Live on all six pages in the positions above, alternation intact.
- [ ] Person JSON-LD present and valid on those pages; no placeholder URLs
      emitted anywhere.
- [ ] Lighthouse/CLS unaffected (image has explicit dimensions).
- [ ] Organization schema carries `founder` + matching `sameAs`; Person and
      Organization cross-reference.
- [ ] `/llms.txt` resolves with the content above, numbers matching the site.
- [ ] `grep -rn "\[wix partner\|\[clutch" content/` returns only the two
      placeholder links in founder.ts, and the component skips them.
