import type { AnalyticsSnapshot, Prisma } from "@prisma/client";

import { BaseRepository } from "./base-repository.js";

export class AnalyticsRepository extends BaseRepository {
  createSnapshot(data: Prisma.AnalyticsSnapshotCreateInput): Promise<AnalyticsSnapshot> {
    return this.prisma.analyticsSnapshot.create({ data });
  }

  listSnapshots(period?: string, limit = 30): Promise<AnalyticsSnapshot[]> {
    return this.prisma.analyticsSnapshot.findMany({
      where: {
        ...(period ? { period } : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }
}
