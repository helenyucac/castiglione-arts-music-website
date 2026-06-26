import { cache } from "react";
import {
  defaultDesignSettings,
  defaultFooterNavigationLinks,
  defaultNavigationLinks,
  defaultSiteSettings,
  defaultSocialLinks,
  siteSettings,
} from "@/data/siteSettings";
import { isWixConfigured } from "@/lib/wix/client";
import { getNavigationLinks, getSocialLinks } from "@/lib/wix/navigation";
import { getDesignSettings, getSiteSettings } from "@/lib/wix/siteSettings";
import type {
  NormalizedDesignSettings,
  NormalizedNavigationLink,
  NormalizedSiteSettings,
  NormalizedSocialLink,
} from "@/lib/wix/types";

export type DesignCssVariables = React.CSSProperties & Record<`--wix-${string}`, string | number>;

const localSiteSettings: NormalizedSiteSettings = {
  id: "local-site-settings",
  siteName: defaultSiteSettings.siteName,
  headerLogo: defaultSiteSettings.headerLogo,
  homepageHeroVideo: defaultSiteSettings.homepageHeroVideo,
  homepageHeroFallbackImage: defaultSiteSettings.homepageHeroFallbackImage,
  homepageHeroEyebrow: defaultSiteSettings.homepageHeroEyebrow,
  homepageHeroHeadline: defaultSiteSettings.homepageHeroHeadline,
  heroStats: [...siteSettings.heroStats],
  enquireButtonText: defaultSiteSettings.enquireButtonText,
  enquireButtonLink: defaultSiteSettings.enquireButtonLink,
  footerHeadline: defaultSiteSettings.footerHeadline,
  footerSubtext: defaultSiteSettings.footerSubtext,
  footerEmailPlaceholder: defaultSiteSettings.footerEmailPlaceholder,
  footerCopyright: defaultSiteSettings.footerCopyright,
  defaultSeoTitle: defaultSiteSettings.defaultSeoTitle,
  defaultSeoDescription: defaultSiteSettings.defaultSeoDescription,
};

const localDesignSettings: NormalizedDesignSettings = {
  id: "local-design-settings",
  ...defaultDesignSettings,
};

const localHeaderLinks: NormalizedNavigationLink[] = defaultNavigationLinks.map((item) => ({
  id: `local-header-${item.order}`,
  label: item.label,
  url: item.url,
  order: item.order,
  location: "Header",
  isVisible: true,
  openNewTab: false,
}));

const localFooterLinks: NormalizedNavigationLink[] = defaultFooterNavigationLinks.map((item) => ({
  id: `local-footer-${item.order}`,
  label: item.label,
  url: item.url,
  order: item.order,
  location: "Footer",
  isVisible: true,
  openNewTab: false,
}));

const localFooterSocialLinks: NormalizedSocialLink[] = defaultSocialLinks.map((item) => ({
  id: `local-social-${item.order}`,
  platform: item.platform,
  url: item.url,
  order: item.order,
  location: "Footer",
  isVisible: true,
  openNewTab: true,
}));

function mergeSiteSettings(cmsSettings: NormalizedSiteSettings | null) {
  if (!cmsSettings) {
    return localSiteSettings;
  }

  return {
    ...localSiteSettings,
    ...cmsSettings,
    heroStats: cmsSettings.heroStats.length > 0 ? cmsSettings.heroStats : localSiteSettings.heroStats,
  };
}

async function resolveWithFallback<T>(request: () => Promise<T | null>, fallback: T) {
  if (!isWixConfigured()) {
    return fallback;
  }

  try {
    return (await request()) ?? fallback;
  } catch {
    return fallback;
  }
}

export const getResolvedSiteSettings = cache(async () => {
  if (!isWixConfigured()) {
    return localSiteSettings;
  }

  try {
    return mergeSiteSettings(await getSiteSettings());
  } catch {
    return localSiteSettings;
  }
});

export const getResolvedDesignSettings = cache(async () =>
  resolveWithFallback(getDesignSettings, localDesignSettings),
);

export const getResolvedHeaderNavigationLinks = cache(async () => {
  if (!isWixConfigured()) {
    return localHeaderLinks;
  }

  try {
    const links = await getNavigationLinks();
    const headerLinks = links.filter((item) =>
      ["Header", "Header/Mobile"].includes(item.location),
    );

    return headerLinks.length > 0 ? headerLinks : localHeaderLinks;
  } catch {
    return localHeaderLinks;
  }
});

export const getResolvedFooterNavigationLinks = cache(async () => {
  if (!isWixConfigured()) {
    return localFooterLinks;
  }

  try {
    const links = await getNavigationLinks("Footer");
    return links.length > 0 ? links : localFooterLinks;
  } catch {
    return localFooterLinks;
  }
});

export const getResolvedFooterSocialLinks = cache(async () => {
  if (!isWixConfigured()) {
    return localFooterSocialLinks;
  }

  try {
    const links = await getSocialLinks("Footer");
    return links.length > 0 ? links : localFooterSocialLinks;
  } catch {
    return localFooterSocialLinks;
  }
});

export function designSettingsToCssVariables(
  settings: NormalizedDesignSettings,
): DesignCssVariables {
  return {
    "--wix-text-scale": settings.textScale,
    "--wix-heading-scale": settings.headingScale,
    "--wix-spacing-scale": settings.spacingScale,
    "--wix-theme-mode": settings.themeMode,
    "--wix-brand-red": settings.brandRed,
    "--wix-carbon": settings.carbon,
    "--wix-paper": settings.paper,
    "--wix-cream": settings.cream,
    "--wix-muted-text": settings.mutedText,
  };
}
