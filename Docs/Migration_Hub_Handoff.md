# Migration hub and spokes — build handoff for Claude Code

**For:** Zenith Digital website (Next.js 15 App Router, content in `content/`)
**Written:** 17 August 2026 · **Revised:** 17 August 2026 (v2, after owner review)
**Pattern reference:** Flow Ninja's `/migrations` hub and its platform spokes.

---

## 0. Division of labour — read first

**Claude Code does not write the copy on these pages.**

Finished copy arrives as complete `content/migration-guides/*.ts` files, written elsewhere and handed over ready to paste. Claude Code's job is the plumbing:

- the `MigrationGuideContent` type and the collection module
- `MigrationGuide.tsx` and the transfers table component
- routing, `generateStaticParams`, schema, sitemap, hub wiring
- typecheck, lint, accessibility, responsive behaviour

Where this doc describes angles, theses and what each page should argue (§5), that is context so the components fit the copy, **not an instruction to draft it**. Build the template against one supplied content file, then the rest drop in.

If a content file has not been supplied yet, build the type and component against the spec in §4 and leave the collection empty rather than writing placeholder prose.

---

## 1. Why this before blog posts

`/services/website-migration` already carries a `unique: { kind: "platforms" }` block with four platforms and genuinely differentiated copy. Those cards currently link nowhere. Giving them destinations turns an existing page into a hub.

These are decision-stage searches. Someone typing "wix classic to wix studio" is choosing a provider this month. Informational articles build authority slowly; these convert now.

**SERP evidence, checked 17 Aug 2026:**

- `"WordPress to Wix Studio" migration guide agency` → Wix's own blog, one small agency, several Fiverr category pages, DEV.to filler. No credible agency owns it.
- `"Wix Classic to Wix Studio" migration SEO` → a Wix community forum thread and unrelated noise. Nobody has written the authoritative page.
- `"Wix Harmony" Wix Studio difference migrate` → four or five small Wix-partner blogs with "Harmony vs Studio" comparison posts. Demand is proven, but **none of them has a service page for moving off Harmony.**

**Proof is not a prerequisite.** Flow Ninja's spokes carry no case studies, no metrics and no before/after anywhere, and they rank. Proof is the upgrade, not the entry ticket. Build unproven spokes where the topic warrants it; lead with proof where it exists.

---

## 2. What Flow Ninja's spoke actually is

Fetched `/migrations/wix-to-webflow` on 17 Aug 2026:

- H1 is literally "Wix to Webflow: step-by-step guide"
- ~4,200–4,500 words
- 8-step migration process, each step with subsections
- A gated migration checklist as the lead magnet
- "Who this guide is for", "When it makes sense", "Common mistakes", "Good fit / not a great fit"
- 9-question FAQ
- No comparison table, no case studies, no metrics
- Roughly 65% platform-specific, 35% agency boilerplate

**The version that beats it:** their length and step structure, plus a transfers table they don't have, plus Zenith's real numbers where they exist. Aim for 2,500–4,000 words per spoke.

---

## 3. Architecture

Hub stays at `/services/website-migration`. Spokes are siblings under the locked `/services/[slug]` taxonomy (CLAUDE.md §5), not nested:

```
/services/website-migration                hub (exists, needs edits — see §6)
/services/wix-classic-to-wix-studio        spoke 1
/services/squarespace-to-wix-studio        spoke 2
/services/wix-harmony-to-wix-studio        spoke 3
/services/wordpress-to-wix-studio          spoke 4
/services/webflow-to-wix-studio            spoke 5
```

The keyword is in the slug because it *is* the service name, not because it is a keyword.

### Do NOT reuse `ServicePageContent`

Cloning the twelve-block service template five times produces five pages whose pricing, process, founder and related sections are identical. That is the near-duplicate pattern the audit warns about in §23. Build a second, leaner type.

### Files

```
content/service-pages/types.ts                    EDIT — add optional href to platforms items
content/migration-guides/types.ts                 NEW  — MigrationGuideContent
content/migration-guides/index.ts                 NEW  — collection + getMigrationGuide(slug)
content/migration-guides/wix-classic.ts           NEW
content/migration-guides/squarespace.ts           NEW
content/migration-guides/wix-harmony.ts           NEW
content/migration-guides/wordpress.ts             NEW  (later)
content/migration-guides/webflow.ts               NEW  (later)
app/services/[slug]/page.tsx                      EDIT — resolve service page OR migration guide
components/sections/migration/MigrationGuide.tsx  NEW  — composes existing UI components
app/sitemap.ts                                    EDIT — include published guides
app/services/page.tsx                             EDIT — hub lists only the 5 core services
public/llms.txt                                   EDIT — add guides under Services
```

`app/services/[slug]/page.tsx` keeps `dynamicParams = false`. `generateStaticParams` returns service slugs plus published guide slugs. In the component: try `getServicePage(slug)`, fall back to `getMigrationGuide(slug)`, else `notFound()`.

---

## 4. Spoke template

Reuse existing components (`Section`, `Container`, `SectionHeader`, `Pill`, `StatBlock`, `Faq`, `CtaBanner`, `WorkStrip`, `FounderSection`). Only `MigrationGuide.tsx` and the transfers table are new.

```ts
export type MigrationGuideContent = {
  slug: string;
  publish: boolean;
  platform: string;              // "Wix Classic"
  seo: { title: string; description: string };

  hero: {
    h1: string;
    subhead: string;
    chips: string[];             // platform-specific, never generic
    ctas: CtaLink[];
  };

  // 2. Who this is for / when the move makes sense.
  fit: {
    heading: string;
    intro: string;
    goodFit: string[];
    notAFit: string[];           // saying who should NOT move builds more trust than it costs
  };

  // 3. THE CORE ASSET. What survives the move and what does not.
  transfers: {
    heading: string;
    intro: string;
    rows: {
      item: string;                                   // "Blog posts and categories"
      status: "carries" | "rebuilt" | "replaced" | "lost";
      note: string;                                   // one specific sentence
    }[];
    footnote?: string;
  };

  // 4. The step-by-step. This is the bulk of the word count.
  steps: {
    heading: string;
    intro: string;
    items: (TitledBlock & { duration?: string })[];   // 6–8 steps
  };

  // 5. Platform-specific URL and SEO mechanics.
  seoMechanics: { heading: string; intro: string; items: TitledBlock[] };

  // 6. Common mistakes. Cheap to write, high citation value.
  mistakes: { heading: string; items: TitledBlock[] };

  // 7. Timeline and price. The only genuinely shared block.
  logistics: { heading: string; priceFrom: string; timeline: string; note: string };

  // 8. Proof. Optional — omit rather than borrow another platform's client.
  proof?: { heading: string; workSlugs: string[]; stat?: { value: string; label: string } };

  faq: { heading: string; items: { q: string; a: string }[] };   // 8–10 questions
  finalCta: { heading: string; paragraph: string; ctas: CtaLink[] };
};
```

**Block 3 is the point of these pages.** A four-state table answering "what happens to my stuff" is what nobody else has written, what buyers actually want, and the format an AI assistant quotes verbatim. Include the losses honestly. A page that admits what breaks outranks one claiming everything transfers, and it pre-qualifies the lead before the call.

---

## 5. Platform briefs — context for the copy, not a writing brief

These describe what each supplied content file will argue, so components are built to fit. Do not draft this copy.

### Spoke 1 — Wix Classic → Wix Studio  *(build first, this is the template)*

**The thesis, and it is the differentiator: this is a rebuild, not a migration.**

Owner-confirmed across four projects:

| Client | What actually happened |
|---|---|
| Bel'Istria | True migration. 35+ pages carried with full URL mapping, zero rankings lost, 257% YoY impressions, now 70+ dynamic pages. |
| Knode AI | Was on Wix Classic. Fresh Studio build, 10 pages, 3 weeks. |
| Katie Hailey | Was on Wix Classic. Figma to Wix Studio, 1.5 weeks. |
| Hunting Brook | Was on Squarespace (see spoke 2). |

Three of four were rebuilds. Only Bel'Istria carried content across. **Write that honestly**: the usual answer is "you rebuild, and here is when carry-over is worth it instead." Everyone else will write the optimistic version.

- **Transfers table covers:** pages and content, blog collections, member areas, apps and their Studio equivalents, custom Velo code, URL structure, SEO settings, and what has no Studio equivalent.
- **Proof:** Bel'Istria for the carry-over case, Knode and Katie Hailey for the rebuild case.
- **FAQ must include:** does my Wix plan carry over, do I keep my domain, can both sites exist during the build, why is this not one click, when is rebuilding better than migrating.

### Spoke 2 — Squarespace → Wix Studio

- **Angle:** design ceiling. The template that was fine at launch caps what the site can become.
- **Proof:** MindEd (70+ pages across 2 languages — a substantial migration) and Hunting Brook (Squarespace, then built on Wix Studio).
- **Transfers table covers:** pages, blog collections, product data, the tidy URL structure, member areas, and Squarespace-native form submissions, which do not export cleanly.

### Spoke 3 — Wix Harmony → Wix Studio  *(timely, no proof needed)*

Harmony launched January 2026, so nobody expects case studies. The angle writes itself from Wix's own documentation.

**Verified from Wix support docs, 17 Aug 2026:**

- *"Currently, it is not possible to migrate an existing site from Wix Editor to the Wix Harmony Editor."*
- Harmony ships without: **CMS**, **Wix Multilingual**, Donations, Hotels, Music, Referral Programs, accordions, audio players, and certain effects.

**No CMS and no multilingual is the wall.** That is the growth ceiling, stated by Wix. MindEd — 70+ pages in two languages — is a site Harmony could not host, and that is the cleanest way to illustrate it without claiming a Harmony client.

- **Transfers table covers:** what Harmony holds vs what Studio adds, and be explicit that content moves by rebuild.
- **FAQ must include:** should I start on Harmony or Studio, can I upgrade Harmony to Studio later, does Harmony have a CMS, is Harmony replacing the classic editor.
- **Link to sources.** Citing Wix's own docs is exactly the primary-source discipline the audit's §19 asks for.

### Spoke 4 — WordPress → Wix Studio  *(highest volume, unproven)*

- **No Zenith client example exists.** Write it unproven, like Flow Ninja does. Omit the `proof` block rather than borrowing another platform's client.
- **Angle:** the maintenance burden ends. Be specific: plugin updates, PHP versions, security patching, hosting.
- **Transfers table covers:** posts, pages, categories, tags, authors, media, permalinks, Yoast/Rank Math metadata, forms, WooCommerce, custom post types, plugins with no equivalent, theme shortcodes.
- **Honest losses:** custom post types and plugin-dependent functionality usually need rebuilding, not importing.

### Spoke 5 — Webflow → Wix Studio  *(unproven, last)*

- **Angle:** not build quality, editability. Who on the team can safely change a page.
- **Transfers table covers:** CMS collections, class-based styling and what replaces it, custom code embeds, interactions and animations, form handling.

### Not on this hub

**Genroks stays off.** Framer to custom code is not a Wix Studio migration. It belongs on `/services/wix-studio-development` or wherever the custom up-tier is argued, as evidence for "we build custom when you outgrow the platform."

Framer stays a listed platform on the hub with no spoke until there is demand.

---

## 6. Hub changes

**Change the meta title.** Current: `"WordPress to Wix Studio Migration | Zenith Digital"`.

Once `/services/wordpress-to-wix-studio` exists, the hub competes with its own child for that term. The hub should own the category, spokes own platforms.

- New title: `"Website Migration to Wix Studio | Zenith Digital"` (47 chars)
- Rework the hero subhead so it does not lead with WordPress either. It currently reads "Full-service migration from WordPress, Squarespace, Webflow, or Framer" — reorder so the platforms with proof lead.
- Description stays accurate: price is **€1,750 flat across all source platforms** (owner-confirmed). The logistics block genuinely is shared; do not invent per-platform pricing to look less repetitive.

**Other hub edits:**

- Add `href?: string` to the `platforms` item type in `content/service-pages/types.ts`.
- Give each item in `website-migration.ts` its spoke href. Items without one render as today.
- Add a visible "Read the full [platform] guide" link on each platform card.
- Add Wix Classic and Wix Harmony as platform items — currently the block lists WordPress, Squarespace, Webflow and Framer only, and misses the two Zenith is strongest on.

---

## 7. Anti-doorway rules — non-negotiable

- Every sentence on every spoke is written for that platform. If a line would read the same on a sibling, cut it.
- Transfers rows must differ substantively, not by synonym swap.
- Do not build a spoke you cannot fill with real platform-specific technical detail. Four strong pages beat nine thin ones.
- Only the logistics block may repeat, and even its note should reference platform-specific effort.

## 8. Schema and linking

Each spoke emits `Service` with `provider: { "@id": ORG_ID }`, `BreadcrumbList` (Home → Services → guide), and `FAQPage` for its visible FAQ. Same pattern as existing service pages. No `Review`, no `AggregateRating`.

Bidirectional linking per the audit's §6: every spoke links back to the hub and to at least one case study; the hub links out to every spoke.

---

## 9. Deferred: the gated checklist

Flow Ninja gates a migration checklist behind an email form. The audit recommends the same in §12 as a "Website Migration Redirect Map Template."

Build it **after** the first two spokes prove the format. It needs a downloadable file, a form, a delivery email, and a Supabase row like the existing lead forms. Not part of this phase.

---

## 10. Owner input still outstanding

1. Confirmation of each transfers-table row per platform. These are testable technical claims; a wrong one is worse than a missing page.
2. Nothing else. Client mapping and pricing are resolved.

## 11. Definition of done

- [ ] Template built and verified against the first supplied content file
- [ ] Spokes 1–3 live (Wix Classic, Squarespace, Wix Harmony), server-rendered, copy pasted verbatim from supplied files
- [ ] Transfers table renders all four states legibly on mobile and desktop
- [ ] No prose written by the implementer
- [ ] Hub title changed; hub platform cards link to spokes; spokes link back
- [ ] Wix Classic and Wix Harmony added to the hub's platforms block
- [ ] Every technical claim owner-verified; Wix Harmony claims linked to Wix docs
- [ ] Service + Breadcrumb + FAQPage schema on each spoke
- [ ] `/services` hub still lists only the 5 core services
- [ ] Guides in `sitemap.ts` and `public/llms.txt`
- [ ] `npx tsc --noEmit` and `npx eslint app/ content/` clean
- [ ] No `[bracketed]` placeholders
