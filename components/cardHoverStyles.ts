import type { CSSProperties } from "react";
import { BRAND_COLORS } from "@/data/siteSettings";

export const cardTitleHoverClassName =
  "transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-[var(--card-title-hover-color)] group-focus-visible:text-[var(--card-title-hover-color)] group-active:text-[var(--card-title-hover-color)]";

export const cardTitleHoverStyle = {
  "--card-title-hover-color": BRAND_COLORS.red,
} as CSSProperties & Record<"--card-title-hover-color", string>;
