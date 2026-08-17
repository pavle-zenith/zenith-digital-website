# Zenith Digital — metadata, schema & AEO reference

Last updated: 17 August 2026. Single source of truth for every title, meta
description, and machine-readable signal on thezenithdigital.com.

**Keyword strategy in one line:** the homepage owns "wix studio web design
agency", each service page owns one commercial phrase, and case studies own
`[client] + [outcome]`. Nothing competes with anything else.

**House rules for all future metadata:**

1. Titles **50 to 60 characters**. Google cuts around 60; everything below is
   45 to 59.
2. Descriptions **130 to 155 characters**, and each one carries a real number.
3. Brand is always the full **"Zenith Digital"**, never shortened to "Zenith".
4. Lead with the category term, not the brand. Brand goes last.
5. No keyword stuffing. Princeton's GEO research found stuffing *reduces* AI
   citation by ~10%, while statistics raise it ~37%. Numbers beat repetition.

---

## Core pages

| Route | Title (chars) | Description |
|---|---|---|
| `/` | Wix Studio Web Design Agency \| Zenith Digital (45) | Zenith Digital is a Wix Studio web design agency and Top 1% Wix Partner, serving the UK, EU, and US from Belgrade. 100+ websites shipped, from €2,500. |
| `/services` | Wix Studio Design, Migration & SEO \| Zenith Digital (51) | Wix Studio web design, migrations with zero ranking loss, landing pages, SEO and AEO, and white-label production. Fixed prices from €2,500. |
| `/case-studies` | Wix Studio Website Examples & Case Studies \| Zenith Digital (59) | Real Wix Studio and custom builds from a Top 1% Wix Partner: a $10M raise, $521k in bookings, 257% impression growth. 100+ websites shipped. |
| `/partnerships` | White-Label Wix Web Design for Agencies \| Zenith Digital (56) | Resell Wix Studio and custom builds under your own brand. Unbranded deliverables, NDA, partner pricing from €1,000, and 100+ launches behind us. |
| `/free-website-audit` | Free Website Audit: SEO & Speed Review \| Zenith Digital (55) | A free hand-reviewed website audit from a Top 1% Wix Partner. Short video walkthrough of what's costing you leads, rankings, and speed. |
| `/testimonials` | Testimonials \| Zenith Digital client reviews & results (54) | *(unchanged — CRO-led by design)* |
| `/faq` | FAQ \| pricing, process, and straight answers \| Zenith Digital (61) | *(unchanged — CRO-led by design)* |
| `/book-a-call` | Book a free website call \| Zenith Digital (41) | *(unchanged — CRO-led by design)* |

**Why three pages stay CRO-led:** nobody searches "book a website call". Those
pages exist to convert visitors who are already on the site, and optimising
them for search would cost clarity for no traffic.

---

## Service pages

Each owns one commercial phrase. These are the money pages.

| Route | Target phrase | Title (chars) | Description |
|---|---|---|---|
| `/services/wix-studio-website-design` | wix studio website design | Wix Studio Website Design Services \| Zenith Digital (51) | Custom Wix Studio website design from a Top 1% Wix Partner. Conversion-first builds launched in 2 to 5 weeks, from €2,500 fixed. 100+ sites shipped. |
| `/services/website-migration` | wordpress to wix migration | WordPress to Wix Studio Migration \| Zenith Digital (50) | Migrate from WordPress, Squarespace, Webflow, or Framer to Wix Studio. Full URL inventory, 1:1 redirect map, and zero ranking loss in writing. From €2,500. |
| `/services/seo-aeo-ppc` | wix seo agency | Wix SEO Agency: Search, AEO & PPC \| Zenith Digital (50) | Wix SEO, answer-engine optimization, and Google and Meta campaigns. 5.96x average ROAS and €1M+ in client revenue across managed campaigns. |
| `/services/landing-pages` | wix landing page design | Wix Landing Page Design, Live in a Week \| Zenith Digital (56) | Conversion-first Wix landing pages designed, written, and live in about a week, from €1,250. 15+ built for MOD Digital's campaigns. |
| `/services/wix-studio-development` | hire a wix developer | Hire a Wix Developer: Velo & Custom Code \| Zenith Digital (57) | Wix Studio development from a Top 1% Wix Partner: Velo code, CMS architecture, integrations, and automations, including a full marketplace build. |

Titles and descriptions live in `content/service-pages/[slug].ts` under `seo`.

---

## Case studies

Formula: **`[Client]: [Outcome] | Zenith Digital`**. "Case study" was dropped
from the front — the client name already implies it, and keeping it pushed
every title past 70 characters so the brand and half the outcome were cut off.

| Route | Title (chars) |
|---|---|
| `/case-studies/knode-ai` | Knode AI: A $10M Raise in 3 Weeks \| Zenith Digital (50) |
| `/case-studies/belistria` | Bel'Istria: 257% More Impressions \| Zenith Digital (50) |
| `/case-studies/scottish-luxury-experience` | Scottish Luxury: $521k in 7 Months \| Zenith Digital (51) |
| `/case-studies/just-stay` | Just Stay: A Two-Funnel Booking Site \| Zenith Digital (53) |
| `/case-studies/mod-digital` | MOD Digital: 3 Years as Build Partner \| Zenith Digital (54) |
| `/case-studies/yacht-junky` | Yacht Junky: A Wix Studio Marketplace \| Zenith Digital (54) |
| `/case-studies/genroks-ai` | Genroks: 10+ ISO Deals After a Rebrand \| Zenith Digital (55) |
| `/case-studies/hunting-brook-gardens` | Hunting Brook: €140k in Course Sales \| Zenith Digital (55) |
| `/case-studies/katie-hailey` | Katie Hailey: Figma to Live in 1.5 Weeks \| Zenith Digital (57) |

All nine descriptions are 133 to 154 characters, name "Zenith Digital"
explicitly, and carry the study's headline number. Definitions live in
`content/case-studies.ts` under each study's `seo` block.

---

## Open Graph & social cards

Set once in `app/layout.tsx` and inherited by every page.

| Property | Value |
|---|---|
| `og:type` | `website` (case studies override to `article`) |
| `og:site_name` | Zenith Digital |
| `og:locale` | en_GB |
| `og:image` | `app/opengraph-image.jpg` — 1200x630, 111KB |
| `twitter:card` | `summary_large_image` |
| `twitter:image` | `app/twitter-image.jpg` |
| Image alt | Set via `opengraph-image.alt.txt` / `twitter-image.alt.txt` |
| `robots` | index, follow, `max-image-preview: large` |

**Case study pages override** with the study's own hero screenshot,
`og:type: article`, and `article:published_time` from `publishedAt`.

**Source asset:** `site asset dump/OG : Favicon/OG Graph.png` (1200x600),
padded to 1200x630 on the same near-black so it hits the spec ratio exactly.

### Favicons

Next.js App Router file conventions — no manual `<link>` tags needed.

| File | Size | Purpose |
|---|---|---|
| `app/favicon.ico` | 16/32/48/64 multi-size | Browser tabs, legacy |
| `app/icon.png` | 192x192 | Modern browsers, Android |
| `app/apple-icon.png` | 180x180 | iOS home screen |

All generated from `zenith_favicon.png`. The old July `favicon.ico` was
replaced.

---

## Structured data

Defined in `lib/schema.ts`, rendered by `components/JsonLd`.

**Sitewide (root layout):**

- `Organization` — @id `/#organization`. Name, url, description, **logo**,
  **areaServed** (UK, EU, US), Belgrade postal address, email, `founder` →
  Person, `sameAs` (placeholder URLs auto-filtered).
- `WebSite` — @id `/#website`, `publisher` → Organization.

**Founder pages:** `Person` — @id `/#pavle-maodus`, `worksFor` → Organization,
image, `sameAs`.

The three nodes cross-reference by `@id` so crawlers resolve one entity rather
than three loose objects. That's the fix for the "which Zenith?" brand
collision in Search Console.

**Service pages:** `Service` (provider references Organization by `@id`, not a
duplicate node), `FAQPage`, `BreadcrumbList`. `Offer` only where a price is
actually published — the development page has none by design.

**Case studies:** `Article`, `BreadcrumbList`. **No `Review` markup** on
client testimonials: Google treats reviews about an organisation hosted by
that organisation as self-serving and ineligible for review rich results.

---

## AEO / AI visibility

**robots.txt** allows every AI crawler that matters: `GPTBot`, `ClaudeBot`,
`PerplexityBot`, `Google-Extended`, plus `*`. Host and sitemap declared.

**llms.txt** at `/llms.txt` — entity summary, all six services with prices,
case studies with outcomes, founder, and conversion links. Treat it as
experimental, not a ranking lever: Google states no AI-specific file is
required. Keep every number in it identical to the site.

**What actually drives citation**, in priority order:

1. Crawlable text — key facts in body copy, never only in images or metadata.
2. Statistics with sources (+37% citation lift in the Princeton GEO study).
3. Self-contained passages that survive extraction without surrounding context.
4. Explicit entities — "Zenith Digital", not "we", in extractable sections.
5. Consistent claims across every page. One canonical phrasing per number.
6. Third-party presence: directory listings, Clutch, industry roundups. Brands
   are cited ~6.5x more often via third-party sources than their own domain.

---

## Open items

- **Clutch and Wix Partner profile URLs** — still bracketed in
  `content/founder.ts`. They're filtered out of `sameAs` automatically, so the
  markup is valid, but the entity graph is thinner than it should be until
  they're real.
- **Directory listings** — DesignRush and similar rank on page one for
  "wix studio web design agency". Getting listed is a presence play the
  ai-seo skill rates highly, and it's free.
- **`/pricing.md`** — a machine-readable pricing file for AI agents comparing
  vendors programmatically. Optional, cheap, and you already publish fixed
  prices, which is the hard part.
- **Blog** — the biggest remaining gap. Service pages are built to receive
  internal links from posts that don't exist yet.
- **FoxStays images** — the outcomes sections on three service pages still
  reference `/portfolio/fortlauderdale.jpg` with alt text naming FoxStays,
  the client whose relationship ended. Swap before launch.
