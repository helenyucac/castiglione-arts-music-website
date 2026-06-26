import { getFirstWixItem } from "@/lib/wix/client";
import { normalizeDesignSettings, normalizeSiteSettings } from "@/lib/wix/normalizers";

export async function getSiteSettings() {
  const item = await getFirstWixItem("SiteSettings");

  return item ? normalizeSiteSettings(item) : null;
}

export async function getDesignSettings() {
  const item = await getFirstWixItem("DesignSettings");

  return item ? normalizeDesignSettings(item) : null;
}
