import type { DatabaseClient } from "../infrastructure/prisma.js";
import { AnalyticsRepository } from "./analytics-repository.js";
import { ApiKeysRepository } from "./api-keys-repository.js";
import { AuditLogsRepository } from "./audit-logs-repository.js";
import { EscrowsRepository } from "./escrows-repository.js";
import { NftCertificatesRepository } from "./nft-certificates-repository.js";
import { NotificationsRepository } from "./notifications-repository.js";
import { UsersRepository } from "./users-repository.js";
import { WalletsRepository } from "./wallets-repository.js";
import { WebhooksRepository } from "./webhooks-repository.js";

export interface RepositoryRegistry {
  readonly analytics: AnalyticsRepository;
  readonly apiKeys: ApiKeysRepository;
  readonly auditLogs: AuditLogsRepository;
  readonly escrows: EscrowsRepository;
  readonly nftCertificates: NftCertificatesRepository;
  readonly notifications: NotificationsRepository;
  readonly users: UsersRepository;
  readonly wallets: WalletsRepository;
  readonly webhooks: WebhooksRepository;
}

export function createRepositories(prisma: DatabaseClient): RepositoryRegistry {
  return {
    analytics: new AnalyticsRepository(prisma),
    apiKeys: new ApiKeysRepository(prisma),
    auditLogs: new AuditLogsRepository(prisma),
    escrows: new EscrowsRepository(prisma),
    nftCertificates: new NftCertificatesRepository(prisma),
    notifications: new NotificationsRepository(prisma),
    users: new UsersRepository(prisma),
    wallets: new WalletsRepository(prisma),
    webhooks: new WebhooksRepository(prisma),
  };
}
