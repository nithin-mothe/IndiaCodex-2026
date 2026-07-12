import type { Prisma, Wallet } from "@prisma/client";

import { BaseRepository } from "./base-repository.js";

export class WalletsRepository extends BaseRepository {
  create(data: Prisma.WalletCreateInput): Promise<Wallet> {
    return this.prisma.wallet.create({ data });
  }

  findByAddress(address: string): Promise<Wallet | null> {
    return this.prisma.wallet.findFirst({
      where: {
        address,
        deletedAt: null,
      },
    });
  }

  listForUser(userId: string): Promise<Wallet[]> {
    return this.prisma.wallet.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  softDelete(id: string): Promise<Wallet> {
    return this.prisma.wallet.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
