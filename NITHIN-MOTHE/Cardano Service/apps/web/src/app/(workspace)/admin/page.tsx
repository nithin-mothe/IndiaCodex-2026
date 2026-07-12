import { Activity, Gauge, ShieldAlert, UsersRound } from "lucide-react";

import { AdminDemo, AnalyticsCharts, NotificationsList } from "@/components/demo-sections";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <>
      <PageHeader
        actions={
          <>
            <Button variant="outline">Audit logs</Button>
            <Button>Platform status</Button>
          </>
        }
        description="Operate the seeded platform demo with users, escrows, analytics, notifications, health, and audit context."
        eyebrow="Admin portal"
        title="Platform operations"
      />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={UsersRound} label="Users" tone="Verified demo identities" value="4" />
        <StatCard icon={Gauge} label="Health" tone="Services available" value="Green" />
        <StatCard icon={ShieldAlert} label="Disputes" tone="Under review" value="1" />
        <StatCard icon={Activity} label="Audit events" tone="Recent platform actions" value="12" />
      </div>
      <div className="mt-4 grid gap-4">
        <AdminDemo />
        <AnalyticsCharts />
        <NotificationsList />
      </div>
    </>
  );
}
