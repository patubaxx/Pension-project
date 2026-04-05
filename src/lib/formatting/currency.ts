import type { AppLocale } from "@/lib/i18n/routing";

const localeMap: Record<AppLocale, string> = {
  en: "en-FI",
  fi: "fi-FI",
};

export function formatBillionEur(
  value: number,
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
  }).format(value * 1e9);
}
