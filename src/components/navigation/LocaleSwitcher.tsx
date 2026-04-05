"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, routing } from "@/lib/i18n/routing";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const current = useLocale();
  const t = useTranslations("Nav");

  return (
    <div className="flex items-center gap-1 text-sm text-stone-600">
      <span className="sr-only">{t("language")}</span>
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={`rounded px-2 py-1 transition-colors hover:bg-stone-100 hover:text-stone-900 ${
            loc === current ? "font-medium text-stone-900" : ""
          }`}
        >
          {loc === "en" ? t("english") : t("finnish")}
        </Link>
      ))}
    </div>
  );
}
