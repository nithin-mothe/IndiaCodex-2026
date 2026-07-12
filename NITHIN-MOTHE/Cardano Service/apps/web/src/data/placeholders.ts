import type { EscrowStatus } from "@trustpay/types";

export interface DemoMilestone {
  readonly title: string;
  readonly amountAda: number;
  readonly state: "Accepted" | "In review" | "Scheduled" | "Released";
  readonly due: string;
}

export interface DemoEscrow {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly buyer: string;
  readonly seller: string;
  readonly counterparty: string;
  readonly valueAda: number;
  readonly valueUsd: number;
  readonly progress: number;
  readonly status: EscrowStatus;
  readonly updatedAt: string;
  readonly txHash: string;
  readonly risk: "Low" | "Medium" | "High";
  readonly milestones: readonly DemoMilestone[];
}

export interface DemoTransaction {
  readonly id: string;
  readonly label: string;
  readonly amountAda: number;
  readonly state: "Confirmed" | "Pending" | "Review";
  readonly time: string;
  readonly hash: string;
}

export interface DemoNotification {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly tone: "info" | "success" | "warning";
  readonly read: boolean;
  readonly time: string;
}

export interface DemoCertificate {
  readonly id: string;
  readonly escrowId: string;
  readonly title: string;
  readonly policyId: string;
  readonly assetName: string;
  readonly metadataUri: string;
  readonly mintedTxHash: string;
  readonly issuedTo: string;
}

export const demoUsers = [
  {
    id: "USR-001",
    name: "Bianca Buyer",
    email: "buyer@trustpay.demo",
    role: "Buyer",
    wallet: "addr_test1qbuyertrustpaydemo0000000000000000000000",
    status: "Verified",
  },
  {
    id: "USR-002",
    name: "Santiago Seller",
    email: "seller@trustpay.demo",
    role: "Seller",
    wallet: "addr_test1qsellertrustpaydemo000000000000000000000",
    status: "Verified",
  },
  {
    id: "USR-003",
    name: "Devon Developer",
    email: "developer@trustpay.demo",
    role: "Developer",
    wallet: "Not connected",
    status: "Active",
  },
  {
    id: "USR-004",
    name: "Avery Admin",
    email: "admin@trustpay.demo",
    role: "Administrator",
    wallet: "Console account",
    status: "Active",
  },
] as const;

export const demoEscrows: readonly DemoEscrow[] = [
  {
    id: "TP-1042",
    title: "AI contract audit for Cardano launch",
    description: "Milestone-based validator audit secured by TrustPay escrow.",
    buyer: "Bianca Buyer",
    seller: "Santiago Seller",
    counterparty: "Aster Audit",
    valueAda: 2500,
    valueUsd: 1428,
    progress: 58,
    status: "Locked",
    updatedAt: "12 min ago",
    txHash: "tx_locked_preview_demo_001",
    risk: "Low",
    milestones: [
      {
        title: "Threat model and architecture review",
        amountAda: 1000,
        state: "Accepted",
        due: "Jul 11",
      },
      {
        title: "Validator test review",
        amountAda: 1500,
        state: "In review",
        due: "Jul 13",
      },
    ],
  },
  {
    id: "TP-1039",
    title: "NFT certificate metadata service",
    description: "Metadata delivery and minting proof for completion certificates.",
    buyer: "Bianca Buyer",
    seller: "Santiago Seller",
    counterparty: "Indigo Works",
    valueAda: 1200,
    valueUsd: 685,
    progress: 34,
    status: "Disputed",
    updatedAt: "42 min ago",
    txHash: "tx_disputed_preview_demo_001",
    risk: "Medium",
    milestones: [
      {
        title: "Metadata schema and minting proof",
        amountAda: 1200,
        state: "In review",
        due: "Jul 12",
      },
    ],
  },
  {
    id: "TP-1033",
    title: "Marketplace landing page implementation",
    description: "Premium launch page delivered and accepted with NFT receipt.",
    buyer: "Bianca Buyer",
    seller: "Santiago Seller",
    counterparty: "Northstar Labs",
    valueAda: 900,
    valueUsd: 514,
    progress: 100,
    status: "Completed",
    updatedAt: "Yesterday",
    txHash: "tx_completed_preview_demo_001",
    risk: "Low",
    milestones: [
      {
        title: "Design system and responsive page",
        amountAda: 900,
        state: "Released",
        due: "Jul 9",
      },
    ],
  },
] as const;

export const demoTransactions: readonly DemoTransaction[] = [
  {
    id: "tx_84a1",
    label: "Escrow funded",
    amountAda: 2500,
    state: "Confirmed",
    time: "10:32",
    hash: "tx_locked_preview_demo_001",
  },
  {
    id: "tx_77c2",
    label: "Milestone submitted",
    amountAda: 1500,
    state: "Review",
    time: "09:18",
    hash: "tx_milestone_preview_demo_002",
  },
  {
    id: "tx_31b9",
    label: "Certificate minted",
    amountAda: 2,
    state: "Pending",
    time: "08:45",
    hash: "tx_certificate_preview_demo_001",
  },
] as const;

export const demoNotifications: readonly DemoNotification[] = [
  {
    id: "note_1",
    title: "Milestone review requested",
    body: "Aster Audit submitted validator test review for buyer acceptance.",
    tone: "info",
    read: false,
    time: "4 min ago",
  },
  {
    id: "note_2",
    title: "Deposit confirmed",
    body: "2,500 ADA is locked for TP-1042 on Cardano Preview.",
    tone: "success",
    read: false,
    time: "12 min ago",
  },
  {
    id: "note_3",
    title: "Dispute summary ready",
    body: "AI generated a neutral evidence summary for TP-1039.",
    tone: "warning",
    read: true,
    time: "1 hr ago",
  },
] as const;

export const demoCertificates: readonly DemoCertificate[] = [
  {
    id: "NFT-001",
    escrowId: "TP-1033",
    title: "Completion Certificate",
    policyId: "policy_demo_completed_certificate",
    assetName: "TrustPayCompletionCertificate001",
    metadataUri: "ipfs://bafybeigdemo/trustpay-certificate-001.json",
    mintedTxHash: "tx_certificate_preview_demo_001",
    issuedTo: "Northstar Labs",
  },
  {
    id: "NFT-002",
    escrowId: "TP-1042",
    title: "Audit Milestone Receipt",
    policyId: "policy_demo_pending_certificate",
    assetName: "TrustPayAuditReceipt002",
    metadataUri: "ipfs://bafybeigdemo/trustpay-audit-receipt-002.json",
    mintedTxHash: "pending",
    issuedTo: "Bianca Buyer",
  },
] as const;

export const monthlyVolume = [
  { month: "Feb", volume: 720, success: 84 },
  { month: "Mar", volume: 980, success: 88 },
  { month: "Apr", volume: 1320, success: 91 },
  { month: "May", volume: 1760, success: 93 },
  { month: "Jun", volume: 2210, success: 94 },
  { month: "Jul", volume: 4600, success: 96 },
] as const;

export const demoWallet = {
  name: "Preview buyer wallet",
  address: "addr_test1qbuyertrustpaydemo0000000000000000000000",
  network: "Cardano Preview",
  balanceAda: 8420,
  collateralAda: 5,
  connected: true,
} as const;

export const apiKeys = [
  {
    name: "Hackathon demo key",
    prefix: "tp_demo_7f42",
    scopes: "escrows:read escrows:write webhooks:write",
    lastUsed: "Today 10:15",
  },
] as const;

export const webhookEvents = [
  { event: "escrow.created", status: "Listening", deliveries: 18 },
  { event: "escrow.locked", status: "Healthy", deliveries: 14 },
  { event: "milestone.released", status: "Healthy", deliveries: 9 },
] as const;

export const pricingPlans = [
  { name: "Starter", price: "$0", detail: "For occasional escrow workflows" },
  { name: "Growth", price: "$49", detail: "For teams managing recurring milestones" },
  { name: "Protocol", price: "Custom", detail: "For platforms embedding TrustPay" },
] as const;
