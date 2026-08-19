import { defineArrayMember, defineField, defineType } from "sanity";

import { blogCategoryOptions } from "./objects";

/**
 * `post` is the only document type on this project, and that is the whole
 * design. Migration guides, service pages, case studies, home, about and
 * partnerships stay in `content/*.ts`: they change rarely, they are dense
 * typed structures, and the compiler catches real errors in them. Posts change
 * weekly, are mostly prose, and need publishing without a deploy. Sanity earns
 * its place for exactly that one job (owner decision, 19 August 2026).
 *
 * There is no `author` type. The author is always Zenith Digital; `reviewedBy`
 * names the human who checked it. There is no hero image field either: the
 * index is text-led and posts open on type, so images belong inside `body`
 * where they have to earn the space.
 */
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Meta" },
    { name: "extras", title: "Sources, FAQ, related" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "One or two sentences. Used on the index cards and as the meta description when SEO description is empty.",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "category",
      type: "string",
      group: "content",
      options: { list: blogCategoryOptions, layout: "dropdown" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastVerified",
      type: "date",
      group: "meta",
      description:
        'Drives the "Last verified 19 August 2026" line under the title.',
    }),
    defineField({
      name: "reviewedBy",
      type: "string",
      group: "meta",
      initialValue: "Pavle Maodus, Wix Legend Partner",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      group: "meta",
      initialValue: false,
      description:
        "One featured post leads the index. If several are ticked, the most recent wins.",
    }),

    defineField({
      name: "body",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          type: "block",
          // The closed block set. H1 is absent because the post title is the
          // page's only H1; H4 and below are absent because a post that needs
          // four heading levels needs an edit, not a deeper outline.
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bulleted", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: "pointsList" }),
        defineArrayMember({ type: "comparisonTable" }),
        defineArrayMember({ type: "calloutCta" }),
        defineArrayMember({ type: "faqBlock" }),
        defineArrayMember({ type: "codeBlock" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
              validation: (Rule) => Rule.required(),
              description: "What the image shows. Required, not optional.",
            }),
            defineField({ name: "caption", type: "string" }),
          ],
        }),
      ],
    }),

    defineField({
      name: "sources",
      type: "array",
      group: "extras",
      of: [defineArrayMember({ type: "sourceLink" })],
      description:
        "Primary documentation behind the claims. This is what makes a post citable rather than assertable.",
    }),
    defineField({
      name: "faq",
      type: "array",
      group: "extras",
      validation: (Rule) => Rule.max(8),
      description:
        "4 to 8 questions. These render visibly and emit FAQPage markup; do not add questions the post does not answer.",
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
    defineField({
      name: "related",
      type: "array",
      group: "extras",
      validation: (Rule) => Rule.max(3),
      description:
        "Up to 3. Leave empty and the template falls back to recent posts in the same category.",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "post" }] }),
      ],
    }),

    defineField({
      name: "seo",
      type: "object",
      group: "meta",
      description: "Optional. Falls back to the title and excerpt.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "title",
          type: "string",
          validation: (Rule) => Rule.max(70),
        }),
        defineField({
          name: "description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(180),
        }),
      ],
    }),
  ],

  orderings: [
    {
      title: "Published, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],

  preview: {
    select: { title: "title", category: "category", date: "publishedAt" },
    prepare: ({ title, category, date }) => ({
      title,
      subtitle: [category, date ? date.slice(0, 10) : "no date"]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
