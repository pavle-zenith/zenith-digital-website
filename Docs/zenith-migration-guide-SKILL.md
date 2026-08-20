---
name: zenith-migration-guide
description: Write a platform migration guide for the Zenith Digital site (/services/[platform]-to-wix-studio). Use when creating or revising a migration guide content file for WordPress, Webflow, Framer, Squarespace, HTML, Wix Harmony or any new source platform. Produces a content/migration-guides/<platform>.ts file that fits the existing template with no new components.
---

# Zenith migration guide

You are writing a `content/migration-guides/<platform>.ts` file. The template, components and routing already exist. Your output is content only.

`content/migration-guides/wix-classic.ts` is the reference implementation. Read it before writing. Read `types.ts` for the exact contract — it is the living spec and this skill does not duplicate it.

---

## Non-negotiables

**No new components.** Every block already renders. If your content needs something the type can't express, say so and stop. Do not invent a block.

**No new section ids.** The sticky navigator reads `GUIDE_NAV_SECTIONS` in `content/migration-guides/index.ts` and filters by which blocks are present. Use the existing ids or the guide loses its navigation.

**`mistakes` has exactly three items.** The nav label reads "Three decisions". Four items makes the navigator lie.

**`publish: false` until the owner has verified the transfers table.** Every row is a testable technical claim. A wrong row is worse than a missing page, and this has already happened once: the Wix Classic guide shipped a claim that the Premium plan carried over free when Wix requires a paid upgrade.

**Every platform constraint links to the vendor's own documentation.** Not a blog post, not a forum thread, not inference. If you cannot find primary documentation for a claim, either cut the claim or write it as "verify this in your account before committing" and explain why the answer is unclear. Saying "check this" is more useful than a confident wrong answer, and no competitor does it.

---

## Step 1 — Research before writing a word

1. Read the source platform's **own** export/migration documentation. What does its export file actually contain?
2. Read Wix's documentation for the destination side: CMS import limits, redirect import, app availability, plan requirements.
3. Search the SERP for `"[platform] to wix studio"` and note who ranks and what they omit.
4. Ask the owner which real client backs this platform. **If there is none, omit the `proof` block.** Never borrow another platform's client. Flow Ninja's guides rank carrying no proof at all, so an unproven guide is fine; a dishonest one is not.

Collect every source URL as you go. They become the `sources` block.

---

## Step 2 — Find the editorial thesis

Every guide needs one argument that could not appear on a sibling. This is what stops the set reading as programmatic.

| Source | Thesis |
|---|---|
| Wix Classic | Two documented routes, and Wix never reconciles them. Which applies to you? |
| Squarespace | What the export file actually contains, and the things it silently leaves behind |
| WordPress | What happens to plugins, themes and custom post types when the stack disappears |
| Webflow | Not build quality, editability. Who on the team can safely change a page |
| Framer | How much of a highly visual site survives a move into a real CMS |
| Wix Harmony | A generation with no CMS and no multilingual, and no path between the two |
| HTML | What can be reused from raw markup versus what has to be recreated |

If you cannot state the thesis in one sentence, you do not understand the platform well enough to write the guide yet.

---

## Step 3 — Write the blocks

### Required on every guide

**`glance`** — exactly six `{label, value}` pairs. Short answers to: can the design convert, what comes with you, what happens to URLs, what it costs, how long it takes, DIY difficulty. Values are one sentence. This is the most extractable block on the page.

**`benefits`** — exactly six. What Wix Studio gives *this* reader. **Shift the emphasis by source platform**: WordPress readers care that maintenance ends, Webflow readers about who can edit, Framer readers about a real CMS, Classic readers about responsive control. Same destination, different argument. Reusing the Classic six verbatim is the doorway failure.

**`fit`** — good fit and not-a-fit. Naming who should stay put buys more trust than it costs.

**`transfers`** — 12 to 16 rows. See rules below.

**`steps`** — 6 to 8. Each: short `body` (one or two sentences), a `lead` line, then 3 to 5 `points` with bold labels. Each needs a `navLabel` when the title is editorial. Give every step a `duration`.

**`seoMechanics`** — 3 to 4 long-form items. One of them must be the honest limits item: nobody can guarantee an external algorithm's output, so guarantee the work instead. Never promise "zero ranking loss".

**`mistakes`** — exactly three, framed as decisions rather than failures.

**`sources`** — every primary source, with `verified` set to the date you checked them.

**`faq`** — 8 to 10. See rules below.

**`auditCta`**, **`related`**, **`finalCta`**, **`schema`**, **`seo`**, **`hero`** — standard, follow the reference file.

### Conditional

**`routes`** — only where the platform genuinely has more than one documented path. **Wix Classic is currently the only one.** Do not manufacture a choice to fill the block.

**`proof`** — only with a real client on this platform.

**`cost`** — omit. The template falls back to the sitewide pricing section, which is the owner's decision.

### Contextual CTAs

Maximum three, attached to the block that earned them, never two adjacent. Place them where the reader has just felt difficulty: after the transfers table, after the routes comparison, after the honest-limits item. Offer the free audit rather than a call — much of this audience arrived intending to do it themselves.

---

## The transfers table

The signature asset. Four states, and the vocabulary is ours:

- `carries` — arrives intact
- `rebuilt` — content survives, the container is built new
- `replaced` — no equivalent, a different Studio feature does the job
- `lost` — nothing carries, and the note says what you do instead

Rules:

- **Order `carries` rows first.** The reader should meet the good news before the losses.
- **One sentence per note.** If it needs two, the row is doing too much.
- **Include the losses honestly.** A page that admits what breaks outranks one claiming everything transfers, and it pre-qualifies the lead.
- **Rows must differ substantively between guides**, not by synonym swap. WordPress rows name plugins and custom post types; Squarespace rows name what the export omits.
- Use `route` only when the answer genuinely differs by route.
- Mark anything you could not verify as needing an account-level check rather than guessing.

---

## FAQ rules

Every question is a **standalone natural-language query carrying both platform names**. It has to survive being lifted out of the page by FAQPage markup or quoted by an answer engine.

Wrong: "Will I lose my rankings?" · "Should I move now or wait?" · "What about my code?"

Right: "Will I lose my Google rankings moving from WordPress to Wix Studio?" · "How much does a Squarespace to Wix Studio migration cost?" · "Does Velo code still work after moving from Wix Classic to Wix Studio?"

Answer the question in the first 40 to 80 words, then expand. Always include cost and timeline questions.

---

## Voice

Second person, teaching. The reader is shopping around and wants to understand their options, not read about our process.

**Capability leads, constraints follow.** The first substantive block says what Studio gives them. Difficulties land later as planning guidance from someone who has done this. The first draft of the Wix Classic guide led with "this is a rebuild, not a migration" and argued against its own service.

Our projects appear only to answer a question the reader already has. Never as a credentials list, **never with a project count** — "three of our four projects" tells a prospect the sample is small.

Follow CLAUDE.md §14 without exception: no em dashes in rendered copy, sentence case headings, no "seamless", "leverage", "cutting-edge", "bespoke solutions", no hollow superlatives, no invented figures. Contractions welcome.

Target 2,300 to 3,200 words. If the answer is complete at 2,400, stop.

---

## Before handing over

- [ ] Thesis stateable in one sentence, and true only of this platform
- [ ] `glance` and `benefits` are six each, and `benefits` argues this platform's case
- [ ] `mistakes` is exactly three
- [ ] Transfers rows lead with `carries`, notes are one sentence, losses included
- [ ] No row, sentence or FAQ would read the same on a sibling guide
- [ ] Every FAQ carries both platform names and answers in the first 80 words
- [ ] Every platform constraint links to vendor documentation in `sources`, with `verified` set
- [ ] `routes` present only if the platform really has two; `proof` present only with a real client
- [ ] No em dashes, no banned words, no project count, no ranking guarantee
- [ ] Max three contextual CTAs, none adjacent
- [ ] `publish: false`, with an OWNER note listing the rows needing verification
- [ ] Registered in `content/migration-guides/index.ts`
- [ ] `npx tsc --noEmit` and `npx eslint content/` clean

Then give the owner the transfers table as a list to mark confirmed, wrong or unknown. Flip `publish` only after that comes back.
