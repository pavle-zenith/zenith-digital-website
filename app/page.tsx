import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Services } from "@/components/sections/Services";
import { VideoTestimonials } from "@/components/sections/VideoTestimonials";
import { CrossIndustry } from "@/components/sections/CrossIndustry";
import { Industries } from "@/components/sections/Industries";
import { Pricing } from "@/components/sections/Pricing";
import { Included } from "@/components/sections/Included";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { caseStudiesCta, faqSection, finalCta } from "@/content/home";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqSection.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Hero />
      <Services />
      <VideoTestimonials />
      <CaseStudies />
      <CtaBanner data={caseStudiesCta} />
      <CrossIndustry />
      <Industries />
      <Pricing />
      <Included />
      <Process />
      <CtaBanner data={finalCta} />
      <Faq />
    </>
  );
}
