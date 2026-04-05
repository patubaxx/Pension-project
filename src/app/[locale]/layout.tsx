import type { ReactNode } from "react";
import { Libre_Baskerville, Source_Sans_3 } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteShell } from "@/components/layout/SiteShell";
import { routing } from "@/lib/i18n/routing";
import "@/app/globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans-body",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif-display",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${sourceSans.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-stone-50 font-sans text-stone-900">
        <NextIntlClientProvider messages={messages}>
          <SiteShell footer={<SiteFooter />}>{children}</SiteShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
