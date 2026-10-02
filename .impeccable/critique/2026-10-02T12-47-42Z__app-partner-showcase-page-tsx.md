---
target: /partner-showcase (app/partner-showcase/page.tsx)
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
timestamp: 2026-10-02T12-47-42Z
slug: app-partner-showcase-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence), run against the dev build on 2 Oct 2026. Fixes listed under each issue were applied in the same session, after this critique.

## Design health score

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Jump bar, slider counters and disabled ends are clear. Process auto-advances with no paused or playing state. |
| 2 | Match system / real world | 3 | The "when" lines speak the owner's language. Jargon leaks through: CRO, AEO, Next.js / Sanity / Vercel, Core Web Vitals. |
| 3 | User control and freedom | 3 | No traps; sliders don't loop; "All" resets the filter. |
| 4 | Consistency and standards | 3 | Two slider arrow styles on one page; platform chips looked like filter buttons. |
| 5 | Error prevention | 2 | The project grid exposed white-label work and a £750 price inside a thumbnail, and linked to Wix preview addresses. |
| 6 | Recognition rather than recall | 3 | Process step names hidden below sm; proof sources are only explained further down. |
| 7 | Flexibility and efficiency | n/a | Persuade surface with no repeat-use workflow. |
| 8 | Aesthetic and minimalist design | 2 | The cover and service rows are strong. The 34-card grid was about 60% of the phone page. |
| 9 | Error recovery | 3 | No inputs; image and filter fallbacks hold. |
| 10 | Help and documentation | n/a | Persuade surface; the close line is the help route. |
| **Total** | | **22/32** | **Acceptable** |

## Design specificity verdict
The top 40% is written for this reader: a partner-safe headline, four money figures under it, a "when" line on each service in the reader's own words, "Most ad clients start here", and a close that points back to the sharer. The bottom 60% was the public site's portfolio unchanged, and the one idea only this page has ("How we work with your ads partner") gets the most generic composition. Deterministic scan: `detect.mjs` 0 findings (verified live on a seeded file). The in-page overlay flagged overused-font (Inter, mandated by CLAUDE.md §7), image-hover-transform (the grid's 1.02 hover, sanctioned) and edge-flush-cards (the work track deliberately bleeds to the rails); all three are project-sanctioned. axe-core found one real violation: the work slider's scroll track was not keyboard-focusable. Contrast passed everywhere (lowest 6.02:1).

## Priority issues

- **[P0] "All projects" revealed the white-label arrangement and a retail price, and linked to competing agencies.** The Agencies tab and its five cards, Techtonnik's "fulfillment partner", LMF HR, Highland Fling's "created by MOD Digital" thumbnail, Wellington's "From £750" thumbnail, and links to moddigital.wixstudio.com previews. Breaks hard rule 1 and decisions 3 and 4, invisibly to a string grep. **Fixed:** CaseStudyGrid gained `exclude` (with the filter showing only industries that still have cards), the page hides the agencies industry plus techtonnik, lmf-hr and highland-fling, and `*.wixstudio.com` preview addresses are never linked in live mode.
- **[P1] The grid was most of the page and buried the close** (about 16,000 of 27,178px at 375). **Fixed:** `limit` shows 8 cards under "All" with an in-page "Show all 26 projects" button (focus moves to the first revealed card); a filtered view shows every match. Phone page now 15,155px.
- **[P1, axe] Work slider track not keyboard-focusable** (`scrollable-region-focusable`, serious). **Fixed** in ProjectsSlider (also fixes /services/[slug]).
- **[P2] "How we work with your ads partner" is buried and generic.** Left: the handoff fixes the section order in §6; recomposing it is a design change for the owner to approve.
- **[P2] Process auto-cycles.** Left: the handoff says to reuse Process unchanged; the cycle serves the shared-screen use and respects reduced motion.
- **[P2] The 4:3 crop cuts the second window of the 2:1 service shots.** Left: the handoff requires one 4:3 box with no letterboxing; the real fix is 4:3 exports of those shots.

Locked §5 copy, flagged for the owner rather than edited: MOD Digital leads the proof strip and the first landing-page slide, and that slide shows MOD's own site; Bel'Istria leads both rows 04 and 05; "Free strategy call" in Process step 1 is a pricing statement the partner may not make; jargon (CRO, AEO, Next.js / Sanity CMS / Vercel, Core Web Vitals).

## Persona red flags
- **Phone reader from WhatsApp:** the close sat after about 16,000px of cards (fixed); filter and jump bars scroll sideways with clipping as the only cue; Process tabs read "STEP n" only.
- **First-time business owner:** jargon above; platform chips looked tappable (fixed: flat tiles).
- **Stress tester:** the same Bel'Istria shot leads two adjacent rows (locked copy); two slider arrow styles (fixed: one arrow).

## Minor observations
- H1 and the proof figures share the H1 size; the proof strip's MOD label wraps to five lines at 768.
- Long client names wrap beside the industry tag at 375 in CaseStudyGrid (shared component, left unchanged).

## Questions to consider
1. Should "How we work with your ads partner" move to the second screen and be drawn as the loop it describes?
2. Should every screenshot and live link on a white-label page be audited for prices, credits and competing CTAs before it's shared?
