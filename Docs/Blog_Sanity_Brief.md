# Blog on Sanity — build brief for Claude Code

**For:** Zenith Digital website · **Written:** 19 August 2026
**Reference builds:** designme.agency/insights (index), bycrawford.com/blog (article furniture), flowninja.com (depth)

---

## 0. The one rule that matters most

**Invent no new components.**

This site already has a full section and UI library, and the migration guides added a long-form reading system that is exactly what a blog post needs. Every Portable Text block below maps to something that already exists. If a block seems to need a new component, stop and say so rather than building one.

The blog should be indistinguishable from the rest of the site in look and reading experience. A reader moving from `/services/wix-classic-to-wix-studio` to a blog post should not be able to tell they changed content system.

---

## 1. What already exists

Sanity project **`nfi9edhy`** ("Zenith Digital Website"), org `o94vsmrWz`, created 22 July 2026, 3 members. One dataset: **`production`**, **public ACL**. **No schema is deployed.** It is an empty shell from the original Sanity-everything plan.

You are finishing that, not starting it.

**Public ACL matters:** anyone with the project ID can read every document, including drafts. Every query must exclude drafts explicitly:

```
*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
```

Never rely on the Studio's published/draft toggle for privacy.

---

## 2. The boundary — do not blur it

| Content | Lives in | Why |
|---|---|---|
| Blog posts | **Sanity** | Change weekly, need publishing without a deploy, mostly prose |
| Everything else | **`content/*.ts`** | Changes rarely, dense typed structures, the compiler catches real errors |

Migration guides, service pages, case studies, home, about, partnerships all **stay in files**. Owner decision, 19 Aug 2026. Do not migrate them and do not build a schema for them.

---

## 3. Schema

Deploy to the `production` dataset. Studio embedded at `/studio` per CLAUDE.md §4, with `robots: noindex, nofollow` and excluded from `sitemap.ts`.

### `post`

| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `slug` | slug | required, sourced from title |
| `excerpt` | text | 1 to 2 sentences, used on cards and as the meta description fallback |
| `category` | string | **required**, `options.list` from the fixed set in §4. Not a reference, not a free string |
| `publishedAt` | datetime | required |
| `lastVerified` | date | drives "Last verified 19 August 2026" |
| `reviewedBy` | string | defaults to "Pavle Maodus, Wix Legend Partner" |
| `body` | array | Portable Text, block set in §5 |
| `sources` | array of `{label, href, note}` | optional, same shape as the guides use |
| `faq` | array of `{q, a}` | optional, 4 to 8 items |
| `related` | array of references to `post` | optional, max 3. Falls back to recent posts in the same category |
| `seo` | object `{title, description}` | optional, falls back to `title` and `excerpt` |
| `featured` | boolean | one featured post on the index |

No author document type. Author is always Zenith Digital; `reviewedBy` names the human. Owner decision.

No hero image field. The index is text-led (see §6) and posts open on type. Images belong inside `body` where they earn their place.

---

## 4. Categories

Fixed list, enforced by `options.list` so nobody invents a fifth by typo:

- `Wix Studio`
- `Migrations`
- `SEO & AEO`
- `Web design`

**No `/blog/category/[slug]` routes.** Owner decision: the category is a label and a client-side filter on the index only. Revisit when Search Console shows demand, rather than shipping thin archive pages now.

---

## 5. Portable Text — the block set

This is the core of the build. Each block maps to an existing component. Build serializers, not components.

| Sanity block | Renders with | Fields |
|---|---|---|
| Standard blocks | Existing prose styles at `68ch` | h2, h3, normal, blockquote, bullet, numbered, bold, italic, link |
| `pointsList` | The `LongForm` bold-label bullet treatment from the guides | `lead?`, `points: [{label, body}]` |
| `comparisonTable` | `TransfersTable` | `caption?`, `columns: string[]`, `rows: [{cells: string[], status?}]` |
| `calloutCta` | The contextual CTA band from the migration guide brief | `heading`, `paragraph`, `ctaLabel`, `ctaHref` |
| `faqBlock` | `Faq` | `items: [{q, a}]` |
| `image` | `next/image` with existing figure styling | `asset`, `alt` (required), `caption?` |
| `codeBlock` | Existing code styling if present, otherwise plain `pre` | `language`, `code` |

**That is the complete set.** Anything else is a conversation, not a build.

H2 and H3 get auto-generated anchor ids so the sticky navigator (§7) can target them.

---

## 6. Routes and templates

### `/blog` — index

Model on designme.agency/insights. **Text-led cards, no thumbnails.** Each card: category label, date, title, excerpt. Author is not on cards since it is always the same.

- One featured post at the top when `featured` is true, larger treatment, still text-led
- Client-side category filter as a `Pill` row, using the existing component
- 10 posts, then load more
- Reuse `Section`, `Container`, `SectionHeader`, `Pill`
- Ends with the existing `CtaBanner`

### `/blog/[slug]` — post

Above the H1: category, publish date, and `Written by Zenith Digital · Reviewed by {reviewedBy} · Last verified {lastVerified}`.

Body renders at `68ch` in a single column, identical to the guides' long-form treatment. Same type scale, same rhythm, same 64px block spacing.

Order after the body: `sources` (if present) → `faq` (if present) → **free website audit capture** → `related` → `CtaBanner`.

**The audit capture replaces a newsletter** (owner decision). It reuses the existing `/free-website-audit` funnel and its Supabase write. Copy:

> **Want this checked on your own site?**
> Send us the URL. We'll tell you what's holding it back, in plain language, and what we'd fix first. Free, and useful whether or not you hire us.
> `Get a free website audit` → `/free-website-audit`

Do not build a new form. Link to the existing page.

`generateStaticParams` from published posts. `dynamicParams = false`.

---

## 7. Reuse map

Import these. Do not recreate.

| Need | Component |
|---|---|
| Section wrapper, padding, tone | `components/ui/Section.tsx` |
| Gutter and max width | `components/ui/Container.tsx` |
| Heading + support pair | `components/ui/SectionHeader.tsx` |
| Category chip, filter row | `components/ui/Pill.tsx` |
| Buttons | `components/ui/Button.tsx` |
| Long-form body and bold-label points | the `LongForm` system in `components/sections/migration/` |
| Sticky section navigator | the one built for the migration guides |
| Comparison tables | `components/sections/migration/TransfersTable.tsx` |
| FAQ accordion | `components/sections/Faq.tsx` |
| Final CTA band | `components/sections/CtaBanner.tsx` |

Where a guide component takes a typed content object, extract the presentational part rather than duplicating it, so both call sites share one implementation.

---

## 8. Data layer

- `next-sanity` for fetching, `@portabletext/react` for rendering
- Env: `NEXT_PUBLIC_SANITY_PROJECT_ID=nfi9edhy`, `NEXT_PUBLIC_SANITY_DATASET=production`, `SANITY_API_READ_TOKEN` only if a private dataset is adopted later
- Fetch with `next: { tags: ['post'] }`, plus a webhook route handler calling `revalidateTag('post')` on publish, and `revalidate: 3600` as a fallback so a missed webhook self-heals within the hour
- All queries exclude drafts (§1)
- Sort by `publishedAt desc`

---

## 9. SEO, schema and plumbing

- `generateMetadata` per post: `seo.title` or `title`, `seo.description` or `excerpt`, canonical `/blog/{slug}`, OG `type: article` with `publishedTime`
- JSON-LD per post: `BlogPosting` with `author` and `publisher` as `{ "@id": ORG_ID }`, `datePublished`, `dateModified` from `lastVerified`, `mainEntityOfPage`. Plus `BreadcrumbList` (Home → Blog → post). Plus `FAQPage` **only when `faq` has items and they render visibly**
- **No `Review`, no `AggregateRating`.** Removed sitewide on 17 Aug for being self-serving
- Add `/blog` and every published post to `app/sitemap.ts`, generated from Sanity so a new post appears by existing
- Add `/blog` to `public/llms.txt` under a Resources line
- Restore the `Blog` link in the footer (`content/home.ts`), removed on 17 Aug when the route did not exist

---

## 10. Do not

- Do not invent components. See §0
- Do not add Portable Text blocks beyond §5
- Do not build category routes
- Do not build an author document type or a newsletter form
- Do not migrate any existing content file into Sanity
- Do not let the Studio route into the sitemap or the index
- Do not write blog copy. Content is supplied. Seed with one placeholder post clearly marked as such, and delete it before launch

---

## 11. Definition of done

- [ ] Schema deployed to `nfi9edhy` / `production`, Studio at `/studio`, noindexed
- [ ] `/blog` and `/blog/[slug]` render server-side from Sanity
- [ ] Draft documents excluded from every query
- [ ] All seven Portable Text block types render through existing components
- [ ] Byline and last-verified line under the H1
- [ ] Audit capture renders on every post
- [ ] Sticky navigator works off auto-generated heading anchors
- [ ] `BlogPosting` + `BreadcrumbList` emitted, `FAQPage` only when FAQs render
- [ ] Posts appear in `sitemap.ts` automatically
- [ ] Footer Blog link restored
- [ ] Webhook revalidation working, hourly fallback in place
- [ ] `npx tsc --noEmit` and `npx eslint app/ content/ components/ sanity/` clean
