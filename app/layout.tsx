import type { Metadata } from "next";

import "./globals.css";
import { inter, saansMono, sfPro } from "./fonts";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { organizationSchema, websiteSchema } from "@/lib/schema";

/**
 * Sitewide metadata. Page files override `title`/`description`/`alternates`;
 * everything below is inherited unless a page sets it explicitly.
 *
 * Images come from the App Router file conventions in this folder, so there is
 * no `images` array here to drift out of sync:
 *   app/opengraph-image.jpg (+ .alt.txt)  → og:image
 *   app/twitter-image.jpg   (+ .alt.txt)  → twitter:image
 *   app/icon.png, app/apple-icon.png, app/favicon.ico → icons
 * Case-study pages override og:image with their own hero shot.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.thezenithdigital.com"),
  title: "Wix Studio Web Design Agency | Zenith Digital",
  description:
    "Zenith Digital is a Wix Studio web design agency and Top 1% Wix Partner, serving the UK, EU, and US from Belgrade. 100+ websites shipped, from €2,500.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Zenith Digital",
    locale: "en_GB",
    url: "/",
    title: "Wix Studio Web Design Agency | Zenith Digital",
    description:
      "Wix Studio web design, migrations, and SEO from a Top 1% Wix Partner. 100+ websites shipped for businesses across the UK, EU, and US.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wix Studio Web Design Agency | Zenith Digital",
    description:
      "Wix Studio web design, migrations, and SEO from a Top 1% Wix Partner. 100+ websites shipped for businesses across the UK, EU, and US.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
