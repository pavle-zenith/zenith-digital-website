/**
 * Spam screening tests. Run with `npm test`.
 *
 * Two lists: submissions shaped like the spam that arrives, and real-looking
 * enquiries that must pass. The second list is the important one: each entry
 * is a false positive this check was written to avoid.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { MIN_FILL_MS, spamReason } from "./spam.ts";

const NOW = Date.UTC(2026, 10, 16, 12, 0);
const OPENED = String(NOW - 60_000);

const check = ({ text = [], names = [], sites = [], openedAt = OPENED } = {}) =>
  spamReason({ text, names, sites, openedAt, now: NOW });

test("real enquiries pass", () => {
  const real = [
    { names: ["Tom Hale"], text: ["We're a plumbing company in Essex (essexplumbing.co.uk) and need a new Wix site."] },
    { names: ["Sussex Garden Rooms"], sites: ["https://www.sussexgardenrooms.co.uk"] },
    { names: ["Middlesex Dental"], sites: ["https://middlesexdental.com"] },
    { text: ["We like site-a.com and site-b.com. Could you do something similar? Analytics matter to us."] },
    { text: ["Two references: https://www.stripe.com and https://linear.app."] },
    { text: ["Moving from Next.js and WordPress to Wix Studio, with Google Analytics and GTM."] },
    { text: ["Здраво, треба нам нови сајт за наш ресторан у Београду."] },
    { text: ["We run a sexual health clinic and need online booking."] },
    { names: ["Acme.io", "Jane Doe"], text: ["White-label builds for our clients."] },
    { text: ["Reach me at jane@acme-escrow.com, or on the number below."] },
  ];
  for (const r of real) assert.equal(check(r), null, JSON.stringify(r));
});

test("adult words and links", () => {
  assert.equal(check({ text: ["Hot girls in your area want to meet you"] }), "adult-content");
  assert.equal(check({ text: ["Best free porn videos here"] }), "adult-content");
  assert.equal(check({ text: ["Порно видео бесплатно"] }), "adult-content");
  assert.equal(check({ text: ["Check this out https://sexdating-xyz.top/?u=123"] }), "adult-link");
  assert.equal(check({ text: ["see hotnudes.club/join"] }), "adult-link");
  assert.equal(check({ sites: ["https://www.xvideos-mirror.com"] }), "adult-link");
});

test("shorteners, Telegram and markup", () => {
  assert.equal(check({ text: ["Details: bit.ly/3abcXYZ"] }), "shortened-link");
  assert.equal(check({ text: ["Write me https://t.me/somebody"] }), "shortened-link");
  assert.equal(check({ text: ["[url=https://example.com]click[/url]"] }), "markup");
  assert.equal(check({ text: ['<a href="https://example.com">click</a>'] }), "markup");
});

test("links where a name goes", () => {
  assert.equal(check({ names: ["https://cheap-seo.example"] }), "link-in-name");
  assert.equal(check({ names: ["Visit www.example.com"] }), "link-in-name");
});

test("three or more links in the message", () => {
  assert.equal(
    check({ text: ["https://a.example https://b.example https://c.example"] }),
    "many-links",
  );
});

test("timing: missing, too fast, fine", () => {
  assert.equal(check({ openedAt: null }), "no-timestamp");
  assert.equal(check({ openedAt: "" }), "no-timestamp");
  assert.equal(check({ openedAt: "abc" }), "no-timestamp");
  assert.equal(check({ openedAt: String(NOW - 1000) }), "too-fast");
  assert.equal(check({ openedAt: String(NOW - MIN_FILL_MS) }), null);
});

test("the check is stateless across calls", () => {
  for (let i = 0; i < 3; i++) {
    assert.equal(check({ names: ["www.example.com"] }), "link-in-name");
    assert.equal(check({ names: ["Jane"] }), null);
  }
});
