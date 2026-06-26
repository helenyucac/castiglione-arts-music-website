export const BRAND_COLORS = {
  red: "#D94A28",
} as const;

export const defaultSiteSettings = {
  siteName: "Castiglione",
  headerLogo: "/media/logo/castiglione-logo.png",
  enquireButtonText: "ENQUIRE",
  enquireButtonLink: "/partnerships",
  homepageHeroVideo: "/media/video-banner-dark.mov",
  homepageHeroFallbackImage:
    "https://images.unsplash.com/photo-1508973379184-7517410fb0bc?auto=format&fit=crop&w=2400&q=85",
  homepageHeroEyebrow: "Global Stories · Local Stages",
  homepageHeroHeadline: "Curating Global\nCulture and Artistry.",
  footerHeadline: "Let's create something meaningful together.",
  footerSubtext:
    "Stay connected with our latest programs, touring projects and partnership opportunities.",
  footerEmailPlaceholder: "Email address",
  footerCopyright: "© 2026 CASTIGLIONE ARTS & CULTURE",
  defaultSeoTitle: "Castiglione",
  defaultSeoDescription:
    "Castiglione is an Australia-based touring production company for anime concerts, gaming concerts, classical concerts, exhibitions, Lucid Live projects, and cultural live experiences.",
} as const;

export const defaultDesignSettings = {
  title: "Main Design Settings",
  textScale: 1,
  headingScale: 1,
  spacingScale: 1,
  themeMode: "Default",
  brandRed: BRAND_COLORS.red,
  carbon: "#111111",
  paper: "#FFFFFF",
  cream: "#F5F1EA",
  mutedText: "rgba(17,17,17,0.58)",
  customCssVariablesJson: "{}",
  enableCustomTypographyOverrides: false,
} as const;

export const siteSettings = {
  heroStats: [
    {
      value: "11",
      label: "YEARS",
    },
    {
      value: "15+",
      label: "CITIES",
    },
    {
      value: "120+",
      label: "PRODUCTIONS",
    },
  ],
} as const;

export const defaultNavigationLinks = [
  { label: "OUR STORY", url: "/about", activePath: "/about", order: 1 },
  { label: "PROGRAMS", url: "/#programs", order: 2 },
  { label: "WHAT'S ON", url: "/#whats-on", order: 3 },
  { label: "PARTNERSHIP", url: "/partnerships", activePath: "/partnerships", order: 4 },
] as const;

export const defaultFooterNavigationLinks = [
  { label: "About", url: "/about", order: 1 },
  { label: "Partnership", url: "/partnerships", order: 2 },
] as const;

export const defaultSocialLinks = [
  { platform: "Instagram", url: "https://www.instagram.com/castiglionearts", order: 1 },
  { platform: "Facebook", url: "https://www.facebook.com/castiglionearts", order: 2 },
  { platform: "TikTok", url: "https://www.tiktok.com/@castiglione_arts_culture", order: 3 },
  { platform: "YouTube", url: "https://www.youtube.com/@castiglioneartsculture9691", order: 4 },
  {
    platform: "Rednote",
    url: "https://www.xiaohongshu.com/user/profile/65a8f68f000000000803f02c?xsec_token=YBfK1VkvnwksBzBANokd5BgPPNvUrYicvMbp-SetBFbj8=&xsec_source=app_share&xhsshare=CopyLink&appuid=65a8f68f000000000803f02c&apptime=1748955266&share_id=b5785accd94c4a8882c008b5ce624c63",
    order: 5,
  },
] as const;

export const formLabels = {
  fileUploadButton: "CHOOSE FILES",
  noFileChosen: "No file chosen",
  filesSelected: "files selected",
} as const;
