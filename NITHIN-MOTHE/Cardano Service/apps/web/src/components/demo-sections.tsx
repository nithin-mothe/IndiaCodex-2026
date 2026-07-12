import {
  Activity,
  BadgeCheck,
  Bell,
  Bot,
  Download,
  ExternalLink,
  FileBadge2,
  Gauge,
  KeyRound,
  LockKeyhole,
  Network,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  WalletCards,
} from "lucide-react";

import { StatCard } from "@/components/stat-card";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  apiKeys,
  demoCertificates,
  demoEscrows,
  demoNotifications,
  demoTransactions,
  demoUsers,
  demoWallet,
  monthlyVolume,
  webhookEvents,
} from "@/data/placeholders";
import { formatAda, formatCurrency } from "@/lib/utils";

export function EscrowTable() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Escrows</CardTitle>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="w-52 pl-9" placeholder="Search escrows" />
          </div>
          <Button size="sm">Create</Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Agreement</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoEscrows.map((escrow) => (
              <TableRow key={escrow.id}>
                <TableCell className="font-mono text-xs">{escrow.id}</TableCell>
                <TableCell>
                  <p className="font-medium">{escrow.title}</p>
                  <p className="text-xs text-muted-foreground">{escrow.description}</p>
                </TableCell>
                <TableCell className="text-sm">
                  {escrow.buyer} &rarr; {escrow.seller}
                </TableCell>
                <TableCell>
                  <Badge>{escrow.status}</Badge>
                </TableCell>
                <TableCell className="min-w-36">
                  <Progress
                    label={`${String(escrow.progress)}% complete`}
                    value={escrow.progress}
                  />
                </TableCell>
                <TableCell>{formatAda(escrow.valueAda)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function EscrowDetailDemo() {
  const escrow = demoEscrows.at(0);

  if (!escrow) {
    return null;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_24rem]">
      <Card>
        <CardHeader>
          <CardTitle>{escrow.id} lifecycle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {[
            ["Created", "Buyer generated AI-assisted terms and invited seller."],
            ["Deposited", "2,500 ADA locked by transaction tx_locked_preview_demo_001."],
            ["Milestone review", "Validator test review is awaiting buyer acceptance."],
            ["Release", "Next action signs a release transaction and mints a receipt."],
          ].map(([title, body]) => (
            <div className="flex gap-3" key={title}>
              <div className="mt-1 h-3 w-3 rounded-full bg-primary" />
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Button>
            <LockKeyhole className="h-4 w-4" />
            Lock funds
          </Button>
          <Button variant="secondary">
            <BadgeCheck className="h-4 w-4" />
            Release milestone
          </Button>
          <Button variant="outline">
            <RefreshCcw className="h-4 w-4" />
            Refund escrow
          </Button>
          <Alert>
            Demo actions preserve the Cardano integration boundary and show unsigned workflow
            states.
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

export function CreateEscrowDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create escrow</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-4">
        {[
          ["1", "Details", "Title, counterparty, value, deadline"],
          ["2", "Milestones", "Split payment into reviewable releases"],
          ["3", "AI terms", "Generate scope, acceptance, and risk language"],
          ["4", "Review", "Connect wallet and submit deposit intent"],
        ].map(([step, title, body]) => (
          <div className="rounded-md border border-border p-4" key={step}>
            <Badge>{step}</Badge>
            <p className="mt-3 font-semibold">{title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function WalletSummary() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
      <Card>
        <CardHeader>
          <CardTitle>CIP-30 wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border border-border bg-secondary p-4">
            <p className="text-sm text-muted-foreground">Connected address</p>
            <p className="mt-2 break-all font-mono text-sm">{demoWallet.address}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard
              icon={WalletCards}
              label="Balance"
              tone="Available"
              value={formatAda(demoWallet.balanceAda)}
            />
            <StatCard icon={Network} label="Network" tone="Compatible" value={demoWallet.network} />
            <StatCard
              icon={ShieldCheck}
              label="Collateral"
              tone="Ready"
              value={formatAda(demoWallet.collateralAda)}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Wallet controls</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Button>Connect wallet</Button>
          <Button variant="outline">Disconnect</Button>
          <Badge className="w-fit">Nami / Eternl / Lace ready</Badge>
        </CardContent>
      </Card>
    </div>
  );
}

export function AnalyticsCharts() {
  const max = Math.max(...monthlyVolume.map((item) => item.volume));

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_22rem]">
      <Card>
        <CardHeader>
          <CardTitle>Monthly transaction volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-end gap-3">
            {monthlyVolume.map((item) => (
              <div className="flex flex-1 flex-col items-center gap-2" key={item.month}>
                <div
                  className="w-full rounded-t-md bg-primary transition-all"
                  style={{ height: `${String(Math.max(18, (item.volume / max) * 220))}px` }}
                />
                <span className="text-xs text-muted-foreground">{item.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        <StatCard icon={Gauge} label="Success rate" tone="Last 30 days" value="96%" />
        <StatCard
          icon={Activity}
          label="Transaction volume"
          tone="Preview net"
          value={formatAda(4600)}
        />
        <StatCard icon={Bell} label="Webhook delivery" tone="No failed retries" value="100%" />
      </div>
    </div>
  );
}

export function NotificationsList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Notifications</CardTitle>
        <Button size="sm" variant="outline">
          Mark all read
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {demoNotifications.map((notification) => (
          <Alert key={notification.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  {!notification.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                  <p className="font-medium">{notification.title}</p>
                  <Badge>{notification.tone}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{notification.body}</p>
              </div>
              <span className="text-xs text-muted-foreground">{notification.time}</span>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}

export function CertificatesGallery() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {demoCertificates.map((certificate) => (
        <Card key={certificate.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <FileBadge2 className="h-8 w-8 text-primary" />
              <Badge>{certificate.escrowId}</Badge>
            </div>
            <CardTitle>{certificate.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>Issued to {certificate.issuedTo}</p>
            <p className="break-all font-mono text-xs text-muted-foreground">
              {certificate.metadataUri}
            </p>
            <div className="flex gap-2">
              <Button size="sm">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button size="sm" variant="outline">
                <ExternalLink className="h-4 w-4" />
                Verify
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function DeveloperPortalDemo() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_22rem]">
      <Card>
        <CardHeader>
          <CardTitle>API keys and webhooks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {apiKeys.map((key) => (
            <div className="rounded-md border border-border p-4" key={key.prefix}>
              <div className="flex items-center justify-between">
                <p className="font-medium">{key.name}</p>
                <KeyRound className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 font-mono text-sm">{key.prefix}_********</p>
              <p className="mt-1 text-xs text-muted-foreground">{key.scopes}</p>
            </div>
          ))}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deliveries</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhookEvents.map((event) => (
                <TableRow key={event.event}>
                  <TableCell className="font-mono text-xs">{event.event}</TableCell>
                  <TableCell>
                    <Badge>{event.status}</Badge>
                  </TableCell>
                  <TableCell>{event.deliveries}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>SDK example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-md bg-secondary p-4 text-xs">
            {`const client = new TrustPayClient({
  apiKey: process.env.TRUSTPAY_API_KEY
});

await client.escrows.create({
  amountAda: 2500,
  network: "preview"
});`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminDemo() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={UserRound} label="Users" tone="Seeded demo accounts" value="4" />
        <StatCard icon={LockKeyhole} label="Escrows" tone="Across all states" value="3" />
        <StatCard icon={Activity} label="Platform health" tone="API and web ready" value="99.9%" />
        <StatCard icon={Bot} label="AI summaries" tone="Generated for disputes" value="2" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-xs">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge>{user.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export function AiDemoPanels() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {[
        [
          "Contract generator",
          "Generated milestone acceptance language, refund conditions, and evidence requirements.",
        ],
        [
          "Risk analysis",
          "Low custody risk, medium delivery timing risk, no wallet/network mismatch detected.",
        ],
        [
          "Dispute summary",
          "Neutral summary prepared from milestone scope, timestamps, and uploaded proof.",
        ],
      ].map(([title, body]) => (
        <Card key={title}>
          <CardHeader>
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-muted-foreground">{body}</CardContent>
        </Card>
      ))}
    </div>
  );
}

export function TransactionHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction history</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.label}</TableCell>
                <TableCell>{formatAda(transaction.amountAda)}</TableCell>
                <TableCell>
                  <Badge>{transaction.state}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{transaction.hash}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function RevenueSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue view</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Current visible escrow value is {formatCurrency(2627)} across seeded demo records.
      </CardContent>
    </Card>
  );
}
