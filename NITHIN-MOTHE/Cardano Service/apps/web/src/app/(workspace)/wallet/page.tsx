import { Network, ShieldCheck, WalletCards } from "lucide-react";

import { TransactionHistory, WalletSummary } from "@/components/demo-sections";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";

export default function WalletPage() {
  return (
    <>
      <PageHeader
        actions={
          <>
            <Button variant="outline">Disconnect</Button>
            <Button>Connect wallet</Button>
          </>
        }
        description="Connect a CIP-30 Cardano wallet, inspect Preview network readiness, and review signing-related escrow activity."
        eyebrow="Wallet"
        title="Cardano wallet"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={WalletCards} label="Wallet" tone="CIP-30 compatible" value="Connected" />
        <StatCard icon={Network} label="Network" tone="Preview testnet" value="Ready" />
        <StatCard icon={ShieldCheck} label="Signing" tone="User-controlled" value="Local" />
      </div>
      <div className="mt-4 grid gap-4">
        <WalletSummary />
        <TransactionHistory />
      </div>
    </>
  );
}
