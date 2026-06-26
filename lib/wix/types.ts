import type { EventGalleryImage, EventTourDate } from "@/data/eventDetails";
import type {
  TourCardData,
  TourCategory,
  TourProgram,
  TourStatus,
  TourTicketLink,
} from "@/data/tours";

export type WixCollectionName =
  | "SiteSettings"
  | "DesignSettings"
  | "Programs"
  | "Events"
  | "TourDates"
  | "EventVideos"
  | "EventGallery"
  | "SocialLinks"
  | "NavigationLinks"
  | "Partners"
  | "Venues"
  | "Testimonials";

export type WixRecordFields = Record<string, unknown>;

export type WixCollectionItem<TFields extends WixRecordFields = WixRecordFields> = {
  _id?: string;
  id?: string;
  data?: TFields;
  fieldData?: TFields;
} & TFields;

export type WixQuerySort = {
  fieldName: string;
  order: "ASC" | "DESC";
};

export type WixQueryOptions = {
  filter?: WixRecordFields;
  sort?: WixQuerySort[];
  limit?: number;
  skip?: number;
};

export type WixQueryResponse<TFields extends WixRecordFields = WixRecordFields> = {
  items?: WixCollectionItem<TFields>[];
  dataItems?: WixCollectionItem<TFields>[];
};

export type NavigationLocation = "Header" | "Mobile" | "Footer" | "Header/Mobile";
export type SocialLocation = "Header" | "Hero" | "Footer";

export type NormalizedHeroStat = {
  value: string;
  label: string;
};

export type NormalizedSiteSettings = {
  id: string;
  siteName: string;
  headerLogo?: string;
  footerLogo?: string;
  homepageHeroVideo?: string;
  homepageHeroFallbackImage?: string;
  homepageHeroEyebrow?: string;
  homepageHeroHeadline?: string;
  heroStats: NormalizedHeroStat[];
  enquireButtonText?: string;
  enquireButtonLink?: string;
  footerHeadline?: string;
  footerSubtext?: string;
  footerEmailPlaceholder?: string;
  footerCopyright?: string;
  contactEmail?: string;
  contactPhone?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
};

export type NormalizedDesignSettings = {
  id: string;
  title: string;
  textScale: number;
  headingScale: number;
  spacingScale: number;
  themeMode: "Default" | "Compact" | "Large" | string;
  brandRed: string;
  carbon: string;
  paper: string;
  cream: string;
  mutedText: string;
  customCssVariablesJson: string;
  enableCustomTypographyOverrides: boolean;
};

export type NormalizedProgram = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  heroImage?: string;
  order: number;
  isVisible: boolean;
};

export type NormalizedNavigationLink = {
  id: string;
  label: string;
  url: string;
  order: number;
  location: string;
  isVisible: boolean;
  openNewTab: boolean;
};

export type NormalizedSocialLink = {
  id: string;
  platform: string;
  icon?: string;
  url: string;
  order: number;
  location: string;
  isVisible: boolean;
  openNewTab: boolean;
};

export type NormalizedEvent = TourCardData & {
  slug: string;
  program: TourProgram | null;
  programLabel: string;
  categoryLabel: string;
  sortDate: string;
  isFeaturedHome: boolean;
  isFeaturedProgram: boolean;
  isVisible: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

export type NormalizedTourDate = EventTourDate & {
  id: string;
  event: string;
  showLabel: string;
  displayDate: string;
  time?: string;
  country?: string;
  ticketStatus?: string;
  order: number;
  isVisible: boolean;
};

export type NormalizedEventVideo = {
  id: string;
  event: string;
  title: string;
  src?: string;
  videoUrl?: string;
  posterImage?: string;
  videoType?: string;
  caption?: string;
  order: number;
  isVisible: boolean;
};

export type NormalizedEventGalleryImage = EventGalleryImage & {
  id: string;
  event: string;
  credit?: string;
  order: number;
  isVisible: boolean;
};

export type NormalizedPartner = {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  type?: string;
  order: number;
  isVisible: boolean;
};

export type NormalizedVenue = {
  id: string;
  venueName: string;
  city?: string;
  country?: string;
  address?: string;
  website?: string;
  mapUrl?: string;
  isVisible: boolean;
};

export type NormalizedTestimonial = {
  id: string;
  quote: string;
  name: string;
  title?: string;
  company?: string;
  logo?: string;
  portraitImage?: string;
  relatedEvent?: string;
  relatedPartner?: string;
  order: number;
  isVisible: boolean;
};

export type NormalizedEventSeed = {
  id: string;
  title: string;
  slug: string;
  category: TourCategory;
  program: TourProgram | null;
  status: TourStatus;
  image: string;
  date: string;
  dateLabel: string;
  cities: string[];
  ticketLinks?: TourTicketLink[];
};
