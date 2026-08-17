import type { Metadata } from "next";

import { LegalDoc } from "@/components/sections/LegalDoc";
import { termsOfService } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of service | Zenith Digital",
  description:
    "The terms covering use of thezenithdigital.com, what the case-study results do and do not promise, intellectual property, and liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalDoc doc={termsOfService} />;
}
