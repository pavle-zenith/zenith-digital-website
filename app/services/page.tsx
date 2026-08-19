import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui/Section";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { logos } from "@/content/home";
import { sFaq, sFinalCta, sServices } from "@/content/services";

export const metadata: Metadata = {
  title: "Wix Studio Design, Migration & SEO | Zenith Digital",
  description:
    "Wix Studio web design, migrations with zero ranking loss, landing pages, SEO and AEO, and white-label production. Fixed prices from €1,750.",
  alternates: { canonical: "/services" },
};

const SITE = "https://www.thezenithdigital.com";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: `${SITE}/services`,
    },
  ],
};

const serviceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: sServices.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.when,
      url: `${SITE}/services#${s.id}`,
      provider: { "@type": "Organization", name: "Zenith Digital" },
      areaServed: ["United Kingdom", "European Union", "United States"],
    },
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: sFaq.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceListSchema} />
      <JsonLd data={faqSchema} />

      <ServicesHero />

      {/* Logo strip — proof before pitch */}
      <Section tone="light" divide={false} frameClassName="!py-0">
        <LogoMarquee logos={logos.items} caption={logos.caption} />
      </Section>

      {/* The six service sections, alternating light/dark */}
      {sServices.map((s, i) => (
        <ServiceSection key={s.id} data={s} index={i} />
      ))}

      <Process />
      <Testimonials />
      <Faq data={sFaq} />
      <CtaBanner data={sFinalCta} />
    </>
  );
}
