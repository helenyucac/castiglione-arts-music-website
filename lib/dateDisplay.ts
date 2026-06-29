const monthAbbreviations = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const monthIndexes = new Map(
  monthAbbreviations.map((month, index) => [month, index]),
);

type ParsedPublicDate = {
  day?: number;
  month: number;
  year: number;
};

function cleanDateText(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*\d{1,2}(?::\d{2})?\s*(?:AM|PM)?$/i, "");
}

function toMonthIndex(value: string) {
  return monthIndexes.get(value.slice(0, 3).toUpperCase());
}

function parseIsoDate(value: string): ParsedPublicDate | null {
  const match = value.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  const monthIndex = Number(month) - 1;

  if (monthIndex < 0 || monthIndex > 11) {
    return null;
  }

  return {
    day: day ? Number(day) : undefined,
    month: monthIndex,
    year: Number(year),
  };
}

function parseNamedDate(value: string): ParsedPublicDate | null {
  const dateMatch = value.match(/^(\d{1,2})\s+([A-Z]{3,9})\s+(\d{4})$/i);

  if (dateMatch) {
    const [, day, month, year] = dateMatch;
    const monthIndex = toMonthIndex(month);

    if (monthIndex === undefined) {
      return null;
    }

    return {
      day: Number(day),
      month: monthIndex,
      year: Number(year),
    };
  }

  const monthMatch = value.match(/^([A-Z]{3,9})\s+(\d{4})$/i);

  if (monthMatch) {
    const [, month, year] = monthMatch;
    const monthIndex = toMonthIndex(month);

    if (monthIndex === undefined) {
      return null;
    }

    return {
      month: monthIndex,
      year: Number(year),
    };
  }

  return null;
}

function parsePublicDate(value: string): ParsedPublicDate | null {
  const text = cleanDateText(value);
  return parseIsoDate(text) ?? parseNamedDate(text);
}

function padDay(day: number) {
  return String(day).padStart(2, "0");
}

function formatSingleDate(date: ParsedPublicDate) {
  const month = monthAbbreviations[date.month];

  if (!month) {
    return "";
  }

  if (date.day === undefined) {
    return `${month} ${date.year}`;
  }

  return `${padDay(date.day)} ${month} ${date.year}`;
}

function formatDateRange(start: ParsedPublicDate, end: ParsedPublicDate) {
  if (
    start.day === undefined ||
    end.day === undefined ||
    (start.day === end.day && start.month === end.month && start.year === end.year)
  ) {
    return formatSingleDate(start);
  }

  const startMonth = monthAbbreviations[start.month];
  const endMonth = monthAbbreviations[end.month];

  if (!startMonth || !endMonth) {
    return "";
  }

  if (start.month === end.month && start.year === end.year) {
    return `${padDay(start.day)}–${padDay(end.day)} ${startMonth} ${start.year}`;
  }

  if (start.year === end.year) {
    return `${padDay(start.day)} ${startMonth}–${padDay(end.day)} ${endMonth} ${start.year}`;
  }

  return `${padDay(start.day)} ${startMonth} ${start.year}–${padDay(end.day)} ${endMonth} ${end.year}`;
}

function getDateTimestamp(date: ParsedPublicDate) {
  return new Date(date.year, date.month, date.day ?? 1).getTime();
}

function parseCompactSameMonthRange(value: string) {
  const match = cleanDateText(value).match(/^(\d{1,2})\s*[-–—]\s*(\d{1,2})\s+([A-Z]{3,9})\s+(\d{4})$/i);

  if (!match) {
    return null;
  }

  const [, startDay, endDay, month, year] = match;
  const monthIndex = toMonthIndex(month);

  if (monthIndex === undefined) {
    return null;
  }

  return formatDateRange(
    { day: Number(startDay), month: monthIndex, year: Number(year) },
    { day: Number(endDay), month: monthIndex, year: Number(year) },
  );
}

function parseCompactCrossMonthRange(value: string) {
  const match = cleanDateText(value).match(
    /^(\d{1,2})\s+([A-Z]{3,9})\s*[-–—]\s*(\d{1,2})\s+([A-Z]{3,9})\s+(\d{4})$/i,
  );

  if (!match) {
    return null;
  }

  const [, startDay, startMonth, endDay, endMonth, year] = match;
  const startMonthIndex = toMonthIndex(startMonth);
  const endMonthIndex = toMonthIndex(endMonth);

  if (startMonthIndex === undefined || endMonthIndex === undefined) {
    return null;
  }

  return formatDateRange(
    { day: Number(startDay), month: startMonthIndex, year: Number(year) },
    { day: Number(endDay), month: endMonthIndex, year: Number(year) },
  );
}

function parseMonthOnlyRange(value: string) {
  const sameYearMatch = cleanDateText(value).match(/^([A-Z]{3,9})\s*(?:\/|[-–—])\s*([A-Z]{3,9})\s+(\d{4})$/i);

  if (sameYearMatch) {
    const [, startMonth, endMonth, year] = sameYearMatch;
    const startMonthIndex = toMonthIndex(startMonth);
    const endMonthIndex = toMonthIndex(endMonth);

    if (startMonthIndex === undefined || endMonthIndex === undefined) {
      return null;
    }

    return `${monthAbbreviations[startMonthIndex]}–${monthAbbreviations[endMonthIndex]} ${year}`;
  }

  const crossYearMatch = cleanDateText(value).match(
    /^([A-Z]{3,9})\s+(\d{4})\s*(?:\/|[-–—])\s*([A-Z]{3,9})\s+(\d{4})$/i,
  );

  if (!crossYearMatch) {
    return null;
  }

  const [, startMonth, startYear, endMonth, endYear] = crossYearMatch;
  const startMonthIndex = toMonthIndex(startMonth);
  const endMonthIndex = toMonthIndex(endMonth);

  if (startMonthIndex === undefined || endMonthIndex === undefined) {
    return null;
  }

  return `${monthAbbreviations[startMonthIndex]} ${startYear}–${monthAbbreviations[endMonthIndex]} ${endYear}`;
}

function parseSpacedRange(value: string) {
  const parts = cleanDateText(value).split(/\s+[–—-]\s+/);

  if (parts.length !== 2) {
    return null;
  }

  const [startRaw, endRaw] = parts;
  const endDate = parsePublicDate(endRaw);

  if (!endDate) {
    return null;
  }

  const startDate =
    parsePublicDate(startRaw) ??
    (endDate.year
      ? parseNamedDate(`${startRaw} ${monthAbbreviations[endDate.month]} ${endDate.year}`)
      : null);

  if (!startDate) {
    return null;
  }

  return formatDateRange(startDate, endDate);
}

export function formatPublicDateDisplay(value?: string | null) {
  if (!value) {
    return undefined;
  }

  const text = cleanDateText(value);
  const compactRange = parseCompactSameMonthRange(text);

  if (compactRange) {
    return compactRange;
  }

  const compactCrossMonthRange = parseCompactCrossMonthRange(text);

  if (compactCrossMonthRange) {
    return compactCrossMonthRange;
  }

  const monthOnlyRange = parseMonthOnlyRange(text);

  if (monthOnlyRange) {
    return monthOnlyRange;
  }

  const spacedRange = parseSpacedRange(text);

  if (spacedRange) {
    return spacedRange;
  }

  const parsedDate = parsePublicDate(text);

  if (!parsedDate) {
    return text.toUpperCase().replace(/\s*-\s*/g, "–");
  }

  return formatSingleDate(parsedDate);
}

export function formatPublicDateRangeFromValues(values: string[]) {
  const parsedDates = values
    .map((value) => parsePublicDate(value))
    .filter((date): date is ParsedPublicDate => Boolean(date))
    .sort((first, second) => getDateTimestamp(first) - getDateTimestamp(second));

  if (parsedDates.length === 0) {
    return undefined;
  }

  return formatDateRange(parsedDates[0], parsedDates[parsedDates.length - 1]);
}

export function formatPublicEventDate(options: {
  startDate?: string | null;
  endDate?: string | null;
  fallback?: string | null;
}) {
  const start = options.startDate ? parsePublicDate(options.startDate) : null;
  const end = options.endDate ? parsePublicDate(options.endDate) : null;

  if (start && end) {
    return formatDateRange(start, end);
  }

  if (start) {
    return formatSingleDate(start);
  }

  return formatPublicDateDisplay(options.fallback);
}
