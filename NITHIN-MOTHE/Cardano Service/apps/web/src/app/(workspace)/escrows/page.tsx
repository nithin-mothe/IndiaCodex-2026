import {
  AiDemoPanels,
  CreateEscrowDemo,
  EscrowDetailDemo,
  EscrowTable,
  TransactionHistory,
} from "@/components/demo-sections";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default function EscrowsPage() {
  return (
    <>
      <PageHeader
        actions={
          <>
            <Button variant="outline">Import contract</Button>
            <Button>Create escrow</Button>
          </>
        }
        description="Browse agreements, create milestone escrows, review Cardano transaction states, and simulate release or refund actions."
        eyebrow="Escrows"
        title="Escrow command center"
      />
      <div className="grid gap-4">
        <CreateEscrowDemo />
        <EscrowTable />
        <EscrowDetailDemo />
        <AiDemoPanels />
        <TransactionHistory />
      </div>
    </>
  );
}
