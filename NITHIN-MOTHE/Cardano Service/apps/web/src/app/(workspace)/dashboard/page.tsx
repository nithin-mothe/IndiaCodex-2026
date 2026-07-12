import { BadgeDollarSign, Clock3, ShieldCheck } from "lucide-react";

import {
  AnalyticsCharts,
  EscrowTable,
  NotificationsList,
  RevenueSummary,
  TransactionHistory,
  WalletSummary,
} from "@/components/demo-sections";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        actions={
          <>
            <Button variant="outline">Review queue</Button>
            <Button>Create escrow</Button>
          </>
        }
        description="Monitor escrow funding, milestone reviews, certificate activity, and operator notifications from a single responsive console."
        eyebrow="Dashboard"
        title="Escrow operations"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={BadgeDollarSign}
          label="Locked value"
          tone="Across active preview escrows"
          value="2,500 ADA"
        />
        <StatCard icon={ShieldCheck} label="Completed" tone="Settled without dispute" value="18" />
        <StatCard icon={Clock3} label="Pending reviews" tone="Awaiting buyer action" value="6" />
      </div>
      <div className="mt-4 grid gap-4">
        <WalletSummary />
        <EscrowTable />
        <AnalyticsCharts />
        <div className="grid gap-4 xl:grid-cols-[1fr_24rem]">
          <TransactionHistory />
          <NotificationsList />
        </div>
        <RevenueSummary />
      </div>
    </>
  );
}
