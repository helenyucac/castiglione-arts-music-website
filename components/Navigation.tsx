import {
  getResolvedHeaderNavigationLinks,
  getResolvedSiteSettings,
} from "@/lib/wix/globalConfig";
import { NavigationClient, type NavigationClientLink } from "@/components/NavigationClient";

function toActivePath(href: string) {
  if (!href.startsWith("/") || href.includes("#")) {
    return undefined;
  }

  return href === "/" ? "/" : href;
}

export async function Navigation() {
  const [siteSettings, navigationLinks] = await Promise.all([
    getResolvedSiteSettings(),
    getResolvedHeaderNavigationLinks(),
  ]);
  const enquireButtonText = siteSettings.enquireButtonText ?? "ENQUIRE";
  const enquireButtonHref = siteSettings.enquireButtonLink ?? "/partnerships";

  const navItems: NavigationClientLink[] = navigationLinks
    .filter((item) => {
      const isDuplicateEnquire =
        item.label.trim().toLowerCase() === enquireButtonText.trim().toLowerCase() &&
        item.url === enquireButtonHref;

      return !isDuplicateEnquire;
    })
    .map((item) => ({
      id: item.id,
      label: item.label,
      href: item.url,
      activePath: toActivePath(item.url),
      openNewTab: item.openNewTab,
    }));

  return (
    <NavigationClient
      logoSrc={siteSettings.headerLogo ?? "/media/logo/castiglione-logo.png"}
      siteName={siteSettings.siteName}
      enquireButtonText={enquireButtonText}
      enquireButtonHref={enquireButtonHref}
      navItems={navItems}
    />
  );
}
