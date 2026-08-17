import type { Metadata } from "next";

import { LegalDoc } from "@/components/sections/LegalDoc";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy policy | Zenith Digital",
  description:
    "What thezenithdigital.com collects, why, who processes it, and how to have it deleted. No analytics cookies until you accept them.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalDoc doc={privacyPolicy} />;
}
