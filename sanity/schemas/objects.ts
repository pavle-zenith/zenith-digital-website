import { defineArrayMember, defineField, defineType } from "sanity";

import { BLOG_CATEGORIES, BLOG_TABLE_STATUSES } from "@/content/blog";

/**
 * The Portable Text block set. This list is closed on purpose: every entry
 * renders through a component the site already has, so a post cannot introduce
 * a treatment the rest of the site doesn't use. Adding a block here means
 * building or extracting a renderer for it, which is a conversation, not a
 * schema edit.
 */

/** Bold lead-in plus explanation. Renders through the guides' PointList. */
export const pointsList = defineType({
  name: "pointsList",
  title: "Points list",
  type: "object",
  fields: [
    defineField({
      name: "lead",
      title: "Lead-in line",
      type: "string",
      description: 'Optional. E.g. "Here is what that covers:"',
    }),
    defineField({
      name: "points",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "No trailing colon. The renderer adds it.",
            }),
            defineField({
              name: "body",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "body" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { points: "points" },
    prepare: ({ points }) => ({
      title: "Points list",
      subtitle: `${points?.length ?? 0} points`,
    }),
  },
});

/**
 * A columnar comparison table. `status` is the migration guides' four-state
 * vocabulary, so a row can carry the same chip the transfers table uses and
 * the two never drift into different words for the same fact.
 */
export const comparisonTable = defineType({
  name: "comparisonTable",
  title: "Comparison table",
  type: "object",
  fields: [
    defineField({ name: "caption", type: "string" }),
    defineField({
      name: "columns",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.required().min(2),
      description: "Header cells, left to right.",
    }),
    defineField({
      name: "rows",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "cells",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (Rule) => Rule.required().min(1),
              description: "One per column, in the same order.",
            }),
            defineField({
              name: "status",
              type: "string",
              options: {
                list: BLOG_TABLE_STATUSES.map((value) => ({
                  title: value,
                  value,
                })),
              },
              description:
                "Optional. Adds the migration-guide status chip to the row.",
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare: ({ cells }) => ({ title: cells?.[0] ?? "Row" }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "caption", rows: "rows" },
    prepare: ({ title, rows }) => ({
      title: title || "Comparison table",
      subtitle: `${rows?.length ?? 0} rows`,
    }),
  },
});

/** A contextual ask. Renders through the guides' in-body CtaBand. */
export const calloutCta = defineType({
  name: "calloutCta",
  title: "Callout CTA",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paragraph",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaHref",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: 'A path like "/book-a-call", or a full URL.',
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "ctaLabel" },
  },
});

/** Questions inside the body. The post-level `faq` field is separate. */
export const faqBlock = defineType({
  name: "faqBlock",
  title: "FAQ block",
  type: "object",
  fields: [
    defineField({
      name: "items",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "q",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "a",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "q", subtitle: "a" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "FAQ block",
      subtitle: `${items?.length ?? 0} questions`,
    }),
  },
});

export const codeBlock = defineType({
  name: "codeBlock",
  title: "Code",
  type: "object",
  fields: [
    defineField({
      name: "language",
      type: "string",
      options: {
        list: ["html", "css", "javascript", "typescript", "json", "text"].map(
          (value) => ({ title: value, value }),
        ),
      },
      initialValue: "text",
    }),
    defineField({
      name: "code",
      type: "text",
      rows: 10,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "language", subtitle: "code" },
  },
});

/** A primary source. Same three fields the migration guides use. */
export const sourceLink = defineType({
  name: "sourceLink",
  title: "Source",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "note",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
      description: "One line on what this source establishes.",
    }),
  ],
  preview: { select: { title: "label", subtitle: "note" } },
});

/** Re-exported so the post schema and the Studio config share one list. */
export const blogCategoryOptions = BLOG_CATEGORIES.map((value) => ({
  title: value,
  value,
}));
