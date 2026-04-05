import type { AppLocale } from "@/lib/i18n/routing";

const localeMap: Record<AppLocale, string> = {
  en: "en-FI",
  fi: "fi-FI",
};

/** @param ratio — e.g. 0.153 for +15.3% */
export function formatPercentRatio(
  ratio: number,
  locale: AppLocale,
  fractionDigits = 1
): string {
  const intlLocale = localeMap[locale];
  return new Intl.NumberFormat(intlLocale, {
    style: "percent",
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
    signDisplay: "exceptZero",
  }).format(ratio);
}
