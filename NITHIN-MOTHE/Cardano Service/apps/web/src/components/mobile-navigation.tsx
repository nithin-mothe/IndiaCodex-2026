"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { appNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <Drawer
      title="Navigation"
      trigger={
        <Button className="md:hidden" variant="outline">
          Menu
        </Button>
      }
    >
      <nav className="grid gap-2">
        {appNavigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
              )}
              href={item.href}
              key={item.href}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </Drawer>
  );
}
