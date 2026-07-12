"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Drawer({
  children,
  title,
  trigger,
}: {
  readonly children: ReactNode;
  readonly title: string;
  readonly trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  return (
    <>
      <span
        onClick={() => {
          setOpen(true);
        }}
      >
        {trigger}
      </span>
      <aside
        aria-hidden={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border bg-background p-6 shadow-xl transition-transform",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id={titleId} className="text-lg font-semibold">
            {title}
          </h2>
          <Button
            aria-label="Close drawer"
            size="icon"
            variant="ghost"
            onClick={() => {
              setOpen(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div role="dialog" aria-modal="true" aria-labelledby={titleId}>
          {children}
        </div>
      </aside>
    </>
  );
}
