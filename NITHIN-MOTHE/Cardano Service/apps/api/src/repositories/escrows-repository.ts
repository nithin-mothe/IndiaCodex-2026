import type { Escrow, EscrowStatus, Prisma } from "@prisma/client";

import { BaseRepository } from "./base-repository.js";

export class EscrowsRepository extends BaseRepository {
  create(data: Prisma.EscrowCreateInput): Promise<Escrow> {
    return this.prisma.escrow.create({ data });
  }

  findById(id: string): Promise<Escrow | null> {
    return this.prisma.escrow.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        buyer: true,
        seller: true,
        milestones: {
          where: {
            deletedAt: null,
          },
          orderBy: {
            sequence: "asc",
          },
        },
      },
    });
  }

  listByStatus(status?: EscrowStatus, limit = 50): Promise<Escrow[]> {
    return this.prisma.escrow.findMany({
      where: {
        deletedAt: null,
        ...(status ? { status } : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }

  listForUser(userId: string, limit = 50): Promise<Escrow[]> {
    return this.prisma.escrow.findMany({
      where: {
        deletedAt: null,
        OR: [
          {
            buyerId: userId,
          },
          {
            sellerId: userId,
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }

  updateStatus(id: string, status: EscrowStatus): Promise<Escrow> {
    return this.prisma.escrow.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
