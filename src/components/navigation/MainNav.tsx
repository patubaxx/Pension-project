import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { LocaleSwitcher } from "./LocaleSwitcher";

export async function MainNav() {
  const t = await getTranslations("Nav");

  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200/80 py-4"
      aria-label="Primary"
    >
      <ul className="flex flex-wrap items-center gap-8 text-sm font-medium text-stone-700">
        <li>
          <Link href="/" className="transition-colors hover:text-stone-900">
            {t("home")}
          </Link>
        </li>
        <li>
          <Link
            href="/methodology"
            className="transition-colors hover:text-stone-900"
          >
            {t("methodology")}
          </Link>
        </li>
        <li>
          <Link
            href="/sources"
            className="transition-colors hover:text-stone-900"
          >
            {t("sources")}
          </Link>
        </li>
      </ul>
      <LocaleSwitcher />
    </nav>
  );
}
