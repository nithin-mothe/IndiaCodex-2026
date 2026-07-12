import { Code2, KeyRound, RadioTower } from "lucide-react";

import { DeveloperPortalDemo } from "@/components/demo-sections";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";

export default function DevelopersPage() {
  return (
    <>
      <PageHeader
        actions={
          <>
            <Button variant="outline">Open Swagger</Button>
            <Button>Create API key</Button>
          </>
        }
        description="Expose SDK examples, API keys, webhooks, and an API playground for platforms embedding TrustPay escrow flows."
        eyebrow="Developer portal"
        title="Integration console"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={Code2} label="SDK" tone="TypeScript skeleton" value="Ready" />
        <StatCard icon={KeyRound} label="API keys" tone="Active demo key" value="1" />
        <StatCard icon={RadioTower} label="Webhooks" tone="Healthy endpoints" value="3" />
      </div>
      <div className="mt-4">
        <DeveloperPortalDemo />
      </div>
    </>
  );
}
