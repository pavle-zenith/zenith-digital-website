import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PostHero } from "@/components/sections/blog/PostHero";
import { PostMeta } from "@/components/sections/blog/PostMeta";
import { PostBody } from "@/components/sections/blog/PostBody";
import { PostAudit } from "@/components/sections/blog/PostAudit";
import { PostRelated } from "@/components/sections/blog/PostRelated";
import { SourcesGrid } from "@/components/sections/SourcesGrid";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { post as furniture } from "@/content/blog";
import { blogOgImage } from "@/content/blog-covers";
import { headingAnchors } from "@/lib/blog";
import { ORG_ID, PERSON_ID, SITE, personSchema } from "@/lib/schema";
import { sanityFetch, sanityFetchSafe } from "@/sanity/lib/client";
import {
  postQuery,
  postSlugsQuery,
  relatedFallbackQuery,
} from "@/sanity/lib/queries";
import type { Post, PostCard, PostSitemapEntry } from "@/sanity/lib/types";

/**
 * Only published slugs get routes, matching every other templated route on the
 * site. Note the consequence: a post published in Sanity after the last build
 * needs a deploy before its URL resolves. Edits to an existing post go live on
 * the publish webhook; a brand new slug needs the build. Flip this to `true`
 * if the owner wants new posts live without a deploy.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await sanityFetchSafe<PostSitemapEntry[]>(postSlugsQuery, []);
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await sanityFetch<Post | null>(postQuery, { slug });
  if (!data) return {};

  const title = data.seo?.title ?? `${data.title} | Zenith Digital`;
  const description = data.seo?.description ?? data.excerpt;
  // Cover art ships with the repo (content/blog-covers.ts), so the share
  // image is a static file, not a Sanity asset.
  const ogImage = blogOgImage(data.slug);

  return {
    title,
    description,
    alternates: { canonical: `/blog/${data.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${data.slug}`,
      title,
      description,
      publishedTime: data.publishedAt,
      ...(data.lastVerified ? { modifiedTime: data.lastVerified } : {}),
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const data = await sanityFetch<Post | null>(postQuery, { slug });
  if (!data) notFound();

  // Authored `related` wins. The fallback only runs when the post names none,
  // so an editor's choice is never overridden by the heuristic.
  const related =
    data.related && data.related.length > 0
      ? data.related
      : await sanityFetch<PostCard[]>(relatedFallbackQuery, {
          slug: data.slug,
          category: data.category,
        });

  const { sections } = headingAnchors(data.body);
  const url = `${SITE}/blog/${data.slug}`;
  const hasFaq = Boolean(data.faq && data.faq.length > 0);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.excerpt,
    datePublished: data.publishedAt,
    // `lastVerified` is the honest modified date: it is the day a human
    // re-checked the claims, which is what dateModified is asking about.
    dateModified: data.lastVerified ?? data.publishedAt,
    // The visible byline names the founder, so the markup names him too: a
    // byline and its author markup disagreeing is exactly what Google's
    // guidance on bylines asks you to avoid. The Person node is emitted on
    // this page (below), so the @id resolves here rather than pointing at
    // something that only exists on /about.
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: url,
    articleSection: data.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: furniture.breadcrumbLabel,
        item: `${SITE}/blog`,
      },
      { "@type": "ListItem", position: 3, name: data.title, item: url },
    ],
  };

  // FAQPage only when the questions actually render on the page. Marking up
  // answers a visitor cannot see is the exact thing the guideline forbids.
  const faqSchema = hasFaq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.faq!.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      {/* The author node BlogPosting.author points at. */}
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}

      <PostHero data={data} />
      {/* The byline as a facts strip, the same object the case studies use.
          It sits between the hero and the article so the title gets the full
          frame and the facts get their own band. */}
      <PostMeta data={data} />
      {/* The post's own H2 anchors feed the chapters column beside the body.
          A post replaces the guides' sticky top rail with that column: the
          rail is sized for a guide's eight fixed sections, and a post's
          chapters vary in count and label length per document, which is what a
          vertical list handles and an equal-width rail does not. */}
      <PostBody post={data} chapters={sections} />

      {/* The main ask sits ABOVE the FAQ (owner decision, 20 August 2026).
          The questions are objection handling: a reader still working through
          them has not decided, and a reader who has decided should not have to
          scroll past eight of them to find the button. */}
      <CtaBanner data={furniture.cta} />

      {/* The chapters column ends with the body it sits beside, so nothing has
          to retire here. The id stays as a stable anchor for the FAQ. */}
      {hasFaq ? (
        <div id="faq">
          <Faq
            data={{
              heading: furniture.faq.heading,
              subhead: furniture.faq.subhead,
              ctas: furniture.faq.ctas,
              items: data.faq!,
            }}
          />
        </div>
      ) : null}

      <PostAudit />
      <PostRelated posts={related} />

      {/* Sources close the page, below the asks. They are the citability moat
          rather than part of the read: a visitor who wants them is checking
          the article, and a visitor who does not should meet the CTA first.
          Putting them mid-page pushed the conversion furniture below a wall of
          links nobody was scrolling past. */}
      {data.sources && data.sources.length > 0 ? (
        <SourcesGrid
          heading={furniture.sources.heading}
          intro={furniture.sources.intro}
          items={data.sources}
        />
      ) : null}
    </>
  );
}
