---
name: zenith-case-study
description: Create or edit a Zenith Digital case study (content + detail page data). Use whenever asked to write, draft, add, or update a case study, turn client/project notes into a case study, or fill the caseStudy content type. Produces outcome-led narrative copy in the Zenith voice plus the typed content entry for /case-studies/[slug].
---

# Zenith case study writer

You produce case studies for thezenithdigital.com: the content entry for
`content/case-studies.ts` (index card + detail fields) following the
established template (reference implementation: `/case-studies/knode-ai`).

**v2 (Aug 2026).** Revised after an external SEO/AEO/citation audit. The
headline change: a case study is a **first-party evidence document**, not a
story with numbers in it. Every material figure must be traceable on the page
itself, not just true in your notes. Rules that were absolutes now bend where
evidence requires it, and bind harder where truth requires it.

---

## Non-negotiables (check before writing a word)

1. **Real numbers only.** Every metric comes from owner-supplied input. If a
   number is missing, ask for it or ship without it. NEVER invent, extrapolate,
   or round a quote into a figure. A qualitative claim renders as a quote
   ("Conversion skyrocketed"), never as a fabricated percentage.
2. **Every material KPI carries its evidence.** See §2. A number without a
   period and a source is a claim; with them it's a citation. If the owner
   can't supply the measurement context for a headline figure, either demote
   the figure or publish it with the context you do have, plainly stated.
3. **Minimum data bar.** A study needs: outcome headline material, a challenge
   story, 2+ approach beats, **at least one real result**, and at least one
   image. Below that, tell the owner what's missing and stop.
4. **Verbatim testimonials.** Client quotes come from `content/testimonials.ts`
   or owner input, word for word. Never paraphrase a client.
5. **Cross-site consistency.** Before publishing, every figure and timeline in
   the study must match every other mention of that project sitewide. See §7.
6. **Copy rules (site-wide §14):** no em dashes; sentence case everywhere; no
   AI filler ("seamless", "elevate", "cutting-edge", "leverage", "bespoke",
   "delve", "robust", "unlock"); no hollow superlatives; **no empty hedging**
   (see §5); no exclamation marks; no forced rule-of-three; contractions
   welcome. Write like a sharp human, not a brochure.

---

## 1. The headline (most important decision)

**Outcome-led, and name the client where it fits naturally.** The H1 states
what the business got, not what Zenith made. Leading with the outcome is
right; dropping the entity means the page title does all the entity work
alone, which costs clarity in search results and in extracted snippets.

- Wrong: `Knode AI website design` / `A new site for Bel'Istria`
- Thin: `From losing local search to the answer AI recommends`
- Right: `How Bel'Istria went from losing local search to the answer AI
  recommends` / `From zero to a $10M Series A raise in three weeks`

Formulas that work (pick what fits, don't force):
- `How [client] [outcome verb] [outcome]`
- `From [before state] to [outcome] in [timeframe]`
- `[Metric] after [what changed]`

If the strongest result is qualitative, lead with the transformation. Prevent
bad wraps: keep compound terms unbreakable (`Series&nbsp;A`, `Wix&nbsp;Studio`).

---

## 2. Evidence architecture (new in v2, highest-value rule)

A metric becomes citation-grade when a reader or a model can tell **what was
measured, over what period, against what baseline, from what source.**

### Data model

`results[]` entries may carry optional evidence fields:

```ts
{
  value: '+257%',
  label: 'YoY search impressions',
  positive: true,
  source?: 'Google Search Console',
  period?: 'Jan-Mar 2026 vs Jan-Mar 2025',
  baseline?: 'prior-year comparable period',
  definition?: 'total web search impressions, brand + non-brand',
}
```

### How it renders

**Not a table.** A compact measurement note under the results block, one or
two lines, in the small caption style:

> Impressions measured in Google Search Console, Jan–Mar 2026 vs the same
> period in 2025. AI visibility measured with [tool], [n]-prompt set, English,
> [date].

One note per study covering the figures that need it. Metrics whose meaning is
self-evident (build duration, page count, systems handed over) need no note.

### When evidence metadata is mandatory

- Any percentage or growth figure.
- Any revenue, pipeline, or booking number.
- Any AI-visibility or ranking score.
- Any figure a competitor would reasonably challenge.

### AI-visibility claims need more

Never publish an absolute AI claim ("the answer AI recommends", "ranked first
in ChatGPT") without a documented method. Required: which assistant or tool,
what prompt or query set, how many prompts, what language and geography, what
date or range, and what the score represents. If the owner can't supply these,
soften the claim to what's provable ("measured AI visibility scores rose from
30 to 70 across ChatGPT, Gemini, and Perplexity on [tool]'s scoring") or cut it.

### Prefer business KPIs

Impressions and visibility scores are discovery metrics; buyers value
bookings, leads, revenue, and conversion rate. When a defensible business
figure exists, it leads. Discovery metrics support it.

---

## 3. Voice calibration (from the Knode reference)

- **Intro pattern:** two sentences on who the client is in THEIR world, then
  the gap. `Knode is sales coaching software. It reads recorded calls,
  pinpoints the behaviors that close deals... When we met, the product was
  working and the Series A was in motion. The website was the part that hadn't
  caught up.`
- **Challenge** is written from the client's stakes, not ours: what was at
  risk, why the timing mattered. End with the brief in one blunt line.
- **Approach** = 2–4 titled beats (3–6 words, sentence case), each 1–2
  paragraphs explaining a decision and WHY. Decisions, not deliverables lists.
- **Results note:** one line that lands the meaning of the numbers, dated
  where possible (see §4), not a recap.
- Sentences short. Specifics over adjectives. Saying what Zenith didn't do, or
  what was hard, buys credibility for everything around it.

---

## 4. Data structure (fill ALL that data supports, omit the rest)

Sections render conditionally: a section with no data renders nothing.

```ts
{
  // index card
  client, slug, industry,            // industry from the fixed enum
  metric, metricIsQuote?,            // ONE hard metric for the card
  story,                             // one line, ≤90 chars, business story
  thumb, liveUrl, featured?, panel?,
  // detail page
  headline,                          // outcome H1, client named where natural
  stats: [1–3],                      // hero metrics; strongest first
  meta: { industry, engagementType, timeline, platform, liveUrl },
  challenge: [2–3 paragraphs],
  introduction,                      // the fact block (see §6)
  approach: [{ heading, body } x 2–4],
  results: [1–4],                    // ONE genuine result beats four padded
  resultsNote,                       // the quotable outcome sentence
  measurementNote?,                  // §2 evidence line
  scope/techUsed: [4–6],             // sidebar, links to service pages
  gallery?, beforeAfter?, video?,
  testimonial?,                      // by id from testimonials
  relatedSlugs?: [1–2],              // §9 related proof
  publishedAt, seo: { title, description }
}
```

**Count rules (v2 fix):** hero `stats` may be 1–3, `results` 1–4. If a project
has one genuine result, ship one. Never manufacture filler metrics to fill
slots. Non-result context metrics (timeline, page count, systems shipped) are
permitted in `results` when a study is capability-led rather than
outcome-led — label them as facts, never dress them as outcomes.

- `seo.title`: `[Client] case study | [compressed outcome] | Zenith Digital`
- `seo.description`: outcome + industry + timeframe, ≤155 chars, no hype.
  (These are editorial targets, not hard limits — Google rewrites snippets
  anyway. Don't mangle a sentence to hit a character count.)
- OG image = the study's hero shot, never the generic site OG.
- Verify every asset path belongs to THIS client.

---

## 5. Hedging and limitations (v2 rewrite)

**No EMPTY hedging.** Ban vague qualifiers that weaken a true claim: "we
strive to", "we aim to", "results may vary", "arguably". Do NOT ban **evidence
qualifiers** — they make a claim more accurate, not less confident:

- Good: "across the tracked prompt set", "during the measured period",
  "in Google Search Console", "on the pages we built"
- Bad: "we believe this helped", "results can vary by client"

**One honest limitation, when one exists.** A real trade-off, descoped item,
or constraint is excellent proof of judgment — include it when the project
record supports it. **Never invent one to complete the pattern.** If the
project genuinely had no notable trade-off, the study ships without one. This
rule yields to the no-invention rule, always.

---

## 6. AEO and LLM citability (v2: heuristics, not guarantees)

There is no special markup, file, or heading shape that guarantees an AI cites
you. What actually helps is what has always helped: crawlable pages, clear
visible text, unambiguous entities, unique first-party evidence, and
consistent claims. Treat the following as good practice that makes accurate
extraction easier — not as retrieval levers.

1. **The fact block.** The intro's first 2–3 sentences should work as a
   standalone extract containing: client name, what the client does, what
   Zenith Digital built, the platform, the timeframe, and the headline
   outcome. Test: paste only those sentences into a chat with no context — can
   the question "who built [client]'s website and what happened?" be answered?
2. **Name entities, don't gesture.** "Zenith Digital" appears by name (not
   just "we") at least once in the intro and once in the results note. Client
   name recurs in the results section.
3. **One quotable outcome sentence** in the results note, structured
   `[Client] + [outcome] + [timeframe/mechanism]`, **dated where possible**.
   Prefer "In the seven months after the December 2025 launch..." over "within
   a season". Declarative, no hedge, no context needed.
4. **Question-shaped subheads where natural** — useful for readers scanning
   and for topical clarity. Use when it doesn't bend the voice; don't force.
5. **Plain claims over clever ones.** Every section carries at least one flat
   factual sentence with a number or a named entity.
6. **Natural keyword presence** where true: the industry term and the real
   platform appear in body text, not just meta fields. One natural use each.
7. **llms.txt is optional and experimental.** It's fine to have; it is not an
   AEO signal to build strategy on, and it is never a reason to claim AI
   visibility work was done.

---

## 7. Consistency check (mandatory, before drafting is called done)

Run this against the repo, not from memory:

- Every figure in the study matches every other mention sitewide (homepage
  cards, index card, service-page proof chips, testimonial tags, nav lists).
- **Timelines especially.** "2-week launch" on one surface and "8-week build"
  on another will be read as answers to the same question. Normalize the
  phrasing, or state explicitly what each period covers ("8-week build,
  ongoing since").
- Counts are qualified: "35+ pages migrated at launch, 70+ live today" beats
  two numbers that look like a contradiction.
- One canonical phrasing per result across all Zenith-owned pages.

`grep` for the client name and each figure across `content/` before shipping.

---

## 8. Structured data (v2 correction)

- **Article + BreadcrumbList** on the detail page. Article `headline` must
  align with the visible H1 and the description must not contradict visible
  text — factual alignment, not literal string identity. Where the page is
  more marketing page than editorial article, `WebPage` is sufficient.
  Structured data here is descriptive, not a ranking lever.
- **Do NOT add Review or AggregateRating markup to client testimonials on
  Zenith-owned pages.** Google treats reviews about an organization, hosted by
  that organization, as self-serving and ineligible for review rich results.
  Keep the testimonial visible as conversion proof; only use Review structured
  data where the reviewed item and Google's eligibility rules genuinely fit.
- **FAQPage** only where real FAQs appear on the page.

---

## 9. Internal linking (bidirectional, and it's a deliverable)

- **Study → service.** Scope sidebar items link to their service pages using
  the shared label→slug map (`Wix Studio build` →
  /services/wix-studio-website-design, `SEO & AEO` → /services/seo-aeo-ppc,
  `Migration` → /services/website-migration, `Landing pages` →
  /services/landing-pages). Items without a real target render unlinked. Never
  force a link to a generic page.
- **Study → taxonomy.** Meta bar industry tag → `/case-studies?industry=[slug]`.
- **Prose links:** at most 1–2, only where a service is genuinely named.
- **Service/industry → study (REQUIRED, and you must output it).** A study
  with no inbound internal links is invisible. Since the reverse link lives in
  another file, the deliverable includes an explicit action: the exact source
  page, the target URL, and suggested descriptive anchor text ("See how we
  migrated Bel'Istria from Wix Classic to Wix Studio"). Patch it directly when
  tooling allows.
- **Study → related studies.** End with 1–2 genuinely related case studies
  (same capability, different market, or same industry) via `relatedSlugs`.
  Adds a second proof path without diluting the primary service CTA. Omit
  rather than force a weak match.

---

## 10. Trust conversion

- **Specificity ladder:** every section beats the generic version of itself.
  If a sentence could appear on any agency's site, sharpen or cut it.
- **Client's voice near the numbers.** Testimonial adjacent to the results
  block: third-party words next to first-party numbers is the trust peak.
- **Outcome-matched CTA.** The closing CTA references this study's outcome
  type (bookings study → "want booking numbers like these?"), never a generic
  contact prompt.
- **Partnership attribution.** Where a project ran with a partner agency,
  state the division of labour plainly and credit system-level results to the
  system ("full system, MOD + Zenith"). Zenith claims the website work only.

---

## 11. Workflow

1. **Intake.** Client, industry, live URL; engagement type, timeline,
   platform; what was broken (their words); what Zenith did; every real number
   **with its measurement context** (source, period, baseline, definition);
   assets; testimonial id; permission to publish name + numbers.
2. **Verify.** Cross-check every number against `content/` (see §7).
3. **Draft.** Headline first (offer 2–3 options), then card fields, then the
   detail narrative in the Knode register.
4. **Self-check** against the checklist below. Fix before presenting.
5. **Deliver** the typed entry, the reverse-link action (§9), and a one-line
   list of missing assets or missing evidence, marked, never faked.

**Asset blocker rule (v2 clarification):** a missing hero image does not stop
drafting. Draft fully, then mark the study **publication-blocked** with the
exact asset needed. Publication requires the hero shot; drafting does not.

---

## 12. Pre-publish technical gate

Verify on the rendered page, not in theory:

- [ ] Page is indexable: no `noindex`, canonical URL correct and self-
      referencing, returns 200.
- [ ] Crawlable by Googlebot **and** OAI-SearchBot (check robots.txt allows
      both; ChatGPT search discovery depends on OAI-SearchBot access).
- [ ] Snippet eligibility not suppressed (`nosnippet`, `max-snippet` limits).
- [ ] All key facts and figures present as **crawlable text**, not only in
      images, metadata, or client-rendered components.
- [ ] Article/WebPage + BreadcrumbList present and factually aligned with
      visible content. No Review markup on Zenith-hosted client testimonials.
- [ ] Page appears in the sitemap.
- [ ] Every image has descriptive alt text naming the client and what's shown.

---

## 13. Quality checklist (run every time)

- [ ] Headline states a business outcome; client named where natural; a
      stranger understands the win without context.
- [ ] Every number traceable to owner input; qualitative claims as quotes.
- [ ] **Every material KPI carries source, period, and definition where a
      reader would need it; measurement note rendered.**
- [ ] **No absolute AI-visibility claim without documented methodology.**
- [ ] Business KPIs lead where they exist; discovery metrics support.
- [ ] Challenge readable by the client without embarrassment.
- [ ] Approach beats explain decisions and reasons, not task lists.
- [ ] No §14 violations: em dashes, Title Caps, filler, exclamation marks,
      empty hedging.
- [ ] Evidence qualifiers preserved where they aid accuracy.
- [ ] Limitation included only if the project record supports one.
- [ ] Counts honest: 1–3 hero stats, 1–4 results, no filler metrics.
- [ ] Card story ≤90 chars; strongest metric leads everywhere.
- [ ] Testimonial verbatim, attribution matches testimonials.ts.
- [ ] **Numbers and timelines consistent with every other mention sitewide
      (grepped, not remembered).**
- [ ] Fact block passes the standalone-extract test.
- [ ] "Zenith Digital" named in intro and results note; one quotable,
      preferably dated, outcome sentence present.
- [ ] Internal links wired all four ways: study→service, study→industry
      filter, service/industry→study (delivered as an action), study→related
      studies.
- [ ] Testimonial adjacent to results; CTA matches the outcome type.
- [ ] Technical gate (§12) passed, or the study is marked publication-blocked
      with the specific blocker named.
