import { BadgeCheck, KeyRound, UserRound, WalletCards } from "lucide-react";

import { WalletSummary } from "@/components/demo-sections";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        actions={
          <>
            <Button variant="outline">Security</Button>
            <Button>Edit profile</Button>
          </>
        }
        description="Show identity, role, wallet, and account security details for the signed-in TrustPay operator."
        eyebrow="Profile"
        title="Bianca Buyer"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={UserRound} label="Role" tone="Current workspace" value="Buyer" />
        <StatCard
          icon={WalletCards}
          label="Wallet"
          tone="Verified Preview address"
          value="Connected"
        />
        <StatCard icon={BadgeCheck} label="Account" tone="Demo identity" value="Verified" />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[22rem_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="font-medium">buyer@trustpay.demo</p>
            <Badge>Buyer</Badge>
            <div className="flex items-center gap-2 text-muted-foreground">
              <KeyRound className="h-4 w-4" />
              Two-factor demo policy enabled
            </div>
          </CardContent>
        </Card>
        <WalletSummary />
      </div>
    </>
  );
}
