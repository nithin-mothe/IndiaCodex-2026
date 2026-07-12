import { describe, expect, it } from "vitest";

import { createPrismaClient } from "../infrastructure/prisma.js";
import { createRepositories } from "./index.js";

describe("createRepositories", () => {
  it("creates the repository registry", async () => {
    const prisma = createPrismaClient("postgresql://trustpay:trustpay@localhost:5432/trustpay");
    const repositories = createRepositories(prisma);

    expect(Object.keys(repositories).sort()).toEqual([
      "analytics",
      "apiKeys",
      "auditLogs",
      "escrows",
      "nftCertificates",
      "notifications",
      "users",
      "wallets",
      "webhooks",
    ]);

    await prisma.$disconnect();
  });
});
