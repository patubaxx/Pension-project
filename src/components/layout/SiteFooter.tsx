import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { PENSION_PROJECT_GITHUB_URL } from "@/lib/site/projectUrls";

const footerLinkClass =
  "font-medium text-stone-800 underline decoration-stone-300 underline-offset-[0.2em] transition-colors hover:decoration-stone-500 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  return (
    <p className="text-center text-sm leading-relaxed text-stone-600">
      {t.rich("note", {
        methodology: (chunks) => (
          <Link href="/methodology" className={footerLinkClass}>
            {chunks}
          </Link>
        ),
        sources: (chunks) => (
          <Link href="/sources" className={footerLinkClass}>
            {chunks}
          </Link>
        ),
        github: (chunks) => (
          <a
            href={PENSION_PROJECT_GITHUB_URL}
            className={footerLinkClass}
            rel="noopener noreferrer"
          >
            {chunks}
          </a>
        ),
      })}
    </p>
  );
}
