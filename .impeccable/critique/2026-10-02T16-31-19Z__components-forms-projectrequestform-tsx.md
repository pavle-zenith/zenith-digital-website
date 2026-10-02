---
target: /project-request
total_score: 30
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
timestamp: 2026-10-02T16-31-19Z
slug: components-forms-projectrequestform-tsx
---
Method: dual-agent (A: design review · B: detector + headless browser evidence). No visible [Human] overlay: browser checks ran headless.

## Design Health Score (before the fixes listed below)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Pinned Next made an unfinished step look finished |
| 2 | Match system / real world | 3 | "Size and features", "Case studies" beside "Past work" (brief copy) |
| 3 | User control and freedom | 3 | Exclusive "Not sure" wiped earlier picks with no undo |
| 4 | Consistency and standards | 3 | Reveal panel at 6px on a surface; two controls named "Email" |
| 5 | Error prevention | 3 | Next reachable before seeing required questions lower down |
| 6 | Recognition rather than recall | 4 | Asks what people should find, not how many pages |
| 7 | Flexibility and efficiency | 3 | Enter advances, autocomplete; nothing shortens step 2 |
| 8 | Aesthetic and minimalist design | 3 | Triple heading echo on step 1; step 2 tile wall |
| 9 | Error recovery | 3 | Errors shown on questions never seen; empty email told it was malformed |
| 10 | Help and documentation | 2 | Hints and "Not sure" only; contact links only after sending |
| **Total** | | **30/40** | **Good** |

## Design specificity
On-system and in the right voice (first person, founder face, no chrome, ink only on selection, focus and the primary button), but the card of boxed tiles is the generic intake-form structure. The Drafting Table's ruled-row signature stops at the card edge.

Deterministic scan: CLI detector clean on all four markup files. Browser detector: `overused-font` (Inter, the documented body face: false positive), `nested-cards` on the hairline-topped action row (regex matches `border-t`: false positive), `text-occlusion` of the detector's own label (false positive). Computed: no box-shadow anywhere, zero horizontal overflow 320 to 1280, all text 5.38:1 or better, tiles and buttons 48px and up; header wordmark and footer privacy link short tap targets; unchecked tile and input borders 1.21:1 (sitewide input token).

## Priority issues
- [P1] Step 2 on a phone: pinned Next jumped people to four errors on questions they never scrolled to. FIXED: Next now flags only questions already scrolled past; otherwise it scrolls to the next unanswered question and focuses it, without an error.
- [P2] Exclusive options silently cleared earlier picks. FIXED: picks are stashed and restored when the exclusive option is unticked or another option is picked; exclusive options now sit below a rule on their own full-width row.
- [P2] Arbitrary `:hover` variant left a grey fill on tapped tiles on touch screens. FIXED: `not-has-checked:hover:` (inside Tailwind's hover-capable media guard).
- [P2] Dense grid packing above 640px put the follow-up panel under the wrong tile and zigzagged Tab order. FIXED: dense packing removed; DOM order is screen order.
- [P3] Display-size step title echoed the H1 and the first question. FIXED: one-line heading "STEP 1 OF 4 · What you need".

## Persona red flags
- Jordan (first-time clinic owner): step 2 title and some option labels are technical (brief copy, unchanged); no way to ask Pavle before sending.
- Casey (phone, WhatsApp in-app browser): step 2 is long; sessionStorage autosave may not survive reopening the link from the chat (brief specifies sessionStorage).
- Sam (screen reader): exclusive clear had no announcement (now reversible); two controls named "Email" on step 4.

## Minor observations
- FIXED: reveal panel radius 8px; red border on an input in error; empty email gets "Add your email."; "Dr. Ana" greeted as Ana; curly quotes in the error copy; larger header and footer link targets.
- Open: `find` two-up on phones (departs from brief §7); input border contrast (sitewide token); "Send my request" wraps beside Back at 320px; optional budget can't be cleared once tapped; DESIGN.md says `accent-subtle` is pills-only but answer tiles use it.

## Questions to consider
- Should step 2's long checklists become ruled divided-list rows, the Drafting Table's own list pattern?
- Should the reply promise (one working day, a price range) appear before Send rather than only after?
