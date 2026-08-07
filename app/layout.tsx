import type { Metadata } from "next";

import "./globals.css";
import { inter, saansMono, sfPro } from "./fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
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
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
