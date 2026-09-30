/**
 * Scoring tests. Run with `npm test`.
 *
 * Node's own runner with type stripping, so this needs no test framework and
 * no install. The file is .mjs, importing the .ts sources by explicit path,
 * which keeps it out of `tsc` (which would reject .ts import extensions).
 *
 * The expected numbers are the ones the handoff (Docs/Audit_Page_Handoff.md §4)
 * fixes for Lifetime Learning Center. If a check in the content file changes,
 * these change with it, on purpose: that is the point of pinning them.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { tally, overall, bandOf, fixesOf, assertAudit } from "./score.ts";
import { lifetimeLearningCenter as llc } from "./lifetime-learning-center.ts";

test("overall pools every check: 37, 11 passed, 3 partly, 20 to fix, of 34", () => {
  const t = overall(llc);
  assert.deepEqual(
    { score: t.score, passed: t.passed, partial: t.partial, failed: t.failed, total: t.total, band: t.band },
    { score: 37, passed: 11, partial: 3, failed: 20, total: 34, band: "poor" },
  );
});

test("overall is pooled, not the average of segment scores", () => {
  const avg = Math.round(
    llc.segments.reduce((s, seg) => s + tally(seg.checks).score, 0) / llc.segments.length,
  );
  assert.notEqual(avg, overall(llc).score, "if these ever match, the pooling test is not proving anything");
});

const EXPECTED = {
  "google-listing": [33, "poor"],
  "page-names": [8, "poor"],
  housekeeping: [33, "poor"],
  "readable-content": [25, "poor"],
  trust: [50, "fair"],
  "speed-mobile": [88, "good"],
};

for (const [id, [score, band]] of Object.entries(EXPECTED)) {
  test(`segment ${id}: ${score} (${band})`, () => {
    const seg = llc.segments.find((s) => s.id === id);
    assert.ok(seg, `segment ${id} exists`);
    const t = tally(seg.checks);
    assert.equal(t.score, score);
    assert.equal(t.band, band);
  });
}

test("bands: 75+ good, 40 to 74 fair, under 40 poor", () => {
  assert.equal(bandOf(75), "good");
  assert.equal(bandOf(74), "fair");
  assert.equal(bandOf(40), "fair");
  assert.equal(bandOf(39), "poor");
});

test("87.5 rounds up to 88", () => {
  const checks = [{ status: "pass" }, { status: "pass" }, { status: "pass" }, { status: "partial" }];
  assert.equal(tally(checks).score, 88);
});

test("fixes sort high > medium > low and keep their original index", () => {
  const seg = llc.segments.find((s) => s.id === "page-names");
  const order = fixesOf(seg.checks).map(({ check }) => check.priority);
  assert.deepEqual(order, ["high", "high", "medium", "medium", "low", "low"]);
  for (const { check, index } of fixesOf(seg.checks)) {
    assert.equal(seg.checks[index], check, "index still points at the same check");
  }
});

test("assertAudit rejects a non-pass check with no priority", () => {
  const bad = structuredClone(llc);
  delete bad.segments[0].checks[2].priority;
  assert.throws(() => assertAudit(bad), /has no priority/);
});

test("assertAudit rejects a key fix pointing at a missing segment", () => {
  const bad = structuredClone(llc);
  bad.keyFixes.items[0].segmentId = "nope";
  assert.throws(() => assertAudit(bad), /unknown segment/);
});

test("the real content passes validation", () => {
  assert.doesNotThrow(() => assertAudit(llc));
});
