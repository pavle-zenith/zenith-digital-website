import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { inter, saansMono, sfPro } from "./fonts";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/analytics/Analytics";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
      {/* Google Consent Mode v2 defaults. Must run before the GA tag, hence
          beforeInteractive: until the visitor accepts, GA sends cookieless
          pings and stores nothing. Ad storage stays denied outright, since the
          site runs no ad products. */}
      <Script id="consent-defaults" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`}
      </Script>

      <body>
        {/* Sitewide entity graph — one Organization and one WebSite node for
            the whole site, so page-level schema only adds what's page-specific. */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <Nav />
        <main>{children}</main>
        <Footer />
        {/* Consent banner + route-change page views. */}
        <Analytics />
      </body>
      {/* Loaded unconditionally: Consent Mode above decides what it may
          store. Absent env var means no tag at all (local/preview). */}
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </html>
  );
}
