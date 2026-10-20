import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeController } from "@/components/theme/theme-controller";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { themeScript } from "@/components/theme/theme-script";
import { introScript } from "@/components/sections/intro-script";
import { getSiteMetadata } from "@/lib/seo/site";
import { getPersonSchema, getWebSiteSchema } from "@/lib/seo/schema";
import { getPortfolioVersions } from "@/lib/portfolio-versions";
import "./globals.css";

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return getSiteMetadata();
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [versions, personSchema, webSiteSchema] = await Promise.all([
    getPortfolioVersions(),
    getPersonSchema(),
    getWebSiteSchema(),
  ]);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        {/* Loaded from the CDN because the npm copy starts with a BOM that
            Turbopack's CSS parser rejects. Pinned version; not an npm dependency. */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/devicon@2.17.0/devicon.min.css"
        />
        <JsonLd data={[personSchema, webSiteSchema]} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-S40VKYM5G7" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S40VKYM5G7');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Footer />
        <ThemeController versions={versions} />
        <Analytics />
      </body>
    </html>
  );
}
