import { BookOpen, CircleHelp, Code2, LifeBuoy } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const helpCards = [
  {
    icon: CircleHelp,
    title: "Escrow walkthrough",
    body: "Create, fund, review milestones, release, refund, or dispute.",
  },
  {
    icon: Code2,
    title: "Developer guide",
    body: "Use API keys, webhooks, SDK examples, and Swagger documentation.",
  },
  {
    icon: LifeBuoy,
    title: "Admin runbook",
    body: "Monitor health, audit logs, notifications, and platform status.",
  },
  {
    icon: BookOpen,
    title: "Demo script",
    body: "Start at the dashboard, open wallet, create escrow, release, then verify NFT.",
  },
] as const;

export default function HelpPage() {
  return (
    <>
      <PageHeader
        actions={
          <>
            <Button variant="outline">Open docs</Button>
            <Button>Contact support</Button>
          </>
        }
        description="Guide buyers, sellers, developers, and administrators through escrow lifecycle decisions."
        eyebrow="Help"
        title="Help center"
      />
      <div className="grid gap-4 md:grid-cols-3">
        {helpCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader>
                <Icon className="h-5 w-5 text-primary" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                {item.body}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
