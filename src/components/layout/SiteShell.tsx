import type { ReactNode } from "react";
import { MainNav } from "@/components/navigation/MainNav";

type SiteShellProps = {
  children: ReactNode;
  footer: ReactNode;
};

export function SiteShell({ children, footer }: SiteShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-stone-50 via-[#e9f1ee] to-[#f2f4f3]">
      <header className="w-full border-b border-stone-300/45 bg-white/60">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <MainNav />
        </div>
      </header>
      <main className="flex w-full flex-1 justify-center">
        <div className="w-full max-w-3xl flex-1 bg-white/38">{children}</div>
      </main>
      <footer className="w-full border-t border-stone-300/45 bg-white/60">
        <div className="mx-auto max-w-3xl px-6 py-8 sm:px-8 sm:py-10">
          {footer}
        </div>
      </footer>
    </div>
  );
}
