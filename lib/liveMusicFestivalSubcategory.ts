import type { TourCategory, TourProgram } from "@/data/tours";

export type LiveMusicFestivalSubcategory = "lucid-live" | "music-festivals";
export type ProgramCategoryKey =
  | "anime-gaming-concerts"
  | "classical-concerts-theatre"
  | LiveMusicFestivalSubcategory;

const festivalEventTitles = new Set([
  normalizeComparableTitle("Oddshapes Music Festival"),
  normalizeComparableTitle("Sonica Music Festival"),
]);

function normalizeToken(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function normalizeProgramCategoryToken(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeComparableTitle(value: string) {
  return normalizeToken(value)
    .replace(/\s*-\s*/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeLiveMusicFestivalSubcategoryValue(
  value: unknown,
): LiveMusicFestivalSubcategory | null {
  const category = normalizeProgramCategoryValue(value);

  if (category === "lucid-live" || category === "music-festivals") {
    return category;
  }

  return null;
}

export function normalizeProgramCategoryValue(value: unknown): ProgramCategoryKey | null {
  if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
    return null;
  }

  const normalizedValue = normalizeProgramCategoryToken(String(value));

  const categoryAliases: Record<string, ProgramCategoryKey> = {
    "anime-and-gaming-concerts": "anime-gaming-concerts",
    "anime-gaming-concerts": "anime-gaming-concerts",
    "classical-concert-and-theatre": "classical-concerts-theatre",
    "classical-concert-theatre": "classical-concerts-theatre",
    "classical-concerts-and-theatre": "classical-concerts-theatre",
    "classical-concerts-theatre": "classical-concerts-theatre",
    lucid: "lucid-live",
    "lucid-live": "lucid-live",
    "music-festival": "music-festivals",
    "music-festivals": "music-festivals",
  };

  return categoryAliases[normalizedValue] ?? null;
}

export function isMusicFestivalEventTitle(title: unknown) {
  if (typeof title !== "string") {
    return false;
  }

  return festivalEventTitles.has(normalizeComparableTitle(title));
}

export function resolveLiveMusicFestivalSubcategory(
  title: unknown,
  subcategoryCandidates: unknown[] = [],
): LiveMusicFestivalSubcategory {
  const explicitSubcategory = firstProgramCategoryForProgram(
    "live-music-festival",
    subcategoryCandidates,
  );

  if (explicitSubcategory === "lucid-live" || explicitSubcategory === "music-festivals") {
    return explicitSubcategory;
  }

  if (isMusicFestivalEventTitle(title)) {
    return "music-festivals";
  }

  return "lucid-live";
}

export function liveMusicFestivalSubcategoryToTourCategory(
  subcategory: LiveMusicFestivalSubcategory,
): TourCategory {
  return subcategory === "music-festivals" ? "music-festival" : "lucid";
}

function isConcertProgram(program: TourProgram | null) {
  return program === "anime-gaming-concerts" || program === "classical-concert-theatre";
}

export function isProgramCategoryAllowedForProgram(
  program: TourProgram | null,
  category: ProgramCategoryKey,
) {
  if (program === "live-music-festival") {
    return category === "lucid-live" || category === "music-festivals";
  }

  if (isConcertProgram(program)) {
    return category === "anime-gaming-concerts" || category === "classical-concerts-theatre";
  }

  return false;
}

export function firstProgramCategoryForProgram(
  program: TourProgram | null,
  candidates: unknown[] = [],
): ProgramCategoryKey | null {
  for (const candidate of candidates) {
    const category = normalizeProgramCategoryValue(candidate);

    if (category && isProgramCategoryAllowedForProgram(program, category)) {
      return category;
    }
  }

  return null;
}

export function programCategoryToTourCategory(category: ProgramCategoryKey): TourCategory {
  if (category === "classical-concerts-theatre") {
    return "classical-recital";
  }

  if (category === "lucid-live") {
    return "lucid";
  }

  if (category === "music-festivals") {
    return "music-festival";
  }

  return "anime-concert";
}
