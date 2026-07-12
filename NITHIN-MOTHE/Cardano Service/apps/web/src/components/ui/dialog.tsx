"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Dialog({
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
      {open ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur"
          role="presentation"
        >
          <Card
            className="w-full max-w-lg p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id={titleId} className="text-lg font-semibold">
                {title}
              </h2>
              <Button
                aria-label="Close dialog"
                size="icon"
                variant="ghost"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {children}
          </Card>
        </div>
      ) : null}
    </>
  );
}
