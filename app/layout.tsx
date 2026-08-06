import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeController } from "@/components/theme/theme-controller";
import { themeScript } from "@/components/theme/theme-script";
import { siteMetadata } from "@/lib/seo/site";
import { getPersonSchema } from "@/lib/seo/schema";
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

export const metadata: Metadata = siteMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const versions = await getPortfolioVersions();
  const personSchema = await getPersonSchema();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/devicon@2.15.1/devicon.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <ThemeController versions={versions} />
      </body>
    </html>
  );
}
