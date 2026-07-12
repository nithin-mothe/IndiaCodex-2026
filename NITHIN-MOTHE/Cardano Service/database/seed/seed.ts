import {
  AuditAction,
  EscrowStatus,
  NotificationType,
  PrismaClient,
  UserRole,
} from "@prisma/client";

const prisma = new PrismaClient();

const ids = {
  admin: "11111111-1111-4111-8111-111111111111",
  buyer: "22222222-2222-4222-8222-222222222222",
  seller: "33333333-3333-4333-8333-333333333333",
  developer: "44444444-4444-4444-8444-444444444444",
  arbitrator: "55555555-5555-4555-8555-555555555555",
  buyerWallet: "66666666-6666-4666-8666-666666666666",
  sellerWallet: "77777777-7777-4777-8777-777777777777",
  lockedEscrow: "88888888-8888-4888-8888-888888888888",
  completedEscrow: "99999999-9999-4999-8999-999999999999",
  disputeEscrow: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  webhookEndpoint: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
};

async function resetDemoData() {
  await prisma.webhookDelivery.deleteMany();
  await prisma.webhookEndpoint.deleteMany();
  await prisma.analyticsSnapshot.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.attachment.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.escrowEvent.deleteMany();
  await prisma.nftCertificate.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.apiKey.deleteMany();
  await prisma.dispute.deleteMany();
  await prisma.escrowMilestone.deleteMany();
  await prisma.escrow.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.user.deleteMany();
}

async function seedUsers() {
  await prisma.user.createMany({
    data: [
      {
        id: ids.admin,
        email: "admin@trustpay.demo",
        displayName: "Avery Admin",
        role: UserRole.ADMINISTRATOR,
      },
      {
        id: ids.buyer,
        email: "buyer@trustpay.demo",
        displayName: "Bianca Buyer",
        role: UserRole.BUYER,
        walletAddress: "addr_test1qbuyertrustpaydemo0000000000000000000000",
      },
      {
        id: ids.seller,
        email: "seller@trustpay.demo",
        displayName: "Santiago Seller",
        role: UserRole.SELLER,
        walletAddress: "addr_test1qsellertrustpaydemo000000000000000000000",
      },
      {
        id: ids.developer,
        email: "developer@trustpay.demo",
        displayName: "Devon Developer",
        role: UserRole.DEVELOPER,
      },
      {
        id: ids.arbitrator,
        email: "arbitrator@trustpay.demo",
        displayName: "Aria Arbitrator",
        role: UserRole.ARBITRATOR,
      },
    ],
  });

  await prisma.wallet.createMany({
    data: [
      {
        id: ids.buyerWallet,
        userId: ids.buyer,
        label: "Buyer Preview Wallet",
        address: "addr_test1qbuyertrustpaydemo0000000000000000000000",
        verifiedAt: new Date("2026-07-10T10:00:00.000Z"),
      },
      {
        id: ids.sellerWallet,
        userId: ids.seller,
        label: "Seller Preview Wallet",
        address: "addr_test1qsellertrustpaydemo000000000000000000000",
        verifiedAt: new Date("2026-07-10T10:05:00.000Z"),
      },
    ],
  });
}

async function seedEscrows() {
  await prisma.escrow.create({
    data: {
      id: ids.lockedEscrow,
      title: "AI contract audit for Cardano launch",
      description: "Milestone-based audit engagement secured by TrustPay escrow.",
      status: EscrowStatus.LOCKED,
      buyerId: ids.buyer,
      sellerId: ids.seller,
      amountLovelace: 2_500_000_000n,
      contractHash: "script_preview_locked_demo_hash",
      chainTxHash: "tx_locked_preview_demo_001",
      lockedAt: new Date("2026-07-11T09:30:00.000Z"),
      milestones: {
        create: [
          {
            title: "Threat model and architecture review",
            description: "Deliver written review with prioritized findings.",
            amountLovelace: 1_000_000_000n,
            sequence: 1,
            acceptedAt: new Date("2026-07-11T12:00:00.000Z"),
          },
          {
            title: "Validator test review",
            description: "Review Aiken validator tests and edge cases.",
            amountLovelace: 1_500_000_000n,
            sequence: 2,
          },
        ],
      },
    },
  });

  await prisma.escrow.create({
    data: {
      id: ids.completedEscrow,
      title: "Marketplace landing page implementation",
      description: "Premium launch page delivered and accepted.",
      status: EscrowStatus.COMPLETED,
      buyerId: ids.buyer,
      sellerId: ids.seller,
      amountLovelace: 900_000_000n,
      chainTxHash: "tx_completed_preview_demo_001",
      lockedAt: new Date("2026-07-08T08:00:00.000Z"),
      completedAt: new Date("2026-07-09T16:20:00.000Z"),
      milestones: {
        create: [
          {
            title: "Design system and responsive page",
            amountLovelace: 900_000_000n,
            sequence: 1,
            acceptedAt: new Date("2026-07-09T14:00:00.000Z"),
            releasedAt: new Date("2026-07-09T16:20:00.000Z"),
          },
        ],
      },
    },
  });

  await prisma.escrow.create({
    data: {
      id: ids.disputeEscrow,
      title: "NFT certificate metadata service",
      description: "Disputed metadata delivery timeline for NFT certificates.",
      status: EscrowStatus.DISPUTED,
      buyerId: ids.buyer,
      sellerId: ids.seller,
      amountLovelace: 1_200_000_000n,
      chainTxHash: "tx_disputed_preview_demo_001",
      lockedAt: new Date("2026-07-07T11:10:00.000Z"),
      milestones: {
        create: [
          {
            title: "Metadata schema and minting proof",
            amountLovelace: 1_200_000_000n,
            sequence: 1,
          },
        ],
      },
    },
  });
}

async function seedRelatedDemoData() {
  await prisma.dispute.create({
    data: {
      escrowId: ids.disputeEscrow,
      openedById: ids.buyer,
      reason: "Metadata proof was not delivered before the acceptance deadline.",
      status: "UNDER_REVIEW",
    },
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: ids.buyer,
        type: NotificationType.ESCROW,
        title: "Escrow locked",
        body: "AI contract audit for Cardano launch is locked on Preview.",
      },
      {
        userId: ids.seller,
        type: NotificationType.DISPUTE,
        title: "Dispute opened",
        body: "NFT certificate metadata service has entered review.",
      },
      {
        userId: ids.developer,
        type: NotificationType.WEBHOOK,
        title: "Webhook delivery succeeded",
        body: "escrow.locked was delivered to your development endpoint.",
        readAt: new Date("2026-07-11T10:00:00.000Z"),
      },
    ],
  });

  await prisma.apiKey.create({
    data: {
      userId: ids.developer,
      name: "Hackathon demo key",
      keyHash: "sha256:demo-api-key-hash",
      lastUsedAt: new Date("2026-07-11T10:15:00.000Z"),
    },
  });

  await prisma.webhookEndpoint.create({
    data: {
      id: ids.webhookEndpoint,
      url: "https://example.dev/webhooks/trustpay",
      secretHash: "sha256:demo-webhook-secret",
      description: "Developer portal demo webhook endpoint",
      deliveries: {
        create: [
          {
            eventType: "escrow.locked",
            payload: {
              escrowId: ids.lockedEscrow,
              status: "LOCKED",
            },
            status: "DELIVERED",
            attempts: 1,
            deliveredAt: new Date("2026-07-11T09:31:00.000Z"),
          },
        ],
      },
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        escrowId: ids.lockedEscrow,
        txHash: "tx_locked_preview_demo_001",
        type: "DEPOSIT",
        amountLovelace: 2_500_000_000n,
        status: "CONFIRMED",
        confirmedAt: new Date("2026-07-11T09:30:00.000Z"),
      },
      {
        escrowId: ids.completedEscrow,
        txHash: "tx_completed_preview_demo_001",
        type: "RELEASE",
        amountLovelace: 900_000_000n,
        status: "CONFIRMED",
        confirmedAt: new Date("2026-07-09T16:20:00.000Z"),
      },
    ],
  });

  await prisma.nftCertificate.create({
    data: {
      escrowId: ids.completedEscrow,
      policyId: "policy_demo_completed_certificate",
      assetName: "TrustPayCompletionCertificate001",
      metadataUri: "ipfs://bafybeigdemo/trustpay-certificate-001.json",
      mintedTxHash: "tx_certificate_preview_demo_001",
    },
  });

  await prisma.attachment.create({
    data: {
      escrowId: ids.lockedEscrow,
      fileName: "audit-scope.pdf",
      contentType: "application/pdf",
      url: "https://trustpay.demo/assets/audit-scope.pdf",
      sizeBytes: 384_512,
    },
  });

  await prisma.escrowEvent.createMany({
    data: [
      {
        escrowId: ids.lockedEscrow,
        type: "escrow.locked",
        payload: {
          chainTxHash: "tx_locked_preview_demo_001",
          amountLovelace: "2500000000",
        },
      },
      {
        escrowId: ids.completedEscrow,
        type: "escrow.completed",
        payload: {
          releaseTxHash: "tx_completed_preview_demo_001",
        },
      },
    ],
  });

  await prisma.analyticsSnapshot.create({
    data: {
      period: "2026-07-12",
      metrics: {
        totalEscrows: 3,
        lockedValueLovelace: "2500000000",
        completedValueLovelace: "900000000",
        openDisputes: 1,
        webhookSuccessRate: 1,
      },
    },
  });

  await prisma.auditLog.createMany({
    data: [
      {
        actorId: ids.admin,
        action: AuditAction.CREATE,
        resource: "seed",
        metadata: {
          message: "Demo data seeded for hackathon flow.",
        },
      },
      {
        actorId: ids.buyer,
        action: AuditAction.CREATE,
        resource: "escrow",
        resourceId: ids.lockedEscrow,
      },
    ],
  });
}

async function main() {
  await resetDemoData();
  await seedUsers();
  await seedEscrows();
  await seedRelatedDemoData();
}

void main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("TrustPay demo seed data created.");
  })
  .catch(async (error: unknown) => {
    await prisma.$disconnect();
    console.error(error);
    process.exit(1);
  });
