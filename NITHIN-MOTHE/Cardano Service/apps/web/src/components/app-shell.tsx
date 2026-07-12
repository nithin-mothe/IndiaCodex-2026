import Link from "next/link";
import type { ReactNode } from "react";

import { MobileNavigation } from "@/components/mobile-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { appNavigation } from "@/lib/navigation";

export function AppShell({ children }: { readonly children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-border bg-card px-5 py-6 md:block">
        <Link className="flex items-center justify-between" href="/">
          <span>
            <span className="block text-lg font-semibold">TrustPay</span>
            <span className="text-xs text-muted-foreground">Cardano escrow console</span>
          </span>
          <Badge>Preview</Badge>
        </Link>
        <nav className="mt-8 grid gap-1">
          {appNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                href={item.href}
                key={item.href}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="md:pl-72">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur md:px-8">
          <MobileNavigation />
          <div className="hidden text-sm text-muted-foreground md:block">
            Cardano preview network
          </div>
          <div className="flex items-center gap-3">
            <Badge>Wallet offline</Badge>
            <ThemeToggle />
          </div>
        </header>
        <main className="px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
