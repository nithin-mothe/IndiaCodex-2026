import type { ApiKey, Prisma } from "@prisma/client";

import { BaseRepository } from "./base-repository.js";

export class ApiKeysRepository extends BaseRepository {
  create(data: Prisma.ApiKeyCreateInput): Promise<ApiKey> {
    return this.prisma.apiKey.create({ data });
  }

  findActiveByHash(keyHash: string): Promise<ApiKey | null> {
    return this.prisma.apiKey.findFirst({
      where: {
        keyHash,
        revokedAt: null,
        OR: [
          {
            expiresAt: null,
          },
          {
            expiresAt: {
              gt: new Date(),
            },
          },
        ],
      },
    });
  }

  listForUser(userId: string): Promise<ApiKey[]> {
    return this.prisma.apiKey.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  revoke(id: string): Promise<ApiKey> {
    return this.prisma.apiKey.update({
      where: {
        id,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }
}
