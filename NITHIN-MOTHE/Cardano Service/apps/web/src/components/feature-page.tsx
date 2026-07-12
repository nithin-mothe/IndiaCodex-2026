import type { LucideIcon } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function FeaturePage({
  description,
  icon,
  readiness,
  title,
}: {
  readonly description: string;
  readonly icon: LucideIcon;
  readonly readiness: number;
  readonly title: string;
}) {
  return (
    <>
      <PageHeader
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>Open workflow</Button>
          </>
        }
        description={description}
        eyebrow="Milestone 2 surface"
        title={title}
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <EmptyState
          description="The interface is wired for navigation, responsive layout, empty states, and future API integration. Live data arrives with the backend and product workflow milestones."
          icon={icon}
          title={`${title} workspace`}
        />
        <Card>
          <CardHeader>
            <CardTitle>Readiness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Progress label="UI shell" value={readiness} />
            <Alert>
              Backend services are intentionally disconnected until Milestone 3 is complete.
            </Alert>
            <div className="flex flex-wrap gap-2">
              <Badge>Responsive</Badge>
              <Badge>Accessible</Badge>
              <Badge>Typed</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
