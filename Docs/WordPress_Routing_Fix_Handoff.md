# WordPress routing fix: handoff brief

**Owner:** Pavle. **Written:** 7 October 2026.
**Read first:** `CLAUDE.md` §14, `Docs/zenith-migration-guide-SKILL.md`, `content/migration-guides/wordpress.ts`, `content/service-pages/website-migration.ts`.

This is a content edit to two files plus a link check. No new components, no new routes, no URL changes, no redirects.

---

## 1. The problem, with numbers

Search Console, 90 days to 7 October 2026:

| Page | Impressions on "WordPress to Wix" queries | Position when shown |
|---|---|---|
| `/services/website-migration` (hub) | 531 | 39 to 59 |
| `/services/wordpress-to-wix-studio` (the guide) | 13 | 20 to 30 |

Google picks the hub for these searches, and the hub ranks about 20 places worse than the guide does on the rare occasions the guide is shown. Three causes, all fixable:

1. **Wording.** People search "moving from WordPress to Wix" (252 impressions), "wordpress to wix" (86), "migrate wordpress site to wix" (34), plus transfer, convert and switch variants. They say **Wix**, not Wix Studio, and they use a verb. The guide's title and H1 say "WordPress to Wix Studio: migration guide".
2. **Links.** The guide has three internal links pointing at it: the hub card and two sibling guides. No blog post links to it. Several link to the hub. It was last crawled on 27 August.
3. **The hub still claims the term.** Its file comment lists "wordpress to wix migration" as a target, and its WordPress card never uses the searched phrase.

**Goal:** Google shows the guide, not the hub, for these queries. Page one is not promised. Success is measured in §6.

---

## 2. Hard rules

- The slug stays `wordpress-to-wix-studio`. No redirect, no canonical change.
- **No new platform claims.** Everything below restates what the guide already says and already sources. Do not touch `sources` or its `verified` date.
- Follow the migration-guide skill: both platform names in every FAQ question, the answer in the first 40 to 80 words, no ranking guarantee, no absolute claims, no em dashes, sentence case headings.
- The FAQ count stays at 11. One question is added and two are merged (§3.4).
- "Wix" and "Wix Studio" are both named once early, then each is used where it fits. This is the terminology bridge the skill describes, applied to the buyer's word for the destination.

---

## 3. `content/migration-guides/wordpress.ts`

### 3.1 SEO

```ts
seo: {
  title: "Moving from WordPress to Wix: Migration Guide | Zenith Digital",
  description:
    "Moving from WordPress to Wix? Wix imports your blog posts and nothing else. What transfers, what gets rebuilt, and what the move costs.",
},
```

### 3.2 Hero

```ts
h1: "Moving from WordPress to Wix Studio: the complete migration guide",
subhead:
  "Moving a site from WordPress to Wix means one thing imports and the rest is rebuilt. Wix built an importer for WordPress and only WordPress, and it covers your blog posts. The pages, the plugins and the theme are rebuilt in Wix Studio, Wix's professional editor. Here's exactly where that line falls and what it costs to cross it.",
```

`hero.name` and the chips stay as they are.

### 3.3 File comment

Update the `Targets:` line at the top to:

`moving from wordpress to wix · wordpress to wix · migrate wordpress site to wix · wordpress to wix studio · wix wordpress importer`

Add one line under it: `Title and H1 reworded 7 Oct 2026 to the phrasing Search Console shows (buyers say "Wix", and use a verb). See Docs/WordPress_Routing_Fix_Handoff.md.`

### 3.4 FAQ

**Add as the first item:**

- **Q:** `Can you switch from WordPress to Wix?`
- **A:** `Yes. There's no official one-click conversion, so switching from WordPress to Wix is part import and part rebuild. Wix's importer brings your blog posts across, and the pages, design and plugin features are rebuilt in Wix or Wix Studio. Static pages can keep their URLs, and anything that does change gets a redirect. Most sites take two to five weeks.`

**Reword** `Can I migrate my WordPress site to Wix Studio myself?` to `Can I transfer my WordPress site to Wix myself?` Keep the answer.

**Merge** `Will I lose my Google rankings moving from WordPress to Wix Studio?` and `Will my URLs change moving from WordPress to Wix Studio?` into one item with the question `Will I lose my Google rankings moving from WordPress to Wix Studio?`. Keep every factual statement from both answers, lead with the rankings answer, then the URL detail. Nothing new is added and nothing is dropped. If the merged answer runs past about 150 words, tighten the wording, not the facts.

Net count: 11.

### 3.5 Glance

Change `glance.heading` to `Moving from WordPress to Wix Studio at a glance`. Items unchanged.

---

## 4. `content/service-pages/website-migration.ts` (the hub)

1. **File comment.** Remove `wordpress to wix migration` from the `Targets:` line. Add: `WordPress terms belong to the WordPress guide. 7 Oct 2026: Search Console showed this hub taking 531 impressions on them at position 39 to 59.`
2. **WordPress card** in `unique.items`:
   ```ts
   desc: "Moving from WordPress to Wix: what the importer takes, what it leaves behind, and what the plugins become.",
   ```
   Then open the component that renders these cards and confirm the `desc` text is inside the `<a>`, so the phrase is part of the link text. If only the platform name is linked, widen the link to the whole card. Do not restyle it.
3. **Hub FAQ** `Why leave WordPress for Wix Studio?`: if FAQ answers on service pages can carry a link (check `types.ts` and the renderer), end the answer with `The WordPress guide covers what moves and what gets rebuilt.` linked to `/services/wordpress-to-wix-studio`. If answers are plain strings, leave it and say so in your summary. Do not add link support for this.

The hub's title, H1, description and hero stay as they are. It should keep listing WordPress among the platforms.

---

## 5. Internal links elsewhere in the repo

Run `grep -rn -i "wordpress" content/ --include=*.ts` and, for each hit outside the two files above, check whether the surrounding field renders links:

- `content/faq.ts`: `Why Wix Studio and not WordPress or Webflow?`
- `content/home.ts`: `What if we're on Webflow, WordPress, or a custom stack today?`

Where the field supports a link, link the word WordPress, or a short closing sentence, to `/services/wordpress-to-wix-studio`. Where it doesn't, leave it. Add no more than three links in total and none in the nav or footer.

Blog posts live in Sanity and are **not** part of this brief. The owner handles those (§7).

---

## 6. Definition of done

- [ ] Title, description, H1, subhead, glance heading, FAQ and comments match §3 word for word.
- [ ] FAQ count on the WordPress guide is 11. FAQPage structured data on the page still validates and reflects the new first question.
- [ ] No change to `slug`, `sources`, `publish`, the transfers table or the steps.
- [ ] Hub card description updated and the phrase sits inside the link.
- [ ] No em dashes in rendered copy. No sentence promises rankings.
- [ ] `npx tsc --noEmit` and `npx eslint content/` clean.
- [ ] Summary lists every internal link added, and every place a link was wanted but the field didn't support one.

---

## 7. For the owner, after deploy

1. In Search Console, run URL inspection and **Request indexing** on both `/services/wordpress-to-wix-studio` and `/services/website-migration`. The guide hasn't been crawled since 27 August.
2. Three published blog posts should link to the guide in-body: `is-wix-studio-good-for-seo` (it already mentions WordPress), `website-redesign-google-rankings` (it links the hub) and `wix-studio-pricing`. These are Sanity edits.
3. **Check on 4 November:** for "moving from wordpress to wix" and "wordpress to wix", which URL does Search Console show, and at what position? The fix worked if the guide has replaced the hub. If the hub still wins, the next step is trimming WordPress from the hub's hero and description.
