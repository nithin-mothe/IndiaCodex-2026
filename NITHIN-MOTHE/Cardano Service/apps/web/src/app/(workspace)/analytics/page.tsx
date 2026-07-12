import { BarChart3, Clock3, ShieldCheck, TrendingUp } from "lucide-react";

import { AnalyticsCharts, EscrowTable } from "@/components/demo-sections";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        actions={
          <>
            <Button variant="outline">Export CSV</Button>
            <Button>Refresh</Button>
          </>
        }
        description="Track protocol activity, settlement velocity, dispute rates, and operational workload across seeded demo escrows."
        eyebrow="Analytics"
        title="Protocol analytics"
      />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={BarChart3} label="Escrows" tone="Total seeded" value="3" />
        <StatCard icon={TrendingUp} label="Volume" tone="July preview" value="4,600 ADA" />
        <StatCard
          icon={ShieldCheck}
          label="Success rate"
          tone="Completed without dispute"
          value="96%"
        />
        <StatCard icon={Clock3} label="Median release" tone="Milestone review" value="18h" />
      </div>
      <div className="mt-4 grid gap-4">
        <AnalyticsCharts />
        <EscrowTable />
      </div>
    </>
  );
}
