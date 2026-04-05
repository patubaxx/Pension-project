import type { AppLocale } from "@/lib/i18n/routing";

const localeMap: Record<AppLocale, string> = {
  en: "en-FI",
  fi: "fi-FI",
};

/**
 * @param valueBillions — absolute amount in billions of EUR (e.g. 288.1)
 */
export function formatBillionEur(
  valueBillions: number,
  locale: AppLocale,
  fractionDigits = 1
): string {
  const intlLocale = localeMap[locale];
  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency: "EUR",
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: fractionDigits,
  }).format(valueBillions * 1e9);
}

/** Stock positions reported in million EUR → compact currency in billions. */
export function formatBillionsFromMillionEur(
  assetsMillionEur: number,
  locale: AppLocale,
  fractionDigits = 1
): string {
  return formatBillionEur(assetsMillionEur / 1000, locale, fractionDigits);
}

/** Chart axis / tooltip: billions with fewer digits, no currency symbol clutter. */
export function formatBillionsShortAxis(
  valueBillions: number,
  locale: AppLocale
): string {
  const intlLocale = localeMap[locale];
  return new Intl.NumberFormat(intlLocale, {
    maximumFractionDigits: valueBillions >= 100 ? 0 : 1,
  }).format(valueBillions);
}
