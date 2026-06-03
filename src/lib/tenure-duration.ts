type Locale = "pt" | "en";

export type MonthFormatStyle = "short" | "long";

function parseMonth(date: string): { year: number; month: number } {
  const [year, month] = date.split("-").map(Number);
  return { year, month };
}

const COMPACT_MONTH_PT = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
] as const;

const COMPACT_MONTH_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/** Evita bug de UTC (ex.: "2021-01" virar dez/2020 no Brasil). */
export function formatMonthLabel(
  date: string,
  locale: Locale,
  style: MonthFormatStyle = "long",
): string {
  const { year, month } = parseMonth(date);
  return new Date(year, month - 1, 15).toLocaleDateString(
    locale === "pt" ? "pt-BR" : "en-US",
    {
      month: style === "long" ? "long" : "short",
      year: "numeric",
    },
  );
}

/** Formato compacto para marcos da jornada (ex.: set/22). */
export function formatMonthYearCompact(date: string, locale: Locale): string {
  const { year, month } = parseMonth(date);
  const abbr = locale === "pt" ? COMPACT_MONTH_PT[month - 1] : COMPACT_MONTH_EN[month - 1];
  return `${abbr}/${String(year).slice(2)}`;
}

function monthsBetween(start: string, end: string): number {
  const s = parseMonth(start);
  const e = parseMonth(end);
  return (e.year - s.year) * 12 + (e.month - s.month) + 1;
}

function formatDurationParts(totalMonths: number, locale: Locale): string {
  if (totalMonths < 1) {
    return locale === "pt" ? "menos de 1 mês" : "less than 1 month";
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (locale === "pt") {
    if (years === 0) return `${months} ${months === 1 ? "mês" : "meses"}`;
    if (months === 0) return `${years} ${years === 1 ? "ano" : "anos"}`;
    return `${years} ${years === 1 ? "ano" : "anos"} e ${months} ${months === 1 ? "mês" : "meses"}`;
  }

  if (years === 0) return `${months} ${months === 1 ? "month" : "months"}`;
  if (months === 0) return `${years} ${years === 1 ? "year" : "years"}`;
  return `${years} ${years === 1 ? "year" : "years"} and ${months} ${months === 1 ? "month" : "months"}`;
}

/** Duração inclusiva entre dois meses (YYYY-MM). */
export function formatTenureDuration(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
): string {
  if (!end) return presentLabel;
  return formatDurationParts(monthsBetween(start, end), locale);
}

export function formatMonthRange(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
  style: MonthFormatStyle = "long",
): string {
  return `${formatMonthLabel(start, locale, style)} — ${end ? formatMonthLabel(end, locale, style) : presentLabel}`;
}

/** Intervalo compacto para trilha da jornada. */
export function formatMonthRangeCompact(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
): string {
  if (!end) {
    return `${formatMonthYearCompact(start, locale)} — ${presentLabel}`;
  }
  return `${formatMonthYearCompact(start, locale)} — ${formatMonthYearCompact(end, locale)}`;
}
