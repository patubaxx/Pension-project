import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { LocaleSwitcher } from "./LocaleSwitcher";

export async function MainNav() {
  const t = await getTranslations("Nav");

  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-4 py-4"
      aria-label={t("ariaLabel")}
    >
      <ul className="flex flex-wrap items-center gap-8 text-sm font-medium text-stone-700">
        <li>
          <Link
            href="/"
            className="rounded-sm transition-colors hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800"
          >
            {t("home")}
          </Link>
        </li>
        <li>
          <Link
            href="/methodology"
            className="rounded-sm transition-colors hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800"
          >
            {t("methodology")}
          </Link>
        </li>
        <li>
          <Link
            href="/sources"
            className="rounded-sm transition-colors hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800"
          >
            {t("sources")}
          </Link>
        </li>
      </ul>
      <LocaleSwitcher />
    </nav>
  );
}
