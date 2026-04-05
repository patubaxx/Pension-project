import type { ReactNode } from "react";
import { MainNav } from "@/components/navigation/MainNav";

type SiteShellProps = {
  children: ReactNode;
  footer: ReactNode;
};

export function SiteShell({ children, footer }: SiteShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-stone-50">
      <header className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <MainNav />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-stone-200/80 bg-white/60">
        <div className="mx-auto max-w-3xl px-6 py-10 sm:px-8">{footer}</div>
      </footer>
    </div>
  );
}
