import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { GuideNav } from "@/components/sections/migration/GuideNav";
import { PostHero } from "@/components/sections/blog/PostHero";
import { PostBody } from "@/components/sections/blog/PostBody";
import { PostAudit } from "@/components/sections/blog/PostAudit";
import { PostRelated } from "@/components/sections/blog/PostRelated";
import { SourcesGrid } from "@/components/sections/SourcesGrid";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { post as furniture } from "@/content/blog";
import { headingAnchors, NAV_MIN_SECTIONS } from "@/lib/blog";
import { ORG_ID, SITE } from "@/lib/schema";
import { sanityFetch } from "@/sanity/lib/client";
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
  const posts = await sanityFetch<PostSitemapEntry[]>(postSlugsQuery);
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await sanityFetch<Post | null>(postQuery, { slug });
  if (!data) return {};

  const title = data.seo?.title ?? `${data.title} | Zenith Digital`;
  const description = data.seo?.description ?? data.excerpt;

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
    },
    twitter: { card: "summary_large_image", title, description },
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
    // Author is the agency, never a person: there is no author document type,
    // and `reviewedBy` names the human in the visible byline instead.
    author: { "@id": ORG_ID },
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
      <JsonLd data={breadcrumbSchema} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}

      {/* The guides' navigator, fed by the post's own H2 anchors. Short posts
          skip it: a sticky bar over two sections is a bar, not orientation. */}
      {sections.length >= NAV_MIN_SECTIONS ? (
        <GuideNav items={sections} />
      ) : null}

      <PostHero data={data} />
      <PostBody post={data} />

      {data.sources && data.sources.length > 0 ? (
        <SourcesGrid
          heading={furniture.sources.heading}
          intro={furniture.sources.intro}
          items={data.sources}
        />
      ) : null}

      {/* id="faq" is what tells GuideNav to retire: everything below this is
          conversion furniture rather than reading. */}
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
      <CtaBanner data={furniture.cta} />
    </>
  );
}
