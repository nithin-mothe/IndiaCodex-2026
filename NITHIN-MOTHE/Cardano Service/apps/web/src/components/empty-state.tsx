import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({
  description,
  icon: Icon,
  title,
}: {
  readonly description: string;
  readonly icon: LucideIcon;
  readonly title: string;
}) {
  return (
    <Card>
      <CardContent className="grid min-h-52 place-items-center p-6 text-center">
        <div>
          <Icon className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-4 text-lg font-semibold">{title}</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
