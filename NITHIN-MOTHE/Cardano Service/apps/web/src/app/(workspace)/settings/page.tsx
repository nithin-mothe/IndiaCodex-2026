import { Bell, Network, Settings, ShieldCheck } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const settingsCards = [
  {
    icon: Network,
    title: "Network",
    body: "Cardano Preview is the default demo network.",
  },
  {
    icon: Bell,
    title: "Notifications",
    body: "Escrow, dispute, webhook, and system alerts are enabled.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    body: "Role-based access and local wallet signing are enforced.",
  },
] as const;

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        actions={
          <>
            <Button variant="outline">Reset</Button>
            <Button>Save changes</Button>
          </>
        }
        description="Manage organization preferences, network defaults, notification controls, and operator access policies."
        eyebrow="Settings"
        title="Workspace settings"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {settingsCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader>
                <Icon className="h-5 w-5 text-primary" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{item.body}</p>
                <Badge>Configured</Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="mt-4">
        <Alert>
          <Settings className="mr-2 inline h-4 w-4 text-primary" />
          Demo settings are seeded for a live hackathon walkthrough and can be wired to persistent
          organization preferences later.
        </Alert>
      </div>
    </>
  );
}
