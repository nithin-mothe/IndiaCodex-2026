import Link from "next/link";
import { ArrowRight, BadgeCheck, Blocks, ShieldCheck, WalletCards } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingPlans } from "@/data/placeholders";

const capabilities = [
  {
    icon: ShieldCheck,
    title: "Escrow-first workflows",
    body: "Milestone, dispute, release, and refund surfaces are shaped for buyer, seller, and operator review.",
  },
  {
    icon: WalletCards,
    title: "Wallet-aware UX",
    body: "The shell leaves signing user-controlled and prepares for Cardano wallet integration in later milestones.",
  },
  {
    icon: Blocks,
    title: "Composable protocol layer",
    body: "Shared types, SDK boundaries, and API envelopes keep future backend and contract work aligned.",
  },
] as const;

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid min-h-[92vh] max-w-7xl gap-10 px-4 py-8 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-12">
          <div className="flex flex-col justify-center">
            <Badge className="w-fit">Cardano preview foundation</Badge>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-normal text-foreground md:text-7xl">
              TrustPay Protocol
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              AI powered decentralized escrow infrastructure for high-value Cardano commerce, built
              around clear milestones, transparent custody, and operator-grade review surfaces.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/dashboard">
                  Open dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/developers">Developer portal</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full rounded-lg border border-border bg-card p-4 shadow-2xl">
              <div className="grid gap-3">
                <div className="rounded-md border border-border bg-background p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Locked value</span>
                    <Badge>Preview</Badge>
                  </div>
                  <p className="mt-4 text-4xl font-semibold">92,500 ADA</p>
                  <div className="mt-5 h-3 rounded-full bg-secondary">
                    <div className="h-3 w-2/3 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-md border border-border bg-background p-4">
                    <p className="text-sm text-muted-foreground">Active escrows</p>
                    <p className="mt-3 text-2xl font-semibold">24</p>
                  </div>
                  <div className="rounded-md border border-border bg-background p-4">
                    <p className="text-sm text-muted-foreground">Disputes</p>
                    <p className="mt-3 text-2xl font-semibold">2</p>
                  </div>
                </div>
                <div className="rounded-md border border-border bg-background p-4">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-primary" />
                    <p className="text-sm">
                      Milestone review queue is ready for backend integration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <Card key={capability.title}>
                <CardHeader>
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle>{capability.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {capability.body}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card key={plan.name}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{plan.price}</p>
                <p className="mt-2 text-sm text-muted-foreground">{plan.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
