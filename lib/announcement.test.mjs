/**
 * Announcement bar message tests. Run with `npm test`.
 *
 * The month rule (this month before the 15th, next month from the 15th, in
 * Belgrade time), the spot count's three states, and scheduled overrides.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveAnnouncement } from "./announcement.ts";

const base = {
  enabled: true,
  href: "/book-a-call",
  spotsLeft: 3,
  messages: {
    spots: {
      desktop: "Booking {month} builds: {spotsLeft} spots left. Fixed price, built to win you enquiries",
      phone: "{month}: {spotsLeft} spots left. Book a call",
    },
    full: { desktop: "{month} is full. Booking {nextMonth} builds", phone: "{month} is full. Booking {nextMonth} builds" },
    noCount: { desktop: "Booking {month} builds. Fixed price, built to win you enquiries", phone: "Booking {month} builds. Book a call" },
  },
  scheduled: [],
  regionLabel: "Announcement",
};
// Noon UTC is the same calendar day in Belgrade.
const at = (iso) => new Date(`${iso}T12:00:00Z`);
const run = (iso, over = {}) => resolveAnnouncement({ ...base, ...over }, at(iso));

test("this month before the 15th, next month from the 15th", () => {
  assert.equal(run("2026-11-14").desktop, "Booking November builds: 3 spots left. Fixed price, built to win you enquiries");
  assert.equal(run("2026-11-15").desktop, "Booking December builds: 3 spots left. Fixed price, built to win you enquiries");
  assert.equal(run("2026-11-15").phone, "December: 3 spots left. Book a call");
  assert.equal(run("2026-12-20").phone, "January: 3 spots left. Book a call");
});

test("the cut-off is Belgrade midnight, not UTC", () => {
  // 23:30 UTC on the 14th is already the 15th in Belgrade (UTC+1 in November).
  const r = resolveAnnouncement(base, new Date("2026-11-14T23:30:00Z"));
  assert.match(r.desktop, /^Booking December/);
});

test("spot count: one, zero, and unset", () => {
  assert.equal(run("2026-11-20", { spotsLeft: 1 }).phone, "December: 1 spot left. Book a call");
  const full = run("2026-11-20", { spotsLeft: 0 });
  assert.equal(full.desktop, "December is full. Booking January builds");
  assert.equal(run("2026-12-20", { spotsLeft: 0 }).desktop, "January is full. Booking February builds");
  assert.equal(run("2026-11-20", { spotsLeft: undefined }).phone, "Booking December builds. Book a call");
});

test("a scheduled message wins inside its window only", () => {
  const scheduled = [{ start: "2026-12-01", end: "2026-12-24", desktop: "Closed for {month} holidays →", href: "/contact" }];
  const inside = run("2026-12-24", { scheduled });
  assert.equal(inside.desktop, "Closed for January holidays");
  assert.equal(inside.phone, "Closed for January holidays");
  assert.equal(inside.href, "/contact");
  assert.match(run("2026-12-25", { scheduled }).desktop, /^Booking January builds/);
});

test("disabled: no bar", () => {
  assert.equal(run("2026-11-20", { enabled: false }), null);
});
