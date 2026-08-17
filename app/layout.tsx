import type { Metadata } from "next";

import "./globals.css";
import { inter, saansMono, sfPro } from "./fonts";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thezenithdigital.com"),
  title: "Zenith Digital | Wix Studio Agency",
  description:
    "Zenith Digital is a Wix Studio web design agency based in Belgrade, serving the UK, EU, and US.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sfPro.variable} ${saansMono.variable} ${inter.variable}`}
    >
      <body>
        {/* Sitewide entity graph — one Organization and one WebSite node for
            the whole site, so page-level schema only adds what's page-specific. */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
