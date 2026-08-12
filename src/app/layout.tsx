import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";
import { CustomSearchDialog } from "@/components/search-dialog";
import {
  siteBrandName,
  siteDescription,
  siteHomeHref,
  siteKeywords,
  siteLanguage,
  siteLocale,
  sitePublisherName,
  siteTitle,
  siteUrl,
} from "@/lib/site-config";
import { Body } from "./layout.client";
import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  applicationName: siteBrandName,
  authors: [{ name: sitePublisherName }],
  creator: sitePublisherName,
  publisher: sitePublisherName,
  alternates: {
    canonical: siteHomeHref,
  },
  category: "technology",
  openGraph: {
    type: "website",
    locale: siteLocale,
    url: siteHomeHref,
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/assets/brand/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/assets/brand/favicon.svg"],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={siteLanguage}
      className={`font-sans font-setting`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://i02.appmifile.com/i18n/fonts/MiSansChinese/index.css"
        />
        <style>{`
          html, body, button, input, select, textarea {
            font-family: var(--font-sans) !important;
          }

          code, kbd, pre, samp {
            font-family: var(--font-mono) !important;
          }
        `}</style>
        <meta name="theme-color" content="#1781ff" />
      </head>
      <Body>
        <RootProvider
          i18n={{ locale: "zh-CN", translations: { toc: "大纲" } }}
          theme={{ disableTransitionOnChange: false }}
          search={{
            SearchDialog: CustomSearchDialog as any,
          }}
        >
          {children}
        </RootProvider>
      </Body>
    </html>
  );
}
