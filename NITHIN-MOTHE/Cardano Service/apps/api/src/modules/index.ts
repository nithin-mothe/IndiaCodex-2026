import type { FastifyInstance } from "fastify";

import { createSuccessResponse } from "@trustpay/utils";

import { registerHealthRoutes } from "./health/routes.js";

const demoUsers = [
  {
    id: "USR-001",
    email: "buyer@trustpay.demo",
    displayName: "Bianca Buyer",
    role: "BUYER",
    walletAddress: "addr_test1qbuyertrustpaydemo0000000000000000000000",
  },
  {
    id: "USR-002",
    email: "seller@trustpay.demo",
    displayName: "Santiago Seller",
    role: "SELLER",
    walletAddress: "addr_test1qsellertrustpaydemo000000000000000000000",
  },
  {
    id: "USR-003",
    email: "developer@trustpay.demo",
    displayName: "Devon Developer",
    role: "DEVELOPER",
    walletAddress: null,
  },
  {
    id: "USR-004",
    email: "admin@trustpay.demo",
    displayName: "Avery Admin",
    role: "ADMINISTRATOR",
    walletAddress: null,
  },
] as const;

const demoEscrows = [
  {
    id: "TP-1042",
    title: "AI contract audit for Cardano launch",
    status: "LOCKED",
    buyer: "Bianca Buyer",
    seller: "Santiago Seller",
    amountAda: 2500,
    network: "preview",
    contractHash: "script_preview_locked_demo_hash",
    chainTxHash: "tx_locked_preview_demo_001",
    milestones: [
      {
        title: "Threat model and architecture review",
        amountAda: 1000,
        state: "ACCEPTED",
      },
      {
        title: "Validator test review",
        amountAda: 1500,
        state: "IN_REVIEW",
      },
    ],
  },
  {
    id: "TP-1039",
    title: "NFT certificate metadata service",
    status: "DISPUTED",
    buyer: "Bianca Buyer",
    seller: "Santiago Seller",
    amountAda: 1200,
    network: "preview",
    contractHash: "script_preview_disputed_demo_hash",
    chainTxHash: "tx_disputed_preview_demo_001",
    milestones: [
      {
        title: "Metadata schema and minting proof",
        amountAda: 1200,
        state: "UNDER_REVIEW",
      },
    ],
  },
] as readonly {
  readonly id: string;
  readonly title: string;
  readonly status: string;
  readonly buyer: string;
  readonly seller: string;
  readonly amountAda: number;
  readonly network: string;
  readonly contractHash: string;
  readonly chainTxHash: string;
  readonly milestones: readonly {
    readonly title: string;
    readonly amountAda: number;
    readonly state: string;
  }[];
}[];

const demoTransactions = [
  {
    id: "tx_84a1",
    escrowId: "TP-1042",
    type: "DEPOSIT",
    txHash: "tx_locked_preview_demo_001",
    amountAda: 2500,
    status: "CONFIRMED",
  },
  {
    id: "tx_31b9",
    escrowId: "TP-1033",
    type: "NFT_MINT",
    txHash: "tx_certificate_preview_demo_001",
    amountAda: 2,
    status: "PENDING",
  },
] as readonly {
  readonly id: string;
  readonly escrowId: string;
  readonly type: string;
  readonly txHash: string;
  readonly amountAda: number;
  readonly status: string;
}[];

const demoNotifications = [
  {
    id: "note_1",
    type: "ESCROW",
    title: "Milestone review requested",
    body: "Aster Audit submitted validator test review for buyer acceptance.",
    read: false,
  },
  {
    id: "note_2",
    type: "PAYMENT",
    title: "Deposit confirmed",
    body: "2,500 ADA is locked for TP-1042 on Cardano Preview.",
    read: false,
  },
] as readonly {
  readonly id: string;
  readonly type: string;
  readonly title: string;
  readonly body: string;
  readonly read: boolean;
}[];

const demoCertificates = [
  {
    id: "NFT-001",
    escrowId: "TP-1033",
    policyId: "policy_demo_completed_certificate",
    assetName: "TrustPayCompletionCertificate001",
    metadataUri: "ipfs://bafybeigdemo/trustpay-certificate-001.json",
    mintedTxHash: "tx_certificate_preview_demo_001",
  },
] as readonly {
  readonly id: string;
  readonly escrowId: string;
  readonly policyId: string;
  readonly assetName: string;
  readonly metadataUri: string;
  readonly mintedTxHash: string;
}[];

function demoTx(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replaceAll("-", "").slice(0, 24)}`;
}

export function registerRoutes(app: FastifyInstance) {
  registerHealthRoutes(app);

  app.get("/api/v1/users", () => createSuccessResponse({ users: demoUsers }, "Demo users loaded."));

  app.get("/api/v1/wallets", () =>
    createSuccessResponse(
      {
        wallets: [
          {
            label: "Buyer Preview Wallet",
            address: demoUsers[0].walletAddress,
            network: "preview",
            balanceAda: 8420,
            connected: true,
          },
        ],
      },
      "Wallet demo state loaded.",
    ),
  );

  app.post("/api/v1/wallets/connect", () =>
    createSuccessResponse(
      {
        address: demoUsers[0].walletAddress,
        network: "preview",
        connected: true,
      },
      "CIP-30 wallet connected in demo mode.",
    ),
  );

  app.get("/api/v1/escrows", () =>
    createSuccessResponse({ escrows: demoEscrows }, "Demo escrows loaded."),
  );

  app.get("/api/v1/escrows/:id", (request) => {
    const { id } = request.params as { readonly id: string };
    const escrow = demoEscrows.find((item) => item.id === id) ?? demoEscrows.at(0);

    if (!escrow) {
      return createSuccessResponse(
        {
          escrow: null,
          transactions: [],
          certificates: [],
        },
        "No demo escrows are available.",
      );
    }

    return createSuccessResponse(
      {
        escrow,
        transactions: demoTransactions.filter((item) => item.escrowId === escrow.id),
        certificates: demoCertificates.filter((item) => item.escrowId === escrow.id),
      },
      "Escrow detail loaded.",
    );
  });

  app.post("/api/v1/escrows", () =>
    createSuccessResponse(
      {
        id: "TP-1048",
        status: "AWAITING_DEPOSIT",
        unsignedDepositTx: demoTx("unsigned_deposit"),
        aiContractSummary:
          "Milestone escrow generated with acceptance criteria, refund terms, and evidence rules.",
      },
      "Escrow created in demo mode.",
    ),
  );

  app.post("/api/v1/escrows/:id/deposit", (request) => {
    const { id } = request.params as { readonly id: string };

    return createSuccessResponse(
      {
        escrowId: id,
        status: "LOCKED",
        txHash: demoTx("tx_deposit_preview"),
      },
      "Deposit transaction accepted for Preview indexing.",
    );
  });

  app.post("/api/v1/escrows/:id/release", (request) => {
    const { id } = request.params as { readonly id: string };

    return createSuccessResponse(
      {
        escrowId: id,
        status: "COMPLETED",
        releaseTxHash: demoTx("tx_release_preview"),
        certificateAssetName: "TrustPayCompletionCertificateDemo",
      },
      "Milestone released and NFT receipt queued.",
    );
  });

  app.post("/api/v1/escrows/:id/refund", (request) => {
    const { id } = request.params as { readonly id: string };

    return createSuccessResponse(
      {
        escrowId: id,
        status: "REFUNDED",
        refundTxHash: demoTx("tx_refund_preview"),
      },
      "Refund transaction prepared.",
    );
  });

  app.get("/api/v1/transactions", () =>
    createSuccessResponse({ transactions: demoTransactions }, "Transaction history loaded."),
  );

  app.get("/api/v1/notifications", () =>
    createSuccessResponse({ notifications: demoNotifications }, "Notifications loaded."),
  );

  app.post("/api/v1/notifications/:id/read", (request) => {
    const { id } = request.params as { readonly id: string };

    return createSuccessResponse({ id, read: true }, "Notification marked as read.");
  });

  app.get("/api/v1/analytics", () =>
    createSuccessResponse(
      {
        totalEscrows: 3,
        lockedValueAda: 2500,
        completedValueAda: 900,
        openDisputes: 1,
        successRate: 0.96,
        webhookSuccessRate: 1,
        monthlyVolume: [720, 980, 1320, 1760, 2210, 4600],
      },
      "Analytics snapshot loaded.",
    ),
  );

  app.get("/api/v1/nft-certificates", () =>
    createSuccessResponse({ certificates: demoCertificates }, "NFT certificates loaded."),
  );

  app.post("/api/v1/ai/contract", () =>
    createSuccessResponse(
      {
        summary:
          "TrustPay generated milestone terms with scope, acceptance evidence, refund triggers, and dispute windows.",
        risk: "LOW",
      },
      "AI contract generated.",
    ),
  );

  app.post("/api/v1/ai/risk", () =>
    createSuccessResponse(
      {
        score: 18,
        rating: "LOW",
        drivers: [
          "Verified buyer wallet",
          "Preview network match",
          "Milestone amounts sum correctly",
        ],
      },
      "Risk analysis generated.",
    ),
  );

  app.post("/api/v1/ai/dispute-summary", () =>
    createSuccessResponse(
      {
        summary:
          "The buyer disputes delivery timing. Evidence indicates scope was clear, but metadata proof is pending final verification.",
        nextStep: "Request seller proof bundle and schedule arbitrator review.",
      },
      "Dispute summary generated.",
    ),
  );

  app.get("/api/v1/developers", () =>
    createSuccessResponse(
      {
        apiKeys: [
          {
            name: "Hackathon demo key",
            prefix: "tp_demo_7f42",
            lastUsedAt: "2026-07-12T10:15:00Z",
          },
        ],
        webhooks: [
          { event: "escrow.created", status: "LISTENING" },
          { event: "escrow.locked", status: "HEALTHY" },
          { event: "milestone.released", status: "HEALTHY" },
        ],
        sdk: "TypeScript SDK skeleton available in packages/sdk.",
      },
      "Developer portal data loaded.",
    ),
  );

  app.get("/api/v1/admin", () =>
    createSuccessResponse(
      {
        users: demoUsers,
        escrows: demoEscrows,
        platformHealth: "GREEN",
        auditLogs: [
          { action: "CREATE", resource: "escrow", actor: "buyer@trustpay.demo" },
          { action: "WEBHOOK_DELIVER", resource: "webhook", actor: "system" },
        ],
      },
      "Admin dashboard data loaded.",
    ),
  );

  app.get("/api/v1/disputes", () =>
    createSuccessResponse(
      {
        disputes: [
          {
            id: "DSP-001",
            escrowId: "TP-1039",
            status: "UNDER_REVIEW",
            aiSummary: "Delivery timing and metadata proof require arbitrator review.",
          },
        ],
      },
      "Dispute queue loaded.",
    ),
  );
}
