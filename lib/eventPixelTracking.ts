export const JJK_EVENT_SLUG = "jujutsu-kaisen-in-concert";

const defaultJjkMetaPixelId = "503218076005356";
const defaultJjkTikTokPixelId = "D19P51JC77U2P4BEJ7R0";

export type EventPixelTrackingConfig = {
  slug: string;
  contentName: string;
  metaPixelId?: string;
  tikTokPixelId?: string;
};

function optionalPixelId(value?: string) {
  const normalizedValue = value?.trim();
  return normalizedValue || undefined;
}

export function getEventPixelTrackingConfig(slug?: string): EventPixelTrackingConfig | undefined {
  if (slug !== JJK_EVENT_SLUG) {
    return undefined;
  }

  return {
    slug: JJK_EVENT_SLUG,
    contentName: "Jujutsu Kaisen in Concert",
    metaPixelId: optionalPixelId(process.env.NEXT_PUBLIC_JJK_META_PIXEL_ID) ?? defaultJjkMetaPixelId,
    tikTokPixelId: optionalPixelId(process.env.NEXT_PUBLIC_JJK_TIKTOK_PIXEL_ID) ?? defaultJjkTikTokPixelId,
  };
}
