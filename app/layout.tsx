import type { Metadata } from "next";
import "./globals.css";
import "./site.css";
import {
  designSettingsToCssVariables,
  getResolvedDesignSettings,
  getResolvedSiteSettings,
} from "@/lib/wix/globalConfig";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getResolvedSiteSettings();
  const title = siteSettings.defaultSeoTitle ?? siteSettings.siteName;
  const description = siteSettings.defaultSeoDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: siteSettings.siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const designSettings = await getResolvedDesignSettings();

  return (
    <html lang="en">
      <body style={designSettingsToCssVariables(designSettings)}>{children}</body>
    </html>
  );
}
